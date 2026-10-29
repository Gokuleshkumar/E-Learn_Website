/**
 * AGS Academys - Dynamic 60FPS Animated Course Intro Video & Audio Engine
 * Features:
 * - Authentic, studio-grade neural female voiceover (en-US-AvaNeural) tailored for each course
 * - 128 BPM electronic music track running in lockstep
 * - Continuous high-energy narration with ZERO dead silence for the full 2 minutes (120s)
 * - 60FPS hardware-accelerated animated canvas:
 *    • Scene 0 (0:00 - 0:30): Cyber launch matrix & orbiting 3D tech constellation
 *    • Scene 1 (0:30 - 1:05): Real-time IDE code typing simulator with live terminal tests
 *    • Scene 2 (1:05 - 1:35): Enterprise capstone cloud dashboard with live telemetry & data buses
 *    • Scene 3 (1:35 - 2:00): Guaranteed placement track, golden certificate with sheen & confetti
 * - Live dynamic closed-caption subtitles bar
 * - Real-time 48-bar audio frequency visualizer
 */

(function() {
  'use strict';

  // --- Course Tech Stacks & Simulated Code Snippets ---
  const courseTechDetails = {
    frontend: {
      tags: ['React 19', 'Next.js 15', 'Tailwind CSS', 'TypeScript', 'HTML5 Canvas', 'Vite'],
      codeLang: 'React JSX (App.tsx)',
      codeLines: [
        'import React, { useState, useEffect } from "react";',
        'export function Dashboard() {',
        '  const [skills, setSkills] = useState(["React", "TypeScript"]);',
        '  return (',
        '    <div className="p-8 bg-slate-900 rounded-2xl shadow-xl">',
        '      <h1 className="text-3xl font-black text-purple-400">AGS Academys</h1>',
        '      <SkillGrid items={skills} liveUpdates={true} />',
        '    </div>',
        '  );',
        '}'
      ],
      terminalCmd: 'npm run test:frontend',
      terminalOutput: '✓ 38 React component tests passing • Bundle: 12.4 kB gzip'
    },
    backend: {
      tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Auth', 'Docker', 'REST APIs'],
      codeLang: 'Node.js (server.js)',
      codeLines: [
        'const express = require("express");',
        'const app = express();',
        'app.post("/api/auth/login", async (req, res) => {',
        '  const { email, password } = req.body;',
        '  const token = await AuthService.authenticate(email, password);',
        '  return res.json({ success: true, token, role: "Student" });',
        '});',
        'app.listen(5000, () => console.log("✓ Server running on 5000"));'
      ],
      terminalCmd: 'npm run test:api',
      terminalOutput: '✓ 52 REST endpoints verified • 0 vulnerabilities • 24ms latency'
    },
    java: {
      tags: ['Java 21', 'Spring Boot 3', 'Hibernate ORM', 'Microservices', 'PostgreSQL', 'Docker'],
      codeLang: 'Java (CourseService.java)',
      codeLines: [
        '@RestController',
        '@RequestMapping("/api/v1/courses")',
        'public class CourseController {',
        '  @Autowired private CourseService courseService;',
        '  @GetMapping("/featured")',
        '  public ResponseEntity<List<Course>> getCatalog() {',
        '    return ResponseEntity.ok(courseService.getApprovedCourses());',
        '  }',
        '}'
      ],
      terminalCmd: 'mvn test -Dtest=MicroserviceSuite',
      terminalOutput: '✓ Tests run: 64, Failures: 0, Errors: 0, Skipped: 0 • BUILD SUCCESS'
    },
    python: {
      tags: ['Python 3.12', 'Django 5', 'REST Framework', 'PostgreSQL', 'Celery', 'Automation'],
      codeLang: 'Python (views.py)',
      codeLines: [
        'from django.shortcuts import render',
        'from rest_framework.response import Response',
        'from .models import StudentEnrollment',
        '',
        'def get_learning_progress(request, student_id):',
        '    enrollments = StudentEnrollment.objects.filter(id=student_id)',
        '    data = [{"title": e.title, "progress": e.calc()} for e in enrollments]',
        '    return Response({"status": "active", "courses": data})'
      ],
      terminalCmd: 'pytest --cov=learning_app tests/',
      terminalOutput: '✓ 46 passed in 1.42s • 100% test coverage achieved'
    },
    ai: {
      tags: ['Gemini 2.5 Flash', 'Multimodal APIs', 'Neural Networks', 'LangChain', 'PyTorch', 'Agents'],
      codeLang: 'Python (gemini_agent.py)',
      codeLines: [
        'import google.genai as genai',
        'client = genai.Client()',
        'response = client.models.generate_content(',
        '    model="gemini-2.5-flash",',
        '    contents=["Explain dynamic programming to a beginner student"]',
        ')',
        'print("AI Tutor Response:", response.text)'
      ],
      terminalCmd: 'python run_evals.py --model=gemini-2.5',
      terminalOutput: '✓ Reasoning score: 99.4% • Multimodal inference latency: 190ms'
    },
    datascience: {
      tags: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn', 'SQL Analytics', 'Seaborn', 'BI'],
      codeLang: 'Python (analytics.py)',
      codeLines: [
        'import pandas as pd',
        'import numpy as np',
        'df = pd.read_csv("student_career_outcomes.csv")',
        'placement_rate = df["hired"].mean() * 100',
        'print(f"AGS Academys Placement Success: {placement_rate:.1f}%")'
      ],
      terminalCmd: 'python evaluate_pipeline.py',
      terminalOutput: '✓ Model Accuracy: 96.8% • AUC-ROC: 0.982 • Data Pipeline Active'
    },
    cybersecurity: {
      tags: ['Ethical Hacking', 'Metasploit', 'Wireshark', 'Packet Analysis', 'Firewalls', 'SIEM'],
      codeLang: 'Python (packet_analyzer.py)',
      codeLines: [
        'from scapy.all import sniff, IP, TCP',
        'def packet_callback(packet):',
        '    if packet.haslayer(TCP) and packet[TCP].dport == 443:',
        '        print(f"Secured TLS Stream: {packet[IP].src} -> {packet[IP].dst}")',
        'sniff(prn=packet_callback, count=100)'
      ],
      terminalCmd: 'nmap -sV -sC -p- 192.168.1.1',
      terminalOutput: '✓ Zero critical vulnerabilities detected • All ports hardened'
    },
    uiux: {
      tags: ['Figma Auto-Layout', 'Design Tokens', 'User Journey Mapping', 'Wireframing', 'Micro-Animations'],
      codeLang: 'Design Tokens (tokens.json)',
      codeLines: [
        '{',
        '  "brand": { "purple": "#8B5CF6", "amber": "#F59E0B", "emerald": "#10B981" },',
        '  "typography": { "fontPrimary": "Inter", "headingWeight": 800 },',
        '  "elevation": { "shadowCard": "0 20px 25px -5px rgba(0, 0, 0, 0.4)" },',
        '  "motion": { "transitionSpring": "cubic-bezier(0.16, 1, 0.3, 1)" }',
        '}'
      ],
      terminalCmd: 'figma-tokens export --format=css',
      terminalOutput: '✓ 142 Design Tokens validated & synced to React Design System'
    },
    'training-placement': {
      tags: ['100% Placement Track', 'Direct MNC Hiring', '1-on-1 Mentorship', 'Mock Interviews', 'Full Stack Capstone'],
      codeLang: 'JavaScript (PlacementCareer.js)',
      codeLines: [
        '// AGS Academys Guaranteed Placement Track',
        'const candidate = await Mentorship.train(student, {',
        '  technicalSkills: ["FullStack", "DSA", "SystemDesign"],',
        '  mockInterviews: 12,',
        '  resumeOptimization: true',
        '});',
        'const jobOffer = await HiringDrive.secureOffer(candidate);',
        'console.log(`Congratulations! Offer: ${jobOffer.packageLPA} LPA`);'
      ],
      terminalCmd: 'node run_hiring_drive.js',
      terminalOutput: '✓ Offer Confirmed: Top Tier Tech MNC • Package: 18.5 LPA'
    }
  };

  const defaultTech = {
    tags: ['Full Stack Curriculum', 'Production Architecture', 'Live Projects', 'Mentorship', 'Certification'],
    codeLang: 'Code Studio (Architecture.ts)',
    codeLines: [
      '// AGS Academys Interactive Engineering Track',
      'const careerPath = new EngineeringTrack({ certified: true });',
      'careerPath.master({ concepts: "Deep Mastery", projects: "Production Ready" });',
      'careerPath.onComplete(() => {',
      '  console.log("✓ Certified Industry Engineer Ready!");',
      '});'
    ],
    terminalCmd: 'npm test -- --coverage',
    terminalOutput: '✓ All architecture suites passed • Ready for cloud deployment'
  };

  // --- Subtitles Timeline (2-Minute Continuous Content) ---
  const subtitlesTimeline = [
    { start: 0, end: 7, text: '👋 Hey there, future tech superstar! Welcome to AGS Academys!' },
    { start: 7, end: 15, text: '🚀 Ready to supercharge your tech career with our official masterclass?' },
    { start: 15, end: 23, text: '💡 In 2026, demand for top-tier software engineers is reaching record highs.' },
    { start: 23, end: 30, text: '⚡ We replace outdated theory with modern, industry-standard production engineering!' },
    { start: 30, end: 38, text: '💻 Let us jump straight into our live interactive code studio!' },
    { start: 38, end: 46, text: '✨ Notice how clean, modular, and maintainable your code becomes right from day one!' },
    { start: 46, end: 55, text: '🛡️ Master defensive error handling, automated testing suites, and performance tuning!' },
    { start: 55, end: 65, text: '🔍 No guessing and no copy-pasting—deeply understand every algorithm and design pattern.' },
    { start: 65, end: 74, text: '🚀 Next up: heavy-hitting, full-scale capstone portfolio projects!' },
    { start: 74, end: 84, text: '📊 Build enterprise architectures with real users, live auth, and production traffic.' },
    { start: 84, end: 95, text: '☁️ Every project gets deployed live with automated CI/CD pipelines to wow recruiters!' },
    { start: 95, end: 104, text: '🏆 Career Accelerator Track: 1-on-1 mentorship from veteran tech leads!' },
    { start: 104, end: 112, text: '🎯 Rigorous mock technical interviews, resume polish, and direct MNC hiring drives!' },
    { start: 112, end: 120, text: '🔥 Don’t wait! Click Enroll Now below and launch your dream tech career today!' }
  ];

  // --- Engine State ---
  let canvas, ctx;
  let bgAudioEl = null;
  let voiceAudioEl = null;
  let currentCourse = null;
  let isPlaying = false;
  let currentTime = 0; // 0 to 120 seconds
  let duration = 120;
  let animFrameId = null;
  let isMuted = false;
  let lastSyncTime = 0;

  // Background Cyber Particles
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * 960,
      y: Math.random() * 540,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 2.5 + 1.2,
      color: ['#A78BFA', '#60A5FA', '#34D399', '#FBBF24', '#EC4899'][Math.floor(Math.random() * 5)]
    });
  }

  // Confetti for Scene 4
  const confetti = [];
  for (let i = 0; i < 70; i++) {
    confetti.push({
      x: Math.random() * 960,
      y: Math.random() * 540 - 540,
      size: Math.random() * 7 + 4,
      color: ['#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6', '#FCD34D'][Math.floor(Math.random() * 6)],
      speedY: Math.random() * 2.2 + 1.8,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 7
    });
  }

  // --- 60FPS Canvas Render Loop ---
  function renderFrame() {
    if (!ctx) return;

    // 1. Deep Cyber Dark Background with Dynamic Glow
    const bgGrad = ctx.createLinearGradient(0, 0, 960, 540);
    bgGrad.addColorStop(0, '#090514');
    bgGrad.addColorStop(0.5, '#120B26');
    bgGrad.addColorStop(1, '#0C061A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 960, 540);

    // Dynamic Pulsing Center Glow
    const pulseGlow = Math.sin(currentTime * 2) * 20;
    const radial = ctx.createRadialGradient(480, 270, 40, 480, 270, 440 + pulseGlow);
    radial.addColorStop(0, 'rgba(139, 92, 246, 0.22)');
    radial.addColorStop(0.5, 'rgba(79, 70, 229, 0.10)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 960, 540);

    // 2. Animated Particles with Connection Grid
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (isPlaying) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 960;
        if (p.x > 960) p.x = 0;
        if (p.y < 0) p.y = 540;
        if (p.y > 540) p.y = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Connect close particles with delicate luminous webs
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - dist / 90) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // 3. Render Active Scene based on currentTime
    // Scene 0: 0:00 - 0:30 (Launch & Tech Orbit Matrix)
    // Scene 1: 0:30 - 1:05 (Live IDE Code Studio & Terminal)
    // Scene 2: 1:05 - 1:35 (Capstone Projects & Cloud Telemetry)
    // Scene 3: 1:35 - 2:00 (Guaranteed Placement & Confetti)
    if (currentTime < 30) {
      renderSceneOverview(currentTime);
    } else if (currentTime < 65) {
      renderSceneCodeStudio(currentTime - 30);
    } else if (currentTime < 95) {
      renderSceneProjects(currentTime - 65);
    } else {
      renderScenePlacement(currentTime - 95);
    }

    // 5. Audio Waveform / Equalizer across bottom
    renderEqualizer(currentTime);

    // 6. Update Subtitles Bar
    updateSubtitles(currentTime);

    // 7. Sync Audio Clock
    syncClock();

    if (isPlaying) {
      animFrameId = requestAnimationFrame(renderFrame);
    }
  }

  // --- Clock & Audio Synchronization ---
  function syncClock() {
    if (!isPlaying) return;

    if (voiceAudioEl && !voiceAudioEl.paused && voiceAudioEl.currentTime > 0) {
      currentTime = voiceAudioEl.currentTime;
    } else {
      // Fallback timer if voice audio is still buffering
      const now = performance.now();
      if (lastSyncTime > 0) {
        currentTime += (now - lastSyncTime) / 1000;
      }
      lastSyncTime = now;
    }

    updateTimeDisplay();

    // Reached 2-minute mark (120 seconds)
    if (currentTime >= duration) {
      currentTime = duration;
      pausePlayback();
      updateTimeDisplay();
      showEndOverlay(true);
    }
  }

  // --- Scene 1: Course Launch & Orbiting Tech Badges (0s to 30s) ---
  function renderSceneOverview(relTime) {
    const tech = (currentCourse && courseTechDetails[currentCourse.id]) || defaultTech;
    
    // Central Bouncing Badge
    ctx.save();
    const pulse = Math.sin(relTime * 3) * 5;
    ctx.translate(480, 230);

    // Glowing Radial Behind Central Emblem
    const emblemGlow = ctx.createRadialGradient(0, 0, 20, 0, 0, 110);
    emblemGlow.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
    emblemGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = emblemGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.fill();

    // Outer Glowing Ring with Dash Animation
    ctx.beginPath();
    ctx.arc(0, 0, 96 + pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.55)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.lineDashOffset = -relTime * 15;
    ctx.stroke();
    ctx.setLineDash([]);

    // Center Badge Card
    ctx.fillStyle = 'rgba(24, 15, 46, 0.92)';
    ctx.shadowColor = '#8B5CF6';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.roundRect(-85, -48, 170, 96, 18);
    ctx.fill();
    ctx.strokeStyle = '#C084FC';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AGS Academys', 0, -10);
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('✓ 100% Industry Verified', 0, 15);
    ctx.fillStyle = '#FCD34D';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('★ 4.9/5 Student Rating', 0, 33);
    ctx.restore();

    // Orbiting 3D Tech Badges
    const tags = tech.tags;
    const orbitRadius = 205;
    for (let i = 0; i < tags.length; i++) {
      const angle = (i / tags.length) * Math.PI * 2 + relTime * 0.45;
      const bx = 480 + Math.cos(angle) * orbitRadius;
      const by = 230 + Math.sin(angle) * (orbitRadius * 0.55);

      // Connecting Laser Line from Center to Badge
      ctx.beginPath();
      ctx.moveTo(480, 230);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = 'rgba(28, 18, 54, 0.92)';
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(bx - 65, by - 17, 130, 34, 17);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tags[i], bx, by + 4);
      ctx.restore();
    }

    // 4 Key Stat Pills Across Bottom
    const stats = [
      { icon: '🚀', text: '50+ Capstone Projects' },
      { icon: '💼', text: '100% Placement Support' },
      { icon: '📈', text: '18+ LPA Top Packages' },
      { icon: '🤝', text: '1-on-1 Mentor Reviews' }
    ];

    const pillW = 180, pillGap = 16;
    const totalPillW = (pillW * 4) + (pillGap * 3);
    const startPillX = (960 - totalPillW) / 2;
    const pillY = 398;

    for (let i = 0; i < stats.length; i++) {
      const px = startPillX + i * (pillW + pillGap);
      ctx.save();
      ctx.fillStyle = 'rgba(22, 14, 42, 0.85)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(px, pillY, pillW, 30, 15);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${stats[i].icon} ${stats[i].text}`, px + (pillW / 2), pillY + 19);
      ctx.restore();
    }
  }

  // --- Scene 2: Live Code Studio with Blinking Cursor & Terminal (30s to 65s) ---
  function renderSceneCodeStudio(relTime) {
    const tech = (currentCourse && courseTechDetails[currentCourse.id]) || defaultTech;
    
    ctx.save();
    const wx = 150, wy = 105, ww = 660, wh = 295;
    
    // IDE Window Shadow & Base
    ctx.fillStyle = '#0F0A1E';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 28;
    ctx.beginPath();
    ctx.roundRect(wx, wy, ww, wh, 14);
    ctx.fill();
    ctx.strokeStyle = '#382264';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // IDE Titlebar
    ctx.fillStyle = '#1B1133';
    ctx.beginPath();
    ctx.roundRect(wx, wy, ww, 34, [14, 14, 0, 0]);
    ctx.fill();

    // Mac Window Controls
    ctx.fillStyle = '#EF4444'; ctx.beginPath(); ctx.arc(wx + 18, wy + 17, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F59E0B'; ctx.beginPath(); ctx.arc(wx + 34, wy + 17, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10B981'; ctx.beginPath(); ctx.arc(wx + 50, wy + 17, 5, 0, Math.PI * 2); ctx.fill();

    // Tab Name
    ctx.fillStyle = '#C084FC';
    ctx.font = 'bold 11px "JetBrains Mono", Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`⚡ ${tech.codeLang}`, wx + 75, wy + 21);

    // Status Indicator
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('LIVE CODE ENGINE • HOT RELOAD ACTIVE', wx + ww - 20, wy + 21);

    // Code Lines Typing Effect
    const lines = tech.codeLines;
    const progressLines = Math.min(lines.length, Math.floor((relTime / 35) * lines.length) + 2);

    ctx.font = '12px "JetBrains Mono", Consolas, monospace';
    for (let i = 0; i < progressLines; i++) {
      const lineY = wy + 58 + (i * 19);
      
      // Active Line Glow Highlight
      if (i === progressLines - 1) {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.fillRect(wx + 10, lineY - 14, ww - 20, 18);
      }

      // Line Number
      ctx.fillStyle = '#7C6B99';
      ctx.textAlign = 'left';
      ctx.fillText(String(i + 1).padStart(2, ' '), wx + 16, lineY);

      // Line Syntax Colors
      const lineText = lines[i];
      if (lineText.includes('import') || lineText.includes('const') || lineText.includes('export') || lineText.includes('class') || lineText.includes('def') || lineText.includes('@')) {
        ctx.fillStyle = '#F472B6';
      } else if (lineText.includes('function') || lineText.includes('return') || lineText.includes('await') || lineText.includes('public')) {
        ctx.fillStyle = '#38BDF8';
      } else if (lineText.includes('"') || lineText.includes("'")) {
        ctx.fillStyle = '#34D399';
      } else if (lineText.startsWith('//')) {
        ctx.fillStyle = '#9CA3AF';
      } else {
        ctx.fillStyle = '#F3F4F6';
      }
      ctx.fillText(lineText, wx + 48, lineY);

      // Blinking Cursor on the current active line
      if (i === progressLines - 1 && Math.floor(relTime * 4) % 2 === 0) {
        const textMetrics = ctx.measureText(lineText);
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(wx + 52 + textMetrics.width, lineY - 12, 7, 14);
      }
    }

    // Terminal Status Bar (Lower Panel)
    const termY = wy + wh - 48;
    ctx.fillStyle = '#130B24';
    ctx.beginPath();
    ctx.roundRect(wx + 10, termY, ww - 20, 38, 8);
    ctx.fill();
    ctx.strokeStyle = '#3C226E';
    ctx.stroke();

    ctx.fillStyle = '#A78BFA';
    ctx.font = '11px "JetBrains Mono", Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`$ ${tech.terminalCmd}`, wx + 20, termY + 16);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 10.5px "JetBrains Mono", Consolas, monospace';
    ctx.fillText(tech.terminalOutput, wx + 20, termY + 31);

    ctx.restore();
  }

  // --- Scene 3: Production Project Showcase (65s to 95s) ---
  function renderSceneProjects(relTime) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FCD34D';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.fillText('🚀 PRODUCTION CAPSTONE PROJECTS • CLOUD TELEMETRY', 480, 115);

    // Dashboard Mockup Card
    const cardX = 160, cardY = 135, cardW = 640, cardH = 265;
    ctx.fillStyle = '#110B24';
    ctx.shadowColor = 'rgba(124, 58, 237, 0.45)';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 16);
    ctx.fill();
    ctx.strokeStyle = '#4A267D';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header within Card
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ Real-Time System Metrics & API Throughput', cardX + 24, cardY + 32);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('● Live Cloud Cluster (us-east-1)', cardX + cardW - 24, cardY + 32);

    // Animated Bar Chart (Left Side)
    const barW = 30;
    const barXStart = cardX + 32;
    const barBaseY = cardY + 185;
    const barHeights = [65, 105, 135, 90, 120, 150, 110];
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#6366F1', '#14B8A6'];

    for (let i = 0; i < 7; i++) {
      const h = barHeights[i] + Math.sin(relTime * 4.5 + i) * 14;
      const bx = barXStart + (i * 42);
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.roundRect(bx, barBaseY - h, barW, h, [6, 6, 0, 0]);
      ctx.fill();
    }

    // Microservice Flow / Data Nodes (Right Side)
    const nodeX = cardX + 360;
    const nodeY = cardY + 70;
    const nodes = [
      { title: 'Client UI', sub: 'React 19 / CDN' },
      { title: 'API Gateway', sub: 'Rate Limiting / SSL' },
      { title: 'Microservices', sub: 'Auth & DB Cluster' }
    ];

    for (let i = 0; i < nodes.length; i++) {
      const ny = nodeY + i * 44;
      ctx.fillStyle = 'rgba(28, 18, 54, 0.9)';
      ctx.beginPath();
      ctx.roundRect(nodeX, ny, 240, 36, 8);
      ctx.fill();
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`➜ ${nodes[i].title}`, nodeX + 12, ny + 18);

      ctx.fillStyle = '#A78BFA';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(nodes[i].sub, nodeX + 12, ny + 30);

      // Animated packet travelling
      const packetPos = (relTime * 30 + i * 40) % 240;
      ctx.beginPath();
      ctx.arc(nodeX + packetPos, ny + 18, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.fill();
    }

    // Bottom Badge in Card
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.beginPath();
    ctx.roundRect(cardX + 24, cardY + cardH - 42, cardW - 48, 28, 6);
    ctx.fill();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 11.5px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓ End-to-End Deployed • Full Git Commit History • 100% Recruiter Portfolio Ready', cardX + (cardW / 2), cardY + cardH - 24);

    ctx.restore();
  }

  // --- Scene 4: Guaranteed Placement & Certification (95s to 120s) ---
  function renderScenePlacement(relTime) {
    ctx.save();
    
    // Confetti Physics Falling
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      if (isPlaying) {
        c.y += c.speedY;
        c.rot += c.rotSpeed;
        if (c.y > 540) {
          c.y = -20;
          c.x = Math.random() * 960;
        }
      }

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rot * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      ctx.restore();
    }

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.fillText('🏆 GUARANTEED CAREER ACCELERATION & PLACEMENT DRIVES', 480, 115);

    // Certificate Box
    const cx = 190, cy = 135, cw = 580, ch = 265;
    ctx.fillStyle = '#160E2E';
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 28;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 18);
    ctx.fill();
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Moving Holographic Sheen Across Certificate
    const sheenX = cx + ((relTime * 140) % (cw + 120)) - 60;
    const sheenGrad = ctx.createLinearGradient(sheenX - 40, cy, sheenX + 40, cy + ch);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 18);
    ctx.fill();

    // Certificate Gold Seal Ribbon
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(cx + 60, cy + 60, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#160E2E';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AGS', cx + 60, cy + 65);

    // Certificate Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 19px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Certificate of Professional Mastery', cx + 105, cy + 54);

    ctx.fillStyle = '#D8B4FE';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Verified Industry Proficiency & Direct MNC Placement Eligibility', cx + 105, cy + 74);

    // 4 Key Milestone Badges
    const milestones = [
      '✓ 1-on-1 Mentorship',
      '✓ Mock Technical Sprints',
      '✓ ATS Resume Polish',
      '✓ Direct MNC Interview Drives'
    ];
    for (let i = 0; i < milestones.length; i++) {
      const mx = cx + 35 + (i % 2) * 260;
      const my = cy + 100 + Math.floor(i / 2) * 44;

      ctx.fillStyle = 'rgba(34, 197, 94, 0.16)';
      ctx.beginPath();
      ctx.roundRect(mx, my, 240, 34, 8);
      ctx.fill();
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#86EFAC';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(milestones[i], mx + 120, my + 21);
    }

    // Hiring Network Logos Banner
    ctx.fillStyle = '#E9D5FF';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⭐ Top Hiring Partners: Google • Amazon • Microsoft • TCS • Infosys • Zoho', cx + (cw / 2), cy + ch - 22);

    ctx.restore();
  }

  // --- Dynamic 48-Bar Equalizer ---
  function renderEqualizer(relTime) {
    ctx.save();
    const barCount = 48;
    const startX = 110;
    const totalW = 740;
    const step = totalW / barCount;
    const baseY = 525;

    for (let i = 0; i < barCount; i++) {
      const x = startX + i * step;
      let h = 4;
      if (isPlaying) {
        const freq1 = Math.sin(relTime * 12 + i * 0.45);
        const freq2 = Math.cos(relTime * 7 - i * 0.35);
        const freq3 = Math.sin(relTime * 18 + i * 0.8);
        h = Math.abs(freq1 * 0.5 + freq2 * 0.3 + freq3 * 0.2) * 24 + 4;
      }

      const grad = ctx.createLinearGradient(0, baseY - h, 0, baseY);
      grad.addColorStop(0, '#F59E0B');
      grad.addColorStop(0.5, '#A855F7');
      grad.addColorStop(1, '#6366F1');

      ctx.fillStyle = grad;
      ctx.fillRect(x, baseY - h, step * 0.65, h);
    }
    ctx.restore();
  }

  // --- Subtitles Updater ---
  function updateSubtitles(time) {
    const subTextEl = document.getElementById('demo-subtitles-text');
    if (!subTextEl) return;

    const currentSub = subtitlesTimeline.find(s => time >= s.start && time < s.end);
    if (currentSub) {
      if (subTextEl.textContent !== currentSub.text) {
        subTextEl.textContent = currentSub.text;
      }
    }
  }

  // --- Engine Controller Methods ---
  function initEngine() {
    canvas = document.getElementById('course-demo-canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
    }
    bgAudioEl = document.getElementById('course-demo-audio');
    voiceAudioEl = document.getElementById('course-demo-voice');

    if (bgAudioEl) {
      bgAudioEl.volume = 0.20; // Ducked background beat
      bgAudioEl.loop = true;
    }
    if (voiceAudioEl) {
      voiceAudioEl.volume = 1.0; // Crystal clear studio voice
    }
  }

  function setupCourseAudio(course) {
    if (!voiceAudioEl) return;

    // Pick tailored narration file if present, else fallback
    const courseId = course ? course.id : 'default';
    const primarySrc = `./videos/narrator_${courseId}.mp3`;
    const fallbackSrc = `./videos/narrator_default.mp3`;

    voiceAudioEl.src = primarySrc;
    voiceAudioEl.onerror = function() {
      if (voiceAudioEl.src !== fallbackSrc) {
        voiceAudioEl.src = fallbackSrc;
        if (isPlaying) {
          voiceAudioEl.play().catch(() => {});
        }
      }
    };
    voiceAudioEl.load();
  }

  function startPlayback() {
    isPlaying = true;
    lastSyncTime = performance.now();
    updatePlayPauseUI(true);

    if (bgAudioEl) {
      bgAudioEl.currentTime = currentTime % (bgAudioEl.duration || 120);
      bgAudioEl.muted = isMuted;
      bgAudioEl.play().catch(() => {});
    }

    if (voiceAudioEl) {
      voiceAudioEl.currentTime = currentTime;
      voiceAudioEl.muted = isMuted;
      voiceAudioEl.play().catch(() => {});
    }

    if (!animFrameId) {
      animFrameId = requestAnimationFrame(renderFrame);
    }
  }

  function pausePlayback() {
    isPlaying = false;
    updatePlayPauseUI(false);

    if (bgAudioEl) bgAudioEl.pause();
    if (voiceAudioEl) voiceAudioEl.pause();

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    renderFrame();
  }

  function togglePlayback() {
    if (isPlaying) {
      pausePlayback();
    } else {
      if (currentTime >= duration) {
        currentTime = 0;
        showEndOverlay(false);
      }
      startPlayback();
    }
  }

  function seekTo(seconds) {
    currentTime = Math.max(0, Math.min(seconds, duration - 1));
    showEndOverlay(false);

    if (bgAudioEl) bgAudioEl.currentTime = currentTime % (bgAudioEl.duration || 120);
    if (voiceAudioEl) voiceAudioEl.currentTime = currentTime;

    updateTimeDisplay();

    if (!isPlaying) {
      startPlayback();
    }
  }

  function replay() {
    currentTime = 0;
    showEndOverlay(false);
    seekTo(0);
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (bgAudioEl) bgAudioEl.muted = isMuted;
    if (voiceAudioEl) voiceAudioEl.muted = isMuted;

    const volIcon = document.getElementById('demo-ctrl-volume-icon');
    if (volIcon) {
      volIcon.className = isMuted ? 'fas fa-volume-xmark text-red-400' : 'fas fa-volume-high text-white';
    }
  }

  function updatePlayPauseUI(playing) {
    const centerBtn = document.getElementById('demo-center-play-btn');
    const centerIcon = document.getElementById('demo-center-play-icon');
    const ctrlIcon = document.getElementById('demo-ctrl-play-icon');

    if (centerBtn) {
      centerBtn.style.opacity = playing ? '0' : '1';
      centerBtn.style.pointerEvents = playing ? 'none' : 'auto';
    }
    if (centerIcon) {
      centerIcon.className = playing ? 'fas fa-pause text-xl' : 'fas fa-play text-xl ml-1';
    }
    if (ctrlIcon) {
      ctrlIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  function updateTimeDisplay() {
    const curSec = Math.floor(currentTime);
    const min = String(Math.floor(curSec / 60)).padStart(2, '0');
    const sec = String(curSec % 60).padStart(2, '0');
    const formatted = `${min}:${sec} / 02:00`;

    const timeEl1 = document.getElementById('demo-time-counter');
    const timeEl2 = document.getElementById('demo-ctrl-time');
    const fillEl = document.getElementById('demo-scrubber-fill');

    if (timeEl1) timeEl1.textContent = formatted;
    if (timeEl2) timeEl2.textContent = formatted;
    if (fillEl) fillEl.style.width = `${(currentTime / duration) * 100}%`;
  }

  function showEndOverlay(show) {
    const overlay = document.getElementById('demo-end-overlay');
    if (overlay) {
      if (show) overlay.classList.remove('hidden');
      else overlay.classList.add('hidden');
    }
  }

  // --- Public Interface ---
  window.CourseVideoEngine = {
    open: function(course) {
      initEngine();
      currentCourse = course;
      currentTime = 0;
      showEndOverlay(false);
      updateTimeDisplay();

      // Setup exact course audio track
      setupCourseAudio(course);

      // Update header watermark
      const watermarkTitle = document.getElementById('demo-watermark-title');
      if (watermarkTitle) {
        watermarkTitle.textContent = `AGS Academys • ${course.title}`;
      }

      // Initial frame render
      renderFrame();
      startPlayback();
    },
    close: function() {
      pausePlayback();
      currentTime = 0;
      if (bgAudioEl) {
        bgAudioEl.pause();
        bgAudioEl.currentTime = 0;
      }
      if (voiceAudioEl) {
        voiceAudioEl.pause();
        voiceAudioEl.currentTime = 0;
      }
    },
    togglePlay: togglePlayback,
    seek: seekTo,
    replay: replay,
    toggleMute: toggleMute,
    handleScrubberClick: function(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      seekTo(pct * duration);
    }
  };

  // Expose global controller helpers
  window.toggleDemoPlayback = togglePlayback;
  window.toggleDemoMute = toggleMute;
  window.handleScrubberClick = window.CourseVideoEngine.handleScrubberClick;

})();
