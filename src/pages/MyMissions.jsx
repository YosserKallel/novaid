import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

const TYPE_STYLES = {
  Alimentaire: { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-800 dark:text-pink-300', label: 'Alimentaire', emoji: '🍎' },
  Médical: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-800 dark:text-blue-300', label: 'Médical', emoji: '💊' },
  Social: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-800 dark:text-amber-300', label: 'Social', emoji: '🤝' },
  Autre: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-700 dark:text-slate-300', label: 'Autre', emoji: '📦' },
};

function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRelativeDate(d) {
  const date = new Date(d);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function CheckCircleIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MyMissions() {
  const [showAllAssigned, setShowAllAssigned] = useState(false);

  // MOCK DATA
  const openMissions = [
    {
      _id: '1',
      family: { name: 'Famille Khemiri', address: 'Béja Nord' },
      date: new Date(Date.now() + 86400000).toISOString(),
      types: ['Social', 'Autre']
    },
    {
      _id: '2',
      family: { name: 'Famille Zghal', address: 'Sfax, Route Teniour' },
      date: new Date(Date.now() + 172800000).toISOString(),
      types: ['Médical']
    }
  ];

  const assignedMissions = [
    {
      _id: '3',
      family: { name: 'Famille Ben Youssef', address: 'Tunis, Medina' },
      date: new Date(Date.now() + 3600000).toISOString(),
      types: ['Alimentaire', 'Social']
    },
    {
      _id: '4',
      family: { name: 'Famille Gharbi', address: 'Ariana' },
      date: new Date(Date.now() + 86400000 * 2).toISOString(),
      types: ['Médical', 'Alimentaire']
    }
  ];

  const completedMissions = [
    {
      _id: '5',
      family: { name: 'Famille Trabelsi', address: 'Bizerte' },
      date: new Date(Date.now() - 86400000).toISOString(),
      types: ['Alimentaire']
    },
    {
      _id: '6',
      family: { name: 'Famille Mansouri', address: 'Sousse' },
      date: new Date(Date.now() - 172800000).toISOString(),
      types: ['Social', 'Médical']
    }
  ];

  const ASSIGNED_DISPLAY_LIMIT = 1;
  const assignedDisplayed = showAllAssigned
    ? assignedMissions
    : assignedMissions.slice(0, ASSIGNED_DISPLAY_LIMIT);
  const hasMoreAssigned = assignedMissions.length > ASSIGNED_DISPLAY_LIMIT;

  const MissionCard = ({ v, type }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
          Visite prévue — {v.family?.name}
        </h3>
        {type === 'assigned' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
            Mission assignée
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
            Mission ouverte
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
        <span aria-hidden>🕒</span> {formatDate(v.date)}
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span aria-hidden>📍</span> {v.family?.address}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {v.types?.map((typeKey) => {
          const style = TYPE_STYLES[typeKey] || TYPE_STYLES.Autre;
          return (
            <span
              key={typeKey}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${style.bg} ${style.text}`}
            >
              {style.emoji} {style.label}
            </span>
          );
        })}
      </div>
      <Link
        to={`/visits/${v._id}/checkin`}
        className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-sm font-medium text-white transition-colors bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900"
      >
        Démarrer la mission
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AppNavbar activeRoute="missions" />
      <main className="max-w-4xl mx-auto px-4 py-8 safe-area-bottom">
        
        {/* OPEN MISSIONS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span aria-hidden>🟢</span> Missions ouvertes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Missions qui n'ont pas encore de bénévoles assignés.
            </p>
          </div>
          {openMissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Aucune mission ouverte pour le moment.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {openMissions.map((v) => (
                <MissionCard key={v._id} v={v} type="open" />
              ))}
            </div>
          )}
        </section>

        {/* ASSIGNED MISSIONS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span aria-hidden>🔵</span> Mes missions assignées
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Les missions qui vous sont actuellement attribuées.
            </p>
          </div>
          {assignedMissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Vous n'avez aucune mission assignée.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {assignedDisplayed.map((v) => (
                  <MissionCard key={v._id} v={v} type="assigned" />
                ))}
              </div>
              {hasMoreAssigned && (
                <button
                  type="button"
                  onClick={() => setShowAllAssigned(!showAllAssigned)}
                  className="inline-flex items-center justify-center w-full min-h-[44px] py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  {showAllAssigned ? 'Réduire' : `Voir toutes mes missions (${assignedMissions.length})`}
                </button>
              )}
            </div>
          )}
        </section>

        {/* COMPLETED MISSIONS */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <span aria-hidden>✅</span> Missions terminées
          </h2>
          {completedMissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Aucune mission terminée.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {completedMissions.map((v) => (
                  <div key={v._id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                        <CheckCircleIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                          {v.family?.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {v.family?.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col sm:items-end justify-between items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex flex-wrap gap-1.5">
                        {v.types?.map((typeKey) => {
                          const style = TYPE_STYLES[typeKey] || TYPE_STYLES.Autre;
                          return (
                            <span
                              key={typeKey}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.text}`}
                            >
                              {style.emoji} {style.label}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        {formatRelativeDate(v.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default MyMissions;
