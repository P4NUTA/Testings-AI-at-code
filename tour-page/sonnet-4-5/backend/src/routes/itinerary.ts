import express from 'express';
import { itineraryRequestSchema } from '../validators/index.js';
import { generateItinerary } from '../services/itineraryGenerator.js';

const router = express.Router();

router.post('/generate', (req, res) => {
  try {
    const validated = itineraryRequestSchema.parse(req.body);
    const itinerary = generateItinerary(validated);
    res.json({ success: true, data: itinerary });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server error',
        message: error.message
      });
    }
  }
});

export default router;
