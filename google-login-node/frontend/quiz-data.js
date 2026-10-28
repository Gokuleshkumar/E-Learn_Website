// ==========================================================
// AGS ACADEMY - COMPREHENSIVE QUIZ DATA REPOSITORY
// Covers:
// 1. All Course Quizzes (12 Courses)
// 2. All Programming Question Topics & CS Fundamentals (11 Topics)
// Total 23 Comprehensive Quizzes with 115+ In-Depth Questions
// ==========================================================

window.AGS_QUIZ_DATA = {
  // ----------------------------------------------------------
  // COURSE QUIZZES (12 Courses)
  // ----------------------------------------------------------
  "course-frontend": {
    id: "course-frontend",
    title: "Frontend Development Masterclass Quiz",
    courseId: "frontend",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fab fa-html5",
    color: "#E34F26",
    gradient: "from-orange-500 to-amber-600",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Assess your mastery of modern HTML5, CSS layout systems, responsive design, React Hooks, and state management.",
    questions: [
      {
        question: "In React, what is the main purpose of passing a dependency array to the `useEffect` hook?",
        code: "useEffect(() => {\n  fetchData(userId);\n}, [userId]);",
        options: [
          "To tell React to only run the effect once when the component unmounts",
          "To control when the effect re-runs based on when specific values change between renders",
          "To prevent the component from re-rendering when userId updates",
          "To make the effect asynchronous and run on a separate browser worker"
        ],
        correctIndex: 1,
        explanation: "The dependency array allows React to skip re-running the effect if none of the dependencies have changed between renders. Specifying `[userId]` means the effect will re-run only when `userId` changes."
      },
      {
        question: "Which CSS display value enables a modern two-dimensional layout system with both rows and columns?",
        code: "container {\n  display: ?;\n  grid-template-columns: repeat(3, 1fr);\n}",
        options: [
          "display: flex",
          "display: inline-block",
          "display: grid",
          "display: table-cell"
        ],
        correctIndex: 2,
        explanation: "CSS Grid is a 2-dimensional layout model (handling rows and columns simultaneously), whereas Flexbox is primarily a 1-dimensional layout model (handling either rows OR columns at a time)."
      },
      {
        question: "What is Event Bubbling in the browser DOM?",
        options: [
          "The process where an event starts at the target element and propagates upwards to its ancestor elements",
          "The process where an event starts at window and travels down to the target element",
          "A technique to debounce fast user input in text fields",
          "An error thrown when multiple event listeners fire at the same millisecond"
        ],
        correctIndex: 0,
        explanation: "Event bubbling starts from the deepest target element that triggered the event and bubbles upwards through parent DOM nodes until reaching the Document and Window (unless event.stopPropagation() is called)."
      },
      {
        question: "What does the `useState` hook return in React?",
        code: "const [count, setCount] = useState(0);",
        options: [
          "An object containing the state value and a reducer function",
          "A pair: the current state value and a state updater function",
          "A promise that resolves to the updated state value",
          "A single function that acts as both getter and setter"
        ],
        correctIndex: 1,
        explanation: "`useState` returns an array with exactly two elements: the current state value, and a dispatch/setter function used to update the state and trigger a re-render."
      },
      {
        question: "Which HTML5 semantic element is most appropriate for independent, self-contained content such as a blog post or news story?",
        options: [
          "<section>",
          "<div>",
          "<article>",
          "<aside>"
        ],
        correctIndex: 2,
        explanation: "The `<article>` element specifies independent, self-contained content that could be distributed and reused independently (e.g., forum post, newspaper article, blog entry)."
      }
    ]
  },

  "course-backend": {
    id: "course-backend",
    title: "Node.js & Express Backend Course Quiz",
    courseId: "backend",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fab fa-node-js",
    color: "#68A063",
    gradient: "from-emerald-600 to-teal-700",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Evaluate your backend engineering skills in Node.js event-driven architecture, Express middleware, REST APIs, and MongoDB.",
    questions: [
      {
        question: "In Express.js, what must every custom middleware function call to pass control to the next middleware in the stack?",
        code: "app.use((req, res, next) => {\n  console.log('Incoming request: ' + req.url);\n  // What goes here?\n});",
        options: [
          "return res.continue();",
          "next();",
          "process.nextTick();",
          "res.send();"
        ],
        correctIndex: 1,
        explanation: "Calling `next()` passes execution to the next middleware in the Express request pipeline. If omitted without ending the response, the client request will hang indefinitely."
      },
      {
        question: "What does the Node.js Event Loop do when executing JavaScript code?",
        options: [
          "Executes all I/O operations directly on the main single thread without worker threads",
          "Monitors the Call Stack and moves callbacks from the Event Queue to the Call Stack when it is empty",
          "Compiles JavaScript code to machine code in parallel across all CPU cores",
          "Runs synchronous blocking code faster than multi-threaded languages"
        ],
        correctIndex: 1,
        explanation: "Node.js uses a single-threaded event loop that handles asynchronous operations via libuv. It continuously checks if the call stack is clear, then pushes queued callback functions onto the stack for execution."
      },
      {
        question: "Which HTTP status code is the standard RESTful response when a new resource is successfully created?",
        options: [
          "200 OK",
          "201 Created",
          "204 No Content",
          "202 Accepted"
        ],
        correctIndex: 1,
        explanation: "HTTP `201 Created` is the standard status code indicating that the request has succeeded and led to the creation of a new resource (commonly returned from POST requests)."
      },
      {
        question: "In MongoDB / Mongoose, which method finds a single document matching the given query filter?",
        code: "const user = await User.?( { email: 'student@example.com' } );",
        options: [
          "User.findOne()",
          "User.findSingle()",
          "User.matchOne()",
          "User.getBy()"
        ],
        correctIndex: 0,
        explanation: "`findOne(query)` finds the first document that satisfies the specified query criteria in Mongoose and MongoDB."
      },
      {
        question: "A JSON Web Token (JWT) is composed of three parts separated by periods (.):",
        options: [
          "Username, Password, Signature",
          "Header, Payload, Signature",
          "Algorithm, Body, Verification Key",
          "Public Key, Private Key, Salt"
        ],
        correctIndex: 1,
        explanation: "A standard JWT consists of three parts: Header (algorithm & token type), Payload (user claims and metadata), and Signature (cryptographic hash verifying integrity)."
      }
    ]
  },

  "course-java": {
    id: "course-java",
    title: "Java with SpringBoot Quiz",
    courseId: "java",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fab fa-java",
    color: "#E76F00",
    gradient: "from-amber-600 to-red-600",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Test your Java enterprise knowledge: OOP principles, Spring Boot annotations, Dependency Injection, and JPA.",
    questions: [
      {
        question: "In Spring Boot, what is the key difference between `@Controller` and `@RestController`?",
        options: [
          "`@RestController` is for SOAP web services only, while `@Controller` is for REST",
          "`@RestController` is a convenience annotation combining `@Controller` and `@ResponseBody`",
          "`@Controller` automatically serializes return values into JSON format",
          "`@RestController` does not support Spring Dependency Injection"
        ],
        correctIndex: 1,
        explanation: "`@RestController` is annotated with `@Controller` and `@ResponseBody`. Every handler method directly serializes its return value into HTTP response body (usually JSON) rather than rendering a view template."
      },
      {
        question: "Which of the following in Java is stored in Stack memory?",
        options: [
          "Primitive local variables and method invocation frames",
          "All instantiated objects created via the `new` keyword",
          "Static class variables and runtime constant pool",
          "The Garbage Collector tracking tables"
        ],
        correctIndex: 0,
        explanation: "Stack memory holds method execution call frames, primitive local variables, and references to objects. The actual objects themselves reside in the Heap memory."
      },
      {
        question: "What does the `@Autowired` annotation do in Spring framework?",
        options: [
          "Automatically connects the application to the SQL database without drivers",
          "Enables automatic dependency injection by scanning and injecting matching Spring beans",
          "Generates getters and setters for POJO classes at compile time",
          "Automatically restarts the Tomcat embedded server on code changes"
        ],
        correctIndex: 1,
        explanation: "`@Autowired` tells the Spring Inversion of Control (IoC) container to resolve and inject the collaborating bean by type automatically into the dependent class."
      },
      {
        question: "Which collection class in Java provides key-value pairs and allows one `null` key while not maintaining insertion order?",
        options: [
          "java.util.TreeMap",
          "java.util.Hashtable",
          "java.util.HashMap",
          "java.util.LinkedHashMap"
        ],
        correctIndex: 2,
        explanation: "`HashMap` stores key-value pairs using hashing, does not guarantee insertion order, and permits one `null` key and multiple `null` values (unlike `Hashtable` which forbids `null`)."
      },
      {
        question: "What is the purpose of the `Optional<T>` class introduced in Java 8?",
        options: [
          "To allow multiple inheritance in Java classes",
          "To provide a type-level solution for representing the presence or absence of a value without `NullPointerException`",
          "To make Java methods optionally synchronous or asynchronous",
          "To configure optional Spring profiles in application.properties"
        ],
        correctIndex: 1,
        explanation: "`Optional<T>` is a container object used to represent either a non-null value or an empty state, encouraging explicit handling of absent values and reducing `NullPointerException` errors."
      }
    ]
  },

  "course-python": {
    id: "course-python",
    title: "Python with Django Full Stack Quiz",
    courseId: "python",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fab fa-python",
    color: "#3776AB",
    gradient: "from-blue-600 to-indigo-700",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Verify your Python skills: language idioms, list comprehensions, Django MVT architecture, and ORM optimizations.",
    questions: [
      {
        question: "What will be the output of the following Python list comprehension?",
        code: "nums = [1, 2, 3, 4, 5]\nres = [x * 2 for x in nums if x % 2 != 0]\nprint(res)",
        options: [
          "[2, 4, 6, 8, 10]",
          "[2, 6, 10]",
          "[4, 8]",
          "[1, 3, 5]"
        ],
        correctIndex: 1,
        explanation: "The condition `if x % 2 != 0` filters out even numbers, retaining [1, 3, 5]. Then `x * 2` multiplies each odd number by 2, yielding `[2, 6, 10]`."
      },
      {
        question: "In Django's architectural pattern, what does MVT stand for?",
        options: [
          "Model-Vector-Transform",
          "Model-View-Template",
          "Method-Variable-Trigger",
          "Module-Validator-Thread"
        ],
        correctIndex: 1,
        explanation: "Django follows the Model-View-Template (MVT) pattern. Model handles data structure/DB, View contains business logic, and Template handles the UI presentation layer."
      },
      {
        question: "What is the key advantage of a Python generator function using `yield` compared to returning a regular list?",
        code: "def count_up():\n    n = 1\n    while True:\n        yield n\n        n += 1",
        options: [
          "Generators execute on the GPU for faster vector mathematics",
          "Generators produce items lazily on demand, requiring O(1) memory without holding all items in RAM",
          "Generators can only produce integer values",
          "Generators are automatically thread-safe across multiple processes"
        ],
        correctIndex: 1,
        explanation: "A generator produces items one at a time as requested (lazy evaluation), maintaining its state between iterations and consuming minimal memory regardless of dataset size."
      },
      {
        question: "In Django ORM, which method is used to prevent the 'N+1 queries' problem when following ForeignKey relationships?",
        options: [
          "select_related()",
          "all_records()",
          "eager_cache()",
          "join_all()"
        ],
        correctIndex: 0,
        explanation: "`select_related()` performs a SQL JOIN to include fields from related models in the original SELECT query, avoiding separate queries for each related object."
      },
      {
        question: "What is the Global Interpreter Lock (GIL) in CPython?",
        options: [
          "A security feature preventing unauthorized file system access",
          "A mutex that allows only one native thread to execute Python bytecode at a time",
          "A lock that ensures databases cannot have concurrent writes",
          "A compiler mechanism to prevent infinite recursion"
        ],
        correctIndex: 1,
        explanation: "The GIL is a mutex used by CPython to prevent multiple native OS threads from executing Python bytecodes concurrently, ensuring thread-safe memory management."
      }
    ]
  },

  "course-ai": {
    id: "course-ai",
    title: "AI & Machine Learning Deep Dive Quiz",
    courseId: "ai",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-robot",
    color: "#8B5CF6",
    gradient: "from-purple-600 to-pink-600",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Deep dive into Artificial Intelligence, Deep Neural Networks, Attention Mechanisms, and modern Large Language Models.",
    questions: [
      {
        question: "What core innovation enables the Transformer architecture to process text sequences in parallel rather than sequentially?",
        options: [
          "Recurrent Feedback Loops",
          "Self-Attention Mechanism",
          "Convolutional Pooling",
          "Stochastic Gradient Descent"
        ],
        correctIndex: 1,
        explanation: "The Self-Attention mechanism allows Transformers to compute representations of input tokens by attending to all other positions in the sequence simultaneously in parallel, replacing sequential recurrent steps."
      },
      {
        question: "Which activation function is most widely used in hidden layers of deep neural networks to avoid vanishing gradient problems?",
        code: "f(x) = max(0, x)",
        options: [
          "Sigmoid",
          "Hyperbolic Tangent (Tanh)",
          "Rectified Linear Unit (ReLU)",
          "Softmax"
        ],
        correctIndex: 2,
        explanation: "ReLU (f(x) = max(0, x)) outputs x for positive values and 0 for negative values. Its constant gradient of 1 for x > 0 mitigates the vanishing gradient problem during backpropagation."
      },
      {
        question: "In Generative AI, what is 'Hallucination' in Large Language Models (LLMs)?",
        options: [
          "When the model refuses to answer a prompt due to safety filters",
          "When the model generates plausible-sounding but factually incorrect or ungrounded statements",
          "When the model runs out of GPU memory during token generation",
          "When the model enters an infinite output loop repeating the same word"
        ],
        correctIndex: 1,
        explanation: "Hallucination refers to instances where an AI model generates responses that sound confident and authoritative, but are logically false, ungrounded in facts, or fabricated."
      },
      {
        question: "What does the 'Temperature' parameter control during LLM token sampling?",
        options: [
          "The physical operating heat limit of the GPU hardware",
          "The balance between randomness (creativity) and determinism in selecting the next token",
          "The maximum number of tokens allowed in the prompt context window",
          "The learning rate used during fine-tuning"
        ],
        correctIndex: 1,
        explanation: "Temperature scales the logits before the Softmax function. Lower temperature (e.g. 0.2) makes the output more deterministic and conservative, while higher temperature (e.g. 0.8) introduces greater diversity and randomness."
      },
      {
        question: "Which technique is used to prevent neural networks from overfitting by randomly setting a fraction of neuron outputs to zero during training?",
        options: [
          "Dropout",
          "Batch Normalization",
          "Gradient Clipping",
          "Early Stopping"
        ],
        correctIndex: 0,
        explanation: "Dropout randomly deactivates a specified percentage of neurons during each training step, preventing co-adaptation of features and acting as effective regularization."
      }
    ]
  },

  "course-datascience": {
    id: "course-datascience",
    title: "Data Science & Analytics Bootcamp Quiz",
    courseId: "datascience",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-chart-line",
    color: "#0284C7",
    gradient: "from-cyan-600 to-blue-700",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Assess your expertise in data manipulation with Pandas, NumPy, statistical distributions, and exploratory data analysis (EDA).",
    questions: [
      {
        question: "In Pandas, what is the crucial difference between `.loc[]` and `.iloc[]`?",
        options: [
          "`.loc[]` is for rows, while `.iloc[]` is for columns",
          "`.loc[]` is label-based indexing, whereas `.iloc[]` is integer position-based indexing",
          "`.iloc[]` works only on series, while `.loc[]` works only on DataFrames",
          "`.loc[]` modifies data in place, while `.iloc[]` returns a shallow copy"
        ],
        correctIndex: 1,
        explanation: "`.loc[]` accesses data by labels/names of rows and columns, while `.iloc[]` accesses data strictly by integer zero-based numerical positions."
      },
      {
        question: "What statistical measure represents the value below which 50% of the observations in a dataset fall?",
        options: [
          "Mean",
          "Mode",
          "Median",
          "Variance"
        ],
        correctIndex: 2,
        explanation: "The median is the 50th percentile of an ordered distribution. It splits the dataset into two halves and is robust to extreme outliers compared to the mean."
      },
      {
        question: "In NumPy, what is 'Broadcasting'?",
        options: [
          "Streaming array data over network sockets",
          "The mechanism that allows arithmetic operations between arrays of different shapes under compatible dimensions",
          "Converting multi-dimensional arrays into single-dimensional strings",
          "Applying a machine learning model to all columns concurrently"
        ],
        correctIndex: 1,
        explanation: "Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations without making unnecessary copies of data, by stretching compatible dimensions."
      },
      {
        question: "Which plot is ideal for visualizing the five-number summary (minimum, Q1, median, Q3, maximum) and detecting outliers in data?",
        options: [
          "Scatter Plot",
          "Box Plot (Box-and-Whisker)",
          "Pie Chart",
          "Histogram"
        ],
        correctIndex: 1,
        explanation: "A Box Plot visually presents the median, interquartile range (IQR = Q3 - Q1), whiskers, and explicitly flags data points outside 1.5 * IQR as individual outlier points."
      },
      {
        question: "In SQL Data Analysis, which clause filters groups formed by `GROUP BY` rather than individual rows?",
        options: [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "FILTER"
        ],
        correctIndex: 1,
        explanation: "`WHERE` filters individual rows before aggregation occurs, while `HAVING` filters aggregated group records after `GROUP BY` has grouped the dataset."
      }
    ]
  },

  "course-cybersecurity": {
    id: "course-cybersecurity",
    title: "Cyber Security Professional Certification Quiz",
    courseId: "cybersecurity",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-shield-halved",
    color: "#DC2626",
    gradient: "from-red-600 to-rose-700",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Test your defensive and offensive cybersecurity knowledge: OWASP Top 10, Cryptography, Network security, and IAM.",
    questions: [
      {
        question: "What is the most effective defense against SQL Injection vulnerabilities in backend applications?",
        options: [
          "Using complex regex to block the word 'SELECT'",
          "Using Parameterized Queries (Prepared Statements)",
          "Encrypting the database passwords with base64",
          "Restricting web traffic to HTTPS only"
        ],
        correctIndex: 1,
        explanation: "Prepared statements / parameterized queries ensure the database driver treats user input strictly as literal data rather than executable SQL syntax, completely neutralizing injection attempts."
      },
      {
        question: "In asymmetric cryptography (Public Key Cryptography), which key is used to decrypt a message that was encrypted using the recipient's Public Key?",
        options: [
          "The sender's Public Key",
          "The recipient's Private Key",
          "A pre-shared symmetric session key",
          "The certificate authority's root key"
        ],
        correctIndex: 1,
        explanation: "In asymmetric encryption (such as RSA), anything encrypted with a specific public key can ONLY be decrypted by its corresponding matching private key, which is kept secret by the recipient."
      },
      {
        question: "What does the 'Salt' in password hashing provide?",
        options: [
          "Compresses the password into fewer bytes",
          "A unique random string appended to the password before hashing to defend against Rainbow Table attacks",
          "Allows the system administrator to reverse and decrypt the user password in emergencies",
          "Speeds up the hashing computation for high-load servers"
        ],
        correctIndex: 1,
        explanation: "A salt ensures that two users with identical passwords will produce completely different hash outputs, making precomputed rainbow tables and bulk dictionary attacks ineffective."
      },
      {
        question: "Which type of web security attack tricks an authenticated user's browser into executing unwanted actions on a trusted site without their knowledge?",
        options: [
          "Cross-Site Request Forgery (CSRF)",
          "Cross-Site Scripting (XSS)",
          "Denial of Service (DoS)",
          "DNS Poisoning"
        ],
        correctIndex: 0,
        explanation: "CSRF exploits the browser's automatic inclusion of credentials (cookies/session IDs) to transmit forged malicious requests to a web application where the user is currently authenticated."
      },
      {
        question: "In the CIA Triad of Information Security, what do the three pillars stand for?",
        options: [
          "Control, Integrity, Authorization",
          "Confidentiality, Integrity, Availability",
          "Cryptography, Inspection, Authentication",
          "Compliance, Incident, Audit"
        ],
        correctIndex: 1,
        explanation: "The CIA Triad stands for Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized alteration), and Availability (ensuring timely, reliable access)."
      }
    ]
  },

  "course-uiux": {
    id: "course-uiux",
    title: "UI/UX Design Principles & Masterclass Quiz",
    courseId: "uiux",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-pen-nib",
    color: "#EC4899",
    gradient: "from-pink-600 to-rose-600",
    level: "Beginner",
    timeLimitMinutes: 10,
    description: "Evaluate your visual hierarchy, usability principles, user research methods, and design system concepts.",
    questions: [
      {
        question: "According to Fitts's Law in user interface design, which two factors determine the time required to rapidly move to a target area?",
        options: [
          "The target's color contrast and font weight",
          "The distance to the target and the target's physical size / width",
          "The number of competing clickable links on the page",
          "The user's screen refresh rate and monitor DPI"
        ],
        correctIndex: 1,
        explanation: "Fitts's Law states that target acquisition time is a function of the distance to the target and the width/size of the target. Larger, closer targets are faster and easier to click."
      },
      {
        question: "What is the primary objective of creating Low-Fidelity Wireframes during the early design stage?",
        options: [
          "Selecting the final hex color palette and micro-animations",
          "Establishing structural layouts, content hierarchy, and core information architecture quickly without visual distractions",
          "Writing production-ready HTML and Tailwind CSS code",
          "Conducting legal trademark checks for company logos"
        ],
        correctIndex: 1,
        explanation: "Low-fidelity wireframes focus on structural layout, workflow, and content hierarchy before time is invested in colors, typography details, and high-fidelity graphics."
      },
      {
        question: "What minimum color contrast ratio is required by WCAG 2.1 Level AA for standard normal body text against its background?",
        options: [
          "2.5:1",
          "3.0:1",
          "4.5:1",
          "7.0:1"
        ],
        correctIndex: 2,
        explanation: "WCAG 2.1 AA mandates a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold) to ensure readability for users with moderate vision impairments."
      },
      {
        question: "What does 'Affordance' refer to in digital product design?",
        options: [
          "The retail cost of licensing the design software",
          "Visual clues or properties of an object that communicate how it can be used or interacted with (e.g. a 3D-styled button looks clickable)",
          "The speed at which an interface loads across cellular data",
          "The maximum width a page can expand on ultrawide monitors"
        ],
        correctIndex: 1,
        explanation: "An affordance is a perceived property of an element that suggests its operation. For example, a raised card with drop shadows affords being pressed or clicked."
      },
      {
        question: "In Figma, which feature allows components to adjust their size, spacing, and inner padding automatically as content changes?",
        options: [
          "Smart Animate",
          "Auto Layout",
          "Boolean Operations",
          "Vector Network"
        ],
        correctIndex: 1,
        explanation: "Auto Layout is Figma's Flexbox-like layout engine that automatically adjusts button padding, card dimensions, and element spacing when child content expands or changes."
      }
    ]
  },

  "course-ml": {
    id: "course-ml",
    title: "Machine Learning A-Z: Python & R Quiz",
    courseId: "ml",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-brain",
    color: "#6366F1",
    gradient: "from-indigo-600 to-purple-700",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Assess your machine learning fundamentals: supervised vs unsupervised algorithms, classification metrics, and regularization.",
    questions: [
      {
        question: "Which of the following is an example of an Unsupervised Learning problem?",
        options: [
          "Predicting house prices based on square footage and location",
          "Segmenting customers into behavioral clusters based on purchasing history without predefined labels",
          "Classifying an email as Spam or Not Spam using 10,000 labeled training emails",
          "Detecting tumors in medical scans with physician diagnostic labels"
        ],
        correctIndex: 1,
        explanation: "Customer segmentation without predefined output labels is an unsupervised learning task (such as K-Means clustering), where the algorithm discovers inherent groupings in unlabeled data."
      },
      {
        question: "What does high variance and low bias typically signify in a trained machine learning model?",
        options: [
          "Underfitting: the model is too simple to capture patterns",
          "Overfitting: the model has memorized the training noise and fails to generalize to unseen test data",
          "The model has achieved the optimal balance and zero generalization error",
          "The dataset has too few features and requires polynomial expansion"
        ],
        correctIndex: 1,
        explanation: "High variance and low bias indicates overfitting: the model fits the training data too closely (capturing noise), resulting in strong training accuracy but poor performance on new test data."
      },
      {
        question: "What does the Confusion Matrix metric 'Recall' (Sensitivity) measure?",
        options: [
          "The proportion of predicted positives that were actually true positives (TP / (TP + FP))",
          "The proportion of actual real-world positive cases that the model correctly identified (TP / (TP + FN))",
          "The total number of correct predictions divided by all predictions",
          "The harmonic mean between False Positives and False Negatives"
        ],
        correctIndex: 1,
        explanation: "Recall = TP / (TP + FN). It measures the model's ability to find all relevant cases in the dataset (crucial in medical diagnostics where missing a diseased patient is high cost)."
      },
      {
        question: "What is the key mechanism of the Random Forest algorithm?",
        options: [
          "Training a single decision tree with deep pruning",
          "An ensemble of decision trees trained on random bootstrap samples of data and random feature subsets (Bagging)",
          "Iteratively training trees on the residual errors of previous trees (Boosting)",
          "Clustering data points by their Euclidean distance to nearest centroid"
        ],
        correctIndex: 1,
        explanation: "Random Forest is a bagging ensemble technique that builds multiple de-correlated decision trees on bootstrapped data samples and averages their predictions to reduce variance."
      },
      {
        question: "In L1 Regularization (Lasso Regression), what unique effect does it have on model feature weights?",
        options: [
          "It shrinks all weights toward zero but never sets them exactly to zero",
          "It drives less important feature weights exactly to zero, performing automatic feature selection",
          "It doubles the learning rate for deep neural networks",
          "It scales weights uniformly between -1 and +1"
        ],
        correctIndex: 1,
        explanation: "L1 regularization adds the absolute values of coefficients to the loss penalty. Because of its diamond constraint geometry, it drives non-informative feature weights completely to 0."
      }
    ]
  },

  "course-dsa": {
    id: "course-dsa",
    title: "Problem Solving Using DSA Quiz",
    courseId: "dsa",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-code-branch",
    color: "#10B981",
    gradient: "from-emerald-600 to-green-700",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Demonstrate your algorithmic problem solving: trees, graphs, sorting, dynamic programming, and complexity.",
    questions: [
      {
        question: "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST) containing N nodes?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctIndex: 2,
        explanation: "In the worst case, an unbalanced BST degenerates into a linear linked list (skewed tree), causing search time to degrade from O(log N) to O(N)."
      },
      {
        question: "Which algorithm is used to detect a cycle in a singly linked list in O(N) time and O(1) auxiliary space?",
        options: [
          "Dijkstra's Shortest Path Algorithm",
          "Floyd's Cycle-Finding Algorithm (Tortoise and Hare)",
          "Kruskal's Algorithm",
          "Knuth-Morris-Pratt (KMP) Algorithm"
        ],
        correctIndex: 1,
        explanation: "Floyd's algorithm uses two pointers moving at different speeds (slow by 1 node, fast by 2 nodes). If a cycle exists, the fast pointer will eventually lap and meet the slow pointer."
      },
      {
        question: "What is the average time complexity of QuickSort on an array of N elements?",
        options: [
          "O(N)",
          "O(N log N)",
          "O(N^2)",
          "O(2^N)"
        ],
        correctIndex: 1,
        explanation: "On average, QuickSort partitions the list into balanced halves at each recursive depth, yielding an average time complexity of O(N log N)."
      },
      {
        question: "Which data structure operates on a Last-In, First-Out (LIFO) basis and is used for balancing parentheses and tracking function call stacks?",
        options: [
          "Queue",
          "Stack",
          "Heap",
          "Trie"
        ],
        correctIndex: 1,
        explanation: "A Stack is a LIFO structure where elements are pushed and popped from the same end (top), making it the natural choice for recursion, backtrack undo operations, and syntax matching."
      },
      {
        question: "What is the key principle of Dynamic Programming?",
        options: [
          "Randomly shuffling elements to arrive at a probable solution",
          "Solving subproblems once, storing their solutions in a lookup table (memoization/tabulation), and reusing them",
          "Greedily taking the locally optimal choice at every single stage",
          "Dividing data into independent halves that share zero overlapping subproblems"
        ],
        correctIndex: 1,
        explanation: "Dynamic programming applies to problems with optimal substructure and overlapping subproblems by computing solutions to smaller subproblems once and storing them to avoid exponential recalculations."
      }
    ]
  },

  "course-quantum": {
    id: "course-quantum",
    title: "Quantum Computing for Beginners Quiz",
    courseId: "quantum",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-atom",
    color: "#6D28D9",
    gradient: "from-purple-800 to-indigo-900",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Explore the frontiers of quantum mechanics: Qubits, Superposition, Entanglement, Quantum gates, and algorithms.",
    questions: [
      {
        question: "Unlike a classical bit which must be strictly 0 or 1, what quantum phenomenon allows a qubit to exist in a linear combination of |0⟩ and |1⟩ states simultaneously?",
        options: [
          "Quantum Decoherence",
          "Superposition",
          "Quantum Tunneling",
          "Thermal Excitation"
        ],
        correctIndex: 1,
        explanation: "Superposition allows a qubit to exist in a state |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes such that |α|² + |β|² = 1."
      },
      {
        question: "Which single-qubit quantum gate creates an equal superposition state when applied to the ground state |0⟩?",
        options: [
          "Pauli-X Gate",
          "Hadamard Gate (H)",
          "Phase Gate (S)",
          "CNOT Gate"
        ],
        correctIndex: 1,
        explanation: "The Hadamard (H) gate transforms basis state |0⟩ into (|0⟩ + |1⟩)/√2 and |1⟩ into (|0⟩ - |1⟩)/√2, placing the qubit in an equal probability superposition."
      },
      {
        question: "What does Quantum Entanglement describe?",
        options: [
          "Physical wires getting tangled inside a dilution refrigerator",
          "A phenomenon where quantum states of two or more particles cannot be described independently of each other regardless of distance",
          "When a quantum processor overheats due to high microwave pulses",
          "The degradation of qubit coherence over time"
        ],
        correctIndex: 1,
        explanation: "Entanglement is a quantum correlation where measuring the state of one entangled particle instantly determines the state of its partner, even across astronomical distances."
      },
      {
        question: "What fundamental theorem of quantum mechanics states that it is impossible to create an identical copy of an arbitrary unknown quantum state?",
        options: [
          "Bell's Theorem",
          "No-Cloning Theorem",
          "Heisenberg Uncertainty Principle",
          "Schrödinger Equation"
        ],
        correctIndex: 1,
        explanation: "The No-Cloning Theorem proves that unitary quantum operations cannot duplicate an unknown quantum state, forming the foundation of quantum cryptography security."
      },
      {
        question: "Shor's Algorithm is celebrated because it can solve which mathematical problem in polynomial time on an ideal quantum computer?",
        options: [
          "Prime Factorization of large composite integers",
          "Sorting an array of random strings",
          "Finding the maximum flow in a directed graph",
          "Simulating classical fluid dynamics"
        ],
        correctIndex: 0,
        explanation: "Shor's Algorithm factors large integers in polynomial time (O((log N)³)), threatening classical public-key cryptography schemes like RSA that rely on the hardness of integer factorization."
      }
    ]
  },

  "course-webdev": {
    id: "course-webdev",
    title: "Complete Web Development Bootcamp Quiz",
    courseId: "webdev",
    category: "course",
    categoryLabel: "Course Quiz",
    badge: "Official Course Quiz",
    icon: "fas fa-globe",
    color: "#2563EB",
    gradient: "from-blue-600 to-indigo-800",
    level: "Beginner",
    timeLimitMinutes: 10,
    description: "Test your full-stack foundations: HTML5, CSS3, DOM manipulation, responsive design, APIs, and client-server communication.",
    questions: [
      {
        question: "What does the browser's viewport meta tag accomplish on mobile devices?",
        code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        options: [
          "Enables high-definition audio playback in modern browsers",
          "Sets the viewport width to match the device screen and establishes a 1:1 initial zoom scale",
          "Downloads responsive images before the HTML parser finishes",
          "Enforces dark mode styles across mobile operating systems"
        ],
        correctIndex: 1,
        explanation: "Without the viewport meta tag, mobile browsers render pages at a default desktop width (~980px) and scale them down. This tag instructs the browser to render at the device's native screen width."
      },
      {
        question: "What mechanism stops a website on domain-a.com from reading sensitive API data directly from domain-b.com without permission?",
        options: [
          "Cross-Origin Resource Sharing (CORS) / Same-Origin Policy",
          "DNSSEC Validation",
          "TCP Flow Control",
          "HTTP Keep-Alive"
        ],
        correctIndex: 0,
        explanation: "The browser's Same-Origin Policy (enforced via CORS headers) prevents scripts running on one origin from accessing resources on a different origin unless explicitly permitted by the server."
      },
      {
        question: "Where is data stored when using browser `localStorage`?",
        options: [
          "In the server's session memory, expiring when the user closes the tab",
          "Persistently in the client's browser with no expiration date until explicitly cleared",
          "In the DNS cache of the local internet service provider",
          "Inside the SSL/TLS certificate chain"
        ],
        correctIndex: 1,
        explanation: "`localStorage` provides persistent client-side key-value storage (typically ~5-10MB). Unlike `sessionStorage`, data remains stored even after browser tabs or the browser itself is closed."
      },
      {
        question: "Which CSS layout feature allows elements to adapt fluidly between flex directions, wrapping, and proportional space distribution along a main axis?",
        options: [
          "Flexbox",
          "Float & Clearfix",
          "Position Fixed",
          "Table Layout"
        ],
        correctIndex: 0,
        explanation: "Flexbox (Flexible Box Layout) is designed for 1-dimensional layouts, offering control over alignment, direction, wrapping, and proportional distribution of space among items."
      },
      {
        question: "Which JavaScript method is modern and built-in for making asynchronous network HTTP requests returning a Promise?",
        options: [
          "fetch()",
          "http.send()",
          "ajax.request()",
          "socket.emit()"
        ],
        correctIndex: 0,
        explanation: "The `fetch()` API is the modern native browser interface for making asynchronous network requests, returning a Promise that resolves to the Response object."
      }
    ]
  },

  // ----------------------------------------------------------
  // PROGRAMMING QUESTION TOPICS & CS FUNDAMENTALS (11 Topics)
  // ----------------------------------------------------------
  "prog-c": {
    id: "prog-c",
    title: "C Programming & Pointers Mastery",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-c",
    color: "#00599C",
    gradient: "from-sky-700 to-blue-900",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Deep test on C pointer arithmetic, memory allocation (malloc/free), stack vs heap, structs, and memory layout.",
    questions: [
      {
        question: "What will be printed by the following C program?",
        code: "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *ptr = arr;\n    ptr++;\n    printf(\"%d\", *ptr);\n    return 0;\n}",
        options: [
          "10",
          "20",
          "Memory address of arr",
          "Compilation error"
        ],
        correctIndex: 1,
        explanation: "`arr` decays to a pointer to its first element (arr[0] = 10). When `ptr++` is executed, pointer arithmetic advances the pointer by `sizeof(int)` bytes to point at `arr[1]`, so `*ptr` outputs `20`."
      },
      {
        question: "What dangerous problem occurs if you allocate memory with `malloc()` in C but never call `free()` before the pointer goes out of scope?",
        options: [
          "Buffer Overflow",
          "Memory Leak",
          "Segmentation Fault immediately on next line",
          "Stack Underflow"
        ],
        correctIndex: 1,
        explanation: "A memory leak happens when dynamically allocated heap memory is no longer referenced by any pointer and is never returned to the operating system via `free()`."
      },
      {
        question: "In C, what does the `sizeof` operator return?",
        options: [
          "The number of elements in any pointer",
          "The size in bytes of the object or data type representation in memory",
          "The memory address of the variable",
          "The execution time of the statement in clock ticks"
        ],
        correctIndex: 1,
        explanation: "`sizeof` is a compile-time operator that yields the size of its operand in bytes (specifically as a value of type `size_t`)."
      },
      {
        question: "What is a 'Dangling Pointer' in C?",
        options: [
          "A pointer that has been explicitly initialized to NULL",
          "A pointer that still points to a memory location that has already been deallocated or freed",
          "A pointer pointing to a function instead of a variable",
          "A pointer declared without an asterisk"
        ],
        correctIndex: 1,
        explanation: "A dangling pointer arises when memory pointed to is freed or goes out of scope, but the pointer variable still retains that address. Dereferencing it causes undefined behavior."
      },
      {
        question: "What is the key difference between a `struct` and a `union` in C?",
        options: [
          "`struct` cannot hold pointers, while `union` can",
          "In a `struct`, every member has its own separate memory location; in a `union`, all members share the same overlapping memory space",
          "`union` is only available in C++, not ANSI C",
          "`struct` members are always public, while `union` members are private"
        ],
        correctIndex: 1,
        explanation: "In a `struct`, the total size is at least the sum of sizes of its members. In a `union`, the size equals the size of its largest member, because all members share the exact same memory offset."
      }
    ]
  },

  "prog-cpp": {
    id: "prog-cpp",
    title: "C++ & Object-Oriented Programming (OOP)",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-code",
    color: "#004482",
    gradient: "from-blue-700 to-indigo-900",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Challenge yourself on C++ classes, Virtual functions, Polymorphism, Diamond Problem, RAII, and STL containers.",
    questions: [
      {
        question: "Why should a base class destructor in C++ almost always be declared as `virtual`?",
        code: "class Base {\npublic:\n    virtual ~Base() {}\n};",
        options: [
          "To allow the class to be instantiated without constructor parameters",
          "To ensure that when a derived object is deleted via a base class pointer, the derived class destructor is properly invoked",
          "To prevent the class from being inherited by subclasses",
          "To allocate base class instances on the stack instead of heap"
        ],
        correctIndex: 1,
        explanation: "If the base destructor is not virtual, deleting a derived object through a `Base*` pointer leads to undefined behavior because only the base destructor runs, leaking derived resources."
      },
      {
        question: "In C++ OOP, how is the 'Diamond Problem' of multiple inheritance resolved?",
        options: [
          "By using `private` inheritance only",
          "By using `virtual` base classes (`class Derived : virtual public Base`)",
          "By declaring all member variables `mutable`",
          "Multiple inheritance is strictly illegal in modern C++"
        ],
        correctIndex: 1,
        explanation: "Virtual inheritance (`virtual public Base`) ensures that only one shared instance of the common ancestor base subobject exists in the most-derived class."
      },
      {
        question: "What C++ design idiom ties resource acquisition and release directly to object lifetime (constructor and destructor)?",
        options: [
          "RAII (Resource Acquisition Is Initialization)",
          "MVC (Model View Controller)",
          "CRTP (Curiously Recurring Template Pattern)",
          "Pimpl (Pointer to Implementation)"
        ],
        correctIndex: 0,
        explanation: "RAII guarantees that resources (memory, file handles, mutex locks) are acquired in constructors and deterministically released in destructors when objects go out of scope."
      },
      {
        question: "In the C++ Standard Template Library (STL), what is the amortized time complexity of `std::vector::push_back`?",
        options: [
          "O(1)",
          "O(N)",
          "O(log N)",
          "O(N^2)"
        ],
        correctIndex: 0,
        explanation: "When capacity is sufficient, inserting at the end takes O(1). When capacity must double (taking O(N) copy operations), the cost spread across all prior inserts yields amortized O(1) time."
      },
      {
        question: "What does the `const` keyword at the end of a C++ member function declaration guarantee?",
        code: "int getValue() const;",
        options: [
          "The return value cannot be modified by the caller",
          "The function will not modify any non-mutable member variables of the calling object",
          "The function runs at compile time only",
          "The function cannot be overridden in derived classes"
        ],
        correctIndex: 1,
        explanation: "A `const` member function guarantees that `this` pointer is treated as a pointer to const object (`const Class* const`), forbidding modifications to non-mutable member fields."
      }
    ]
  },

  "prog-js": {
    id: "prog-js",
    title: "JavaScript Core, Closures & Async ES6+",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fab fa-js",
    color: "#F7DF1E",
    gradient: "from-yellow-500 to-amber-600",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Deep dive into JS closures, lexical scope, Event Loop microtasks vs macrotasks, prototypical inheritance, and Promises.",
    questions: [
      {
        question: "What will be printed to the console?",
        code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 4, 2, 3",
          "1, 3, 4, 2"
        ],
        correctIndex: 1,
        explanation: "Synchronous code runs first ('1', '4'). Next, the microtask queue (Promise.then) is completely drained ('3'). Finally, the macrotask / timer queue executes ('2'). Result: 1, 4, 3, 2."
      },
      {
        question: "What is a Closure in JavaScript?",
        options: [
          "A method that closes a WebSocket connection automatically",
          "A function bundled together with references to its surrounding lexical environment",
          "A syntax error thrown when a closing curly brace is missing",
          "A variable declared with `var` inside a block"
        ],
        correctIndex: 1,
        explanation: "A closure gives an inner function access to its outer function's scope variables even after the outer parent function has finished executing and returned."
      },
      {
        question: "What is the difference between `==` and `===` in JavaScript?",
        options: [
          "`==` checks value after performing type coercion, while `===` checks both value and type without type coercion",
          "`===` is only for comparing numbers, while `==` is for strings",
          "`==` is strictly faster than `===`",
          "There is no difference in modern ES6+"
        ],
        correctIndex: 0,
        explanation: "`==` is loose equality (coerces types if different, e.g. `'5' == 5` is true), whereas `===` is strict equality (no type coercion, `'5' === 5` is false)."
      },
      {
        question: "What is the value of `typeof null` in JavaScript?",
        options: [
          "'null'",
          "'undefined'",
          "'object'",
          "'boolean'"
        ],
        correctIndex: 2,
        explanation: "`typeof null` returns `'object'`. This is a historic bug in the original 1995 JavaScript implementation where values were represented with a type tag (000 meant object, and null was represented as all zeros)."
      },
      {
        question: "Which Promise method returns a single Promise that fulfills when all of the input's promises fulfill, but rejects immediately if ANY promise rejects?",
        options: [
          "Promise.allSettled()",
          "Promise.race()",
          "Promise.all()",
          "Promise.any()"
        ],
        correctIndex: 2,
        explanation: "`Promise.all()` awaits all promises to resolve. If even a single promise rejects, the returned promise immediately rejects with that first rejection reason (fail-fast behavior)."
      }
    ]
  },

  "prog-python": {
    id: "prog-python",
    title: "Python Core Fundamentals & Data Structures",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fab fa-python",
    color: "#306998",
    gradient: "from-blue-600 to-yellow-600",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Master Python data structures: mutability, decorators, generators, *args/**kwargs, magic methods, and memory model.",
    questions: [
      {
        question: "Which of the following data types in Python is MUTABLE?",
        options: [
          "tuple",
          "str",
          "frozenset",
          "list"
        ],
        correctIndex: 3,
        explanation: "Lists (and dictionaries and sets) are mutable—their contents can be modified in-place without creating a new object in memory. Tuples, strings, numbers, and frozensets are immutable."
      },
      {
        question: "What problem arises when using a mutable object as a default argument in a Python function?",
        code: "def add_item(val, target_list=[]):\n    target_list.append(val)\n    return target_list",
        options: [
          "Python raises a SyntaxError at compile time",
          "The default list is created once at function definition time, so mutations persist across all subsequent calls",
          "The function creates a new list every single time",
          "The function can only accept strings as input"
        ],
        correctIndex: 1,
        explanation: "Default parameter values are evaluated once when the function is defined. If modified, the same mutated list object will be shared across all subsequent invocations."
      },
      {
        question: "What do `*args` and `**kwargs` in a Python function signature allow?",
        code: "def process_data(*args, **kwargs): pass",
        options: [
          "`*args` accepts any number of positional arguments as a tuple; `**kwargs` accepts any number of keyword arguments as a dictionary",
          "`*args` is for integer math; `**kwargs` is for string concatenation",
          "They define mandatory parameters that cannot be omitted",
          "They declare global environment variables"
        ],
        correctIndex: 0,
        explanation: "`*args` unpacks arbitrary variable-length positional arguments into a tuple, while `**kwargs` unpacks keyword arguments into a standard dictionary."
      },
      {
        question: "What does the `is` operator compare in Python, unlike `==`?",
        options: [
          "`is` compares memory identity (whether both variables point to the exact same object in RAM); `==` compares value equality",
          "`is` compares string lengths",
          "`is` is used for mathematical division",
          "`is` compares variable names alphabetically"
        ],
        correctIndex: 0,
        explanation: "`a is b` evaluates to True only if `id(a) == id(b)` (identical memory address). `a == b` checks if their values/contents evaluate to equal."
      },
      {
        question: "What is a Python Decorator?",
        options: [
          "A tool in the standard library to format terminal text colors",
          "A callable function that takes another function as an argument, extends its behavior without modifying it, and returns a function",
          "A CSS stylesheet applied to Python GUI applications",
          "A special syntax for defining classes with private members"
        ],
        correctIndex: 1,
        explanation: "A decorator is syntactic sugar (`@decorator`) for passing a function into a higher-order wrapper function to add functionality (like logging, timing, authentication) dynamically."
      }
    ]
  },

  "prog-java": {
    id: "prog-java",
    title: "Java Core, OOP & Concurrency Mastery",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fab fa-java",
    color: "#E11D48",
    gradient: "from-red-600 to-orange-600",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Deep technical questions on JVM memory, Garbage Collection, multithreading synchronization, collections, and Java 8-21 features.",
    questions: [
      {
        question: "In Java, what does the `volatile` keyword ensure when applied to a variable accessed by multiple threads?",
        code: "private volatile boolean isRunning = true;",
        options: [
          "It locks the variable so only one thread can ever read it",
          "It guarantees visibility of changes across threads by reading and writing directly to main memory rather than thread CPU caches",
          "It makes compound operations like `count++` completely atomic",
          "It serializes the variable to disk automatically"
        ],
        correctIndex: 1,
        explanation: "`volatile` ensures memory visibility: updates to the variable are immediately flushed to main memory and subsequent reads fetch the fresh value. It does NOT guarantee compound atomicity (like i++)."
      },
      {
        question: "Why are `String` objects immutable in Java?",
        options: [
          "For security (e.g. network/database credentials), thread safety, and enabling String Pool memory optimization",
          "Because Java does not have character arrays",
          "To force developers to use StringBuilder for everything",
          "Immutability was an accidental defect in Java 1.0 that could not be changed"
        ],
        correctIndex: 0,
        explanation: "String immutability permits string caching in the String Constant Pool, guarantees safe sharing across multiple concurrent threads, and ensures secure usage in class loading and DB connections."
      },
      {
        question: "How does Java's `HashMap` handle bucket hash collisions internally (Java 8+)?",
        options: [
          "It throws an exception and expands the table size immediately",
          "It uses a singly linked list, which transforms into a balanced Red-Black Tree when elements in a single bucket exceed 8",
          "It overwrites the previous key-value pair unconditionally",
          "It uses quadratic probing to locate an empty index"
        ],
        correctIndex: 1,
        explanation: "In Java 8+, HashMap stores colliding elements in a linked list. If a bucket's entries reach `TREEIFY_THRESHOLD = 8`, the list converts into a Red-Black Tree, improving lookup from O(N) to O(log N)."
      },
      {
        question: "What is the difference between `Comparable` and `Comparator` interfaces in Java?",
        options: [
          "`Comparable` defines the natural ordering of a class (`compareTo`), while `Comparator` defines custom external sorting strategies (`compare`)",
          "`Comparable` sorts numbers, while `Comparator` sorts strings",
          "`Comparator` can only sort in descending order",
          "They are identical and used interchangeably"
        ],
        correctIndex: 0,
        explanation: "`Comparable<T>` is implemented by the domain class itself to define its single natural sort order. `Comparator<T>` is an external functional interface enabling multiple custom sorting criteria."
      },
      {
        question: "What is the Garbage Collector's 'Stop-The-World' (STW) phase?",
        options: [
          "A crash where the Java Virtual Machine terminates abruptly",
          "A pause period where all application threads are suspended so the GC can inspect live objects and reclaim memory safely",
          "When the operating system runs out of swap space",
          "A network timeout error in microservice calls"
        ],
        correctIndex: 1,
        explanation: "During a Stop-The-World pause, the JVM halts all running application execution threads to ensure object references do not mutate while the GC scans object graphs or compacts heap memory."
      }
    ]
  },

  "prog-sql": {
    id: "prog-sql",
    title: "SQL & Relational Database Systems (DBMS)",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-database",
    color: "#0891B2",
    gradient: "from-cyan-600 to-teal-800",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Assess your database query skills: ACID properties, joins, indexes, normalization, aggregate functions, and transactions.",
    questions: [
      {
        question: "What do the letters in the database 'ACID' acronym stand for?",
        options: [
          "Access, Control, Integrity, Durability",
          "Atomicity, Consistency, Isolation, Durability",
          "Authentication, Concurrency, Indexing, Data",
          "Array, Column, Index, Diagram"
        ],
        correctIndex: 1,
        explanation: "ACID guarantees database transaction reliability: Atomicity (all-or-nothing), Consistency (preserves invariants), Isolation (concurrent transactions don't interfere), and Durability (committed changes persist)."
      },
      {
        question: "What is the result of a `LEFT JOIN` between Table A and Table B?",
        options: [
          "Only rows that match in both tables",
          "All rows from Table A, plus matching rows from Table B (with NULLs for non-matching B rows)",
          "All rows from Table B, plus matching rows from Table A",
          "The Cartesian cross product of both tables"
        ],
        correctIndex: 1,
        explanation: "A `LEFT JOIN` returns every row from the left table (Table A). For rows where there is no matching record in the right table (Table B), NULL values are populated for B's columns."
      },
      {
        question: "How does a B-Tree index accelerate SQL query performance?",
        options: [
          "By encrypting the disk drive for faster hardware bus speeds",
          "By keeping data sorted and enabling logarithmic O(log N) lookup, range scans, and binary-like navigation instead of full table scans O(N)",
          "By caching all table rows entirely in RAM permanently",
          "By deleting duplicate rows automatically"
        ],
        correctIndex: 1,
        explanation: "B-Tree indexes maintain a balanced, multi-way search tree on disk. Lookups, range queries, and min/max operations can jump directly to relevant data blocks in O(log N) disk reads."
      },
      {
        question: "What is the primary rule of Third Normal Form (3NF) in database normalization?",
        options: [
          "Every column must store multiple comma-separated values",
          "The table must be in 2NF and have NO transitive functional dependencies (no non-prime attribute depends on another non-prime attribute)",
          "Every table must have at least three foreign keys",
          "All data must be stored in uppercase characters"
        ],
        correctIndex: 1,
        explanation: "A table is in 3NF if it is in 2NF and every non-key column depends solely on the primary key, directly and non-transitively ('the key, the whole key, and nothing but the key')."
      },
      {
        question: "Which SQL aggregate function counts only non-null values in a specified column?",
        options: [
          "COUNT(column_name)",
          "COUNT(*)",
          "SUM(column_name)",
          "TOTAL(column_name)"
        ],
        correctIndex: 0,
        explanation: "`COUNT(column_name)` returns the number of rows where `column_name` is NOT NULL. In contrast, `COUNT(*)` counts all rows returned by the query regardless of whether columns contain NULL."
      }
    ]
  },

  "prog-dsa": {
    id: "prog-dsa",
    title: "Data Structures Fundamentals & Applications",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-cubes",
    color: "#7C3AED",
    gradient: "from-violet-600 to-purple-800",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Core questions on Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees, and Heaps.",
    questions: [
      {
        question: "What is the average time complexity to search, insert, and delete a key in an ideal Hash Table with a uniform hash function?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctIndex: 0,
        explanation: "With a uniform hash distribution and reasonable load factor, hash table lookups, insertions, and deletions run in average O(1) constant time."
      },
      {
        question: "Which data structure is ideal for implementing a Breadth-First Search (BFS) graph traversal?",
        options: [
          "Stack",
          "Queue (FIFO)",
          "Priority Heap",
          "Binary Search Tree"
        ],
        correctIndex: 1,
        explanation: "BFS explores nodes level by level in the order they are discovered, which requires a First-In, First-Out (Queue) data structure."
      },
      {
        question: "In a Min-Heap binary tree containing N elements, where is the smallest element always located?",
        options: [
          "At the leftmost leaf node",
          "At the root node",
          "At the rightmost leaf node",
          "At index N-1"
        ],
        correctIndex: 1,
        explanation: "The defining invariant of a Min-Heap is that every parent node is less than or equal to its child nodes. Therefore, the minimum value is always at the root (index 0), retrievable in O(1) time."
      },
      {
        question: "What is the main advantage of a Doubly Linked List over a Singly Linked List?",
        options: [
          "It uses half the memory of a singly linked list",
          "It allows bidirectional traversal (both forward and backward) and O(1) deletion given a node pointer",
          "It provides random access O(1) by index like an array",
          "It sorts its elements automatically upon insertion"
        ],
        correctIndex: 1,
        explanation: "Each node in a doubly linked list stores both `next` and `prev` pointers, enabling bidirectional movement and constant-time node removal without having to traverse from the head to find the predecessor."
      },
      {
        question: "What property must hold true for all nodes in a valid Binary Search Tree (BST)?",
        options: [
          "All nodes must have exactly two child nodes",
          "For any node, all keys in its left subtree must be less than its key, and all keys in its right subtree must be greater",
          "The tree must be completely filled at all levels",
          "Parent keys must equal the sum of their child keys"
        ],
        correctIndex: 1,
        explanation: "The BST invariant requires that for any node X, all values in X's left subtree are strictly less than X, and all values in X's right subtree are strictly greater than X."
      }
    ]
  },

  "prog-algo": {
    id: "prog-algo",
    title: "Algorithms & Big-O Time Complexity",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-calculator",
    color: "#D97706",
    gradient: "from-amber-600 to-orange-700",
    level: "Advanced",
    timeLimitMinutes: 10,
    description: "Analyze algorithmic efficiency: Big-O, Big-Omega, Sorting algorithms, Divide & Conquer, and Dynamic Programming.",
    questions: [
      {
        question: "Which of the following ranks time complexities in order from fastest growth (slowest running) to slowest growth (fastest running)?",
        options: [
          "O(1) > O(log N) > O(N) > O(N^2)",
          "O(N!) > O(2^N) > O(N^2) > O(N log N) > O(N) > O(log N) > O(1)",
          "O(N) > O(N log N) > O(1) > O(2^N)",
          "O(log N) > O(1) > O(N!) > O(N)"
        ],
        correctIndex: 1,
        explanation: "The order of growth from worst (slowest execution) to best (fastest) is: O(N!) > O(2^N) > O(N^2) > O(N log N) > O(N) > O(log N) > O(1)."
      },
      {
        question: "What does it mean for a sorting algorithm to be 'Stable'?",
        options: [
          "The algorithm never crashes or encounters stack overflow errors",
          "It maintains the relative order of records with equal keys in the sorted output",
          "It always runs in O(N log N) time in the worst case",
          "It uses O(1) auxiliary extra memory space"
        ],
        correctIndex: 1,
        explanation: "A sorting algorithm is stable if two items with equal keys appear in the same relative order in the sorted array as they appeared in the unsorted input (e.g. MergeSort is stable; QuickSort is not)."
      },
      {
        question: "Which algorithm finds the shortest path between a starting node and all other nodes in a graph with non-negative edge weights?",
        options: [
          "Dijkstra's Algorithm",
          "Kruskal's Algorithm",
          "Kadane's Algorithm",
          "Floyd-Warshall (all pairs)"
        ],
        correctIndex: 0,
        explanation: "Dijkstra's algorithm uses a priority queue to compute single-source shortest paths in graphs with non-negative weights in O((V + E) log V) time."
      },
      {
        question: "What is the time complexity of the Binary Search algorithm on a sorted array of N elements?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctIndex: 1,
        explanation: "At each step, Binary Search halves the remaining search interval (N, N/2, N/4, ...), finding the target element in at most log2(N) comparisons."
      },
      {
        question: "What is Kadane's Algorithm used for?",
        options: [
          "Finding the maximum sum contiguous subarray in an array in O(N) time",
          "Sorting an array of floating point numbers",
          "Finding the lowest common ancestor in a tree",
          "Converting an infix expression to postfix notation"
        ],
        correctIndex: 0,
        explanation: "Kadane's algorithm solves the Maximum Subarray Sum problem in linear O(N) time and O(1) space by tracking the maximum ending at the current index versus starting a new subarray."
      }
    ]
  },

  "prog-networks": {
    id: "prog-networks",
    title: "Computer Networks & Protocols (TCP/IP)",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-network-wired",
    color: "#2563EB",
    gradient: "from-blue-600 to-cyan-700",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Deep dive into OSI 7 layers, TCP/IP stack, 3-way handshake, DNS, HTTP/HTTPS, SSL/TLS, and sockets.",
    questions: [
      {
        question: "What sequence of packets completes the standard TCP 3-Way Handshake before data transmission begins?",
        options: [
          "ACK -> SYN -> SYN-ACK",
          "SYN -> SYN-ACK -> ACK",
          "PING -> PONG -> OK",
          "FIN -> ACK -> FIN-ACK"
        ],
        correctIndex: 1,
        explanation: "The client sends a SYN (synchronize) packet; the server replies with SYN-ACK (synchronize-acknowledge); the client completes the handshake with an ACK (acknowledge) packet."
      },
      {
        question: "Which layer of the OSI 7-Layer Model is responsible for end-to-end reliability, flow control, and segmentation (e.g. TCP, UDP)?",
        options: [
          "Network Layer (Layer 3)",
          "Transport Layer (Layer 4)",
          "Data Link Layer (Layer 2)",
          "Session Layer (Layer 5)"
        ],
        correctIndex: 1,
        explanation: "Layer 4 (Transport Layer) handles host-to-host communication services, packet segmentation, port numbers, flow control, and error recovery (TCP)."
      },
      {
        question: "What is the primary operational difference between TCP and UDP?",
        options: [
          "TCP is connection-oriented with guaranteed ordered delivery; UDP is connectionless, lightweight, and does not guarantee delivery order",
          "UDP is encrypted by default, while TCP is unencrypted",
          "TCP can only transmit text files, while UDP is for video files",
          "UDP runs on Layer 7, while TCP runs on Layer 2"
        ],
        correctIndex: 0,
        explanation: "TCP provides reliable, ordered, error-checked delivery of byte streams via acknowledgments and retransmissions. UDP transmits packets without handshakes or retransmissions, favoring minimal latency."
      },
      {
        question: "What is the function of the Domain Name System (DNS)?",
        options: [
          "To translate human-readable domain names (e.g. agsacademy.com) into numerical IP addresses (e.g. 192.0.2.1)",
          "To encrypt web page cookies during checkout",
          "To distribute CPU loads across database clusters",
          "To prevent unauthorized port scans using iptables"
        ],
        correctIndex: 0,
        explanation: "DNS serves as the internet's directory, resolving human-friendly hostnames into machine-routable IP addresses."
      },
      {
        question: "In HTTP status codes, what does a `403 Forbidden` response indicate?",
        options: [
          "The resource does not exist on the server",
          "The server understood the request, but refuses to authorize it (the user lacks permission to access the resource)",
          "The user is unauthenticated and must provide login credentials first (401)",
          "The upstream gateway server timed out"
        ],
        correctIndex: 1,
        explanation: "403 Forbidden means authentication was successful or known, but the client does not have authorization / permission to access the requested resource. 401 Unauthorized means authentication credentials are missing or invalid."
      }
    ]
  },

  "prog-os": {
    id: "prog-os",
    title: "Operating Systems, Linux & Shell Essentials",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fas fa-terminal",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-800",
    level: "Intermediate",
    timeLimitMinutes: 10,
    description: "Assess OS internals: Processes vs Threads, Deadlock conditions, Virtual Memory Paging, Mutex vs Semaphore, and Linux shell.",
    questions: [
      {
        question: "What is the primary difference between a Process and a Thread?",
        options: [
          "A process has its own isolated memory address space; threads within the same process share that memory space and resources",
          "Threads can run across different physical machines, while processes cannot",
          "A thread cannot execute CPU instructions",
          "Processes are scheduled by the browser, while threads are scheduled by the kernel"
        ],
        correctIndex: 0,
        explanation: "A process is an executing program instance with its own virtual address space, file descriptors, and security context. Multiple threads exist within one process and share its heap and code segment, having private stacks."
      },
      {
        question: "Which of the following is NOT one of Coffman's four necessary conditions for a Deadlock to occur?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "Preemption Allowed (resources can be forcefully revoked)",
          "Circular Wait"
        ],
        correctIndex: 2,
        explanation: "The four conditions for deadlock are: Mutual Exclusion, Hold and Wait, NO Preemption (resources cannot be forcibly confiscated), and Circular Wait. If preemption is allowed, deadlocks can be broken."
      },
      {
        question: "What is 'Thrashing' in Virtual Memory systems?",
        options: [
          "A computer virus wiping the master boot record",
          "A state where the CPU spends more time swapping pages between RAM and disk than executing actual instructions",
          "A rapid GPU fan acceleration during 3D gaming",
          "When two processes write to the same file simultaneously"
        ],
        correctIndex: 1,
        explanation: "Thrashing occurs when active working sets exceed physical memory, causing continuous page faults and disk I/O swapping that brings CPU throughput close to zero."
      },
      {
        question: "In Linux file permissions, what does the octal permission `chmod 755 filename` mean?",
        options: [
          "Owner: Read/Write/Execute (7); Group: Read/Execute (5); Others: Read/Execute (5)",
          "Everyone has full Read/Write/Execute permissions",
          "Owner: Read only; Group: Write only; Others: Execute only",
          "The file is encrypted with a 755-bit key"
        ],
        correctIndex: 0,
        explanation: "Read = 4, Write = 2, Execute = 1. 7 = 4+2+1 (rwx for owner); 5 = 4+1 (r-x for group); 5 = 4+1 (r-x for others)."
      },
      {
        question: "What is the fundamental difference between a Mutex and a Counting Semaphore?",
        options: [
          "A Mutex is a locking mechanism intended to be unlocked only by the thread that locked it (ownership); a Semaphore is a signaling mechanism with a counter allowing N concurrent accesses",
          "Semaphores only work on Linux, while Mutexes only work on Windows",
          "A Mutex allows up to 10 threads, while a Semaphore allows 1",
          "There is no difference"
        ],
        correctIndex: 0,
        explanation: "A Mutex (mutual exclusion) has strict ownership: only the thread that acquired the lock can release it. A Semaphore maintains a counter of available permits and can be signaled (posted) by any thread."
      }
    ]
  },

  "prog-git": {
    id: "prog-git",
    title: "Git & Version Control Systems (VCS)",
    category: "programming",
    categoryLabel: "Programming Topic",
    badge: "Core Topic",
    icon: "fab fa-git-alt",
    color: "#F05032",
    gradient: "from-orange-600 to-red-700",
    level: "Beginner",
    timeLimitMinutes: 10,
    description: "Test essential developer collaboration: git commits, branching, merging vs rebasing, stash, cherry-pick, and conflict resolution.",
    questions: [
      {
        question: "What is the primary difference between `git merge feature` and `git rebase main`?",
        options: [
          "`git merge` creates a new merge commit combining two histories; `git rebase` rewrites history by moving the base of the feature branch onto the tip of main for a linear commit graph",
          "`git rebase` deletes all commit messages",
          "`git merge` is only for remote branches; `git rebase` is for local files",
          "`git rebase` permanently pushes code to GitHub without confirmation"
        ],
        correctIndex: 0,
        explanation: "`merge` preserves complete chronological history and creates a distinct merge commit with two parents. `rebase` replays your commits one by one on top of the target branch, keeping history clean and linear."
      },
      {
        question: "Which Git command is used to temporarily shelf or save uncommitted changes (both staged and unstaged) so you can switch branches cleanly?",
        options: [
          "git stash",
          "git pause",
          "git branch --save",
          "git freeze"
        ],
        correctIndex: 0,
        explanation: "`git stash` temporarily shelves changes in your working directory and staging area, giving you a clean working copy so you can switch branches or pull updates."
      },
      {
        question: "What does `git cherry-pick <commit-hash>` do?",
        options: [
          "Deletes a specific bad commit from the remote repository",
          "Applies the changes introduced by an existing commit from another branch onto your current working branch",
          "Picks the best reviewer for a GitHub pull request",
          "Compares two branches and outputs differences in HTML"
        ],
        correctIndex: 1,
        explanation: "`git cherry-pick` selects a single commit from anywhere in the repository and applies its exact diff as a new commit onto your current active branch."
      },
      {
        question: "What does a 'Detached HEAD' state mean in Git?",
        options: [
          "The .git directory has been corrupted and files are missing",
          "HEAD points directly to a specific commit hash rather than a named branch reference",
          "The remote repository has deleted your account",
          "Git is operating without an internet connection"
        ],
        correctIndex: 1,
        explanation: "When you check out a specific commit hash or tag directly (`git checkout <hash>`), HEAD points to that commit instead of a branch pointer. New commits won't belong to any branch unless a new branch is created."
      },
      {
        question: "How do you undo the most recent commit in your local branch while preserving all modified files in your working directory?",
        options: [
          "git reset --soft HEAD~1",
          "git reset --hard HEAD~1",
          "git rm -rf .",
          "git push --force"
        ],
        correctIndex: 0,
        explanation: "`git reset --soft HEAD~1` moves the branch pointer back by one commit, keeping all the changes from that commit staged and untouched in your working directory. (`--hard` would permanently discard the changes)."
      }
    ]
  }
};
