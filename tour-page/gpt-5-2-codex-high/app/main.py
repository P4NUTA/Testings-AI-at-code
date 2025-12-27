from __future__ import annotations

import json
import random
from pathlib import Path
from typing import Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, conint
from starlette.requests import Request
from starlette.status import HTTP_400_BAD_REQUEST

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "points.json"
STATIC_DIR = BASE_DIR / "static"


class ItineraryRequest(BaseModel):
    days: conint(ge=1, le=3) = 1
    seed: int = 55
    budget_level: str = "standard"
    pace: str = "relaxed"
    start_city: str = "Санкт-Петербург"
    mobility: str = "low-stairs"
    language: str = "ru"


class City(BaseModel):
    id: str
    name_ru: str
    name_en: str
    distance_km: int
    travel_time_hours: float
    transfer_count: int
    transport_ru: str
    transport_en: str


class Attraction(BaseModel):
    id: str
    city_id: str
    name_ru: str
    name_en: str
    type: str
    indoor: bool
    stairs_level: int
    duration_hours: float
    cost_rub: int


class DataStore(BaseModel):
    cities: List[City]
    attractions: List[Attraction]


def load_data() -> DataStore:
    if not DATA_PATH.exists():
        raise RuntimeError("Mock data file is missing.")
    raw = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    return DataStore(**raw)


data_store = load_data()
app = FastAPI(title="Tour Planner 55+ for Leningrad Oblast")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=HTTP_400_BAD_REQUEST,
        content={
            "error": "invalid_request",
            "details": exc.errors(),
            "message": "Проверьте параметры запроса и повторите попытку."
        },
    )


@app.get("/health")
async def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/api/locations")
async def locations() -> Dict[str, List[Dict[str, str]]]:
    return {
        "cities": [
            {"id": city.id, "name_ru": city.name_ru, "name_en": city.name_en}
            for city in data_store.cities
        ]
    }


def pick_cities(days: int, rng: random.Random) -> List[City]:
    cities_sorted = sorted(data_store.cities, key=lambda city: city.distance_km)
    pool_size = min(len(cities_sorted), days + 3)
    pool = cities_sorted[:pool_size]
    chosen: List[City] = []
    while len(chosen) < days:
        weights = [1 / (1 + city.distance_km / 60) for city in pool]
        city = rng.choices(pool, weights=weights, k=1)[0]
        if city not in chosen:
            chosen.append(city)
    return chosen


def select_attractions(
    city_id: str,
    mobility: str,
    pace: str,
    rng: random.Random,
) -> List[Attraction]:
    candidates = [at for at in data_store.attractions if at.city_id == city_id]
    if mobility == "low-stairs":
        candidates = [at for at in candidates if at.stairs_level <= 1]
    if not candidates:
        return []
    rng.shuffle(candidates)
    target_hours = {"relaxed": 4.0, "easy": 4.5, "steady": 5.0}.get(pace, 4.0)
    chosen: List[Attraction] = []
    total = 0.0
    for attraction in candidates:
        if total + attraction.duration_hours <= target_hours + 0.6:
            chosen.append(attraction)
            total += attraction.duration_hours
        if len(chosen) >= 3 or total >= target_hours:
            break
    if not chosen:
        chosen = candidates[:2]
    return chosen


def find_rainy_alternatives(city_id: str, exclude_ids: List[str]) -> List[Attraction]:
    alternatives = [
        at
        for at in data_store.attractions
        if at.city_id == city_id and at.indoor and at.id not in exclude_ids
    ]
    alternatives = sorted(alternatives, key=lambda at: at.stairs_level)
    return alternatives[:2]


def estimate_cost(
    attractions: List[Attraction],
    distance_km: int,
    budget_level: str,
) -> Dict[str, int]:
    ticket_cost = sum(at.cost_rub for at in attractions)
    transport_base = int(distance_km * 8)
    meal_cost = {"economy": 600, "standard": 900, "comfort": 1300}[budget_level]
    multiplier = {"economy": 0.9, "standard": 1.0, "comfort": 1.25}[budget_level]
    total = int((ticket_cost + transport_base + meal_cost) * multiplier)
    return {
        "tickets": ticket_cost,
        "transport": int(transport_base * multiplier),
        "meals": int(meal_cost * multiplier),
        "total": total,
    }


