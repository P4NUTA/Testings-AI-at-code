import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { TripPreferences } from '../types';
import styles from './TripForm.module.css';

interface TripFormProps {
  onGenerate: (preferences: TripPreferences) => void;
  isLoading: boolean;
}

const interestKeys = ['museums', 'palaces', 'parks', 'history', 'art', 'nature'] as const;

export function TripForm({ onGenerate, isLoading }: TripFormProps) {
  const { t } = useLanguage();
  const [duration, setDuration] = useState<1 | 2 | 3>(2);
  const [budgetLevel, setBudgetLevel] = useState<'budget' | 'moderate' | 'comfortable'>('moderate');
  const [mobilityLevel, setMobilityLevel] = useState<'excellent' | 'good' | 'limited'>('good');
  const [interests, setInterests] = useState<string[]>(['palaces', 'museums']);

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      duration,
      budgetLevel,
      mobilityLevel,
      interests,
      seed: Date.now(),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <label className={styles.label}>{t('form.duration')}</label>
        <div className={styles.buttonGroup}>
          {([1, 2, 3] as const).map((d) => (
            <button
              key={d}
              type="button"
              className={`${styles.optionButton} ${duration === d ? styles.active : ''}`}
              onClick={() => setDuration(d)}
            >
              {t(`form.days.${d}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>{t('form.budget')}</label>
        <div className={styles.buttonGroup}>
          {(['budget', 'moderate', 'comfortable'] as const).map((b) => (
            <button
              key={b}
              type="button"
              className={`${styles.optionButton} ${budgetLevel === b ? styles.active : ''}`}
              onClick={() => setBudgetLevel(b)}
            >
              {t(`form.budgetLevels.${b}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>{t('form.mobility')}</label>
        <div className={styles.buttonGroup}>
          {(['excellent', 'good', 'limited'] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={`${styles.optionButton} ${mobilityLevel === m ? styles.active : ''}`}
              onClick={() => setMobilityLevel(m)}
            >
              {t(`form.mobilityLevels.${m}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>{t('form.interests')}</label>
        <div className={styles.interestGrid}>
          {interestKeys.map((interest) => (
            <button
              key={interest}
              type="button"
              className={`${styles.interestButton} ${interests.includes(interest) ? styles.active : ''}`}
              onClick={() => handleInterestToggle(interest)}
            >
              {t(`form.interestOptions.${interest}`)}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? t('form.generating') : t('form.generate')}
      </button>
    </form>
  );
}
