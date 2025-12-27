const LOCATIONS = [
  {
    id: 'hermitage',
    name: { ru: 'Эрмитаж (Главный штаб)', en: 'Hermitage (General Staff)' },
    type: 'indoor',
    comfortLevel: 'high', // Elevators available, good for 55+
    timeHours: 3,
    costRub: 500,
    description: { ru: 'Искусство без суеты. Есть лифты и кафе.', en: 'Art without the crowd. Elevators and cafes available.' }
  },
  {
    id: 'peterhof_lower',
    name: { ru: 'Петергоф (Нижний парк)', en: 'Peterhof (Lower Park)' },
    type: 'outdoor',
    comfortLevel: 'medium', // Long walks, but flat
    timeHours: 4,
    costRub: 1200,
    rainAlternativeId: 'peterhof_grand_palace',
    description: { ru: 'Прогулка у фонтанов. Много скамеек.', en: 'Walk by the fountains. Plenty of benches.' }
  },
  {
    id: 'peterhof_grand_palace',
    name: { ru: 'Большой Петергофский дворец', en: 'Grand Peterhof Palace' },
    type: 'indoor',
    comfortLevel: 'medium',
    timeHours: 2,
    costRub: 1500,
    description: { ru: 'Роскошные интерьеры. Тепло и сухо.', en: 'Luxurious interiors. Warm and dry.' }
  },
  {
    id: 'gatchina_palace',
    name: { ru: 'Гатчинский дворец', en: 'Gatchina Palace' },
    type: 'indoor',
    comfortLevel: 'high',
    timeHours: 2.5,
    costRub: 600,
    description: { ru: 'Уютный замок с подземным ходом (безопасно).', en: 'Cozy castle with an underground passage (safe).' }
  },
  {
    id: 'repino_penaty',
    name: { ru: 'Усадьба "Пенаты" (Репино)', en: 'Penaty Estate (Repino)' },
    type: 'outdoor',
    comfortLevel: 'high',
    timeHours: 2,
    costRub: 400,
    rainAlternativeId: 'russian_museum',
    description: { ru: 'Тихий сосновый лес и дом художника.', en: 'Quiet pine forest and the artist\'s house.' }
  },
  {
    id: 'russian_museum',
    name: { ru: 'Русский музей', en: 'Russian Museum' },
    type: 'indoor',
    comfortLevel: 'high',
    timeHours: 3,
    costRub: 600,
    description: { ru: 'Шедевры русской живописи. Комфортно.', en: 'Masterpieces of Russian painting. Comfortable.' }
  },
  {
    id: 'kronstadt_naval',
    name: { ru: 'Морской собор в Кронштадте', en: 'Naval Cathedral in Kronstadt' },
    type: 'indoor',
    comfortLevel: 'high',
    timeHours: 1.5,
    costRub: 0,
    description: { ru: 'Величественный храм. Доступная среда.', en: 'Majestic temple. Accessible environment.' }
  }
];

const TRANSLATIONS = {
  ru: {
    title: 'Планировщик 55+ Ленобласть',
    daysLabel: 'Длительность (дней):',
    rainLabel: 'Режим "Дождь" (только помещения)',
    generateBtn: 'Создать маршрут',
    totalCost: 'Примерный бюджет:',
    totalTime: 'Время в пути (активность):',
    rub: '₽',
    hours: 'ч',
    comfortNote: 'Все места подобраны с учетом комфорта: минимум лестниц, наличие мест отдыха.',
    itineraryTitle: 'Ваш комфортный маршрут'
  },
  en: {
    title: 'Tour Planner 55+ Leningrad Region',
    daysLabel: 'Duration (days):',
    rainLabel: 'Rain Mode (Indoors only)',
    generateBtn: 'Generate Itinerary',
    totalCost: 'Estimated Budget:',
    totalTime: 'Travel/Activity Time:',
    rub: 'RUB',
    hours: 'h',
    comfortNote: 'All locations selected for comfort: minimal stairs, rest areas available.',
    itineraryTitle: 'Your Comfortable Itinerary'
  }
};

module.exports = { LOCATIONS, TRANSLATIONS };
