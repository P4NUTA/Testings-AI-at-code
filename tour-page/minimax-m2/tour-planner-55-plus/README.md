# Tour Planner 55+ for Leningrad Oblast

A full-stack web application that generates comfortable 1-3 day itineraries for senior travelers (55+) in Leningrad Oblast, Russia. Features accessibility-first design, Russian/English language support, and comprehensive mock data for popular destinations.

![Tour Planner 55+](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/Node-20+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)

## ✨ Features

### Core Functionality
- 🎯 **Smart Itinerary Generation** - AI-optimized 1-3 day travel plans
- ♿ **Accessibility-First** - Elevators, ramps, wheelchair access, rest areas
- 🌡️ **Weather-Aware** - Rainy day alternatives and indoor activities
- 💰 **Budget Tracking** - Real-time cost estimates and budget monitoring
- 🗣️ **Bilingual UI** - Russian (default) and English language support
- 📱 **PWA Support** - Offline-capable progressive web app

### Destinations Covered
- **Saint Petersburg** - Hermitage, St. Isaac's Cathedral
- **Peterhof** - Grand Palace, fountains and gardens
- **Pushkin** - Catherine Palace, Amber Room
- **Pavlovsk** - Palace and park complex
- **Gatchina** - Palace, underground passages
- **Tikhvin** - Historical center and monastery
- **Ladoga** - Lake views and promenades
- **Shlisselburg** - Oreshek Fortress

### Accessibility Features
- ✅ Elevator access verification
- ✅ Wheelchair accessibility
- ✅ Ramps and low-stairs routes
- ✅ Rest areas every 200m
- ✅ Benches throughout routes
- ✅ Senior-friendly transportation

## 🏗️ Architecture

### Tech Stack
- **Backend**
  - Node.js 20 with Express.js
  - TypeScript for type safety
  - Prisma ORM with SQLite
  - Zod for validation
  - Express rate limiting and security headers

- **Frontend**
  - React 18 with Vite
  - Chakra UI for accessibility-first design
  - React Query for data management
  - React i18next for localization
  - React Hook Form for form handling

- **Infrastructure**
  - Docker & Docker Compose
  - Nginx for frontend serving
  - Health checks and monitoring
  - Production-ready configuration

### Project Structure
```
tour-planner-55-plus/
├── backend/
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── types/          # TypeScript types
│   │   └── index.ts        # App entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed data
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── i18n/          # Internationalization
│   │   ├── store/         # State management
│   │   └── theme.ts       # Chakra UI theme
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tour-planner-55-plus
```

### 2. Start with Docker (Recommended)
```bash
docker-compose up -d
```

This will start:
- Frontend at http://localhost:3000
- Backend API at http://localhost:3001
- Health check: http://localhost:3001/api/v1/health

### 3. Verify Health Status
```bash
curl http://localhost:3001/api/v1/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

### 4. Stop Services
```bash
docker-compose down
```

## 🔧 Local Development

### Backend Setup
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Commands
```bash
# Reset database
cd backend
npm run db:reset
npm run prisma:seed

# View database
npx prisma studio
```

## 📚 API Documentation

### Health Checks
- `GET /api/v1/health` - Overall health status
- `GET /api/v1/health/ready` - Readiness check
- `GET /api/v1/health/live` - Liveness check

### Destinations
- `GET /api/v1/destinations` - List all destinations
- `GET /api/v1/destinations/:id` - Get destination by ID
- `GET /api/v1/destinations/cities/list` - List available cities
- `GET /api/v1/destinations/categories/list` - List categories

Query parameters:
- `city` - Filter by city
- `category` - Filter by category
- `isIndoor` - true/false
- `minPrice` / `maxPrice` - Price range
- `accessibility` - true/false

### Itineraries
- `POST /api/v1/itineraries/generate` - Generate new itinerary
- `POST /api/v1/itineraries/save` - Save itinerary
- `GET /api/v1/itineraries/:id` - Get itinerary by ID
- `GET /api/v1/itineraries/user/:userId` - Get user itineraries

Request body for generate:
```json
{
  "days": 2,
  "startDate": "2024-06-01",
  "budget": 10000,
  "city": "Saint Petersburg",
  "preferences": {
    "accessibility": true,
    "avoidStairs": true,
    "maxWalkingDistance": 500,
    "restAreas": true,
    "indoorPreference": "mixed"
  }
}
```

### Hotels
- `GET /api/v1/hotels` - List hotels
- `GET /api/v1/hotels/:id` - Get hotel by ID

Query parameters:
- `city` - Filter by city
- `minPrice` / `maxPrice` - Price range
- `stars` - Hotel stars (1-5)
- `accessibility` - true/false

### Restaurants
- `GET /api/v1/restaurants` - List restaurants
- `GET /api/v1/restaurants/:id` - Get restaurant by ID

### Transportation
- `GET /api/v1/transportation` - List transportation options
- `GET /api/v1/transportation/cities` - List connected cities

## 🧪 Testing

### Health Check
```bash
# Check all services
docker-compose ps

# Check health endpoint
curl http://localhost:3001/api/v1/health

# Check frontend
curl http://localhost:3000
```

### Unit Testing
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### E2E Testing
```bash
# Using Docker
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📦 Deployment

### Production Docker
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start in production mode
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables

#### Backend (.env)
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
DATABASE_URL="file:./prod.db"
```

### Docker Swarm Deployment
```bash
docker stack deploy -c docker-compose.prod.yml tour-planner
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000/3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

#### Database Locked
```bash
# Reset database
cd backend
rm -f prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

#### Docker Build Fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### Health Check Fails
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check service status
docker-compose ps
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📊 Performance

### Optimization Features
- ✅ Gzip compression (Nginx)
- ✅ Static asset caching
- ✅ Efficient database queries with Prisma
- ✅ React Query caching
- ✅ Component lazy loading
- ✅ Docker multi-stage builds

### Monitoring
- Health check endpoints
- Database connection status
- Service uptime tracking
- Request/response logging

## 🔒 Security

### Implemented Security Measures
- Helmet.js for security headers
- CORS protection
- Rate limiting (100 requests/15min)
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (React)
- No hardcoded secrets

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) - Accessible component library
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [React Query](https://react-query.tanstack.com/) - Data synchronization
- [Express.js](https://expressjs.com/) - Web framework

## 📞 Support

For support, email support@tourplanner55plus.com or create an issue in the repository.

---

**Built with ❤️ for senior travelers in Leningrad Oblast**
