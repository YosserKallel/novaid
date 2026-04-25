import React from 'react';
import { Link } from 'react-router-dom';

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function AppNavbar({ activeRoute = 'dashboard' }) {
  return (
    <header className="bg-white dark:bg-slate-900 border-t-2 border-t-red-700 dark:border-t-red-600 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto safe-area-header flex flex-col gap-3 py-3 px-4">
        {/* Ligne 1 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">NOVAID</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              <SunIcon />
            </button>
            <button
              type="button"
              className="min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Ligne 2 (Sidebar horizontale) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link 
              to="/dashboard"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'dashboard' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              Tableau de bord
            </Link>
            <Link 
              to="/alerts"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'alerts' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">🔔</span> Alertes
            </Link>
            <Link 
              to="/map"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'map' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">🌍</span> Carte
            </Link>
            <Link 
              to="/inventory"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'inventory' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">📦</span> Stocks
            </Link>
            <Link 
              to="/users"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'users' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">👥</span> Utilisateurs
            </Link>
            <Link 
              to="/missions"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'missions' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">🎯</span> Mes Missions
            </Link>
            <Link 
              to="/settings"
              className={`inline-flex items-center min-h-[44px] px-4 py-3 rounded-lg text-sm font-medium ${activeRoute === 'settings' ? 'bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100'}`}
            >
              <span aria-hidden className="me-1">⚙️</span> Paramètres
            </Link>
          </div>

          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-600 rounded-lg p-1 bg-slate-50 dark:bg-slate-800">
            <button className="min-h-[36px] min-w-[36px] px-2 rounded text-xs font-medium bg-blue-600 text-white dark:bg-blue-500">FR</button>
            <button className="min-h-[36px] min-w-[36px] px-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 dark:hover:bg-slate-600">الع</button>
            <button className="min-h-[36px] min-w-[36px] px-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 dark:hover:bg-slate-600">EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
