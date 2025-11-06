import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import PlannerPage from '@/pages/PlannerPage';
import ItineraryPage from '@/pages/ItineraryPage';
import AboutPage from '@/pages/AboutPage';
import { Itinerary } from '@/types';

function App() {
  const { i18n } = useTranslation();
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);

  const changeLanguage = (lng: 'ru' | 'en') => {
    i18n.changeLanguage(lng);
  };

  const handleItineraryCreated = (itinerary: Itinerary) => {
    setCurrentItinerary(itinerary);
  };

  return (
    <div className="min-h-screen bg-senior-bg text-senior-text">
      <Header currentLanguage={i18n.language as 'ru' | 'en'} onLanguageChange={changeLanguage} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/planner"
            element={<PlannerPage onItineraryCreated={handleItineraryCreated} />}
          />
          <Route
            path="/itinerary"
            element={<ItineraryPage itinerary={currentItinerary} />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;