"""
Main Calculation Route for Complete Vedic Astrology and Numerology Payload.
"""
from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from typing import Dict, Any

from ..models.schemas import BirthDataRequest, FullAstrologicalResponse
from ..models.jyotish import ZODIAC_SIGNS
from ..engine.ephemeris import (
    calculate_julian_day,
    get_lahiri_ayanamsa,
    calculate_sidereal_ascendant,
    get_sign_info,
    get_nakshatra_info,
    calculate_planetary_positions,
    format_dms
)
from ..engine.vargas import process_vargas_and_dignities
from ..engine.dasha import calculate_vimshottari_dasha
from ..engine.ashtakavarga import calculate_ashtakavarga
from ..engine.houses import analyze_all_twelve_houses
from ..engine.rajyogas import analyze_all_rajyogas
from ..engine.gochar import calculate_realtime_gochar
from ..engine.sadesati import calculate_sade_sati_lifecycle
from ..engine.kaalsarp import calculate_kaal_sarp_analysis
from ..engine.numerology import process_vedic_numerology
from ..engine.llm_synthesis import generate_scriptural_insights

router = APIRouter(prefix="/api", tags=["Calculation"])

@router.post("/calculate", response_model=FullAstrologicalResponse)
async def calculate_full_horoscope(request: BirthDataRequest):
    """
    Generate comprehensive deterministic Jyotish and Sankhya Shastra horoscope payload.
    """
    try:
        # Parse Date and Time
        dt_str = f"{request.birth_date} {request.birth_time}"
        for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M"):
            try:
                birth_dt = datetime.strptime(dt_str, fmt)
                break
            except ValueError:
                pass
        else:
            raise HTTPException(status_code=400, detail="Invalid date/time format")
            
        # 1. Compute Julian Day (UT)
        jd = calculate_julian_day(
            year=birth_dt.year,
            month=birth_dt.month,
            day=birth_dt.day,
            hour=birth_dt.hour,
            minute=birth_dt.minute,
            second=birth_dt.second,
            timezone_offset=request.timezone
        )
        
        # 2. Compute Lahiri Ayanamsa
        ayanamsa = get_lahiri_ayanamsa(jd)
        ayanamsa_dms = format_dms(ayanamsa)
        
        # 3. Compute Sidereal Ascendant (Lagna)
        asc_longitude = calculate_sidereal_ascendant(
            jd=jd,
            latitude=request.latitude,
            longitude=request.longitude,
            ayanamsa=ayanamsa
        )
        asc_sign_id, asc_sign_name, asc_sign_sanskrit, asc_deg_in_sign = get_sign_info(asc_longitude)
        asc_nak_info = get_nakshatra_info(asc_longitude)
        
        ascendant_data = {
            "longitude": asc_longitude,
            "sign_id": asc_sign_id,
            "sign_name": asc_sign_name,
            "sign_sanskrit": asc_sign_sanskrit,
            "degrees_in_sign": asc_deg_in_sign,
            "formatted_dms": format_dms(asc_deg_in_sign),
            "nakshatra_id": asc_nak_info["nakshatra_id"],
            "nakshatra_name": asc_nak_info["nakshatra_name"],
            "nakshatra_pada": asc_nak_info["nakshatra_pada"],
            "nakshatra_lord": asc_nak_info["nakshatra_lord"]
        }
        
        # 4. Calculate Planetary Positions
        planets_raw = calculate_planetary_positions(jd, ayanamsa, asc_sign_id)
        
        # 5. Calculate Vargas (D1, D9, D10), Dignities & Vargottama
        planets_enriched, vargas, vargottama_planets = process_vargas_and_dignities(planets_raw, ascendant_data)
        
        # 6. Calculate Sarvashtakavarga (SAV)
        sav_data = calculate_ashtakavarga(planets_enriched, asc_sign_id)
        
        # Merge SAV scores into D1 houses
        sav_scores_list = [sav_data["house_scores"].get(h, 28) for h in range(1, 13)]
        for house in vargas["D1"]["houses"]:
            h_num = house["house_number"]
            house["sav_bindus"] = sav_data["house_scores"].get(h_num, 0)
            
        # 7. Calculate 12-House Detailed Life Aspects Analysis
        houses_detailed = analyze_all_twelve_houses(asc_sign_id, planets_enriched, sav_scores_list)
        
        # 8. Calculate Raja Yogas & Mahapurusha Yogas
        rajyogas_data = analyze_all_rajyogas(asc_sign_id, planets_enriched, gender=request.gender or "male")
            
        # 9. Calculate 120-Year Vimshottari Dasha
        moon_data = next((p for p in planets_enriched if p["name"] == "Moon"), planets_enriched[0])
        dasha_data = calculate_vimshottari_dasha(moon_data["longitude"], birth_dt)
        
        # 10. Real-Time Planetary Transits (Gochar) with Vedha Obstruction Analysis
        gochar_data = calculate_realtime_gochar(
            natal_moon_sign_id=moon_data["sign_id"],
            natal_lagna_sign_id=asc_sign_id
        )
        
        # 11. Shani Sade Sati & Dhaiya Lifecycle Timeline (~100 Years)
        sadesati_data = calculate_sade_sati_lifecycle(
            natal_moon_sign_id=moon_data["sign_id"],
            birth_year=birth_dt.year
        )
        
        # 12. Kaal Sarp Dosha & Yoga Analysis (12 Classical Types)
        kaalsarp_data = calculate_kaal_sarp_analysis(
            ascendant_sign_id=asc_sign_id,
            planets_enriched=planets_enriched
        )
        
        # 13. Calculate Vedic Numerology (Sankhya Shastra)
        numerology_data = process_vedic_numerology(
            name=request.name,
            year=birth_dt.year,
            month=birth_dt.month,
            day=birth_dt.day
        )
        
        # 14. Generate Scriptural Insights (LLM with deterministic fallback)
        scriptural_insights = await generate_scriptural_insights({
            "name": request.name,
            "ascendant": ascendant_data,
            "planets": planets_enriched,
            "vargottama_planets": vargottama_planets,
            "vimshottari_dasha": dasha_data,
            "sarvashtakavarga": sav_data,
            "numerology": numerology_data
        })
        
        return FullAstrologicalResponse(
            birth_data=request,
            calculation_engine="Deterministic Sidereal Ephemeris (Lahiri / Chitra Paksha)",
            ayanamsa_name="Lahiri (Chitra Paksha)",
            ayanamsa_deg=ayanamsa,
            ayanamsa_formatted=ayanamsa_dms,
            julian_day_ut=jd,
            ascendant=ascendant_data,
            planets=planets_enriched,
            vargas=vargas,
            vargottama_planets=vargottama_planets,
            sarvashtakavarga=sav_data,
            houses_detailed=houses_detailed,
            rajyogas=rajyogas_data,
            gochar=gochar_data,
            sade_sati=sadesati_data,
            kaal_sarp=kaalsarp_data,
            vimshottari_dasha=dasha_data,
            numerology=numerology_data,
            scriptural_insights=scriptural_insights,
            generated_at=datetime.now(timezone.utc).isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Astronomical calculation error: {str(e)}")
