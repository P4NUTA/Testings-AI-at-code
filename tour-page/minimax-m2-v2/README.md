# Tour Planner 55+ for Leningrad Oblast

A comprehensive tour planning application designed for travelers aged 55 and above, focused on creating comfortable, accessible itineraries in the Leningrad Oblast region of Russia.

## Features

- **Senior-Friendly Design**: Optimized for comfort with minimal transfers, low stairs, and accessible venues
- **Flexible Duration**: Plan 1-3 day trips
- **Smart Recommendations**: Personalized suggestions based on interests and mobility level
- **Budget Planning**: Detailed cost estimates for hotels, transport, meals, and attractions
- **Weather-Aware**: Automatic rainy day alternatives for outdoor activities
- **Russian/English UI**: Seamless language switching
- **No External Dependencies**: Uses local mock data - works completely offline

## Technology Stack

### Backend
- Node.js + Express
- TypeScript
- Zod for validation
- No external API dependencies

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Responsive design

### DevOps
- Docker + Docker Compose
- Nginx reverse proxy
- Health checks included
- Production-ready configuration

## Quick Start

### Prerequisites
- Node.js 20+ and npm
- Docker and Docker Compose (for containerized deployment)

### Option 1: Local Development

1. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start frontend (in another terminal)**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/api/health

### Option 2: Docker Deployment

1. **Build and start**
   ```bash
   docker-compose up -d --build
   ```

2. **Check health**
   ```bash
   docker-compose ps
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop**
   ```bash
   docker-compose down
   ```

## API Endpoints

### POST /api/itinerary
Generate a new itinerary based on user preferences.

**Request Body:**
```json
{
  "duration": 2,
  "startCity": "Санкт-Петербург",
  "interests": ["palace", "museum"],
  "budget": "standard",
  "mobilityLevel": 3,
  "transportPreference": "private",
  "season": "summer",
  "weatherSensitive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "itinerary-123",
    "days": [...],
    "totalCost": 25000,
    "totalDuration": 1440,
    "comfortScore": 85,
    "weatherPlan": {
      "sunny": [...],
      "rainy": [...]
    }
  }
}
```

### GET /api/attractions
Get list of available attractions.
- Query params: `city`, `category`

### GET /api/hotels
Get list of available hotels.
- Query params: `city`, `minRating`

### GET /api/restaurants
Get list of available restaurants.
- Query params: `city`, `cuisine`

### GET /api/transport
Get transport options.
- Query params: `from`, `to`

### GET /api/health
Health check endpoint.

## Mock Data

The application includes comprehensive local data for Leningrad Oblast:

- **15+ Attractions**: Peterhof, Catherine Palace, Pavlovsk, Kronstadt, Valaam, Kizhi, and more
- **8 Hotels**: Various price points with accessibility features
- **10 Restaurants**: Senior-friendly options
- **15+ Transport Routes**: Trains, buses, and taxis
- **Comfort Metrics**: Stairs level, elevators, rest areas, wheelchair access
- **Price Range**: From budget (2500₽/night) to luxury (8000₽/night)

## Accessibility Features

The application prioritizes comfort for senior travelers:

- **Mobility Levels**: 1 (wheelchair) to 5 (excellent mobility)
- **Stair Assessment**: All attractions rated 1-5 for stairs
- **Elevator Availability**: Clearly marked
- **Rest Areas**: Number of benches/seating areas documented
- **Transport Comfort**: Transfer count, seating, air conditioning
- **Hotel Features**: Grab rails, wheelchair rooms, low floors

## Project Structure

```
tour-planner-55/
├── backend/
│   ├── src/
│   │   ├── data/          # Mock data
│   │   ├── server.ts      # Express server
│   │   ├── types.ts       # TypeScript types
│   │   └── itineraryGenerator.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── package.json
└── README.md
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

### Frontend
- Vite configuration handles API proxying to backend

## Health Checks

Both services include health checks:

- **Backend**: Checks `/api/health` every 30s
- **Frontend**: Checks nginx status every 30s
- **Dependencies**: Frontend waits for backend health

## Development

### Adding New Attractions
Edit `backend/src/data/attractions.ts` and add new attraction objects.

### Modifying Comfort Metrics
Update `backend/src/types.ts` to add new accessibility features.

### Extending the API
Add new routes in `backend/src/server.ts`.

## Deployment Notes

- The application is stateless (no database)
- All data is pre-loaded from JSON files
- Horizontal scaling supported
- Can be deployed to any Docker-compatible environment

## License

MIT

## Contributing

This is a demonstration project for the Tour Planner 55+ application.
