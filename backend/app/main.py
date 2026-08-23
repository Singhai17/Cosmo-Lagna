"""
FastAPI Application Entry Point.
Production-grade setup with CORS middleware, logging, global exception handling, and health probes.
"""
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .routes import calculate, numerology, dasha, insights

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("jyotish.api")

app = FastAPI(
    title="COSMO LAGNA • Sidereal Ephemeris & Vedic Engine API",
    description=(
        "Production-grade Vedic Astrology and Sankhya Shastra platform. "
        "Calculates Lahiri Ayanamsa, D1/D9/D10 Vargas, Vimshottari Dasha, "
        "Sarvashtakavarga, Chaldean Numerology, and Parashari scriptural intelligence."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Robust CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, configure specific domain origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global unhandled error at {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"}
    )

# Include API Routers
app.include_router(calculate.router)
app.include_router(numerology.router)
app.include_router(dasha.router)
app.include_router(insights.router)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "engine": "Deterministic Sidereal Jyotish & Numerology Platform",
        "ayanamsa": "Lahiri (Chitra Paksha)"
    }
