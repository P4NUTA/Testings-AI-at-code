import { Attraction } from '../types.js';

export const attractions: Attraction[] = [
  {
    id: 'peterhof',
    name: {
      ru: 'Петергоф',
      en: 'Peterhof'
    },
    description: {
      ru: 'Величественный дворцово-парковый ансамбль с фонтанами',
      en: 'Magnificent palace and park ensemble with fountains'
    },
    category: 'palace',
    location: {
      city: 'Петергоф',
      lat: 59.8792,
      lng: 29.9082,
      distanceFromSPb: 29
    },
    accessibility: {
      stairsLevel: 3,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 8
    },
    visitDuration: 180,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-19:00',
      'sun': '10:00-19:00'
    },
    ticketPrice: 1500,
    indoor: false,
    rating: 4.8,
    photos: ['/images/peterhof.jpg']
  },
  {
    id: 'catherine_palace',
    name: {
      ru: 'Екатерининский дворец',
      en: 'Catherine Palace'
    },
    description: {
      ru: 'Барокко-рокко дворец с Янтарной комнатой',
      en: 'Baroque-Rococo palace with the Amber Room'
    },
    category: 'palace',
    location: {
      city: 'Царское Село',
      lat: 59.7148,
      lng: 30.3975,
      distanceFromSPb: 25
    },
    accessibility: {
      stairsLevel: 2,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 6
    },
    visitDuration: 150,
    openingHours: {
      'mon': 'closed',
      'tue': '12:00-19:00',
      'wed': '12:00-19:00',
      'thu': '12:00-19:00',
      'fri': '12:00-19:00',
      'sat': '12:00-19:00',
      'sun': '12:00-19:00'
    },
    ticketPrice: 1200,
    indoor: true,
    rating: 4.7,
    photos: ['/images/catherine.jpg']
  },
  {
    id: 'valaam',
    name: {
      ru: 'Валаам',
      en: 'Valaam'
    },
    description: {
      ru: 'Монастырь на живописном острове',
      en: 'Monastery on a picturesque island'
    },
    category: 'church',
    location: {
      city: 'Валаам',
      lat: 61.3786,
      lng: 30.9742,
      distanceFromSPb: 220
    },
    accessibility: {
      stairsLevel: 4,
      elevator: false,
      wheelchairAccessible: false,
      restAreas: 10
    },
    visitDuration: 240,
    openingHours: {
      'mon': '06:00-20:00',
      'tue': '06:00-20:00',
      'wed': '06:00-20:00',
      'thu': '06:00-20:00',
      'fri': '06:00-20:00',
      'sat': '06:00-20:00',
      'sun': '06:00-20:00'
    },
    ticketPrice: 400,
    indoor: false,
    rating: 4.9,
    photos: ['/images/valaam.jpg']
  },
  {
    id: 'pavlovsk',
    name: {
      ru: 'Павловск',
      en: 'Pavlovsk'
    },
    description: {
      ru: 'Дворец и парк в стиле классицизм',
      en: 'Palace and park in Neoclassical style'
    },
    category: 'palace',
    location: {
      city: 'Павловск',
      lat: 59.6833,
      lng: 30.45,
      distanceFromSPb: 30
    },
    accessibility: {
      stairsLevel: 2,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 7
    },
    visitDuration: 150,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-18:00',
      'sun': '10:00-18:00'
    },
    ticketPrice: 1000,
    indoor: true,
    rating: 4.6,
    photos: ['/images/pavlovsk.jpg']
  },
  {
    id: 'oranienbaum',
    name: {
      ru: 'Ораниенбаум',
      en: 'Oranienbaum'
    },
    description: {
      ru: 'Единственный уцелевший загородный императорский дворец',
      en: 'The only surviving imperial suburban palace'
    },
    category: 'palace',
    location: {
      city: 'Ломоносов',
      lat: 59.9036,
      lng: 29.7667,
      distanceFromSPb: 40
    },
    accessibility: {
      stairsLevel: 2,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 5
    },
    visitDuration: 120,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-18:00',
      'sun': '10:00-18:00'
    },
    ticketPrice: 800,
    indoor: true,
    rating: 4.5,
    photos: ['/images/oranienbaum.jpg']
  },
  {
    id: 'kronstadt',
    name: {
      ru: 'Кронштадт',
      en: 'Kronstadt'
    },
    description: {
      ru: 'Историческая военно-морская база',
      en: 'Historic naval base'
    },
    category: 'historical',
    location: {
      city: 'Кронштадт',
      lat: 59.9667,
      lng: 29.7667,
      distanceFromSPb: 50
    },
    accessibility: {
      stairsLevel: 3,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 6
    },
    visitDuration: 180,
    openingHours: {
      'mon': '09:00-18:00',
      'tue': '09:00-18:00',
      'wed': '09:00-18:00',
      'thu': '09:00-18:00',
      'fri': '09:00-18:00',
      'sat': '09:00-18:00',
      'sun': '09:00-18:00'
    },
    ticketPrice: 600,
    indoor: true,
    rating: 4.4,
    photos: ['/images/kronstadt.jpg']
  },
  {
    id: 'gatchina',
    name: {
      ru: 'Гатчина',
      en: 'Gatchina'
    },
    description: {
      ru: 'Дворец с уникальной архитектурой',
      en: 'Palace with unique architecture'
    },
    category: 'palace',
    location: {
      city: 'Гатчина',
      lat: 59.5667,
      lng: 30.1167,
      distanceFromSPb: 45
    },
    accessibility: {
      stairsLevel: 3,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 5
    },
    visitDuration: 150,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-18:00',
      'sun': '10:00-18:00'
    },
    ticketPrice: 900,
    indoor: true,
    rating: 4.5,
    photos: ['/images/gatchina.jpg']
  },
  {
    id: 'kizhi',
    name: {
      ru: 'Кижи',
      en: 'Kizhi'
    },
    description: {
      ru: 'Деревянная церковь в музее-заповеднике',
      en: 'Wooden church in open-air museum'
    },
    category: 'museum',
    location: {
      city: 'Кижи',
      lat: 62.0667,
      lng: 35.9,
      distanceFromSPb: 400
    },
    accessibility: {
      stairsLevel: 3,
      elevator: false,
      wheelchairAccessible: true,
      restAreas: 4
    },
    visitDuration: 180,
    openingHours: {
      'mon': '09:00-19:00',
      'tue': '09:00-19:00',
      'wed': '09:00-19:00',
      'thu': '09:00-19:00',
      'fri': '09:00-19:00',
      'sat': '09:00-19:00',
      'sun': '09:00-19:00'
    },
    ticketPrice: 700,
    indoor: false,
    rating: 4.7,
    photos: ['/images/kizhi.jpg']
  },
  {
    id: 'lodeynoye_pole',
    name: {
      ru: 'Лодейное Поле',
      en: 'Lodeynoye Pole'
    },
    description: {
      ru: 'Ворота в Карелию с историческими памятниками',
      en: 'Gateway to Karelia with historical monuments'
    },
    category: 'historical',
    location: {
      city: 'Лодейное Поле',
      lat: 60.7333,
      lng: 33.2333,
      distanceFromSPb: 240
    },
    accessibility: {
      stairsLevel: 2,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 5
    },
    visitDuration: 90,
    openingHours: {
      'mon': '09:00-18:00',
      'tue': '09:00-18:00',
      'wed': '09:00-18:00',
      'thu': '09:00-18:00',
      'fri': '09:00-18:00',
      'sat': '10:00-17:00',
      'sun': '10:00-17:00'
    },
    ticketPrice: 300,
    indoor: true,
    rating: 4.2,
    photos: ['/images/lodeynoye.jpg']
  },
  {
    id: 'shlisselburg',
    name: {
      ru: 'Шлиссельбург',
      en: 'Shlisselburg'
    },
    description: {
      ru: 'Крепость на острове в истоке Невы',
      en: 'Fortress on the island at Neva river source'
    },
    category: 'historical',
    location: {
      city: 'Шлиссельбург',
      lat: 59.9442,
      lng: 31.0331,
      distanceFromSPb: 45
    },
    accessibility: {
      stairsLevel: 4,
      elevator: false,
      wheelchairAccessible: false,
      restAreas: 3
    },
    visitDuration: 120,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-18:00',
      'sun': '10:00-18:00'
    },
    ticketPrice: 500,
    indoor: true,
    rating: 4.3,
    photos: ['/images/shlisselburg.jpg']
  },
  {
    id: 'volvostanka',
    name: {
      ru: 'Волговостанка',
      en: 'Volgovostanka'
    },
    description: {
      ru: 'Место пребывания Пушкина в изгнании',
      en: 'Place of Pushkin\'s exile residence'
    },
    category: 'historical',
    location: {
      city: 'Волговостанка',
      lat: 59.7833,
      lng: 30.35,
      distanceFromSPb: 75
    },
    accessibility: {
      stairsLevel: 2,
      elevator: false,
      wheelchairAccessible: true,
      restAreas: 4
    },
    visitDuration: 90,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-17:00',
      'wed': '10:00-17:00',
      'thu': '10:00-17:00',
      'fri': '10:00-17:00',
      'sat': '10:00-17:00',
      'sun': '10:00-17:00'
    },
    ticketPrice: 350,
    indoor: true,
    rating: 4.1,
    photos: ['/images/volvostanka.jpg']
  },
  {
    id: 'tikhvin',
    name: {
      ru: 'Тихвин',
      en: 'Tikhvin'
    },
    description: {
      ru: 'Город с древним монастырем',
      en: 'City with ancient monastery'
    },
    category: 'church',
    location: {
      city: 'Тихвин',
      lat: 59.65,
      lng: 33.5167,
      distanceFromSPb: 200
    },
    accessibility: {
      stairsLevel: 2,
      elevator: true,
      wheelchairAccessible: true,
      restAreas: 6
    },
    visitDuration: 150,
    openingHours: {
      'mon': '08:00-18:00',
      'tue': '08:00-18:00',
      'wed': '08:00-18:00',
      'thu': '08:00-18:00',
      'fri': '08:00-18:00',
      'sat': '08:00-18:00',
      'sun': '08:00-18:00'
    },
    ticketPrice: 200,
    indoor: true,
    rating: 4.5,
    photos: ['/images/tikhvin.jpg']
  },
  {
    id: 'staraya_ladoga',
    name: {
      ru: 'Старая Ладога',
      en: 'Staraya Ladoga'
    },
    description: {
      ru: 'Древняя столица северо-запада',
      en: 'Ancient capital of the northwest'
    },
    category: 'historical',
    location: {
      city: 'Старая Ладога',
      lat: 60.0167,
      lng: 32.3333,
      distanceFromSPb: 130
    },
    accessibility: {
      stairsLevel: 3,
      elevator: false,
      wheelchairAccessible: false,
      restAreas: 5
    },
    visitDuration: 120,
    openingHours: {
      'mon': '09:00-18:00',
      'tue': '09:00-18:00',
      'wed': '09:00-18:00',
      'thu': '09:00-18:00',
      'fri': '09:00-18:00',
      'sat': '09:00-18:00',
      'sun': '09:00-18:00'
    },
    ticketPrice: 400,
    indoor: true,
    rating: 4.4,
    photos: ['/images/ladoga.jpg']
  },
  {
    id: 'ivangorod',
    name: {
      ru: 'Ивангород',
      en: 'Ivangorod'
    },
    description: {
      ru: 'Пограничная крепость на Нарве',
      en: 'Border fortress on Narva river'
    },
    category: 'historical',
    location: {
      city: 'Ивангород',
      lat: 59.3833,
      lng: 28.2167,
      distanceFromSPb: 150
    },
    accessibility: {
      stairsLevel: 4,
      elevator: false,
      wheelchairAccessible: false,
      restAreas: 4
    },
    visitDuration: 120,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-18:00',
      'wed': '10:00-18:00',
      'thu': '10:00-18:00',
      'fri': '10:00-18:00',
      'sat': '10:00-18:00',
      'sun': '10:00-18:00'
    },
    ticketPrice: 450,
    indoor: true,
    rating: 4.3,
    photos: ['/images/ivangorod.jpg']
  },
  {
    id: 'vikingsettlement',
    name: {
      ru: 'Староладожская варяжская волость',
      en: 'Staraya Ladoga Viking Settlement'
    },
    description: {
      ru: 'Музей викингов под открытым небом',
      en: 'Open-air Viking museum'
    },
    category: 'museum',
    location: {
      city: 'Старая Ладога',
      lat: 60.0167,
      lng: 32.3333,
      distanceFromSPb: 130
    },
    accessibility: {
      stairsLevel: 2,
      elevator: false,
      wheelchairAccessible: true,
      restAreas: 6
    },
    visitDuration: 90,
    openingHours: {
      'mon': 'closed',
      'tue': '10:00-17:00',
      'wed': '10:00-17:00',
      'thu': '10:00-17:00',
      'fri': '10:00-17:00',
      'sat': '10:00-17:00',
      'sun': '10:00-17:00'
    },
    ticketPrice: 500,
    indoor: false,
    rating: 4.0,
    photos: ['/images/vikings.jpg']
  }
];
