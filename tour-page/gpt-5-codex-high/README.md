# Tour Planner 55+

Генератор 1–3-дневных маршрутов по Ленинградской области для путешественников 55+:
- минимальные пересадки и ступени;
- оценки бюджета и времени в пути;
- варианты на случай дождя;
- интерфейс по умолчанию на русском с переключателем EN.

## Стек
- **Backend:** Node.js + Express + TypeScript, генерация по локальным мок-данным.
- **Frontend:** React + Vite + TypeScript.
- **Контейнеризация:** Docker + docker-compose, healthcheck-и для обоих сервисов.
- **Тесты:** Jest для бизнес-логики генератора.

## Быстрый старт
```bash
# 1. Собрать и запустить сервисы
docker compose up --build

# 2. Frontend доступен на http://localhost:4173
#    Backend API /health и /api/itineraries на http://localhost:4000
```

## Локальная разработка
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env # можно переопределить VITE_API_BASE_URL
npm install
npm run dev
```

## Тесты и проверки
```bash
cd backend
npm run lint
npm test
```

## API
`POST /api/itineraries`
```json
{
  "days": 3,
  "language": "ru",
  "budgetLevel": "standard",
  "mobilityLevel": "low-impact",
  "season": "shoulder"
}
```
Ответ содержит сводку и план на каждый день с бюджетами и альтернативами.
