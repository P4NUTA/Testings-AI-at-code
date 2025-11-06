import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import PreferencesForm from '@/components/PreferencesForm';
import { TravelPreferences, Itinerary } from '@/types';
import { planItinerary, validatePreferences } from '@/services/tourPlanner';

const PlannerPage: React.FC<PlannerPageProps> = ({ onItineraryCreated }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (preferences: TravelPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      // Валидация предпочтений
      const validationErrors = validatePreferences(preferences);
      if (validationErrors.length > 0) {
        setError(validationErrors.join('. '));
        return;
      }

      // Имитация задержки для лучшего UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Создание маршрута
      const itinerary = planItinerary(preferences);

      // Передача маршрута в родительский компонент
      onItineraryCreated(itinerary);

      // Переход на страницу маршрута
      navigate('/itinerary');

    } catch (err) {
      console.error('Error planning itinerary:', err);
      setError(t('errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">{t('common.back')}</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('preferences.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('preferences.subtitle')}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Создаем ваш идеальный маршрут
            </h2>
            <p className="text-lg text-gray-600">
              Это может занять несколько секунд...
            </p>
            <div className="mt-8 space-y-2 text-left max-w-md">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Анализируем ваши предпочтения</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Подбираем лучшие маршруты</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Рассчитываем бюджет и время</span>
              </div>
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                <span className="text-gray-700">Оптимизируем для комфорта</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {!isLoading && (
          <div className="card">
            {error && (
              <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-lg text-red-800">{error}</p>
              </div>
            )}

            <PreferencesForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}

        {/* Tips Section */}
        {!isLoading && (
          <div className="mt-12 card bg-blue-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              💡 Полезные советы
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• Для максимального комфорта выбирайте не более 3-4 категорий интересов</li>
              <li>• При ограниченной мобильности рекомендуем отдавать предпочтение дворцам и музеям</li>
              <li>• Учитывайте погодные условия для планирования outdoor активностей</li>
              <li>• Оптимальное количество человек в группе — 2-6 для лучшего опыта</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

interface PlannerPageProps {
  onItineraryCreated: (itinerary: Itinerary) => void;
}

export default PlannerPage;