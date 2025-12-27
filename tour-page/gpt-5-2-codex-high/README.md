# Tour Planner 55+ for Leningrad Oblast

A lightweight, self-contained planner that generates calm 1–3 day itineraries optimized for 55+ travelers (few transfers, low stairs) with budgets, travel time, and rainy-day alternatives. No external APIs.

## Run with Docker

```bash
docker-compose up --build
```

Open `http://localhost:8080`.

## Local development

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

## API

- `GET /health` -> `{ "status": "ok" }`
- `GET /api/locations` -> list of available cities
- `POST /api/itinerary`

Example:

```bash
curl -X POST http://localhost:8080/api/itinerary \
  -H "Content-Type: application/json" \
  -d '{"days":2,"budget_level":"standard","pace":"relaxed","mobility":"low-stairs","seed":55,"language":"ru"}'
```

## Data

All data is local mock data stored in `data/points.json`.
