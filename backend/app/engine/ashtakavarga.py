"""
Sarvashtakavarga (SAV) & Bhinna Ashtakavarga (BAV) Engine.
Implements Brihat Parashara Hora Shastra (BPHS) 8-fold benefic distribution matrices.
Total Sarvashtakavarga bindus across 12 houses sum to 337.
"""
from typing import Dict, List, Any

# BPHS Benefic House Tables for each Planet from 7 Grahas and Lagna (1-indexed house offsets from each source)
BPHS_BAV_RULES = {
    "Sun": {
        "Sun": [1, 2, 4, 7, 8, 9, 10, 11],
        "Moon": [3, 6, 10, 11],
        "Mars": [1, 2, 4, 7, 8, 9, 10, 11],
        "Mercury": [3, 5, 6, 9, 10, 11, 12],
        "Jupiter": [5, 6, 9, 11],
        "Venus": [6, 7, 12],
        "Saturn": [1, 2, 4, 7, 8, 9, 10, 11],
        "Lagna": [3, 4, 6, 10, 11, 12]
    },
    "Moon": {
        "Sun": [3, 6, 7, 8, 10, 11],
        "Moon": [1, 3, 6, 7, 10, 11],
        "Mars": [2, 3, 5, 6, 9, 10, 11],
        "Mercury": [1, 3, 4, 5, 7, 8, 10, 11],
        "Jupiter": [1, 4, 7, 8, 10, 11, 12],
        "Venus": [3, 4, 5, 7, 9, 10, 11],
        "Saturn": [3, 5, 6, 11],
        "Lagna": [3, 6, 10, 11]
    },
    "Mars": {
        "Sun": [3, 5, 6, 10, 11],
        "Moon": [3, 6, 11],
        "Mars": [1, 2, 4, 7, 8, 10, 11],
        "Mercury": [3, 5, 6, 11],
        "Jupiter": [6, 10, 11, 12],
        "Venus": [6, 8, 11, 12],
        "Saturn": [1, 4, 7, 8, 9, 10, 11],
        "Lagna": [1, 3, 6, 10, 11]
    },
    "Mercury": {
        "Sun": [5, 6, 9, 11, 12],
        "Moon": [2, 4, 6, 8, 10, 11],
        "Mars": [1, 2, 4, 7, 8, 9, 10, 11],
        "Mercury": [1, 3, 5, 6, 9, 10, 11, 12],
        "Jupiter": [6, 8, 11, 12],
        "Venus": [1, 2, 3, 4, 5, 8, 9, 11],
        "Saturn": [1, 2, 4, 7, 8, 9, 10, 11],
        "Lagna": [1, 2, 4, 6, 8, 10, 11]
    },
    "Jupiter": {
        "Sun": [1, 2, 3, 4, 7, 8, 9, 10, 11],
        "Moon": [2, 5, 7, 9, 11],
        "Mars": [1, 2, 4, 7, 8, 10, 11],
        "Mercury": [1, 2, 4, 5, 6, 9, 10, 11],
        "Jupiter": [1, 2, 3, 4, 7, 8, 10, 11],
        "Venus": [2, 5, 6, 9, 10, 11],
        "Saturn": [3, 5, 6, 12],
        "Lagna": [1, 2, 4, 5, 6, 7, 9, 10, 11]
    },
    "Venus": {
        "Sun": [8, 11, 12],
        "Moon": [1, 2, 3, 4, 5, 8, 9, 11, 12],
        "Mars": [3, 4, 6, 9, 11, 12],
        "Mercury": [3, 5, 6, 9, 11],
        "Jupiter": [5, 8, 9, 10, 11],
        "Venus": [1, 2, 3, 4, 5, 8, 9, 10, 11],
        "Saturn": [3, 4, 5, 8, 9, 10, 11],
        "Lagna": [1, 2, 3, 4, 5, 8, 9, 11]
    },
    "Saturn": {
        "Sun": [1, 2, 4, 7, 8, 10, 11],
        "Moon": [3, 6, 11],
        "Mars": [3, 5, 6, 10, 11, 12],
        "Mercury": [6, 8, 9, 10, 11, 12],
        "Jupiter": [5, 6, 11, 12],
        "Venus": [6, 11, 12],
        "Saturn": [3, 5, 6, 11],
        "Lagna": [1, 3, 4, 6, 10, 11]
    }
}

def calculate_ashtakavarga(planet_positions: List[Dict[str, Any]], ascendant_sign_id: int) -> Dict[str, Any]:
    """
    Calculate BAV for 7 planets and total Sarvashtakavarga (SAV) points for houses 1-12.
    """
    # Build sign placement map for the 7 Grahas and Lagna
    sign_map = {p["name"]: p["sign_id"] for p in planet_positions}
    sign_map["Lagna"] = ascendant_sign_id
    
    # 12 signs BAV matrices: 0-indexed for signs 1 to 12
    planet_bav: Dict[str, List[int]] = {}
    
    # Initialize SAV totals per zodiac sign (1 to 12)
    sav_sign_totals = [0] * 12
    
    for target_planet, sources in BPHS_BAV_RULES.items():
        bav_signs = [0] * 12
        for src_name, benefic_houses in sources.items():
            if src_name in sign_map:
                src_sign = sign_map[src_name] # 1 to 12
                for h in benefic_houses:
                    # Benefic sign = (src_sign - 1 + (h - 1)) % 12
                    benefic_sign_idx = (src_sign - 1 + (h - 1)) % 12
                    bav_signs[benefic_sign_idx] += 1
                    sav_sign_totals[benefic_sign_idx] += 1
                    
        planet_bav[target_planet] = bav_signs
        
    # Map SAV totals from Zodiac Signs to Houses (House 1 = ascendant_sign_id)
    house_scores: Dict[int, int] = {}
    for h in range(1, 13):
        sign_idx = (ascendant_sign_id - 1 + (h - 1)) % 12
        house_scores[h] = sav_sign_totals[sign_idx]
        
    # Classify strength (Standard Parashari benchmark: 28 bindus)
    strongest_houses = [h for h, score in house_scores.items() if score >= 28]
    karmic_focus_houses = [h for h, score in house_scores.items() if score < 28]
    
    return {
        "total_bindus": sum(sav_sign_totals),
        "house_scores": house_scores,
        "planet_bav": planet_bav,
        "strongest_houses": strongest_houses,
        "karmic_focus_houses": karmic_focus_houses
    }
