"""
High-Precision Ephemeris and Sidereal Ayanamsa Engine.
Calculates Julian Days, Lahiri (Chitra Paksha) Ayanamsa, Sidereal Planetary Longitudes,
Ascendant (Lagna), Retrograde status, and Combustion.
"""
import math
import ephem
from datetime import datetime
from typing import Dict, Any, List, Tuple
from ..models.jyotish import ZODIAC_SIGNS, NAKSHATRAS, PLANETARY_DIGNITIES

def format_dms(degrees: float) -> str:
    """Format decimal degrees into D° M' S'' string."""
    d = int(degrees)
    m_full = (degrees - d) * 60.0
    m = int(m_full)
    s = int(round((m_full - m) * 60.0))
    if s >= 60:
        s = 0
        m += 1
    if m >= 60:
        m = 0
        d += 1
    return f"{d:02d}° {m:02d}' {s:02d}''"

def calculate_julian_day(year: int, month: int, day: int, hour: int, minute: int, second: float, timezone_offset: float) -> float:
    """
    Calculate Julian Day Number for Universal Time (UT).
    """
    # Convert local time to UTC decimal hours
    utc_hours = hour + (minute / 60.0) + (second / 3600.0) - timezone_offset
    
    # Adjust day if UTC hours crosses midnight
    day_fraction = utc_hours / 24.0
    
    if month <= 2:
        year -= 1
        month += 12
    
    a = math.floor(year / 100)
    b = 2 - a + math.floor(a / 4)
    
    jd = math.floor(365.25 * (year + 4716)) + math.floor(30.6001 * (month + 1)) + day + day_fraction + b - 1524.5
    return jd

def get_lahiri_ayanamsa(jd: float) -> float:
    """
    Compute exact Lahiri (Chitra Paksha) Ayanamsa for the given Julian Day.
    Standard IAU / Indian Astronomical Ephemeris model.
    Ayanamsa at J2000.0 (JD 2451545.0) = 23° 51' 25.53" = 23.85709167°
    Precession rate: 50.290966 arcsec / tropical year.
    """
    t = (jd - 2451545.0) / 36525.0
    # Higher order polynomial for Lahiri ayanamsa
    ayanamsa = 23.85709167 + 1.396971278 * t + 0.0003086 * (t ** 2)
    return ayanamsa

def get_obliquity_of_ecliptic(t: float) -> float:
    """Mean obliquity of the ecliptic in degrees."""
    eps0 = 23.43929111 - (46.8150 * t + 0.00059 * (t ** 2) - 0.001813 * (t ** 3)) / 3600.0
    return eps0

def calculate_sidereal_ascendant(jd: float, latitude: float, longitude: float, ayanamsa: float) -> float:
    """
    Calculate Sidereal Ascendant (Lagna) in degrees (0 - 360°).
    Uses rigorous spherical trigonometry for the Eastern rising ecliptic intersection.
    """
    t = (jd - 2451545.0) / 36525.0
    
    # Greenwich Mean Sidereal Time (GMST) in degrees
    gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * (t ** 2) - (t ** 3) / 38710000.0
    gmst = gmst % 360.0
    if gmst < 0:
        gmst += 360.0
    
    # Local Sidereal Time (RAMC in degrees)
    ramc = (gmst + longitude) % 360.0
    if ramc < 0:
        ramc += 360.0
        
    ramc_rad = math.radians(ramc)
    lat_rad = math.radians(latitude)
    eps_deg = get_obliquity_of_ecliptic(t)
    eps_rad = math.radians(eps_deg)
    
    # Standard Spherical Astronomy Ascendant (Lagna) formula:
    # tan(Asc_trop) = cos(RAMC) / (-sin(RAMC)*cos(eps) - tan(lat)*sin(eps))
    y = math.cos(ramc_rad)
    x = -math.sin(ramc_rad) * math.cos(eps_rad) - math.tan(lat_rad) * math.sin(eps_rad)
    
    asc_trop_rad = math.atan2(y, x)
    asc_trop_deg = math.degrees(asc_trop_rad) % 360.0
    if asc_trop_deg < 0:
        asc_trop_deg += 360.0
        
    # Convert Tropical Ascendant to Sidereal (Nirayana / Lahiri)
    asc_sid_deg = (asc_trop_deg - ayanamsa) % 360.0
    if asc_sid_deg < 0:
        asc_sid_deg += 360.0
        
    return asc_sid_deg

def get_nakshatra_info(longitude: float) -> Dict[str, Any]:
    """
    Determine Nakshatra index (1-27), name, pada (1-4), lord, and deity from longitude.
    Each Nakshatra spans 13° 20' (13.333333°).
    Each Pada spans 3° 20' (3.333333°).
    """
    normalized_deg = longitude % 360.0
    nakshatra_idx = int(normalized_deg / (360.0 / 27.0))
    if nakshatra_idx >= 27:
        nakshatra_idx = 26
        
    nak_data = NAKSHATRAS[nakshatra_idx]
    deg_in_nak = normalized_deg - (nakshatra_idx * (360.0 / 27.0))
    pada = int(deg_in_nak / (360.0 / 108.0)) + 1
    if pada > 4:
        pada = 4
        
    return {
        "nakshatra_id": nak_data["id"],
        "nakshatra_name": nak_data["name"],
        "nakshatra_pada": pada,
        "nakshatra_lord": nak_data["lord"],
        "nakshatra_deity": nak_data["deity"],
        "nakshatra_symbol": nak_data["symbol"]
    }

