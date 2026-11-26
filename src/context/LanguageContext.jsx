import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pharmacity_lang') || 'fr';
    }
    return 'fr';
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('pharmacity_lang', language);
    } catch {
      // ignore
    }
  }, [language, isRtl]);

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  /**
   * Fonction de traduction
   * @param {string} key - Clé de traduction (ex: 'hero.title')
   * @param {string} [fallback] - Texte alternatif si clé non trouvée
   */
  const t = (key, fallback = '') => {
    const dict = translations[language] || translations.fr;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Repli sur le français
    if (translations.fr && translations.fr[key] !== undefined) {
      return translations.fr[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRtl, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fournisseur par défaut si appelé hors du Provider
    return {
      language: 'fr',
      isRtl: false,
      switchLanguage: () => {},
      t: (key, fallback = '') => translations.fr?.[key] || fallback || key,
    };
  }
  return context;
}
