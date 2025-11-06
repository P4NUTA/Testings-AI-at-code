import { useState } from 'react';
import { Language, Itinerary } from '../types';

interface ItineraryViewProps {
  itinerary: Itinerary;
  language: Language;
}

export default function ItineraryView({ itinerary, language }: ItineraryViewProps) {
  const [showRainyPlan, setShowRainyPlan] = useState(false);

  const texts = {
    ru: {
      totalCost: 'Общая стоимость',
      totalDuration: 'Общая продолжительность',
      comfortScore: 'Индекс комфорта',
      difficulty: 'Сложность',
      highlights: 'Основные достопримечательности',
      day: 'День',
      weather: 'Погодный план',
      sunny: 'Солнечная погода',
      rainy: 'Дождливая погода',
      tips: 'Советы',
      difficultyEasy: 'Легко',
      difficultyModerate: 'Умеренно',
      difficultyHard: 'Сложно',
      hours: 'часов',
      attractions: 'Достопримечательности',
      restaurants: 'Рестораны',
      accommodation: 'Размещение',
      transport: 'Транспорт',
      weatherSensitive: 'Альтернативы на дождь',
      time: 'Время',
      duration: 'Длительность',
      cost: 'Стоимость'
    },
    en: {
      totalCost: 'Total cost',
      totalDuration: 'Total duration',
      comfortScore: 'Comfort score',
      difficulty: 'Difficulty',
      highlights: 'Highlights',
      day: 'Day',
      weather: 'Weather plan',
      sunny: 'Sunny weather',
      rainy: 'Rainy weather',
      tips: 'Tips',
      difficultyEasy: 'Easy',
      difficultyModerate: 'Moderate',
      difficultyHard: 'Challenging',
      hours: 'hours',
      attractions: 'Attractions',
      restaurants: 'Restaurants',
      accommodation: 'Accommodation',
      transport: 'Transport',
      weatherSensitive: 'Rainy day alternatives',
      time: 'Time',
      duration: 'Duration',
      cost: 'Cost'
    }
  };

  const t = texts[language];
  const plan = showRainyPlan ? itinerary.weatherPlan.rainy : itinerary.weatherPlan.sunny;

  const getDifficultyText = (level: 1 | 2 | 3) => {
    switch (level) {
      case 1: return t.difficultyEasy;
      case 2: return t.difficultyModerate;
      case 3: return t.difficultyHard;
    }
  };

  const getDifficultyColor = (level: 1 | 2 | 3) => {
    switch (level) {
      case 1: return '#5cb85c';
      case 2: return '#f0ad4e';
      case 3: return '#d9534f';
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'attraction': return t.attractions;
      case 'restaurant': return t.restaurants;
      case 'hotel': return t.accommodation;
      default: return '';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${t.hours}`;
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>
          {language === 'ru' ? 'Ваш маршрут' : 'Your itinerary'}
        </h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{itinerary.totalCost.toLocaleString()} ₽</div>
            <div className="stat-label">{t.totalCost}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatDuration(itinerary.totalDuration)}</div>
            <div className="stat-label">{t.totalDuration}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{itinerary.comfortScore}</div>
            <div className="stat-label">{t.comfortScore}</div>
            <div className="comfort-meter">
              <div
                className="comfort-meter-fill"
                style={{ width: `${itinerary.comfortScore}%` }}
              />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: getDifficultyColor(itinerary.difficulty) }}>
              {getDifficultyText(itinerary.difficulty)}
            </div>
            <div className="stat-label">{t.difficulty}</div>
          </div>
        </div>

        {itinerary.highlights.length > 0 && (
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>{t.highlights}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {itinerary.highlights.map((highlight, index) => (
                <span key={index} className="badge badge-info">{highlight}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '12px' }}>{t.weather}</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowRainyPlan(false)}
            style={{
              opacity: !showRainyPlan ? 1 : 0.6,
              backgroundColor: !showRainyPlan ? '#2c5aa0' : '#6c757d'
            }}
          >
            {t.sunny}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowRainyPlan(true)}
            style={{
              opacity: showRainyPlan ? 1 : 0.6,
              backgroundColor: showRainyPlan ? '#2c5aa0' : '#6c757d'
            }}
          >
            {t.rainy}
          </button>
        </div>

        {showRainyPlan && (
          <div className="badge badge-info" style={{ marginBottom: '20px' }}>
            {t.weatherSensitive}
          </div>
        )}
      </div>

      {plan.map((day) => (
        <div key={day.day} className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>
            {t.day} {day.day} - {new Date(day.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
          </h3>

          <div className="timeline">
            {day.activities.map((activity) => (
              <div key={activity.id} className="timeline-item">
                <div className="timeline-time">
                  {activity.startTime} - {activity.endTime}
                </div>
                <div className="activity-card">
                  <div className="activity-title">
                    {getActivityTypeText(activity.type)} {t.time} {activity.startTime}
                  </div>
                  <div className="activity-details">
                    <div style={{ marginBottom: '8px' }}>
                      <strong>{t.duration}:</strong> {Math.floor(activity.duration / 60)} {t.hours}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>{t.cost}:</strong> {activity.cost.toLocaleString()} ₽
                    </div>
                    {activity.notes && (
                      <div style={{ marginBottom: '8px', fontSize: '13px', color: '#666' }}>
                        {activity.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {day.transport.length > 0 && (
              <div className="timeline-item">
                <div className="timeline-time">-</div>
                <div className="activity-card">
                  <div className="activity-title">{t.transport}</div>
                  <div className="activity-details">
                    {day.transport.map((transport, idx) => (
                      <div key={idx}>
                        {transport.from} → {transport.to} ({transport.duration} {language === 'ru' ? 'мин' : 'min'})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {itinerary.tips.length > 0 && (
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>{t.tips}</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            {itinerary.tips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {tip[language]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
