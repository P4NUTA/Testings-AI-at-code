import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ItineraryRequest } from '../../types';
import styles from './ItineraryForm.module.css';

interface Props {
  onSubmit: (request: ItineraryRequest) => void;
  loading: boolean;
}

export const ItineraryForm = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(10000);
  const [mobilityLevel, setMobilityLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      days,
      budget,
      mobilityLevel,
      interests,
      date: new Date().toISOString()
    });
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>{t('form.days')}</label>
        <select
          className={styles.select}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          disabled={loading}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('form.budget')}</label>
        <input
          type="number"
          className={styles.input}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          min={1000}
          max={100000}
          step={1000}
          disabled={loading}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('form.mobility')}</label>
        <select
          className={styles.select}
          value={mobilityLevel}
          onChange={(e) => setMobilityLevel(e.target.value as any)}
          disabled={loading}
        >
          <option value="high">{t('form.mobility_high')}</option>
          <option value="medium">{t('form.mobility_medium')}</option>
          <option value="low">{t('form.mobility_low')}</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('form.interests')}</label>
        <div className={styles.checkboxGroup}>
          {['museum', 'historical', 'park', 'religious'].map(interest => (
            <label key={interest} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                disabled={loading}
              />
              <span>{t(`form.interest_${interest}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? t('loading') : t('form.generate')}
      </button>
    </form>
  );
};
