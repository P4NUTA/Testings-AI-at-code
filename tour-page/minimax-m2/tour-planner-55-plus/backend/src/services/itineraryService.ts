import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GenerateItineraryParams {
  days: number;
  startDate: Date;
  budget: number;
  city: string;
  preferences: {
    accessibility: boolean;
    avoidStairs: boolean;
    maxWalkingDistance: number;
    restAreas: boolean;
    indoorPreference: 'indoor' | 'outdoor' | 'mixed';
  };
}

export class ItineraryService {
  async generateItinerary(params: GenerateItineraryParams) {
    const { days, startDate, budget, city, preferences } = params;

    const destinations = await this.getFilteredDestinations(city, preferences);

    if (destinations.length < days * 2) {
      throw new Error(`Not enough destinations found for ${days} days in ${city}`);
    }

    const itinerary = this.optimizeItinerary(destinations, days, budget, preferences);

    const totalCost = this.calculateTotalCost(itinerary);

    if (totalCost > budget * 1.2) {
      throw new Error('Total cost exceeds budget. Please consider reducing the number of activities or choosing more budget-friendly options.');
    }

    return {
      itinerary,
      totalCost,
      budgetRemaining: budget - totalCost,
      recommendations: this.getRecommendations(itinerary, preferences),
    };
  }

  private async getFilteredDestinations(city: string, preferences: any) {
    const where: any = { city };

    if (preferences.accessibility) {
      where.OR = [
        { elevatorAvailable: true },
        { wheelchairAccessible: true },
        { stairsLevel: 'none' },
      ];
    }

    if (preferences.indoorPreference === 'indoor') {
      where.isIndoor = true;
    } else if (preferences.indoorPreference === 'outdoor') {
      where.isIndoor = false;
    }

    const destinations = await prisma.destination.findMany({
      where,
      orderBy: [
        { accessibilityScore: 'desc' },
        { restAreas: 'desc' },
      ],
    });

    return destinations;
  }

  private optimizeItinerary(destinations: any[], days: number, budget: number, preferences: any) {
    const itinerary: any[] = [];
    const dailyBudget = budget / days;

    let currentDate = new Date();

    for (let day = 0; day < days; day++) {
      const dayActivities: any[] = [];
      let dayCost = 0;
      let remainingBudget = dailyBudget;

      const selectedDestinations = destinations.slice(day * 3, (day + 1) * 3);

      for (const dest of selectedDestinations) {
        if (dayCost + dest.price > remainingBudget) {
          continue;
        }

        const accessibilityScore = this.calculateAccessibilityScore(dest, preferences);

        if (preferences.avoidStairs && dest.stairsLevel === 'many') {
          continue;
        }

        dayActivities.push({
          destination: dest,
          arrivalTime: this.calculateArrivalTime(dayActivities.length),
          duration: dest.duration,
          accessibilityScore,
          estimatedCost: dest.price,
        });

        dayCost += dest.price;
      }

      itinerary.push({
        day: day + 1,
        date: new Date(currentDate),
        activities: dayActivities,
        totalCost: dayCost,
        totalDuration: dayActivities.reduce((sum, act) => sum + act.duration, 0),
        weather: this.getWeatherInfo(day),
        indoorAlternatives: this.getIndoorAlternatives(selectedDestinations, preferences),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return itinerary;
  }

  private calculateAccessibilityScore(destination: any, preferences: any): number {
    let score = 0;

    if (destination.elevatorAvailable) score += 30;
    if (destination.wheelchairAccessible) score += 30;
    if (destination.stairsLevel === 'none') score += 20;
    if (destination.stairsLevel === 'few') score += 10;
    if (destination.benchesAvailable) score += 10;
    if (destination.restAreas > 0) score += 10;

    return Math.min(100, score);
  }

  private calculateArrivalTime(activityIndex: number): string {
    const baseHour = 10;
    const hours = baseHour + (activityIndex * 2);
    return `${hours.toString().padStart(2, '0')}:00`;
  }

  private calculateTotalCost(itinerary: any[]): number {
    return itinerary.reduce((sum, day) => sum + day.totalCost, 0);
  }

  private getRecommendations(itinerary: any[], preferences: any) {
    const recommendations: string[] = [];

    if (preferences.restAreas) {
      recommendations.push('Rest areas are located every 200 meters throughout the route');
    }

    if (preferences.avoidStairs) {
      recommendations.push('All selected destinations have elevator or ramp access');
    }

    recommendations.push('Carry comfortable walking shoes and weather-appropriate clothing');
    recommendations.push('Bring a portable seat cushion for longer visits');
    recommendations.push('Consider bringing a small backpack with water and snacks');

    return recommendations;
  }

  private getWeatherInfo(day: number): any {
    const weather = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    return {
      forecast: weather[day % weather.length],
      temperature: Math.floor(Math.random() * 15) + 10,
      humidity: Math.floor(Math.random() * 30) + 50,
    };
  }

  private getIndoorAlternatives(destinations: any[], preferences: any): any[] {
    return destinations
      .filter(d => d.isIndoor)
      .slice(0, 2)
      .map(d => ({
        name: d.name,
        reason: 'Indoor alternative for rainy weather',
      }));
  }

  async getItineraryById(id: number) {
    return await prisma.itinerary.findUnique({
      where: { id },
    });
  }

  async saveItinerary(userId: string, data: any) {
    return await prisma.itinerary.create({
      data: {
        userId,
        days: data.days,
        startDate: data.startDate,
        budget: data.budget,
        preferences: data.preferences,
        itineraryData: data.itinerary,
        totalCost: data.totalCost,
        accessibilityLevel: data.preferences.accessibility ? 'high' : 'medium',
      },
    });
  }
}

export const itineraryService = new ItineraryService();
