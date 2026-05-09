import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'fr';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('appFontSize') || 'base';
  });
  
  const [fontWeight, setFontWeight] = useState(() => {
    return localStorage.getItem('appFontWeight') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('appFontSize', fontSize);
    
    // Scale root font size:
    // base -> 16px (100%)
    // lg -> 18px (112.5%)
    // xl -> 20px (125%)
    const htmlEl = document.documentElement;
    if (fontSize === 'base') {
      htmlEl.style.fontSize = '100%';
    } else if (fontSize === 'lg') {
      htmlEl.style.fontSize = '112.5%';
    } else if (fontSize === 'xl') {
      htmlEl.style.fontSize = '125%';
    }
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('appFontWeight', fontWeight);
    
    // Set class on body to apply global weights
    const bodyEl = document.body;
    bodyEl.classList.remove('app-font-normal', 'app-font-medium', 'app-font-bold');
    bodyEl.classList.add(`app-font-${fontWeight}`);
  }, [fontWeight]);

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    htmlEl.lang = language;
    htmlEl.dir = dir;
    bodyEl.dir = dir;
    bodyEl.classList.toggle('rtl', dir === 'rtl');
  }, [language]);

  const locale = language === 'ar' ? 'ar-TN' : language === 'en' ? 'en-US' : 'fr-FR';

  const t = (key, params = {}) => {
    const getValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => {
        if (acc && Object.prototype.hasOwnProperty.call(acc, part)) {
          return acc[part];
        }
        return undefined;
      }, obj);
    };

    const template =
      getValue(translations[language], key) ??
      getValue(translations.fr, key) ??
      key;

    if (typeof template !== 'string') return template;
    return Object.keys(params).reduce((text, paramKey) => {
      return text.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), params[paramKey]);
    }, template);
  };

  return (
    <PreferencesContext.Provider value={{
      fontSize,
      setFontSize,
      fontWeight,
      setFontWeight,
      language,
      setLanguage,
      locale,
      t,
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
