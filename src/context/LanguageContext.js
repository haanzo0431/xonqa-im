'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '@/data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'EN';
    setLang(savedLang);

    const handleCustomLangChange = (e) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener('languageChange', handleCustomLangChange);
    return () => window.removeEventListener('languageChange', handleCustomLangChange);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  const t = (section, key) => {
    return TRANSLATIONS[lang]?.[section]?.[key] || TRANSLATIONS['EN']?.[section]?.[key] || key;
  };

  const currentTranslations = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        changeLanguage,
        t,
        translations: currentTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'EN',
      changeLanguage: () => {},
      t: (section, key) => key,
      translations: TRANSLATIONS['EN'],
    };
  }
  return context;
}
