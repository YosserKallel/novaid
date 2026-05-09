import React from 'react';
import { Settings as SettingsIcon, Type, Moon, Sun, Globe } from 'lucide-react';
import AppNavbar from '../components/AppNavbar';
import { usePreferences } from '../context/PreferencesContext';

const FONT_OPTIONS = [
  { value: 'base', size: 'text-sm' },
  { value: 'lg', size: 'text-base' },
  { value: 'xl', size: 'text-lg' },
];

const FONT_WEIGHT_OPTIONS = [
  { value: 'normal', weight: 'font-normal' },
  { value: 'medium', weight: 'font-medium' },
  { value: 'bold', weight: 'font-bold' },
];

function Settings({ toggleTheme, isDark }) {
  const { fontSize, setFontSize, fontWeight, setFontWeight, language, setLanguage, t } = usePreferences();

  return (
    <div className="page-container">
      <AppNavbar activeRoute="settings" toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="page-main max-w-2xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="page-title flex items-center gap-3">
            <SettingsIcon size={32} style={{ color: 'var(--color-blue)' }} />
            {t('settings.title')}
          </h1>
          <p className="text-secondary">{t('settings.subtitle')}</p>
        </div>

        {/* FONT SIZE SECTION */}
        <section className="card mb-6">
          <h2 className="text-lg font-semibold text-primary mb-1 flex items-center gap-2">
            <Type size={20} />
            {t('settings.fontSizeTitle')}
          </h2>
          <p className="text-sm text-secondary mb-5">{t('settings.fontSizeDesc')}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {FONT_OPTIONS.map(({ value, size }) => {
              const isSelected = fontSize === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFontSize(value)}
                  className={`inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-muted bg-elevated text-secondary hover:border-blue-500/50'
                  }`}
                >
                  <span className={`${size}`}>{t(`settings.textSize.${value}`)}</span>
                </button>
              );
            })}
          </div>

          {/* PREVIEW */}
          <div className="p-5 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className={`text-secondary italic transition-all ${
              fontSize === 'base' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl'
            } ${
              fontWeight === 'normal' ? 'font-normal' : fontWeight === 'medium' ? 'font-medium' : 'font-bold'
            }`}>
              {t('settings.previewTextSize')}
            </p>
          </div>
        </section>

        {/* FONT WEIGHT SECTION */}
        <section className="card mb-8">
          <h2 className="text-lg font-semibold text-primary mb-1 flex items-center gap-2">
            <Type size={20} />
            {t('settings.fontWeightTitle')}
          </h2>
          <p className="text-sm text-secondary mb-5">{t('settings.fontWeightDesc')}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {FONT_WEIGHT_OPTIONS.map(({ value, weight }) => {
              const isSelected = fontWeight === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFontWeight(value)}
                  className={`inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-muted bg-elevated text-secondary hover:border-blue-500/50'
                  }`}
                >
                  <span className={`${weight}`}>{t(`settings.textWeight.${value}`)}</span>
                </button>
              );
            })}
          </div>

          {/* PREVIEW */}
          <div className="p-5 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className={`text-secondary italic transition-all ${
              fontSize === 'base' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl'
            } ${
              fontWeight === 'normal' ? 'font-normal' : fontWeight === 'medium' ? 'font-medium' : 'font-bold'
            }`}>
              {t('settings.previewTextWeight')}
            </p>
          </div>
        </section>

        {/* APPEARANCE SECTION */}
        <section className="card mb-6">
          <h2 className="text-lg font-semibold text-primary mb-1 flex items-center gap-2">
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
            {t('settings.appearanceTitle')}
          </h2>
          <p className="text-sm text-secondary mb-5">{t('settings.appearanceDesc')}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={() => { if (isDark) toggleTheme(); }}
              className={`inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                !isDark
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-muted bg-elevated text-secondary hover:border-blue-500/50'
              }`}
            >
              <Sun size={18} className="mr-2" /> {t('settings.lightMode')}
            </button>
            <button
              type="button"
              onClick={() => { if (!isDark) toggleTheme(); }}
              className={`inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                isDark
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-muted bg-elevated text-secondary hover:border-blue-500/50'
              }`}
            >
              <Moon size={18} className="mr-2" /> {t('settings.darkMode')}
            </button>
          </div>
        </section>

        {/* LANGUAGE SECTION */}
        <section className="card mb-8">
          <h2 className="text-lg font-semibold text-primary mb-1 flex items-center gap-2">
            <Globe size={20} />
            {t('settings.languageTitle')}
          </h2>
          <p className="text-sm text-secondary mb-5">{t('settings.languageDesc')}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { value: 'fr', label: t('settings.languageFr') },
              { value: 'ar', label: t('settings.languageAr') },
              { value: 'en', label: t('settings.languageEn') },
            ].map((lang) => {
              const isSelected = language === lang.value;
              return (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => setLanguage(lang.value)}
                  className={`inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-muted bg-elevated text-secondary hover:border-blue-500/50'
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => { setFontSize('base'); setFontWeight('normal'); }}
            className="btn btn-outline"
          >
            {t('common.reset')}
          </button>
          <button 
            onClick={() => alert('Préférences sauvegardées !')}
            className="btn btn-primary"
          >
            {t('common.save')}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Settings;
