export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${remainingMinutes} мин`;
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters} м`;
  }
  const kilometers = (meters / 1000).toFixed(1);
  return `${kilometers} км`;
};

export const formatTime = (time: string): string => {
  return time;
};

export const getAccessibilityLevel = (score: number): 'good' | 'medium' | 'limited' => {
  if (score >= 80) return 'good';
  if (score >= 60) return 'medium';
  return 'limited';
};

export const getComfortLevel = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
};