import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { Locale } from '../i18n';
import { STRINGS } from '../i18n';
import type { PlannerFormValues } from '../types';

interface PlannerFormProps {
  locale: Locale;
  onSubmit: (values: PlannerFormValues) => void;
  loading: boolean;
}

const initialValues: PlannerFormValues = {
  days: 2,
  budgetLevel: 'standard',
  mobilityLevel: 'low-impact',
  season: 'summer'
};

export const PlannerForm = ({ locale, onSubmit, loading }: PlannerFormProps) => {
  const [values, setValues] = useState<PlannerFormValues>(initialValues);
  const strings = STRINGS[locale];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(3, Math.max(1, parsed));
    setValues((prev) => ({ ...prev, days: clamped }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value } as PlannerFormValues));
  };

  return (
    <form className="planner-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="days">{strings.daysLabel}</label>
        <input
          id="days"
          name="days"
          type="number"
          min={1}
          max={3}
          value={values.days}
          onChange={handleNumberChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="budget">{strings.budgetLabel}</label>
        <select id="budget" name="budgetLevel" value={values.budgetLevel} onChange={handleSelectChange}>
          <option value="economy">{strings.budgetEconomy}</option>
          <option value="standard">{strings.budgetStandard}</option>
          <option value="comfort">{strings.budgetComfort}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mobility">{strings.mobilityLabel}</label>
        <select id="mobility" name="mobilityLevel" value={values.mobilityLevel} onChange={handleSelectChange}>
          <option value="low-impact">{strings.mobilityLow}</option>
          <option value="average">{strings.mobilityAverage}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="season">{strings.seasonLabel}</label>
        <select id="season" name="season" value={values.season} onChange={handleSelectChange}>
          <option value="summer">{strings.seasonSummer}</option>
          <option value="shoulder">{strings.seasonShoulder}</option>
          <option value="winter">{strings.seasonWinter}</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? strings.loading : strings.submit}
      </button>
    </form>
  );
};
