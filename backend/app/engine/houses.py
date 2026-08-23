"""
Detailed 12-House (Bhava) Life Aspects Analysis Engine.
Calculates Sign, Lord placement, Occupying Planets, Special Parashari Drishtis (Aspects),
Sarvashtakavarga (SAV) strength, Benefic Protection status, and Life Domain synthesis.
"""
from typing import Dict, List, Any
from ..models.jyotish import ZODIAC_SIGNS, PLANETARY_DIGNITIES

BHAVA_METADATA = [
    {
        "house_number": 1,
        "name": "Tanu Bhava (1st House)",
        "sanskrit": "Lagna / Tanu",
        "category": "Dharma / Kendra / Trikona",
        "life_aspect": "Self, Physical Constitution, Aura & Life Direction",
        "significations": "Body structure, vital energy, self-expression, identity, longevity, natural demeanor, overall fortune, personal destiny.",
        "primary_karaka": "Sun (Surya)"
    },
    {
        "house_number": 2,
        "name": "Dhana Bhava (2nd House)",
        "sanskrit": "Dhana / Kutumba",
        "category": "Artha / Panaphara / Maraka",
        "life_aspect": "Accumulated Wealth, Family Lineage & Eloquent Speech",
        "significations": "Financial reserves, family lineage, eloquence and speech (Vak), food habits, right eye, valuable assets, values and speech truth.",
        "primary_karaka": "Jupiter (Guru)"
    },
    {
        "house_number": 3,
        "name": "Sahaja Bhava (3rd House)",
        "sanskrit": "Sahaja / Bhratri",
        "category": "Kama / Apoklima / Upachaya",
        "life_aspect": "Courage (Parakrama), Younger Siblings & Creative Enterprise",
        "significations": "Courage, mental resolve, siblings, communications, hands/skills, short-distance travels, writing, hobbies, self-effort (Purushartha).",
        "primary_karaka": "Mars (Mangala)"
    },
    {
        "house_number": 4,
        "name": "Sukha Bhava (4th House)",
        "sanskrit": "Sukha / Matri",
        "category": "Moksha / Kendra",
        "life_aspect": "Emotional Grounding, Mother, Real Estate & Vehicles",
        "significations": "Inner emotional peace, mother (Matri), fixed property, lands, conveyances (Vahana), ancestral roots, formal schooling, peace of heart.",
        "primary_karaka": "Moon (Chandra) & Venus (Shukra)"
    },
    {
        "house_number": 5,
        "name": "Putra Bhava (5th House)",
        "sanskrit": "Putra / Purva Punya",
        "category": "Dharma / Trikona / Panaphara",
        "life_aspect": "Intellect (Dhi), Past-Life Merit, Children & Creative Genius",
        "significations": "Purva Punya (past karmic credit), offspring, intellect (Buddhi), creative arts, speculative gains, mantras, romance, spiritual devotion.",
        "primary_karaka": "Jupiter (Guru)"
    },
    {
        "house_number": 6,
        "name": "Shatru / Roga Bhava (6th House)",
        "sanskrit": "Ari / Rina / Roga",
        "category": "Artha / Apoklima / Dusthana / Upachaya",
        "life_aspect": "Immunity, Daily Service, Overcoming Obstacles & Healing",
        "significations": "Competitive strength, triumph over rivals, immunity against disease, debt elimination, daily work discipline, pets, service to society.",
        "primary_karaka": "Mars (Mangala) & Saturn (Shani)"
    },
    {
        "house_number": 7,
        "name": "Kalatra Bhava (7th House)",
        "sanskrit": "Kalatra / Yuvati",
        "category": "Kama / Kendra / Maraka",
        "life_aspect": "Spouse, Marriage, Business Alliances & Public Dealings",
        "significations": "Life partner, marital harmony, business collaborations, negotiations, public interactions, foreign contracts, social relations.",
        "primary_karaka": "Venus (Shukra) & Jupiter (Guru)"
    },
    {
        "house_number": 8,
        "name": "Ayur / Randhra Bhava (8th House)",
        "sanskrit": "Randhra / Ayur",
        "category": "Moksha / Panaphara / Dusthana",
        "life_aspect": "Longevity, Occult Transformation, Hidden Wealth & Kundalini",
        "significations": "Longevity (Ayus), deep research, occult sciences, inheritance, unexpected windfalls, transformative events, psychological depth, secrets.",
        "primary_karaka": "Saturn (Shani)"
    },
    {
        "house_number": 9,
        "name": "Bhagya Bhava (9th House)",
        "sanskrit": "Bhagya / Dharma",
        "category": "Dharma / Trikona / Apoklima",
        "life_aspect": "Divine Grace, Father, Higher Wisdom & Dharmic Fortune",
        "significations": "Divine fortune (Bhagya), righteousness (Dharma), father, spiritual guru, higher philosophy, pilgrimages, international travels, ethical triumph.",
        "primary_karaka": "Jupiter (Guru) & Sun (Surya)"
    },
    {
        "house_number": 10,
        "name": "Karma Bhava (10th House)",
        "sanskrit": "Karma / Rajya",
        "category": "Artha / Kendra / Upachaya",
        "life_aspect": "Career Preeminence, Public Status, Leadership & Legacy",
        "significations": "Vocation, public authority, reputation, professional triumphs, executive power, social contribution, honors and awards, public legacy.",
        "primary_karaka": "Mercury, Sun, Jupiter, Saturn"
    },
    {
        "house_number": 11,
        "name": "Labha Bhava (11th House)",
        "sanskrit": "Labha / Aya",
        "category": "Kama / Panaphara / Upachaya",
        "life_aspect": "Abundant Gains, Cash Flow, Global Networks & Desires",
        "significations": "Financial prosperity, fulfilling worldly ambitions, elder siblings, influential associations, community leadership, revenue streams.",
        "primary_karaka": "Jupiter (Guru)"
    },
    {
        "house_number": 12,
        "name": "Vyaya / Moksha Bhava (12th House)",
        "sanskrit": "Vyaya / Moksha",
        "category": "Moksha / Apoklima / Dusthana",
        "life_aspect": "Spiritual Enlightenment (Moksha), Foreign Lands & Solitude",
        "significations": "Moksha (liberation), detachment, foreign residence, meditation, sound sleep quality, philanthropic donations, subconscious intuition.",
        "primary_karaka": "Saturn (Shani) & Ketu"
    }
]

