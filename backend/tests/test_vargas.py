import pytest
from app.engine.vargas import (
    calculate_navamsha_sign,
    calculate_dashamsha_sign,
    determine_dignity,
    process_vargas_and_dignities
)

def test_navamsha_calculation():
    # 0 to 3.33 deg Aries -> Navamsha 1 (Aries)
    assert calculate_navamsha_sign(2.0) == 1
    # 3.33 to 6.66 deg Aries -> Navamsha 2 (Taurus)
    assert calculate_navamsha_sign(5.0) == 2
    # 30 deg to 33.33 deg (Taurus 0-3°20') -> For fixed sign Taurus, Navamsha begins at 9th from Taurus = Capricorn (Sign 10)
    # Pada index for 31 deg = int(31 / 3.333333) = 9. 9 % 12 + 1 = 10 (Capricorn)
    assert calculate_navamsha_sign(31.0) == 10

def test_dashamsha_calculation():
    # Odd sign (Aries = 1), 0-3 deg -> part 0 -> Sign 1 (Aries)
    assert calculate_dashamsha_sign(1, 2.0) == 1
    # Odd sign (Aries = 1), 3-6 deg -> part 1 -> Sign 2 (Taurus)
    assert calculate_dashamsha_sign(1, 4.5) == 2
    # Even sign (Taurus = 2), 0-3 deg -> 9th from Taurus = Capricorn (10)
    assert calculate_dashamsha_sign(2, 1.5) == 10

def test_dignity():
    # Sun in Aries (Sign 1) is Exalted
    assert determine_dignity("Sun", 1, 10.0, {"Sun": 1, "Mars": 1}) == "Exalted"
    # Sun in Libra (Sign 7) is Debilitated
    assert determine_dignity("Sun", 7, 10.0, {"Sun": 7, "Venus": 7}) == "Debilitated"
    # Jupiter in Cancer (Sign 4) is Exalted
    assert determine_dignity("Jupiter", 4, 5.0, {"Jupiter": 4, "Moon": 4}) == "Exalted"
    # Mars in Capricorn (Sign 10) is Exalted
    assert determine_dignity("Mars", 10, 28.0, {"Mars": 10, "Saturn": 10}) == "Exalted"
