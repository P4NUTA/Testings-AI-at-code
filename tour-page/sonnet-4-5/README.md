# Tour Planner 55+ for Leningrad Oblast

A specialized tour planning application optimized for travelers aged 55+ visiting Leningrad Oblast, Russia. Generates 1-3 day itineraries with focus on accessibility, comfort, and minimal physical strain.

## Features

- 🚌 **Comfort-Optimized Routes**: Minimal transfers, accessible venues, low stair counts
- 💰 **Budget Planning**: Detailed cost estimates including transport, meals, and attractions
- 🌧️ **Weather Alternatives**: Rainy-day backup plans with indoor venues
- 🌍 **Bilingual**: Russian (default) and English interfaces
- 🔒 **Privacy-First**: No external APIs, all data stored locally
- 🐳 **Production-Ready**: Containerized with Docker, includes healthchecks

## Quick Start

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Run with Docker Compose

```bash
docker-compose up --build
```

Access the application at: **http://localhost:8080**

### Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Architecture

- **Frontend**: React 18 + TypeScript + Vite + i18next
- **Backend**: Node.js + Express + TypeScript + Zod validation
- **Data**: Local JSON mock data (no external APIs)
- **Deployment**: Multi-stage Docker builds, Alpine Linux, non-root users

## Configuration

### Environment Variables
- `NODE_ENV`: production/development
- `PORT`: Backend port (default: 3000)

### Customization
- Mock data: `backend/src/data/*.json`
- Translations: `frontend/src/i18n/*.json`
- Itinerary algorithm: `backend/src/services/itineraryGenerator.ts`

## Validation & Testing

All inputs validated with Zod schemas. Graceful error handling with user-friendly messages.

**Health endpoints:**
- Backend: `http://localhost:3000/health`
- Frontend: `http://localhost:8080/`

## Security

- Non-root container users
- No hardcoded secrets
- Input sanitization
- CORS configured
- Minimal attack surface (Alpine base images)

## License

MIT
