import type { Locale } from '../i18n';
import { STRINGS } from '../i18n';
import type { ItineraryResponse } from '../types';

interface SummaryCardProps {
  locale: Locale;
  summary: ItineraryResponse['summary'];
}

export const SummaryCard = ({ locale, summary }: SummaryCardProps) => {
  const strings = STRINGS[locale];
  const budgetLabelKey: Record<
    ItineraryResponse['summary']['budgetLevel'],
    keyof typeof strings
  > = {
    economy: 'budgetEconomy',
    standard: 'budgetStandard',
    comfort: 'budgetComfort'
  };

  return (
    <section className="summary-card">
      <h2>{strings.summaryTitle}</h2>
      <p>
        {strings.totalBudget}: <strong>{summary.totalBudgetRub.toLocaleString('ru-RU')} {strings.rub}</strong>
      </p>
      <p>
        {strings.totalTravel}: <strong>{summary.totalTravelMinutes} {strings.minutes}</strong>
      </p>
      <ul>
        <li>
          {strings.daysLabel}: {summary.days}
        </li>
        <li>
          {strings.budgetLabel}: {strings[budgetLabelKey[summary.budgetLevel]]}
        </li>
        <li>
          {strings.mobilityLabel}: {summary.mobilityLevel === 'low-impact' ? strings.mobilityLow : strings.mobilityAverage}
        </li>
      </ul>
    </section>
  );
};
