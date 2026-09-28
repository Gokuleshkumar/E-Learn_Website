document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('gopu-chatbot-toggle');
    const chatbotContainer = document.getElementById('gopu-chatbot-container');
    const chatbotClose = document.getElementById('gopu-chatbot-close');
    const chatbotInput = document.getElementById('gopu-chatbot-input');
    const chatbotSend = document.getElementById('gopu-chatbot-send');
    const chatbotMessages = document.getElementById('gopu-chatbot-messages');

    if (!chatbotToggle || !chatbotContainer) return;

    // Toggle Chatbot Visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('hidden');
        if (!chatbotContainer.classList.contains('hidden')) {
            chatbotInput.focus();
            scrollToBottom();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.add('hidden');
    });

    // Send Message
    const sendMessage = () => {
        const text = chatbotInput.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage(text, 'user');
        chatbotInput.value = '';

        // Process Bot Response
        setTimeout(() => {
            const response = getBotResponse(text.toLowerCase());
            appendMessage(response, 'bot');
        }, 500); // Small delay for realism
    };

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    const appendMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('flex', 'w-full', 'mb-4');
        
        if (sender === 'user') {
            msgDiv.classList.add('justify-end');
            msgDiv.innerHTML = `
                <div class="bg-udemy-purple text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm shadow-sm">
                    ${text}
                </div>
            `;
        } else {
            msgDiv.classList.add('justify-start');
            msgDiv.innerHTML = `
                <div class="flex items-end gap-2 max-w-[80%]">
                    <div class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mb-1 overflow-hidden">
                        <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&backgroundColor=ffffff" alt="Gopu" class="w-8 h-8">
                    </div>
                    <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 text-sm shadow-sm">
                        ${text}
                    </div>
                </div>
            `;
        }
        
        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const getBotResponse = (input) => {
        const text = input.toLowerCase();

        // 1. Greetings & Small Talk
        if (/(^|\s)(hi|hello|hey|greetings|morning|afternoon|evening|wassup|sup)($|\s)/.test(text)) {
            return "Hey there! 👋 I'm Gopu, the AGS Academy assistant. How can I help you today?";
        }
        if (/how are you|how do you do|how's it going/.test(text)) {
            return "I'm doing great, thanks for asking! 🤖 Just hanging out in the server, ready to help you learn. What's on your mind?";
        }
        if (/who are you|your name|what are you/.test(text)) {
            return "I'm Gopu! A friendly virtual assistant built to help AGS Academy students find their way around. 🤖";
        }
        if (/thank you|thanks|thx|appreciate it/.test(text)) {
            return "You're very welcome! Let me know if you need anything else. 😊";
        }
        if (/bye|goodbye|see ya|cya/.test(text)) {
            return "Goodbye! Have a great day and happy learning! 🚀";
        }

        // 2. Timings & Cohorts
        if (/time|timing|schedule|duration|how long/.test(text)) {
            return "Our schedule is super flexible! 🌙 Live classes run for 1.5 hours per day, 5 days a week. All our courses have a duration of exactly 4 months.";
        }
        if (/cohort|batch|start|begin/.test(text)) {
            return "Our learning cohorts are awesome! 🎉 For our highly-rated Training cum Placement program, the new batch is starting on Feb 1, 2026. Be sure to reserve your seat!";
        }

        // 3. Fees, Pricing & Refunds
        if (/fee|price|cost|pay|how much/.test(text)) {
            return "Our flagship Training cum Placement Program is currently discounted to ₹25,000. 💳 Standalone skill courses usually run under ₹10,000. It's a great investment in your career!";
        }
        if (/refund|cancel|money back/.test(text)) {
            return "Please note that we have a strict no-refund policy for all our courses and programs. We encourage you to review the curriculum carefully before enrolling! ⚠️";
        }

        // 4. Placements & Certificates
        if (/placement|job|guarantee|interview|hiring/.test(text)) {
             return "Our Training cum Placement program comes with 100% guaranteed placement support! 🎯 We provide intensive training and assure you get the right opportunities to land your dream role.";
        }
        if (/certificate|certification|proof/.test(text)) {
             return "Yes! 🎓 You'll get a verified AGS Academy certificate upon completion of any course, which you can showcase on LinkedIn and your resume.";
        }

        // 5. Help, Login, & Syllabus
        if (/password|login|account|can't access/.test(text)) {
            return "Having trouble logging in? Try resetting your password on the login page. If it still doesn't work, reach out to our tech support! 🔐";
        }
        if (/help|support|stuck|issue|problem|contact|phone|number|email|call/.test(text)) {
            return "Don't worry, I've got your back! 😊 You can find answers in the Help & Support section, or shoot an email to my human friends at support@agsacademy.com. You can also visit our Contact Us page for phone numbers.";
        }
        if (/syllabus|curriculum|what will i learn/.test(text)) {
            return "You can view the detailed syllabus for any course by clicking on its card in the dashboard. It will show you a week-by-week breakdown! 📚";
        }

        // 6. Website Stats, Ratings & About Us
        if (/rating|review|feedback|star/.test(text)) {
            return "Our students love our courses! We've successfully trained over 1k+ learners with a fantastic track record. ⭐ Check out our homepage for success stories!";
        }
        if (/about|who are you|what is ags|stats/.test(text)) {
            return "AGS Academy is a premium e-learning platform! 🚀 We have over 1k+ learners, 10+ expert instructors, and 10+ premium courses designed to get you hired.";
        }

        // 7. Pedagogy & Prerequisites
        if (/prerequisite|experience|beginner|no code|coding knowledge/.test(text)) {
            return "Most of our courses are designed to take you from beginner to advanced! 📈 You don't need prior coding experience for our foundational cohorts—we teach you from scratch.";
        }
        if (/instructor|teacher|who teaches|faculty/.test(text)) {
            return "Our courses are taught by industry experts who have years of real-world experience at top tech companies. You're learning from the best! 👨‍🏫";
        }
        if (/project|portfolio|hands-on/.test(text)) {
            return "Absolutely! Our curriculum is highly practical. You'll build at least 3 real-world projects in every course to showcase on your resume and GitHub. 💻";
        }
        if (/online|offline|mode|where are classes/.test(text)) {
            return "Our classes are currently conducted Live Online. 🌐 This allows you to learn interactively from anywhere while still getting real-time doubt clearing!";
        }

        // 8. Specific Courses (Expanded)
        if (text.includes('java')) {
            return "Yep, we have an awesome Java course! ☕ It covers Java with SpringBoot from Zero to Hero. You can find it right in the course catalog!";
        }
        if (text.includes('python')) {
            return "Absolutely! 🐍 We have a top-rated Python with Django Full Stack Developer course. You can enroll directly from your dashboard.";
        }
        if (text.includes('data science') || text.includes('machine learning') || text.includes('ml')) {
            return "Data Science and Machine Learning are our specialties! 🧠 We have dedicated tracks for both that are highly in demand right now.";
        }
        if (text.includes('frontend') || text.includes('front end') || text.includes('react')) {
            return "We have a fantastic Front End Development Masterclass covering React, Tailwind, and modern UI/UX principles! 🎨";
        }
        if (text.includes('backend') || text.includes('back end') || text.includes('node') || text.includes('express')) {
            return "Yes! We teach backend development extensively, including Node.js, Express, and Database management. ⚙️";
        }
        if (text.includes('dsa') || text.includes('data structure') || text.includes('algorithm')) {
            return "DSA is critical for interviews! 🧩 We have a comprehensive Data Structures and Algorithms course to help you crack product-based companies.";
        }
        if (text.includes('cyber') || text.includes('security')) {
            return "Looking to become an ethical hacker? 🛡️ Our Cybersecurity course is perfect for learning the ins and outs of network security.";
        }
        if (text.includes('ui') || text.includes('ux') || text.includes('design')) {
            return "We have a great UI/UX Design course! 🖌️ You'll learn Figma, wireframing, and how to create stunning user experiences.";
        }
        if (text.includes('quantum') || text.includes('ai ') || text.includes('artificial intelligence')) {
            return "We are on the cutting edge! 🤖 Check out our courses on Artificial Intelligence and Quantum Computing for the tech of the future.";
        }

        // 9. General Course List
        if (/course|courses|list|catalog|what do you teach|what can i learn/.test(text)) {
            return "We offer 12 premium courses! 🚀 Options include Data Science, Full Stack Web Dev, Machine Learning, Java, Python, UI/UX, Cyber Security and more. Browse the full catalog on your dashboard.";
        }

        // Fallback
        return "I'm still learning and might not have caught that perfectly! 😅 But I can definitely tell you about our courses, timings, batches, fees, or how to get support. Could you try rephrasing?";
    };
});
