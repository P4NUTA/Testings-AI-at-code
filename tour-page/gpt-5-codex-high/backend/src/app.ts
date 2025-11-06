import express from 'express';
import cors from 'cors';
import itinerariesRouter from './routes/itineraries';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'tour-planner-api' });
});

app.use('/api/itineraries', itinerariesRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
});

export default app;
