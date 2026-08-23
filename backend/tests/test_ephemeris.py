import pytest
from app.engine.ephemeris import (
    calculate_julian_day,
    get_lahiri_ayanamsa,
    calculate_sidereal_ascendant,
    get_nakshatra_info,
    get_sign_info,
    calculate_planetary_positions
)

def test_julian_day_calculation():
    # J2000.0 epoch: 2000-01-01 12:00:00 UT = 2451545.0
    jd = calculate_julian_day(2000, 1, 1, 12, 0, 0.0, timezone_offset=0.0)
    assert abs(jd - 2451545.0) < 1e-5

def test_lahiri_ayanamsa():
    # At J2000.0 (JD 2451545.0), Lahiri ayanamsa is approx 23.857°
    jd_2000 = 2451545.0
    ayanamsa_2000 = get_lahiri_ayanamsa(jd_2000)
    assert round(ayanamsa_2000, 2) == 23.86
    
    # In 2026, ayanamsa should be approx 24.22°
    jd_2026 = calculate_julian_day(2026, 1, 1, 0, 0, 0.0, 0.0)
    ayanamsa_2026 = get_lahiri_ayanamsa(jd_2026)
    assert 24.20 <= ayanamsa_2026 <= 24.25

def test_nakshatra_mapping():
    # 0 deg = Ashwini Pada 1
    ashwini = get_nakshatra_info(1.0)
    assert ashwini["nakshatra_name"] == "Ashwini"
    assert ashwini["nakshatra_pada"] == 1
    assert ashwini["nakshatra_lord"] == "Ketu"
    
    # 45 deg = Rohini Pada 2 (Rohini spans 40° to 53°20')
    rohini = get_nakshatra_info(45.0)
    assert rohini["nakshatra_name"] == "Rohini"
    assert rohini["nakshatra_lord"] == "Moon"

def test_sign_mapping():
    # 15 deg = Aries
    s_id, s_name, s_sans, deg = get_sign_info(15.5)
    assert s_id == 1
    assert s_name == "Aries"
    assert s_sans == "Mesha"
    assert round(deg, 1) == 15.5
    
    # 35 deg = Taurus 5 deg
    s_id, s_name, s_sans, deg = get_sign_info(35.0)
    assert s_id == 2
    assert s_name == "Taurus"
    assert round(deg, 1) == 5.0

def test_planetary_positions():
    jd = calculate_julian_day(1995, 5, 15, 14, 30, 0.0, timezone_offset=5.5)
    ayanamsa = get_lahiri_ayanamsa(jd)
    planets = calculate_planetary_positions(jd, ayanamsa, ascendant_sign_id=6)
    
    assert len(planets) == 9
    names = [p["name"] for p in planets]
    for required in ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]:
        assert required in names
