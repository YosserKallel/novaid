import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddFamilyModal from '../components/AddFamilyModal';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// --- ICONS EXACTEMENT IDENTIQUES ---
const IconUsers = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const IconAlert = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const IconVisits = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const IconSearch = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const IconPencil = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
import AppNavbar from '../components/AppNavbar';

// --- MOCK DASHBOARD CHARTS EXACTEMENT IDENTIQUE ---
const NEEDS_COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4'];
function buildNeedsData() {
  return [
    { name: 'Alimentaire', value: 4 },
    { name: 'Médical', value: 2 },
    { name: 'Vêtements', value: 2 },
    { name: 'Social', value: 2 }
  ];
}
function buildLast7DaysData() {
  return [
    { date: '12/04', visites: 1 },
    { date: '13/04', visites: 0 },
    { date: '14/04', visites: 3 },
    { date: '15/04', visites: 2 },
    { date: '16/04', visites: 5 },
    { date: '17/04', visites: 0 },
    { date: '18/04', visites: 1 },
  ];
}

function DashboardCharts() {
  const needsData = buildNeedsData();
  const weekData = buildLast7DaysData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* CARD PIE CHART */}
      <div className="bg-white dark:bg-white rounded-xl shadow-sm border border-slate-200 dark:border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Répartition des Besoins</h3>
        <div className="h-[280px] min-h-[200px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={needsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {needsData.map((_, index) => (
                  <Cell key={index} fill={NEEDS_COLORS[index % NEEDS_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => [`${value} famille(s)`, 'Nombre']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CARD BAR CHART */}
      <div className="bg-white dark:bg-white rounded-xl shadow-sm border border-slate-200 dark:border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Visites cette semaine</h3>
        <div className="h-[280px] min-h-[200px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} stroke="#64748b" />
              <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} stroke="#64748b" />
              <RechartsTooltip
                formatter={(value) => [value, 'Visites']}
                labelFormatter={(label) => `Jour : ${label}`}
              />
              <Bar dataKey="visites" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Visites" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- MOCK BADE STATUS ---
function StatusBadge({ status }) {
  const isUrgent = status === 'URGENT';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isUrgent ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
      }`}
    >
      {status}
    </span>
  );
}

// --- DONNÉES FACTICES ---
const initialFamilies = [
  { _id: '1', name: 'Famille Dupont', address: '12 Rue de Paris', status: 'STABLE', needs: ['Nourriture'] },
  { _id: '2', name: 'Famille Martin', address: '8 Avenue des Champs', status: 'URGENT', needs: ['Médicaments', 'Vêtements'] },
  { _id: '3', name: 'Famille Bernard', address: '45 Boulevard Mignon', status: 'STABLE', needs: [] },
];

function Dashboard() {
  const [families, setFamilies] = useState(initialFamilies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [familyToEdit, setFamilyToEdit] = useState(null);
  
  const totalFamilies = families.length; 
  const urgentFamilies = families.filter(f => f.status === 'URGENT').length;
  const visitsCount = 5;

  const handleOpenAdd = () => {
    setFamilyToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (family) => {
    setFamilyToEdit(family);
    setIsModalOpen(true);
  };

  const handleDeleteFamily = (familyId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette famille ?")) {
      setFamilies(prev => prev.filter(f => f._id !== familyId));
    }
  };

  const handleSaveFamily = (familyData) => {
    setFamilies(prev => {
      const exists = prev.find(f => f._id === familyData._id);
      if (exists) {
        return prev.map(f => f._id === familyData._id ? familyData : f);
      }
      return [...prev, familyData];
    });
  };

  const filteredFamilies = families.filter((f) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const name = (f.name || '').toLowerCase();
    const address = (f.address || '').toLowerCase();
    return name.includes(q) || address.includes(q);
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100">
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Familles bénéficiaires</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-3 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 shrink-0"
            >
              Ajouter une famille
            </button>
          </div>
        </div>

        <AddFamilyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFamily}
          initialData={familyToEdit}
        />

        {/* 3 STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 p-4 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <IconUsers />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Familles</p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{totalFamilies}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 p-4 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
              <IconAlert />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Familles Urgentes</p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{urgentFamilies}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 p-4 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <IconVisits />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Visites Réalisées</p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{visitsCount}</p>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <DashboardCharts />

        {/* SEARCH BAR */}
        <div className="mb-4">
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une famille..."
              className="w-full min-h-[44px] pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* FAMILIES TABLE */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-600">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Adresse</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Besoins</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                {filteredFamilies.map((family) => (
                  <tr key={family._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-h-[44px] inline-flex items-center">
                        {family.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{family.address || '-'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={family.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {family.needs?.length > 0 ? family.needs.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleOpenEdit(family)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                        >
                          <IconPencil />
                        </button>
                        <button 
                          onClick={() => handleDeleteFamily(family._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
