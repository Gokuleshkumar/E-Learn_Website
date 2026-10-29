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

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdO-haDMMXqIXGIv0jzONdO0vbjwZcqbzzV0UZXuwg3B9KB-Q/viewform?usp=sharing&ouid=103364429695066988656';

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AGS Academys - Diwali Special Offer</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0B0813; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #E0E7FF; }
    .wrapper { width: 100%; max-width: 620px; margin: 0 auto; background-color: #120F1D; border-radius: 20px; overflow: hidden; border: 1px solid #2B2342; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); }
    
    /* Header */
    .header { background: linear-gradient(135deg, #1A112C 0%, #29124E 50%, #1A112C 100%); padding: 36px 24px; text-align: center; border-bottom: 2px solid #7C3AED; }
    .logo-text { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF; }
    .logo-purple { color: #A78BFA; }
    .tagline { margin: 8px 0 0 0; font-size: 13px; color: #C4B5FD; letter-spacing: 0.8px; text-transform: uppercase; font-weight: 600; }
    
    /* Content */
    .content { padding: 36px 30px; background-color: #120F1D; }
    .title { font-size: 24px; font-weight: 800; color: #FFFFFF; margin: 0 0 14px; line-height: 1.3; }
    .greeting { font-size: 15px; line-height: 1.6; color: #D4D0E2; margin-bottom: 26px; }
    
    /* Diwali Special Banner */
    .diwali-card { 
      background: linear-gradient(135deg, #2D1B08 0%, #422204 40%, #1E1205 100%); 
      border: 2px solid #F59E0B; 
      border-radius: 16px; 
      padding: 24px 22px; 
      margin-bottom: 28px; 
      text-align: center; 
      box-shadow: 0 10px 30px rgba(245, 158, 11, 0.2); 
      position: relative;
    }
    .diwali-badge { 
      display: inline-block; 
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); 
      color: #1E1205; 
      font-weight: 800; 
      font-size: 12px; 
      letter-spacing: 1px; 
      text-transform: uppercase; 
      padding: 5px 14px; 
      border-radius: 20px; 
      margin-bottom: 12px; 
    }
    .diwali-title { font-size: 22px; font-weight: 800; color: #FEF3C7; margin: 0 0 8px; }
    .diwali-desc { font-size: 14px; color: #FDE68A; line-height: 1.6; margin: 0 0 18px; }
    
    .timeline-box { 
      background: rgba(0, 0, 0, 0.4); 
      border: 1px dashed #F59E0B; 
      border-radius: 10px; 
      padding: 12px 16px; 
      margin-bottom: 20px; 
      display: inline-block; 
      width: 90%; 
      max-width: 480px; 
    }
    .timeline-item { font-size: 13px; color: #FFFBEB; margin: 4px 0; }
    .timeline-item strong { color: #FBBF24; }
    
    /* Primary Diwali Button */
    .diwali-btn { 
      display: inline-block; 
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%); 
      color: #1E1205 !important; 
      text-decoration: none; 
      font-size: 15px; 
      font-weight: 800; 
      padding: 16px 32px; 
      border-radius: 30px; 
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.45); 
      transition: all 0.2s ease;
    }
    
    /* Features */
    .feature-card { background: #1A1528; border: 1px solid #2B2342; border-radius: 12px; padding: 18px 20px; margin-bottom: 14px; }
    .feature-title { font-size: 15px; font-weight: 700; color: #F5F3FF; margin-bottom: 5px; }
    .feature-desc { font-size: 13px; color: #A5A0B8; line-height: 1.5; margin: 0; }
    
    /* Account Box */
    .login-info { background: #161224; border-left: 4px solid #7C3AED; padding: 14px 18px; border-radius: 8px; margin: 26px 0; font-size: 13px; color: #C4B5FD; }
    
    /* Secondary CTA */
    .secondary-cta { text-align: center; margin: 26px 0 10px; }
    .dashboard-btn { 
      display: inline-block; 
      background: #251B3D; 
      border: 1px solid #7C3AED; 
      color: #EDE9FE !important; 
      text-decoration: none; 
      font-size: 14px; 
      font-weight: 700; 
      padding: 12px 28px; 
      border-radius: 30px; 
    }
    
    /* Footer */
    .footer { background-color: #0A0812; padding: 26px 20px; text-align: center; font-size: 12px; color: #6E6A82; border-top: 1px solid #201A30; }
    .footer a { color: #A78BFA; text-decoration: none; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      
      <!-- Brand Header -->
      <div class="header">
        <div class="logo-text">AGS <span class="logo-purple">Academys</span></div>
        <p class="tagline">Next-Gen E-Learning & Career Accelerator</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <h1 class="title">Welcome aboard, ${studentName}! 🚀</h1>
        <p class="greeting">
          Thank you for signing up at <strong>AGS Academys</strong>. Your student account has been created successfully. To help customize your learning path and unlock your special enrollment privileges, please check out our exclusive festive announcement below:
        </p>

        <!-- ================= DIWALI 50% MEGA OFFER CARD ================= -->
        <div class="diwali-card">
          <span class="diwali-badge">🪔 Festive Celebration</span>
          <h2 class="diwali-title">Diwali Mega Offer — FLAT 50% OFF!</h2>
          <p class="diwali-desc">
            Kickstart your tech career with <strong>50% scholarship savings</strong> on all flagship specializations. Select your preferred courses now to lock in early-bird Diwali pricing before batches fill up!
          </p>

          <div class="timeline-box">
            <div class="timeline-item">
              🚀 <strong>Offer Starts:</strong> November 2, 2026 onwards
            </div>
            <div class="timeline-item">
              ⏳ <strong>Offer Deadline:</strong> November 8, 2026 (Midnight IST)
            </div>
          </div>

          <div>
            <a href="${GOOGLE_FORM_URL}" class="diwali-btn" target="_blank">
              👉 Select Your Preferred Course (Claim 50% OFF)
            </a>
          </div>
          <p style="margin: 14px 0 0 0; font-size: 12px; color: #FCD34D;">
            *Takes only 1 minute to submit your preferred course track.
          </p>
        </div>

        <!-- Student Account Details -->
        <div class="login-info">
          <p style="margin: 0 0 6px 0; font-weight: 700; color: #FFFFFF;">📌 Your Registered Account:</p>
          <p style="margin: 0;"><strong>Student Email:</strong> ${cleanEmail}</p>
          <p style="margin: 4px 0 0 0;"><strong>Student Portal:</strong> <a href="https://www.agsacademys.online/login.html" style="color: #DDD6FE;">agsacademys.online/login.html</a></p>
        </div>

        <h3 style="color: #FFFFFF; font-size: 16px; margin: 26px 0 14px;">What's waiting for you inside AGS Academys:</h3>

        <div class="feature-card">
          <div class="feature-title">🎓 Industry-Ready Tech Tracks</div>
          <p class="feature-desc">Full Stack MERN, Python, Data Science, AI & Machine Learning, and Java Enterprise with portfolio projects.</p>
        </div>

        <div class="feature-card">
          <div class="feature-title">⚡ Interactive Quiz Arena (23 Topics)</div>
          <p class="feature-desc">Test your real-world coding knowledge across 12 course specializations and 11 core CS topics with live scorecards.</p>
        </div>

        <div class="feature-card">
          <div class="feature-title">🤖 24/7 AI Discuss & Doubt Forum</div>
          <p class="feature-desc">Instant doubt clearing, automated code reviews, and structured career guidance whenever you need it.</p>
        </div>

        <!-- Secondary CTA: Student Dashboard -->
        <div class="secondary-cta">
          <a href="https://www.agsacademys.online/dash.html" class="dashboard-btn" target="_blank">
            Visit Your Student Dashboard →
          </a>
        </div>

        <p style="font-size: 13px; color: #8F8AA3; text-align: center; margin-top: 24px; line-height: 1.5;">
          Have questions regarding the Diwali 50% offer or course curriculum? Reply directly to this email or reach us anytime at <a href="mailto:agsacademys@gmail.com" style="color: #A78BFA;">agsacademys@gmail.com</a>.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #9A95B0;">AGS Academys — Empowering Your Future With Modern Tech Skills</p>
        <p style="margin: 0 0 12px 0;">© 2026 AGS Academys. All rights reserved.</p>
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
        subject: `🪔 Welcome to AGS Academys + 50% Diwali Offer, ${studentName}!`,
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
