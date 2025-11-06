import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentLanguage: 'ru' | 'en';
  onLanguageChange: (lng: 'ru' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { id: 'home', label: t('navigation.home'), path: '/' },
    { id: 'planner', label: t('navigation.planner'), path: '/planner' },
    { id: 'about', label: t('navigation.about'), path: '/about' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    onLanguageChange(newLanguage);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={closeMobileMenu}
          >
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">55+</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-600">
                {t('header.subtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-lg font-medium transition-colors duration-200 hover:text-primary-600 ${
                  location.pathname === item.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className="flex items-center space-x-2 px-4 py-2 text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 border border-gray-300 rounded-xl hover:border-primary-300"
              aria-label={t('header.languageSwitch') || 'Language switch'}
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">
                {currentLanguage === 'ru' ? 'Русский' : 'English'}
              </span>
              <span className="sm:hidden">
                {currentLanguage === 'ru' ? 'RU' : 'EN'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 text-lg font-medium rounded-xl transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;