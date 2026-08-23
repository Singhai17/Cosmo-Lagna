"""
Vedic Numerology (Sankhya Shastra) Engine.
Calculates Mulank (Driver Number), Bhagyank (Destiny Number), and Chaldean Namank (Name Number)
with planetary ruler synthesis, Chaldean compound numbers (e.g., Star of the Magi, Prince of Heaven),
and resonance synergy scoring.
"""
from typing import Dict, List, Any
from ..models.jyotish import CHALDEAN_MAP, NUMEROLOGY_PROFILES, get_compound_number_info

def reduce_to_single_digit(number: int) -> int:
    """Recursively sum digits until a single digit (1-9) is obtained."""
    while number > 9:
        number = sum(int(digit) for digit in str(number))
    return number

def calculate_mulank(day: int) -> int:
    """Calculate Mulank (Driver/Radical Number) from day of birth (1-31)."""
    return reduce_to_single_digit(day)

def calculate_bhagyank(year: int, month: int, day: int) -> int:
    """Calculate Bhagyank (Destiny Number) from full date sum."""
    date_str = f"{year:04d}{month:02d}{day:02d}"
    total = sum(int(char) for char in date_str if char.isdigit())
    return reduce_to_single_digit(total)

def calculate_namank(name: str) -> Dict[str, Any]:
    """
    Calculate Chaldean Namank (Name Number), compound sum, and character breakdown.
    """
    cleaned_name = name.upper()
    breakdown = []
    compound_sum = 0
    
    for char in cleaned_name:
        if char in CHALDEAN_MAP:
            val = CHALDEAN_MAP[char]
            breakdown.append({"letter": char, "value": val})
            compound_sum += val
            
    reduced_val = reduce_to_single_digit(compound_sum) if compound_sum > 0 else 1
    
    return {
        "namank": reduced_val,
        "compound_sum": compound_sum,
        "breakdown": breakdown
    }

def calculate_synergy(mulank: int, bhagyank: int, namank: int) -> Dict[str, Any]:
    """
    Evaluate cosmic synergy between Mulank (Soul Driver), Bhagyank (Destiny Path),
    and Namank (Public Expression).
    """
    m_profile = NUMEROLOGY_PROFILES[mulank]
    b_profile = NUMEROLOGY_PROFILES[bhagyank]
    n_profile = NUMEROLOGY_PROFILES[namank]
    
    score = 70 # Base baseline harmony
    
    # Mulank vs Bhagyank
    if bhagyank in m_profile["friendly_numbers"]:
        score += 10
    elif bhagyank in m_profile["enemy_numbers"]:
        score -= 10
        
    # Namank vs Mulank
    if namank in m_profile["friendly_numbers"]:
        score += 10
    elif namank in m_profile["enemy_numbers"]:
        score -= 10
        
    # Namank vs Bhagyank
    if namank in b_profile["friendly_numbers"]:
        score += 10
    elif namank in b_profile["enemy_numbers"]:
        score -= 10
        
    score = max(30, min(100, score))
    
    # Construct Vedic commentary
    analysis = (
        f"Your Driver Number {mulank} ({m_profile['planet']}) guides your inner willpower, "
        f"while Destiny Number {bhagyank} ({b_profile['planet']}) unfolds your evolutionary life path. "
        f"Your Name Number {namank} ({n_profile['planet']}) channels social influence and creative output. "
    )
    if score >= 85:
        analysis += "The three numbers form a rare Trifold Harmonic Resonance, allowing your natural talents to effortlessly crystallize into worldly accomplishments."
    elif score >= 70:
        analysis += "There is high elemental affinity between your consciousness and expression, providing sustained clarity in decision making and spiritual discipline."
    else:
        analysis += "Your vibrational triad brings diverse planetary energies together. Aligning daily habits, colors, and focused meditation on your ruling deity will unlock immense creative dynamism."
        
    return {
        "score": score,
        "analysis": analysis
    }

def process_vedic_numerology(name: str, year: int, month: int, day: int) -> Dict[str, Any]:
    """
    Comprehensive Vedic Numerology processor with canonical Chaldean compound number synthesis.
    """
    mulank = calculate_mulank(day)
    mulank_compound = day
    mulank_comp_info = get_compound_number_info(mulank_compound)
    
    date_digits_sum = sum(int(char) for char in f"{year:04d}{month:02d}{day:02d}" if char.isdigit())
    bhagyank = reduce_to_single_digit(date_digits_sum)
    bhagyank_compound = date_digits_sum
    bhagyank_comp_info = get_compound_number_info(bhagyank_compound)
    
    namank_data = calculate_namank(name)
    namank = namank_data["namank"]
    namank_compound = namank_data["compound_sum"]
    namank_comp_info = get_compound_number_info(namank_compound)
    breakdown = namank_data["breakdown"]
    
    synergy_data = calculate_synergy(mulank, bhagyank, namank)
    
    return {
        "name": name,
        "birth_date": f"{year:04d}-{month:02d}-{day:02d}",
        "mulank": mulank,
        "mulank_compound": mulank_compound,
        "mulank_compound_name": mulank_comp_info.get("name", ""),
        "mulank_compound_meaning": mulank_comp_info.get("meaning", ""),
        "mulank_profile": {"number": mulank, **NUMEROLOGY_PROFILES[mulank]},
        
        "bhagyank": bhagyank,
        "bhagyank_compound": bhagyank_compound,
        "bhagyank_compound_name": bhagyank_comp_info.get("name", ""),
        "bhagyank_compound_meaning": bhagyank_comp_info.get("meaning", ""),
        "bhagyank_profile": {"number": bhagyank, **NUMEROLOGY_PROFILES[bhagyank]},
        
        "namank": namank,
        "namank_compound": namank_compound,
        "namank_compound_name": namank_comp_info.get("name", ""),
        "namank_compound_meaning": namank_comp_info.get("meaning", ""),
        "namank_profile": {"number": namank, **NUMEROLOGY_PROFILES[namank]},
        
        "chaldean_breakdown": breakdown,
        "synergy_score": synergy_data["score"],
        "synergy_analysis": synergy_data["analysis"]
    }
