import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageSwitch.module.css';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switch}>
      <button
        className={`${styles.button} ${language === 'ru' ? styles.active : ''}`}
        onClick={() => setLanguage('ru')}
        aria-pressed={language === 'ru'}
      >
        RU
      </button>
      <button
        className={`${styles.button} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
