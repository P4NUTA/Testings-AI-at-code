import { useLanguage } from '../context/LanguageContext';
import type { Itinerary } from '../types';
import { formatCurrency, formatDuration } from '../utils/helpers';
import { DayPlanCard } from './DayPlanCard';
import styles from './ItineraryView.module.css';

interface ItineraryViewProps {
  itinerary: Itinerary;
}

export function ItineraryView({ itinerary }: ItineraryViewProps) {
  const { t, language } = useLanguage();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('itinerary.title')}</h2>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t('itinerary.totalBudget')}</span>
          <span className={styles.summaryValue}>{formatCurrency(itinerary.totalBudget)}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t('itinerary.totalTime')}</span>
          <span className={styles.summaryValue}>{formatDuration(itinerary.totalTravelTime, language)}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t('itinerary.comfortScore')}</span>
          <span className={styles.summaryValue}>{itinerary.comfortScore}%</span>
        </div>
      </div>

      <div className={styles.days}>
        {itinerary.days.map((day) => (
          <DayPlanCard key={day.dayNumber} dayPlan={day} />
        ))}
      </div>

      <p className={styles.disclaimer}>{t('footer.disclaimer')}</p>
    </div>
  );
}
