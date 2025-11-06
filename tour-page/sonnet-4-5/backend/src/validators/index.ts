import { z } from 'zod';

export const itineraryRequestSchema = z.object({
  days: z.number().int().min(1).max(3),
  budget: z.number().positive().max(1000000),
  mobilityLevel: z.enum(['high', 'medium', 'low']),
  interests: z.array(z.string()).default([]),
  date: z.string().datetime().optional().default(() => new Date().toISOString())
});

export type ValidatedItineraryRequest = z.infer<typeof itineraryRequestSchema>;
