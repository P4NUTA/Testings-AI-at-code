import { Attraction } from '../types';

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'pushkin-lyceum',
    name: { ru: 'Лицей Пушкина в Царском Селе', en: 'Pushkin Lyceum in Tsarskoye Selo' },
    city: 'Пушкин',
    cluster: 'south',
    indoor: true,
    averageVisitHours: 2,
    entryFeeRub: 800,
    hasLowStairs: true,
    description: {
      ru: 'Интерактивная экскурсия в историческом здании с лифтом и пандусами.',
      en: 'Interactive visit in a historic building equipped with ramp and lift.'
    },
    transportMinutesFromSpb: 50,
    rainFriendly: true
  },
  {
    id: 'catherine-park',
    name: { ru: 'Екатерининский парк', en: 'Catherine Park' },
    city: 'Пушкин',
    cluster: 'south',
    indoor: false,
    averageVisitHours: 1.5,
    entryFeeRub: 500,
    hasLowStairs: true,
    description: {
      ru: 'Прогулка по ровным дорожкам, доступным для маломобильных гостей.',
      en: 'Leisure walk along flat lanes accessible for limited mobility.'
    },
    transportMinutesFromSpb: 50,
    rainFriendly: false
  },
  {
    id: 'pavlovsk-palace',
    name: { ru: 'Павловский дворец', en: 'Pavlovsk Palace' },
    city: 'Павловск',
    cluster: 'south',
    indoor: true,
    averageVisitHours: 2,
    entryFeeRub: 700,
    hasLowStairs: false,
    description: {
      ru: 'Экскурсия по дворцу с ограниченным количеством ступеней.',
      en: 'Palace tour with limited sets of stairs.'
    },
    transportMinutesFromSpb: 55,
    rainFriendly: true
  },
  {
    id: 'gatchina-park',
    name: { ru: 'Гатчинский парк', en: 'Gatchina Park' },
    city: 'Гатчина',
    cluster: 'south',
    indoor: false,
    averageVisitHours: 2,
    entryFeeRub: 300,
    hasLowStairs: true,
    description: {
      ru: 'Ровные дорожки и возможность взять электрокар для трансфера.',
      en: 'Flat walking routes with optional electric cart transfers.'
    },
    transportMinutesFromSpb: 60,
    rainFriendly: false
  },
  {
    id: 'vbg-hermitage',
    name: { ru: 'Выборгский эрмитаж', en: 'Vyborg Hermitage' },
    city: 'Выборг',
    cluster: 'northwest',
    indoor: true,
    averageVisitHours: 1.5,
    entryFeeRub: 600,
    hasLowStairs: true,
    description: {
      ru: 'Современные экспозиции, лифты и сиденья на каждом этаже.',
      en: 'Modern exhibits with elevators and seating areas on each floor.'
    },
    transportMinutesFromSpb: 90,
    rainFriendly: true
  },
  {
    id: 'monrepos-park',
    name: { ru: 'Парк Монрепо', en: 'Mon Repos Park' },
    city: 'Выборг',
    cluster: 'northwest',
    indoor: false,
    averageVisitHours: 2,
    entryFeeRub: 400,
    hasLowStairs: true,
    description: {
      ru: 'Парк с мягким рельефом и электрическими шаттлами.',
      en: 'Landscape park with gentle terrain and electric shuttles.'
    },
    transportMinutesFromSpb: 90,
    rainFriendly: false
  },
  {
    id: 'korela-fortress',
    name: { ru: 'Корельская крепость', en: 'Korela Fortress' },
    city: 'Приозерск',
    cluster: 'northwest',
    indoor: true,
    averageVisitHours: 1.5,
    entryFeeRub: 400,
    hasLowStairs: false,
    description: {
      ru: 'Музей внутри крепости, часть залов оборудована лифтами.',
      en: 'Fortress museum with lifts in main halls.'
    },
    transportMinutesFromSpb: 110,
    rainFriendly: true
  },
  {
    id: 'ladoga-cruise',
    name: { ru: 'Прогулка по Ладоге', en: 'Ladoga Cruise' },
    city: 'Старая Ладога',
    cluster: 'center',
    indoor: false,
    averageVisitHours: 2.5,
    entryFeeRub: 1200,
    hasLowStairs: true,
    description: {
      ru: 'Теплоход с лифтом и крытой палубой.',
      en: 'River boat with lift and covered deck.'
    },
    transportMinutesFromSpb: 90,
    rainFriendly: true
  },
  {
    id: 'staraya-ladoga-museum',
    name: { ru: 'Музей Старой Ладоги', en: 'Staraya Ladoga Museum' },
    city: 'Старая Ладога',
    cluster: 'center',
    indoor: true,
    averageVisitHours: 1.5,
    entryFeeRub: 500,
    hasLowStairs: true,
    description: {
      ru: 'Экспозиция на одном уровне, есть аудиогид.',
      en: 'Single-level exhibition with audio guide.'
    },
    transportMinutesFromSpb: 95,
    rainFriendly: true
  },
  {
    id: 'oraniembaum',
    name: { ru: 'Ораниенбаум', en: 'Oranienbaum Estate' },
    city: 'Ломоносов',
    cluster: 'center',
    indoor: true,
    averageVisitHours: 2,
    entryFeeRub: 650,
    hasLowStairs: false,
    description: {
      ru: 'Доступные павильоны и электрический микроавтобус по территории.',
      en: 'Accessible pavilions with electric shuttle across the estate.'
    },
    transportMinutesFromSpb: 45,
    rainFriendly: true
  }
];
