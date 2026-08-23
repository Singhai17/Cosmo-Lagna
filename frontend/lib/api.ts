import { BirthDataRequest, FullAstrologicalResponse, NumerologyRequest, VedicNumerologyResponse } from '../types/jyotish';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchHoroscope(data: BirthDataRequest): Promise<FullAstrologicalResponse> {
  const response = await fetch(`${API_BASE}/api/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Calculation request failed' }));
    throw new Error(err.detail || `Server error ${response.status}`);
  }

  return response.json();
}

export async function fetchNumerology(data: NumerologyRequest): Promise<VedicNumerologyResponse> {
  const response = await fetch(`${API_BASE}/api/numerology`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Numerology request failed' }));
    throw new Error(err.detail || `Server error ${response.status}`);
  }

  return response.json();
}