def calculate_parashari_aspects_on_house(house_num: int, all_planets: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Calculate all planets casting special and general Parashari Drishtis (aspects) on a given house.
    - All planets cast full 7th aspect (opposite house).
    - Mars casts 4th, 7th, 8th aspects.
    - Jupiter casts 5th, 7th, 9th aspects (Guru Drishti).
    - Saturn casts 3rd, 7th, 10th aspects.
    - Rahu & Ketu cast 5th, 7th, 9th aspects.
    """
    aspects = []
    
    for p in all_planets:
        p_house = p["house"]
        p_name = p["name"]
        
        # House distance counting inclusively from planet house
        # e.g., if planet is in house 1 and target is house 7, diff = (7 - 1) % 12 + 1 = 7th house
        diff = ((house_num - p_house) % 12) + 1
        
        has_aspect = False
        aspect_type = ""
        
        # General 7th Aspect (All Planets)
        if diff == 7:
            has_aspect = True
            aspect_type = "7th Direct Aspect"
            
        # Special Mars Aspects: 4th, 8th
        elif p_name == "Mars" and diff in [4, 8]:
            has_aspect = True
            aspect_type = f"Special Mars {diff}th Aspect"
            
        # Special Jupiter Aspects: 5th, 9th (Guru Drishti)
        elif p_name == "Jupiter" and diff in [5, 9]:
            has_aspect = True
            aspect_type = f"Divine Guru {diff}th Aspect (Auspicious Shield)"
            
        # Special Saturn Aspects: 3rd, 10th
        elif p_name == "Saturn" and diff in [3, 10]:
            has_aspect = True
            aspect_type = f"Karmic Saturn {diff}th Aspect (Discipline)"
            
        # Special Rahu/Ketu Aspects: 5th, 9th
        elif p_name in ["Rahu", "Ketu"] and diff in [5, 9]:
            has_aspect = True
            aspect_type = f"Nodal {p_name} {diff}th Trine Aspect"
            
        if has_aspect:
            is_benefic = p_name in ["Jupiter", "Venus", "Mercury", "Moon"]
            aspects.append({
                "planet": p_name,
                "planet_sanskrit": p.get("sanskrit", p_name),
                "planet_house": p_house,
                "aspect_type": aspect_type,
                "is_benefic": is_benefic,
                "dignity": p.get("dignity", "Neutral"),
                "color": p.get("color", "#fbbf24")
            })
            
    return aspects

def evaluate_house_protection_and_strength(house_num: int, 
                                           lord_name: str,
                                           lord_house: int,
                                           lord_dignity: str,
                                           occupying_planets: List[Dict[str, Any]],
                                           aspecting_planets: List[Dict[str, Any]],
                                           sav_bindus: int) -> Dict[str, Any]:
    """
    Evaluate comprehensive protective shield, strength score (1-5 stars), and detailed assessment.
    """
    score = 3.0 # Baseline neutral
    
    # 1. Lord placement & dignity
    if lord_dignity in ["Exalted", "Moolatrikona", "Own Sign"]:
        score += 1.0
    elif lord_dignity in ["Debilitated", "Great Enemy"]:
        score -= 0.8
        
    # Kendra/Trikona placement for house lord
    if lord_house in [1, 4, 7, 10, 5, 9, 11]:
        score += 0.5
    elif lord_house in [6, 8, 12] and house_num not in [6, 8, 12]:
        score -= 0.4
        
    # 2. Occupying planets
    benefics_present = [p for p in occupying_planets if p["name"] in ["Jupiter", "Venus", "Mercury", "Moon"]]
    malefics_present = [p for p in occupying_planets if p["name"] in ["Saturn", "Mars", "Rahu", "Ketu", "Sun"]]
    
    if benefics_present:
        score += 0.6 * len(benefics_present)
    if any(p.get("is_vargottama") for p in occupying_planets):
        score += 0.7
        
    # 3. Aspects (Guru Drishti check)
    has_guru_drishti = any(a["planet"] == "Jupiter" for a in aspecting_planets)
    has_shukra_drishti = any(a["planet"] == "Venus" for a in aspecting_planets)
    has_saturn_aspect = any(a["planet"] == "Saturn" for a in aspecting_planets)
    has_mars_aspect = any(a["planet"] == "Mars" for a in aspecting_planets)
    
    if has_guru_drishti:
        score += 1.0
    if has_shukra_drishti:
        score += 0.5
        
    # 4. Sarvashtakavarga (SAV) points benchmark
    if sav_bindus >= 32:
        score += 0.8
    elif sav_bindus >= 28:
        score += 0.4
    elif sav_bindus < 25:
        score -= 0.5
        
    # Clamp score between 1 and 5
    final_score = max(1.0, min(5.0, round(score, 1)))
    star_rating = int(round(final_score))
    
    # Determine protection status
    if has_guru_drishti or (benefics_present and lord_dignity in ["Exalted", "Own Sign"]):
        protection_status = "Supreme Divine Shield (Guru / Benefic Fortitude)"
        protection_level = "High"
    elif has_shukra_drishti or benefics_present or sav_bindus >= 28:
        protection_status = "Strong Protective Auspiciousness"
        protection_level = "Moderate-High"
    elif has_saturn_aspect or has_mars_aspect:
        protection_status = "Disciplined Karmic Scrutiny (Growth through Patience)"
        protection_level = "Moderate"
    else:
        protection_status = "Balanced Natural Karma"
        protection_level = "Neutral"
        
    return {
        "score": final_score,
        "stars": star_rating,
        "has_guru_drishti": has_guru_drishti,
        "protection_status": protection_status,
        "protection_level": protection_level,
    }

def analyze_all_twelve_houses(ascendant_sign_id: int,
                              planets_enriched: List[Dict[str, Any]],
                              sav_scores: List[int]) -> List[Dict[str, Any]]:
    """
    Generate comprehensive structured payload for all 12 houses.
    """
    houses_analysis = []
    
    # Map lord locations for quick lookup
    planet_house_map = {p["name"]: p["house"] for p in planets_enriched}
    planet_dignity_map = {p["name"]: p.get("dignity", "Neutral") for p in planets_enriched}
    
    for meta in BHAVA_METADATA:
        h_num = meta["house_number"]
        # Sign in this house (1st house = ascendant_sign_id)
        sign_id = ((ascendant_sign_id - 1 + (h_num - 1)) % 12) + 1
        sign_data = ZODIAC_SIGNS[sign_id - 1]
        lord_name = sign_data["lord"]
        
        # Where is the lord located?
        lord_house = planet_house_map.get(lord_name, 1)
        lord_dignity = planet_dignity_map.get(lord_name, "Neutral")
        
        # Occupying planets in this house
        occupying = [p for p in planets_enriched if p["house"] == h_num]
        
        # Aspecting planets
        aspects = calculate_parashari_aspects_on_house(h_num, planets_enriched)
        
        # SAV score for this house
        sav_bindus = sav_scores[h_num - 1] if len(sav_scores) >= h_num else 28
        
        # Protection & Strength
        eval_result = evaluate_house_protection_and_strength(
            h_num, lord_name, lord_house, lord_dignity, occupying, aspects, sav_bindus
        )
        
        # Synthesis generation
        occ_str = ", ".join([f"{p['name']} ({p.get('dignity', '')})" for p in occupying]) if occupying else "None (Vacant / Influenced by Lord & Aspects)"
        aspect_str = ", ".join([f"{a['planet']} ({a['aspect_type']})" for a in aspects]) if aspects else "No Direct Full Aspects"
        
        houses_analysis.append({
            **meta,
            "sign_id": sign_id,
            "sign_name": sign_data["name"],
            "sign_sanskrit": sign_data["sanskrit"],
            "sign_element": sign_data["element"],
            "sign_modality": sign_data["modality"],
            "sign_symbol": sign_data["symbol"],
            "lord": lord_name,
            "lord_placement_house": lord_house,
            "lord_dignity": lord_dignity,
            "occupying_planets": occupying,
            "occupying_summary": occ_str,
            "aspecting_planets": aspects,
            "aspects_summary": aspect_str,
            "sav_bindus": sav_bindus,
            "strength_score": eval_result["score"],
            "stars": eval_result["stars"],
            "has_guru_drishti": eval_result["has_guru_drishti"],
            "protection_status": eval_result["protection_status"],
            "protection_level": eval_result["protection_level"]
        })
        
    return houses_analysis
