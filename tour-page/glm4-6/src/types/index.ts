export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Accessibility {
  wheelchairAccess: boolean; // доступность для колясок
  hasElevator: boolean; // наличие лифта
  minimalStairs: boolean; // минимальное количество лестниц
  hasRamp: boolean; // наличие пандуса
  accessibleRestrooms: boolean; // доступные санузлы
  seatingAvailable: boolean; // наличие мест для отдыха
  parkingNearby: boolean; // парковка рядом
  lightingGood: boolean; // хорошее освещение
  handrailsAvailable: boolean; // наличие перил
  flatTerrain: boolean; // ровная поверхность
}

export interface Budget {
  low: number; // минимальный бюджет
  medium: number; // средний бюджет
  high: number; // высокий бюджет
}

export interface Price {
  ticket: number; // цена билета
  guide: number; // цена гида
  transport: number; // стоимость транспорта
  meal: number; // стоимость питания
}

export interface WeatherSuitability {
  good: boolean; // подходит для хорошей погоды
  rainy: boolean; // подходит для дождливой погоды
  indoor: boolean; // indoor аттракцион
}

export interface Transportation {
  walking: {
    time: number; // минуты
    distance: number; // метры
    difficulty: 'easy' | 'medium' | 'hard';
  };
  public: {
    time: number; // минуты
    cost: number; // рубли
    transfers: number; // количество пересадок
    accessibility: 'good' | 'medium' | 'limited';
  };
  taxi: {
    time: number; // минуты
    cost: number; // рубли
  };
}

export interface Attraction {
  id: string;
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  category: 'museum' | 'palace' | 'park' | 'church' | 'monument' | 'nature' | 'theater' | 'gallery';
  coordinates: Coordinates;
  accessibility: Accessibility;
  visitDuration: number; // рекомендуемая продолжительность в минутах
  prices: Price;
  weatherSuitability: WeatherSuitability;
  bestTimeToVisit: string; // лучшее время для посещения
  crowdLevel: 'low' | 'medium' | 'high'; // уровень загруженности
  photoAllowed: boolean;
  hasGiftShop: boolean;
  hasCafe: boolean;
}

export interface TravelPreferences {
  days: 1 | 2 | 3;
  budget: 'low' | 'medium' | 'high';
  mobility: 'good' | 'limited' | 'wheelchair';
  interests: string[]; // категории интересов
  transportPreference: 'walking' | 'public' | 'taxi' | 'mixed';
  startLocation: string; // начальная точка (Санкт-Петербург по умолчанию)
  groupSize: number; // количество человек
  age: number; // возраст для персонализации
  weatherConsideration: boolean; // учитывать погоду
}

export interface DayPlan {
  day: number;
  attractions: PlannedAttraction[];
  totalBudget: Budget;
  totalTravelTime: number; // минут
  totalWalkingDistance: number; // метров
  accessibilityScore: number; // 0-100
  weatherBackup: PlannedAttraction[]; // альтернативы на случай дождя
  notes: string;
}

export interface PlannedAttraction extends Attraction {
  plannedStartTime: string;
  plannedEndTime: string;
  transportationFromPrevious?: Transportation;
  actualPrice: Price;
  priority: 'high' | 'medium' | 'low';
}

export interface Itinerary {
  id: string;
  preferences: TravelPreferences;
  days: DayPlan[];
  totalBudget: Budget;
  totalDistance: number; // километры
  accessibilityRating: number; // 0-100
  comfortLevel: 'high' | 'medium' | 'low';
  recommendations: string[];
  emergencyContacts: {
    police: string;
    medical: string;
    tourist: string;
  };
  createdAt: string;
  seed: number; // для детерминированности результатов
}

export interface Language {
  code: 'ru' | 'en';
  name: string;
  flag: string;
}

export interface NavigationItem {
  id: string;
  label: {
    ru: string;
    en: string;
  };
  icon: string;
  path: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}