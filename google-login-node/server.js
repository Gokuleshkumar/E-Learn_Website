// ==========================================================
// ENVIRONMENT
// ==========================================================

require('dotenv').config();


// ==========================================================
// IMPORTS
// ==========================================================

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

let Enrollment;
try {
    Enrollment = require('./models/Enrollment');
} catch (_) {
    Enrollment = require('./models/enrollment');
}


// ==========================================================
// APP
// ==========================================================

const app = express();

app.set('trust proxy', 1);


// ==========================================================
// STATIC FRONTEND
// ==========================================================

app.use(
    express.static(
        path.join(__dirname, 'frontend')
    )
);


app.get(
    '/reset-password.html',
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                'frontend',
                'reset-password.html'
            )
        );

    }
);


app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(__dirname, 'frontend', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'frontend', 'robots.txt'));
});



// ==========================================================
// MIDDLEWARE
// ==========================================================

app.use(
    cors({

        origin: true,

        credentials: true

    })
);


app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================================
// SESSION
// ==========================================================

app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            'your_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    })
);


app.use(
    passport.initialize()
);


app.use(
    passport.session()
);


// ==========================================================
// MONGODB (Auto-starts Freebase connector on Render / Local)
// ==========================================================

async function connectDatabase() {
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('17017')) {
        const net = require('net');
        const isListening = await new Promise(resolve => {
            const socket = net.createConnection({ port: 17017, host: '127.0.0.1' }, () => {
                socket.destroy();
                resolve(true);
            });
            socket.on('error', () => resolve(false));
            socket.setTimeout(400, () => { socket.destroy(); resolve(false); });
        });

        if (!isListening) {
            console.log('🔄 Starting Freebase connector tunnel in background...');
            try {
                const { fork } = require('child_process');
                const connectorPath = path.join(__dirname, 'freebase-mongo-connector.mjs');
                fork(connectorPath, [], { detached: true, stdio: 'ignore' }).unref();
                await new Promise(r => setTimeout(r, 1500));
            } catch (err) {
                console.warn('⚠️ Could not launch connector automatically:', err.message);
            }
        }
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB error:', err);
    }
}

connectDatabase();


// ==========================================================
// MODELS (Clean Table/Collection Architecture)
// ==========================================================

const User = require('./models/User');
const Otp = require('./models/Otp');
const LoginLog = require('./models/LoginLog');


// ==========================================================
// NODEMAILER
// ==========================================================

let transporter = null;

function initTransporter() {
    try {
        require('dotenv').config();
    } catch (_) {}

    const emailUser = (process.env.EMAIL_USER || '').replace(/['"\s]/g, '').trim();
    const rawPass = process.env.EMAIL_PASS || '';
    const cleanPass = rawPass.replace(/['"\s]/g, '').trim();

    if (!emailUser || !cleanPass) {
        console.warn('⚠️ EMAIL_USER or EMAIL_PASS missing or empty.');
        transporter = null;
        return null;
    }

    console.log(`📧 Initializing SMTP for "${emailUser}" (Clean password length: ${cleanPass.length})`);

    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '465'),
        secure: (process.env.EMAIL_SECURE !== 'false'),
        auth: {
            user: emailUser,
            pass: cleanPass
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });

    return transporter;
}

// Initial email service check on startup
if (process.env.BREVO_API_KEY) {
    console.log('✅ Brevo HTTPS API configured. Real emails will be sent from:', process.env.EMAIL_FROM || 'no-reply@agsacademys.online');
} else {
    initTransporter();
    if (transporter) {
        transporter
            .verify()
            .then(() => {
                console.log('✅ SMTP transporter ready. Emails will be sent from:', process.env.EMAIL_USER);
            })
            .catch(err => {
                console.warn('⚠️ SMTP verification failed:', err.message);
                console.log('ℹ️ Switched to local Dev Mode.');
                transporter = null;
            });
    }
}

// ==========================================================
// BREVO (SENDINBLUE) HTTPS EMAIL SENDER (PORT 443)
// ==========================================================

async function sendViaBrevo(toEmail, subject, htmlContent) {
    const apiKey = (process.env.BREVO_API_KEY || '').trim();
    if (!apiKey) return null;

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: 'AGS Academys',
                    email: (process.env.EMAIL_FROM || 'no-reply@agsacademys.online').trim()
                },
                to: [{ email: toEmail }],
                subject: subject,
                htmlContent: htmlContent
            })
        });

        const data = await response.json();
        if (response.ok && (data.messageId || data.id)) {
            console.log(`✅ Brevo: Email sent successfully to ${toEmail} (ID: ${data.messageId || data.id})`);
            return { success: true, messageId: data.messageId || data.id };
        } else {
            console.warn(`⚠️ Brevo API responded with error:`, data.message || JSON.stringify(data));
            return { success: false, error: data.message || JSON.stringify(data) };
        }
    } catch (err) {
        console.warn(`⚠️ Brevo network error:`, err.message);
        return { success: false, error: err.message };
    }
}

