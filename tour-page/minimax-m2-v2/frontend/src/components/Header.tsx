import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: {
    ru: { title: string; subtitle: string; tagline: string };
    en: { title: string; subtitle: string; tagline: string };
  };
}

export default function Header({ language, setLanguage, translations }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>{t.title}</h1>
          <p style={{ fontSize: '16px', marginTop: '4px' }}>{t.subtitle}</p>
        </div>
        <div className="language-switcher">
          <button
            className={`language-btn ${language === 'ru' ? 'active' : ''}`}
            onClick={() => setLanguage('ru')}
          >
            RU
          </button>
          <button
            className={`language-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
