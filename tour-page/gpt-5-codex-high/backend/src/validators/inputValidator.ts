import { z } from 'zod';
import { TravelerPreferences } from '../types';

const preferencesSchema = z.object({
  days: z.number().int().min(1).max(3),
  language: z.union([z.literal('ru'), z.literal('en')]).default('ru'),
  budgetLevel: z.union([z.literal('economy'), z.literal('standard'), z.literal('comfort')]).default('standard'),
  mobilityLevel: z.union([z.literal('average'), z.literal('low-impact')]).default('low-impact'),
  season: z.union([z.literal('summer'), z.literal('shoulder'), z.literal('winter')]).default('summer')
});

export const validatePreferences = (payload: unknown): TravelerPreferences => {
  return preferencesSchema.parse(payload);
};
