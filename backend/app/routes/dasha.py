"""
Vimshottari Dasha Dedicated Route.
"""
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import Optional
from ..models.schemas import VimshottariDashaResponse
from ..engine.dasha import calculate_vimshottari_dasha

router = APIRouter(prefix="/api", tags=["Dasha"])

@router.get("/dasha", response_model=VimshottariDashaResponse)
async def get_dasha(
    moon_longitude: float = Query(..., ge=0.0, lt=360.0, description="Sidereal longitude of the Moon in degrees"),
    birth_date: str = Query(..., description="Birth Date in YYYY-MM-DD format"),
    birth_time: str = Query("12:00:00", description="Birth Time in HH:MM:SS format"),
    target_date: Optional[str] = Query(None, description="Optional target date to evaluate active dasha")
):
    try:
        dt_str = f"{birth_date} {birth_time}"
        birth_dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S" if len(birth_time.split(":")) == 3 else "%Y-%m-%d %H:%M")
        
        target_dt = None
        if target_date:
            target_dt = datetime.strptime(target_date, "%Y-%m-%d")
            
        result = calculate_vimshottari_dasha(moon_longitude, birth_dt, target_dt)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Dasha calculation error: {str(e)}")
