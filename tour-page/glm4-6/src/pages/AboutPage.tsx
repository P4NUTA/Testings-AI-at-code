import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, MapPin, Users, Clock, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Персонализация',
      description: 'Учитываем возраст, мобильность и интересы каждого путешественника'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Безопасность',
      description: 'Маршруты с учетом всех мер безопасности и комфорта'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Доступность',
      description: 'Детальная информация о доступности каждого объекта'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Оптимизация',
      description: 'Минимум пересадок и комфортное время в пути'
    }
  ];

  const stats = [
    { number: '100+', label: 'Проверенных мест' },
    { number: '50+', label: 'Готовых маршрутов' },
    { number: '100%', label: 'Адаптация для 55+' },
    { number: '24/7', label: 'Поддержка' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">{t('common.back')}</span>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
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

        {/* Features List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Что мы предлагаем
          </h2>
          <div className="card">
            <ul className="space-y-4">
              {[
                "Персонализированные маршруты с учетом мобильности",
                "Детальная информация о доступности каждого объекта",
                "Прозрачный расчет бюджета с учетом всех расходов",
                "Альтернативные планы на случай плохой погоды",
                "Транспортные рекомендации с минимизацией пересадок"
              ].map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
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

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Заполните анкету
              </h3>
              <p className="text-gray-600">
                Укажите предпочтения по маршруту, бюджету и интересам
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Получите маршрут
              </h3>
              <p className="text-gray-600">
                Наш алгоритм создаст оптимальный план путешествия
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Наслаждайтесь поездкой
              </h3>
              <p className="text-gray-600">
                Следуйте готовому маршруту с подробной информацией
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Готовы начать путешествие?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Создайте персонализированный маршрут и наслаждайтесь комфортными поездками
          </p>
          <Link
            to="/planner"
            className="btn-primary text-lg px-8 py-4"
          >
            Начать планирование
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;