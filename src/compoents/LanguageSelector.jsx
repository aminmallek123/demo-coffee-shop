import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = ({ isDarkMode }) => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇹🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${language === lang.code
                ? isDarkMode
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
            title={lang.name}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
