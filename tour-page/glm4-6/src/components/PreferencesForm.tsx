import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, DollarSign, Users, MapPin, Heart, CloudRain, Car, Check } from 'lucide-react';
import { TravelPreferences, FormErrors } from '@/types';

interface PreferencesFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading?: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();

  const [preferences, setPreferences] = useState<TravelPreferences>({
    days: 1,
    budget: 'medium',
    mobility: 'good',
    interests: [],
    transportPreference: 'mixed',
    startLocation: 'Санкт-Петербург',
    groupSize: 2,
    age: 60,
    weatherConsideration: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const categories = [
    { id: 'museums', icon: '🏛️', label: t('preferences.interests.museums') },
    { id: 'palaces', icon: '🏰', label: t('preferences.interests.palaces') },
    { id: 'parks', icon: '🌳', label: t('preferences.interests.parks') },
    { id: 'churches', icon: '⛪', label: t('preferences.interests.churches') },
    { id: 'nature', icon: '🏔️', label: t('preferences.interests.nature') },
    { id: 'theater', icon: '🎭', label: t('preferences.interests.theater') },
    { id: 'gallery', icon: '🎨', label: t('preferences.interests.gallery') },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!preferences.interests || preferences.interests.length === 0) {
      newErrors.interests = 'Пожалуйста, выберите хотя бы одну категорию интересов';
    }

    if (preferences.age < 55 || preferences.age > 100) {
      newErrors.age = 'Возраст должен быть от 55 до 100 лет';
    }

    if (preferences.groupSize < 1 || preferences.groupSize > 20) {
      newErrors.groupSize = 'Количество человек должно быть от 1 до 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(preferences);
    }
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));

    // Clear error when user selects at least one interest
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Duration */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <Clock className="w-6 h-6 text-primary-600" />
          {t('preferences.days.label')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, days: day as 1 | 2 | 3 }))}
              className={`p-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 ${
                preferences.days === day
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {day} {t('common.day')}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <DollarSign className="w-6 h-6 text-primary-600" />
          {t('preferences.budget.label')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['low', 'medium', 'high'] as const).map((budget) => (
            <button
              key={budget}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, budget }))}
              className={`p-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 ${
                preferences.budget === budget
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {t(`preferences.budget.${budget}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobility */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <Heart className="w-6 h-6 text-primary-600" />
          {t('preferences.mobility.label')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['good', 'limited', 'wheelchair'] as const).map((mobility) => (
            <button
              key={mobility}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, mobility }))}
              className={`p-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 ${
                preferences.mobility === mobility
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {t(`preferences.mobility.${mobility}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <MapPin className="w-6 h-6 text-primary-600" />
          {t('preferences.interests.label')}
        </label>
        {errors.interests && (
          <p className="text-red-500 text-lg mb-4">{errors.interests}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleInterest(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 relative ${
                preferences.interests.includes(category.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-lg font-medium text-gray-700">
                {category.label}
              </div>
              {preferences.interests.includes(category.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Transport Preference */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <Car className="w-6 h-6 text-primary-600" />
          {t('preferences.transport.label')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(['walking', 'public', 'taxi', 'mixed'] as const).map((transport) => (
            <button
              key={transport}
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, transportPreference: transport }))}
              className={`p-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 ${
                preferences.transportPreference === transport
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {t(`preferences.transport.${transport}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Group Size and Age */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
            <Users className="w-6 h-6 text-primary-600" />
            {t('preferences.groupSize.label')}
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={preferences.groupSize}
            onChange={(e) => setPreferences(prev => ({
              ...prev,
              groupSize: Math.max(1, Math.min(20, parseInt(e.target.value) || 1))
            }))}
            className={`input-senior ${errors.groupSize ? 'border-red-500' : ''}`}
            placeholder="2"
          />
          {errors.groupSize && (
            <p className="text-red-500 text-lg mt-2">{errors.groupSize}</p>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
            <Heart className="w-6 h-6 text-primary-600" />
            {t('preferences.age.label')}
          </label>
          <input
            type="number"
            min="55"
            max="100"
            value={preferences.age}
            onChange={(e) => setPreferences(prev => ({
              ...prev,
              age: Math.max(55, Math.min(100, parseInt(e.target.value) || 55))
            }))}
            className={`input-senior ${errors.age ? 'border-red-500' : ''}`}
            placeholder="60"
          />
          {errors.age && (
            <p className="text-red-500 text-lg mt-2">{errors.age}</p>
          )}
        </div>
      </div>

      {/* Weather Consideration */}
      <div>
        <label className="flex items-center space-x-3 text-lg font-semibold text-gray-900 mb-4">
          <CloudRain className="w-6 h-6 text-primary-600" />
          {t('preferences.weather.label')}
        </label>
        <button
          type="button"
          onClick={() => setPreferences(prev => ({ ...prev, weatherConsideration: !prev.weatherConsideration }))}
          className={`relative inline-flex h-12 w-24 items-center rounded-xl transition-colors duration-200 ${
            preferences.weatherConsideration ? 'bg-primary-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-10 w-10 transform rounded-xl bg-white transition-transform duration-200 ${
              preferences.weatherConsideration ? 'translate-x-12' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('common.loading') : t('preferences.submit')}
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;