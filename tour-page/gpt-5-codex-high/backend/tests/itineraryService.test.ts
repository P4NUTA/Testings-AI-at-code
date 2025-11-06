import { generateItinerary } from '../src/services/itineraryService';

describe('generateItinerary', () => {
  it('builds deterministic plan for 2 days', () => {
    const result = generateItinerary({
      days: 2,
      language: 'ru',
      budgetLevel: 'standard',
      mobilityLevel: 'low-impact',
      season: 'summer'
    });

    expect(result.summary.days).toBe(2);
    expect(result.plan[0]!.segments.length).toBeGreaterThan(0);
    expect(result.plan[0]!.segments[0]!.attractionId).toBe('ladoga-cruise');
  });

  it('filters options for winter season', () => {
    const result = generateItinerary({
      days: 1,
      language: 'en',
      budgetLevel: 'economy',
      mobilityLevel: 'average',
      season: 'winter'
    });

    expect(result.plan[0]!.segments.every((seg) => seg.indoor)).toBe(true);
  });
});
