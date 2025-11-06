export type Locale = 'ru' | 'en';

type Dictionary = Record<Locale, Record<string, string>>;

export const STRINGS: Dictionary = {
  ru: {
    appTitle: 'Тур-планер 55+ по Ленинградской области',
    appSubtitle: '1–3-дневные маршруты с минимальными пересадками и лестницами',
    daysLabel: 'Количество дней',
    budgetLabel: 'Бюджет',
    mobilityLabel: 'Подвижность',
    seasonLabel: 'Сезон',
    submit: 'Собрать маршрут',
    loading: 'Генерация маршрута...',
    summaryTitle: 'Сводка путешествия',
    dayTitle: 'День',
    rainyAlternatives: 'Варианты на дождливую погоду',
    totalBudget: 'Общий бюджет',
    totalTravel: 'Общее время в пути',
    minutes: 'мин',
    rub: '₽',
    indoor: 'В помещении',
    outdoor: 'На улице',
    errorFallback: 'Не удалось получить маршрут. Попробуйте другие параметры.',
    budgetEconomy: 'Эконом',
    budgetStandard: 'Стандарт',
    budgetComfort: 'Комфорт',
    mobilityLow: 'Минимум ступеней',
    mobilityAverage: 'Обычный темп',
    seasonSummer: 'Лето',
    seasonShoulder: 'Весна/осень',
    seasonWinter: 'Зима'
  },
  en: {
    appTitle: 'Tour Planner 55+ for Leningrad Oblast',
    appSubtitle: '1–3 day itineraries with minimal transfers and stairs',
    daysLabel: 'Days',
    budgetLabel: 'Budget',
    mobilityLabel: 'Mobility',
    seasonLabel: 'Season',
    submit: 'Generate plan',
    loading: 'Building itinerary...',
    summaryTitle: 'Trip summary',
    dayTitle: 'Day',
    rainyAlternatives: 'Rainy-day alternatives',
    totalBudget: 'Total budget',
    totalTravel: 'Total travel time',
    minutes: 'min',
    rub: 'RUB',
    indoor: 'Indoor',
    outdoor: 'Outdoor',
    errorFallback: 'Unable to build itinerary. Try different inputs.',
    budgetEconomy: 'Economy',
    budgetStandard: 'Standard',
    budgetComfort: 'Comfort',
    mobilityLow: 'Low impact',
    mobilityAverage: 'Average pace',
    seasonSummer: 'Summer',
    seasonShoulder: 'Shoulder season',
    seasonWinter: 'Winter'
  }
};

export const t = (locale: Locale, key: keyof typeof STRINGS.en): string => {
  return STRINGS[locale][key];
};
