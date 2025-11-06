import { Router } from 'express';
import { prisma } from '../index';
import { createHotelSchema } from '../types/schemas';
import { requestValidator } from '../middleware/requestValidator';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, stars, accessibility } = req.query;

    const where: any = {};

    if (city) {
      where.city = city;
    }

    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseFloat(minPrice as string);
      if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice as string);
    }

    if (stars) {
      where.stars = parseInt(stars as string);
    }

    if (accessibility === 'true') {
      where.OR = [
        { accessibilityFeatures: { path: ['elevator'], equals: true } },
        { accessibilityFeatures: { path: ['wheelchairAccessible'], equals: true } },
        { accessibilityFeatures: { path: ['ramp'], equals: true } },
      ];
    }

    const hotels = await prisma.hotel.findMany({
      where,
      orderBy: { stars: 'desc' },
    });

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch hotels',
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

    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found',
      });
    }

    res.json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch hotel',
    });
  }
});

export default router;
