import React, { useState } from 'react';
import AppNavbar from '../components/AppNavbar';

const FONT_OPTIONS = [
  { value: 'base', label: 'Taille Standard', iconClass: 'text-sm font-semibold' },
  { value: 'lg', label: 'Taille Moyenne', iconClass: 'text-base font-semibold' },
  { value: 'xl', label: 'Taille Grande', iconClass: 'text-lg font-bold' },
];

const FONT_WEIGHT_OPTIONS = [
  { value: 'normal', label: 'Normale', iconClass: 'font-normal' },
  { value: 'medium', label: 'Moyenne (Medium)', iconClass: 'font-medium' },
  { value: 'bold', label: 'Grasse (Bold)', iconClass: 'font-bold' },
];

export default function Settings() {
  const [fontSize, setFontSize] = useState('base');
  const [fontWeight, setFontWeight] = useState('normal');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <AppNavbar activeRoute="settings" />
      <main className="max-w-2xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span aria-hidden>⚙️</span> Paramètres d'Affichage
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Personnalisez l'affichage de l'application selon vos préférences visuelles.
          </p>
        </div>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Taille du texte</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Choisissez une taille de texte plus lisible si nécessaire.
          </p>
          <div className="flex flex-wrap gap-3">
            {FONT_OPTIONS.map(({ value, label, iconClass }) => {
              const isSelected = fontSize === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFontSize(value)}
                  className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-3 rounded-lg border-2 font-medium transition-colors ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 shrink-0 rounded bg-white/50 dark:bg-slate-900/50 ${iconClass}`} aria-hidden>
                    A
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
            Aperçu : Voici comment le texte "standard" s'affichera dans l'application... (Aperçu activé localement)
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">Graisse du texte (Épaisseur)</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Augmentez l'épaisseur de la police pour un meilleur contraste visuel.
          </p>
          <div className="flex flex-wrap gap-3">
            {FONT_WEIGHT_OPTIONS.map(({ value, label, iconClass }) => {
              const isSelected = fontWeight === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFontWeight(value)}
                  className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-3 rounded-lg border-2 font-medium transition-colors ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 shrink-0 rounded bg-white/50 dark:bg-slate-900/50 text-base ${iconClass}`} aria-hidden>
                    A
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
            Aperçu : Observez la différence de contraste des caractères pour choisir la meilleure option de lecture.
          </p>
        </section>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={() => { setFontSize('base'); setFontWeight('normal'); }}
            className="px-6 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Réinitialiser
          </button>
          <button 
            onClick={() => alert('Préférences sauvegardées ! (Mock)')}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Enregistrer les préférences
          </button>
        </div>

      </main>
    </div>
  );
}
