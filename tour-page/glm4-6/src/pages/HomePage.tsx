import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t('hero.features.accessibility.title'),
      description: t('hero.features.accessibility.description'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('hero.features.comfort.title'),
      description: t('hero.features.comfort.description'),
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t('hero.features.budget.title'),
      description: t('hero.features.budget.description'),
    },
  ];

  const stats = [
    { number: '18+', label: 'Доступных маршрутов' },
    { number: '50+', label: 'Проверенных мест' },
    { number: '100%', label: 'Адаптировано для 55+' },
    { number: '24/7', label: 'Поддержка' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/planner"
                className="btn-primary text-lg px-8 py-4"
              >
                {t('hero.startPlanning')}
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают наш планировщик
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создали специальный сервис, который учитывает все потребности путешественников старшего возраста
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-6 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Создайте идеальный маршрут всего за 3 простых шага
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Укажите предпочтения
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Выберите продолжительность, бюджет, интересы и уровень мобильности
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Получите маршрут
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Наш алгоритм создаст оптимальный маршрут с учетом всех ваших потребностей
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Наслаждайтесь поездкой
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Следуйте готовому плану с детальной информацией о каждом месте
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярные направления
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Лучшие места Ленинградской области, адаптированные для комфортного отдыха
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Петергоф', description: 'Великолепные фонтаны и дворцы' },
              { name: 'Царское Село', description: 'Екатерининский дворец с Янтарной комнатой' },
              { name: 'Павловск', description: 'Элегантный дворцово-парковый ансамбль' },
              { name: 'Гатчина', description: 'Уникальный дворец-замок' },
              { name: 'Старая Ладога', description: 'Древняя столица Руси' },
              { name: 'Ораниенбаум', description: 'Дворцово-парковый ансамбль' },
            ].map((destination, index) => (
              <div key={index} className="card hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {destination.name}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {destination.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готовы к путешествию?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Создайте персонализированный маршрут уже сегодня и наслаждайтесь комфортными путешествиями по Ленинградской области
          </p>
          <Link
            to="/planner"
            className="inline-flex items-center bg-white text-primary-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            {t('hero.startPlanning')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;