import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Language, Itinerary } from '../types';
import ItineraryView from '../components/ItineraryView';

interface ResultsPageProps {
  language: Language;
}

export default function ResultsPage({ language }: ResultsPageProps) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('itinerary');
    if (stored) {
      try {
        setItinerary(JSON.parse(stored));
      } catch (err) {
        setError('Failed to load itinerary');
        console.error('Error loading itinerary:', err);
      }
    } else {
      setError('No itinerary found. Please create one first.');
    }
  }, []);

  const texts = {
    ru: {
      back: '← Создать новый маршрут',
      notFound: 'Маршрут не найден',
      notFoundDesc: 'Пожалуйста, вернитесь на главную страницу и создайте новый маршрут'
    },
    en: {
      back: '← Create new itinerary',
      notFound: 'Itinerary not found',
      notFoundDesc: 'Please go back to the home page and create a new itinerary'
    }
  };

  if (error) {
    return (
      <div>
        <div className="error-message">
          <h3>{texts[language].notFound}</h3>
          <p>{texts[language].notFoundDesc}</p>
        </div>
        <Link to="/" className="btn btn-primary">
          {texts[language].back}
        </Link>
      </div>
    );
  }

  if (!itinerary) {
    return <div className="loading">{language === 'ru' ? 'Загрузка...' : 'Loading...'}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn btn-secondary">
          {texts[language].back}
        </Link>
      </div>

      <ItineraryView itinerary={itinerary} language={language} />
    </div>
  );
}
