"""
Comprehensive Shani Sade Sati & Dhaiya Lifecycle Engine.
Calculated with native ephemeris precision per classical principles from:
- Brihat Parashara Hora Shastra (BPHS)
- Phaladeepika (Ch. 26)
- Saravali & Jataka Parijata
"""
from typing import Dict, List, Any
from datetime import datetime, timezone
from ..models.jyotish import ZODIAC_SIGNS
from .ephemeris import (
    calculate_julian_day,
    get_lahiri_ayanamsa,
    calculate_planetary_positions
)

PHASE_DESCRIPTIONS = {
    "Sade Sati - Phase 1 (Rising Phase / 12th from Moon)": {
        "title": "Rising Phase (Aarohana / 12th Bhava)",
        "duration": "2.5 Years",
        "description": "Saturn transits the 12th house from natal Moon. Represents mental conditioning, financial planning, international connections, career reorientation, and spiritual maturity.",
        "key_impacts": [
            "Increased expenditure and investment restructuring.",
            "Long-distance travels or overseas career opportunities.",
            "Release of outlived habits and inward spiritual reflection."
        ]
    },
    "Sade Sati - Phase 2 (Peak Phase / Janma Shani / 1st from Moon)": {
        "title": "Peak Phase (Janma Shani / 1st Bhava)",
        "duration": "2.5 Years",
        "description": "Saturn transits directly over the natal Moon. The core transformative period demanding monumental discipline, high personal accountability, physical endurance, and structural evolution.",
        "key_impacts": [
            "Profound personal restructuring and character building.",
            "Heavy responsibilities and high-stakes leadership tests.",
            "Physical stamina vigilance and mental clarity cultivation."
        ]
    },
    "Sade Sati - Phase 3 (Setting Phase / 2nd from Moon)": {
        "title": "Setting Phase (Avarohana / 2nd Bhava)",
        "duration": "2.5 Years",
        "description": "Saturn transits the 2nd house from natal Moon. Represents stabilization, gradual consolidation of wealth, family harmony reconciliation, and long-term career foundations.",
        "key_impacts": [
            "Rebuilding family cohesion and communication clarity.",
            "Consolidation of savings, real estate, and assets.",
            "Emergence with hardened wisdom, resilience, and executive authority."
        ]
    },
    "Ardh-Ashtama Dhaiya (Kantaka Shani / 4th from Moon)": {
        "title": "Small Panoti / Kantaka Shani (4th Bhava)",
        "duration": "2.5 Years",
        "description": "Saturn transits the 4th house from natal Moon. Challenges domestic comfort, mother's health vigilance, property dealings, and demands calm emotional equilibrium.",
        "key_impacts": [
            "Domestic environment adjustments or relocations.",
            "Real estate and vehicle transactions require careful due diligence.",
            "Focus on inner peace, heart resilience, and family bonding."
        ]
    },
    "Ashtama Shani Dhaiya (8th from Moon)": {
        "title": "Ashtama Shani (8th Bhava Transformation)",
        "duration": "2.5 Years",
        "description": "Saturn transits the 8th house from natal Moon. Intense transformational period demanding deep psychological strength, research focus, health vigilance, and detachment from ego.",
        "key_impacts": [
            "Sudden career pivots or deep scientific/philosophical research.",
            "Health discipline, routine detox, and preventative care.",
            "Karmic cleansing and spiritual awakening."
        ]
    }
}

AUTHENTIC_SHANI_REMEDIES = [
    {
        "title": "Hanuman Chalisa & Sundarkand",
        "description": "Recite the Hanuman Chalisa daily, especially on Tuesdays and Saturdays. Lord Hanuman protects devotees from adverse Saturn transits.",
        "category": "Mantra & Stotra"
    },
    {
        "title": "Shani Beej Mantra Japa",
        "description": "Chant 'Om Sham Shanaishcharaya Namah' (ॐ शं शनैश्चराय नमः) 108 times on Saturday evenings facing West.",
        "category": "Japa Sadhana"
    },
    {
        "title": "Mustard Oil Deepam under Peepal Tree",
        "description": "Light a sesame or mustard oil earthen lamp (Diya) under a sacred Peepal tree after sunset on Saturdays.",
        "category": "Vedic Ritual"
    },
    {
        "title": "Dana (Charity) of Black Items",
        "description": "Donate black sesame seeds (Til), black lentils (Urad dal), mustard oil, or iron utensils to underprivileged individuals on Saturdays.",
        "category": "Seva & Dana"
    },
    {
        "title": "Truth, Humility & Ethical Conduct",
        "description": "Shani Dev is the cosmic judge (Karmaphala Daata). Treat subordinates, laborers, and elderly with utmost respect, honesty, and integrity.",
        "category": "Karma Yoga"
    }
]

