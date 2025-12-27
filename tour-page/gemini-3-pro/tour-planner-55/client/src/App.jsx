import React, { useState, useEffect } from 'react';

function App() {
  const [translations, setTranslations] = useState(null);
  const [lang, setLang] = useState('ru');
  const [days, setDays] = useState(1);
  const [rainMode, setRainMode] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/translations')
      .then(res => res.json())
      .then(data => setTranslations(data));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, language: lang, rainMode })
      });
      const data = await res.json();
      setItinerary(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!translations) return <div className="p-8 text-xl">Loading...</div>;

  const t = translations[lang];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-lg border-l-8 border-blue-500">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.title}</h1>
        <button 
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
        >
          {lang === 'ru' ? 'English' : 'Русский'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">{t.daysLabel} {days}</label>
            <input 
              type="range" min="1" max="3" value={days} 
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1</span><span>2</span><span>3</span>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input 
              type="checkbox" 
              checked={rainMode} 
              onChange={(e) => setRainMode(e.target.checked)}
              id="rainMode"
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="rainMode" className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
              {t.rainLabel}
            </label>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white text-xl py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg transform active:scale-95 disabled:opacity-50"
          >
            {loading ? '...' : t.generateBtn}
          </button>
          
          <p className="mt-4 text-sm text-gray-500 italic border-t pt-4">
            {t.comfortNote}
          </p>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-6">
          {itinerary && (
            <>
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{t.totalCost}</p>
                  <p className="text-2xl font-bold text-indigo-900">{itinerary.totalCost} {t.rub}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{t.totalTime}</p>
                  <p className="text-2xl font-bold text-indigo-900">{itinerary.totalTime} {t.hours}</p>
                </div>
              </div>

              {itinerary.locations.map((day) => (
                <div key={day.day} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gray-100 px-6 py-3 border-b">
                    <h3 className="font-bold text-lg text-gray-700">Day {day.day}</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-4 border-l-4 border-green-400 pl-4">
                         <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <h4 className="text-xl font-bold text-gray-900">{act.name}</h4>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                                {act.type}
                              </span>
                           </div>
                           <p className="text-gray-600 mt-1 text-lg">{act.description}</p>
                           <div className="mt-2 text-sm text-gray-500">
                             ⏱ {act.timeHours} {t.hours} &nbsp; | &nbsp; 💰 {act.costRub} {t.rub}
                           </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
          {!itinerary && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-inner text-gray-400">
              <p className="text-xl">{t.itineraryTitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
