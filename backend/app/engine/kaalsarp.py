"""
Comprehensive Kaal Sarp Dosha & Kaal Sarp Yoga Engine.
Calculates mathematical planetary hemming between the Rahu-Ketu nodal axis,
classifies the exact 1 of 12 Classical Types, checks Yoga cancellation/elevation,
and provides authentic Vedic mitigation remedies.
"""
from typing import Dict, List, Any

# 12 Classical Kaal Sarp Types (Based on Rahu's House Placement in D1 Chart)
KAAL_SARP_TYPES_CATALOG = {
    1: {
        "id": "anant",
        "name": "Anant Kaal Sarp Dosha / Yoga",
        "sanskrit": "अनन्त कालसर्प दोष",
        "rahu_house": 1,
        "ketu_house": 7,
        "axis": "1st House (Lagna / Self) ⟷ 7th House (Kalatra / Marriage & Partnerships)",
        "classical_effects": "Tests self-confidence and requires conscious harmony in matrimonial/business partnerships. Once mastered, confers intense leadership charisma and sovereign public influence.",
        "remedy": "Recite Maha Mrityunjaya Mantra daily; perform Shiva Abhishekam with milk and holy water on Mondays."
    },
    2: {
        "id": "kulik",
        "name": "Kulik Kaal Sarp Dosha / Yoga",
        "sanskrit": "कुलिक कालसर्प दोष",
        "rahu_house": 2,
        "ketu_house": 8,
        "axis": "2nd House (Dhana / Family Wealth) ⟷ 8th House (Ayur / Sudden Transformations)",
        "classical_effects": "Challenges accumulated family wealth and demands truthful, diplomatic speech. Bestows profound occult intuition, research brilliance, and unforeseen inheritance gains.",
        "remedy": "Donate black sesame seeds and iron utensils on Saturdays; chant 'Om Namah Shivaya'."
    },
    3: {
        "id": "vasuki",
        "name": "Vasuki Kaal Sarp Dosha / Yoga",
        "sanskrit": "वासुकी कालसर्प दोष",
        "rahu_house": 3,
        "ketu_house": 9,
        "axis": "3rd House (Sahaja / Courage & Initiative) ⟷ 9th House (Bhagya / Higher Fortune)",
        "classical_effects": "Initial friction with siblings and delays in fortunes. Bestows unyielding courage, monumental literary/communication genius, and triumph through self-made enterprise.",
        "remedy": "Worship Lord Kartikeya / Lord Subramanya; chant Hanuman Chalisa."
    },
    4: {
        "id": "shankhpal",
        "name": "Shankhpal Kaal Sarp Dosha / Yoga",
        "sanskrit": "शंखपाल कालसर्प दोष",
        "rahu_house": 4,
        "ketu_house": 10,
        "axis": "4th House (Matru / Mother & Peace) ⟷ 10th House (Karma / Professional Authority)",
        "classical_effects": "Tests inner peace, property transactions, and maternal harmony. Later yields vast real estate holdings, political prominence, and high administrative rank.",
        "remedy": "Feed stray animals; offer water to a Peepal tree without touching it on Saturdays."
    },
    5: {
        "id": "padma",
        "name": "Padma Kaal Sarp Dosha / Yoga",
        "sanskrit": "पद्म कालसर्प दोष",
        "rahu_house": 5,
        "ketu_house": 11,
        "axis": "5th House (Putra / Intellect & Progeny) ⟷ 11th House (Labha / Material Gains)",
        "classical_effects": "Occasional delays in academic milestones or children's matters. Cultivates razor-sharp analytical genius, creative brilliance, and sudden massive financial windfalls.",
        "remedy": "Recite Saraswati Stotram and Gayatri Mantra; sponsor underprivileged students' education."
    },
    6: {
        "id": "maha_padma",
        "name": "Maha Padma Kaal Sarp Dosha / Yoga",
        "sanskrit": "महापद्म कालसर्प दोष",
        "rahu_house": 6,
        "ketu_house": 12,
        "axis": "6th House (Shatru / Enemies & Debts) ⟷ 12th House (Vyaya / Foreign & Liberation)",
        "classical_effects": "Encounter with adversaries and competition in early life. Transforms into invincible legal victory, supreme immune resilience, and global professional triumphs.",
        "remedy": "Perform Rahu Shanti Puja; chant Maha Mrityunjaya Mantra 108 times at twilight."
    },
    7: {
        "id": "takshak",
        "name": "Takshak Kaal Sarp Dosha / Yoga",
        "sanskrit": "तक्षक कालसर्प दोष",
        "rahu_house": 7,
        "ketu_house": 1,
        "axis": "7th House (Jaya / Public Life) ⟷ 1st House (Tanu / Physical Soul)",
        "classical_effects": "Requires maturity in business alliances and marriage. Bestows magnetic negotiation prowess, international acclaim, and flourishing commercial ventures.",
        "remedy": "Offer silver snake figurine in flowing water on Nag Panchami; chant Shiva Panchakshara Stotram."
    },
    8: {
        "id": "karkotak",
        "name": "Karkotak Kaal Sarp Dosha / Yoga",
        "sanskrit": "कर्कोटक कालसर्प दोष",
        "rahu_house": 8,
        "ketu_house": 2,
        "axis": "8th House (Randhra / Mysteries & Longevity) ⟷ 2nd House (Vak / Speech & Savings)",
        "classical_effects": "Vulnerability to sudden unexpected events and family misunderstandings. Bestows deep scientific/medical acumen, financial recovery, and spiritual awakening.",
        "remedy": "Chant 'Om Hreem Namah Shivaya'; support hospices or free medical dispensaries."
    },
    9: {
        "id": "shankhachur",
        "name": "Shankhachur Kaal Sarp Dosha / Yoga",
        "sanskrit": "शंखचूड़ कालसर्प दोष",
        "rahu_house": 9,
        "ketu_house": 3,
        "axis": "9th House (Dharma / Father & Fortune) ⟷ 3rd House (Parakrama / Enterprise)",
        "classical_effects": "Karmic tests with mentors and higher belief systems. Transforms into profound philosophical preeminence, global travels, and divine protection in righteous deeds.",
        "remedy": "Respect father and spiritual mentors; perform Rudra Abhishekam on Pradosham days."
    },
    10: {
        "id": "ghatak",
        "name": "Ghatak Kaal Sarp Dosha / Yoga",
        "sanskrit": "घातक कालसर्प दोष",
        "rahu_house": 10,
        "ketu_house": 4,
        "axis": "10th House (Rajya / Career & Executive Power) ⟷ 4th House (Sukha / Comforts)",
        "classical_effects": "High turbulence and scrutiny in professional endeavors. Cultivates unshakeable political, corporate, or institutional leadership and lifelong public prestige.",
        "remedy": "Worship Lord Shiva with Bilva leaves; distribute food to underprivileged laborers on Saturdays."
    },
    11: {
        "id": "vishdhar",
        "name": "Vishdhar Kaal Sarp Dosha / Yoga",
        "sanskrit": "विषधर कालसर्प दोष",
        "rahu_house": 11,
        "ketu_house": 5,
        "axis": "11th House (Aaya / Networks & Wealth) ⟷ 5th House (Buddhi / Wisdom)",
        "classical_effects": "Fluctuations in social circles and speculative ventures. Ultimately creates vast multi-stream revenue engines, influential friendships, and prosperous legacy.",
        "remedy": "Chant Vishnu Sahasranama; feed cows with green fodder on Wednesdays."
    },
    12: {
        "id": "sheshnag",
        "name": "Sheshnag Kaal Sarp Dosha / Yoga",
        "sanskrit": "शेषनाग कालसर्प दोष",
        "rahu_house": 12,
        "ketu_house": 6,
        "axis": "12th House (Moksha / Foreign Settlement) ⟷ 6th House (Roga / Competitors)",
        "classical_effects": "Early challenges with sleep, expenditures, or secret enemies. Conveys magnificent overseas success, spiritual enlightenment, and supreme victory over all litigation.",
        "remedy": "Perform Maha Mrityunjaya Homa; practice daily meditation and silent introspection."
    }
}

