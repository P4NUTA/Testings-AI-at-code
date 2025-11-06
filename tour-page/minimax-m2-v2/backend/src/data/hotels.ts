import { Hotel } from '../types.js';

export const hotels: Hotel[] = [
  {
    id: 'peterhof_grand',
    name: {
      ru: 'Петергоф Гранд Отель',
      en: 'Peterhof Grand Hotel'
    },
    location: {
      city: 'Петергоф',
      lat: 59.8792,
      lng: 29.9082
    },
    stars: 4,
    accessibilityFeatures: {
      elevator: true,
      wheelchairRoom: true,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 8000,
    rating: 4.6,
    amenities: ['WiFi', 'Ресторан', 'Спа', 'Парковка']
  },
  {
    id: 'tsarskoye_selo',
    name: {
      ru: 'Царское Село Отель',
      en: 'Tsarskoye Selo Hotel'
    },
    location: {
      city: 'Царское Село',
      lat: 59.7148,
      lng: 30.3975
    },
    stars: 4,
    accessibilityFeatures: {
      elevator: true,
      wheelchairRoom: true,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 7500,
    rating: 4.5,
    amenities: ['WiFi', 'Завтрак', 'Парковка']
  },
  {
    id: 'gatchina_manor',
    name: {
      ru: 'Гатчинская Усадьба',
      en: 'Gatchina Manor'
    },
    location: {
      city: 'Гатчина',
      lat: 59.5667,
      lng: 30.1167
    },
    stars: 3,
    accessibilityFeatures: {
      elevator: true,
      wheelchairRoom: true,
      grabRails: false,
      lowFloors: true
    },
    pricePerNight: 5500,
    rating: 4.3,
    amenities: ['WiFi', 'Ресторан']
  },
  {
    id: 'kronstadt_naval',
    name: {
      ru: 'Кронштадт Морской',
      en: 'Kronstadt Naval Hotel'
    },
    location: {
      city: 'Кронштадт',
      lat: 59.9667,
      lng: 29.7667
    },
    stars: 3,
    accessibilityFeatures: {
      elevator: true,
      wheelchairRoom: false,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 4500,
    rating: 4.2,
    amenities: ['WiFi', 'Завтрак', 'Парковка']
  },
  {
    id: 'lodeynoye_pole',
    name: {
      ru: 'Лодейное Поле Отель',
      en: 'Lodeynoye Pole Hotel'
    },
    location: {
      city: 'Лодейное Поле',
      lat: 60.7333,
      lng: 33.2333
    },
    stars: 3,
    accessibilityFeatures: {
      elevator: false,
      wheelchairRoom: false,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 3500,
    rating: 4.0,
    amenities: ['WiFi', 'Ресторан']
  },
  {
    id: 'tikhvin_monastery',
    name: {
      ru: 'Тихвин Гостиница',
      en: 'Tikhvin Guest House'
    },
    location: {
      city: 'Тихвин',
      lat: 59.65,
      lng: 33.5167
    },
    stars: 2,
    accessibilityFeatures: {
      elevator: false,
      wheelchairRoom: false,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 2500,
    rating: 3.9,
    amenities: ['WiFi', 'Завтрак']
  },
  {
    id: 'kizhi_eco',
    name: {
      ru: 'Кижи Эко Отель',
      en: 'Kizhi Eco Hotel'
    },
    location: {
      city: 'Кижи',
      lat: 62.0667,
      lng: 35.9
    },
    stars: 3,
    accessibilityFeatures: {
      elevator: false,
      wheelchairRoom: true,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 6000,
    rating: 4.4,
    amenities: ['WiFi', 'Ресторан', 'Спа', 'Сауна']
  },
  {
    id: 'staraya_ladoga',
    name: {
      ru: 'Старая Ладога Гостиный Двор',
      en: 'Staraya Ladoga Inn'
    },
    location: {
      city: 'Старая Ладога',
      lat: 60.0167,
      lng: 32.3333
    },
    stars: 2,
    accessibilityFeatures: {
      elevator: false,
      wheelchairRoom: false,
      grabRails: true,
      lowFloors: true
    },
    pricePerNight: 3000,
    rating: 4.1,
    amenities: ['WiFi', 'Ресторан', 'Парковка']
  }
];
