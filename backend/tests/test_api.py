import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_calculate_endpoint():
    payload = {
        "name": "Arjuna",
        "birth_date": "1995-05-15",
        "birth_time": "14:30:00",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "timezone": 5.5,
        "city": "New Delhi"
    }
    response = client.post("/api/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "ascendant" in data
    assert len(data["planets"]) == 9
    assert "D1" in data["vargas"]
    assert "D9" in data["vargas"]
    assert "D10" in data["vargas"]
    assert "vimshottari_dasha" in data
    assert "sarvashtakavarga" in data
    assert "numerology" in data
    assert len(data["scriptural_insights"]) > 0

def test_numerology_endpoint():
    payload = {
        "name": "Krishna",
        "birth_date": "1990-08-20"
    }
    response = client.post("/api/numerology", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["mulank"] == 2 # 20 -> 2
    assert "namank" in data
    assert "synergy_score" in data
