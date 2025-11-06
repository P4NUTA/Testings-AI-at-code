import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

export const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
        <button className={styles.langBtn} onClick={toggleLanguage} aria-label="Switch language">
          {i18n.language === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>
    </header>
  );
};
