import { Attraction } from '@/types';

export const attractions: Attraction[] = [
  {
    id: 'peterhof-palace',
    name: {
      ru: 'Большой дворец Петергофа',
      en: 'Peterhof Grand Palace'
    },
    description: {
      ru: 'Великолепный дворцовый комплекс с фонтанами, "Русский Версаль" XVIII века с богатой коллекцией произведений искусства.',
      en: 'Magnificent palace complex with fountains, "Russian Versailles" of the 18th century with rich art collection.'
    },
    category: 'palace',
    coordinates: { lat: 59.8783, lng: 29.8845 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: true,
      minimalStairs: false,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 120,
    prices: {
      ticket: 700,
      guide: 2500,
      transport: 300,
      meal: 800
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '10:00-12:00',
    crowdLevel: 'high',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'catherine-palace',
    name: {
      ru: 'Екатерининский дворец',
      en: 'Catherine Palace'
    },
    description: {
      ru: 'Роскошная летняя резиденция российских императоров с знаменитой Янтарной комнатой.',
      en: 'Luxurious summer residence of Russian emperors with the famous Amber Room.'
    },
    category: 'palace',
    coordinates: { lat: 59.7139, lng: 30.3819 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: true,
      minimalStairs: false,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 90,
    prices: {
      ticket: 600,
      guide: 2200,
      transport: 400,
      meal: 700
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '11:00-13:00',
    crowdLevel: 'high',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'hermitage',
    name: {
      ru: 'Государственный Эрмитаж',
      en: 'State Hermitage Museum'
    },
    description: {
      ru: 'Один из крупнейших художественных и культурно-исторических музеев мира с коллекцией более 3 миллионов экспонатов.',
      en: 'One of the largest art and cultural-historical museums in the world with a collection of over 3 million exhibits.'
    },
    category: 'museum',
    coordinates: { lat: 59.9398, lng: 30.3146 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: true,
      minimalStairs: false,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 180,
    prices: {
      ticket: 800,
      guide: 3000,
      transport: 200,
      meal: 900
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '10:00-12:00',
    crowdLevel: 'high',
    photoAllowed: false,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'pavlovsk-palace',
    name: {
      ru: 'Павловский дворец',
      en: 'Pavlovsk Palace'
    },
    description: {
      ru: 'Элегантный дворцово-парковый ансамбль XVIII века, любимая резиденция императора Павла I.',
      en: 'Elegant palace and park ensemble of the 18th century, favorite residence of Emperor Paul I.'
    },
    category: 'palace',
    coordinates: { lat: 59.6854, lng: 30.4194 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 100,
    prices: {
      ticket: 450,
      guide: 1800,
      transport: 350,
      meal: 600
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '12:00-14:00',
    crowdLevel: 'medium',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'gatchina-palace',
    name: {
      ru: 'Гатчинский дворец',
      en: 'Gatchina Palace'
    },
    description: {
      ru: 'Уникальный дворец-замок с подземным ходом и живописным парком, резиденция Павла I.',
      en: 'Unique palace-castle with underground passage and picturesque park, residence of Paul I.'
    },
    category: 'palace',
    coordinates: { lat: 59.5508, lng: 30.1152 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 90,
    prices: {
      ticket: 500,
      guide: 2000,
      transport: 400,
      meal: 600
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '11:00-13:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: false
  },
  {
    id: 'ruskeala',
    name: {
      ru: 'Горный парк Рускеала',
      en: 'Ruskeala Mountain Park'
    },
    description: {
      ru: 'Уникальный карьер с изумрудной водой и горными разработками XIX века, возможность прогулки на лодке.',
      en: 'Unique quarry with emerald water and 19th century mining developments, boat trips available.'
    },
    category: 'nature',
    coordinates: { lat: 61.9542, lng: 31.0806 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: true,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 150,
    prices: {
      ticket: 600,
      guide: 1500,
      transport: 800,
      meal: 700
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'medium',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'kizhi',
    name: {
      ru: 'Кижский заповедник',
      en: 'Kizhi Museum'
    },
    description: {
      ru: 'Уникальный деревянный архитектурный ансамбль XVIII-XIX веков с знаменитой Преображенской церковью.',
      en: 'Unique wooden architectural ensemble of the 18th-19th centuries with the famous Transfiguration Church.'
    },
    category: 'museum',
    coordinates: { lat: 62.0833, lng: 35.2333 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: false,
      handrailsAvailable: false,
      flatTerrain: false
    },
    visitDuration: 180,
    prices: {
      ticket: 900,
      guide: 3000,
      transport: 1200,
      meal: 800
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'medium',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'monrepo',
    name: {
      ru: 'Парк "Монрепо"',
      en: "Monrepo Park"
    },
    description: {
      ru: 'Живописный ландшафтный парк с озерами и скалами, место для спокойного отдыха и прогулок.',
      en: 'Picturesque landscape park with lakes and rocks, a place for quiet recreation and walks.'
    },
    category: 'park',
    coordinates: { lat: 61.0456, lng: 28.6092 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: true,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: false,
      flatTerrain: false
    },
    visitDuration: 120,
    prices: {
      ticket: 300,
      guide: 800,
      transport: 500,
      meal: 500
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-16:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: false,
    hasCafe: true
  },
  {
    id: 'svyazhsk',
    name: {
      ru: 'Остров-град Свияжск',
      en: 'Sviyazhsk Island-City'
    },
    description: {
      ru: 'Исторический остров-крепость XVI века с древними храмами и монастырями.',
      en: 'Historical island-fortress of the 16th century with ancient churches and monasteries.'
    },
    category: 'church',
    coordinates: { lat: 55.7500, lng: 48.5833 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 120,
    prices: {
      ticket: 400,
      guide: 1500,
      transport: 600,
      meal: 500
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: false
  },
  {
    id: 'shuvalovka',
    name: {
      ru: 'Музей-заповедник "Шуваловка"',
      en: 'Shuvalovka Museum-Reserve'
    },
    description: {
      ru: 'Этнографический комплекс воссоздающий русскую усадьбу XVIII века с мастер-классами и традиционной кухней.',
      en: 'Ethnographic complex recreating an 18th century Russian estate with master classes and traditional cuisine.'
    },
    category: 'museum',
    coordinates: { lat: 59.7139, lng: 30.3194 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: true,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 100,
    prices: {
      ticket: 350,
      guide: 1200,
      transport: 300,
      meal: 700
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '11:00-15:00',
    crowdLevel: 'medium',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'staraya-ladoga',
    name: {
      ru: 'Старая Ладога',
      en: 'Staraya Ladoga'
    },
    description: {
      ru: 'Древняя столица Руси VIII века с крепостью, церквями и археологическими находками.',
      en: 'Ancient capital of Rus of the 8th century with fortress, churches and archaeological finds.'
    },
    category: 'museum',
    coordinates: { lat: 60.0833, lng: 32.3333 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 140,
    prices: {
      ticket: 450,
      guide: 1800,
      transport: 700,
      meal: 600
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'lomonosov',
    name: {
      ru: 'Музей М.В. Ломоносова',
      en: 'M.V. Lomonosov Museum'
    },
    description: {
      ru: 'Мемориальный дом-музей великого русского ученого, место рождения и ранних лет.',
      en: 'Memorial house-museum of the great Russian scientist, place of birth and early years.'
    },
    category: 'museum',
    coordinates: { lat: 59.8833, lng: 30.8667 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: true,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 60,
    prices: {
      ticket: 200,
      guide: 800,
      transport: 400,
      meal: 400
    },
    weatherSuitability: {
      good: true,
      rainy: true,
      indoor: true
    },
    bestTimeToVisit: '11:00-13:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: false
  },
  {
    id: 'ivan-city',
    name: {
      ru: 'Ивангородская крепость',
      en: 'Ivangorod Fortress'
    },
    description: {
      ru: 'Средневековая крепость XV века на границе с Эстонией с панорамой на Нарву.',
      en: 'Medieval fortress of the 15th century on the border with Estonia with panorama of Narva.'
    },
    category: 'museum',
    coordinates: { lat: 59.3667, lng: 28.2167 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 90,
    prices: {
      ticket: 300,
      guide: 1000,
      transport: 500,
      meal: 500
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'low',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: false
  },
  {
    id: 'tikhvin',
    name: {
      ru: 'Тихвинский монастырь',
      en: 'Tikhvin Monastery'
    },
    description: {
      ru: 'Действующий мужской монастырь XVI века с чудотворной иконой Тихвинской Божией Матери.',
      en: 'Active male monastery of the 16th century with the miraculous Tikhvin icon of the Mother of God.'
    },
    category: 'church',
    coordinates: { lat: 59.6500, lng: 33.5167 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 80,
    prices: {
      ticket: 0,
      guide: 800,
      transport: 600,
      meal: 400
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '09:00-12:00',
    crowdLevel: 'medium',
    photoAllowed: false,
    hasGiftShop: true,
    hasCafe: false
  },
  {
    id: 'valaam',
    name: {
      ru: 'Валаамский монастырь',
      en: 'Valaam Monastery'
    },
    description: {
      ru: 'Древний мужской монастырь на острове Валаам в Ладожском озере, духовный центр Севера.',
      en: 'Ancient male monastery on Valaam Island in Lake Ladoga, spiritual center of the North.'
    },
    category: 'church',
    coordinates: { lat: 61.3833, lng: 31.0167 },
    accessibility: {
      wheelchairAccess: false,
      hasElevator: false,
      minimalStairs: false,
      hasRamp: false,
      accessibleRestrooms: false,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: false
    },
    visitDuration: 180,
    prices: {
      ticket: 0,
      guide: 1500,
      transport: 1500,
      meal: 600
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '10:00-14:00',
    crowdLevel: 'medium',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  },
  {
    id: 'parks-petersburg',
    name: {
      ru: 'Парк аттракционов "Диво Остров"',
      en: 'Divo Ostrov Amusement Park'
    },
    description: {
      ru: 'Современный парк аттракционов с каруселями для детей и взрослых, местами для отдыха.',
      en: 'Modern amusement park with carousels for children and adults, places for relaxation.'
    },
    category: 'park',
    coordinates: { lat: 59.9736, lng: 30.2747 },
    accessibility: {
      wheelchairAccess: true,
      hasElevator: false,
      minimalStairs: true,
      hasRamp: true,
      accessibleRestrooms: true,
      seatingAvailable: true,
      parkingNearby: true,
      lightingGood: true,
      handrailsAvailable: true,
      flatTerrain: true
    },
    visitDuration: 120,
    prices: {
      ticket: 1500,
      guide: 0,
      transport: 200,
      meal: 800
    },
    weatherSuitability: {
      good: true,
      rainy: false,
      indoor: false
    },
    bestTimeToVisit: '11:00-18:00',
    crowdLevel: 'high',
    photoAllowed: true,
    hasGiftShop: true,
    hasCafe: true
  }
];

export const attractionsByCategory = attractions.reduce((acc, attraction) => {
  if (!acc[attraction.category]) {
    acc[attraction.category] = [];
  }
  acc[attraction.category].push(attraction);
  return acc;
}, {} as Record<string, Attraction[]>);

export const getAttractionsByInterests = (interests: string[]): Attraction[] => {
  return attractions.filter(attraction => interests.includes(attraction.category));
};

export const getAccessibleAttractions = (mobility: 'good' | 'limited' | 'wheelchair'): Attraction[] => {
  if (mobility === 'wheelchair') {
    return attractions.filter(a => a.accessibility.wheelchairAccess && a.accessibility.hasRamp);
  } else if (mobility === 'limited') {
    return attractions.filter(a => a.accessibility.minimalStairs && a.accessibility.seatingAvailable);
  }
  return attractions;
};

export const getWeatherSuitableAttractions = (considerWeather: boolean, isRainy: boolean = false): Attraction[] => {
  if (!considerWeather || !isRainy) {
    return attractions;
  }
  return attractions.filter(a => a.weatherSuitability.rainy || a.weatherSuitability.indoor);
};