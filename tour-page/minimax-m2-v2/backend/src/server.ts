import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { generateItinerary } from './itineraryGenerator.js';
import { ItineraryRequest } from './types.js';
import { attractions } from './data/attractions.js';
import { hotels } from './data/hotels.js';
import { restaurants } from './data/restaurants.js';
import { transportOptions } from './data/transport.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const itinerarySchema = z.object({
  duration: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  startCity: z.string(),
  interests: z.array(z.string()),
  budget: z.union([z.literal('economy'), z.literal('standard'), z.literal('comfort')]),
  mobilityLevel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  transportPreference: z.union([z.literal('private'), z.literal('public'), z.literal('mixed')]),
  season: z.union([z.literal('spring'), z.literal('summer'), z.literal('autumn'), z.literal('winter')]),
  weatherSensitive: z.boolean()
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.post('/api/itinerary', (req, res) => {
  try {
    const request = itinerarySchema.parse(req.body) as ItineraryRequest;

    if (!request.startCity || request.startCity.trim() === '') {
      return res.status(400).json({
        error: 'Start city is required',
        code: 'INVALID_INPUT'
      });
    }

    if (request.interests.length === 0) {
      request.interests = ['museum', 'palace', 'historical', 'church', 'nature'];
    }

    const itinerary = generateItinerary(request);

    res.json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid input data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }

    console.error('Error generating itinerary:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

app.get('/api/attractions', (req, res) => {
  const { city, category } = req.query;

  let filtered = [...attractions];

  if (city) {
    filtered = filtered.filter(a => a.location.city.toLowerCase().includes(String(city).toLowerCase()));
  }

  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }

  res.json({
    success: true,
    data: filtered
  });
});

app.get('/api/hotels', (req, res) => {
  const { city, minRating } = req.query;

  let filtered = [...hotels];

  if (city) {
    filtered = filtered.filter(h => h.location.city.toLowerCase().includes(String(city).toLowerCase()));
  }

  if (minRating) {
    filtered = filtered.filter(h => h.rating >= Number(minRating));
  }

  res.json({
    success: true,
    data: filtered
  });
});

app.get('/api/restaurants', (req, res) => {
  const { city, cuisine } = req.query;

  let filtered = [...restaurants];

  if (city) {
    filtered = filtered.filter(r => r.location.city.toLowerCase().includes(String(city).toLowerCase()));
  }

  if (cuisine) {
    filtered = filtered.filter(r => r.cuisine.toLowerCase().includes(String(cuisine).toLowerCase()));
  }

  res.json({
    success: true,
    data: filtered
  });
});

app.get('/api/transport', (req, res) => {
  const { from, to } = req.query;

  let filtered = [...transportOptions];

  if (from) {
    filtered = filtered.filter(t => t.from.toLowerCase().includes(String(from).toLowerCase()));
  }

  if (to) {
    filtered = filtered.filter(t => t.to.toLowerCase().includes(String(to).toLowerCase()));
  }

  res.json({
    success: true,
    data: filtered
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Something went wrong',
    code: 'UNHANDLED_ERROR'
  });
});

app.listen(PORT, () => {
  console.log(`Tour Planner API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
