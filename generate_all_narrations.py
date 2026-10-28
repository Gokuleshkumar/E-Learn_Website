import asyncio
import edge_tts
import os

courses_info = {
    "default": {
        "title": "Professional Tech Masterclass",
        "category": "software engineering",
        "tech": "modern full-stack architecture, clean code standards, and agile developer workflows"
    },
    "frontend": {
        "title": "Front End Development Masterclass",
        "category": "front-end and web engineering",
        "tech": "React 19, Next.js 15, Tailwind CSS, TypeScript, modern state management, and high-performance UI rendering"
    },
    "backend": {
        "title": "Complete Node.js and Express Backend Course",
        "category": "backend architecture and cloud APIs",
        "tech": "Node.js, Express, MongoDB with Mongoose, JWT authentication, Redis caching, and Docker containerization"
    },
    "java": {
        "title": "Java with Spring Boot Zero to Hero",
        "category": "enterprise software engineering",
        "tech": "Java 21 virtual threads, Spring Boot 3 microservices, Spring Security, Hibernate ORM, and PostgreSQL databases"
    },
    "python": {
        "title": "Python with Django Full Stack Developer Track",
        "category": "Python development and full-stack engineering",
        "tech": "Python 3.12, Django MVC architecture, Django REST Framework, Celery background tasks, and automated testing"
    },
    "ai": {
        "title": "AI and Machine Learning Deep Dive",
        "category": "Artificial Intelligence and Machine Learning",
        "tech": "Google Gemini 2.5 Flash, Multimodal API integrations, LLM Agents, PyTorch neural networks, and LangChain"
    },
    "datascience": {
        "title": "Data Science and Analytics Bootcamp",
        "category": "data science and business intelligence",
        "tech": "Pandas, NumPy, Seaborn data visualization, advanced SQL querying, hypothesis testing, and Scikit-Learn predictive modeling"
    },
    "cybersecurity": {
        "title": "Cyber Security Professional Certification",
        "category": "cyber defense and network security",
        "tech": "ethical hacking tools, vulnerability scanning, Metasploit, Wireshark packet inspection, and enterprise firewall defense"
    },
    "uiux": {
        "title": "UI UX Design Principles and Masterclass",
        "category": "digital product design and user experience",
        "tech": "Figma auto-layout, design system design tokens, user journey mapping, wireframing, and interactive micro-animations"
    },
    "training-placement": {
        "title": "100% Guaranteed Training cum Placement Program",
        "category": "high-package career placement",
        "tech": "full-stack capstone projects, algorithmic data structures, live system design, and intensive corporate interview drills"
    }
}

def create_script(info):
    title = info["title"]
    category = info["category"]
    tech = info["tech"]

    script = f"""Hey there, future tech superstar! Welcome to AGS Academy! Ready to supercharge your career and master {title}? You have landed in the absolute right place! In 2026, the demand for top-tier {category} professionals is reaching unprecedented highs. At AGS Academy, we do not waste your precious time with boring, outdated theory. We plug you directly into modern, industry-standard practices, cutting-edge tools, and high-performance workflows that top engineering teams use every single day!

Now, let us jump straight into our live interactive code studio! Take a look at the live code right on your screen. You will master {tech}, writing clean, robust, and maintainable software from day one. You will learn how to structure scalable projects, implement defensive error handling, execute automated testing suites, and optimize system performance. No guessing, and no mindless copy-pasting. You will deeply understand every single line of code and architectural design pattern.

Next up, let us talk about our heavy-hitting capstone projects! You will not just build toy examples. You will design, build, and deploy full-scale production applications capable of handling real users, secure authentication, and complex data flows. Every single project you complete is deployed live to the cloud with automated CI/CD pipelines, giving you an elite GitHub portfolio that instantly grabs the attention of senior hiring managers and tech recruiters.

And best of all, you are never alone on this journey! Our career accelerator provides dedicated one-on-one mentorship from experienced tech leads, intensive mock interview sprints, and targeted system design coaching. With our extensive network of top hiring partners and guaranteed placement support, your dream job is right around the corner. Click Enroll Now below to claim your spot, join thousands of successful engineers, and let us launch your tech career today!"""
    return script

async def generate_single(course_id, info, out_dir):
    script = create_script(info)
    out_file = os.path.join(out_dir, f"narrator_{course_id}.mp3")
    print(f"Generating for {course_id}...")
    communicate = edge_tts.Communicate(
        text=script,
        voice="en-US-AvaNeural",
        rate="+3%",
        pitch="+2Hz"
    )
    await communicate.save(out_file)
    size = os.path.getsize(out_file)
    print(f"[OK] Saved {out_file} ({size} bytes)")

async def main():
    out_dir = os.path.abspath(os.path.join("google-login-node", "frontend", "videos"))
    os.makedirs(out_dir, exist_ok=True)
    
    # Run in parallel batches of 3 to avoid throttling
    course_items = list(courses_info.items())
    batch_size = 3
    for i in range(0, len(course_items), batch_size):
        batch = course_items[i:i+batch_size]
        tasks = [generate_single(cid, cinfo, out_dir) for cid, cinfo in batch]
        await asyncio.gather(*tasks)
    
    print("ALL NARRATIONS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
