"""
Vedic Numerology (Sankhya Shastra) Dedicated Route.
"""
from fastapi import APIRouter, HTTPException
from datetime import datetime
from ..models.schemas import NumerologyRequest, VedicNumerologyResponse
from ..engine.numerology import process_vedic_numerology

router = APIRouter(prefix="/api", tags=["Numerology"])

@router.post("/numerology", response_model=VedicNumerologyResponse)
async def get_numerology(request: NumerologyRequest):
    try:
        birth_dt = datetime.strptime(request.birth_date, "%Y-%m-%d")
        result = process_vedic_numerology(
            name=request.name,
            year=birth_dt.year,
            month=birth_dt.month,
            day=birth_dt.day
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Numerology processing error: {str(e)}")
