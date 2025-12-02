const { places, baseCity, baseCityEn } = require("../data/places");

const DEFAULT_SEED = "lenobl-55plus-seed";
const mobilityLevels = ["low", "medium"];
const budgetLevels = ["budget", "standard", "comfort"];

function createRng(seedString = DEFAULT_SEED) {
  let seed = 0;
  const normalized = seedString || DEFAULT_SEED;
  for (let i = 0; i < normalized.length; i += 1) {
    seed = (seed + normalized.charCodeAt(i) * (i + 1)) >>> 0;
  }
  return () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
}

function formatPlace(place, lang) {
  return {
    id: place.id,
    name: lang === "en" ? place.nameEn : place.name,
    city: lang === "en" ? place.cityEn : place.city,
    description: lang === "en" ? place.descriptionEn : place.description,
    indoor: place.indoor,
    lowStairs: place.lowStairs,
    transferEase: place.transferEase,
    tags: place.tags,
    durationMinutes: place.durationMinutes,
    baseTravelMinutes: place.baseTravelMinutes,
    estimatedCostRub: Math.round((place.costRubRange[0] + place.costRubRange[1]) / 2),
    rainyFriendly: place.rainyFriendly
  };
}

function scorePlace(place, mobility, budget) {
  let score = 100;
  if (mobility === "low" && !place.lowStairs) score -= 35;
  score -= (place.transferEase - 1) * 8;
  const averageCost = (place.costRubRange[0] + place.costRubRange[1]) / 2;
  if (budget === "budget") {
    score -= Math.max(0, (averageCost - 700) / 10);
  }
  if (budget === "comfort") {
    score += Math.max(0, (1200 - averageCost) / 30);
  }
  if (place.indoor) score += 5;
  if (place.rainyFriendly) score += 4;
  return score;
}

function computeTravelMinutes(segments) {
  if (!segments.length) return 0;
  const baseLeg = segments[0].baseTravelMinutes;
  const betweenLegs = Math.max(0, segments.length - 1) * 20;
  const buffer = 15;
  return baseLeg + betweenLegs + buffer;
}

function computeBudgetRub(segments, days) {
  const entry = segments.reduce((sum, s) => sum + s.estimatedCostRub, 0);
  const comfortBuffer = days * 500; // snacks/transport
  return Math.round(entry + comfortBuffer);
}

function buildDayTitle(dayIndex, lang) {
  const titlesRu = ["Мягкий старт", "Главные открытия", "Свободный финал"];
  const titlesEn = ["Gentle Start", "Key Discoveries", "Relaxed Finale"];
  return (lang === "en" ? titlesEn : titlesRu)[Math.min(dayIndex, 2)];
}

function pickRainyAlternatives(allPlaces, usedIds, lang, mobility, budget, rng) {
  const rainy = allPlaces
    .filter((p) => !usedIds.has(p.id) && (p.indoor || p.rainyFriendly) && p.lowStairs)
    .map((p) => ({
      place: p,
      score: scorePlace(p, mobility, budget)
    }))
    .sort((a, b) => b.score - a.score || rng() - 0.5)
    .slice(0, 3)
    .map(({ place }) => formatPlace(place, lang));
  return rainy;
}

function generateItinerary(options) {
  const {
    days = 2,
    mobility = "low",
    budget = "standard",
    lang = "ru",
    seed = DEFAULT_SEED
  } = options;

  if (Number.isNaN(Number(days)) || days < 1 || days > 3) {
    return {
      error: lang === "en" ? "Days must be between 1 and 3." : "Количество дней должно быть от 1 до 3."
    };
  }
  if (!mobilityLevels.includes(mobility)) {
    return {
      error:
        lang === "en"
          ? "Unsupported mobility option. Use low or medium."
          : "Недоступный уровень мобильности: выберите low или medium."
    };
  }
  if (!budgetLevels.includes(budget)) {
    return {
      error:
        lang === "en"
          ? "Unsupported budget option. Use budget, standard, or comfort."
          : "Недоступный бюджет: выберите budget, standard или comfort."
    };
  }

  const rng = createRng(`${seed}-${days}-${mobility}-${budget}-${lang}`);
  const scored = places
    .map((p) => ({
      place: p,
      score: scorePlace(p, mobility, budget),
      jitter: rng()
    }))
    .sort((a, b) => {
      if (b.score === a.score) return b.jitter - a.jitter;
      return b.score - a.score;
    });

  const usedIds = new Set();
  const dayPlans = [];
  const stopsPerDay = days === 1 ? 3 : 2;

  for (let dayIndex = 0; dayIndex < days; dayIndex += 1) {
    const segments = [];
    let cursor = 0;
    while (segments.length < stopsPerDay && cursor < scored.length) {
      const candidate = scored[cursor].place;
      cursor += 1;
      if (usedIds.has(candidate.id)) continue;
      if (mobility === "low" && (!candidate.lowStairs || candidate.transferEase > 3)) {
        continue;
      }
      usedIds.add(candidate.id);
      segments.push(formatPlace(candidate, lang));
    }

    const travelMinutes = computeTravelMinutes(segments);
    const budgetRub = computeBudgetRub(segments, 1);
    const dayTitle = buildDayTitle(dayIndex, lang);

    const summary =
      lang === "en"
        ? "Short transfers, seated breaks, and at most 3 calm visits."
        : "Короткие переезды, перерывы на отдых и не более трёх спокойных остановок.";

    dayPlans.push({
      day: dayIndex + 1,
      title: dayTitle,
      summary,
      segments,
      travelMinutes,
      estimatedBudgetRub: budgetRub
    });
  }

  const totalBudget = dayPlans.reduce((sum, d) => sum + d.estimatedBudgetRub, 0);
  const totalTravel = dayPlans.reduce((sum, d) => sum + d.travelMinutes, 0);
  const rainyDayAlternatives = pickRainyAlternatives(places, usedIds, lang, mobility, budget, rng);

  return {
    seedUsed: `${seed}`,
    language: lang,
    mobility,
    budget,
    baseCity: lang === "en" ? baseCityEn : baseCity,
    days: dayPlans,
    totals: {
      estimatedBudgetRub: totalBudget,
      travelMinutes: totalTravel
    },
    rainyDayAlternatives
  };
}

module.exports = {
  generateItinerary,
  createRng
};
