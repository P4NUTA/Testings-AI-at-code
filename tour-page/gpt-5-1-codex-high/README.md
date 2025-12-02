# Tour Planner 55+ — Ленинградская область

Комфортные 1–3‑дневные маршруты по Ленобласти для путешественников 55+, без внешних API — только локальные мок‑данные.

## Быстрый старт
```bash
npm install
npm start
# откройте http://localhost:3000
```

## Тесты
```bash
npm test
```

## Docker
```bash
docker-compose build
docker-compose up
# healthcheck смотрит на /health
```

## Настройки запроса
- `days` — 1..3 (по умолчанию 2)
- `mobility` — `low` или `medium`
- `budget` — `budget` | `standard` | `comfort`
- `lang` — `ru` (по умолчанию) или `en`
- `seed` — строка для детерминированного маршрута

## Что внутри
- `src/data/places.js` — мок‑данные локаций
- `src/logic/itinerary.js` — генератор маршрута с детерминированным seed
- `public/` — статичный UI с переключением языка
- `src/healthcheck.js` — локальный health‑probe для Docker
