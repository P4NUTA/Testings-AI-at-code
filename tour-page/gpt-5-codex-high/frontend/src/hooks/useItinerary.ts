import { useState } from 'react';
import type { Locale } from '../i18n';
import type { ItineraryResponse, PlannerFormValues } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const useItinerary = (locale: Locale) => {
  const [data, setData] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: PlannerFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/itineraries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, language: locale })
      });

      if (!response.ok) {
        const message = await response.json().catch(() => ({ message: 'Invalid payload' }));
        throw new Error(message?.message ?? 'Unknown error');
      }

      const payload = (await response.json()) as ItineraryResponse;
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, submit };
};
