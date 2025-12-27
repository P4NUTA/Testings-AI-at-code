import type { Language, LocalizedText } from '../types';

export function getLocalizedText(text: LocalizedText, language: Language): string {
  return text[language] || text.ru;
}

export function formatDuration(minutes: number, language: Language): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (language === 'ru') {
    if (hours > 0 && mins > 0) {
      return `${hours} ч ${mins} мин`;
    } else if (hours > 0) {
      return `${hours} ч`;
    }
    return `${mins} мин`;
  } else {
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins}min`;
  }
}

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} ₽`;
}

export function getAccessibilityLabel(score: number, language: Language): string {
  const labels = {
    ru: ['Ограничено', 'Ограничено', 'Средне', 'Хорошо', 'Отлично'],
    en: ['Limited', 'Limited', 'Moderate', 'Good', 'Excellent'],
  };
  return labels[language][Math.min(score - 1, 4)];
}

export function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function shuffleArray<T>(array: T[], randomFn: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
