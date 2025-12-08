require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');
const Enrollment = require('./models/Enrollment'); // adjust path if needed
const nodemailer = require('nodemailer');

const app = express();

// ----------------- Static & Frontend -----------------
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/reset-password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'reset-password.html'));
});

// ----------------- Middleware -----------------
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- Session / Passport -----------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true only with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// ----------------- MongoDB -----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// ----------------- Schemas -----------------
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true, sparse: true, default: undefined },
  course: { type: String, default: null },
  resetToken: String,
  resetTokenExpiry: Date
});
userSchema.index({ phone: 1 }, { unique: true, sparse: true });
const User = mongoose.model('User', userSchema);

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Otp = mongoose.model('Otp', otpSchema);

// ----------------- Nodemailer -----------------
let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  transporter.verify()
    .then(() => console.log('✅ SMTP transporter ready'))
    .catch(err => { console.error('⚠️ SMTP verify failed:', err); transporter = null; });
}

// ----------------- Helper Functions -----------------
async function sendOtpEmail(email, otp) {
  if (transporter) {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Your GK Academy OTP',
      text: `Your OTP is ${otp}. It will expire in ${process.env.OTP_EXPIRE_MINUTES || 5} minutes.`
    });
    return true;
  } else {
    console.log(`💡 DEV OTP for ${email}: ${otp}`);
    return false;
  }
}

// ----------------- Passport Google OAuth -----------------
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) return done(null, false, { message: 'Please signup first!' });
        if (!user.googleId) user.googleId = profile.id;
        await user.save();
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  ));
} else {
  console.warn('⚠ GOOGLE_CLIENT_ID / SECRET not set — Google OAuth disabled.');
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ----------------- Routes -----------------

// --- Google Auth ---
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) return res.redirect(`/login.html?error=${encodeURIComponent(err.message)}`);
    if (!user) return res.redirect('/login.html?error=Login failed');
    req.login(user, (loginErr) => {
      if (loginErr) return res.redirect('/login.html?error=Login failed');
      return res.redirect('/dash.html');
    });
  })(req, res, next);
});

// --- Email OTP ---
app.post('/api/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES) || 5) * 60 * 1000);

    await Otp.deleteMany({ email });
    await Otp.create({ email, code, expiresAt });
    await sendOtpEmail(email, code);

    const response = { message: 'OTP sent to your email', success: true };
    if (process.env.NODE_ENV !== 'production' || process.env.DEV_OTP === 'true') response.otp = code;

    return res.json(response);
  } catch (err) {
    console.error('🔥 send-email-otp error:', err);
    return res.status(500).json({ message: 'Server error while sending OTP', success: false });
  }
});

app.post('/api/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required' });

    const record = await Otp.findOne({ email, code: otp });
    if (!record) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    await Otp.deleteMany({ email });
    return res.json({ success: true, message: 'OTP verified successfully' });
  } catch (err) {
    console.error('🔥 Verify OTP Error:', err);
    return res.status(500).json({ success: false, message: 'Server error verifying OTP' });
  }
});

// --- Signup ---
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp)
      return res.status(400).json({ message: 'All fields (name, email, password, otp) are required' });

    const otpDoc = await Otp.findOne({ email, code: otp, expiresAt: { $gt: new Date() } });
    if (!otpDoc) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered!' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ displayName: name, email, password: hashed });

    await Otp.deleteMany({ email });

    req.login(newUser, err => {
      if (err) return res.status(500).json({ message: 'Signup succeeded but login failed' });
      return res.status(201).json({
        message: 'Signup & login successful!',
        username: newUser.displayName || newUser.email,
        displayName: newUser.displayName,
        email: newUser.email
      });
    });
  } catch (err) {
    console.error('🔥 Signup error:', err);
    return res.status(500).json({ message: 'Server error!' });
  }
});

// --- Login ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

    req.login(user, err => {
      if (err) return res.status(500).json({ message: 'Session login failed!' });
      return res.status(200).json({
        message: 'Login successful!',
        username: user.displayName || user.email,
        displayName: user.displayName,
        email: user.email
      });
    });
  } catch (err) {
    console.error('🔥 Login error:', err);
    return res.status(500).json({ message: 'Server error!' });
  }
});

// --- Forgot Password ---
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account with this email!' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    return res.json({ message: 'Password reset link generated!', resetLink: `/reset-password.html?token=${token}` });
  } catch (err) {
    console.error('🔥 Forgot password error:', err);
    return res.status(500).json({ message: 'Server error!' });
  }
});

// --- Reset Password ---
app.post('/api/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token!' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({ message: 'Password reset successful!' });
  } catch (err) {
    console.error('🔥 Reset password error:', err);
    return res.status(500).json({ message: 'Server error!' });
  }
});

// --- Current User ---
app.get('/api/me', (req, res) => {
  res.json({ user: req.isAuthenticated() ? req.user : null });
});

// --- Enroll ---
// --- Enroll ---
app.post('/enroll', async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Create new enrollment
    const enrollment = new Enrollment({ name, email, phone, course });
    await enrollment.save();
    console.log('✅ Enrollment saved:', enrollment);

    return res.json({
      success: true,
      message: "✅ Enrollment saved! Proceed to payment.",
      enrollmentId: enrollment._id
    });

  } catch (err) {
    console.error('🔥 Enroll save error:', err);
    return res.status(500).json({ success: false, message: 'Server error while saving enrollment' });
  }
});



// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
