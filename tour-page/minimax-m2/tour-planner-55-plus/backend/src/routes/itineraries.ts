import { Router } from 'express';
import { itineraryService } from '../services/itineraryService';
import { generateItinerarySchema } from '../types/schemas';
import { requestValidator } from '../middleware/requestValidator';

const router = Router();

router.post('/generate', requestValidator(generateItinerarySchema), async (req, res) => {
  try {
    const { days, startDate, budget, city, preferences } = req.body;

    const result = await itineraryService.generateItinerary({
      days,
      startDate: new Date(startDate),
      budget,
      city,
      preferences,
    });

    res.json({
      success: true,
      data: result,
      metadata: {
        generatedAt: new Date().toISOString(),
        duration: days,
        budget,
        city,
      },
    });
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('Not enough') ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate itinerary',
    });
  }
});

router.post('/save', async (req, res) => {
  try {
    const { userId, days, startDate, budget, preferences, itinerary, totalCost } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
    }

    const saved = await itineraryService.saveItinerary(userId, {
      days,
      startDate: new Date(startDate),
      budget,
      preferences,
      itinerary,
      totalCost,
    });

    res.status(201).json({
      success: true,
      data: saved,
      message: 'Itinerary saved successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save itinerary',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
      });
    }

    const itinerary = await itineraryService.getItineraryById(id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found',
      });
    }

    res.json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch itinerary',
    });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const itineraries = await (await import('../index')).prisma.itinerary.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      count: itineraries.length,
      data: itineraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user itineraries',
    });
  }
});

export default router;
