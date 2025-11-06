import { Router } from 'express';
import { generateItinerary } from '../services/itineraryService';
import { validatePreferences } from '../validators/inputValidator';

const router = Router();

router.post('/', (req, res) => {
  try {
    const preferences = validatePreferences(req.body);
    const data = generateItinerary(preferences);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(400).json({ message: 'Не удалось создать маршрут.' });
  }
});

export default router;
