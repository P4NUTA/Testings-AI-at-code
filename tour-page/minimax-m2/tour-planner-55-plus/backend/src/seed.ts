import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.nearbyAttraction.deleteMany();
  await prisma.route.deleteMany();
  await prisma.transportation.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.itinerary.deleteMany();

  const destinations = await prisma.destination.createMany({
    data: [
      {
        name: 'Эрмитаж',
        nameEn: 'Hermitage Museum',
        description: 'Один из крупнейших музеев мира с коллекцией произведений искусства',
        descriptionEn: 'One of the world\'s largest museums with a collection of artworks',
        category: 'museum',
        city: 'Saint Petersburg',
        latitude: 59.9398,
        longitude: 30.3146,
        duration: 180,
        price: 700,
        accessibilityFeatures: JSON.stringify({
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
          audioGuide: true,
        }),
        isIndoor: true,
        images: 'https://example.com/hermitage1.jpg',
        accessibilityScore: 95,
        restAreas: 15,
        stairsLevel: 'none',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Исаакиевский собор',
        nameEn: 'St. Isaac\'s Cathedral',
        description: 'Крупнейший православный храм Санкт-Петербурга с колоннадой',
        descriptionEn: 'The largest Orthodox cathedral in Saint Petersburg with a colonnade',
        category: 'religious',
        city: 'Saint Petersburg',
        latitude: 59.9343,
        longitude: 30.3027,
        duration: 90,
        price: 300,
        accessibilityFeatures: JSON.stringify({
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
        }),
        isIndoor: true,
        images: 'https://example.com/isaac1.jpg',
        accessibilityScore: 90,
        restAreas: 8,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Петергоф',
        nameEn: 'Peterhof',
        description: 'Дворцово-парковый ансамбль с фонтанами и парками',
        descriptionEn: 'Palace and park ensemble with fountains and gardens',
        category: 'palace',
        city: 'Peterhof',
        latitude: 59.8844,
        longitude: 29.9082,
        duration: 240,
        price: 1000,
        accessibilityFeatures: JSON.stringify({
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
          benches: true,
        }),
        isIndoor: false,
        images: 'https://example.com/peterhof1.jpg',
        accessibilityScore: 85,
        restAreas: 20,
        stairsLevel: 'none',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Павловск',
        nameEn: 'Pavlovsk',
        description: 'Дворец и парк, идеальные для неспешных прогулок',
        descriptionEn: 'Palace and park perfect for leisurely strolls',
        category: 'park',
        city: 'Pavlovsk',
        latitude: 59.6847,
        longitude: 30.4425,
        duration: 180,
        price: 500,
        accessibilityFeatures: JSON.stringify({
          wheelchairAccessible: true,
          benches: true,
          smoothPaths: true,
        }),
        isIndoor: false,
        images: 'https://example.com/pavlovsk1.jpg',
        accessibilityScore: 80,
        restAreas: 25,
        stairsLevel: 'none',
        elevatorAvailable: false,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Екатерининский дворец',
        nameEn: 'Catherine Palace',
        description: 'Барокко-дворец с Янтарной комнатой',
        descriptionEn: 'Baroque palace with the Amber Room',
        category: 'palace',
        city: 'Pushkin',
        latitude: 59.7143,
        longitude: 30.3982,
        duration: 150,
        price: 600,
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
        },
        isIndoor: true,
        images: ['https://example.com/catherine1.jpg'],
        accessibilityScore: 88,
        restAreas: 10,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Гатчина',
        nameEn: 'Gatchina',
        description: 'Дворец с подземными ходами и Белым озером',
        descriptionEn: 'Palace with underground passages and White Lake',
        category: 'palace',
        city: 'Gatchina',
        latitude: 59.5581,
        longitude: 30.1261,
        duration: 150,
        price: 450,
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
          boardwalk: true,
        },
        isIndoor: true,
        images: ['https://example.com/gatchina1.jpg'],
        accessibilityScore: 85,
        restAreas: 12,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Ладожское озеро',
        nameEn: 'Lake Ladoga',
        description: 'Крупнейшее озеро Европы с прогулочными зонами',
        descriptionEn: 'Largest lake in Europe with promenades',
        category: 'nature',
        city: 'Ladoga',
        latitude: 60.7099,
        longitude: 31.5413,
        duration: 120,
        price: 200,
        accessibilityFeatures: {
          benches: true,
          smoothPaths: true,
        },
        isIndoor: false,
        images: ['https://example.com/ladoga1.jpg'],
        accessibilityScore: 70,
        restAreas: 15,
        stairsLevel: 'none',
        elevatorAvailable: false,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Крепость Орешек',
        nameEn: 'Oreshek Fortress',
        description: 'Историческая крепость на Неве',
        descriptionEn: 'Historical fortress on the Neva River',
        category: 'historical',
        city: 'Shlisselburg',
        latitude: 59.9483,
        longitude: 31.0375,
        duration: 180,
        price: 400,
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
        },
        isIndoor: true,
        images: ['https://example.com/oreshek1.jpg'],
        accessibilityScore: 75,
        restAreas: 8,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Парк Майнола',
        nameEn: 'Mainola Park',
        description: 'Спокойный парк для прогулок',
        descriptionEn: 'Peaceful park for walks',
        category: 'park',
        city: 'Vologda',
        latitude: 59.2205,
        longitude: 39.8835,
        duration: 90,
        price: 100,
        accessibilityFeatures: {
          benches: true,
          smoothPaths: true,
        },
        isIndoor: false,
        images: ['https://example.com/mainola1.jpg'],
        accessibilityScore: 75,
        restAreas: 20,
        stairsLevel: 'none',
        elevatorAvailable: false,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Музей-заповедник "Прорыв блокады"',
        nameEn: 'Breakthrough of the Siege Museum',
        description: 'Музей о событиях блокады Ленинграда',
        descriptionEn: 'Museum about the siege of Leningrad',
        category: 'museum',
        city: 'Kirovsk',
        latitude: 59.8797,
        longitude: 30.9854,
        duration: 120,
        price: 250,
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
        },
        isIndoor: true,
        images: ['https://example.com/breakthrough1.jpg'],
        accessibilityScore: 85,
        restAreas: 10,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Приоратский дворец',
        nameEn: 'Priory Palace',
        description: 'Дворец в готическом стиле',
        descriptionEn: 'Palace in Gothic style',
        category: 'palace',
        city: 'Gatchina',
        latitude: 59.5613,
        longitude: 30.1312,
        duration: 90,
        price: 300,
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
        },
        isIndoor: true,
        images: ['https://example.com/priory1.jpg'],
        accessibilityScore: 80,
        restAreas: 6,
        stairsLevel: 'few',
        elevatorAvailable: true,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
      {
        name: 'Тихвин',
        nameEn: 'Tikhvin',
        description: 'Город с историческим центром и монастырем',
        descriptionEn: 'City with historic center and monastery',
        category: 'historical',
        city: 'Tikhvin',
        latitude: 59.6453,
        longitude: 33.5203,
        duration: 180,
        price: 350,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          benches: true,
        },
        isIndoor: false,
        images: ['https://example.com/tikhvin1.jpg'],
        accessibilityScore: 70,
        restAreas: 12,
        stairsLevel: 'few',
        elevatorAvailable: false,
        wheelchairAccessible: true,
        benchesAvailable: true,
      },
    ],
  });

  console.log(`✅ Created ${destinations.count} destinations`);

  const hotels = await prisma.hotel.createMany({
    data: [
      {
        name: 'Отель "Европейский"',
        nameEn: 'Hotel "European"',
        city: 'Saint Petersburg',
        description: 'Комфортабельный отель в центре города с панорамным видом',
        descriptionEn: 'Comfortable hotel in the city center with panoramic views',
        pricePerNight: 8500,
        stars: 5,
        amenities: ['WiFi', 'Завтрак', 'Спа', 'Парковка', 'Лифт'],
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
          accessibleRoom: true,
        },
        images: ['https://example.com/european1.jpg'],
        latitude: 59.9355,
        longitude: 30.3264,
      },
      {
        name: 'Парк-отель "Павловск"',
        nameEn: 'Park Hotel "Pavlovsk"',
        city: 'Pavlovsk',
        description: 'Отель на территории парка с тихой атмосферой',
        descriptionEn: 'Hotel in the park territory with quiet atmosphere',
        pricePerNight: 4500,
        stars: 4,
        amenities: ['WiFi', 'Завтрак', 'Парковка', 'Лифт'],
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
          ramp: true,
        },
        images: ['https://example.com/pavlovsk-hotel1.jpg'],
        latitude: 59.6847,
        longitude: 30.4425,
      },
      {
        name: 'Гостиница "Петергоф"',
        nameEn: 'Hotel "Peterhof"',
        city: 'Peterhof',
        description: 'Гостиница рядом с парком',
        descriptionEn: 'Hotel near the park',
        pricePerNight: 3200,
        stars: 3,
        amenities: ['WiFi', 'Парковка'],
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
        },
        images: ['https://example.com/peterhof-hotel1.jpg'],
        latitude: 59.8844,
        longitude: 29.9082,
      },
      {
        name: 'Отель "Гатчина"',
        nameEn: 'Hotel "Gatchina"',
        city: 'Gatchina',
        description: 'Уютный отель в исторической части города',
        descriptionEn: 'Cozy hotel in the historic part of the city',
        pricePerNight: 2800,
        stars: 3,
        amenities: ['WiFi', 'Завтрак', 'Парковка'],
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
        },
        images: ['https://example.com/gatchina-hotel1.jpg'],
        latitude: 59.5581,
        longitude: 30.1261,
      },
      {
        name: 'Хаус "Пушкин"',
        nameEn: 'House "Pushkin"',
        city: 'Pushkin',
        description: 'Мини-отель с домашней атмосферой',
        descriptionEn: 'Mini hotel with home-like atmosphere',
        pricePerNight: 3800,
        stars: 4,
        amenities: ['WiFi', 'Завтрак', 'Лифт'],
        accessibilityFeatures: {
          elevator: true,
          wheelchairAccessible: true,
        },
        images: ['https://example.com/pushkin-hotel1.jpg'],
        latitude: 59.7143,
        longitude: 30.3982,
      },
    ],
  });

  console.log(`✅ Created ${hotels.count} hotels`);

  const restaurants = await prisma.restaurant.createMany({
    data: [
      {
        name: 'Ресторан "Пушкин"',
        nameEn: 'Restaurant "Pushkin"',
        city: 'Saint Petersburg',
        cuisine: 'Русская',
        description: 'Элегантный ресторан русской кухни',
        descriptionEn: 'Elegant Russian cuisine restaurant',
        averageBill: 2500,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          elevator: true,
        },
        images: ['https://example.com/pushkin-rest1.jpg'],
        latitude: 59.9367,
        longitude: 30.3148,
      },
      {
        name: 'Кафе "Садко"',
        nameEn: 'Cafe "Sadko"',
        city: 'Saint Petersburg',
        cuisine: 'Европейская',
        description: 'Уютное кафе с летней террасой',
        descriptionEn: 'Cozy cafe with summer terrace',
        averageBill: 1200,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          ramp: true,
        },
        images: ['https://example.com/sadko1.jpg'],
        latitude: 59.9315,
        longitude: 30.3554,
      },
      {
        name: 'Ресторан "Офицерское собрание"',
        nameEn: 'Restaurant "Officers\' Assembly"',
        city: 'Gatchina',
        cuisine: 'Русская',
        description: 'Исторический ресторан в центре города',
        descriptionEn: 'Historic restaurant in the city center',
        averageBill: 1800,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          elevator: true,
        },
        images: ['https://example.com/officers1.jpg'],
        latitude: 59.5581,
        longitude: 30.1261,
      },
      {
        name: 'Кафе "В Петеpгофе"',
        nameEn: 'Cafe "In Peterhof"',
        city: 'Peterhof',
        cuisine: 'Русская',
        description: 'Семейное кафе рядом с парком',
        descriptionEn: 'Family cafe near the park',
        averageBill: 800,
        accessibilityFeatures: {
          wheelchairAccessible: true,
        },
        images: ['https://example.com/cafe-peterhof1.jpg'],
        latitude: 59.8844,
        longitude: 29.9082,
      },
      {
        name: 'Ресторан "Павловские просторы"',
        nameEn: 'Restaurant "Pavlovsk Spaces"',
        city: 'Pavlovsk',
        cuisine: 'Европейская',
        description: 'Ресторан с панорамным видом на парк',
        descriptionEn: 'Restaurant with panoramic park views',
        averageBill: 1500,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          elevator: true,
        },
        images: ['https://example.com/pavlovsk-rest1.jpg'],
        latitude: 59.6847,
        longitude: 30.4425,
      },
      {
        name: 'Столовая "Царская"',
        nameEn: 'Dining "Tsarskaya"',
        city: 'Pushkin',
        cuisine: 'Русская',
        description: 'Традиционная столовая с домашней кухней',
        descriptionEn: 'Traditional dining hall with home-style food',
        averageBill: 600,
        accessibilityFeatures: {
          wheelchairAccessible: true,
          ramp: true,
        },
        images: ['https://example.com/tsarskaya1.jpg'],
        latitude: 59.7143,
        longitude: 30.3982,
      },
    ],
  });

  console.log(`✅ Created ${restaurants.count} restaurants`);

  const transportation = await prisma.transportation.createMany({
    data: [
      {
        type: 'Поезд',
        fromCity: 'Saint Petersburg',
        toCity: 'Peterhof',
        duration: 45,
        price: 150,
        frequency: 'Каждые 15 минут',
        accessibilityFeatures: {
          lowFloor: true,
          wheelchairSpace: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
      {
        type: 'Автобус',
        fromCity: 'Saint Petersburg',
        toCity: 'Pushkin',
        duration: 40,
        price: 100,
        frequency: 'Каждые 20 минут',
        accessibilityFeatures: {
          lowFloor: true,
          wheelchairSpace: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
      {
        type: 'Поезд',
        fromCity: 'Saint Petersburg',
        toCity: 'Gatchina',
        duration: 50,
        price: 180,
        frequency: 'Каждые 30 минут',
        accessibilityFeatures: {
          wheelchairSpace: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
      {
        type: 'Автобус',
        fromCity: 'Saint Petersburg',
        toCity: 'Pavlovsk',
        duration: 35,
        price: 90,
        frequency: 'Каждые 25 минут',
        accessibilityFeatures: {
          lowFloor: true,
          wheelchairSpace: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
      {
        type: 'Поезд',
        fromCity: 'Saint Petersburg',
        toCity: 'Tikhvin',
        duration: 120,
        price: 450,
        frequency: 'Каждые 2 часа',
        accessibilityFeatures: {
          wheelchairSpace: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
      {
        type: 'Автобус',
        fromCity: 'Gatchina',
        toCity: 'Pavlovsk',
        duration: 60,
        price: 120,
        frequency: 'Каждый час',
        accessibilityFeatures: {
          lowFloor: true,
        },
        wheelchairAccessible: true,
        seniorFriendly: true,
      },
    ],
  });

  console.log(`✅ Created ${transportation.count} transportation options`);

  const hermitage = await prisma.destination.findFirst({ where: { name: 'Эрмитаж' } });
  const isaac = await prisma.destination.findFirst({ where: { name: 'Исаакиевский собор' } });
  const peterhof = await prisma.destination.findFirst({ where: { name: 'Петергоф' } });

  if (hermitage && isaac) {
    await prisma.route.create({
      data: {
        startDestinationId: hermitage.id,
        endDestinationId: isaac.id,
        distance: 2.5,
        travelTime: 15,
        transportType: 'Пешком',
        difficulty: 'easy',
      },
    });
  }

  if (hermitage && peterhof) {
    await prisma.route.create({
      data: {
        startDestinationId: hermitage.id,
        endDestinationId: peterhof.id,
        distance: 25,
        travelTime: 45,
        transportType: 'Поезд',
        difficulty: 'easy',
      },
    });
  }

  console.log('✅ Created routes');

  if (hermitage) {
    await prisma.nearbyAttraction.createMany({
      data: [
        {
          destinationId: hermitage.id,
          attractionName: 'Площадь Декабристов',
          distance: 0.3,
          walkingTime: 5,
          recommended: true,
        },
        {
          destinationId: hermitage.id,
          attractionName: 'Адмиралтейство',
          distance: 0.8,
          walkingTime: 10,
          recommended: false,
        },
      ],
    });
  }

  if (isaac) {
    await prisma.nearbyAttraction.createMany({
      data: [
        {
          destinationId: isaac.id,
          attractionName: 'Мариинский дворец',
          distance: 0.5,
          walkingTime: 7,
          recommended: true,
        },
        {
          destinationId: isaac.id,
          attractionName: 'Троицкий собор',
          distance: 0.6,
          walkingTime: 8,
          recommended: false,
        },
      ],
    });
  }

  console.log('✅ Created nearby attractions');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
