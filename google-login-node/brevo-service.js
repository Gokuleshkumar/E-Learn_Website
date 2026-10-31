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
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdO-haDMMXqIXGIv0jzONdO0vbjwZcqbzzV0UZXuwg3B9KB-Q/viewform?usp=preview';
    const personalizedDashboardUrl = `https://www.agsacademys.online/dash.html?user=${encodeURIComponent(studentName)}&email=${encodeURIComponent(cleanEmail)}`;
    const AI_DISCUSS_URL = process.env.AI_DISCUSS_URL || 'https://ags-ai-discuss.onrender.com';
    const personalizedAiDiscussUrl = `${AI_DISCUSS_URL}/?autoLogin=true&name=${encodeURIComponent(studentName)}`;
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AGS Academys - Training & Placement Program</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; }
    .wrapper { width: 100%; max-width: 600px; margin: 24px auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); }
    
    /* Header */
    .header { background: #0F172A; padding: 32px 24px; text-align: center; border-bottom: 3px solid #4F46E5; }
    .logo-text { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF; }
    .logo-purple { color: #818CF8; }
    .tagline { margin: 6px 0 0 0; font-size: 13px; color: #94A3B8; letter-spacing: 0.5px; text-transform: uppercase; font-weight: 600; }
    
    /* Content */
    .content { padding: 32px 28px; background-color: #FFFFFF; }
    .greeting { font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 12px; }
    .intro-p { font-size: 14.5px; line-height: 1.65; color: #334155; margin: 0 0 18px; }
    
    /* Placement Highlight Box */
    .placement-box {
      background: #F8FAFC;
      border: 2px solid #4F46E5;
      border-radius: 10px;
      padding: 22px 20px;
      margin: 22px 0;
    }
    .placement-title {
      font-size: 17px;
      font-weight: 800;
      color: #1E1B4B;
      margin: 0 0 12px;
    }
    .point-item {
      font-size: 14px;
      line-height: 1.6;
      color: #1E293B;
      margin: 8px 0;
      padding-left: 4px;
    }
    
    /* 50% Offer Box */
    .offer-box {
      background: #EFF6FF;
      border: 1.5px dashed #2563EB;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      margin: 24px 0;
    }
    .offer-badge {
      display: inline-block;
      background: #2563EB;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 14px;
      margin-bottom: 10px;
    }
    .offer-title {
      font-size: 20px;
      font-weight: 800;
      color: #1E3A8A;
      margin: 0 0 8px;
    }
    .offer-desc {
      font-size: 14px;
      color: #1E40AF;
      line-height: 1.6;
      margin: 0 0 14px;
    }
    .validity-tag {
      display: inline-block;
      background: #DBEAFE;
      color: #1E3A8A;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 6px;
      margin-bottom: 18px;
    }
    
    /* CTA Button */
    .cta-btn {
      display: inline-block;
      background: #4F46E5;
      color: #FFFFFF !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 700;
      padding: 14px 28px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    
    /* Courses List */
    .courses-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 18px 20px;
      margin: 20px 0;
    }
    .course-item {
      font-size: 13.5px;
      color: #334155;
      margin: 7px 0;
      line-height: 1.5;
    }
    
    /* Account Box */
    .account-box {
      background: #F1F5F9;
      border-left: 4px solid #4F46E5;
      padding: 12px 16px;
      border-radius: 6px;
      margin: 22px 0;
      font-size: 13px;
      color: #334155;
    }
    
    /* Footer */
    .footer {
      background-color: #0F172A;
      padding: 24px 20px;
      text-align: center;
      font-size: 12px;
      color: #94A3B8;
      border-top: 1px solid #1E293B;
    }
    .footer a { color: #818CF8; text-decoration: none; }
  </style>
</head>
<body>
  <div style="padding: 16px 8px;">
    <div class="wrapper">
      
      <!-- Brand Header -->
      <div class="header">
        <div class="logo-text">AGS <span class="logo-purple">Academys</span></div>
        <p class="tagline">Skill Development & Placement Academy</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <div class="greeting">Dear ${studentName},</div>
        <p class="intro-p">
          Welcome to <strong>AGS Academys</strong>! Your student account has been created successfully.
        </p>
        <p class="intro-p">
          At AGS Academys, our focus is grounded in real technical capability and career transformation. We don't just teach theory — we train you with hands-on, practical development mentored by experienced engineers who understand industry requirements.
        </p>

        <!-- Training & Placement Program Focus -->
        <div class="placement-box">
          <div class="placement-title">
            🎯 Training & Placement Program at AGS Academys
          </div>
          <div class="point-item">
            ✅ <strong>100% Placement Guidance:</strong> We 100% guide you through the placement process — from building production-grade projects and ATS-friendly resumes to technical mock interviews and HR rounds.
          </div>
          <div class="point-item">
            🏢 <strong>Companies Visit Our AGS Academys:</strong> Reputed tech companies and startups visit our AGS Academys to recruit qualified candidates directly from our batches.
          </div>
          <div class="point-item">
            🚀 <strong>1,000+ Students Placed:</strong> We have successfully placed over <strong>1,000+ students</strong> for high-impact <strong>Internships and Full-Time Offers (FTO)</strong> across the tech industry.
          </div>
          <div class="point-item" style="margin-top: 10px; font-weight: 700; color: #4F46E5;">
            👉 Here is your chance to step in and build a career you are proud of.
          </div>
        </div>

        <!-- Courses Offered -->
        <div class="courses-box">
          <div style="font-weight: 700; color: #0F172A; font-size: 15px; margin-bottom: 8px;">
            📚 Industry Tracks Offered at AGS Academys:
          </div>
          <div class="course-item">🔹 <strong>Full Stack Web Development</strong> (MERN Stack, Next.js, Cloud Deployment)</div>
          <div class="course-item">🔹 <strong>Python & Data Science</strong> (Data Analytics, Pandas, Visualization)</div>
          <div class="course-item">🔹 <strong>Artificial Intelligence & Machine Learning</strong> (Deep Learning, NLP)</div>
          <div class="course-item">🔹 <strong>Java Full Stack</strong> (Spring Boot, REST APIs, Microservices)</div>
          <div class="course-item">🔹 <strong>Cyber Security & Ethical Hacking</strong> (Network Defense, Auditing)</div>
          <div class="course-item">🔹 <strong>UI/UX Design</strong> (Figma, Design Systems, Prototyping)</div>
          <div class="course-item">🔹 <strong>Data Structures & Algorithms (DSA)</strong> (Coding Interview Prep)</div>
        </div>

        <!-- 50% Special Offer Box -->
        <div class="offer-box">
          <span class="offer-badge">Limited Time Opportunity</span>
          <h2 class="offer-title">Grab 50% OFF on Courses & Training Program</h2>
          <p class="offer-desc">
            Here is your chance to enroll in our flagship courses and complete Training & Placement Program with a <strong>flat 50% scholarship discount</strong>.
          </p>
          <div class="validity-tag">
            ⏳ Offer Validity: <strong>November 2, 2026 to November 8, 2026</strong>
          </div>
          <div>
            <a href="${GOOGLE_FORM_URL}" class="cta-btn" target="_blank">
              👉 Fill Course Preference Form (Claim 50% OFF)
            </a>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748B;">
            Takes only 1 minute to select your preferred course track and secure your 50% discount slot.
          </p>
        </div>

        <!-- Registered Account Info -->
        <div class="account-box">
          <p style="margin: 0 0 4px 0; font-weight: 700; color: #0F172A;">📌 Your Account Details:</p>
          <p style="margin: 0;"><strong>Registered Email:</strong> ${cleanEmail}</p>
          <p style="margin: 4px 0 0 0;"><strong>Student Portal:</strong> <a href="https://www.agsacademys.online/login.html" style="color: #4F46E5; font-weight: 600;">agsacademys.online/login.html</a></p>
        </div>

        <!-- AI Discuss and Dashboard Links -->
        <div style="text-align: center; margin: 24px 0 10px;">
          <a href="${personalizedDashboardUrl}" target="_blank" style="display: inline-block; margin: 4px; padding: 10px 20px; background: #0F172A; color: #FFFFFF; font-size: 13.5px; font-weight: 600; text-decoration: none; border-radius: 6px;">
            Go to Student Dashboard →
          </a>
          <a href="${personalizedAiDiscussUrl}" target="_blank" style="display: inline-block; margin: 4px; padding: 10px 20px; background: #EEF2FF; color: #4F46E5; border: 1px solid #C7D2FE; font-size: 13.5px; font-weight: 600; text-decoration: none; border-radius: 6px;">
            Open 24/7 AI Doubt Forum →
          </a>
        </div>

        <p style="font-size: 13.5px; color: #64748B; margin-top: 26px; line-height: 1.5;">
          If you have any questions about the courses or the Training & Placement Program, simply reply to this email or write to us directly at <a href="mailto:agsacademys@gmail.com" style="color: #4F46E5; font-weight: 600;">agsacademys@gmail.com</a>.
        </p>

        <p style="font-size: 14px; color: #334155; margin-top: 20px; line-height: 1.5;">
          Warm regards,<br>
          <strong>Academic & Placement Cell</strong><br>
          AGS Academys
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #E2E8F0;">AGS Academys — Real Skills. Real Placements.</p>
        <p style="margin: 0 0 10px 0;">© 2026 AGS Academys. All rights reserved.</p>
        <p style="margin: 0;">
          <a href="${personalizedDashboardUrl}">Dashboard</a> · 
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
        subject: `Welcome to AGS Academys — 50% Off Courses & Training & Placement Program (Nov 2 - Nov 8)`,
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

/**
 * Send VIP enrollment confirmation email to Paid Students via Brevo HTTPS API.
 * Includes direct AI Discuss access button and personalized dashboard button.
 * @param {Object} params
 * @param {string} params.email - Student email
 * @param {string} params.name - Student name
 * @param {string} [params.courseName] - Enrolled course title
 * @param {number|string} [params.amount] - Payment amount
 * @returns {Promise<Object|null>}
 */
async function sendPaidUserWelcomeEmailViaBrevo({ email, name, courseName, amount }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.warn('⚠️ BREVO_API_KEY is not defined in environment variables. Skipping paid welcome email.');
        return null;
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const studentName = (name || 'Student').trim();
    const courseTitle = courseName || 'Full Stack & AI Specialization';
    const senderEmail = process.env.EMAIL_FROM || 'no-reply@agsacademys.online';
    const senderName = 'AGS Academys';
    const AI_DISCUSS_URL = process.env.AI_DISCUSS_URL || 'https://ags-ai-discuss.onrender.com';
    const personalizedAiDiscussUrl = `${AI_DISCUSS_URL}/?autoLogin=true&name=${encodeURIComponent(studentName)}`;
    const personalizedDashboardUrl = `https://www.agsacademys.online/dash.html?user=${encodeURIComponent(studentName)}&email=${encodeURIComponent(cleanEmail)}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIP Access Unlocked - AGS Academys</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0B0813; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #E0E7FF; }
    .wrapper { width: 100%; max-width: 620px; margin: 0 auto; background-color: #120F1D; border-radius: 20px; overflow: hidden; border: 1px solid #3B2A63; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6); }
    .header { background: linear-gradient(135deg, #1E1238 0%, #3B166A 50%, #1E1238 100%); padding: 36px 24px; text-align: center; border-bottom: 2px solid #A855F7; }
    .vip-tag { display: inline-block; padding: 4px 14px; background: rgba(250, 204, 21, 0.18); border: 1px solid #FACC15; color: #FDE047; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
    .logo-text { font-size: 28px; font-weight: 800; color: #FFFFFF; }
    .content { padding: 36px 30px; background-color: #120F1D; }
    .hero-btn { display: block; width: 100%; box-sizing: border-box; text-align: center; padding: 18px 24px; background: linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #C026D3 100%); color: #FFFFFF !important; font-size: 16px; font-weight: 800; border-radius: 12px; text-decoration: none; box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45); }
    .feature-card { background: #181427; border: 1px solid #28203E; border-radius: 12px; padding: 16px 18px; margin-bottom: 12px; }
    .feature-title { font-weight: 700; color: #FFFFFF; font-size: 14px; margin-bottom: 4px; }
    .feature-desc { font-size: 13px; color: #A5A0BA; margin: 0; line-height: 1.45; }
    .footer { padding: 24px 30px 32px; background-color: #0E0B17; text-align: center; font-size: 12px; color: #6E6885; border-top: 1px solid #1E1A2C; }
    .footer a { color: #A78BFA; text-decoration: none; margin: 0 6px; }
  </style>
</head>
<body>
  <div style="background-color: #0B0813; padding: 30px 15px;">
    <div class="wrapper">
      <div class="header">
        <span class="vip-tag">👑 VIP STUDENT ACCESS</span>
        <div class="logo-text">AGS <span style="color: #A78BFA;">Academys</span></div>
        <p style="margin: 6px 0 0; color: #DDD6FE; font-size: 13px;">Premium Tech Education & Live AI Support</p>
      </div>

      <div class="content">
        <h1 style="color: #FFFFFF; font-size: 22px; margin: 0 0 12px;">🎉 Welcome to VIP Learning, ${studentName}!</h1>
        <p style="color: #D4D0E2; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Your enrollment in <strong>${courseTitle}</strong> is officially confirmed! You now have unrestricted lifetime access to our <strong>24/7 AI Discuss & Doubt Forum</strong>, full course curriculum, and all quiz tracks.
        </p>

        <!-- Primary CTA: Direct AI Discuss Launch -->
        <div style="margin: 28px 0; text-align: center;">
          <a href="${personalizedAiDiscussUrl}" class="hero-btn" target="_blank">
            🤖 Open 24/7 AI Discuss & Doubt Forum →
          </a>
          <p style="margin: 8px 0 0; font-size: 12px; color: #A78BFA;">*Auto-authenticates you as ${studentName} with zero extra logins required.</p>
        </div>

        <h3 style="color: #FFFFFF; font-size: 15px; margin: 28px 0 12px;">Your Unlocked VIP Privileges:</h3>

        <div class="feature-card" style="border-left: 3px solid #8B5CF6;">
          <div class="feature-title">🤖 24/7 AI Discuss & Doubt Forum</div>
          <p class="feature-desc">Speak in real-time or upload code & homework screenshots for instant explanations from your personal AI tutor.</p>
        </div>

        <div class="feature-card" style="border-left: 3px solid #F59E0B;">
          <div class="feature-title">⚡ VIP Quiz Arena (All 23 Tracks Unlocked)</div>
          <p class="feature-desc">Master industry interview questions across 12 course tracks and 11 programming domains with real-time scoring.</p>
        </div>

        <div class="feature-card" style="border-left: 3px solid #10B981;">
          <div class="feature-title">🎓 Accredited Course Curriculum & Certificate</div>
          <p class="feature-desc">Interactive modules, downloadable source code, capstone projects, and industry-recognized completion certificate.</p>
        </div>

        <!-- Secondary CTA: Student Dashboard -->
        <div style="margin-top: 24px; text-align: center;">
          <a href="${personalizedDashboardUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background: #1E1733; border: 1px solid #7C3AED; color: #DDD6FE; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 10px;">
            Visit Your Student Dashboard →
          </a>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #9A95B0;">AGS Academys — Empowering Your Future With Modern Tech Skills</p>
        <p style="margin: 0 0 12px 0;">© 2026 AGS Academys. All rights reserved.</p>
        <p style="margin: 0;">
          <a href="${personalizedDashboardUrl}">Dashboard</a> · 
          <a href="${personalizedAiDiscussUrl}">AI Discuss</a> · 
          <a href="https://www.agsacademys.online/Aboutus.html">About Us</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const payload = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: cleanEmail, name: studentName }],
        subject: `👑 VIP Access Activated: Welcome to ${courseTitle} + 24/7 AI Discuss!`,
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
            console.log(`✅ [Brevo VIP] Paid user confirmation email delivered to ${cleanEmail} (MessageId: ${data.messageId})`);
            return data;
        } else {
            console.warn(`⚠️ [Brevo VIP] Failed to send paid user email to ${cleanEmail}:`, data);
            return null;
        }
    } catch (err) {
        console.error(`🔥 [Brevo VIP] Network error sending paid user email to ${cleanEmail}:`, err.message);
        return null;
    }
}

module.exports = {
    sendWelcomeEmailViaBrevo,
    sendPaidUserWelcomeEmailViaBrevo,
    syncContactToBrevo
};

