import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { fromCity, toCity, type, accessibility } = req.query;

    const where: any = {};

    if (fromCity) {
      where.fromCity = fromCity;
    }

    if (toCity) {
      where.toCity = toCity;
    }

    if (type) {
      where.type = type;
    }

    if (accessibility === 'true') {
      where.wheelchairAccessible = true;
    }

    const routes = await prisma.transportation.findMany({
      where,
      orderBy: { price: 'asc' },
    });

    res.json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch transportation options',
    });
  }
});

router.get('/cities', async (req, res) => {
  try {
    const cities = await prisma.transportation.findMany({
      select: {
        fromCity: true,
        toCity: true,
      },
    });

    const uniqueCities = new Set([
      ...cities.map(c => c.fromCity),
      ...cities.map(c => c.toCity),
    ]);

    res.json({
      success: true,
      data: Array.from(uniqueCities).sort(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cities',
    });
  }
});

export default router;