def calculate_sade_sati_lifecycle(natal_moon_sign_id: int, birth_year: int) -> Dict[str, Any]:
    """
    Compute current Saturn transit status, active Sade Sati/Dhaiya phase, and complete lifetime timeline.
    """
    now_utc = datetime.now(timezone.utc)
    
    jd = calculate_julian_day(
        year=now_utc.year,
        month=now_utc.month,
        day=now_utc.day,
        hour=now_utc.hour,
        minute=now_utc.minute,
        second=now_utc.second,
        timezone_offset=0.0
    )
    ayanamsa = get_lahiri_ayanamsa(jd)
    raw_planets = calculate_planetary_positions(jd, ayanamsa, 1)
    
    saturn_obj = next((p for p in raw_planets if p["name"] == "Saturn"), raw_planets[0])
    saturn_current_sign_id = saturn_obj["sign_id"]
    saturn_is_retro = saturn_obj["is_retrograde"]
    
    saturn_sign_info = ZODIAC_SIGNS[saturn_current_sign_id - 1]
    natal_moon_info = ZODIAC_SIGNS[natal_moon_sign_id - 1]
    
    # 2. Determine House of Saturn from Natal Moon
    house_from_moon = ((saturn_current_sign_id - natal_moon_sign_id) % 12) + 1
    
    is_sade_sati = False
    is_dhaiya = False
    active_phase_name = "Inactive (Clear & Unencumbered Period)"
    phase_key = None
    
    if house_from_moon == 12:
        is_sade_sati = True
        phase_key = "Sade Sati - Phase 1 (Rising Phase / 12th from Moon)"
        active_phase_name = "Sade Sati - Phase 1 (Rising Phase)"
    elif house_from_moon == 1:
        is_sade_sati = True
        phase_key = "Sade Sati - Phase 2 (Peak Phase / Janma Shani / 1st from Moon)"
        active_phase_name = "Sade Sati - Phase 2 (Peak Phase / Janma Shani)"
    elif house_from_moon == 2:
        is_sade_sati = True
        phase_key = "Sade Sati - Phase 3 (Setting Phase / 2nd from Moon)"
        active_phase_name = "Sade Sati - Phase 3 (Setting Phase)"
    elif house_from_moon == 4:
        is_dhaiya = True
        phase_key = "Ardh-Ashtama Dhaiya (Kantaka Shani / 4th from Moon)"
        active_phase_name = "Kantaka Shani / Ardh-Ashtama Dhaiya (4th from Moon)"
    elif house_from_moon == 8:
        is_dhaiya = True
        phase_key = "Ashtama Shani Dhaiya (8th from Moon)"
        active_phase_name = "Ashtama Shani Dhaiya (8th from Moon)"
        
    current_phase_details = PHASE_DESCRIPTIONS.get(phase_key, {
        "title": "Clear & Fortunate Shani Period",
        "duration": "N/A",
        "description": f"Saturn is currently placed in House {house_from_moon} ({saturn_sign_info['name']}) from your natal Moon ({natal_moon_info['name']}). You are NOT undergoing Sade Sati or Dhaiya.",
        "key_impacts": ["Favorable period for worldly expansion, investments, and unencumbered progress."]
    })
    
    # 3. Generate Complete Lifetime Timeline (~100 Years)
    timeline_cycles: List[Dict[str, Any]] = []
    
    sign_12th = ((natal_moon_sign_id - 2) % 12) + 1
    known_anchor_year = 2023.0  # Saturn entered Aquarius in early 2023
    known_anchor_sign = 11      # Aquarius
    year_now = now_utc.year
    
    for cycle_idx in range(1, 4):  # Up to 3 Sade Sati lifetime cycles
        diff_12th = (sign_12th - known_anchor_sign) % 12
        first_12th_year = known_anchor_year + (diff_12th * 2.455)
        
        while first_12th_year < (birth_year - 5):
            first_12th_year += 29.457
        while first_12th_year > (birth_year + 30 * cycle_idx):
            first_12th_year -= 29.457
            
        c_start = int(first_12th_year + (cycle_idx - 1) * 29.457)
        if c_start > birth_year + 95:
            break
            
        p1_sign_id = sign_12th
        p2_sign_id = natal_moon_sign_id
        p3_sign_id = (natal_moon_sign_id % 12) + 1
        
        p1_start = c_start
        p1_end = p1_start + 2.5
        p2_start = p1_end
        p2_end = p2_start + 2.5
        p3_start = p2_end
        p3_end = p3_start + 2.5
        
        # Phase 1
        p1_status = "Completed" if year_now > p1_end else "Active Now" if p1_start <= year_now <= p1_end else "Upcoming"
        timeline_cycles.append({
            "cycle_number": cycle_idx,
            "phase_type": "Sade Sati Phase 1 (Rising)",
            "start_year": int(p1_start),
            "end_year": int(p1_end),
            "sign_name": ZODIAC_SIGNS[p1_sign_id - 1]["name"],
            "house_from_moon": 12,
            "status": p1_status,
            "description": "Mental shifts, foreign connections, expenditure restructuring, and spiritual growth."
        })
        
        # Phase 2
        p2_status = "Completed" if year_now > p2_end else "Active Now" if p2_start <= year_now <= p2_end else "Upcoming"
        timeline_cycles.append({
            "cycle_number": cycle_idx,
            "phase_type": "Sade Sati Phase 2 (Peak / Janma Shani)",
            "start_year": int(p2_start),
            "end_year": int(p2_end),
            "sign_name": ZODIAC_SIGNS[p2_sign_id - 1]["name"],
            "house_from_moon": 1,
            "status": p2_status,
            "description": "High-stakes personal transformation, major career responsibilities, and karmic resilience."
        })
        
        # Phase 3
        p3_status = "Completed" if year_now > p3_end else "Active Now" if p3_start <= year_now <= p3_end else "Upcoming"
        timeline_cycles.append({
            "cycle_number": cycle_idx,
            "phase_type": "Sade Sati Phase 3 (Setting)",
            "start_year": int(p3_start),
            "end_year": int(p3_end),
            "sign_name": ZODIAC_SIGNS[p3_sign_id - 1]["name"],
            "house_from_moon": 2,
            "status": p3_status,
            "description": "Wealth consolidation, family bonding, resolution of disputes, and steady foundation."
        })
        
        # Kantaka Dhaiya (4th from Moon) ~ 5 years after Sade Sati
        d4_start = p3_end + 4.9
        d4_end = d4_start + 2.5
        d4_sign_id = ((natal_moon_sign_id + 2) % 12) + 1
        d4_status = "Completed" if year_now > d4_end else "Active Now" if d4_start <= year_now <= d4_end else "Upcoming"
        timeline_cycles.append({
            "cycle_number": cycle_idx,
            "phase_type": "Kantaka Shani / Ardh-Ashtama Dhaiya",
            "start_year": int(d4_start),
            "end_year": int(d4_end),
            "sign_name": ZODIAC_SIGNS[d4_sign_id - 1]["name"],
            "house_from_moon": 4,
            "status": d4_status,
            "description": "Domestic life adjustments, emotional discipline, and property diligence."
        })
        
        # Ashtama Shani (8th from Moon) ~ 15 years after Sade Sati
        d8_start = p3_end + 14.7
        d8_end = d8_start + 2.5
        d8_sign_id = ((natal_moon_sign_id + 6) % 12) + 1
        d8_status = "Completed" if year_now > d8_end else "Active Now" if d8_start <= year_now <= d8_end else "Upcoming"
        timeline_cycles.append({
            "cycle_number": cycle_idx,
            "phase_type": "Ashtama Shani Dhaiya",
            "start_year": int(d8_start),
            "end_year": int(d8_end),
            "sign_name": ZODIAC_SIGNS[d8_sign_id - 1]["name"],
            "house_from_moon": 8,
            "status": d8_status,
            "description": "Deep psychological insights, health discipline, and research breakthroughs."
        })

    # Sort timeline by start_year
    timeline_cycles.sort(key=lambda x: x["start_year"])
    
    return {
        "is_sade_sati_active": is_sade_sati,
        "is_dhaiya_active": is_dhaiya,
        "active_phase_name": active_phase_name,
        "current_saturn_sign_name": saturn_sign_info["name"],
        "current_saturn_house_from_moon": house_from_moon,
        "current_saturn_is_retrograde": saturn_is_retro,
        "natal_moon_sign_name": natal_moon_info["name"],
        "phase_details": current_phase_details,
        "timeline_cycles": timeline_cycles,
        "remedies": AUTHENTIC_SHANI_REMEDIES
    }
