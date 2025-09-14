import React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/LanguageToggle.scss';

function LanguageToggle() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = React.useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <div className="language-toggle" onClick={toggleLanguage}>
      <div className={`flag-icon ${currentLang === 'en' ? 'flag-us' : 'flag-id'}`}>
        {currentLang === 'en' ? '🇺🇸' : '🇮🇩'}
      </div>
    </div>
  );
}

export default LanguageToggle;