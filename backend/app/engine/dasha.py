"""
Vimshottari Dasha Engine (120-Year Parashari Cycle).
Calculates birth dasha balance, Mahadasha, Antardasha, and Pratyantardasha hierarchy,
with active period detection.
"""
from datetime import datetime, timedelta
from typing import Dict, List, Any, Tuple
from ..models.jyotish import VIMSHOTTARI_DASHA_ORDER, NAKSHATRAS

# Map Nakshatra lord sequence to order indices
DASHA_ORDER_PLANETS = [planet for planet, _ in VIMSHOTTARI_DASHA_ORDER]
DASHA_DURATIONS = {planet: duration for planet, duration in VIMSHOTTARI_DASHA_ORDER}

def add_fractional_years(base_date: datetime, fractional_years: float) -> datetime:
    """Add precise fractional years (using 365.2425 days/year) to a datetime."""
    days = fractional_years * 365.2425
    return base_date + timedelta(days=days)

def calculate_vimshottari_dasha(moon_longitude: float, birth_datetime: datetime, target_datetime: datetime = None) -> Dict[str, Any]:
    """
    Generate full 120-year hierarchical Vimshottari Dasha structure down to Pratyantardasha.
    """
    if target_datetime is None:
        target_datetime = datetime.now()
        
    norm_moon_deg = moon_longitude % 360.0
    nak_span = 360.0 / 27.0 # 13.333333°
    nak_idx = int(norm_moon_deg / nak_span)
    if nak_idx >= 27:
        nak_idx = 26
        
    nak_info = NAKSHATRAS[nak_idx]
    starting_lord = nak_info["lord"]
    
    deg_in_nak = norm_moon_deg - (nak_idx * nak_span)
    fraction_elapsed = deg_in_nak / nak_span
    fraction_remaining = 1.0 - fraction_elapsed
    
    start_lord_idx = DASHA_ORDER_PLANETS.index(starting_lord)
    total_start_years = DASHA_DURATIONS[starting_lord]
    balance_years = total_start_years * fraction_remaining
    
    starting_balance = {
        "nakshatra": nak_info["name"],
        "nakshatra_lord": starting_lord,
        "balance_years": round(balance_years, 3),
        "fraction_remaining": round(fraction_remaining, 4),
        "deg_in_nakshatra": round(deg_in_nak, 4)
    }
    
    # Build 120-year cycle
    mahadashas = []
    current_start_date = birth_datetime
    
    active_maha = starting_lord
    active_antar = ""
    active_pratyantar = ""
    
    for cycle_offset in range(9):
        lord_idx = (start_lord_idx + cycle_offset) % 9
        maha_planet = DASHA_ORDER_PLANETS[lord_idx]
        
        # If first dasha, duration is the remaining balance
        if cycle_offset == 0:
            maha_duration_years = balance_years
        else:
            maha_duration_years = DASHA_DURATIONS[maha_planet]
            
        maha_end_date = add_fractional_years(current_start_date, maha_duration_years)
        is_maha_active = current_start_date <= target_datetime < maha_end_date
        if is_maha_active:
            active_maha = maha_planet
            
        # Build Antardashas
        # For regular full dasha, antardashas start from the maha lord itself
        antardashas = []
        antar_start_date = current_start_date
        
        for a_offset in range(9):
            a_lord_idx = (lord_idx + a_offset) % 9
            antar_planet = DASHA_ORDER_PLANETS[a_lord_idx]
            
            # Normal full antardasha duration in years
            full_antar_years = DASHA_DURATIONS[maha_planet] * (DASHA_DURATIONS[antar_planet] / 120.0)
            
            # If first Mahadasha, proportion by balance/total
            if cycle_offset == 0:
                actual_antar_years = full_antar_years * (balance_years / total_start_years)
            else:
                actual_antar_years = full_antar_years
                
            antar_end_date = add_fractional_years(antar_start_date, actual_antar_years)
            is_antar_active = is_maha_active and (antar_start_date <= target_datetime < antar_end_date)
            if is_antar_active:
                active_antar = antar_planet
                
            # Build Pratyantardashas
            pratyantardashas = []
            prat_start_date = antar_start_date
            
            for p_offset in range(9):
                p_lord_idx = (a_lord_idx + p_offset) % 9
                prat_planet = DASHA_ORDER_PLANETS[p_lord_idx]
                
                # Pratyantar duration
                prat_years = actual_antar_years * (DASHA_DURATIONS[prat_planet] / 120.0)
                prat_end_date = add_fractional_years(prat_start_date, prat_years)
                
                is_prat_active = is_antar_active and (prat_start_date <= target_datetime < prat_end_date)
                if is_prat_active:
                    active_pratyantar = prat_planet
                    
                pratyantardashas.append({
                    "planet": prat_planet,
                    "start_date": prat_start_date.strftime("%Y-%m-%d"),
                    "end_date": prat_end_date.strftime("%Y-%m-%d"),
                    "duration_days": round(prat_years * 365.2425, 1),
                    "is_active": is_prat_active
                })
                prat_start_date = prat_end_date
                
            antardashas.append({
                "planet": antar_planet,
                "start_date": antar_start_date.strftime("%Y-%m-%d"),
                "end_date": antar_end_date.strftime("%Y-%m-%d"),
                "duration_months": round(actual_antar_years * 12.0, 1),
                "is_active": is_antar_active,
                "pratyantardashas": pratyantardashas
            })
            antar_start_date = antar_end_date
            
        mahadashas.append({
            "planet": maha_planet,
            "start_date": current_start_date.strftime("%Y-%m-%d"),
            "end_date": maha_end_date.strftime("%Y-%m-%d"),
            "duration_years": round(maha_duration_years, 2),
            "is_active": is_maha_active,
            "antardashas": antardashas
        })
        current_start_date = maha_end_date
        
    active_period_string = f"{active_maha} - {active_antar or active_maha} - {active_pratyantar or active_antar or active_maha}"
    
    return {
        "starting_balance": starting_balance,
        "active_mahadasha": active_maha,
        "active_antardasha": active_antar or active_maha,
        "active_pratyantardasha": active_pratyantar or active_antar or active_maha,
        "active_period_string": active_period_string,
        "mahadashas": mahadashas
    }
