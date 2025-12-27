import { useState } from 'react';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { ItineraryView } from './components/ItineraryView';
import { generateItinerary } from './services/itineraryGenerator';
import { useLanguage } from './context/LanguageContext';
import type { TripPreferences, Itinerary } from './types';
import styles from './App.module.css';

function App() {
  const { t } = useLanguage();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (preferences: TripPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      const errorKey = err instanceof Error ? err.message : 'generationFailed';
      setError(t(`errors.${errorKey}`));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <TripForm onGenerate={handleGenerate} isLoading={isLoading} />
        {error && <div className={styles.error}>{error}</div>}
        {itinerary && <ItineraryView itinerary={itinerary} />}
      </main>
    </div>
  );
}

export default App;
