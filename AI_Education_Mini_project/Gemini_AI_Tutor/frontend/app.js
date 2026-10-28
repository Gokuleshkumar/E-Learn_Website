/* ================================================================
   Gopu - Main Application Script
   Handles WebSocket communication, audio/video capture, and UI
   ================================================================ */

(() => {
    "use strict";

    // ── State ───────────────────────────────────────────────────
    const state = {
        ws: null,
        sessionId: null,
        selectedSubject: null,
        isConnected: false,
        isRecording: false,
        audioContext: null,
        mediaStream: null,
        mediaRecorder: null,
        audioWorklet: null,
        cameraStream: null,
        capturedImageData: null,
        timerInterval: null,
        sessionSeconds: 0,
        audioQueue: [],
        isPlayingAudio: false,
        currentTutorMessage: "",
        // New state for speech recognition & indicators
        speechRecognition: null,
        currentSpeechBubble: null,
        currentSpeechText: "",
        audioChunksSent: 0,
        userProfile: null,
        conversationHistory: [],
    };

    // ── DOM Elements ────────────────────────────────────────────
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const els = {
        // Screens
        signin: $("#signin"),
        landing: $("#landing"),
        session: $("#session"),
        reviewScreen: $("#reviewScreen"),

        // Review elements
        reviewLoading: $("#reviewLoading"),
        reviewContent: $("#reviewContent"),
        reviewStudentName: $("#reviewStudentName"),
        reviewSubject: $("#reviewSubject"),
        reviewDuration: $("#reviewDuration"),
        reviewSummary: $("#reviewSummary"),
        reviewScore: $("#reviewScore"),
        reviewBadge: $("#reviewBadge"),
        reviewStrengthsList: $("#reviewStrengthsList"),
        reviewWeaknessesList: $("#reviewWeaknessesList"),
        reviewStepsList: $("#reviewStepsList"),
        reviewGoalsList: $("#reviewGoalsList"),
        reviewTopicsTags: $("#reviewTopicsTags"),
        btnReviewRestart: $("#btnReviewRestart"),
        btnReviewStartNew: $("#btnReviewStartNew"),

        // Sign-in / Sign-up
        signinForm: $("#signinForm"),
        loginForm: $("#loginForm"),
        inputUsername: $("#inputUsername"),
        inputPassword: $("#inputPassword"),
        loginUsername: $("#loginUsername"),
        loginPassword: $("#loginPassword"),
        inputName: $("#inputName"),
        inputGrade: $("#inputGrade"),
        inputAge: $("#inputAge"),
        inputLanguage: $("#inputLanguage"),
        authTabs: $$("#signin .auth-tab"),
        btnLogout: $("#btnLogout"),

        // Subject
        subjectGrid: $("#subjectGrid"),
        sessionLanguage: $("#sessionLanguage"),

        // Session header
        sessionSubject: $("#sessionSubject"),
        sessionStatus: $("#sessionStatus"),
        sessionTimer: $("#sessionTimer"),
        btnBack: $("#btnBack"),

        // Chat
        chatArea: $("#chatArea"),
        chatMessages: $("#chatMessages"),

        // Controls
        btnMic: $("#btnMic"),
        btnCamera: $("#btnCamera"),
        btnUpload: $("#btnUpload"),
        btnEndSession: $("#btnEndSession"),
        textInput: $("#textInput"),
        btnSendText: $("#btnSendText"),

        // Camera
        cameraPreview: $("#cameraPreview"),
        cameraVideo: $("#cameraVideo"),
        btnCapture: $("#btnCapture"),
        btnCloseCamera: $("#btnCloseCamera"),
        captureCanvas: $("#captureCanvas"),

        // Image preview
        imagePreview: $("#imagePreview"),
        previewImage: $("#previewImage"),
        btnSendImage: $("#btnSendImage"),
        btnDiscardImage: $("#btnDiscardImage"),

        // File upload
        fileInput: $("#fileInput"),

        // Toast
        toastContainer: $("#toastContainer"),
    };

    // ── Initialization ──────────────────────────────────────────
    function init() {
        // Auto-login via URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('autoLogin') === 'true') {
            const userName = urlParams.get('name') || 'Student';
            state.userProfile = {
                username: "auto_user",
                name: userName,
                gender: "other",
                grade: "N/A",
                age: 20,
                language: "en"
            };
            localStorage.setItem("gopu_profile", JSON.stringify(state.userProfile));
            applyTheme("other");
            showLandingWithGreeting();
        } else {
            // Check for existing profile in localStorage
            const saved = localStorage.getItem("gopu_profile");
            if (saved) {
                try {
                    state.userProfile = JSON.parse(saved);
                    applyTheme(state.userProfile.gender);
                    showLandingWithGreeting();
                } catch (_) {
                    showScreen("signin");
                }
            }
        }

        // Sign-in form (sign-up)
        if (els.signinForm) {
            els.signinForm.addEventListener("submit", handleSignUp);
        }

        // Login form
        if (els.loginForm) {
            els.loginForm.addEventListener("submit", handleLogin);
        }

        // Auth tab switching
        els.authTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                els.authTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
                const mode = tab.dataset.tab;
                if (mode === "login") {
                    els.loginForm.style.display = "";
                    els.signinForm.style.display = "none";
                } else {
                    els.loginForm.style.display = "none";
                    els.signinForm.style.display = "";
                }
            });
        });

        // Logout
        if (els.btnLogout) {
            els.btnLogout.addEventListener("click", handleLogout);
        }

        // Subject selection
        els.subjectGrid.addEventListener("click", (e) => {
            const card = e.target.closest(".subject-card");
            if (card) {
                const subject = card.dataset.subject;
                startSession(subject);
            }
        });

        // Session controls
        els.btnBack.addEventListener("click", () => endSession(true));
        els.btnEndSession.addEventListener("click", () => endSession(true));

        if (els.btnReviewRestart) {
            els.btnReviewRestart.addEventListener("click", () => showLandingWithGreeting());
        }
        if (els.btnReviewStartNew) {
            els.btnReviewStartNew.addEventListener("click", () => showLandingWithGreeting());
        }

        // Language selector on landing page
        if (els.sessionLanguage) {
            els.sessionLanguage.addEventListener("change", () => {
                if (state.userProfile) {
                    state.userProfile.language = els.sessionLanguage.value;
                    localStorage.setItem("gopu_profile", JSON.stringify(state.userProfile));
                }
            });
        }

        // Mic: click to toggle (not hold)
        els.btnMic.addEventListener("click", toggleRecording);

        els.btnCamera.addEventListener("click", toggleCamera);
        els.btnUpload.addEventListener("click", () => els.fileInput.click());
        els.fileInput.addEventListener("change", handleFileUpload);

        // Camera controls
        els.btnCapture.addEventListener("click", captureImage);
        els.btnCloseCamera.addEventListener("click", closeCamera);

        // Image preview
        els.btnSendImage.addEventListener("click", sendCapturedImage);
        els.btnDiscardImage.addEventListener("click", discardImage);

        // Text input
        els.btnSendText.addEventListener("click", sendTextMessage);
        els.textInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendTextMessage();
            }
        });

        console.log("Gopu initialized");
    }

    // ── Sign-Up ─────────────────────────────────────────────────
    async function handleSignUp(e) {
        e.preventDefault();

        const genderRadio = document.querySelector('input[name="gender"]:checked');
        if (!genderRadio) {
            showToast("Please select your gender.", "error");
            return;
        }

        const username = els.inputUsername.value.trim();
        const password = els.inputPassword.value;

        if (!username || username.length < 3) {
            showToast("Username must be at least 3 characters.", "error");
            return;
        }
        if (!password || password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }

        const profile = {
            username: username,
            password: password,
            name: els.inputName.value.trim(),
            gender: genderRadio.value,
            grade: els.inputGrade.value,
            age: parseInt(els.inputAge.value, 10) || 0,
            language: els.inputLanguage.value || "en",
        };

        if (!profile.name) {
            showToast("Please enter your name.", "error");
            return;
        }

        // Register on backend
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            const data = await res.json();
            if (!res.ok) {
                showToast(data.detail || "Registration failed.", "error");
                return;
            }
            profile.id = data.user?.id;
        } catch (_) {
            showToast("Server unreachable. Please try again.", "error");
            return;
        }

        // Don't store password locally
        const localProfile = { ...profile };
        delete localProfile.password;
        state.userProfile = localProfile;
        localStorage.setItem("gopu_profile", JSON.stringify(localProfile));

        applyTheme(profile.gender);
        showToast(`Account created! Welcome, ${profile.name}!`, "success");
        showLandingWithGreeting();
    }

    // ── Log-In ──────────────────────────────────────────────────
    async function handleLogin(e) {
        e.preventDefault();

        const username = els.loginUsername.value.trim();
        const password = els.loginPassword.value;

        if (!username || !password) {
            showToast("Please enter username and password.", "error");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                showToast(data.detail || "Invalid username or password.", "error");
                return;
            }

            const profile = data.user;
            state.userProfile = profile;
            localStorage.setItem("gopu_profile", JSON.stringify(profile));

            applyTheme(profile.gender);
            showToast(`Welcome back, ${profile.name}!`, "success");
            showLandingWithGreeting();
        } catch (_) {
            showToast("Server unreachable. Please try again.", "error");
        }
    }

    // ── Logout ───────────────────────────────────────────────────
    function handleLogout() {
        state.userProfile = null;
        localStorage.removeItem("gopu_profile");
        document.body.classList.remove("theme-pink", "theme-blue");
        // Redirect to the main dashboard
        window.location.href = "http://localhost:5000/dash.html";
    }

    function applyTheme(gender) {
        document.body.classList.remove("theme-pink", "theme-blue");
        if (gender === "girl") {
            document.body.classList.add("theme-pink");
        } else {
            document.body.classList.add("theme-blue");
        }
    }

    function showLandingWithGreeting() {
        showScreen("landing");
        // Sync language selector with profile
        if (state.userProfile && state.userProfile.language && els.sessionLanguage) {
            els.sessionLanguage.value = state.userProfile.language;
        }
        // Add welcome greeting if user profile exists
        if (state.userProfile) {
            let greeting = $("#landingGreeting");
            if (!greeting) {
                greeting = document.createElement("p");
                greeting.id = "landingGreeting";
                greeting.className = "welcome-greeting";
                const heroTitle = $(".landing-main .hero-title");
                if (heroTitle) heroTitle.before(greeting);
            }
            greeting.innerHTML = `Hi <span class="user-name">${escapeHtml(state.userProfile.name)}</span>! Ready to start?`;
        }
    }

    // ── Screen Navigation ───────────────────────────────────────
    function showScreen(screenId) {
        $$(".screen").forEach((s) => s.classList.remove("active"));
        const target = $(`#${screenId}`);
        if (target) {
            target.classList.add("active");
            target.scrollTop = 0;
        }

        if (screenId === "reviewScreen") {
            document.body.classList.add("screen-review-active");
            document.documentElement.classList.add("screen-review-active");
        } else {
            document.body.classList.remove("screen-review-active");
            document.documentElement.classList.remove("screen-review-active");
            window.scrollTo(0, 0);
        }
    }

    // ── WebSocket Management ────────────────────────────────────
    function getWsUrl() {
        const proto = location.protocol === "https:" ? "wss:" : "ws:";
        return `${proto}//${location.host}/ws/tutor`;
    }

    function connectWebSocket(subject) {
        return new Promise((resolve, reject) => {
            const wsUrl = getWsUrl();
            console.log("Connecting to", wsUrl);
            state.ws = new WebSocket(wsUrl);

            state.ws.onopen = () => {
                console.log("WebSocket connected");
                // Send start message with language preference
                const lang = (state.userProfile && state.userProfile.language) || "en";
                state.ws.send(JSON.stringify({
                    type: "start",
                    subject: subject,
                    language: lang,
                }));
            };

            state.ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    handleServerMessage(msg);

                    if (msg.type === "session_started") {
                        resolve(msg);
                    }
                } catch (e) {
                    console.error("Failed to parse message:", e);
                }
            };

            state.ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                reject(error);
                showToast("Connection error. Please try again.", "error");
            };

            state.ws.onclose = () => {
                console.log("WebSocket closed");
                state.isConnected = false;
                updateStatus("Disconnected", "error");
            };

            // Timeout
            setTimeout(() => {
                if (!state.isConnected) {
                    reject(new Error("Connection timeout"));
                }
            }, 15000);
        });
    }

    function handleServerMessage(msg) {
        switch (msg.type) {
            case "session_started":
                state.sessionId = msg.session_id;
                state.isConnected = true;
                updateStatus("Connected", "connected");
                addSystemMessage("Session started! Speak, type, or show your homework.");
                break;

            case "audio":
                showTutorSpeaking(true);
                removeProcessingIndicator();
                handleAudioResponse(msg.data);
                break;

            case "text":
                removeProcessingIndicator();
                handleTextResponse(msg.data);
                break;

            case "turn_complete":
                handleTurnComplete();
                showTutorSpeaking(false);
                break;

            case "error":
                showToast(msg.message, "error");
                removeProcessingIndicator();
                console.error("Server error:", msg.message);
                break;

            case "session_ended":
                state.isConnected = false;
                updateStatus("Ended", "error");
                break;
        }
    }

    // ── Tutor Speaking Indicator ────────────────────────────────
    function showTutorSpeaking(speaking) {
        if (speaking) {
            updateStatus("Tutor is speaking...", "connected");
        } else if (state.isConnected) {
            updateStatus("Connected", "connected");
        }
    }

    // ── Session Management ──────────────────────────────────────
    async function startSession(subject) {
        state.selectedSubject = subject;
        state.conversationHistory = [];
        showScreen("session");

        // Update UI
        const subjectNames = {
            mathematics: "Mathematics",
            physics: "Physics",
            chemistry: "Chemistry",
            biology: "Biology",
            computer_science: "Computer Science",
            language_arts: "Language Arts",
            history: "History",
            general: "AI Session",
        };
        els.sessionSubject.textContent = subjectNames[subject] || subject;
        updateStatus("Connecting...", "");
        els.chatMessages.innerHTML = "";

        // Start timer
        state.sessionSeconds = 0;
        updateTimer();
        state.timerInterval = setInterval(() => {
            state.sessionSeconds++;
            updateTimer();
        }, 1000);

        // Connect WebSocket
        try {
            await connectWebSocket(subject);
            showToast("Connected! Your tutor is ready.", "success");
        } catch (e) {
            showToast("Failed to connect. Please check your connection.", "error");
            updateStatus("Connection failed", "error");
        }
    }

    async function endSession(showReview = true) {
        const durationSecs = state.sessionSeconds;
        const currentSubject = state.selectedSubject || "general";
        const currentStudent = (state.userProfile && state.userProfile.name) || "Student";
        const historySnapshot = [...state.conversationHistory];

        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            try { state.ws.send(JSON.stringify({ type: "stop" })); } catch (_) {}
            try { state.ws.close(); } catch (_) {}
        }
        if (state.isRecording) stopRecording();
        stopSpeechRecognition();
        closeCamera();

        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
        stopAudioPlayback();

        state.ws = null;
        state.sessionId = null;
        state.isConnected = false;
        state.currentTutorMessage = "";
        state.audioQueue = [];
        state.audioChunksSent = 0;

        if (!showReview) {
            showLandingWithGreeting();
            return;
        }

        // Show Review Screen
        showScreen("reviewScreen");
        if (els.reviewLoading) els.reviewLoading.style.display = "flex";
        if (els.reviewContent) els.reviewContent.style.display = "none";

        try {
            const res = await fetch("/api/analyze-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: historySnapshot,
                    subject: currentSubject,
                    studentName: currentStudent,
                    durationSeconds: durationSecs,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            const data = await res.json();
            renderReviewData(data, durationSecs, currentSubject, currentStudent);
        } catch (err) {
            console.warn("Failed to fetch backend analysis, using contextual fallback:", err);
            const fallbackData = buildLocalFallbackAnalysis(historySnapshot, currentSubject, currentStudent, durationSecs);
            renderReviewData(fallbackData, durationSecs, currentSubject, currentStudent);
        } finally {
            if (els.reviewLoading) els.reviewLoading.style.display = "none";
            if (els.reviewContent) els.reviewContent.style.display = "block";
        }
    }

    function renderReviewData(data, durationSecs, subject, studentName) {
        const student = data.studentName || studentName || "Student";
        const subj = data.subject || subject || "General Discussion";
        const formattedTime = formatDuration(durationSecs);
        const scoreVal = data.overallScore != null ? data.overallScore : (data.score != null ? data.score : 85);
        const badgeVal = data.badge || (scoreVal >= 90 ? "Advanced Mastery" : scoreVal >= 75 ? "Proficient" : "Foundational");
        const summaryText = data.performanceSummary || data.summary || "Discussion concluded successfully.";

        if (els.reviewStudentName) {
            els.reviewStudentName.innerHTML = `<span class="material-icons-round">person</span> ${escapeHtml(student)}`;
        }
        if (els.reviewSubject) {
            els.reviewSubject.innerHTML = `<span class="material-icons-round">school</span> ${escapeHtml(subj)}`;
        }
        if (els.reviewDuration) {
            els.reviewDuration.innerHTML = `<span class="material-icons-round">schedule</span> ${formattedTime}`;
        }
        if (els.reviewSummary) {
            els.reviewSummary.textContent = summaryText;
        }
        if (els.reviewScore) {
            animateNumber(els.reviewScore, 0, scoreVal, 1100);
        }
        if (els.reviewBadge) {
            els.reviewBadge.textContent = badgeVal;
            if (scoreVal >= 90) {
                els.reviewBadge.style.color = "#34d399";
                els.reviewBadge.style.borderColor = "rgba(52, 211, 153, 0.4)";
                els.reviewBadge.style.background = "rgba(52, 211, 153, 0.15)";
            } else if (scoreVal >= 75) {
                els.reviewBadge.style.color = "#38bdf8";
                els.reviewBadge.style.borderColor = "rgba(56, 189, 248, 0.4)";
                els.reviewBadge.style.background = "rgba(14, 165, 233, 0.15)";
            } else {
                els.reviewBadge.style.color = "#fbbf24";
                els.reviewBadge.style.borderColor = "rgba(251, 191, 36, 0.4)";
                els.reviewBadge.style.background = "rgba(245, 158, 11, 0.15)";
            }
        }

        // Animated SVG score ring
        const circle = document.getElementById("scoreCirclePath");
        if (circle) {
            const circumference = 264;
            const percent = Math.min(100, Math.max(0, scoreVal));
            const targetOffset = circumference - (circumference * percent / 100);
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            setTimeout(() => {
                circle.style.strokeDashoffset = targetOffset;
                if (scoreVal >= 90) {
                    circle.style.stroke = "#34d399";
                } else if (scoreVal >= 75) {
                    circle.style.stroke = "#38bdf8";
                } else {
                    circle.style.stroke = "#fbbf24";
                }
            }, 120);
        }

        // Strengths
        if (els.reviewStrengthsList) {
            const strengths = Array.isArray(data.strengths) && data.strengths.length ? data.strengths : ["Clear conceptual understanding shown in responses."];
            els.reviewStrengthsList.innerHTML = strengths.map(item => `
                <li><span>${escapeHtml(item)}</span></li>
            `).join("");
        }

        // Weaknesses
        if (els.reviewWeaknessesList) {
            const weaknesses = Array.isArray(data.weaknesses) && data.weaknesses.length ? data.weaknesses : ["Could delve deeper into foundational principles."];
            els.reviewWeaknessesList.innerHTML = weaknesses.map(item => `
                <li><span>${escapeHtml(item)}</span></li>
            `).join("");
        }

        // Steps to Improve
        if (els.reviewStepsList) {
            const steps = Array.isArray(data.stepsToImprove) && data.stepsToImprove.length ? data.stepsToImprove : ["Practice regular exercises and step-by-step problem breakdown."];
            els.reviewStepsList.innerHTML = steps.map(step => `
                <li><span>${escapeHtml(step)}</span></li>
            `).join("");
        }

        // Goals
        if (els.reviewGoalsList) {
            const goals = Array.isArray(data.goals) && data.goals.length ? data.goals : ["Achieve 90%+ mastery in core topics."];
            els.reviewGoalsList.innerHTML = goals.map(goal => `
                <li><span>${escapeHtml(goal)}</span></li>
            `).join("");
        }

        // Topics tags
        if (els.reviewTopicsTags) {
            const topics = (Array.isArray(data.topicsCovered) && data.topicsCovered.length ? data.topicsCovered : (Array.isArray(data.topicsEvaluated) && data.topicsEvaluated.length ? data.topicsEvaluated : [subj, "Active Learning"]));
            els.reviewTopicsTags.innerHTML = topics.map(tag => `
                <span class="topic-tag">${escapeHtml(tag)}</span>
            `).join("");
        }
    }

    function formatDuration(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function animateNumber(element, start, end, duration) {
        if (!element) return;
        const target = parseInt(end, 10);
        if (isNaN(target)) {
            element.textContent = end;
            return;
        }
        const startTime = performance.now();
        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const current = Math.floor(progress * (target - start) + start);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        };
        requestAnimationFrame(step);
    }

    function buildLocalFallbackAnalysis(messages, subject, studentName, durationSecs) {
        const student = studentName || "Student";
        const subjName = subject || "General Discussion";
        const studentMsgs = (messages || []).filter(m => m.role === "student");

        return {
            studentName: student,
            subject: subjName,
            score: Math.min(95, Math.max(78, 80 + Math.min(studentMsgs.length * 3, 15))),
            badge: studentMsgs.length >= 3 ? "Advanced" : "Proficient",
            summary: `Active discussion session covering ${subjName} concepts. ${student} engaged with ${studentMsgs.length} questions and interactions during the session.`,
            strengths: [
                "Proactive engagement and clear articulation of questions during the discussion.",
                "Demonstrated good conceptual grasp of core topic principles.",
                "Responsive interaction with AI tutor step-by-step guidance."
            ],
            weaknesses: [
                "Opportunity to reinforce underlying formulas and edge cases independently.",
                "Pacing on complex multi-step problems could be refined with further practice."
            ],
            stepsToImprove: [
                "Complete 3-5 targeted practice exercises reinforcing session topics.",
                "Break down multi-step problem statements into smaller milestones.",
                "Formulate specific focus questions to test advanced scenarios in the next AI tutor session."
            ],
            goals: [
                "Achieve 90%+ accuracy on independent topic drills.",
                "Explain the solution logic back to the tutor without hints in the upcoming review."
            ],
            topicsEvaluated: [subjName, "Conceptual Understanding", "Active Problem-Solving", "Inquiry-Based Learning"]
        };
    }

    // ── Audio Recording (Toggle) ────────────────────────────────
    function toggleRecording() {
        if (state.isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    async function startRecording() {
        if (state.isRecording || !state.isConnected) return;

        try {
            state.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });

            state.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 16000,
            });

            const source = state.audioContext.createMediaStreamSource(state.mediaStream);
            const processor = state.audioContext.createScriptProcessor(4096, 1, 1);

            state.audioChunksSent = 0;

            processor.onaudioprocess = (e) => {
                if (!state.isRecording || !state.isConnected) return;

                const inputData = e.inputBuffer.getChannelData(0);
                const pcm16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    const s = Math.max(-1, Math.min(1, inputData[i]));
                    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
                }

                const base64 = arrayBufferToBase64(pcm16.buffer);
                if (state.ws && state.ws.readyState === WebSocket.OPEN) {
                    state.ws.send(JSON.stringify({ type: "audio", data: base64 }));
                    state.audioChunksSent++;
                }
            };

            source.connect(processor);
            processor.connect(state.audioContext.destination);

            state.isRecording = true;
            els.btnMic.classList.add("recording");
            els.btnMic.querySelector(".btn-label").textContent = "Stop";

            addRecordingIndicator();
            startSpeechRecognition();
            updateStatus("Listening...", "connected");

        } catch (e) {
            console.error("Failed to start recording:", e);
            showToast("Microphone access denied. Please allow microphone access.", "error");
        }
    }

    function stopRecording() {
        if (!state.isRecording) return;

        state.isRecording = false;
        els.btnMic.classList.remove("recording");
        els.btnMic.querySelector(".btn-label").textContent = "Talk";

        if (state.mediaStream) {
            state.mediaStream.getTracks().forEach((t) => t.stop());
            state.mediaStream = null;
        }
        if (state.audioContext) {
            state.audioContext.close();
            state.audioContext = null;
        }

        finalizeSpeechBubble();
        stopSpeechRecognition();
        removeRecordingIndicator();

        if (state.isConnected) {
            updateStatus("Connected", "connected");
        }
    }

    // ── Recording Indicator ─────────────────────────────────────
    function addRecordingIndicator() {
        removeRecordingIndicator();
        const div = document.createElement("div");
        div.className = "chat-msg system recording-msg";
        div.innerHTML = `
            <div class="recording-indicator">
                <div class="recording-dot"></div>
                <span class="recording-status">Listening...</span>
            </div>
        `;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function removeRecordingIndicator() {
        const existing = els.chatMessages.querySelector(".recording-msg");
        if (existing) existing.remove();
    }

    // ── Speech Recognition (Browser) ────────────────────────────
    function startSpeechRecognition() {
        const SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecog) {
            console.log("SpeechRecognition not supported — audio still sent to Gemini");
            return;
        }

        state.speechRecognition = new SpeechRecog();
        state.speechRecognition.continuous = true;
        state.speechRecognition.interimResults = true;
        // Map language code to BCP-47 for browser SpeechRecognition
        const langMap = {
            en: "en-US", hi: "hi-IN", es: "es-ES", fr: "fr-FR", de: "de-DE",
            ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", pt: "pt-BR", ar: "ar-SA",
            bn: "bn-IN", ta: "ta-IN", te: "te-IN", mr: "mr-IN", gu: "gu-IN",
            kn: "kn-IN", ml: "ml-IN", pa: "pa-IN", ru: "ru-RU", it: "it-IT",
        };
        const userLang = (state.userProfile && state.userProfile.language) || "en";
        state.speechRecognition.lang = langMap[userLang] || "en-US";
        state.currentSpeechText = "";
        state.currentSpeechBubble = null;

        state.speechRecognition.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if (finalTranscript) {
                state.currentSpeechText += finalTranscript + " ";
            }

            const displayText = (state.currentSpeechText + interimTranscript).trim();
            if (!displayText) return;

            if (!state.currentSpeechBubble || !state.currentSpeechBubble.isConnected) {
                state.currentSpeechBubble = document.createElement("div");
                state.currentSpeechBubble.className = "chat-msg student speech-live";
                state.currentSpeechBubble.innerHTML = `
                    <div class="msg-label">\uD83C\uDFA4 You (speaking)</div>
                    <div class="msg-content"></div>
                `;
                els.chatMessages.appendChild(state.currentSpeechBubble);
            }
            state.currentSpeechBubble.querySelector(".msg-content").textContent = displayText;
            scrollToBottom();
        };

        state.speechRecognition.onerror = (e) => {
            if (e.error !== "aborted") {
                console.log("Speech recognition error:", e.error);
            }
        };

        state.speechRecognition.onend = () => {
            if (state.isRecording && state.speechRecognition) {
                try { state.speechRecognition.start(); } catch (_) {}
            }
        };

        try {
            state.speechRecognition.start();
        } catch (_) {}
    }

    function stopSpeechRecognition() {
        if (state.speechRecognition) {
            try { state.speechRecognition.stop(); } catch (_) {}
            state.speechRecognition = null;
        }
    }

    function finalizeSpeechBubble() {
        if (state.currentSpeechBubble && state.currentSpeechBubble.isConnected) {
            state.currentSpeechBubble.classList.remove("speech-live");
            const label = state.currentSpeechBubble.querySelector(".msg-label");
            if (label) label.textContent = "You (voice)";
            const content = state.currentSpeechBubble.querySelector(".msg-content");
            const spokenText = (state.currentSpeechText || (content ? content.textContent : "")).trim();
            if (content && !content.textContent.trim()) {
                content.textContent = "(audio sent to tutor)";
            }
            if (spokenText && spokenText !== "(audio sent to tutor)") {
                state.conversationHistory.push({ role: "student", text: spokenText });
            }
        }
        state.currentSpeechBubble = null;
        state.currentSpeechText = "";
    }

    // ── Audio Playback ──────────────────────────────────────────
    // Reuse a single AudioContext and schedule buffers back-to-back
    let playbackCtx = null;
    let nextPlayTime = 0;

    function getPlaybackCtx() {
        if (!playbackCtx || playbackCtx.state === "closed") {
            playbackCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            nextPlayTime = 0;
        }
        if (playbackCtx.state === "suspended") playbackCtx.resume();
        return playbackCtx;
    }

    function handleAudioResponse(base64Data) {
        try {
            const ctx = getPlaybackCtx();
            const rawData = base64ToArrayBuffer(base64Data);
            const int16 = new Int16Array(rawData);
            if (int16.length === 0) return;

            const float32 = new Float32Array(int16.length);
            for (let i = 0; i < int16.length; i++) {
                float32[i] = int16[i] / 32768.0;
            }

            const buffer = ctx.createBuffer(1, float32.length, 24000);
            buffer.getChannelData(0).set(float32);

            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);

            // Schedule seamlessly after the previous chunk
            const now = ctx.currentTime;
            const startAt = Math.max(now, nextPlayTime);
            source.start(startAt);
            nextPlayTime = startAt + buffer.duration;
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }

    function stopAudioPlayback() {
        state.audioQueue = [];
        state.isPlayingAudio = false;
        if (playbackCtx && playbackCtx.state !== "closed") {
            playbackCtx.close();
            playbackCtx = null;
        }
        nextPlayTime = 0;
    }

    // ── Text Handling ───────────────────────────────────────────
    function cleanThinkingText(text) {
        // Native-audio model may return markdown thinking headers.
        // Clean them for display while keeping useful content.
        return text
            .replace(/^\*\*.*?\*\*\s*/gm, "")   // Remove **bold headers**
            .replace(/^\s*\n/gm, "")              // Remove blank lines
            .trim();
    }

    function handleTextResponse(text) {
        state.currentTutorMessage += text;

        const cleaned = cleanThinkingText(state.currentTutorMessage);
        if (!cleaned) return;

        const lastMsg = els.chatMessages.querySelector(".chat-msg.tutor.streaming");
        if (lastMsg) {
            lastMsg.querySelector(".msg-content").textContent = cleaned;
        } else {
            addTutorMessage(cleaned, true);
        }
        scrollToBottom();
    }

    function handleTurnComplete() {
        const streamingMsg = els.chatMessages.querySelector(".chat-msg.tutor.streaming");
        const cleaned = cleanThinkingText(state.currentTutorMessage);
        if (cleaned) {
            state.conversationHistory.push({ role: "tutor", text: cleaned });
        }
        if (streamingMsg) {
            if (cleaned) {
                streamingMsg.querySelector(".msg-content").textContent = cleaned;
                streamingMsg.classList.remove("streaming");
                const typing = streamingMsg.querySelector(".typing-indicator");
                if (typing) typing.remove();
            } else {
                streamingMsg.remove();
            }
        }
        state.currentTutorMessage = "";
    }

    function sendTextMessage() {
        const text = els.textInput.value.trim();
        if (!text || !state.isConnected) return;

        state.conversationHistory.push({ role: "student", text: text });
        addStudentMessage(text);
        els.textInput.value = "";
        addProcessingIndicator();

        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            state.ws.send(JSON.stringify({ type: "text", data: text }));
        }
    }

    // ── Processing Indicator ────────────────────────────────────
    function addProcessingIndicator() {
        removeProcessingIndicator();
        const div = document.createElement("div");
        div.className = "chat-msg tutor processing-msg";
        div.innerHTML = `
            <div class="msg-label">Tutor</div>
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function removeProcessingIndicator() {
        const existing = els.chatMessages.querySelector(".processing-msg");
        if (existing) existing.remove();
    }

    // ── Camera / Image ──────────────────────────────────────────
    async function toggleCamera() {
        if (els.cameraPreview.style.display !== "none") {
            closeCamera();
            return;
        }

        try {
            state.cameraStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment", // Rear camera for homework
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            });
            els.cameraVideo.srcObject = state.cameraStream;
            els.cameraPreview.style.display = "block";
        } catch (e) {
            console.error("Camera access failed:", e);
            showToast("Camera access denied. Please allow camera access.", "error");
        }
    }

    function closeCamera() {
        if (state.cameraStream) {
            state.cameraStream.getTracks().forEach((t) => t.stop());
            state.cameraStream = null;
        }
        els.cameraVideo.srcObject = null;
        els.cameraPreview.style.display = "none";
    }

    function captureImage() {
        const video = els.cameraVideo;
        const canvas = els.captureCanvas;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        state.capturedImageData = dataUrl.split(",")[1]; // Base64 part

        // Show preview
        els.previewImage.src = dataUrl;
        els.imagePreview.style.display = "block";

        // Close camera
        closeCamera();
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            state.capturedImageData = dataUrl.split(",")[1];

            els.previewImage.src = dataUrl;
            els.imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);

        // Reset input
        els.fileInput.value = "";
    }

    function sendCapturedImage() {
        if (!state.capturedImageData || !state.isConnected) return;

        state.conversationHistory.push({ role: "student", text: "Student uploaded homework / problem image for analysis." });
        // Add image to chat
        addStudentImageMessage(els.previewImage.src);

        // Send via WebSocket
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            state.ws.send(JSON.stringify({
                type: "image",
                data: state.capturedImageData,
                mime_type: "image/jpeg",
            }));
        }

        discardImage();
        showToast("Image sent! Analyzing...", "success");
        addProcessingIndicator();
    }

    function discardImage() {
        state.capturedImageData = null;
        els.imagePreview.style.display = "none";
        els.previewImage.src = "";
    }

    // ── Chat UI Helpers ─────────────────────────────────────────
    function addTutorMessage(text, streaming = false) {
        const div = document.createElement("div");
        div.className = `chat-msg tutor${streaming ? " streaming" : ""}`;
        div.innerHTML = `
            <div class="msg-label">Tutor</div>
            <div class="msg-content">${escapeHtml(text)}</div>
            ${streaming ? '<div class="typing-indicator"><span></span><span></span><span></span></div>' : ""}
        `;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function addStudentMessage(text) {
        const div = document.createElement("div");
        div.className = "chat-msg student";
        div.innerHTML = `
            <div class="msg-label">You</div>
            <div class="msg-content">${escapeHtml(text)}</div>
        `;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function addStudentImageMessage(src) {
        const div = document.createElement("div");
        div.className = "chat-msg student";
        div.innerHTML = `
            <div class="msg-label">You</div>
            <div class="msg-content">Sent an image for analysis</div>
            <img src="${src}" alt="Uploaded homework">
        `;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function addSystemMessage(text) {
        const div = document.createElement("div");
        div.className = "chat-msg system";
        div.textContent = text;
        els.chatMessages.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            els.chatArea.scrollTop = els.chatArea.scrollHeight;
        });
    }

    // ── Status & Timer ──────────────────────────────────────────
    function updateStatus(text, statusClass) {
        const dot = els.sessionStatus.querySelector(".status-dot");
        dot.className = "status-dot";
        if (statusClass) dot.classList.add(statusClass);
        els.sessionStatus.querySelector(".status-dot").nextSibling.textContent = ` ${text}`;
    }

    function updateTimer() {
        const m = String(Math.floor(state.sessionSeconds / 60)).padStart(2, "0");
        const s = String(state.sessionSeconds % 60).padStart(2, "0");
        els.sessionTimer.textContent = `${m}:${s}`;
    }

    // ── Toast Notifications ─────────────────────────────────────
    function showToast(message, type = "") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        els.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3500);
    }

    // ── Utilities ───────────────────────────────────────────────
    function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    function base64ToArrayBuffer(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Start ───────────────────────────────────────────────────
    document.addEventListener("DOMContentLoaded", init);
})();
