import { TravelPreferences, Itinerary, DayPlan, PlannedAttraction, Attraction, Transportation, Budget } from '@/types';
import { attractions, getAttractionsByInterests, getAccessibleAttractions, getWeatherSuitableAttractions } from '@/data/attractions';

// Хаверсин формула для расчета расстояния между двумя точками
const haversineDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number => {
  const R = 6371; // Радиус Земли в километрах
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Расчет времени и стоимости транспорта между точками
const calculateTransportation = (from: Attraction, to: Attraction): Transportation => {
  const distance = haversineDistance(from.coordinates, to.coordinates) * 1000; // метры
  const walkingTime = Math.round((distance / 5000) * 60); // 5 км/час средняя скорость

  return {
    walking: {
      time: walkingTime,
      distance: Math.round(distance),
      difficulty: distance > 1000 ? 'hard' : distance > 500 ? 'medium' : 'easy'
    },
    public: {
      time: Math.round(walkingTime * 0.8) + 10, // добавляем время ожидания
      cost: Math.round(40 + distance * 0.1), // базовая стоимость + расстояние
      transfers: distance > 5000 ? 1 : 0,
      accessibility: 'good'
    },
    taxi: {
      time: Math.round(walkingTime * 0.3),
      cost: Math.round(300 + distance * 0.15) // старт + за километр
    }
  };
};

// Расчет оценки доступности для маршрута
const calculateAccessibilityScore = (dayPlan: DayPlan): number => {
  let totalScore = 0;
  let maxScore = 0;

  dayPlan.attractions.forEach(attraction => {
    // Критерии доступности для 55+
    const criteria = [
      { weight: 15, value: attraction.accessibility.wheelchairAccess },
      { weight: 15, value: attraction.accessibility.hasElevator },
      { weight: 20, value: attraction.accessibility.minimalStairs },
      { weight: 15, value: attraction.accessibility.hasRamp },
      { weight: 10, value: attraction.accessibility.accessibleRestrooms },
      { weight: 10, value: attraction.accessibility.seatingAvailable },
      { weight: 5, value: attraction.accessibility.parkingNearby },
      { weight: 5, value: attraction.accessibility.lightingGood },
      { weight: 3, value: attraction.accessibility.handrailsAvailable },
      { weight: 2, value: attraction.accessibility.flatTerrain }
    ];

    criteria.forEach(criterion => {
      maxScore += criterion.weight;
      if (criterion.value) {
        totalScore += criterion.weight;
      }
    });
  });

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
};

// Детерминированный генератор случайных чисел на основе seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Генерация ID для маршрута
const generateId = (seed: number): string => {
  return `itinerary-${Date.now()}-${seed}`;
};

// Основная функция планирования маршрута
export const planItinerary = (preferences: TravelPreferences): Itinerary => {
  // Используем seed для детерминированности результатов
  const seed = Date.now() + preferences.age + preferences.groupSize;
  const random = seededRandom.bind(null, seed);

  // Фильтрация аттракционов по предпочтениям
  let candidateAttractions = getAttractionsByInterests(preferences.interests);
  candidateAttractions = getAccessibleAttractions(preferences.mobility);

  // Если нужно учесть погоду, фильтруем для дождливых дней
  if (preferences.weatherConsideration) {
    candidateAttractions = getWeatherSuitableAttractions(true, true);
  }

  // Если слишком мало подходящих аттракционов, расширяем критерии
  if (candidateAttractions.length < preferences.days * 2) {
    candidateAttractions = attractions.filter(a =>
      getAccessibleAttractions(preferences.mobility).includes(a)
    );
  }

  // Сортируем по релевантности (учитываем предпочтения по транспорту и бюджету)
  candidateAttractions.sort((a, b) => {
    // Учитываем загруженность (предпочитаем менее загруженные)
    const crowdScore = { low: 3, medium: 2, high: 1 };
    const crowdDiff = crowdScore[b.crowdLevel] - crowdScore[a.crowdLevel];

    // Учитываем доступность
    const accessibilityA = Object.values(a.accessibility).filter(Boolean).length;
    const accessibilityB = Object.values(b.accessibility).filter(Boolean).length;
    const accessibilityDiff = accessibilityB - accessibilityA;

    return crowdDiff * 10 + accessibilityDiff * 5 + (random() - 0.5) * 2;
  });

  // Создаем план на каждый день
  const days: DayPlan[] = [];
  let totalBudget: Budget = { low: 0, medium: 0, high: 0 };
  let totalDistance = 0;

  for (let day = 1; day <= preferences.days; day++) {
    const dayAttractions: PlannedAttraction[] = [];
    let currentBudget = { low: 0, medium: 0, high: 0 };
    let currentTime = 10; // Начинаем в 10:00
    let lastLocation = { lat: 59.9398, lng: 30.3146 }; // Санкт-Петербург (Эрмитаж)

    // Определяем количество аттракционов на день
    const attractionsPerDay = Math.min(3, Math.floor(candidateAttractions.length / preferences.days));

    for (let i = 0; i < attractionsPerDay && candidateAttractions.length > 0; i++) {
      // Выбираем ближайший аттракцион из оставшихся
      let bestIndex = 0;
      let bestScore = Infinity;

      candidateAttractions.forEach((attraction, index) => {
        const distance = haversineDistance(lastLocation, attraction.coordinates);
        const transport = calculateTransportation(
          { ...attraction, coordinates: lastLocation } as Attraction,
          attraction
        );

        // Рассчитываем оценку с учетом времени, расстояния и предпочтений
        let score = distance;

        // Учитываем время в пути
        if (preferences.transportPreference === 'walking') {
          score += transport.walking.time * 0.01;
        } else if (preferences.transportPreference === 'public') {
          score += transport.public.transfers * 0.5;
        }

        // Учитываем бюджет
        const priceIndex = preferences.budget === 'low' ? 0 : preferences.budget === 'medium' ? 1 : 2;
        const prices = [attraction.prices.ticket, attraction.prices.ticket * 1.5, attraction.prices.ticket * 2];
        score += prices[priceIndex] * 0.0001;

        // Добавляем случайность для разнообразия
        score += random() * 0.1;

        if (score < bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });

      const selectedAttraction = candidateAttractions.splice(bestIndex, 1)[0];
      const transport = calculateTransportation(
        { ...selectedAttraction, coordinates: lastLocation } as Attraction,
        selectedAttraction
      );

      // Определяем время начала и окончания посещения
      const travelTime = preferences.transportPreference === 'walking'
        ? transport.walking.time
        : preferences.transportPreference === 'public'
        ? transport.public.time
        : transport.taxi.time;

      const startTime = new Date();
      startTime.setHours(Math.floor(currentTime + travelTime / 60), (currentTime + travelTime / 60) % 1 * 60);

      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + selectedAttraction.visitDuration);

      // Рассчитываем цены в зависимости от бюджета
      const budgetMultiplier = preferences.budget === 'low' ? 1 : preferences.budget === 'medium' ? 1.5 : 2;

      const plannedAttraction: PlannedAttraction = {
        ...selectedAttraction,
        plannedStartTime: startTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        plannedEndTime: endTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        transportationFromPrevious: transport,
        actualPrice: {
          ticket: Math.round(selectedAttraction.prices.ticket * budgetMultiplier),
          guide: Math.round(selectedAttraction.prices.guide * budgetMultiplier),
          transport: preferences.transportPreference === 'taxi' ? transport.taxi.cost :
                   preferences.transportPreference === 'public' ? transport.public.cost :
                   transport.walking.distance * 0.0001,
          meal: Math.round(selectedAttraction.prices.meal * budgetMultiplier * 0.8) // экономия на питании
        },
        priority: i === 0 ? 'high' : i === 1 ? 'medium' : 'low'
      };

      dayAttractions.push(plannedAttraction);

      // Обновляем бюджет и время
      currentBudget.low += plannedAttraction.actualPrice.ticket + plannedAttraction.actualPrice.transport + plannedAttraction.actualPrice.meal;
      currentBudget.medium += plannedAttraction.actualPrice.ticket * 1.5 + plannedAttraction.actualPrice.transport * 1.2 + plannedAttraction.actualPrice.meal * 1.3;
      currentBudget.high += plannedAttraction.actualPrice.ticket * 2 + plannedAttraction.actualPrice.transport * 1.5 + plannedAttraction.actualPrice.meal * 1.5;

      totalDistance += haversineDistance(lastLocation, selectedAttraction.coordinates);
      currentTime = endTime.getHours() + endTime.getMinutes() / 60 + 1; // +1 час на дорогу

      lastLocation = selectedAttraction.coordinates;

      // Если уже поздно, прекращаем добавлять аттракционы
      if (currentTime >= 17) break;
    }

    // Создаем альтернативный план на случай дождя
    const weatherBackup: PlannedAttraction[] = [];
    if (preferences.weatherConsideration) {
      const indoorAttractions = attractions.filter(a => a.weatherSuitability.indoor && a.weatherSuitability.rainy);
      if (indoorAttractions.length > 0) {
        const backup = indoorAttractions[Math.floor(random() * indoorAttractions.length)];
        weatherBackup.push({
          ...backup,
          plannedStartTime: '14:00',
          plannedEndTime: '16:00',
          actualPrice: backup.prices,
          priority: 'medium'
        });
      }
    }

    // Рассчитываем общее время в пути и расстояние
    const totalTravelTime = dayAttractions.reduce((sum, attraction, index) => {
      if (index === 0) return 0;
      const transport = attraction.transportationFromPrevious!;
      return sum + (preferences.transportPreference === 'walking'
        ? transport.walking.time
        : preferences.transportPreference === 'public'
        ? transport.public.time
        : transport.taxi.time);
    }, 0);

    const totalWalkingDistance = dayAttractions.reduce((sum, attraction, index) => {
      if (index === 0) return 0;
      return sum + attraction.transportationFromPrevious!.walking.distance;
    }, 0);

    const dayPlan: DayPlan = {
      day,
      attractions: dayAttractions,
      totalBudget: currentBudget,
      totalTravelTime,
      totalWalkingDistance,
      accessibilityScore: calculateAccessibilityScore({ day, attractions: dayAttractions, totalBudget: currentBudget, totalTravelTime, totalWalkingDistance, accessibilityScore: 0, weatherBackup, notes: '' }),
      weatherBackup,
      notes: `Оптимальный маршрут для ${preferences.age} лет с учетом ${preferences.mobility === 'good' ? 'хорошей' : preferences.mobility === 'limited' ? 'ограниченной' : 'колесной'} мобильности.`
    };

    days.push(dayPlan);

    // Добавляем бюджет дня к общему бюджету
    totalBudget.low += currentBudget.low;
    totalBudget.medium += currentBudget.medium;
    totalBudget.high += currentBudget.high;
  }

  // Рассчитываем общую оценку доступности
  const overallAccessibilityScore = Math.round(
    days.reduce((sum, day) => sum + day.accessibilityScore, 0) / days.length
  );

  // Определяем уровень комфорта
  const comfortLevel = overallAccessibilityScore >= 80 ? 'high' :
                      overallAccessibilityScore >= 60 ? 'medium' : 'low';

  // Генерируем рекомендации
  const recommendations = [
    'Рекомендуется начинать экскурсии утром в 10:00 для избежания crowds',
    'Возьмите с собой удобную обувь и воду',
    'Проверьте прогноз погоды перед поездкой'
  ];

  if (preferences.mobility === 'limited') {
    recommendations.push('Используйте такси для дальних перемещений');
  }

  if (preferences.weatherConsideration) {
    recommendations.push('Имейте запасной план на случай дождя');
  }

  return {
    id: generateId(seed),
    preferences,
    days,
    totalBudget,
    totalDistance: Math.round(totalDistance),
    accessibilityRating: overallAccessibilityScore,
    comfortLevel,
    recommendations,
    emergencyContacts: {
      police: '102',
      medical: '103',
      tourist: '8-800-550-55-05'
    },
    createdAt: new Date().toISOString(),
    seed
  };
};

// Валидация предпочтений
export const validatePreferences = (preferences: Partial<TravelPreferences>): string[] => {
  const errors: string[] = [];

  if (!preferences.days || ![1, 2, 3].includes(preferences.days)) {
    errors.push('Выберите корректную продолжительность тура (1-3 дня)');
  }

  if (!preferences.budget || !['low', 'medium', 'high'].includes(preferences.budget)) {
    errors.push('Выберите уровень бюджета');
  }

  if (!preferences.mobility || !['good', 'limited', 'wheelchair'].includes(preferences.mobility)) {
    errors.push('Укажите уровень мобильности');
  }

  if (!preferences.interests || preferences.interests.length === 0) {
    errors.push('Выберите хотя бы одну категорию интересов');
  }

  if (!preferences.transportPreference || !['walking', 'public', 'taxi', 'mixed'].includes(preferences.transportPreference)) {
    errors.push('Выберите предпочтительный вид транспорта');
  }

  if (!preferences.groupSize || preferences.groupSize < 1 || preferences.groupSize > 20) {
    errors.push('Укажите корректное количество человек (1-20)');
  }

  if (!preferences.age || preferences.age < 55 || preferences.age > 100) {
    errors.push('Возраст должен быть от 55 до 100 лет');
  }

  return errors;
};