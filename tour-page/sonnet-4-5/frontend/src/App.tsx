import { useState } from 'react';
import { Header } from './components/Header/Header';
import { ItineraryForm } from './components/ItineraryForm/ItineraryForm';
import { ItineraryResult } from './components/ItineraryResult/ItineraryResult';
import { generateItinerary } from './services/api';
import type { ItineraryRequest, Itinerary } from './types';
import { useTranslation } from 'react-i18next';
import styles from './App.module.css';

function App() {
  const { t } = useTranslation();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (request: ItineraryRequest) => {
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await generateItinerary(request);
      setItinerary(result);
    } catch (err: any) {
      setError(err.message || t('error.default'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <ItineraryForm onSubmit={handleSubmit} loading={loading} />
          {error && (
            <div className={styles.error}>
              <h3>{t('error.title')}</h3>
              <p>{error}</p>
            </div>
          )}
          {itinerary && <ItineraryResult itinerary={itinerary} />}
        </div>
      </main>
    </div>
  );
}

export default App;
