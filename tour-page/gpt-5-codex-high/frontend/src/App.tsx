import { useState } from 'react';
import './App.css';
import { PlannerForm } from './components/PlannerForm';
import { SummaryCard } from './components/SummaryCard';
import { DayCard } from './components/DayCard';
import { STRINGS, type Locale } from './i18n';
import { useItinerary } from './hooks/useItinerary';

const SUPPORTED_LOCALES: Locale[] = ['ru', 'en'];

function App() {
  const [locale, setLocale] = useState<Locale>('ru');
  const { data, loading, error, submit } = useItinerary(locale);
  const strings = STRINGS[locale];

  return (
    <div className="app-shell">
      <header>
        <div>
          <p className="flag">55+</p>
          <h1>{strings.appTitle}</h1>
          <p className="subtitle">{strings.appSubtitle}</p>
        </div>
        <div className="locale-switch">
          {SUPPORTED_LOCALES.map((code) => (
            <button
              key={code}
              className={code === locale ? 'active' : ''}
              onClick={() => setLocale(code)}
              type="button"
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <PlannerForm locale={locale} onSubmit={submit} loading={loading} />

      {error && <div className="error">{strings.errorFallback} · {error}</div>}

      {data && (
        <>
          <SummaryCard locale={locale} summary={data.summary} />
          <div className="days-grid">
            {data.plan.map((day) => (
              <DayCard key={day.dayNumber} locale={locale} day={day} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
