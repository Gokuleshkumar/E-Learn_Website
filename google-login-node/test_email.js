require('dotenv').config();
const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER || '';
const rawPass = process.env.EMAIL_PASS || '';
const cleanPass = rawPass.replace(/\s+/g, '');

console.log('--- AGS Academy SMTP Diagnostics ---');
console.log('Testing SMTP connection for:', emailUser);
console.log('Configured Host:', process.env.EMAIL_HOST || 'smtp.gmail.com');
console.log('Password length:', cleanPass.length, 'characters');

if (!emailUser || !cleanPass) {
  console.error('\n❌ EMAIL_USER or EMAIL_PASS is empty in .env');
  console.log('Please set EMAIL_USER and EMAIL_PASS in your .env file.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: cleanPass
  }
});

transporter.verify()
  .then(async () => {
    console.log('\n🎉 SUCCESS: Gmail SMTP credentials are valid!');
    console.log(`Ready to send real OTP verification emails from: ${emailUser}`);

    // If an argument is provided, send a test email (e.g. node test_email.js recipient@example.com)
    const testRecipient = process.argv[2] || emailUser;
    console.log(`Sending sample verification test email to ${testRecipient}...`);
    try {
      const info = await transporter.sendMail({
        from: `"AGS Academy" <${emailUser}>`,
        to: testRecipient,
        subject: 'AGS Academy - SMTP Test Successful',
        text: 'Hello! Your SMTP connection and credentials are fully working. Real OTPs can now be sent to any user.',
        html: '<div style="font-family:sans-serif;padding:20px;border:1px solid #e0e0e0;border-radius:8px;"><h2>✅ SMTP Test Successful</h2><p>Your Gmail credentials are properly authenticated. OTP emails will now be delivered to student inboxes!</p></div>'
      });
      console.log('✅ Test email delivered successfully! Message ID:', info.messageId);
    } catch (sendErr) {
      console.warn('⚠️ Verification succeeded, but test send failed:', sendErr.message);
    }
  })
  .catch((err) => {
    console.error('\n❌ SMTP VERIFICATION FAILED');
    console.error('Error Code:', err.code || 'UNKNOWN');
    console.error('Error Message:', err.message);

    if (err.code === 'EAUTH' || (err.message && err.message.includes('535'))) {
      console.log('\n======================================================');
      console.log('🔑 HOW TO FIX GMAIL SMTP AUTHENTICATION:');
      console.log('======================================================');
      console.log(`1. Sign in to your Google Account (${emailUser})`);
      console.log('2. Ensure "2-Step Verification" is ON at:');
      console.log('   https://myaccount.google.com/security');
      console.log('3. Visit the Google App Passwords page:');
      console.log('   https://myaccount.google.com/apppasswords');
      console.log('4. Enter an App Name (e.g. "AGS Academy") and click "Create"');
      console.log('5. Google will display a 16-character code (e.g. "abcd efgh ijkl mnop")');
      console.log('6. Open your .env file and set:');
      console.log('   EMAIL_PASS=abcd efgh ijkl mnop');
      console.log('7. Re-run: node test_email.js');
      console.log('======================================================\n');
    }
  });
