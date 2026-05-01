import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

const TYPE_STYLES = {
  Alimentaire: { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-800 dark:text-pink-300', label: 'Alimentaire', emoji: '🍎' },
  Médical: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-800 dark:text-blue-300', label: 'Médical', emoji: '💊' },
  Social: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-800 dark:text-amber-300', label: 'Social', emoji: '🤝' },
  Autre: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-700 dark:text-slate-300', label: 'Autre', emoji: '📦' },
};

// User's location (lives in Tunis)
const USER_LOCATION = { lat: 36.8065, lng: 10.1815 };

// Families from Map - same data
const FAMILIES_DATA = [
  { _id: '1', name: 'Famille Ben Salah', address: 'Sousse, Khzema', status: 'OK', coordinates: { lat: 35.8245, lng: 10.6369 } },
  { _id: '2', name: 'Famille Ayadi', address: 'Sfax, Menzel Chaker', status: 'URGENT', coordinates: { lat: 34.7406, lng: 10.7603 } },
  { _id: '3', name: 'Famille Belghith', address: 'Tunis, Mrezga', status: 'URGENT', coordinates: { lat: 36.8065, lng: 10.1815 } }
];

// Calculate distance between coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth radius in km
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // km
};

const MAX_DISTANCE_KM = 50; // Max distance for nearby missions

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

function MyMissions({ toggleTheme, isDark }) {
  const [showAllAssigned, setShowAllAssigned] = useState(false);

  // MOCK DATA - Missions based on families from map
  const familiesWithDistance = FAMILIES_DATA.map(family => ({
    ...family,
    distance: calculateDistance(USER_LOCATION.lat, USER_LOCATION.lng, family.coordinates.lat, family.coordinates.lng)
  }));

  const nearbyFamilies = familiesWithDistance.filter(f => f.distance <= MAX_DISTANCE_KM);
  const farFamilies = familiesWithDistance.filter(f => f.distance > MAX_DISTANCE_KM);

  // Open missions (far families - showing as available but with warning)
  const openMissions = farFamilies.map((family, idx) => ({
    _id: family._id,
    family: { name: family.name, address: family.address },
    date: new Date(Date.now() + 86400000 * (idx + 1)).toISOString(),
    types: family.status === 'OK' ? ['Alimentaire'] : ['Médical'],
    distance: family.distance,
    isFar: true
  }));

  // Assigned missions (nearby families)
  const assignedMissions = nearbyFamilies.map((family, idx) => ({
    _id: family._id,
    family: { name: family.name, address: family.address },
    date: new Date(Date.now() + 3600000 + (idx * 86400000)).toISOString(),
    types: family.status === 'OK' ? ['Alimentaire', 'Suivi'] : ['Médical', 'Urgence'],
    distance: family.distance,
    isFar: false
  }));

  // Completed missions
  const completedMissions = [
    {
      _id: '1',
      family: { name: 'Famille Ben Salah', address: 'Sousse' },
      date: new Date(Date.now() - 172800000).toISOString(),
      types: ['Social', 'Médical']
    }
  ];

  const ASSIGNED_DISPLAY_LIMIT = nearbyFamilies.length;
  const assignedDisplayed = showAllAssigned
    ? assignedMissions
    : assignedMissions.slice(0, ASSIGNED_DISPLAY_LIMIT);
  const hasMoreAssigned = assignedMissions.length > ASSIGNED_DISPLAY_LIMIT;

  const MissionCard = ({ v, type }) => (
    <div className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow ${
      v.isFar 
        ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'
    }`}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
          Visite prévue — {v.family?.name}
        </h3>
        {v.isFar ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300">
            Loin de vous
          </span>
        ) : type === 'assigned' ? (
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
        {v.distance && (
          <>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span aria-hidden>📏</span> <strong>{v.distance} km</strong>
          </>
        )}
      </p>

      {v.isFar && (
        <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            ⚠️ Cette mission est trop loin de vous ({v.distance} km &gt; {MAX_DISTANCE_KM} km). Vous pouvez la prendre, mais cherchez d'abord les missions proches.
          </p>
        </div>
      )}

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
        
        {/* NEARBY MISSIONS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span aria-hidden>🟢</span> Missions près de vous
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Familles à proximité (moins de {MAX_DISTANCE_KM} km) - Priorité recommandée.
            </p>
          </div>
          {assignedMissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Aucune mission proche pour le moment.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {assignedDisplayed.map((v) => (
                <MissionCard key={v._id} v={v} type="nearby" />
              ))}
            </div>
          )}
        </section>

        {/* FAR MISSIONS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span aria-hidden>🟠</span> Autres missions disponibles
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Familles éloignées (plus de {MAX_DISTANCE_KM} km) - Explorez après les missions proches.
            </p>
          </div>
          {openMissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Aucune autre mission disponible.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {openMissions.map((v) => (
                <MissionCard key={v._id} v={v} type="open" />
              ))}
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
                  <Link key={v._id} to={`/families/${v._id}`} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
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
                  </Link>
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
