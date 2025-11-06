import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">55+</span>
              </div>
              <h3 className="text-xl font-bold">{t('header.title')}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('common.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">8-800-123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">info@tour55.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">Санкт-Петербург, Россия</span>
              </div>
            </div>
          </div>

          {/* Emergency Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('emergencyContacts')}</h4>
            <div className="space-y-2 text-gray-400">
              <p>{t('emergency.police')}</p>
              <p>{t('emergency.medical')}</p>
              <p>{t('emergency.tourist')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 {t('header.title')}. Все права защищены.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Сделано с
              </span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-400 text-sm">
                для путешественников 55+
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;