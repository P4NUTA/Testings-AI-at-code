import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';
import styles from './Header.module.css';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>{t('app.title')}</h1>
        <span className={styles.subtitle}>{t('app.subtitle')}</span>
      </div>
      <p className={styles.tagline}>{t('app.tagline')}</p>
      <LanguageSwitch />
    </header>
  );
}
