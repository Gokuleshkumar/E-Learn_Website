"""
FastAPI server for Gopu.
Handles WebSocket connections for real-time voice/vision tutoring
and REST endpoints for image analysis and session management.
"""

import asyncio
import base64
import json
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

# Load environment variables (look in backend/, project root, and Gemini_AI_Tutor/)
_env_path = Path(__file__).parent.parent / ".env"
if not _env_path.exists():
    _env_path = Path(__file__).parent.parent.parent / ".env"
if not _env_path.exists():
    _env_path = Path(__file__).parent.parent.parent / "Gemini_AI_Tutor" / ".env"
load_dotenv(_env_path, override=True)

from .config import settings
from .live_api import LiveSession, session_manager
from .tutor_agent import analyze_image_with_agent, create_tutor_agent
from .user_store import save_user, get_user, get_all_users, login_user

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    logger.info("🎓 Gopu starting up...")
    try:
        settings.validate()
        logger.info("✅ Configuration validated")
    except ValueError as e:
        logger.error(f"❌ Configuration error: {e}")

    yield

    # Shutdown: clean up all sessions
    logger.info("🔄 Shutting down, cleaning up sessions...")
    await session_manager.cleanup_all()
    logger.info("👋 Gopu stopped")


app = FastAPI(
    title="Gopu",
    description="AI-powered tutor using Gemini Live API for real-time voice and vision tutoring",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend static files
_candidates = [
    Path(__file__).resolve().parent.parent / "frontend",
    Path(__file__).resolve().parent.parent.parent / "frontend",
    Path(__file__).resolve().parent.parent.parent / "Gemini_AI_Tutor" / "frontend",
    Path.cwd() / "frontend",
    Path.cwd() / "backend" / "frontend",
    Path.cwd() / "AI_Education_Mini_project" / "Gemini_AI_Tutor" / "frontend",
]
FRONTEND_DIR = next((p for p in _candidates if p.exists() and (p / "index.html").exists()), _candidates[0])

@app.middleware("http")
async def add_no_cache_headers(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/static") or request.url.path == "/":
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    return response

if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")


# ---------------------------------------------------------------------------
# REST Endpoints
# ---------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
async def root():
    """Serve the main frontend page."""
    index_path = FRONTEND_DIR / "index.html"
    if index_path.exists():
        return HTMLResponse(
            content=index_path.read_text(encoding="utf-8"),
            headers={"Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache"}
        )
    return HTMLResponse(
        content="<h1>Gopu API</h1><p>Frontend not found. Place files in /frontend directory.</p>"
    )


@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run."""
    return {
        "status": "healthy",
        "service": "gopu",
        "active_sessions": session_manager.active_count,
    }


@app.get("/api/config")
async def get_client_config():
    """Return non-sensitive configuration for the frontend."""
    return {
        "audio_sample_rate": settings.audio_sample_rate,
        "audio_channels": settings.audio_channels,
        "max_session_duration": settings.max_session_duration,
        "supported_subjects": [
            {"id": "mathematics", "name": "Mathematics", "icon": "📐"},
            {"id": "physics", "name": "Physics", "icon": "⚛️"},
            {"id": "chemistry", "name": "Chemistry", "icon": "🧪"},
            {"id": "biology", "name": "Biology", "icon": "🧬"},
            {"id": "computer_science", "name": "Computer Science", "icon": "💻"},
            {"id": "language_arts", "name": "Language Arts", "icon": "📝"},
            {"id": "history", "name": "History", "icon": "📜"},
            {"id": "general", "name": "General", "icon": "📚"},
        ],
    }


@app.post("/api/analyze-image")
async def analyze_image(request: dict):
    """Analyze an uploaded image using the vision model.
    
    Expected body:
    {
        "image": "base64-encoded-image-data",
        "mime_type": "image/jpeg",
        "question": "optional question about the image"
    }
    """
    image_data = request.get("image")
    if not image_data:
        raise HTTPException(status_code=400, detail="No image data provided")

    mime_type = request.get("mime_type", "image/jpeg")
    question = request.get(
        "question",
        "Analyze this homework/study material and help me understand it.",
    )

    result = await analyze_image_with_agent(image_data, mime_type, question)
    return {"analysis": result}


@app.post("/api/register")
async def register_user(profile: dict):
    """Register a new student profile.

    Expected body:
    {
        "username": "alice123",
        "password": "secret",
        "name": "Alice",
        "gender": "girl",
        "grade": "10",
        "age": 15,
        "language": "en"
    }
    """
    name = profile.get("name", "").strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    try:
        record = save_user(profile)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"user": record}


@app.post("/api/login")
async def login(credentials: dict):
    """Log in with username and password.

    Expected body:
    {
        "username": "alice123",
        "password": "secret"
    }
    """
    username = credentials.get("username", "").strip()
    password = credentials.get("password", "")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required")

    user = login_user(username, password)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"user": user}


@app.get("/api/users")
async def list_users():
    """List all registered users (admin / demo)."""
    return {"users": get_all_users()}


@app.post("/api/analyze-session")
async def analyze_session(payload: dict):
    """Analyze a student-tutor discussion and return strengths, weaknesses,
    steps to improve, goals, and key discussion metrics."""
    messages = payload.get("messages", [])
    subject = payload.get("subject", "General Knowledge")
    student_name = payload.get("studentName", "Student")
    duration = int(payload.get("durationSeconds", 0))

    # 1. Try Gemini Live/Vision AI model if configured
    ai_result = await try_gemini_analysis(messages, subject, student_name, duration)
    if ai_result:
        return ai_result

    # 2. Contextual heuristic engine fallback
    return generate_contextual_analysis(messages, subject, student_name, duration)


async def try_gemini_analysis(messages: list, subject: str, student_name: str, duration: int) -> dict | None:
    """Attempt AI evaluation via Google Gemini GenAI SDK."""
    if not settings.google_api_key and not settings.google_cloud_project:
        return None
    try:
        from google import genai
        from google.genai import types

        if settings.google_api_key:
            client = genai.Client(api_key=settings.google_api_key)
        else:
            client = genai.Client(
                vertexai=True,
                project=settings.google_cloud_project,
                location=settings.google_cloud_region,
            )

        conv_text = "\n".join([f"{m.get('role', 'speaker').title()}: {m.get('text', '')}" for m in messages if m.get('text')])
        if not conv_text.strip():
            conv_text = f"Student initiated a dedicated discussion session on {subject}."

        prompt = f"""You are an expert academic tutor and educational assessor.
Evaluate the student's conversation with the AI tutor.
Student: {student_name}
Subject: {subject}
Session Duration: {duration} seconds

Conversation Transcript:
{conv_text}

Provide an insightful, constructive evaluation strictly formatted as a JSON object with no markdown formatting:
{{
  "overallScore": <integer 65-98>,
  "performanceSummary": "<2-3 sentence overview of student's engagement and conceptual mastery>",
  "strengths": [
    "<Concrete strength 1 with specific concept reference>",
    "<Concrete strength 2 with specific concept reference>",
    "<Concrete strength 3 with specific concept reference>"
  ],
  "weaknesses": [
    "<Specific weakness or misconception to address 1>",
    "<Specific weakness or misconception to address 2>"
  ],
  "stepsToImprove": [
    "<Actionable step 1: targeted practice/revision task>",
    "<Actionable step 2: targeted practice/revision task>",
    "<Actionable step 3: targeted practice/revision task>"
  ],
  "goals": [
    "<Target milestone goal 1 with timeline>",
    "<Target milestone goal 2 with timeline>",
    "<Target milestone goal 3 with timeline>"
  ],
  "topicsCovered": ["<Topic 1>", "<Topic 2>", "<Topic 3>"]
}}
"""
        response = await asyncio.wait_for(
            client.aio.models.generate_content(
                model=settings.gemini_vision_model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.3,
                )
            ),
            timeout=8.0
        )
        if response and response.text:
            raw = response.text.strip()
            if raw.startswith("```"):
                raw = re.sub(r"^```(?:json)?\n?", "", raw)
                raw = re.sub(r"\n?```$", "", raw)
            parsed = json.loads(raw)
            parsed["studentName"] = student_name
            parsed["subject"] = subject
            parsed["durationSeconds"] = duration
            return parsed
    except Exception as e:
        logger.warning(f"Gemini API analysis skipped, using contextual evaluator: {e}")
        return None


def generate_contextual_analysis(messages: list, subject: str, student_name: str, duration: int) -> dict:
    """Generate high-quality contextual evaluation based on transcript keywords, subject, and session metrics."""
    student_msgs = [m.get("text", "").strip() for m in messages if m.get("role") == "student" and m.get("text")]
    has_questions = any("?" in m or any(w in m.lower() for w in ["why", "how", "what", "explain", "help"]) for m in student_msgs)
    
    subject_topics = {
        "mathematics": ["Algebraic Expressions", "Problem Formulation", "Step-by-step Derivations", "Formula Applications"],
        "physics": ["Kinematic Laws", "Force & Motion Dynamics", "Conceptual Framing", "Unit Dimensionality"],
        "chemistry": ["Molecular Interactions", "Chemical Equilibrium", "Equation Balancing", "Reaction Mechanisms"],
        "biology": ["Cellular Architecture", "Metabolic Pathways", "Genetic Inheritance", "Biological Systems"],
        "computer_science": ["Algorithmic Complexity", "Data Structure Selection", "Control Flow", "Debugging Methodology"],
        "history": ["Historical Causation", "Chronological Synthesis", "Primary Source Analysis", "Sociopolitical Impact"],
        "language_arts": ["Reading Comprehension", "Thematic Interpretation", "Grammar & Syntax", "Vocabulary Precision"],
        "general": ["Critical Thinking", "Problem Decomposition", "Conceptual Inquiry", "Active Inquiry Methodologies"],
    }
    
    key = subject.lower().replace(" ", "_")
    topics = subject_topics.get(key, subject_topics["general"])

    # Score calculation
    msg_count = len(student_msgs)
    score = 76
    if msg_count >= 4: score += 10
    elif msg_count >= 1: score += 6
    if has_questions: score += 6
    if duration >= 90: score += 4
    score = min(96, max(70, score))

    # Strengths
    strengths = []
    if msg_count > 0:
        strengths.append(f"Proactively initiated technical inquiry in {subject.title()} with clear intent.")
    else:
        strengths.append(f"Took deliberate initiative to study {subject.title()} with the AI Tutor.")

    if has_questions:
        strengths.append("Formulated targeted, thoughtful questions that demonstrate active curiosity and cognitive engagement.")
    else:
        strengths.append(f"Grasped core definitions and key terminology in {topics[0]}.")

    strengths.append(f"Demonstrated positive receptivity to guided coaching and step-by-step reasoning in {topics[1] if len(topics) > 1 else 'core topics'}.")
    strengths.append("Maintained focused interactive momentum throughout the learning session.")

    # Weaknesses / Areas for Growth
    weaknesses = []
    weaknesses.append(f"Needs deeper fluency applying {topics[0]} principles independently without step-by-step prompts.")
    weaknesses.append(f"Occasional hesitation in self-checking intermediate derivation steps in {topics[-1]}.")
    if msg_count < 3:
        weaknesses.append("Encouraged to explain problem-solving logic aloud to solidify neural memory retention.")

    # Steps to Improve
    steps = [
        f"Solve 4-5 focused practice problems on {topics[0]} from the Academy Quiz Arena.",
        f"Draft a quick 1-page summary sheet covering core rules and formulas for {topics[1] if len(topics) > 1 else subject.title()}.",
        "Practice the 'Feynman Technique' by explaining the concept in simple words without looking at notes.",
        f"Re-take a 10-minute follow-up discussion session with Gopu Tutor after 48 hours to lock in mastery."
    ]

    # Target Goals & Milestones
    goals = [
        f"Achieve 85%+ accuracy on {subject.title()} quizzes within 7 days.",
        f"Master independent formulation of {topics[0]} problems without consulting hints.",
        "Complete 3 interactive review sessions this week to build long-term retention."
    ]

    mins = duration // 60
    secs = duration % 60
    summary = (
        f"{student_name} engaged in a focused {mins}m {secs}s {subject.title()} discussion. "
        f"You demonstrated solid conceptual receptivity in {topics[0]}, and with deliberate practice on {topics[-1]}, "
        f"you are well on track to achieve complete mastery!"
    )

    return {
        "studentName": student_name,
        "subject": subject.title(),
        "durationSeconds": duration,
        "overallScore": score,
        "performanceSummary": summary,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "stepsToImprove": steps,
        "goals": goals,
        "topicsCovered": topics[:3]
    }


# ---------------------------------------------------------------------------
# WebSocket Endpoint for Live Tutoring
# ---------------------------------------------------------------------------

@app.websocket("/ws/tutor")
async def websocket_tutor(websocket: WebSocket):
    """WebSocket endpoint for real-time voice/vision tutoring.
    
    Protocol:
    Client sends JSON messages:
    - {"type": "start", "subject": "mathematics"}  → Start a new session
    - {"type": "audio", "data": "base64..."}        → Send audio chunk
    - {"type": "image", "data": "base64...", "mime_type": "image/jpeg"} → Send image
    - {"type": "text", "data": "hello"}             → Send text message
    - {"type": "stop"}                               → End session
    
    Server sends JSON messages:
    - {"type": "session_started", "session_id": "..."}
    - {"type": "audio", "data": "base64..."}         → Audio response chunk
    - {"type": "text", "data": "Hello!"}             → Text response
    - {"type": "turn_complete"}                       → Model finished speaking
    - {"type": "error", "message": "..."}            → Error
    """
    await websocket.accept()
    logger.info("WebSocket client connected")

    session: LiveSession = None
    
    try:
        while True:
            # Receive message from client
            raw = await websocket.receive_text()
            try:
                message = json.loads(raw)
            except json.JSONDecodeError:
                await websocket.send_json({"type": "error", "message": "Invalid JSON"})
                continue

            msg_type = message.get("type")

            # ── START SESSION ──
            if msg_type == "start":
                subject = message.get("subject", "general")
                language = message.get("language", "en")

                # Create callbacks that send data back over WebSocket
                async def on_audio(data: str):
                    try:
                        await websocket.send_json({"type": "audio", "data": data})
                    except Exception:
                        pass

                async def on_text(data: str):
                    try:
                        await websocket.send_json({"type": "text", "data": data})
                    except Exception:
                        pass

                async def on_turn_complete():
                    try:
                        await websocket.send_json({"type": "turn_complete"})
                    except Exception:
                        pass

                # Create and connect session
                session = session_manager.create_session(
                    on_audio=on_audio,
                    on_text=on_text,
                    on_turn_complete=on_turn_complete,
                )

                try:
                    await session.connect(subject=subject, language=language)
                    await websocket.send_json({
                        "type": "session_started",
                        "session_id": session.session_id,
                    })
                    logger.info(f"Session started: {session.session_id}")
                    # Initiate the conversation automatically
                    await session.send_text("Please introduce yourself warmly as Gopu Tutor AI and ask the student how you can help them today.")
                except Exception as e:
                    logger.error(f"Failed to start session: {e}")
                    await websocket.send_json({
                        "type": "error",
                        "message": f"Failed to connect to Gemini: {str(e)}",
                    })
                    session = None

            # ── SEND AUDIO ──
            elif msg_type == "audio" and session:
                audio_data = message.get("data", "")
                if audio_data:
                    logger.debug(f"Sending audio chunk: {len(audio_data)} chars")
                    await session.send_audio(audio_data)

            # ── SEND IMAGE ──
            elif msg_type == "image" and session:
                image_data = message.get("data", "")
                mime_type = message.get("mime_type", "image/jpeg")
                if image_data:
                    # Vision analysis is handled inside send_image
                    # (uses vision model + feeds result to live session)
                    await session.send_image(image_data, mime_type)

            # ── SEND TEXT ──
            elif msg_type == "text" and session:
                text_data = message.get("data", "")
                if text_data:
                    logger.info(f"Sending text: {text_data[:100]}")
                    await session.send_text(text_data)

            # ── STOP SESSION ──
            elif msg_type == "stop":
                if session:
                    await session_manager.remove_session(session.session_id)
                    session = None
                await websocket.send_json({"type": "session_ended"})
                break

            elif not session and msg_type in ("audio", "image", "text"):
                await websocket.send_json({
                    "type": "error",
                    "message": "No active session. Send {\"type\": \"start\"} first.",
                })

    except WebSocketDisconnect:
        logger.info("WebSocket client disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        # Clean up session on disconnect
        if session:
            await session_manager.remove_session(session.session_id)
        logger.info("WebSocket connection closed")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    """Run the server."""
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="debug" if settings.debug else "info",
    )


if __name__ == "__main__":
    main()
