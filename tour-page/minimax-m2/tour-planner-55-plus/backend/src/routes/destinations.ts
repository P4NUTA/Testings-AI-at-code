import { Router } from 'express';
import { prisma } from '../index';
import { filterDestinationsSchema } from '../types/schemas';
import { requestValidator } from '../middleware/requestValidator';

const router = Router();

router.get('/', requestValidator(filterDestinationsSchema), async (req, res) => {
  try {
    const { city, category, isIndoor, minPrice, maxPrice, accessibility } = req.query;

    const where: any = {};

    if (city) {
      where.city = city;
    }

    if (category) {
      where.category = category;
    }

    if (isIndoor === 'true') {
      where.isIndoor = true;
    } else if (isIndoor === 'false') {
      where.isIndoor = false;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    if (accessibility === 'true') {
      where.OR = [
        { elevatorAvailable: true },
        { wheelchairAccessible: true },
        { stairsLevel: 'none' },
        { stairsLevel: 'few' },
      ];
    }

    const destinations = await prisma.destination.findMany({
      where,
      include: {
        nearbyAttractions: true,
      },
      orderBy: [
        { accessibilityScore: 'desc' },
        { restAreas: 'desc' },
      ],
    });

    res.json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch destinations',
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

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        nearbyAttractions: true,
      },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        error: 'Destination not found',
      });
    }

    res.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch destination',
    });
  }
});

router.get('/cities/list', async (req, res) => {
  try {
    const cities = await prisma.destination.findMany({
      select: {
        city: true,
      },
      distinct: ['city'],
    });

    res.json({
      success: true,
      data: cities.map(c => c.city),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cities',
    });
  }
});

router.get('/categories/list', async (req, res) => {
  try {
    const categories = await prisma.destination.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    res.json({
      success: true,
      data: categories.map(c => c.category),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories',
    });
  }
});

export default router;
