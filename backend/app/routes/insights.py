"""
Classical Scriptural Insights Dedicated Route.
"""
from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any, List
from ..models.schemas import ScripturalPrediction
from ..engine.llm_synthesis import generate_scriptural_insights

router = APIRouter(prefix="/api", tags=["Insights"])

@router.post("/insights", response_model=List[ScripturalPrediction])
async def get_insights(context: Dict[str, Any] = Body(...)):
    try:
        insights = await generate_scriptural_insights(context)
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insights generation error: {str(e)}")
