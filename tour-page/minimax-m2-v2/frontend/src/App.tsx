import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import { Language } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('ru');

  const translations = {
    ru: {
      title: 'Тур Планировщик 55+',
      subtitle: 'Ленинградская область',
      tagline: 'Комфортные путешествия для путешественников 55+'
    },
    en: {
      title: 'Tour Planner 55+',
      subtitle: 'Leningrad Oblast',
      tagline: 'Comfortable travels for 55+ travelers'
    }
  };

  return (
    <div>
      <Header
        language={language}
        setLanguage={setLanguage}
        translations={translations}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                language={language}
                translations={translations}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsPage
                language={language}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
