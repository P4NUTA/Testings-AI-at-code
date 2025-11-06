import { Transport } from '../types.js';

export const transportOptions: Transport[] = [
  {
    id: 'train_sp',
    type: 'train',
    from: 'Санкт-Петербург',
    to: 'Петергоф',
    duration: 30,
    price: 200,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'train_tsarskoye',
    type: 'train',
    from: 'Санкт-Петербург',
    to: 'Царское Село',
    duration: 45,
    price: 250,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'train_gatchina',
    type: 'train',
    from: 'Санкт-Петербург',
    to: 'Гатчина',
    duration: 60,
    price: 300,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'train_kronstadt',
    type: 'train',
    from: 'Санкт-Петербург',
    to: 'Кронштадт',
    duration: 90,
    price: 350,
    comfort: {
      transfers: 1,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'train_tikhvin',
    type: 'train',
    from: 'Санкт-Петербург',
    to: 'Тихвин',
    duration: 180,
    price: 800,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'bus_ladoga',
    type: 'bus',
    from: 'Санкт-Петербург',
    to: 'Старая Ладога',
    duration: 120,
    price: 400,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'taxi_ivan',
    type: 'taxi',
    from: 'Санкт-Петербург',
    to: 'Ивангород',
    duration: 120,
    price: 2500,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'bus_ivan',
    type: 'bus',
    from: 'Санкт-Петербург',
    to: 'Ивангород',
    duration: 150,
    price: 600,
    comfort: {
      transfers: 1,
      hasSeating: true,
      airConditioning: false
    }
  },
  {
    id: 'ferry_kizhi',
    type: 'taxi',
    from: 'Санкт-Петербург',
    to: 'Кижи',
    duration: 360,
    price: 5000,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'bus_pavlovsk',
    type: 'bus',
    from: 'Санкт-Петербург',
    to: 'Павловск',
    duration: 40,
    price: 150,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'local_taxi_1',
    type: 'taxi',
    from: 'Петергоф',
    to: 'Ораниенбаум',
    duration: 30,
    price: 800,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'local_taxi_2',
    type: 'taxi',
    from: 'Царское Село',
    to: 'Павловск',
    duration: 20,
    price: 500,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  },
  {
    id: 'bus_tikhvin',
    type: 'bus',
    from: 'Санкт-Петербург',
    to: 'Тихвин',
    duration: 240,
    price: 500,
    comfort: {
      transfers: 1,
      hasSeating: true,
      airConditioning: false
    }
  },
  {
    id: 'local_boat_valaam',
    type: 'taxi',
    from: 'Сортавала',
    to: 'Валаам',
    duration: 60,
    price: 1500,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: false
    }
  },
  {
    id: 'local_taxi_lodeynoye',
    type: 'taxi',
    from: 'Лодейное Поле',
    to: 'Староладожская варяжская волость',
    duration: 15,
    price: 400,
    comfort: {
      transfers: 0,
      hasSeating: true,
      airConditioning: true
    }
  }
];
