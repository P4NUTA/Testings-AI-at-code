import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import { requestValidator } from './middleware/requestValidator';
import destinationRoutes from './routes/destinations';
import itineraryRoutes from './routes/itineraries';
import hotelRoutes from './routes/hotels';
import restaurantRoutes from './routes/restaurants';
import transportationRoutes from './routes/transportation';
import healthRoutes from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/itineraries', itineraryRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/transportation', transportationRoutes);

app.use(errorHandler);

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Tour Planner 55+ API',
    version: '1.0.0',
    status: 'active',
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/v1/health`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export { app, prisma };
