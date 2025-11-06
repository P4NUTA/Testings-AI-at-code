import type { ItineraryRequest, Itinerary } from '../types';

const API_BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

export async function generateItinerary(request: ItineraryRequest): Promise<Itinerary> {
  const response = await fetch(`${API_BASE}/itinerary/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...request,
      date: request.date || new Date().toISOString()
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate itinerary');
  }

  const result = await response.json();
  return result.data;
}
