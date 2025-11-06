import { useState } from 'react';
import { Language, ItineraryRequest } from '../types';

interface ItineraryFormProps {
  language: Language;
  onSubmit: (data: ItineraryRequest) => void;
  isLoading: boolean;
}

const categories = {
  ru: [
    { value: 'museum', label: 'Музеи' },
    { value: 'palace', label: 'Дворцы' },
    { value: 'historical', label: 'Исторические' },
    { value: 'church', label: 'Церкви' },
    { value: 'nature', label: 'Природа' }
  ],
  en: [
    { value: 'museum', label: 'Museums' },
    { value: 'palace', label: 'Palaces' },
    { value: 'historical', label: 'Historical' },
    { value: 'church', label: 'Churches' },
    { value: 'nature', label: 'Nature' }
  ]
};

const mobilityLevels = {
  ru: [
    { value: 1, label: 'Очень ограниченная (коляска)' },
    { value: 2, label: 'Ограниченная (трость)' },
    { value: 3, label: 'Умеренная' },
    { value: 4, label: 'Хорошая' },
    { value: 5, label: 'Отличная' }
  ],
  en: [
    { value: 1, label: 'Very limited (wheelchair)' },
    { value: 2, label: 'Limited (cane)' },
    { value: 3, label: 'Moderate' },
    { value: 4, label: 'Good' },
    { value: 5, label: 'Excellent' }
  ]
};

const transportPrefs = {
  ru: [
    { value: 'private', label: 'Частный транспорт (такси)' },
    { value: 'public', label: 'Общественный транспорт' },
    { value: 'mixed', label: 'Смешанный' }
  ],
  en: [
    { value: 'private', label: 'Private transport (taxi)' },
    { value: 'public', label: 'Public transport' },
    { value: 'mixed', label: 'Mixed' }
  ]
};

const budgetOptions = {
  ru: [
    { value: 'economy', label: 'Эконом (до 5000 ₽/день)' },
    { value: 'standard', label: 'Стандарт (5000-10000 ₽/день)' },
    { value: 'comfort', label: 'Комфорт (10000+ ₽/день)' }
  ],
  en: [
    { value: 'economy', label: 'Economy (up to 5000 ₽/day)' },
    { value: 'standard', label: 'Standard (5000-10000 ₽/day)' },
    { value: 'comfort', label: 'Comfort (10000+ ₽/day)' }
  ]
};

const seasonOptions = {
  ru: [
    { value: 'spring', label: 'Весна' },
    { value: 'summer', label: 'Лето' },
    { value: 'autumn', label: 'Осень' },
    { value: 'winter', label: 'Зима' }
  ],
  en: [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'autumn', label: 'Autumn' },
    { value: 'winter', label: 'Winter' }
  ]
};

export default function ItineraryForm({ language, onSubmit, isLoading }: ItineraryFormProps) {
  const [formData, setFormData] = useState<ItineraryRequest>({
    duration: 2,
    startCity: 'Санкт-Петербург',
    interests: [],
    budget: 'standard',
    mobilityLevel: 3,
    transportPreference: 'private',
    season: 'summer',
    weatherSensitive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const texts = {
    ru: {
      title: 'Настройте ваш маршрут',
      duration: 'Продолжительность (дни)',
      startCity: 'Город отправления',
      interests: 'Интересы (выберите несколько)',
      budget: 'Бюджет',
      mobility: 'Уровень мобильности',
      transport: 'Предпочтения по транспорту',
      season: 'Сезон поездки',
      weather: 'Планировать альтернативы на дождь?',
      submit: 'Создать маршрут',
      required: 'Обязательное поле',
      selectAtLeastOne: 'Выберите хотя бы один интерес'
    },
    en: {
      title: 'Configure your itinerary',
      duration: 'Duration (days)',
      startCity: 'Departure city',
      interests: 'Interests (select multiple)',
      budget: 'Budget',
      mobility: 'Mobility level',
      transport: 'Transport preferences',
      season: 'Travel season',
      weather: 'Plan rainy day alternatives?',
      submit: 'Create itinerary',
      required: 'Required field',
      selectAtLeastOne: 'Select at least one interest'
    }
  };

  const t = texts[language];
  const cats = categories[language];
  const mobility = mobilityLevels[language];
  const transport = transportPrefs[language];
  const budget = budgetOptions[language];
  const seasons = seasonOptions[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.startCity.trim()) {
      newErrors.startCity = t.required;
    }

    if (formData.interests.length === 0) {
      newErrors.interests = t.selectAtLeastOne;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 style={{ marginBottom: '20px' }}>{t.title}</h2>

      <div className="form-group">
        <label className="form-label">{t.duration}</label>
        <select
          className="form-select"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) as 1 | 2 | 3 })}
        >
          <option value={1}>1 {language === 'ru' ? 'день' : 'day'}</option>
          <option value={2}>2 {language === 'ru' ? 'дня' : 'days'}</option>
          <option value={3}>3 {language === 'ru' ? 'дня' : 'days'}</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{t.startCity}</label>
        <input
          type="text"
          className="form-input"
          value={formData.startCity}
          onChange={(e) => setFormData({ ...formData, startCity: e.target.value })}
          disabled={isLoading}
        />
        {errors.startCity && <div className="error-message">{errors.startCity}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">{t.interests}</label>
        <div className="checkbox-group">
          {cats.map(cat => (
            <label key={cat.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes(cat.value)}
                onChange={() => handleInterestChange(cat.value)}
                disabled={isLoading}
              />
              {cat.label}
            </label>
          ))}
        </div>
        {errors.interests && <div className="error-message">{errors.interests}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">{t.budget}</label>
        <select
          className="form-select"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value as 'economy' | 'standard' | 'comfort' })}
          disabled={isLoading}
        >
          {budget.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{t.mobility}</label>
        <select
          className="form-select"
          value={formData.mobilityLevel}
          onChange={(e) => setFormData({ ...formData, mobilityLevel: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
          disabled={isLoading}
        >
          {mobility.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{t.transport}</label>
        <select
          className="form-select"
          value={formData.transportPreference}
          onChange={(e) => setFormData({ ...formData, transportPreference: e.target.value as 'private' | 'public' | 'mixed' })}
          disabled={isLoading}
        >
          {transport.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{t.season}</label>
        <select
          className="form-select"
          value={formData.season}
          onChange={(e) => setFormData({ ...formData, season: e.target.value as 'spring' | 'summer' | 'autumn' | 'winter' })}
          disabled={isLoading}
        >
          {seasons.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.weatherSensitive}
            onChange={(e) => setFormData({ ...formData, weatherSensitive: e.target.checked })}
            disabled={isLoading}
          />
          {t.weather}
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '20px' }}
        disabled={isLoading}
      >
        {isLoading
          ? (language === 'ru' ? 'Создаем маршрут...' : 'Creating...')
          : t.submit
        }
      </button>
    </form>
  );
}
