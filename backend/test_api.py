import pytest
from app import app  

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_analyze_market_valid(client):
    response = client.post('/analyze-market', json={
        "industry": "Technology",
        "region": "global",
        "depth": "basic"
    })
    assert response.status_code == 200
    assert 'predicted_growth' in response.json  # Ensure predicted_growth is part of the response

def test_analyze_market_invalid(client):
    response = client.post('/analyze-market', json={
        "industry": "",
        "region": "global",
        "depth": "basic"
    })
    assert response.status_code == 400
    assert response.json['error'] == 'Industry is required'  # Check for the error message

def test_analyze_market_edge_case(client):
    response = client.post('/analyze-market', json={
        "industry": "Health",
        "region": "global",
        "depth": "advanced"
    })
    assert response.status_code == 200
    assert 'predicted_growth' in response.json  # Ensure response includes predicted growth data

