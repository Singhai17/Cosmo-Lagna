"""
Real-Time Vedic Planetary Transits (Gochar) Engine with Vedha Obstruction Analysis.
Calculated using high-precision ephemeris with Lahiri Ayanamsa per classical principles from:
- Phaladeepika (Ch. 26 - Gocharaphala)
- Brihat Parashara Hora Shastra (BPHS Ch. 81)
- Varahamihira's Brihat Samhita (Ch. 104)
"""
from typing import Dict, List, Any, Optional
from datetime import datetime, timezone
from ..models.jyotish import ZODIAC_SIGNS, NAKSHATRAS
from .ephemeris import (
    calculate_julian_day,
    get_lahiri_ayanamsa,
    calculate_planetary_positions,
    get_sign_info,
    get_nakshatra_info,
    format_dms
)

PLANETARY_GLYPHS = {
    "Sun": "☉",
    "Moon": "☽",
    "Mars": "♂",
    "Mercury": "☿",
    "Jupiter": "♃",
    "Venus": "♀",
    "Saturn": "♄",
    "Rahu": "☊",
    "Ketu": "☋",
}

# Classical Benefic Houses from Natal Moon (Phaladeepika Ch. 26)
BENEFIC_TRANSIT_HOUSES = {
    "Sun": [3, 6, 10, 11],
    "Moon": [1, 3, 6, 7, 10, 11],
    "Mars": [3, 6, 11],
    "Mercury": [2, 4, 6, 8, 10, 11],
    "Jupiter": [2, 5, 7, 9, 11],
    "Venus": [1, 2, 3, 4, 5, 8, 9, 11, 12],
    "Saturn": [3, 6, 11],
    "Rahu": [3, 6, 11],
    "Ketu": [3, 6, 11],
}

# Classical Vedha (Obstruction) Houses from Natal Moon
VEDHA_HOUSES = {
    "Sun": {3: 9, 6: 12, 10: 4, 11: 5},
    "Moon": {1: 5, 3: 9, 6: 12, 7: 2, 10: 4, 11: 8},
    "Mars": {3: 12, 6: 9, 11: 5},
    "Mercury": {2: 5, 4: 3, 6: 9, 8: 1, 10: 8, 11: 12},
    "Jupiter": {2: 12, 5: 4, 7: 3, 9: 10, 11: 8},
    "Venus": {1: 8, 2: 7, 3: 1, 4: 10, 5: 9, 8: 5, 9: 11, 11: 6, 12: 3},
    "Saturn": {3: 12, 6: 9, 11: 5},
    "Rahu": {3: 12, 6: 9, 11: 5},
    "Ketu": {3: 12, 6: 9, 11: 5},
}

VEDHA_EXEMPTIONS = {
    ("Sun", "Saturn"),
    ("Saturn", "Sun"),
    ("Moon", "Mercury"),
    ("Mercury", "Moon"),
}

