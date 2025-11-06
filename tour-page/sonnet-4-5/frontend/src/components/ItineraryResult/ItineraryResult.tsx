import { useTranslation } from 'react-i18next';
import type { Itinerary } from '../../types';
import styles from './ItineraryResult.module.css';

interface Props {
  itinerary: Itinerary;
}

export const ItineraryResult = ({ itinerary }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ru' | 'en';

  return (
    <div className={styles.result}>
      <h2 className={styles.title}>{t('result.title')}</h2>
      <p className={styles.summary}>{itinerary.summary[lang]}</p>

      <div className={styles.overview}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{t('result.total_cost')}:</span>
          <span className={styles.statValue}>{itinerary.totalCost} ₽</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{t('result.total_transfers')}:</span>
          <span className={styles.statValue}>{itinerary.totalTransfers}</span>
        </div>
      </div>

      {itinerary.days.map(day => (
        <div key={day.day} className={styles.day}>
          <h3 className={styles.dayTitle}>
            {t('result.day')} {day.day}
          </h3>

          <div className={styles.activities}>
            {day.activities.map((activity, idx) => (
              <div key={idx} className={styles.activity}>
                <span className={styles.time}>{activity.time}</span>
                <div className={styles.activityContent}>
                  {activity.type === 'attraction' && activity.attraction && (
                    <>
                      <h4 className={styles.activityTitle}>
                        {activity.attraction.name[lang]}
                      </h4>
                      <p className={styles.activityDesc}>
                        {activity.attraction.description[lang]}
                      </p>
                      <div className={styles.activityMeta}>
                        <span>{activity.duration} {t('result.minutes')}</span>
                        <span>{activity.cost} ₽</span>
                      </div>
                    </>
                  )}
                  {activity.type === 'meal' && activity.restaurant && (
                    <>
                      <h4 className={styles.activityTitle}>
                        {t('result.meal')} - {activity.restaurant.name}
                      </h4>
                      <div className={styles.activityMeta}>
                        <span>{activity.restaurant.cuisine}</span>
                        <span>{activity.cost} ₽</span>
                      </div>
                    </>
                  )}
                  {activity.type === 'transport' && activity.transport && (
                    <>
                      <h4 className={styles.activityTitle}>
                        {t('result.transport')}: {activity.transport.from} → {activity.transport.to}
                      </h4>
                      <div className={styles.activityMeta}>
                        <span>{activity.transport.type}</span>
                        <span>{activity.duration} {t('result.minutes')}</span>
                        <span>{activity.cost} ₽</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.daySummary}>
            <span>{t('result.cost')}: {day.totalCost} ₽</span>
            <span>{t('result.duration')}: {day.totalDuration} {t('result.minutes')}</span>
          </div>

          {day.rainyDayAlternatives.length > 0 && (
            <div className={styles.rainy}>
              <h4 className={styles.rainyTitle}>{t('result.rainy')}:</h4>
              {day.rainyDayAlternatives.map((alt, idx) => (
                <div key={idx} className={styles.rainyItem}>
                  {alt.attraction && alt.attraction.name[lang]}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
