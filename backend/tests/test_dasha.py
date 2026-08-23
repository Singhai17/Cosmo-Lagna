import pytest
from datetime import datetime
from app.engine.dasha import calculate_vimshottari_dasha

def test_vimshottari_dasha_calculation():
    # Ashwini Moon (0 to 13.33 deg) -> Ketu Dasha
    # 6.66666 deg = exactly 50% elapsed of Ketu's 7 years = 3.5 years remaining
    birth_dt = datetime(1995, 1, 1, 12, 0, 0)
    dasha = calculate_vimshottari_dasha(6.666666, birth_dt, target_datetime=datetime(2026, 1, 1))
    
    assert dasha["starting_balance"]["nakshatra"] == "Ashwini"
    assert dasha["starting_balance"]["nakshatra_lord"] == "Ketu"
    assert abs(dasha["starting_balance"]["balance_years"] - 3.5) < 0.1
    assert len(dasha["mahadashas"]) == 9
    
    # Check that each Mahadasha has 9 Antardashas
    for m in dasha["mahadashas"]:
        assert len(m["antardashas"]) == 9
        for a in m["antardashas"]:
            assert len(a["pratyantardashas"]) == 9

    assert dasha["active_mahadasha"] != ""
    assert dasha["active_period_string"] != ""
