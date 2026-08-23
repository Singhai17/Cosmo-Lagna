"""
Divisional Vargas (D1 Rashi, D9 Navamsha, D10 Dashamsha) & Classical Dignity Engine.
Implements Parashari Varga rules, Vargottama detection, and Panchadha Maitri.
"""
from typing import Dict, List, Any, Tuple
from ..models.jyotish import ZODIAC_SIGNS, PLANETARY_DIGNITIES

def calculate_navamsha_sign(longitude: float) -> int:
    """
    Calculate Navamsha (D9) sign index (1-12) for a given sidereal longitude.
    Based on 108 Nakshatra Padas (each 3° 20' = 3.333333°).
    """
    pada_index = int(longitude / (360.0 / 108.0)) # 0 to 107
    d9_sign_id = (pada_index % 12) + 1
    return d9_sign_id

def calculate_dashamsha_sign(sign_id: int, degrees_in_sign: float) -> int:
    """
    Calculate Dashamsha (D10) sign index (1-12).
    Each division is 3° (10 parts in a 30° sign).
    Odd signs count from the sign itself; Even signs count from the 9th sign from itself.
    """
    part_idx = int(degrees_in_sign / 3.0) # 0 to 9
    if part_idx > 9:
        part_idx = 9
        
    is_odd = (sign_id % 2) != 0
    if is_odd:
        d10_sign = ((sign_id - 1 + part_idx) % 12) + 1
    else:
        # 9th sign from sign_id is (sign_id + 8)
        d10_sign = ((sign_id - 1 + 8 + part_idx) % 12) + 1
        
    return d10_sign

def evaluate_panchadha_maitri(planet: str, placed_sign_id: int, all_planet_houses: Dict[str, int]) -> str:
    """
    Calculate 5-Fold Compound Relationship (Panchadha Maitri).
    Natural (Naisargika) + Temporal (Tatkalika) = Compound Relationship:
    - Friend + Friend = Great Friend (Adhi Mitra)
    - Friend + Neutral / Neutral + Friend = Friend (Mitra)
    - Friend + Enemy / Neutral + Neutral / Enemy + Friend = Neutral (Sama)
    - Enemy + Neutral / Neutral + Enemy = Enemy (Shatru)
    - Enemy + Enemy = Great Enemy (Adhi Shatru)
    """
    if planet not in PLANETARY_DIGNITIES:
        return "Neutral"
        
    dignity_info = PLANETARY_DIGNITIES[planet]
    sign_lord = ZODIAC_SIGNS[placed_sign_id - 1]["lord"]
    
    if sign_lord == planet:
        return "Own Sign"
        
    # Natural Friendship
    natural_rel = "neutral"
    if sign_lord in dignity_info.get("friends", []):
        natural_rel = "friend"
    elif sign_lord in dignity_info.get("enemies", []):
        natural_rel = "enemy"
        
    # Temporal (Tatkalika) Friendship:
    # Planets in houses 2, 3, 4, 10, 11, 12 from each other are temporal friends; else enemies.
    planet_house = all_planet_houses.get(planet, 1)
    lord_house = all_planet_houses.get(sign_lord, 1)
    
    diff = (lord_house - planet_house) % 12
    if diff in [1, 2, 3, 9, 10, 11]: # 2nd, 3rd, 4th, 10th, 11th, 12th
        temporal_rel = "friend"
    else:
        temporal_rel = "enemy"
        
    if natural_rel == "friend" and temporal_rel == "friend":
        return "Great Friend"
    elif (natural_rel == "friend" and temporal_rel == "enemy") or (natural_rel == "enemy" and temporal_rel == "friend"):
        return "Neutral"
    elif natural_rel == "neutral" and temporal_rel == "friend":
        return "Friend"
    elif natural_rel == "neutral" and temporal_rel == "enemy":
        return "Enemy"
    elif natural_rel == "enemy" and temporal_rel == "enemy":
        return "Great Enemy"
        
    return "Neutral"

def determine_dignity(planet: str, sign_id: int, deg_in_sign: float, all_planet_houses: Dict[str, int]) -> str:
    """
    Determine classical dignity of a planet in a sign.
    """
    if planet not in PLANETARY_DIGNITIES:
        return "Neutral"
        
    dignity_info = PLANETARY_DIGNITIES[planet]
    
    # Check Exaltation
    if sign_id == dignity_info["exaltation_sign"]:
        return "Exalted"
        
    # Check Debilitation
    if sign_id == dignity_info["debilitation_sign"]:
        return "Debilitated"
        
    # Check Moolatrikona
    if sign_id == dignity_info["moolatrikona_sign"]:
        start_d, end_d = dignity_info["moolatrikona_range"]
        if start_d <= deg_in_sign <= end_d:
            return "Moolatrikona"
            
    # Check Own Sign
    if sign_id in dignity_info["own_signs"]:
        return "Own Sign"
        
    # Otherwise evaluate Panchadha Maitri
    return evaluate_panchadha_maitri(planet, sign_id, all_planet_houses)

