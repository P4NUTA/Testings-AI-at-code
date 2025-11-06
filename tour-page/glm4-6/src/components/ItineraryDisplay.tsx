import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  DollarSign,
  CloudRain,
  Phone,
  AlertTriangle,
  Navigation,
  Coffee,
  Camera,
  ShoppingCart,
  Users,
  Star,
  Heart
} from 'lucide-react';
import { Itinerary } from '@/types';

const ItineraryDisplay: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
  const { t } = useTranslation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAccessibilityBadge = (score: number) => {
    if (score >= 80) {
      return { class: 'accessibility-good', text: t('accessibility.good'), icon: Star };
    } else if (score >= 60) {
      return { class: 'accessibility-medium', text: t('accessibility.medium'), icon: Heart };
    } else {
      return { class: 'accessibility-limited', text: t('accessibility.limited'), icon: AlertTriangle };
    }
  };

  const getComfortBadge = (level: string) => {
    switch (level) {
      case 'high':
        return { class: 'accessibility-good', text: t('accessibility.high') };
      case 'medium':
        return { class: 'accessibility-medium', text: t('accessibility.mediumComfort') };
      default:
        return { class: 'accessibility-limited', text: t('accessibility.lowComfort') };
    }
  };

  const renderTransportInfo = (transport: any) => {
    const pref = itinerary.preferences.transportPreference;
    const transportData = pref === 'walking' ? transport.walking :
                         pref === 'public' ? transport.public :
                         pref === 'taxi' ? transport.taxi :
                         transport.public;

    return (
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-gray-500" />
          <span>{t('transport.time', { time: transportData.time })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span>{t('transport.cost', { cost: transportData.cost })}</span>
        </div>
        {transport.public?.transfers > 0 && (
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{t('transport.transfers', { count: transport.public.transfers })}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('itinerary.title')}
          </h2>
          <div className="flex items-center space-x-4">
            {getAccessibilityBadge(itinerary.accessibilityRating).icon && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getAccessibilityBadge(itinerary.accessibilityRating).class}`}>
                {React.createElement(getAccessibilityBadge(itinerary.accessibilityRating).icon, { className: "w-5 h-5" })}
                <span className="font-medium">{getAccessibilityBadge(itinerary.accessibilityRating).text}</span>
              </div>
            )}
            <div className={`px-4 py-2 rounded-full ${getComfortBadge(itinerary.comfortLevel).class}`}>
              <span className="font-medium">{getComfortBadge(itinerary.comfortLevel).text}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {itinerary.days.length}
            </div>
            <div className="text-gray-600">
              {itinerary.days.length === 1 ? t('common.day') : t('common.days')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {formatPrice(itinerary.totalBudget[itinerary.preferences.budget])}
            </div>
            <div className="text-gray-600">
              {t('itinerary.totalBudget')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {itinerary.accessibilityRating}%
            </div>
            <div className="text-gray-600">
              {t('itinerary.accessibilityScore')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {itinerary.totalDistance} км
            </div>
            <div className="text-gray-600">
              {t('common.distance')}
            </div>
          </div>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-8">
        {itinerary.days.map((day) => (
          <div key={day.day} className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {t('itinerary.day', { number: day.day })}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatPrice(day.totalBudget[itinerary.preferences.budget])}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{day.totalTravelTime} мин</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {day.attractions.map((attraction, index) => (
                <div key={attraction.id} className="relative">
                  {/* Timeline line */}
                  {index < day.attractions.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200" />
                  )}

                  <div className="flex space-x-6">
                    {/* Time marker */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {attraction.plannedStartTime}
                      </div>
                    </div>

                    {/* Attraction details */}
                    <div className="flex-grow pb-8">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {attraction.name[itinerary.preferences.transportPreference === 'mixed' ? 'ru' : 'ru']}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {attraction.description.ru}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                              {t(`categories.${attraction.category}`)}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                              {attraction.priority === 'high' ? '⭐' : attraction.priority === 'medium' ? '●' : '○'}
                            </span>
                          </div>
                        </div>

                        {/* Time and duration */}
                        <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{t('common.duration')}: {attraction.visitDuration} мин</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{attraction.plannedStartTime} - {attraction.plannedEndTime}</span>
                          </div>
                        </div>

                        {/* Transport info */}
                        {attraction.transportationFromPrevious && index > 0 && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Navigation className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Транспорт от предыдущей точки:
                              </span>
                            </div>
                            {renderTransportInfo(attraction.transportationFromPrevious)}
                          </div>
                        )}

                        {/* Facilities */}
                        <div className="flex items-center space-x-6 text-sm">
                          {attraction.hasCafe && (
                            <div className="flex items-center space-x-1 text-gray-600">
                              <Coffee className="w-4 h-4" />
                              <span>{t('attraction.facilities.hasCafe')}</span>
                            </div>
                          )}
                          {attraction.photoAllowed && (
                            <div className="flex items-center space-x-1 text-gray-600">
                              <Camera className="w-4 h-4" />
                              <span>{t('attraction.facilities.photoAllowed')}</span>
                            </div>
                          )}
                          {attraction.hasGiftShop && (
                            <div className="flex items-center space-x-1 text-gray-600">
                              <ShoppingCart className="w-4 h-4" />
                              <span>{t('attraction.facilities.hasGiftShop')}</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Цена посещения:</span>
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(attraction.actualPrice.ticket)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Day summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Информация о дне</h5>
              <p className="text-gray-600 leading-relaxed mb-4">{day.notes}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Общее время:</span>
                  <div className="font-semibold">{day.totalTravelTime} мин</div>
                </div>
                <div>
                  <span className="text-gray-500">Пешком:</span>
                  <div className="font-semibold">{day.totalWalkingDistance} м</div>
                </div>
                <div>
                  <span className="text-gray-500">Доступность:</span>
                  <div className="font-semibold">{day.accessibilityScore}%</div>
                </div>
                <div>
                  <span className="text-gray-500">Бюджет:</span>
                  <div className="font-semibold">{formatPrice(day.totalBudget[itinerary.preferences.budget])}</div>
                </div>
              </div>
            </div>

            {/* Weather backup */}
            {day.weatherBackup.length > 0 && (
              <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <CloudRain className="w-5 h-5 text-blue-600" />
                  <h5 className="font-semibold text-blue-900">{t('itinerary.weatherBackup')}</h5>
                </div>
                <div className="space-y-2">
                  {day.weatherBackup.map((backup, index) => (
                    <div key={index} className="text-blue-800">
                      {backup.name.ru} - {backup.plannedStartTime}-{backup.plannedEndTime}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {t('itinerary.recommendations')}
        </h3>
        <ul className="space-y-3">
          {itinerary.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Emergency contacts */}
      <div className="card bg-red-50">
        <h3 className="text-xl font-bold text-red-900 mb-4">
          {t('itinerary.emergencyContacts')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-900">{t('emergency.police')}</div>
              <div className="text-sm text-red-700">Полиция</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-900">{t('emergency.medical')}</div>
              <div className="text-sm text-red-700">Скорая помощь</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-900">{t('emergency.tourist')}</div>
              <div className="text-sm text-red-700">Туристическая помощь</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;