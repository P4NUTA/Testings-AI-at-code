import type { Locale } from '../i18n';
import { STRINGS } from '../i18n';
import type { DayPlan } from '../types';

interface DayCardProps {
  locale: Locale;
  day: DayPlan;
}

export const DayCard = ({ locale, day }: DayCardProps) => {
  const strings = STRINGS[locale];
  return (
    <section className="day-card">
      <header>
        <h3>
          {strings.dayTitle} {day.dayNumber} — {day.cluster}
        </h3>
        <p>
          {strings.totalBudget}: {day.estimatedDayBudgetRub.toLocaleString('ru-RU')} {strings.rub}
        </p>
        <p>
          {strings.totalTravel}: {day.estimatedTravelMinutes} {strings.minutes}
        </p>
      </header>
      <ol>
        {day.segments.map((segment) => (
          <li key={segment.attractionId}>
            <div className="segment">
              <div>
                <strong>{segment.title[locale]}</strong>
                <p>
                  {segment.city} · {segment.durationHours}h · {segment.indoor ? strings.indoor : strings.outdoor}
                </p>
                <small>{segment.mobilityNotes[locale]}</small>
              </div>
              <div className="segment-meta">
                <span>{segment.entryFeeRub.toLocaleString('ru-RU')} {strings.rub}</span>
                <span>{segment.travelMinutesFromPrev} {strings.minutes}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {day.rainyAlternatives.length > 0 && (
        <div className="rainy-block">
          <p>{strings.rainyAlternatives}</p>
          <ul>
            {day.rainyAlternatives.map((alt) => (
              <li key={alt.attractionId}>{alt.title[locale]}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