AUTHENTIC_KAAL_SARP_REMEDIES = [
    {
        "title": "Maha Mrityunjaya Mantra Japa",
        "mantra": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
        "description": "Recite this supreme life-giving mantra 108 times daily. Lord Shiva neutralizes all Rahu-Ketu serpentine afflictions.",
        "category": "Supreme Vedic Mantra"
    },
    {
        "title": "Shiva Abhishekam on Pradosham",
        "mantra": "Om Namah Shivaya (ॐ नमः शिवाय)",
        "description": "Perform Panchamrit Abhishekam (Milk, Curd, Ghee, Honey, Sugar) with Bilva leaves on Shiva Lingam on Mondays and Pradosham days.",
        "category": "Sacred Ritual"
    },
    {
        "title": "Nag Gayatri Mantra",
        "mantra": "ॐ नवकुलाय विद्महे विषदन्ताय धीमहि। तन्नो सर्पः प्रचोदयात्॥",
        "description": "Chant Nag Gayatri to appease the nine serpent lords and harmonize Rahu-Ketu nodal currents.",
        "category": "Serpentine Harmony"
    },
    {
        "title": "Ethical Karma & Universal Compassion",
        "mantra": "Ahimsa Paramo Dharmah",
        "description": "Never harm reptiles or serpents. Feed stray animals, dogs, and birds regularly, and uphold unwavering honesty.",
        "category": "Living Karma Yoga"
    }
]

