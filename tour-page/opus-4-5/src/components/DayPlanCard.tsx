import { useLanguage } from '../context/LanguageContext';
import type { DayPlan } from '../types';
import { getLocalizedText, formatDuration, formatCurrency, getAccessibilityLabel } from '../utils/helpers';
import styles from './DayPlanCard.module.css';

interface DayPlanCardProps {
  dayPlan: DayPlan;
}

export function DayPlanCard({ dayPlan }: DayPlanCardProps) {
  const { t, language } = useLanguage();

  return (
    <div className={styles.dayCard}>
      <div className={styles.dayHeader}>
        <h3 className={styles.dayTitle}>
          {t('itinerary.day')} {dayPlan.dayNumber}
        </h3>
        <div className={styles.daySummary}>
          <span>{formatCurrency(dayPlan.totalCost)}</span>
          <span>{formatDuration(dayPlan.totalTravelTime, language)}</span>
        </div>
      </div>

      <div className={styles.activities}>
        {dayPlan.activities.map((activity, index) => (
          <div key={index} className={styles.activity}>
            <div className={styles.timeColumn}>
              <span className={styles.time}>{activity.time}</span>
            </div>
            <div className={styles.activityContent}>
              <h4 className={styles.attractionName}>
                {getLocalizedText(activity.attraction.name, language)}
              </h4>
              <p className={styles.description}>
                {getLocalizedText(activity.attraction.description, language)}
              </p>
              <div className={styles.activityMeta}>
                <span className={styles.metaItem}>
                  {t('dayPlan.duration')}: {formatDuration(activity.attraction.estimatedDuration, language)}
                </span>
                <span className={styles.metaItem}>
                  {t('dayPlan.entranceFee')}: {activity.attraction.entranceFee > 0 ? formatCurrency(activity.attraction.entranceFee) : t('dayPlan.free')}
                </span>
                <span className={styles.metaItem}>
                  {t('dayPlan.accessibility')}: {getAccessibilityLabel(activity.attraction.accessibilityScore, language)}
                </span>
                <span className={styles.metaItem}>
                  {t('dayPlan.stairs')}: {t(`dayPlan.stairsLevels.${activity.attraction.stairsLevel}`)}
                </span>
              </div>
              {activity.transport && (
                <div className={styles.transport}>
                  <span className={styles.transportIcon}>
                    {activity.transport.type === 'bus' && '🚌'}
                    {activity.transport.type === 'train' && '🚆'}
                    {activity.transport.type === 'metro' && '🚇'}
                    {activity.transport.type === 'taxi' && '🚕'}
                    {activity.transport.type === 'walking' && '🚶'}
                  </span>
                  <span>{getLocalizedText(activity.transport.name, language)}</span>
                  <span className={styles.transportTime}>
                    {formatDuration(activity.transport.duration, language)}
                  </span>
                  <span className={styles.transportCost}>
                    {activity.transport.cost > 0 ? formatCurrency(activity.transport.cost) : t('dayPlan.free')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.meals}>
        {dayPlan.meals.lunch && (
          <div className={styles.meal}>
            <span className={styles.mealLabel}>{t('dayPlan.lunch')}:</span>
            <span className={styles.mealName}>
              {getLocalizedText(dayPlan.meals.lunch.name, language)}
            </span>
            <span className={styles.mealCost}>
              ~{formatCurrency(dayPlan.meals.lunch.averageCost)}
            </span>
          </div>
        )}
        {dayPlan.meals.dinner && (
          <div className={styles.meal}>
            <span className={styles.mealLabel}>{t('dayPlan.dinner')}:</span>
            <span className={styles.mealName}>
              {getLocalizedText(dayPlan.meals.dinner.name, language)}
            </span>
            <span className={styles.mealCost}>
              ~{formatCurrency(dayPlan.meals.dinner.averageCost)}
            </span>
          </div>
        )}
      </div>

      {dayPlan.rainyAlternatives.length > 0 && (
        <div className={styles.rainySection}>
          <h4 className={styles.rainyTitle}>{t('rainy.title')}</h4>
          <p className={styles.rainyDescription}>{t('rainy.description')}</p>
          <ul className={styles.rainyList}>
            {dayPlan.rainyAlternatives.map((alt) => (
              <li key={alt.id} className={styles.rainyItem}>
                {getLocalizedText(alt.name, language)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
