import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, Share2, Edit, Home } from 'lucide-react';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { Itinerary } from '@/types';

const ItineraryPage: React.FC<{ itinerary: Itinerary | null }> = ({ itinerary }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDownload = () => {
    if (!itinerary) return;

    // Create text content for download
    const content = generateTextItinerary(itinerary);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `itinerary-${itinerary.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!itinerary) return;

    const shareData = {
      title: 'Мой маршрут по Ленинградской области',
      text: `Планирую ${itinerary.days.length}-дневную поездку по Ленинградской области с ${itinerary.totalBudget[itinerary.preferences.budget]}₽ бюджетом`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Ссылка скопирована в буфер обмена!');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  const generateTextItinerary = (itinerary: Itinerary): string => {
    let content = `ПЛАН ПУТЕШЕСТВИЯ ПО ЛЕНИНГРАДСКОЙ ОБЛАСТИ\n`;
    content += `===============================================\n\n`;
    content += `Продолжительность: ${itinerary.days.length} ${itinerary.days.length === 1 ? 'день' : 'дня'}\n`;
    content += `Бюджет: ${itinerary.totalBudget[itinerary.preferences.budget]} ₽\n`;
    content += `Общая доступность: ${itinerary.accessibilityRating}%\n`;
    content += `Уровень комфорта: ${itinerary.comfortLevel === 'high' ? 'Высокий' : itinerary.comfortLevel === 'medium' ? 'Средний' : 'Низкий'}\n\n`;

    itinerary.days.forEach((day) => {
      content += `ДЕНЬ ${day.day}\n`;
      content += `${'='.repeat(50)}\n\n`;
      content += `Бюджет дня: ${day.totalBudget[itinerary.preferences.budget]} ₽\n`;
      content += `Общее время в пути: ${day.totalTravelTime} минут\n`;
      content += `Пешком: ${day.totalWalkingDistance} метров\n\n`;

      day.attractions.forEach((attraction, index) => {
        content += `${index + 1}. ${attraction.name.ru}\n`;
        content += `   Время: ${attraction.plannedStartTime} - ${attraction.plannedEndTime}\n`;
        content += `   Описание: ${attraction.description.ru}\n`;
        content += `   Цена: ${attraction.actualPrice.ticket} ₽\n`;
        content += `   Продолжительность: ${attraction.visitDuration} минут\n\n`;
      });

      content += `Примечания: ${day.notes}\n\n`;
    });

    content += `РЕКОМЕНДАЦИИ\n`;
    content += `${'='.repeat(50)}\n\n`;
    itinerary.recommendations.forEach((rec, index) => {
      content += `${index + 1}. ${rec}\n`;
    });

    content += `\nЭКСТРЕННЫЕ КОНТАКТЫ\n`;
    content += `${'='.repeat(50)}\n`;
    content += `Полиция: ${itinerary.emergencyContacts.police}\n`;
    content += `Скорая помощь: ${itinerary.emergencyContacts.medical}\n`;
    content += `Туристическая помощь: ${itinerary.emergencyContacts.tourist}\n`;

    return content;
  };

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Маршрут не найден
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Пожалуйста, вернитесь к планировщику и создайте новый маршрут.
          </p>
          <button
            onClick={() => navigate('/planner')}
            className="btn-primary"
          >
            Создать маршрут
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/planner')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg">{t('common.back')}</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('itinerary.title')}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              <span>{t('itinerary.download')}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
              <span>{t('itinerary.share')}</span>
            </button>
            <button
              onClick={() => navigate('/planner')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200"
            >
              <Edit className="w-5 h-5" />
              <span>{t('itinerary.edit')}</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span>{t('navigation.home')}</span>
            </button>
          </div>
        </div>

        {/* Itinerary Display */}
        <ItineraryDisplay itinerary={itinerary} />

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>{t('itinerary.download')}</span>
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Share2 className="w-5 h-5" />
              <span>{t('itinerary.share')}</span>
            </button>
            <button
              onClick={() => navigate('/planner')}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Edit className="w-5 h-5" />
              <span>{t('itinerary.newPlan')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;