def calculate_kaal_sarp_analysis(ascendant_sign_id: int, planets_enriched: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Rigorously detect Kaal Sarp Dosha / Yoga, flow direction, and cancellation conditions.
    """
    planet_long_map = {p["name"]: p["longitude"] for p in planets_enriched}
    planet_house_map = {p["name"]: p["house"] for p in planets_enriched}
    
    rahu_long = planet_long_map.get("Rahu", 0.0)
    ketu_long = planet_long_map.get("Ketu", (rahu_long + 180.0) % 360.0)
    rahu_house = planet_house_map.get("Rahu", 1)
    ketu_house = planet_house_map.get("Ketu", 7)
    
    # 7 Physical Planets to test: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
    physical_planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]
    
    # Function to check if angle x is between a and b moving counter-clockwise (direct)
    def is_between_direct(x: float, a: float, b: float) -> bool:
        if a < b:
            return a <= x <= b
        else:
            return x >= a or x <= b

    # Side 1: Rahu -> Ketu
    side_rahu_to_ketu = []
    side_ketu_to_rahu = []
    
    for p_name in physical_planets:
        p_long = planet_long_map.get(p_name, 0.0)
        if is_between_direct(p_long, rahu_long, ketu_long):
            side_rahu_to_ketu.append(p_name)
        else:
            side_ketu_to_rahu.append(p_name)
            
    count_side1 = len(side_rahu_to_ketu)
    count_side2 = len(side_ketu_to_rahu)
    
    # Classification
    dosha_status = "Absent"
    is_purna = False
    is_anshik = False
    flow_direction = "N/A"
    enclosed_planets = []
    outside_planets = []
    
    if count_side1 == 7 or count_side2 == 7:
        dosha_status = "Purna Kaal Sarp Dosha (Full)"
        is_purna = True
        flow_direction = "Udit Gola (Ascending / Direct Flow)" if count_side1 == 7 else "Anudit Gola (Descending / Reverse Flow)"
        enclosed_planets = physical_planets
        outside_planets = []
    elif count_side1 == 6 or count_side2 == 6:
        dosha_status = "Anshik Kaal Sarp Dosha (Partial)"
        is_anshik = True
        if count_side1 == 6:
            enclosed_planets = side_rahu_to_ketu
            outside_planets = side_ketu_to_rahu
            flow_direction = "Udit Gola (Partial Flow)"
        else:
            enclosed_planets = side_ketu_to_rahu
            outside_planets = side_rahu_to_ketu
            flow_direction = "Anudit Gola (Partial Flow)"
    else:
        dosha_status = "Absent (Planets Harmoniously Distributed on Both Sides)"
        enclosed_planets = []
        outside_planets = physical_planets
        
    # Classical Type based on Rahu House (1 to 12)
    type_info = KAAL_SARP_TYPES_CATALOG.get(rahu_house, KAAL_SARP_TYPES_CATALOG[1])
    
    # Check Yoga / Elevation conditions (When Kaal Sarp functions as a Maha Yoga)
    # Conditions: Jupiter or Venus in Kendras (1, 4, 7, 10), Lagna lord strong, or multiple exalted planets
    yoga_cancellation_reasons = []
    if planet_house_map.get("Jupiter", 0) in [1, 4, 7, 10]:
        yoga_cancellation_reasons.append("Jupiter is in a powerful Kendra, protecting the native with divine wisdom.")
    if planet_house_map.get("Venus", 0) in [1, 4, 7, 10]:
        yoga_cancellation_reasons.append("Venus is in a Kendra, bestowing worldly grace and aesthetic protection.")
    
    exalted_count = sum(1 for p in planets_enriched if p.get("dignity") == "Exalted")
    if exalted_count >= 1:
        yoga_cancellation_reasons.append(f"{exalted_count} Grahas are Exalted, elevating hardship into high worldly prestige.")
        
    is_yoga_elevated = len(yoga_cancellation_reasons) > 0 and (is_purna or is_anshik)
    
    return {
        "dosha_status": dosha_status,
        "is_purna": is_purna,
        "is_anshik": is_anshik,
        "is_present": is_purna or is_anshik,
        "type_id": type_info["id"],
        "type_name": type_info["name"],
        "type_sanskrit": type_info["sanskrit"],
        "rahu_house": rahu_house,
        "ketu_house": ketu_house,
        "axis_description": type_info["axis"],
        "flow_direction": flow_direction,
        "enclosed_planets": enclosed_planets,
        "outside_planets": outside_planets,
        "is_yoga_elevated": is_yoga_elevated,
        "yoga_elevation_status": (
            "Elevated into Kaal Sarp Yoga (Royal Prominence)" if is_yoga_elevated
            else "Standard Kaal Sarp Karmic Flow" if (is_purna or is_anshik)
            else "Unencumbered Planetary Distribution"
        ),
        "elevation_factors": yoga_cancellation_reasons,
        "classical_effects": type_info["classical_effects"],
        "specific_remedy": type_info["remedy"],
        "universal_remedies": AUTHENTIC_KAAL_SARP_REMEDIES,
        "all_12_types_catalog": list(KAAL_SARP_TYPES_CATALOG.values())
    }