def build_varga_chart(varga_code: str, title: str, sanskrit_name: str, description: str,
                      ascendant_sign_id: int, planet_placements: Dict[str, int]) -> Dict[str, Any]:
    """
    Build structured 12-house chart structure for D1, D9, or D10.
    """
    houses = []
    for h in range(1, 13):
        # House 1 has sign = ascendant_sign_id
        sign_id = ((ascendant_sign_id - 1 + (h - 1)) % 12) + 1
        sign_data = ZODIAC_SIGNS[sign_id - 1]
        
        planets_in_house = [p for p, p_sign in planet_placements.items() if p_sign == sign_id]
        
        houses.append({
            "house_number": h,
            "sign_id": sign_id,
            "sign_name": sign_data["name"],
            "sign_sanskrit": sign_data["sanskrit"],
            "lord": sign_data["lord"],
            "planets": planets_in_house,
            "sav_bindus": 0
        })
        
    return {
        "varga_code": varga_code,
        "title": title,
        "sanskrit_name": sanskrit_name,
        "description": description,
        "houses": houses,
        "planet_positions": {p: {"sign_id": s, "sign_name": ZODIAC_SIGNS[s - 1]["name"]} for p, s in planet_placements.items()}
    }

def process_vargas_and_dignities(planets_raw: List[Dict[str, Any]], ascendant_raw: Dict[str, Any]) -> Tuple[List[Dict[str, Any]], Dict[str, Any], List[str]]:
    """
    Compute D1, D9, D10 placements, Vargottama status, and comprehensive dignities for all Grahas.
    """
    # Map D1 houses for temporal relationship calculation
    all_d1_houses = {p["name"]: p["house"] for p in planets_raw}
    
    # Calculate D9 and D10 signs for Ascendant and all planets
    asc_d1_sign = ascendant_raw["sign_id"]
    asc_d9_sign = calculate_navamsha_sign(ascendant_raw["longitude"])
    asc_d10_sign = calculate_dashamsha_sign(asc_d1_sign, ascendant_raw["degrees_in_sign"])
    
    d1_placements = {p["name"]: p["sign_id"] for p in planets_raw}
    d9_placements = {p["name"]: calculate_navamsha_sign(p["longitude"]) for p in planets_raw}
    d10_placements = {p["name"]: calculate_dashamsha_sign(p["sign_id"], p["degrees_in_sign"]) for p in planets_raw}
    
    vargottama_planets = []
    enriched_planets = []
    
    for p in planets_raw:
        name = p["name"]
        d1_sign = p["sign_id"]
        d9_sign = d9_placements[name]
        d10_sign = d10_placements[name]
        
        is_vargottama = (d1_sign == d9_sign)
        if is_vargottama:
            vargottama_planets.append(name)
            
        dignity = determine_dignity(name, d1_sign, p["degrees_in_sign"], all_d1_houses)
        
        meta = PLANETARY_DIGNITIES.get(name, {})
        color = meta.get("color", "#d4af37")
        gemstone = meta.get("gemstone", "Universal Crystal")
        chakra = meta.get("chakra", "Anahata")
        sanskrit = meta.get("sanskrit", name)
        
        p_enriched = {
            **p,
            "sanskrit": sanskrit,
            "dignity": dignity,
            "is_vargottama": is_vargottama,
            "d9_sign_id": d9_sign,
            "d10_sign_id": d10_sign,
            "color": color,
            "gemstone": gemstone,
            "chakra": chakra,
            # Enhanced classical metadata
            "exaltation_sign_name": meta.get("exaltation_sign_name", "N/A"),
            "exaltation_deg": meta.get("exaltation_deg", 0.0),
            "debilitation_sign_name": meta.get("debilitation_sign_name", "N/A"),
            "debilitation_deg": meta.get("debilitation_deg", 0.0),
            "moolatrikona_sign_name": meta.get("moolatrikona_sign_name", "N/A"),
            "moolatrikona_range": meta.get("moolatrikona_range", (0.0, 30.0)),
            "own_signs_names": meta.get("own_signs_names", []),
            "karaka": meta.get("karaka", "Significator"),
            "nature": meta.get("nature", "Planetary Energy"),
            "metal": meta.get("metal", "Cosmic Alloy"),
            "mantra": meta.get("mantra", "Om Shanti"),
            "deity": meta.get("deity", "Cosmic Divinity"),
            "bphs_phala": meta.get("bphs_phala", "Signification in Classical Scripture.")
        }
        enriched_planets.append(p_enriched)
        
    # Build Varga Charts
    d1_chart = build_varga_chart("D1", "Rashi Chart", "Janma Kundali", "Primary bodily constitution, life template, and foundational planetary positions.", asc_d1_sign, d1_placements)
    d9_chart = build_varga_chart("D9", "Navamsha Chart", "Navamsha Kundali", "Dharmic destiny, soul purpose, spiritual strength, marriage, and subtle karmic fruit.", asc_d9_sign, d9_placements)
    d10_chart = build_varga_chart("D10", "Dashamsha Chart", "Dashamsha Kundali", "Professional vocation, career power, public influence, honor, and karmic works.", asc_d10_sign, d10_placements)
    
    vargas = {
        "D1": d1_chart,
        "D9": d9_chart,
        "D10": d10_chart
    }
    
    return enriched_planets, vargas, vargottama_planets
