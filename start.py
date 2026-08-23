"""
COSMO LAGNA - Unified 1-Click Server Launcher
Starts both FastAPI backend and Next.js frontend concurrently and opens the browser.
"""
import subprocess
import time
import webbrowser
import sys
import os

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    print("=" * 60)
    print("       COSMO LAGNA - SIDEREAL EPHEMERIS PLATFORM")
    print("=" * 60)
    print("\n[1/3] Starting FastAPI backend on http://127.0.0.1:8000 ...")

    # Start backend
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--port", "8000", "--host", "127.0.0.1"],
        cwd=backend_dir
    )

    print("[2/3] Starting Next.js frontend on http://localhost:3000 ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=frontend_dir
    )

    # Wait 4 seconds then open browser
    time.sleep(4)
    print("[3/3] Opening browser at http://localhost:3000 ...\n")
    webbrowser.open("http://localhost:3000")

    print("=" * 60)
    print("Cosmo Lagna is running live!")
    print("Press Ctrl+C in this terminal to stop all servers.")
    print("=" * 60)

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nShutting down Cosmo Lagna servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    main()