def get_sign_info(longitude: float) -> Tuple[int, str, str, float]:
    """
    Return (sign_id, sign_name, sign_sanskrit, degrees_in_sign).
    """
    norm = longitude % 360.0
    sign_idx = int(norm / 30.0)
    sign_id = sign_idx + 1
    sign_name = ZODIAC_SIGNS[sign_idx]["name"]
    sign_sanskrit = ZODIAC_SIGNS[sign_idx]["sanskrit"]
    deg_in_sign = norm - (sign_idx * 30.0)
    return sign_id, sign_name, sign_sanskrit, deg_in_sign

def calculate_planetary_positions(jd: float, ayanamsa: float, ascendant_sign_id: int) -> List[Dict[str, Any]]:
    """
    Compute sidereal positions for the 9 classical Vedic Grahas:
    Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu.
    """
    # PyEphem date representation (Dublin Julian Date = JD - 2415020.0)
    ephem_date = ephem.Date(jd - 2415020.0)
    
    bodies = {
        "Sun": ephem.Sun(),
        "Moon": ephem.Moon(),
        "Mars": ephem.Mars(),
        "Mercury": ephem.Mercury(),
        "Jupiter": ephem.Jupiter(),
        "Venus": ephem.Venus(),
        "Saturn": ephem.Saturn(),
    }
    
    positions: Dict[str, Dict[str, Any]] = {}
    
    # Calculate for physical planets
    delta_t = 0.001 # small offset for calculating speed/retrograde
    for name, body in bodies.items():
        body.compute(ephem_date)
        ecl_lon_trop_rad = ephem.Ecliptic(body).lon
        ecl_lon_trop_deg = math.degrees(ecl_lon_trop_rad) % 360.0
        
        # Next step for speed
        body.compute(ephem.Date(ephem_date + delta_t))
        next_lon = math.degrees(ephem.Ecliptic(body).lon) % 360.0
        
        # Handle wrap around 0/360
        diff = next_lon - ecl_lon_trop_deg
        if diff > 180:
            diff -= 360
        elif diff < -180:
            diff += 360
        speed_deg_day = diff / delta_t
        
        is_retrograde = speed_deg_day < 0.0 and name not in ["Sun", "Moon"]
        
        # Sidereal longitude
        sidereal_lon = (ecl_lon_trop_deg - ayanamsa) % 360.0
        if sidereal_lon < 0:
            sidereal_lon += 360.0
            
        sign_id, sign_name, sign_sanskrit, deg_in_sign = get_sign_info(sidereal_lon)
        nak_info = get_nakshatra_info(sidereal_lon)
        
        house = ((sign_id - ascendant_sign_id) % 12) + 1
        
        positions[name] = {
            "name": name,
            "longitude": sidereal_lon,
            "sign_id": sign_id,
            "sign_name": sign_name,
            "sign_sanskrit": sign_sanskrit,
            "house": house,
            "degrees_in_sign": deg_in_sign,
            "formatted_dms": format_dms(deg_in_sign),
            "is_retrograde": is_retrograde,
            "speed": speed_deg_day,
            **nak_info
        }
    
    # Calculate Lunar Nodes: Rahu (North Node) and Ketu (South Node)
    # Using classical high precision Mean Lunar Ascending Node formula
    # T = (JD - 2451545.0) / 36525.0
    t = (jd - 2451545.0) / 36525.0
    rahu_mean_trop = 125.04452 - 1934.136261 * t + 0.0020708 * (t ** 2) + (t ** 3) / 450000.0
    rahu_mean_trop = rahu_mean_trop % 360.0
    if rahu_mean_trop < 0:
        rahu_mean_trop += 360.0
        
    rahu_sidereal = (rahu_mean_trop - ayanamsa) % 360.0
    if rahu_sidereal < 0:
        rahu_sidereal += 360.0
        
    ketu_sidereal = (rahu_sidereal + 180.0) % 360.0
    
    for node_name, node_lon in [("Rahu", rahu_sidereal), ("Ketu", ketu_sidereal)]:
        sign_id, sign_name, sign_sanskrit, deg_in_sign = get_sign_info(node_lon)
        nak_info = get_nakshatra_info(node_lon)
        house = ((sign_id - ascendant_sign_id) % 12) + 1
        positions[node_name] = {
            "name": node_name,
            "longitude": node_lon,
            "sign_id": sign_id,
            "sign_name": sign_name,
            "sign_sanskrit": sign_sanskrit,
            "house": house,
            "degrees_in_sign": deg_in_sign,
            "formatted_dms": format_dms(deg_in_sign),
            "is_retrograde": True, # Nodes are always naturally retrograde
            "speed": -0.0529, # Mean node motion deg/day
            **nak_info
        }
        
    # Check Combustion (Asta) for planets in close proximity to Sun
    sun_lon = positions["Sun"]["longitude"]
    combustion_limits = {
        "Moon": 12.0, "Mars": 17.0, "Mercury": 14.0, "Jupiter": 11.0, "Venus": 10.0, "Saturn": 15.0
    }
    for p_name, limit in combustion_limits.items():
        p_lon = positions[p_name]["longitude"]
        ang_dist = abs(p_lon - sun_lon)
        if ang_dist > 180.0:
            ang_dist = 360.0 - ang_dist
        positions[p_name]["is_combust"] = ang_dist < limit
        
    positions["Sun"]["is_combust"] = False
    positions["Rahu"]["is_combust"] = False
    positions["Ketu"]["is_combust"] = False
    
    return list(positions.values())
