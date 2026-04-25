import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
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

  return (
    <PreferencesContext.Provider value={{ fontSize, setFontSize, fontWeight, setFontWeight }}>
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
