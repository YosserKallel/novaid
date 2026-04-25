import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import AddVisitModal from '../components/AddVisitModal';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Alerts() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);

  const urgentFamilies = [
    { _id: '1', name: 'Famille Mansouri', address: 'Quartier Nord, Bizerte', needs: ['Lait infantile', 'Médicaments'], alertType: 'urgent' }
  ];
  
  const forgottenFamilies = [
    { _id: '2', name: 'Famille Trabelsi', address: 'Centre-ville', lastVisitDate: '2023-11-05T10:00:00Z', alertType: 'forgotten' },
    { _id: '3', name: 'Famille Ben Ali', address: 'Banlieue Sud', lastVisitDate: null, alertType: 'forgotten' }
  ];

  const lowStockItems = [
    { _id: '101', name: 'Lait 1er âge', quantity: 2, minThreshold: 10, unit: 'boîtes' },
    { _id: '102', name: 'Couvertures d\'hiver', quantity: 0, minThreshold: 5, unit: 'unités' }
  ];

  const recentReports = [
    { _id: '201', familyName: 'Famille Jendoubi', volunteerName: 'Ahmed B.', date: new Date().toISOString(), notes: 'La famille a besoin de fournitures scolaires pour la rentrée prochaine.' },
    { _id: '202', familyName: 'Famille Gharbi', volunteerName: 'Sarra M.', date: new Date(Date.now() - 86400000).toISOString(), notes: 'Visite effectuée, colis alimentaire remis. Tout va bien.' }
  ];

  const mergedFamilies = [...urgentFamilies, ...forgottenFamilies];

  const handlePlanVisit = (f) => {
    setSelectedFamily(f);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <AppNavbar activeRoute="alerts" />
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-red-500 dark:border-red-400 border-t-transparent rounded-full" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GAUCHE : Familles Urgentes / Négligées */}
            <section className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    🚨 Familles Négligées / Urgentes
                    <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-sm font-medium bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-200">
                      {urgentFamilies.length}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">+</span>
                    <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-sm font-medium bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                      {forgottenFamilies.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Planifiez rapidement des visites pour ces familles.
                  </p>
                </div>
                <div className="p-4 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
                  {mergedFamilies.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm py-6 text-center">
                      Aucune famille négligée à signaler.
                    </p>
                  ) : (
                    mergedFamilies.map((f) => {
                      const isUrgent = f.alertType === 'urgent';
                      return (
                        <div
                          key={f._id}
                          className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg border transition-colors ${
                            isUrgent
                              ? 'border-red-200 dark:border-red-800 bg-red-50/40 dark:bg-red-900/20 hover:bg-red-50/60 dark:hover:bg-red-900/30'
                              : 'border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-900/20 hover:bg-amber-50/60 dark:hover:bg-amber-900/30'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">{f.name}</h3>
                              {isUrgent ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-200">
                                  🚨 Situation critique
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                                  ⚠️ Visite oubliée
                                </span>
                              )}
                            </div>
                            {f.address && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{f.address}</p>
                            )}
                            {!isUrgent && (
                              <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">
                                Dernière visite : {f.lastVisitDate ? formatDate(f.lastVisitDate) : "Jamais visitée"}
                              </p>
                            )}
                            {f.needs?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {f.needs.map((n) => (
                                  <span
                                    key={n}
                                    className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                                      isUrgent ? 'bg-red-200/60 dark:bg-red-900/40 text-red-900 dark:text-red-200' : 'bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200'
                                    }`}
                                  >
                                    {n}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              to={`/families/${f._id}`}
                              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600"
                            >
                              Voir Dossier
                            </Link>
                            <button
                              type="button"
                              onClick={() => handlePlanVisit(f)}
                              className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-3 text-sm font-semibold text-white rounded-lg shadow-sm ${
                                isUrgent
                                  ? 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                                  : 'bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600'
                              }`}
                            >
                              <span aria-hidden>📅</span> Planifier visite
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            {/* DROITE : Stocks et Rapports */}
            <div className="flex flex-col gap-6">
              
              {/* STOCKS */}
              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                  <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    📦 Ruptures de stock imminentes
                  </h2>
                </div>
                <div className="p-3 min-h-[8rem]">
                  {lowStockItems.length === 0 ? (
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium py-4 text-center">
                      ✅ Aucun problème de stock
                    </p>
                  ) : (
                    <ul className="space-y-1.5">
                      {lowStockItems.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm"
                        >
                          <span className="font-medium text-red-900 dark:text-red-200 truncate">{item.name}</span>
                          <span className="text-red-700 dark:text-red-300 shrink-0">
                            {item.quantity} / {item.minThreshold} {item.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* RAPPORTS */}
              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm overflow-hidden flex-1 min-h-0">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                  <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    🗣️ Derniers rapports de visites
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Visites récentes</p>
                </div>
                <div className="p-3 space-y-3 max-h-[18rem] overflow-y-auto">
                  {recentReports.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm py-4 text-center">
                      Aucun rapport récent.
                    </p>
                  ) : (
                    recentReports.map((r) => (
                      <div
                        key={r._id}
                        className="p-3 rounded-lg border border-slate-100 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50 text-sm"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                            {r.familyName}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                            Aujourd'hui
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{r.volunteerName}</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-3">
                          {r.notes || '—'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      <AddVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFamily={selectedFamily}
        onSuccess={() => {
          alert('Visite enregistrée avec succès (Mock)');
          setIsModalOpen(false);
          setSelectedFamily(null);
        }}
      />
    </div>
  );
}

export default Alerts;
