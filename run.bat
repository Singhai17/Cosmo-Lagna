@echo off
title Cosmo Lagna - Live Server
echo ========================================================
echo        COSMO LAGNA - SIDEREAL EPHEMERIS PLATFORM
echo ========================================================
echo.
echo Starting FastAPI Backend & Next.js Frontend...
echo.

:: Start FastAPI Backend in background
start "Cosmo Lagna - Backend" /min cmd /c "cd /d %~dp0backend && python -m uvicorn app.main:app --port 8000 --host 127.0.0.1"

:: Start Next.js Frontend in background
start "Cosmo Lagna - Frontend" /min cmd /c "cd /d %~dp0frontend && npm run dev"

:: Wait 4 seconds for servers to initialize
timeout /t 4 /nobreak >nul

:: Automatically open default web browser
echo Launching Cosmo Lagna in your browser...
start http://localhost:3000

echo.
echo Cosmo Lagna is running live!
echo - Web UI: http://localhost:3000
echo - Backend API: http://127.0.0.1:8000
echo.
echo (Keep this window open, or close it when done)
pause