// ==========================================================
// SEND OTP EMAIL
// ==========================================================

async function sendOtpEmail(email, otp) {
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">AGS Academys</h2>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">Hello,</p>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                Thank you for choosing <strong>AGS Academys</strong>! To complete your verification process and secure your account, please use the One-Time Password (OTP) provided below.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; background-color: #f8f9fa; padding: 15px 25px; border-radius: 6px; letter-spacing: 4px; color: #0056b3; border: 1px solid #ddd;">
                    ${otp}
                </span>
            </div>
            <p style="font-size: 14px; color: #555555; line-height: 1.5;">
                This OTP is valid for the next 5 minutes. For your security, please do not share this code with anyone.
            </p>
            <p style="font-size: 14px; color: #555555; line-height: 1.5;">
                If you did not request this OTP, please ignore this email or contact our support team if you have concerns.
            </p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
            <p style="font-size: 14px; color: #333333; margin: 0;">Best regards,</p>
            <p style="font-size: 14px; color: #333333; font-weight: bold; margin: 5px 0 0 0;">The AGS Academys Team</p>
        </div>
    `;

    // 1. Prioritize Brevo HTTPS API (port 443, never blocked on Render)
    if (process.env.BREVO_API_KEY) {
        const brevoRes = await sendViaBrevo(email, 'Your AGS Academys OTP Verification Code', htmlBody);
        if (brevoRes && brevoRes.success) {
            console.log(`✅ Real OTP email delivered to ${email} via Brevo`);
            return { success: true, provider: 'brevo' };
        }
    }

    // 2. Fallback to Gmail SMTP (port 465, works on local development)
    if (!transporter) {
        initTransporter();
    }

    if (transporter) {
        try {
            await transporter.sendMail({
                from: `"AGS Academys" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'agsacademys@gmail.com'}>`,
                to: email,
                subject: 'Your AGS Academys OTP Verification Code',
                html: htmlBody
            });
            console.log(`✅ Real OTP email delivered to ${email} via SMTP`);
            return { success: true, provider: 'smtp' };
        } catch (mailErr) {
            console.warn(`⚠️ SMTP sendMail failed for ${email} (${mailErr.message}).`);
        }
    }

    // 3. Fallback to Dev Mode if email providers fail
    console.log(`💡 DEV OTP for ${email}: ${otp}`);
    return { success: false, reason: 'Email delivery failed' };
}


// ==========================================================
// PASSPORT GOOGLE OAUTH
// ==========================================================

if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
) {

    passport.use(

        new GoogleStrategy(

            {

                clientID:
                    process.env.GOOGLE_CLIENT_ID,

                clientSecret:
                    process.env.GOOGLE_CLIENT_SECRET,

                callbackURL:
                    "/auth/google/callback",

                proxy: true

            },


            async (
                accessToken,
                refreshToken,
                profile,
                done
            ) => {

                try {

                    const email =
                        profile.emails &&
                        profile.emails[0]
                            .value;


                    let user =
                        await User.findOne({
                            email
                        });


                    if (!user) {

                        return done(
                            null,
                            false,
                            {
                                message:
                                    'Please signup first!'
                            }
                        );

                    }


                    if (
                        !user.googleId
                    ) {

                        user.googleId =
                            profile.id;

                    }

                    user.lastLogin = new Date();
                    await user.save();

                    try {
                        await LoginLog.create({
                            userId: user._id,
                            email: user.email,
                            authProvider: 'google',
                            status: 'SUCCESS'
                        });
                    } catch (_) {}


                    return done(
                        null,
                        user
                    );


                } catch (err) {

                    return done(
                        err,
                        null
                    );

                }

            }

        )

    );

} else {

    console.warn(
        '⚠ GOOGLE_CLIENT_ID / SECRET not set — Google OAuth disabled.'
    );

}


// ==========================================================
// PASSPORT SERIALIZATION
// ==========================================================

passport.serializeUser(
    (user, done) => {

        done(
            null,
            user.id
        );

    }
);


passport.deserializeUser(
    async (
        id,
        done
    ) => {

        try {

            const user =
                await User.findById(id);

            done(
                null,
                user
            );

        } catch (err) {

            done(
                err,
                null
            );

        }

    }
);


// ==========================================================
// GOOGLE LOGIN
// ==========================================================

app.get(
    '/auth/google',

    passport.authenticate(
        'google',
        {
            scope: [
                'profile',
                'email'
            ]
        }
    )
);


app.get(
    '/auth/google/callback',

    (req, res, next) => {

        passport.authenticate(
            'google',

            (err, user) => {

                if (err) {

                    return res.redirect(
                        `/login.html?error=${encodeURIComponent(
                            err.message
                        )}`
                    );

                }


                if (!user) {

                    return res.redirect(
                        '/login.html?error=Login failed'
                    );

                }


                req.login(
                    user,
                    loginErr => {

                        if (loginErr) {

                            return res.redirect(
                                '/login.html?error=Login failed'
                            );

                        }


                        return res.redirect(
                            '/dash.html'
                        );

                    }
                );

            }

        )(req, res, next);

    }
);


// ==========================================================
// SEND EMAIL OTP
// ==========================================================

app.post(
    '/api/send-email-otp',

    async (req, res) => {

        try {

            const {
                email
            } = req.body;


            if (!email) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Email is required'

                    });

            }


            const code =
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                ).toString();


            const expiresAt =
                new Date(

                    Date.now() +

                    (
                        parseInt(
                            process.env.OTP_EXPIRE_MINUTES
                        ) || 5
                    ) *

                    60 *

                    1000

                );


            await Otp.deleteMany({
                email
            });


            await Otp.create({

                email,

                code,

                expiresAt

            });


            const sendResult = await sendOtpEmail(
                email,
                code
            );


            const response = {

                success: true,

                emailSent: !!sendResult.success,

                message: sendResult.success
                    ? 'OTP sent successfully to your email!'
                    : 'Dev Mode: OTP generated. SMTP unauthenticated.',

                otp: code

            };


            return res.json(
                response
            );


        } catch (err) {

            console.error(
                '🔥 send-email-otp error:',
                err
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Server error while generating OTP'

                });

        }

    }
);


// ==========================================================
// EMAIL SERVICE VERIFY STATUS ENDPOINT
// ==========================================================

app.get('/api/smtp-verify', async (req, res) => {
    // 1. If Brevo API Key is configured, test Brevo
    if (process.env.BREVO_API_KEY) {
        try {
            const brevoCheck = await fetch('https://api.brevo.com/v3/account', {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY.trim()
                }
            });
            const data = await brevoCheck.json();
            if (brevoCheck.ok) {
                return res.json({
                    success: true,
                    provider: 'Brevo (HTTPS API)',
                    email: data.email || process.env.EMAIL_FROM || 'agsacademys@gmail.com',
                    message: `Brevo API connected and ready!`
                });
            } else {
                return res.status(401).json({
                    success: false,
                    provider: 'Brevo',
                    code: data.code || 'UNAUTHORIZED',
                    message: data.message || 'Brevo authentication failed'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                provider: 'Brevo',
                message: err.message
            });
        }
    }

    // 2. Otherwise test SMTP
    try {
        const t = initTransporter();
        if (!t) {
            return res.status(400).json({
                success: false,
                message: 'No email credentials (BREVO_API_KEY or EMAIL_PASS) configured in .env'
            });
        }
        await t.verify();
        transporter = t;
        return res.json({
            success: true,
            provider: 'SMTP',
            user: process.env.EMAIL_USER,
            message: `SMTP verified successfully for ${process.env.EMAIL_USER}!`
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            provider: 'SMTP',
            code: err.code || 'EAUTH',
            message: err.message,
            fix: 'Please generate a new 16-character App Password at https://myaccount.google.com/apppasswords and update EMAIL_PASS in .env'
        });
    }
});


// ==========================================================
// VERIFY EMAIL OTP
// ==========================================================

app.post(
    '/api/verify-email-otp',

    async (req, res) => {

        try {

            const {
                email,
                otp
            } = req.body;


            if (
                !email ||
                !otp
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Email and OTP required'

                    });

            }


            const record =
                await Otp.findOne({

                    email,

                    code:
                        otp

                });


            if (!record) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Invalid OTP'

                    });

            }


            if (
                record.expiresAt <
                new Date()
            ) {

                await Otp.deleteOne({
                    _id:
                        record._id
                });


                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'OTP expired'

                    });

            }


            await Otp.deleteMany({
                email
            });


            return res.json({

                success:
                    true,

                message:
                    'OTP verified successfully'

            });


        } catch (err) {

            console.error(
                '🔥 Verify OTP Error:',
                err
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Server error verifying OTP'

                });

        }

    }
);


// ==========================================================
// SIGNUP
// ==========================================================

app.post(
    '/api/signup',

    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                otp,
                phone
            } = req.body;


            if (
                !name ||
                !email ||
                !password ||
                !otp
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            'All fields (name, email, password, otp) are required'

                    });

            }


            const otpDoc =
                await Otp.findOne({

                    email,

                    code:
                        otp,

                    expiresAt: {
                        $gt:
                            new Date()
                    }

                });


            if (!otpDoc) {

                return res
                    .status(400)
                    .json({

                        message:
                            'Invalid or expired OTP'

                    });

            }


            const existing =
                await User.findOne({
                    email
                });


            if (existing) {

                return res
                    .status(400)
                    .json({

                        message:
                            'Email already registered!'

                    });

            }


            const hashed =
                await bcrypt.hash(
                    password,
                    10
                );


            const userData = {

                name:
                    name,

                displayName:
                    name,

                email:
                    email.toLowerCase().trim(),

                password:
                    hashed,

                authProvider:
                    'local',

                lastLogin:
                    new Date()

            };

            if (phone) {
                userData.phone = phone;
            }

            const newUser = await User.create(userData);


            // Record initial login log
            try {
                await LoginLog.create({
                    userId: newUser._id,
                    email: newUser.email,
                    authProvider: 'local',
                    status: 'SUCCESS',
                    ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
                    userAgent: req.headers['user-agent'] || null
                });
            } catch (_) {}


            await Otp.deleteMany({
                email
            });


            req.login(
                newUser,
                err => {

                    if (err) {

                        return res
                            .status(500)
                            .json({

                                message:
                                    'Signup succeeded but login failed'

                            });

                    }


                    return res
                        .status(201)
                        .json({

                            message:
                                'Signup & login successful!',

                            username:
                                newUser.displayName ||
                                newUser.email,

                            displayName:
                                newUser.displayName,

                            email:
                                newUser.email

                        });

                }
            );


        } catch (err) {

            console.error(
                '🔥 Signup error:',
                err
            );


            return res
                .status(500)
                .json({

                    message:
                        err.message || 'Server error!'

                });

        }

    }
);


// ==========================================================
// RAZORPAY SETUP
// ==========================================================

// ==========================================================
// RAZORPAY SETUP
// ==========================================================

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});


// ==========================================================
// CHECK RAZORPAY CONFIGURATION
// ==========================================================

if (
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET
) {

    console.log(
        "💳 Razorpay configured successfully"
    );

    console.log(
        "🔑 Razorpay Key:",
        process.env.RAZORPAY_KEY_ID
    );

} else {

    console.error(
        "❌ Razorpay keys are missing from .env"
    );

}


// ==========================================================
// CHECK RAZORPAY API
// ==========================================================

async function checkRazorpay() {

    try {

        await razorpay.orders.all({
            count: 1
        });

        console.log(
            "✅ Razorpay API connected successfully"
        );

    } catch (error) {

        console.error(
            "❌ Razorpay API connection failed"
        );

        console.error(
            error.error?.description ||
            error.message
        );

    }

}


// Run Razorpay check

checkRazorpay();

// ==========================================================
// CREATE RAZORPAY ORDER
// ==========================================================

app.post(
    '/api/create-payment-order',

    async (req, res) => {

        try {

            const {
                enrollmentId,
                name,
                email,
                mobile,
                course
            } = req.body;


            if (
                !enrollmentId ||
                !name ||
                !email ||
                !mobile ||
                !course
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Enrollment ID, Name, email, mobile and course are required'

                    });

            }


            // ======================================
            // DYNAMIC PRICING BASED ON COURSE
            // ======================================
            
            const pricingData = {
                "frontend": 6499,
                "backend": 7299,
                "java": 6999,
                "python": 7999,
                "web-development": 7499,
                "cybersecurity": 8499,
                "ai": 9999,
                "ui-ux": 5499,
                "data-science": 8999,
                "machine-learning": 9499,
                "quantum-computing": 11999,
                "problem-solving-dsa": 4999,
                "training-placement": 25000,
                "default": 4499
            };

            const price = pricingData[course] || pricingData["default"];
            const amountInPaise = price * 100;

            const options = {

                amount:
                    amountInPaise,

                currency:
                    'INR',

                receipt:
                    'ags_' +
                    Date.now(),

                notes: {

                    name:
                        name,

                    email:
                        email,
                        
                    mobile:
                        mobile,

                    course:
                        course

                }

            };


            const order =
                await razorpay.orders.create(
                    options
                );


            console.log(
                '✅ Razorpay order created:',
                order.id
            );


            // ======================================
            // SAVE ORDER ID TO PENDING ENROLLMENT
            // ======================================

            try {

                await Enrollment.findByIdAndUpdate(

                    enrollmentId,

                    {

                        $set: {

                            amount:
                                price,

                            razorpayOrderId:
                                order.id,

                            paymentStatus:
                                'PENDING'

                        }

                    }

                );

            } catch (dbError) {

                console.error(
                    '⚠️ Could not update enrollment with order ID:',
                    dbError
                );

            }


            return res.json({

                success:
                    true,

                orderId:
                    order.id,

                amount:
                    order.amount,

                currency:
                    order.currency,
                
                key: process.env.RAZORPAY_KEY_ID

            });


        } catch (error) {

            console.error(
                '❌ Razorpay order error:',
                error
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Unable to create payment order'

                });

        }

    }
);


// ==========================================================
// VERIFY RAZORPAY PAYMENT
// ==========================================================

app.post(
    '/api/verify-payment',

    async (req, res) => {

        try {

            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            } = req.body;


            if (
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Invalid payment response'

                    });

            }


            // ======================================
            // GENERATE SIGNATURE
            // ======================================

            const generatedSignature =
                crypto
                    .createHmac(

                        'sha256',

                        process.env
                            .RAZORPAY_KEY_SECRET

                    )

                    .update(

                        razorpay_order_id +
                        '|' +
                        razorpay_payment_id

                    )

                    .digest(
                        'hex'
                    );


            // ======================================
            // COMPARE SIGNATURES
            // ======================================

            const isValid =
                generatedSignature ===
                razorpay_signature;


            if (!isValid) {

                console.error(
                    '❌ Invalid Razorpay signature'
                );


                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Payment verification failed'

                    });

            }


            console.log(
                '✅ Payment verified:',
                razorpay_payment_id
            );


            // ======================================
            // UPDATE ENROLLMENT
            // ======================================

            const enrollment =
                await Enrollment.findOneAndUpdate(

                    {

                        razorpayOrderId:
                            razorpay_order_id

                    },

                    {

                        $set: {

                            paymentStatus:
                                'PAID',

                            razorpayPaymentId:
                                razorpay_payment_id,

                            razorpaySignature:
                                razorpay_signature,

                            paidAt:
                                new Date()

                        }

                    },
                    { new: true }
                );

            if (enrollment) {
                console.log("\n==================================");
                console.log(`Mobile Number: ${enrollment.mobile}`);
                console.log(`Mail: ${enrollment.email}`);
                console.log(`payment: ${enrollment.paymentStatus}`);
                console.log("==================================\n");
            }


            if (!enrollment) {

                console.warn(
                    '⚠️ Payment verified but enrollment was not found for order:',
                    razorpay_order_id
                );

            } else {

                console.log(
                    '✅ Enrollment marked PAID:',
                    enrollment._id
                );

            }


            return res.json({

                success:
                    true,

                message:
                    'Payment verified successfully',

                paymentId:
                    razorpay_payment_id,

                orderId:
                    razorpay_order_id

            });


        } catch (error) {

            console.error(
                '❌ Payment verification error:',
                error
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Payment verification failed'

                });

        }

    }
);


// ==========================================================
// LOGIN
// ==========================================================

app.post(
    '/api/login',

    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            const user =
                await User.findOne({
                    email
                });


            if (
                !user ||
                !user.password
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            'Invalid credentials!'

                    });

            }


            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!isMatch) {

                try {
                    await LoginLog.create({
                        userId: user._id,
                        email: user.email,
                        authProvider: 'local',
                        status: 'FAILED',
                        ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
                        userAgent: req.headers['user-agent'] || null
                    });
                } catch (_) {}

                return res
                    .status(400)
                    .json({

                        message:
                            'Invalid credentials!'

                    });

            }


            user.lastLogin = new Date();
            await user.save();

            try {
                await LoginLog.create({
                    userId: user._id,
                    email: user.email,
                    authProvider: 'local',
                    status: 'SUCCESS',
                    ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
                    userAgent: req.headers['user-agent'] || null
                });
            } catch (_) {}


            req.login(
                user,
                err => {

                    if (err) {

                        return res
                            .status(500)
                            .json({

                                message:
                                    'Session login failed!'

                            });

                    }


                    return res
                        .status(200)
                        .json({

                            message:
                                'Login successful!',

                            username:
                                user.displayName ||
                                user.email,

                            displayName:
                                user.displayName,

                            email:
                                user.email

                        });

                }
            );


        } catch (err) {

            console.error(
                '🔥 Login error:',
                err
            );


            return res
                .status(500)
                .json({

                    message:
                        'Server error!'

                });

        }

    }
);


// ==========================================================
// FORGOT PASSWORD
// ==========================================================

app.post(
    '/api/forgot-password',

    async (req, res) => {

        try {

            const {
                email
            } = req.body;


            const user =
                await User.findOne({
                    email
                });


            if (!user) {

                return res
                    .status(404)
                    .json({

                        message:
                            'No account with this email!'

                    });

            }


            const token =
                crypto
                    .randomBytes(32)
                    .toString('hex');


            user.resetToken =
                token;


            user.resetTokenExpiry =
                Date.now() +
                15 *
                60 *
                1000;


            await user.save();


            return res.json({

                message:
                    'Password reset link generated!',

                resetLink:
                    `/reset-password.html?token=${token}`

            });


        } catch (err) {

            console.error(
                '🔥 Forgot password error:',
                err
            );


            return res
                .status(500)
                .json({

                    message:
                        'Server error!'

                });

        }

    }
);


// ==========================================================
// RESET PASSWORD
// ==========================================================

app.post(
    '/api/reset-password',

    async (req, res) => {

        try {

            const {
                token,
                newPassword
            } = req.body;


            const user =
                await User.findOne({

                    resetToken:
                        token,

                    resetTokenExpiry: {
                        $gt:
                            Date.now()
                    }

                });


            if (!user) {

                return res
                    .status(400)
                    .json({

                        message:
                            'Invalid or expired token!'

                    });

            }


            user.password =
                await bcrypt.hash(
                    newPassword,
                    10
                );


            user.resetToken =
                undefined;


            user.resetTokenExpiry =
                undefined;


            await user.save();


            return res.json({

                message:
                    'Password reset successful!'

            });


        } catch (err) {

            console.error(
                '🔥 Reset password error:',
                err
            );


            return res
                .status(500)
                .json({

                    message:
                        'Server error!'

                });

        }

    }
);


// ==========================================================
// CURRENT USER
// ==========================================================

app.get(
    '/api/me',

    async (req, res) => {

        if (!req.isAuthenticated() || !req.user) {
            return res.json({
                user: null
            });
        }

        try {
            const userObj = req.user.toObject
                ? req.user.toObject()
                : { ...req.user };

            const userEmail = (userObj.email || '').toLowerCase().trim();

            // Check if user has an enrollment with paymentStatus: 'PAID'
            const paidEnrollment = await Enrollment.findOne({
                email: { $regex: new RegExp(`^${userEmail}$`, 'i') },
                paymentStatus: 'PAID'
            });

            if (paidEnrollment && paidEnrollment.course) {
                userObj.course = paidEnrollment.course;
            }

            // User is paid if they have a paid enrollment record or is the admin account
            if (userEmail === 'gokuleshkumar878@gmail.com' || paidEnrollment) {
                userObj.isPaid = true;
                userObj.course = userObj.course || (paidEnrollment ? paidEnrollment.course : 'frontend');
            } else {
                userObj.isPaid = false;
            }

            return res.json({
                user: userObj
            });
        } catch (err) {
            console.error('Error in /api/me enrollment lookup:', err);
            const fallbackUser = req.user.toObject ? req.user.toObject() : { ...req.user };
            const fallbackEmail = (fallbackUser.email || '').toLowerCase().trim();
            fallbackUser.isPaid = (fallbackEmail === 'gokuleshkumar878@gmail.com');
            return res.json({
                user: fallbackUser
            });
        }

    }
);


// ==========================================================
// ENROLLMENT
// NO MOBILE NUMBER
// ==========================================================

app.post(
    '/enroll',

    async (req, res) => {

        try {

            const {
                name,
                email,
                mobile,
                course
            } = req.body;


            if (
                !name ||
                !email ||
                !mobile ||
                !course
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Name, email, mobile and course are required!'

                    });

            }


            // ======================================
            // CREATE PENDING ENROLLMENT
            // ======================================

            const enrollment =
                new Enrollment({

                    name:
                        name,

                    email:
                        email,

                    mobile:
                        mobile,

                    course:
                        course,

                    paymentStatus:
                        'PENDING'

                });


            await enrollment.save();


            console.log(
                '✅ Enrollment saved:',
                enrollment
            );


            return res.json({

                success:
                    true,

                message:
                    '✅ Enrollment saved! Proceed to payment.',

                enrollmentId:
                    enrollment._id

            });


        } catch (err) {

            console.error(
                '🔥 Enroll save error:',
                err
            );


            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Server error while saving enrollment'

                });

        }

    }
);


// ==========================================================
// START SERVER
// ==========================================================

const PORT =
    process.env.PORT ||
    5000;


const server = app.listen(
    PORT,
    '0.0.0.0',
    () => {

        console.log(
            `🚀 Server running at http://0.0.0.0:${PORT}`
        );

    }
);

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(
            `❌ Port ${PORT} is already in use by another running process.`
        );
        console.error(
            `💡 Tip: Close the terminal running the previous server or kill the process on port ${PORT}.`
        );
    } else {
        console.error('❌ Server error:', err);
    }
});