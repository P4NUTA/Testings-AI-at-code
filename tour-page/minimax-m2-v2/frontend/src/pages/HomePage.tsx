import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, ItineraryRequest } from '../types';
import ItineraryForm from '../components/ItineraryForm';

interface HomePageProps {
  language: Language;
  translations: {
    ru: { title: string; subtitle: string; tagline: string };
    en: { title: string; subtitle: string; tagline: string };
  };
}

export default function HomePage({ language, translations }: HomePageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];
  const texts = {
    ru: {
      description: 'Планируйте комфортные 1-3-дневные путешествия по Ленинградской области с учетом ваших потребностей',
      features: [
        'Оптимизировано для комфорта 55+',
        'Минимум пересадок и лестниц',
        'Бюджетные расчеты',
        'Альтернативы на случай дождя'
      ],
      cta: 'Создать маршрут'
    },
    en: {
      description: 'Plan comfortable 1-3 day trips around Leningrad Oblast tailored to your needs',
      features: [
        'Optimized for 55+ comfort',
        'Minimal transfers and stairs',
        'Budget calculations',
        'Rainy day alternatives'
      ],
      cta: 'Create itinerary'
    }
  };

  const handleSubmit = async (formData: ItineraryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();

      if (!data.success || !data.data) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('itinerary', JSON.stringify(data.data));
      navigate('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>
          {texts[language].description}
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
          {t.tagline}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {texts[language].features.map((feature, index) => (
            <div key={index} style={{ padding: '10px 20px', background: '#e8f4f8', borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', color: '#2c5aa0', fontWeight: 500 }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {language === 'ru' ? 'Ошибка: ' : 'Error: '}{error}
        </div>
      )}

      <ItineraryForm
        language={language}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {isLoading && (
        <div className="loading">
          {language === 'ru'
            ? 'Создаем ваш маршрут... Это может занять несколько секунд'
            : 'Creating your itinerary... This may take a few seconds'}
        </div>
      )}
    </div>
  );
}
