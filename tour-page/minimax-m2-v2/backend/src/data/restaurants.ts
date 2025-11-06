import { Restaurant } from '../types.js';

export const restaurants: Restaurant[] = [
  {
    id: 'peterhof_restaurant',
    name: {
      ru: 'Петергоф Ресторан',
      en: 'Peterhof Restaurant'
    },
    location: {
      city: 'Петергоф',
      lat: 59.8792,
      lng: 29.9082
    },
    cuisine: 'Европейская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 2000,
    rating: 4.5
  },
  {
    id: 'catherine_cafe',
    name: {
      ru: 'Кафе при Царском Селе',
      en: 'Cafe at Tsarskoye Selo'
    },
    location: {
      city: 'Царское Село',
      lat: 59.7148,
      lng: 30.3975
    },
    cuisine: 'Русская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 1500,
    rating: 4.3
  },
  {
    id: 'gatchina_manor_rest',
    name: {
      ru: 'Ресторан Гатчинская Усадьба',
      en: 'Gatchina Manor Restaurant'
    },
    location: {
      city: 'Гатчина',
      lat: 59.5667,
      lng: 30.1167
    },
    cuisine: 'Европейская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: false
    },
    avgBill: 1800,
    rating: 4.4
  },
  {
    id: 'kronstadt_seafood',
    name: {
      ru: 'Кронштадт Морепродукты',
      en: 'Kronstadt Seafood'
    },
    location: {
      city: 'Кронштадт',
      lat: 59.9667,
      lng: 29.7667
    },
    cuisine: 'Морепродукты',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: false,
      quickService: true
    },
    avgBill: 2200,
    rating: 4.2
  },
  {
    id: 'kizhi_traditional',
    name: {
      ru: 'Традиционная Кухня Кижи',
      en: 'Kizhi Traditional Cuisine'
    },
    location: {
      city: 'Кижи',
      lat: 62.0667,
      lng: 35.9
    },
    cuisine: 'Русская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: false
    },
    avgBill: 1200,
    rating: 4.6
  },
  {
    id: 'tikhvin_bread',
    name: {
      ru: 'Тихвинский Хлеб',
      en: 'Tikhvin Bread'
    },
    location: {
      city: 'Тихвин',
      lat: 59.65,
      lng: 33.5167
    },
    cuisine: 'Русская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 1000,
    rating: 4.1
  },
  {
    id: 'ladoga_fish',
    name: {
      ru: 'Рыбный Двор Ладога',
      en: 'Ladoga Fish Court'
    },
    location: {
      city: 'Старая Ладога',
      lat: 60.0167,
      lng: 32.3333
    },
    cuisine: 'Рыбная',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 1300,
    rating: 4.3
  },
  {
    id: 'ivan_medieval',
    name: {
      ru: 'Средневековый Двор Ивангород',
      en: 'Ivangorod Medieval Court'
    },
    location: {
      city: 'Ивангород',
      lat: 59.3833,
      lng: 28.2167
    },
    cuisine: 'Средневековая',
    seniorFriendly: {
      comfortableSeating: false,
      quiet: false,
      quickService: false
    },
    avgBill: 1600,
    rating: 4.0
  },
  {
    id: 'pavlovsk_patisserie',
    name: {
      ru: 'Павловская Патisserie',
      en: 'Pavlovsk Patisserie'
    },
    location: {
      city: 'Павловск',
      lat: 59.6833,
      lng: 30.45
    },
    cuisine: 'Французская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 1700,
    rating: 4.5
  },
  {
    id: 'oranienbaum_bistro',
    name: {
      ru: 'Ораниенбаум Бистро',
      en: 'Oranienbaum Bistro'
    },
    location: {
      city: 'Ломоносов',
      lat: 59.9036,
      lng: 29.7667
    },
    cuisine: 'Европейская',
    seniorFriendly: {
      comfortableSeating: true,
      quiet: true,
      quickService: true
    },
    avgBill: 1400,
    rating: 4.2
  }
];
