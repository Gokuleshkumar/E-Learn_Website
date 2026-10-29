/**
 * Brevo (Sendinblue) Automated Email & CRM Integration Service
 * AGS Academys
 */

const BREVO_API_URL = 'https://api.brevo.com/v3';

/**
 * Send an automated, branded welcome email to newly registered students via Brevo.
 * @param {Object} params
 * @param {string} params.email - Student email address
 * @param {string} params.name - Student full name or display name
 * @param {string} [params.phone] - Student phone number (optional)
 * @returns {Promise<Object|null>}
 */
async function sendWelcomeEmailViaBrevo({ email, name, phone }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.warn('⚠️ BREVO_API_KEY is not defined in environment variables. Skipping welcome email.');
        return null;
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const studentName = (name || 'Student').trim();
    const senderEmail = process.env.EMAIL_FROM || 'no-reply@agsacademys.online';
    const senderName = 'AGS Academys';

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AGS Academys</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0c0a14; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #E0E7FF; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #141417; border-radius: 16px; overflow: hidden; border: 1px solid #2e2842; }
    .header { background: linear-gradient(135deg, #18122B 0%, #241442 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #7C3AED; }
    .logo-text { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF; }
    .logo-purple { color: #A78BFA; }
    .content { padding: 32px 28px; background-color: #141417; }
    .title { font-size: 22px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; }
    .greeting { font-size: 15px; line-height: 1.6; color: #D8D6E0; margin-bottom: 24px; }
    .feature-card { background: #1B1826; border: 1px solid #2e2942; border-radius: 12px; padding: 18px 20px; margin-bottom: 16px; }
    .feature-title { font-size: 15px; font-weight: 700; color: #F5F3FF; margin-bottom: 6px; }
    .feature-desc { font-size: 13px; color: #A5A1B8; line-height: 1.5; margin: 0; }
    .cta-container { text-align: center; margin: 32px 0 24px; }
    .cta-btn { display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); color: #FFFFFF !important; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 30px; box-shadow: 0 8px 24px rgba(124, 58, 237, 0.4); }
    .cta-btn:hover { background: #6D28D9; }
    .login-info { background: #181424; border-left: 4px solid #7C3AED; padding: 14px 18px; border-radius: 6px; margin: 24px 0; font-size: 13px; color: #C4B5FD; }
    .footer { background-color: #0C0A14; padding: 24px; text-align: center; font-size: 12px; color: #716D85; border-top: 1px solid #231E33; }
    .footer a { color: #A78BFA; text-decoration: none; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      
      <!-- Header -->
      <div class="header">
        <div class="logo-text">AGS <span class="logo-purple">Academys</span></div>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #C4B5FD; letter-spacing: 0.5px;">E-LEARNING & CAREER ACCELERATOR</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <h1 class="title">Welcome aboard, ${studentName}! 🚀</h1>
        <p class="greeting">
          Thank you for joining <strong>AGS Academys</strong>. Your student account has been successfully created and is ready to use. We are thrilled to empower your coding and technology career journey!
        </p>

        <!-- Credentials / Account Summary Box -->
        <div class="login-info">
          <p style="margin: 0 0 6px 0; font-weight: 700; color: #FFFFFF;">📌 Your Account Details:</p>
          <p style="margin: 0;"><strong>Registered Email:</strong> ${cleanEmail}</p>
          <p style="margin: 4px 0 0 0;"><strong>Portal:</strong> <a href="https://www.agsacademys.online/login.html" style="color: #DDD6FE;">agsacademys.online/login.html</a></p>
        </div>

        <h3 style="color: #FFFFFF; font-size: 16px; margin: 24px 0 14px;">What's waiting for you inside:</h3>

        <div class="feature-card">
          <div class="feature-title">🎓 Top Technical Courses</div>
          <p class="feature-desc">Full Stack Web Dev, Python, Data Science, AI & Machine Learning, Java, and Cloud technologies taught with hands-on real-world projects.</p>
        </div>

        <div class="feature-card">
          <div class="feature-title">⚡ Interactive Quiz Arena (23 Topics)</div>
          <p class="feature-desc">Test and sharpen your skills across 12 course specializations and 11 core CS languages with real-time timers and instant score reports.</p>
        </div>

        <div class="feature-card">
          <div class="feature-title">🤖 24/7 AI Discuss & Doubt Forum</div>
          <p class="feature-desc">Get instant guidance, code debugging assistance, and career roadmap tips powered by our AI learning engine.</p>
        </div>

        <!-- CTA Button -->
        <div class="cta-container">
          <a href="https://www.agsacademys.online/dash.html" class="cta-btn" target="_blank">
            Access Your Student Dashboard →
          </a>
        </div>

        <p style="font-size: 13px; color: #8F8AA3; text-align: center; margin-top: 20px;">
          Need help getting started? Reply directly to this email or reach our support team at <a href="mailto:agsacademys@gmail.com" style="color: #A78BFA;">agsacademys@gmail.com</a>.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0;">© 2026 AGS Academys. All rights reserved.</p>
        <p style="margin: 0;">
          <a href="https://www.agsacademys.online/dash.html">Dashboard</a> · 
          <a href="https://www.agsacademys.online/Aboutus.html">About Us</a> · 
          <a href="https://www.agsacademys.online/contactus.html">Contact Us</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>
    `;

    const payload = {
        sender: {
            name: senderName,
            email: senderEmail
        },
        to: [
            {
                email: cleanEmail,
                name: studentName
            }
        ],
        subject: `🎉 Welcome to AGS Academys, ${studentName}!`,
        htmlContent: htmlContent
    };

    try {
        const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`✅ [Brevo] Automated welcome email delivered to ${cleanEmail} (MessageId: ${data.messageId})`);
            return data;
        } else {
            console.warn(`⚠️ [Brevo] Failed to send welcome email to ${cleanEmail}:`, data);
            return null;
        }
    } catch (err) {
        console.error(`🔥 [Brevo] Network error sending welcome email to ${cleanEmail}:`, err.message);
        return null;
    }
}

/**
 * Add or sync the student into Brevo's CRM Contact List.
 * @param {Object} params
 * @param {string} params.email - Student email
 * @param {string} params.name - Student name
 * @param {string} [params.phone] - Student phone number
 * @returns {Promise<Object|null>}
 */
async function syncContactToBrevo({ email, name, phone }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return null;

    const cleanEmail = (email || '').trim().toLowerCase();
    const studentName = (name || '').trim();

    const attributes = {
        FIRSTNAME: studentName
    };
    if (phone) {
        attributes.SMS = phone.replace(/[^\d+]/g, '');
    }

    const payload = {
        email: cleanEmail,
        attributes: attributes,
        listIds: [2], // Brevo default list ID
        updateEnabled: true
    };

    try {
        const response = await fetch(`${BREVO_API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 201 || response.status === 204) {
            console.log(`✅ [Brevo CRM] Student ${cleanEmail} synced to Brevo contacts list`);
            return { success: true };
        } else {
            const data = await response.json().catch(() => ({}));
            // If contact already exists and was updated, it may return status 204 or specific code
            if (data.code === 'duplicate_parameter') {
                return { success: true };
            }
            console.warn(`⚠️ [Brevo CRM] Contact sync note for ${cleanEmail}:`, data);
            return data;
        }
    } catch (err) {
        console.warn(`⚠️ [Brevo CRM] Contact sync error for ${cleanEmail}:`, err.message);
        return null;
    }
}

module.exports = {
    sendWelcomeEmailViaBrevo,
    syncContactToBrevo
};