TRANSIT_NARRATIVES = {
    "Sun": {
        3: "Courage, executive triumph, high vitality, and dominance over competitors.",
        6: "Complete eradication of debts and health issues, supreme career authority.",
        10: "High professional elevation, governmental favors, and honors from leadership.",
        11: "Financial growth, prestige, fulfillment of long-term ambitions.",
        "general_malefic": "Demands self-discipline, diplomacy in authority relations, and health mindfulness."
    },
    "Moon": {
        1: "Emotional contentment, social nourishment, and radiant vitality.",
        3: "Financial enterprise, joyful short travels, and sibling camaraderie.",
        6: "Victory in disputes, robust health, and relief from mental burdens.",
        7: "Harmonious partnerships, romance, and pleasant social engagements.",
        10: "Career achievements, public acclaim, and professional clarity.",
        11: "Abundant cash inflows, joyful associations, and desire fulfillment.",
        "general_malefic": "Fluctuating mood, requires emotional grounding and restful sleep."
    },
    "Mars": {
        3: "Unyielding courage, engineering prowess, and victory over adversaries.",
        6: "Annihilation of rivals, legal victories, and unshakeable stamina.",
        11: "Massive financial windfalls, real estate acquisitions, and bold breakthroughs.",
        "general_malefic": "Temper moderation advised; avoid impulsive conflicts and physical haste."
    },
    "Mercury": {
        2: "Financial gains through speech, intellect, and witty communication.",
        4: "Domestic happiness, academic success, and real estate appreciation.",
        6: "Sharp analytical victories, scholarly debates, and problem-solving brilliance.",
        8: "Sudden gains through contracts, research breakthroughs, and deep intellect.",
        10: "Career promotion, commercial expansions, and managerial recognition.",
        11: "Multi-stream revenues, flourishing network, and lucrative deals.",
        "general_malefic": "Careful documentation and calculated communication recommended."
    },
    "Jupiter": {
        2: "Magnificent wealth expansion, family harmony, and benevolent speech.",
        5: "Supreme wisdom, creative genius, speculative gains, and spiritual bliss.",
        7: "Auspicious matrimonial/business alliances, social respect, and graceful journeys.",
        9: "Monumental luck, blessings from mentors, divine guidance, and pilgrimage.",
        11: "Supreme abundance, massive goal attainment, and lasting prosperity.",
        "general_malefic": "Karmic testing of wisdom; practice generous ethics and patience."
    },
    "Venus": {
        1: "Charismatic charm, physical beauty, romantic joy, and luxury purchases.",
        2: "Abundant wealth in jewels/vehicles, sweet speech, and artistic delights.",
        3: "Artistic creativity, joyful entertainment, and pleasant short trips.",
        4: "Luxurious vehicles, domestic opulence, and maternal blessings.",
        5: "Romantic ecstasy, speculative success, and artistic masterpieces.",
        8: "Unexpected windfalls, intimate bliss, and occult prosperity.",
        9: "Fortune in love and arts, righteous spiritual joy, and pleasant travels.",
        11: "Lavish cash gains, flourishing friendships, and high status.",
        12: "Sensual pleasures, lavish comforts, and enjoyable international trips.",
        "general_malefic": "Exercise financial prudence in luxury expenses and personal boundaries."
    },
    "Saturn": {
        3: "Solidification of influence, persistent courage, and victory over trials.",
        6: "Total destruction of enemies and illnesses, immense discipline, and fortitude.",
        11: "Unshakeable wealth foundation, high organizational authority, and lifelong gains.",
        "general_malefic": "Karmic restructuring period; requires relentless discipline and humility."
    },
    "Rahu": {
        3: "Sudden fame, audacious initiatives, and unexpected technological/commercial triumphs.",
        6: "Total vanquishing of rivals, miraculous recovery, and foreign opportunities.",
        11: "Sudden massive financial elevation, influential global networking, and breakthroughs.",
        "general_malefic": "Avoid speculative shortcuts and illusions; adhere to grounded truth."
    },
    "Ketu": {
        3: "Fearless spiritual courage, sharp intuitive insights, and independent triumph.",
        6: "Defeat of hidden opposition, karmic healing, and immunity from harm.",
        11: "Detached financial windfalls, spiritual honors, and liberation from worldly debts.",
        "general_malefic": "Spiritual introspection advised; release attachments to transient outcomes."
    }
}

