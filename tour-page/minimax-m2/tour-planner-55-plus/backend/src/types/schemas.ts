import { z } from 'zod';

export const generateItinerarySchema = z.object({
  body: z.object({
    days: z.number().min(1).max(3),
    startDate: z.string(),
    budget: z.number().min(1000).max(100000),
    city: z.string().min(1),
    preferences: z.object({
      accessibility: z.boolean().default(true),
      avoidStairs: z.boolean().default(true),
      maxWalkingDistance: z.number().default(500),
      restAreas: z.boolean().default(true),
      indoorPreference: z.enum(['indoor', 'outdoor', 'mixed']).default('mixed'),
    }).default({}),
  }),
});

export const filterDestinationsSchema = z.object({
  query: z.object({
    city: z.string().optional(),
    category: z.string().optional(),
    isIndoor: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    accessibility: z.string().optional(),
  }),
});

export const createHotelSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    nameEn: z.string().min(1),
    city: z.string().min(1),
    description: z.string().min(10),
    descriptionEn: z.string().min(10),
    pricePerNight: z.number().min(0),
    stars: z.number().min(1).max(5),
    amenities: z.array(z.string()),
    accessibilityFeatures: z.object({
      elevator: z.boolean().default(false),
      wheelchairAccessible: z.boolean().default(false),
      ramp: z.boolean().default(false),
    }),
    images: z.array(z.string()).default([]),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const updateItinerarySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    preferences: z.object({
      accessibility: z.boolean().optional(),
      avoidStairs: z.boolean().optional(),
      maxWalkingDistance: z.number().optional(),
      restAreas: z.boolean().optional(),
      indoorPreference: z.enum(['indoor', 'outdoor', 'mixed']).optional(),
    }).optional(),
  }),
});
