import React, { useState, useEffect } from 'react';

function toDatetimeLocal(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const TYPE_OPTIONS = [
  { id: 'Alimentaire', label: 'Alimentaire' },
  { id: 'Médical', label: 'Médical' },
  { id: 'Social', label: 'Social' },
  { id: 'Autre', label: 'Autre' },
];

function AddVisitModal({ isOpen, onClose, selectedFamily, onSuccess }) {
  const [dateTime, setDateTime] = useState(() => toDatetimeLocal(new Date()));
  const [status, setStatus] = useState('COMPLETED');
  const [types, setTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDateTime(toDatetimeLocal(new Date()));
      setStatus('COMPLETED');
      setTypes([]);
    }
  }, [isOpen]);

  if (!isOpen || !selectedFamily) return null;

  const toggleType = (typeId) => {
    setTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulation simple sans backend
    setTimeout(() => {
      setSubmitting(false);
      onSuccess?.();
    }, 800);
  };

  const statusOptions = [
    { id: 'COMPLETED', label: 'Visite Réalisée' },
    { id: 'PLANNED', label: 'Visite Planifiée' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center safe-area-modal">
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-600 max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        <div className="shrink-0 border-b border-slate-200 dark:border-slate-600 px-6 py-4 bg-white dark:bg-slate-800 rounded-t-xl">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Nouvelle visite
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 overscroll-contain">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date et Heure
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type d'aide</span>
              <div className="space-y-2">
                {TYPE_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 min-h-[44px] py-1">
                    <input
                      type="checkbox"
                      checked={types.includes(opt.id)}
                      onChange={() => toggleType(opt.id)}
                      className="min-h-[22px] min-w-[22px] rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          <div className="shrink-0 sticky bottom-0 border-t border-slate-200 dark:border-slate-600 px-6 py-4 bg-white dark:bg-slate-800 rounded-b-xl">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 min-h-[44px] px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
              >
                {submitting ? 'Validation...' : (status === 'COMPLETED' ? '📍 Valider position & Enregistrer' : 'Sauvegarder')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVisitModal;
