import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { city, cuisine, minPrice, maxPrice, accessibility } = req.query;

    const where: any = {};

    if (city) {
      where.city = city;
    }

    if (cuisine) {
      where.cuisine = cuisine;
    }

    if (minPrice || maxPrice) {
      where.averageBill = {};
      if (minPrice) where.averageBill.gte = parseFloat(minPrice as string);
      if (maxPrice) where.averageBill.lte = parseFloat(maxPrice as string);
    }

    if (accessibility === 'true') {
      where.OR = [
        { accessibilityFeatures: { path: ['wheelchairAccessible'], equals: true } },
        { accessibilityFeatures: { path: ['elevator'], equals: true } },
        { accessibilityFeatures: { path: ['ramp'], equals: true } },
      ];
    }

    const restaurants = await prisma.restaurant.findMany({
      where,
      orderBy: { averageBill: 'asc' },
    });

    res.json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch restaurants',
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

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found',
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch restaurant',
    });
  }
});

export default router;