def calculate_realtime_gochar(natal_moon_sign_id: int, natal_lagna_sign_id: int) -> Dict[str, Any]:
    """
    Compute current real-time planetary transits for the present moment.
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
    
    # Calculate current planetary positions using ephemeris engine
    raw_planets = calculate_planetary_positions(jd, ayanamsa, natal_lagna_sign_id)
    
    current_transits = []
    current_planet_houses_from_moon: Dict[str, int] = {}
    
    for p in raw_planets:
        p_name = p["name"]
        sign_id = p["sign_id"]
        
        # House from Natal Moon & Lagna
        house_from_moon = ((sign_id - natal_moon_sign_id) % 12) + 1
        house_from_lagna = ((sign_id - natal_lagna_sign_id) % 12) + 1
        
        current_planet_houses_from_moon[p_name] = house_from_moon
        
        current_transits.append({
            "name": p_name,
            "sanskrit": p.get("sanskrit", p.get("sign_sanskrit", p_name)),
            "glyph": PLANETARY_GLYPHS.get(p_name, "★"),
            "longitude": p["longitude"],
            "sign_id": sign_id,
            "sign_name": p["sign_name"],
            "sign_sanskrit": p["sign_sanskrit"],
            "sign_lord": ZODIAC_SIGNS[sign_id - 1]["lord"],
            "degrees_in_sign": p["degrees_in_sign"],
            "formatted_dms": p["formatted_dms"],
            "nakshatra_name": p["nakshatra_name"],
            "nakshatra_pada": p["nakshatra_pada"],
            "nakshatra_lord": p["nakshatra_lord"],
            "is_retrograde": p["is_retrograde"],
            "house_from_moon": house_from_moon,
            "house_from_lagna": house_from_lagna,
        })
        
    # 2. Evaluate Benefic Status & Vedha (Obstruction)
    auspicious_count = 0
    total_transits = len(current_transits)
    
    enriched_transits = []
    for item in current_transits:
        p_name = item["name"]
        h_moon = item["house_from_moon"]
        
        benefic_list = BENEFIC_TRANSIT_HOUSES.get(p_name, [])
        is_benefic_house = h_moon in benefic_list
        
        is_obstructed = False
        obstructing_planet = None
        
        if is_benefic_house and p_name in VEDHA_HOUSES:
            vedha_target_house = VEDHA_HOUSES[p_name].get(h_moon)
            if vedha_target_house:
                for other_p, other_h in current_planet_houses_from_moon.items():
                    if other_p != p_name and other_h == vedha_target_house:
                        if (p_name, other_p) not in VEDHA_EXEMPTIONS:
                            is_obstructed = True
                            obstructing_planet = other_p
                            break
                            
        # Determine overall transit outcome
        if is_benefic_house and not is_obstructed:
            transit_status = "Auspicious (Shubha Gochar)"
            status_color = "emerald"
            auspicious_count += 1
        elif is_benefic_house and is_obstructed:
            transit_status = f"Obstructed (Vedha by {obstructing_planet})"
            status_color = "amber"
        else:
            transit_status = "Challenging (Pratikula Gochar)"
            status_color = "rose"
            
        # Get classical narrative
        p_narratives = TRANSIT_NARRATIVES.get(p_name, {})
        narrative = p_narratives.get(h_moon, p_narratives.get("general_malefic", "Demands vigilance and conscious efforts."))
        if is_obstructed:
            narrative += f" [Benefic results are temporarily delayed due to Vedha obstruction from {obstructing_planet} in House {vedha_target_house}]."
            
        enriched_transits.append({
            **item,
            "is_benefic_house": is_benefic_house,
            "is_obstructed": is_obstructed,
            "obstructing_planet": obstructing_planet,
            "transit_status": transit_status,
            "status_color": status_color,
            "prediction": narrative
        })
        
    benefic_percentage = round((auspicious_count / total_transits) * 100, 1) if total_transits > 0 else 0.0
    
    return {
        "timestamp_utc": now_utc.strftime("%Y-%m-%d %H:%M:%S UTC"),
        "natal_moon_sign_name": ZODIAC_SIGNS[natal_moon_sign_id - 1]["name"],
        "natal_lagna_sign_name": ZODIAC_SIGNS[natal_lagna_sign_id - 1]["name"],
        "auspicious_transits_count": auspicious_count,
        "total_transits_count": total_transits,
        "benefic_transit_percentage": benefic_percentage,
        "overall_transit_summary": (
            "Highly Favorable Planetary Alignment" if benefic_percentage >= 65
            else "Balanced & Dynamic Transit Period" if benefic_percentage >= 40
            else "Karmic Evolution & Discipline Period"
        ),
        "planets": enriched_transits
    }
