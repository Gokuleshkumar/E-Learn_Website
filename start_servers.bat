@echo off
echo ========================================================
echo   Starting AGS Academys Full Stack Platform
echo ========================================================

start "AGS AI Discuss Tutor (Port 8001)" cmd /k "cd /d %~dp0AI_Education_Mini_project\Gemini_AI_Tutor && .\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8001"

start "AGS Academys Node Server (Port 5000)" cmd /k "cd /d %~dp0google-login-node && npm start"

echo.
echo Both servers have been launched in separate windows:
echo   - AI Discuss Portal:  http://localhost:8001
echo   - Main Academy Portal: http://localhost:5000
echo.
