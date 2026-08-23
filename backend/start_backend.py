"""
Backend Server Startup Script.
Runs FastAPI on host 0.0.0.0:8000 with auto-reload.
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
