const fs = require('fs');
const path = require('path');

const courses = [
  {
    id: 'frontend',
    title: 'Front End Web Development',
    description: 'Become a modern Front End Developer. Master HTML, CSS, JavaScript (ES6+), React.js, and build responsive, real-world projects.',
    duration: '3 Months',
    level: 'Beginner → Advanced',
    projects: '4+ Hands-on Projects',
    price: '₹12,499',
    gradient: 'from-blue-600 to-indigo-600',
    iconColor: 'bg-blue-600',
    timelineColor: 'bg-blue-600 text-blue-600',
    timelineBorder: 'border-blue-200',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-100',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000',
    syllabus: [
      {
        title: 'HTML & Modern CSS',
        items: ['Introduction to the Web Architecture', 'HTML5 Semantic Elements & SEO', 'CSS Box Model, Specificity & Typography', 'CSS Grid & Flexbox Deep Dive', 'Responsive Design & Media Queries', 'TailwindCSS Fundamentals & Customization', 'CSS Animations & Transitions', 'Accessibility (a11y) Best Practices']
      },
      {
        title: 'JavaScript (ES6+)',
        items: ['Variables, Let vs Const, Arrow Functions', 'Arrays, Objects, and Destructuring', 'DOM Manipulation & Event Bubbling', 'Async/Await, Promises & API Fetching', 'Modules, Webpack & Babel', 'Building an Interactive Weather Dashboard', 'Closures, Hoisting & Scope', 'Object Oriented JavaScript']
      },
      {
        title: 'React.js & Redux',
        items: ['Introduction to React & JSX Under the Hood', 'Components, Props, & Complex State', 'React Hooks (useState, useEffect, useRef)', 'React Router for SPAs', 'State Management with Redux Toolkit', 'Context API vs Redux', 'Building Custom Hooks', 'Final Project: Full E-commerce Application']
      },
      {
        title: 'Advanced React & Performance',
        items: ['Memoization (useMemo, useCallback, React.memo)', 'React Suspense & Lazy Loading', 'Concurrent Mode & Transitions', 'Optimizing Renders & Bundle Size', 'Error Boundaries & Monitoring', 'Virtual DOM Deep Dive']
      },
      {
        title: 'Next.js & Server-Side Rendering',
        items: ['Introduction to Next.js App Router', 'File-based Routing & Layouts', 'Static Site Generation (SSG)', 'Server-Side Rendering (SSR)', 'API Routes & Fullstack Next.js', 'Next.js Image Optimization & SEO']
      },
      {
        title: 'Testing & Deployment',
        items: ['Unit Testing with Jest', 'Component Testing with React Testing Library', 'End-to-End Testing with Cypress', 'Mocking APIs (MSW)', 'CI/CD Pipelines with GitHub Actions', 'Deploying on Vercel & Netlify']
      },
      {
        title: 'Placement & Interview Prep',
        items: ['Resume Building & ATS Optimization', 'LinkedIn Branding & Networking', 'Mock Interviews & MNC Strategies', 'Soft Skills & Behavioral Interviews', 'Whiteboard Coding & Data Structures Basics', 'Negotiating Offers & Career Growth']
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Learn Node.js, Express, Databases, APIs, Authentication, and Deployment to master the server-side.',
    duration: '4 Months',
    level: 'Beginner → Advanced',
    projects: '5+ Hands-on Projects',
    price: '₹14,999',
    gradient: 'from-green-600 to-emerald-600',
    iconColor: 'bg-green-600',
    timelineColor: 'bg-green-600 text-green-600',
    timelineBorder: 'border-green-200',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-100',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000',
    syllabus: [
      { title: 'Node.js Fundamentals', items: ['Introduction to Backend Development', 'V8 Engine & Node Architecture', 'Modules & NPM Package Management', 'Event Loop & Async Programming', 'File System (fs) & Streams', 'Buffer & Microtasks', 'Building HTTP Servers from scratch'] },
      { title: 'Express.js Mastery', items: ['Intro to Express Framework', 'Advanced Routing & Middleware', 'Template Engines (EJS/Handlebars)', 'REST API Design Principles', 'Error Handling & Validation', 'CORS & Helmet for Security'] },
      { title: 'Databases (SQL & NoSQL)', items: ['MongoDB Basics & Mongoose ODM', 'Aggregation Pipelines', 'PostgreSQL & Relational Models', 'ACID Properties', 'Database Relationships (1:1, 1:N, N:M)', 'Data Indexing & Performance'] },
      { title: 'Authentication & Security', items: ['User Authentication Concepts', 'JWT (JSON Web Tokens) Implementation', 'OAuth 2.0 Integration (Google, GitHub)', 'Session Management & Cookies', 'Password Hashing (bcrypt)', 'Preventing SQL Injection & XSS'] },
      { title: 'Advanced Backend Concepts', items: ['Caching with Redis', 'Message Queues (RabbitMQ/Kafka)', 'WebSockets (Socket.io) for Real-time', 'Microservices Architecture Basics', 'Dockerizing Node.js Apps'] },
      { title: 'Placement & Interview Prep', items: ['System Design Basics', 'Scalability & Load Balancing Concepts', 'Backend Whiteboard Coding', 'Resume Building & LinkedIn', 'Mock Interviews & MNC Strategies'] }
    ]
  },
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Master Python from basics to advanced concepts — data structures, OOP, web development, and more.',
    duration: '2 Months',
    level: 'Beginner → Intermediate',
    projects: '10+ Mini Projects',
    price: '₹8,999',
    gradient: 'from-yellow-500 to-orange-500',
    iconColor: 'bg-orange-500',
    timelineColor: 'bg-orange-500 text-orange-500',
    timelineBorder: 'border-orange-200',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-100',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2000',
    syllabus: [
      { title: 'Python Basics', items: ['Variables, Mutability & Data Types', 'Control Flow (If/Else, Loops, Match-Case)', 'Functions, Args & Kwargs', 'Error Handling (Try/Except/Finally)', 'Lambda Functions', 'Memory Management Basics'] },
      { title: 'Data Structures', items: ['Lists, Tuples, Sets, Dictionaries', 'List & Dict Comprehensions', 'Advanced Iteration & Generators', 'Decorators & Closures', 'Collections Module'] },
      { title: 'Object-Oriented Programming', items: ['Classes, Objects, and Self', 'Inheritance & Polymorphism', 'Dunder (Magic) Methods', 'Encapsulation & Property Decorators', 'Metaclasses Basics'] },
      { title: 'File Handling & APIs', items: ['Reading/Writing Files (TXT, CSV, JSON)', 'Regular Expressions (Regex)', 'Using Requests Library for APIs', 'Building a CLI App', 'Web Scraping with BeautifulSoup'] },
      { title: 'Placement & Interview Prep', items: ['Python Tricky Interview Questions', 'Competitive Programming Basics', 'Algorithm Problem Solving', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Learn enterprise-grade software development with Java, Spring Boot, and Microservices.',
    duration: '4 Months',
    level: 'Beginner → Advanced',
    projects: '4+ Enterprise Projects',
    price: '₹15,999',
    gradient: 'from-red-600 to-orange-600',
    iconColor: 'bg-red-600',
    timelineColor: 'bg-red-600 text-red-600',
    timelineBorder: 'border-red-200',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-100',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000',
    syllabus: [
      { title: 'Java Core Fundamentals', items: ['JVM, JRE, JDK Architecture', 'Variables, Operators, Control Flow', 'Arrays, Strings & StringPool', 'Exception Handling & Custom Exceptions', 'Garbage Collection Basics'] },
      { title: 'OOP & Collections Framework', items: ['Inheritance, Interfaces, Abstract Classes', 'List, Set, Map, Queue Interfaces', 'Generics & Wildcards', 'Comparable & Comparator', 'Java 8 Streams & Lambdas', 'Optional Class'] },
      { title: 'Multithreading & Concurrency', items: ['Thread Lifecycle', 'Runnable vs Callable', 'Synchronization & Locks', 'Executors Framework', 'Concurrent Collections'] },
      { title: 'Spring Boot Framework', items: ['Dependency Injection & IoC Container', 'Spring MVC & REST APIs', 'Spring Data JPA & Hibernate', 'Spring Security & JWT', 'Actuator & Profiles'] },
      { title: 'Advanced Concepts', items: ['Microservices Architecture Basics', 'Service Discovery (Eureka)', 'API Gateway', 'Dockerizing Java Apps', 'Unit Testing with JUnit & Mockito'] },
      { title: 'Placement & Interview Prep', items: ['Java Tricky Interview Questions', 'System Design (HLD & LLD)', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'datascience',
    title: 'Data Science',
    description: 'Extract insights from data using Python, Pandas, Machine Learning, and Data Visualization techniques.',
    duration: '5 Months',
    level: 'Beginner → Advanced',
    projects: '6+ Real-World Datasets',
    price: '₹18,999',
    gradient: 'from-teal-600 to-cyan-600',
    iconColor: 'bg-teal-600',
    timelineColor: 'bg-teal-600 text-teal-600',
    timelineBorder: 'border-teal-200',
    bgClass: 'bg-teal-50',
    borderClass: 'border-teal-100',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
    syllabus: [
      { title: 'Python for Data Science', items: ['Advanced Python Concepts', 'Numpy Arrays & Vectorization', 'Pandas Dataframes & Series', 'Data Cleaning & Preprocessing', 'Handling Missing Data & Outliers'] },
      { title: 'Exploratory Data Analysis (EDA)', items: ['Matplotlib & Seaborn', 'Plotly for Interactive Dashboards', 'Statistical Analysis & Hypothesis Testing', 'Feature Engineering & Selection', 'Correlation vs Causation'] },
      { title: 'Machine Learning Basics', items: ['Supervised vs Unsupervised Learning', 'Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Model Evaluation (Precision, Recall, F1)', 'Hyperparameter Tuning (GridSearch)'] },
      { title: 'Big Data & Advanced Tools', items: ['Advanced SQL Queries (Window Functions, CTEs)', 'Introduction to Big Data (Apache Spark/PySpark)', 'Connecting Python to Databases', 'NoSQL (MongoDB) for Data Scientists'] },
      { title: 'Placement & Interview Prep', items: ['Case Studies & Guesstimates', 'Data Science Interview Questions', 'Portfolio Building (Kaggle/GitHub)', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Dive deep into Neural Networks, Deep Learning, NLP, and Computer Vision using TensorFlow and PyTorch.',
    duration: '6 Months',
    level: 'Intermediate → Advanced',
    projects: '5+ AI Models',
    price: '₹22,999',
    gradient: 'from-purple-600 to-fuchsia-600',
    iconColor: 'bg-purple-600',
    timelineColor: 'bg-purple-600 text-purple-600',
    timelineBorder: 'border-purple-200',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-100',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000',
    syllabus: [
      { title: 'Foundations of AI', items: ['Math for AI (Linear Algebra, Calculus, Prob/Stat)', 'Python Refresher for AI', 'Introduction to Neural Networks', 'Perceptron Model'] },
      { title: 'Deep Learning Core', items: ['Building ANNs with TensorFlow/Keras & PyTorch', 'Forward & Backpropagation', 'Activation Functions & Loss Functions', 'Optimizers (Adam, SGD)', 'Hyperparameter Tuning'] },
      { title: 'Computer Vision', items: ['Convolutional Neural Networks (CNNs)', 'Image Classification & Segmentation', 'Object Detection (YOLO, SSD)', 'Transfer Learning (ResNet, VGG)', 'OpenCV Basics'] },
      { title: 'Natural Language Processing', items: ['Text Preprocessing (Tokenization, Stemming)', 'Word Embeddings (Word2Vec, GloVe)', 'RNNs, LSTMs & GRUs', 'Attention Mechanism & Transformers', 'Working with LLMs (GPT, BERT, HuggingFace)'] },
      { title: 'Generative AI & Deployment', items: ['GANs (Generative Adversarial Networks)', 'Diffusion Models', 'Deploying AI Models with FastAPI/Docker', 'ONNX & Model Optimization'] },
      { title: 'Placement & Interview Prep', items: ['AI/ML System Design', 'Research Paper Implementations', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Build predictive models and algorithms that learn from data using Scikit-Learn and advanced ML techniques.',
    duration: '4 Months',
    level: 'Beginner → Advanced',
    projects: '8+ Predictive Models',
    price: '₹16,999',
    gradient: 'from-rose-500 to-pink-600',
    iconColor: 'bg-rose-500',
    timelineColor: 'bg-rose-500 text-rose-500',
    timelineBorder: 'border-rose-200',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-100',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2000',
    syllabus: [
      { title: 'ML Fundamentals', items: ['Bias-Variance Tradeoff', 'Cross-Validation & K-Fold', 'Scikit-Learn Basics', 'Feature Scaling & Encoding', 'Handling Imbalanced Datasets'] },
      { title: 'Supervised Learning', items: ['Linear & Logistic Regression', 'Support Vector Machines (SVM)', 'K-Nearest Neighbors (KNN)', 'Decision Trees', 'Ensemble Methods (Random Forest, XGBoost, AdaBoost, LightGBM)'] },
      { title: 'Unsupervised Learning', items: ['K-Means Clustering', 'Hierarchical Clustering', 'DBSCAN', 'Principal Component Analysis (PCA)', 't-SNE for Dimensionality Reduction'] },
      { title: 'Model Deployment & MLOps', items: ['Saving Models (Pickle, Joblib)', 'Building APIs with FastAPI/Flask', 'Deploying ML Models to AWS/GCP', 'Introduction to MLflow & Model Tracking', 'Docker for ML'] },
      { title: 'Placement & Interview Prep', items: ['ML Interview Questions', 'Kaggle Competitions Strategy', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Design beautiful, user-centric interfaces. Master Figma, wireframing, prototyping, and user research.',
    duration: '3 Months',
    level: 'Beginner → Advanced',
    projects: '3+ Design Portfolios',
    price: '₹11,999',
    gradient: 'from-pink-500 to-purple-500',
    iconColor: 'bg-pink-500',
    timelineColor: 'bg-pink-500 text-pink-500',
    timelineBorder: 'border-pink-200',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-100',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
    syllabus: [
      { title: 'UX Fundamentals', items: ['User Research & Empathy Mapping', 'Creating User Personas', 'Information Architecture & Card Sorting', 'User Flows & Journey Mapping', 'Wireframing (Low & High Fidelity)'] },
      { title: 'UI Design Basics', items: ['Color Theory & Psychology', 'Typography & Hierarchy', 'Grid Systems, Spacing & Layout', 'Visual Hierarchy & Composition', 'Iconography & Imagery'] },
      { title: 'Figma Mastery', items: ['Advanced Figma Tools', 'Components, Variants & Auto Layout', 'Creating Design Systems', 'Interactive Prototyping & Smart Animate', 'Plugins & Workflow Optimization'] },
      { title: 'Usability Testing & Handoff', items: ['A/B Testing & Analytics', 'Heuristic Evaluation', 'Conducting User Interviews', 'Developer Handoff (Zeplin/Figma)', 'Design Tokens'] },
      { title: 'Placement & Interview Prep', items: ['Building a Behance/Dribbble Portfolio', 'Whiteboard Design Challenges', 'App Critiques', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Crack coding interviews at FAANG and top product companies. Master arrays, graphs, DP, and complex algorithms.',
    duration: '4 Months',
    level: 'Intermediate → Advanced',
    projects: '300+ Coding Problems',
    price: '₹10,999',
    gradient: 'from-indigo-600 to-blue-700',
    iconColor: 'bg-indigo-600',
    timelineColor: 'bg-indigo-600 text-indigo-600',
    timelineBorder: 'border-indigo-200',
    bgClass: 'bg-indigo-50',
    borderClass: 'border-indigo-100',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000',
    syllabus: [
      { title: 'Basic Data Structures', items: ['Arrays & Strings (Sliding Window, Two Pointers)', 'Linked Lists (Singly, Doubly, Fast/Slow Pointers)', 'Stacks & Queues (Monotonic Stack)', 'Time & Space Complexity (Big O Notation, Master Theorem)'] },
      { title: 'Algorithms', items: ['Sorting Algorithms (Merge, Quick, Heap)', 'Searching (Binary Search Variations)', 'Recursion & Backtracking (N-Queens, Sudoku)', 'Greedy Algorithms'] },
      { title: 'Advanced Data Structures', items: ['Trees (Binary, BST, AVL, Segment Trees)', 'Heaps & Priority Queues', 'Hash Tables & Collisions', 'Trie (Prefix Tree)', 'Disjoint Set (Union-Find)'] },
      { title: 'Graphs & DP', items: ['Graph Traversals (BFS, DFS, Topological Sort)', 'Shortest Path Algorithms (Dijkstra, Bellman-Ford)', 'Minimum Spanning Tree (Kruskal, Prim)', 'Dynamic Programming Patterns (Knapsack, LCS, LIS)', 'Bit Manipulation'] },
      { title: 'Placement & Interview Prep', items: ['FAANG Interview Strategies', 'System Design Basics (HLD & LLD)', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Learn Ethical Hacking, Network Security, Cryptography, and Penetration Testing to secure modern applications.',
    duration: '5 Months',
    level: 'Beginner → Advanced',
    projects: '5+ Real-world Scenarios',
    price: '₹19,999',
    gradient: 'from-slate-700 to-gray-900',
    iconColor: 'bg-slate-700',
    timelineColor: 'bg-slate-700 text-slate-700',
    timelineBorder: 'border-slate-200',
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-200',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000',
    syllabus: [
      { title: 'Networking & Security Basics', items: ['OSI Model, TCP/IP, Subnetting', 'Linux for Hackers (Bash, Permissions)', 'Windows Internals', 'Types of Cyber Attacks & Malware', 'Active Directory Basics'] },
      { title: 'Ethical Hacking (Red Teaming)', items: ['Information Gathering (OSINT, Recon)', 'Vulnerability Scanning (Nmap, Nessus)', 'Exploitation Techniques (Metasploit)', 'Privilege Escalation (Windows/Linux)', 'Social Engineering'] },
      { title: 'Web Application Security', items: ['OWASP Top 10 Deep Dive', 'SQL Injection, XSS, CSRF', 'Burp Suite Setup & Usage', 'API Security & Testing', 'SSRF & Directory Traversal'] },
      { title: 'Cryptography & Defense (Blue Teaming)', items: ['Symmetric & Asymmetric Encryption', 'Hashes & Digital Signatures', 'Firewalls & IDS/IPS Configuration', 'SIEM (Splunk/ELK) & Log Analysis', 'Incident Response & Forensics'] },
      { title: 'Placement & Interview Prep', items: ['Certifications Prep (CEH, CompTIA Sec+, OSCP)', 'Security Analyst/Pen Tester Interview Questions', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    description: 'Step into the future of computing. Learn Qubits, Quantum Gates, and programming quantum algorithms using Qiskit.',
    duration: '6 Months',
    level: 'Advanced',
    projects: '3+ Quantum Algorithms',
    price: '₹24,999',
    gradient: 'from-violet-600 to-purple-800',
    iconColor: 'bg-violet-600',
    timelineColor: 'bg-violet-600 text-violet-600',
    timelineBorder: 'border-violet-200',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-100',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000',
    syllabus: [
      { title: 'Quantum Mechanics Basics', items: ['Superposition & Entanglement Concepts', 'Linear Algebra & Complex Numbers for Quantum', 'Qubits vs Classical Bits', 'Bloch Sphere Representation'] },
      { title: 'Quantum Gates & Circuits', items: ['Single Qubit Gates (Pauli, Hadamard, Phase)', 'Multi-Qubit Gates (CNOT, Toffoli)', 'Building Quantum Circuits', 'Measurement, Decoherence & Error Rates', 'Quantum Teleportation Protocol'] },
      { title: 'Quantum Programming (Qiskit)', items: ['Introduction to IBM Qiskit Framework', 'Running Code on Real IBM Quantum Computers', 'Quantum Simulators & Noise Models', 'Qiskit Aer & Ignis'] },
      { title: 'Quantum Algorithms', items: ['Deutsch-Jozsa Algorithm', 'Grover\'s Search Algorithm', 'Shor\'s Factoring Algorithm', 'Quantum Key Distribution (BB84)', 'Variational Quantum Eigensolver (VQE)'] },
      { title: 'Placement & Interview Prep', items: ['Quantum Research Opportunities', 'Advanced Academia & PhD Prep', 'Industry Applications (Finance/Chemistry)', 'Resume Building', 'Mock Interviews'] }
    ]
  },
  {
    id: 'webdev',
    title: 'Web Development (Full Stack)',
    description: 'Become a Full Stack developer by mastering both Frontend (React) and Backend (Node.js) to build end-to-end apps.',
    duration: '6 Months',
    level: 'Beginner → Advanced',
    projects: '6+ Full Stack Apps',
    price: '₹21,999',
    gradient: 'from-blue-600 to-green-600',
    iconColor: 'bg-blue-600',
    timelineColor: 'bg-blue-600 text-blue-600',
    timelineBorder: 'border-blue-200',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-100',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000',
    syllabus: [
      { title: 'Frontend Basics', items: ['HTML5, CSS3, TailwindCSS', 'JavaScript ES6+, DOM Manipulation', 'Async JS & APIs', 'Responsive Design'] },
      { title: 'React.js Frontend', items: ['React Components, Props & Hooks', 'State Management (Redux Toolkit)', 'React Router for SPAs', 'Form Validation & API Integration'] },
      { title: 'Node.js Backend', items: ['Express.js REST APIs', 'Authentication & Authorization (JWT)', 'File Uploads & Middleware', 'Error Handling & Validation'] },
      { title: 'Databases & System Design', items: ['MongoDB & Mongoose (NoSQL)', 'PostgreSQL (SQL)', 'Caching with Redis', 'System Design Basics for Fullstack'] },
      { title: 'DevOps & Deployment', items: ['Git & GitHub Collaboration', 'Docker Basics & Containerization', 'CI/CD Pipelines', 'AWS/Vercel/Heroku Deployment'] },
      { title: 'Placement & Interview Prep', items: ['Full Stack System Design', 'MERN Stack Interview Questions', 'Resume Building & Portfolio', 'Mock Interviews'] }
    ]
  }
];

const template = (course) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${course.title} - GK Academy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Fade Up Animation */
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeInUp 0.8s ease-out forwards; }

    /* Seamless Logo Marquee */
    .logo-marquee-container {
      overflow: hidden;
      display: flex;
      width: 100%;
      background: white;
      padding: 2.5rem 0;
      border-top: 1px solid #f3f4f6;
    }
    .logo-marquee-track {
      display: flex;
      width: max-content;
      animation: seamless-logo-marquee 25s linear infinite;
    }
    .logo-marquee-track:hover {
      animation-play-state: paused;
    }
    @keyframes seamless-logo-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .company-logo-card {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      flex-shrink: 0;
      padding: 0 2rem;
      transition: transform 0.3s ease;
    }
    .company-logo-card:hover {
      transform: scale(1.1);
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans flex flex-col min-h-screen">

  <!-- ================= NAVBAR ================= -->
  <header class="sticky top-0 z-50 bg-[#141417]">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-6">
          <a href="index.html" class="flex items-baseline gap-1 shrink-0">
              <span class="font-bold text-2xl text-white">GK</span>
              <span class="font-bold text-2xl text-[var(--purple)]" style="color: #7C3AED;">Academy</span>
          </a>

          <!-- search (desktop) -->
          <div class="hidden lg:flex flex-1 max-w-md">
              <div class="w-full flex items-center bg-[#232327] rounded-full px-4 py-2 text-sm text-[#B9B7C2] focus-within:ring-2 focus-within:ring-[#7C3AED]">
                  <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search for Python, Java, React..." class="bg-transparent outline-none w-full placeholder-[#8B899A] text-white">
              </div>
          </div>

          <nav class="hidden lg:flex items-center gap-6 text-sm font-medium ml-2 text-[#D8D6E0]">
              <a href="index.html#courses" class="hover:text-white transition">Courses</a>
              <a href="index.html#demand" class="hover:text-white transition">Career Paths</a>
              <a href="index.html#reviews" class="hover:text-white transition">Reviews</a>
          </nav>

          <div class="hidden lg:flex items-center gap-3 ml-auto">
              <a href="login.html" class="px-4 py-2 text-sm font-semibold text-white border border-[#4A4850] rounded-full hover:border-white transition">Log in</a>
              <a href="signup.html" class="px-4 py-2 text-sm font-semibold text-[#141417] bg-white rounded-full hover:bg-[#F1EBFE] transition">Sign up</a>
          </div>
      </div>
  </header>

  <!-- Banner -->
  <div class="relative h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
    <!-- Background Image -->
    <img src="${course.image}"
         alt="${course.title} Banner"
         class="absolute inset-0 w-full h-full object-cover">

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-70"></div>

    <!-- Banner Text -->
    <div class="relative z-10 max-w-3xl px-6 fade-up">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4">
        ${course.title}
      </h1>
      <p class="text-lg md:text-xl mb-6">
        ${course.description}
      </p>
      <a href="enroll.html?course=${course.id}" 
         class="${course.iconColor} hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition inline-block">
        Enroll Now
      </a>
    </div>
  </div>

  <!-- Overview -->
  <section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-3xl font-bold mb-6 text-center">Course Overview</h2>
    <p class="text-lg text-gray-700 text-center mb-10 leading-relaxed">
      This comprehensive program is designed to take you from fundamentals to advanced concepts. Learn from industry experts and build a powerful portfolio that gets you hired.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white shadow-md rounded-xl p-6 text-center">
        <h3 class="text-xl font-semibold mb-2">📅 Duration</h3>
        <p>${course.duration}</p>
      </div>
      <div class="bg-white shadow-md rounded-xl p-6 text-center">
        <h3 class="text-xl font-semibold mb-2">📈 Level</h3>
        <p>${course.level}</p>
      </div>
      <div class="bg-white shadow-md rounded-xl p-6 text-center">
        <h3 class="text-xl font-semibold mb-2">💻 Projects</h3>
        <p>${course.projects}</p>
      </div>
    </div>
  </section>

  <!-- Placement Logos Section -->
  <section class="bg-white pt-8">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-sm font-bold text-center text-gray-800 uppercase tracking-widest mb-6">Our students are placed at top companies</h2>
    </div>
    <div class="logo-marquee-container">
      <div class="logo-marquee-track">
         <!-- Logos (Set 1) -->
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
             <rect x="0" y="0" width="28" height="28" rx="4" fill="#E22627"/>
             <rect x="30" y="0" width="28" height="28" rx="4" fill="#32884A"/>
             <rect x="60" y="0" width="28" height="28" rx="4" fill="#316FBA"/>
             <rect x="90" y="0" width="28" height="28" rx="4" fill="#F49A2B"/>
             <text x="6" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">Z</text>
             <text x="34" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">O</text>
             <text x="64" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">H</text>
             <text x="94" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">O</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <div class="flex items-center gap-2">
             <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/></svg>
             <div class="font-black text-xl leading-none text-gray-800 tracking-tight text-left">IUCS<br><span class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Consulting</span></div>
           </div>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
             <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#2563EB" letter-spacing="-1">tcs</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg">
             <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="bold" fill="#007BC0">Infosys</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
             <circle cx="15" cy="15" r="6" fill="#EE2A24"/>
             <circle cx="28" cy="15" r="6" fill="#F37021"/>
             <circle cx="41" cy="15" r="6" fill="#F8A51C"/>
             <circle cx="15" cy="28" r="6" fill="#009640"/>
             <circle cx="28" cy="28" r="6" fill="#00AEEF"/>
             <circle cx="41" cy="28" r="6" fill="#0064B3"/>
             <circle cx="28" cy="41" r="6" fill="#662483"/>
             <text x="60" y="36" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="bold" fill="#0064B3">wipro</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-8 w-auto" viewBox="0 0 450 135" xmlns="http://www.w3.org/2000/svg">
             <path fill="#000" d="M129.5 75.3l-59-19 59-18.7v-25L10 50.7v11l119.5 38.6z"/>
             <path fill="#a100ff" d="M141.2 56h35v11h-35z"/>
             <text x="0" y="130" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold">accenture</text>
           </svg>
         </div>
         
         <!-- Logos (Duplicate for Seamless Loop) -->
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
             <rect x="0" y="0" width="28" height="28" rx="4" fill="#E22627"/>
             <rect x="30" y="0" width="28" height="28" rx="4" fill="#32884A"/>
             <rect x="60" y="0" width="28" height="28" rx="4" fill="#316FBA"/>
             <rect x="90" y="0" width="28" height="28" rx="4" fill="#F49A2B"/>
             <text x="6" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">Z</text>
             <text x="34" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">O</text>
             <text x="64" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">H</text>
             <text x="94" y="21" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="white">O</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <div class="flex items-center gap-2">
             <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/></svg>
             <div class="font-black text-xl leading-none text-gray-800 tracking-tight text-left">IUCS<br><span class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Consulting</span></div>
           </div>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
             <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#2563EB" letter-spacing="-1">tcs</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg">
             <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="bold" fill="#007BC0">Infosys</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-10 w-auto" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
             <circle cx="15" cy="15" r="6" fill="#EE2A24"/>
             <circle cx="28" cy="15" r="6" fill="#F37021"/>
             <circle cx="41" cy="15" r="6" fill="#F8A51C"/>
             <circle cx="15" cy="28" r="6" fill="#009640"/>
             <circle cx="28" cy="28" r="6" fill="#00AEEF"/>
             <circle cx="41" cy="28" r="6" fill="#0064B3"/>
             <circle cx="28" cy="41" r="6" fill="#662483"/>
             <text x="60" y="36" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="bold" fill="#0064B3">wipro</text>
           </svg>
         </div>
         <div class="company-logo-card">
           <svg class="h-8 w-auto" viewBox="0 0 450 135" xmlns="http://www.w3.org/2000/svg">
             <path fill="#000" d="M129.5 75.3l-59-19 59-18.7v-25L10 50.7v11l119.5 38.6z"/>
             <path fill="#a100ff" d="M141.2 56h35v11h-35z"/>
             <text x="0" y="130" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold">accenture</text>
           </svg>
         </div>
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="bg-white py-16 shadow-inner border-t border-gray-100">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-10 text-center">Why Choose GK Academy?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Benefit 1 -->
        <div class="flex items-start gap-4 p-6 ${course.bgClass} rounded-2xl border ${course.borderClass} shadow-sm transition hover:shadow-md">
          <div class="${course.iconColor} text-white p-3 rounded-full shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">100% Placement Support</h3>
            <p class="text-gray-600 leading-relaxed">Get guaranteed placement assistance in top MNCs. We provide dedicated interview prep, resume building, and mock interviews to make you job-ready.</p>
          </div>
        </div>

        <!-- Benefit 2 -->
        <div class="flex items-start gap-4 p-6 ${course.bgClass} rounded-2xl border ${course.borderClass} shadow-sm transition hover:shadow-md">
          <div class="${course.iconColor} text-white p-3 rounded-full shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Learn from Global Mentors</h3>
            <p class="text-gray-600 leading-relaxed">Our instructors are industry veterans with 10+ years of experience from top tech hubs abroad, including the UK and Australia.</p>
          </div>
        </div>

        <!-- Benefit 3 -->
        <div class="flex items-start gap-4 p-6 ${course.bgClass} rounded-2xl border ${course.borderClass} shadow-sm transition hover:shadow-md">
          <div class="${course.iconColor} text-white p-3 rounded-full shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Industry Certification</h3>
            <p class="text-gray-600 leading-relaxed">Earn a globally recognized completion certificate. Validate your skills and stand out to top tech recruiters.</p>
          </div>
        </div>

        <!-- Benefit 4 -->
        <div class="flex items-start gap-4 p-6 ${course.bgClass} rounded-2xl border ${course.borderClass} shadow-sm transition hover:shadow-md">
          <div class="${course.iconColor} text-white p-3 rounded-full shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Portfolio-Ready Projects</h3>
            <p class="text-gray-600 leading-relaxed">Don't just watch videos. Build real-world applications that you can show off to recruiters to prove your expertise.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Modern Timeline Syllabus -->
  <section class="py-16 bg-gray-50 border-t border-gray-200">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-12 text-center">Course Curriculum</h2>

      <div class="relative border-l-2 ${course.timelineBorder} ml-4 space-y-12 pb-8">
        ${course.syllabus.map((mod, i) => `
          <div class="relative pl-8 fade-up" style="animation-delay: ${i * 0.1}s">
             <!-- Circle Marker -->
             <div class="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full ${course.timelineColor} bg-current ring-4 ring-gray-50 shadow-sm"></div>
             
             <!-- Module Header -->
             <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Module ${i+1}</h4>
             <h3 class="text-2xl font-bold text-gray-900 mb-6">${mod.title}</h3>
             
             <!-- Concepts List -->
             <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
               ${mod.items.map(item => `
                 <li class="flex items-start gap-3">
                   <svg class="w-5 h-5 ${course.timelineColor} shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                   <span class="leading-snug">${item}</span>
                 </li>
               `).join('')}
             </ul>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Course Details Grid -->
  <section class="py-16 bg-white border-t border-gray-200">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12 text-[#141417]">Course Details</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <!-- Detail 1 -->
        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition duration-300">
          <svg class="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Format</h4>
          <p class="text-lg font-bold text-gray-900">Live Online</p>
        </div>
        <!-- Detail 2 -->
        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition duration-300">
          <svg class="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Duration</h4>
          <p class="text-lg font-bold text-gray-900">1 hr / session</p>
        </div>
        <!-- Detail 3 -->
        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition duration-300">
          <svg class="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Schedule</h4>
          <p class="text-lg font-bold text-gray-900">3 Days / Week</p>
        </div>
        <!-- Detail 4 -->
        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition duration-300">
          <svg class="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
          <h4 class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Languages</h4>
          <p class="text-lg font-bold text-gray-900">EN, TA, HI</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="text-center py-20 bg-gray-50 flex-1 border-t border-gray-200">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Master ${course.title.replace(' Development', '').replace(' Programming', '')}?</h2>
    <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of students and start your journey towards becoming a professional today.</p>
    <a href="enroll.html?course=${course.id}" 
       class="${course.iconColor} hover:opacity-90 text-white px-10 py-4 rounded-xl font-bold shadow-xl transition transform hover:-translate-y-1 inline-block">
      Enroll Now for ${course.price}
    </a>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-[#141417] text-[#8B899A] py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#232327] pb-8 mb-8">
              <a href="index.html" class="flex items-baseline gap-1">
                  <span class="font-bold text-2xl text-white">GK</span>
                  <span class="font-bold text-2xl text-[var(--purple)]" style="color: #7C3AED;">Academy</span>
              </a>
              <div class="flex gap-6 text-sm font-medium">
                  <a href="#" class="hover:text-white transition">About</a>
                  <a href="#" class="hover:text-white transition">Careers</a>
                  <a href="#" class="hover:text-white transition">Privacy</a>
                  <a href="#" class="hover:text-white transition">Terms</a>
              </div>
          </div>
          <div class="text-sm text-center md:text-left">
              &copy; 2026 GK Academy, Inc. All rights reserved.
          </div>
      </div>
  </footer>
</body>
</html>`;

courses.forEach(course => {
  const filePath = path.join(__dirname, 'frontend', `${course.id}.html`);
  fs.writeFileSync(filePath, template(course), 'utf8');
  console.log(`Generated ${course.id}.html`);
});
