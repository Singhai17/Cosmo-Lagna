import pytest
from app.engine.numerology import (
    calculate_mulank,
    calculate_bhagyank,
    calculate_namank,
    process_vedic_numerology
)

def test_mulank():
    assert calculate_mulank(1) == 1
    assert calculate_mulank(10) == 1
    assert calculate_mulank(29) == 2 # 2+9 = 11 -> 1+1 = 2
    assert calculate_mulank(15) == 6 # 1+5 = 6

def test_bhagyank():
    # 1995-05-15: 1+9+9+5 + 0+5 + 1+5 = 24 + 5 + 6 = 35 -> 3+5 = 8
    assert calculate_bhagyank(1995, 5, 15) == 8

def test_chaldean_namank():
    # A=1, R=2, J=1, U=6, N=5 -> 1+2+1+6+5 = 15 -> 1+5 = 6
    res = calculate_namank("ARJUN")
    assert res["compound_sum"] == 15
    assert res["namank"] == 6

def test_full_numerology_processing():
    res = process_vedic_numerology("Arjun", 1995, 5, 15)
    assert res["mulank"] == 6
    assert res["bhagyank"] == 8
    assert res["namank"] == 6
    assert 0 <= res["synergy_score"] <= 100