def format_attraction(attraction: Attraction, language: str) -> Dict[str, str | int | float | bool]:
    name = attraction.name_ru if language == "ru" else attraction.name_en
    return {
        "id": attraction.id,
        "name": name,
        "type": attraction.type,
        "indoor": attraction.indoor,
        "stairs_level": attraction.stairs_level,
        "duration_hours": attraction.duration_hours,
        "cost_rub": attraction.cost_rub,
    }


@app.post("/api/itinerary")
async def itinerary(request: ItineraryRequest) -> Dict[str, object]:
    normalized = request
    normalized.budget_level = normalized.budget_level.strip().lower()
    normalized.language = normalized.language.strip().lower()
    normalized.mobility = normalized.mobility.strip().lower()
    normalized.pace = normalized.pace.strip().lower()

    if normalized.budget_level not in {"economy", "standard", "comfort"}:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="budget_level must be one of: economy, standard, comfort",
        )
    if normalized.language not in {"ru", "en"}:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="language must be ru or en",
        )
    if normalized.mobility not in {"low-stairs", "mixed"}:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="mobility must be low-stairs or mixed",
        )
    if normalized.pace not in {"relaxed", "easy", "steady"}:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="pace must be relaxed, easy, or steady",
        )

    rng = random.Random(normalized.seed)
    cities = pick_cities(normalized.days, rng)
    days_output = []
    total_cost = 0
    total_travel_time = 0.0

    for day_index, city in enumerate(cities, start=1):
        attractions = select_attractions(city.id, normalized.mobility, normalized.pace, rng)
        if not attractions:
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail=f"No accessible attractions found for {city.name_ru}.",
            )
        rainy_alt = find_rainy_alternatives(city.id, [at.id for at in attractions])
        cost = estimate_cost(attractions, city.distance_km, normalized.budget_level)
        travel_time = round(city.travel_time_hours * 2 + 0.4, 1)
        total_cost += cost["total"]
        total_travel_time += travel_time
        city_name = city.name_ru if normalized.language == "ru" else city.name_en
        transport = city.transport_ru if normalized.language == "ru" else city.transport_en
        comfort_notes = [
            "минимум пересадок" if normalized.language == "ru" else "minimal transfers",
            "основной маршрут без крутых лестниц" if normalized.language == "ru" else "main route avoids steep stairs",
            "рекомендуем паузы каждые 60–90 минут" if normalized.language == "ru" else "take breaks every 60–90 minutes",
        ]

        days_output.append(
            {
                "day": day_index,
                "city": {
                    "id": city.id,
                    "name": city_name,
                    "distance_km": city.distance_km,
                },
                "travel": {
                    "transport": transport,
                    "transfer_count": city.transfer_count,
                    "travel_time_hours": travel_time,
                },
                "schedule": [format_attraction(at, normalized.language) for at in attractions],
                "rainy_day_alternatives": [
                    format_attraction(at, normalized.language) for at in rainy_alt
                ],
                "estimated_cost_rub": cost,
                "estimated_time_hours": {
                    "visits": round(sum(at.duration_hours for at in attractions), 1),
                    "travel": travel_time,
                    "total_day": round(sum(at.duration_hours for at in attractions) + travel_time, 1),
                },
                "comfort_notes": comfort_notes,
            }
        )

    return {
        "meta": {
            "days": normalized.days,
            "seed": normalized.seed,
            "budget_level": normalized.budget_level,
            "pace": normalized.pace,
            "mobility": normalized.mobility,
            "language": normalized.language,
            "start_city": normalized.start_city,
        },
        "itinerary": days_output,
        "totals": {
            "estimated_total_cost_rub": total_cost,
            "estimated_total_travel_hours": round(total_travel_time, 1),
        },
        "disclaimer": (
            "Маршруты построены на локальных данных и могут потребовать уточнения по расписанию."
            if normalized.language == "ru"
            else "Routes are based on local mock data and may require schedule confirmation."
        ),
    }


@app.get("/")
async def root() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
