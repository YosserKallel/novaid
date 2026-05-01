import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, AlertTriangle, CheckCircle, Search, Edit2, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import AddFamilyModal from '../components/AddFamilyModal';
import AppNavbar from '../components/AppNavbar';

// --- ANIMATED COUNTER COMPONENT ---
function CountUpValue({ targetValue }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let currentValue = 0;
    const startTime = Date.now();
    const duration = 700; // 700ms animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentValue = Math.floor(progress * targetValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue]);

  return <span>{displayValue}</span>;
}

// --- MOCK DASHBOARD CHARTS WITH NEW DESIGN SYSTEM ---
const NEEDS_COLORS = ['#4f7fff', '#22c87a', '#f0a742', '#f04e4e', '#9b7ff4', '#2dd4bf'];

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
    <div className="grid-2 gap-6 mb-6">
      {/* DONUT CHART */}
      <div className="card">
        <h3 className="text-base font-medium text-primary mb-4">Répartition des Besoins</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={needsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {needsData.map((_, index) => (
                  <Cell key={index} fill={NEEDS_COLORS[index % NEEDS_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`${value} famille(s)`, 'Nombre']}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid rgba(79,127,255,0.3)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-legend mt-4">
          {needsData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: NEEDS_COLORS[idx % NEEDS_COLORS.length] }}
              />
              <span className="text-secondary">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BAR CHART */}
      <div className="card">
        <h3 className="text-base font-medium text-primary mb-4">Visites cette semaine</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,146,165,0.2)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "var(--text-muted)", fontSize: 12 }} 
                stroke="rgba(139,146,165,0.2)"
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fill: "var(--text-muted)", fontSize: 12 }} 
                stroke="rgba(139,146,165,0.2)"
              />
              <RechartsTooltip
                formatter={(value) => [value, 'Visites']}
                labelFormatter={(label) => `Jour : ${label}`}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid rgba(79,127,255,0.3)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Bar 
                dataKey="visites" 
                fill="#4f7fff" 
                radius={[4, 4, 0, 0]} 
                name="Visites"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- STATUS BADGE WITH NEW DESIGN ---
function StatusBadge({ status }) {
  const isUrgent = status === 'URGENT';
  const accentClass = isUrgent ? 'accent-red' : 'accent-green';
  
  return (
    <div className={`badge badge-${isUrgent ? 'urgent' : 'stable'}`}>
      <span className={`badge-dot ${isUrgent ? 'pulse' : ''}`} />
      {status}
    </div>
  );
}

// --- MOCK DATA ---
const initialFamilies = [
  { _id: '1', name: 'Famille Ben Salah', address: 'Sousse, Khzema', status: 'STABLE', needs: ['Alimentaire', 'Médical'] },
  { _id: '2', name: 'Famille Ayadi', address: 'Sfax, Menzel Chaker', status: 'URGENT', needs: ['Médical', 'Alimentaire'] },
  { _id: '3', name: 'Famille Belghith', address: 'Tunis, Mrezga', status: 'URGENT', needs: ['Médical', 'Scolaire'] },
];

function Dashboard({ toggleTheme, isDark }) {
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
    <div className="page-container">
      <AppNavbar activeRoute="dashboard" toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="page-main">
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="page-title">Tableau de Bord</h1>
            <p className="text-secondary">Aperçu des familles et statistiques</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="btn btn-primary"
          >
            + Ajouter une famille
          </button>
        </div>

        <AddFamilyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFamily}
          initialData={familyToEdit}
        />

        {/* STAT CARDS - 3 COLUMN GRID */}
        <div className="grid-3 gap-4 mb-8">
          {/* Total Families Card */}
          <div className="card card-accent-top accent-blue">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Users size={28} />
              </div>
              <div>
                <p className="stat-label">Total Familles</p>
                <p className="stat-value">
                  <CountUpValue targetValue={totalFamilies} />
                </p>
              </div>
            </div>
          </div>

          {/* Urgent Families Card */}
          <div className="card card-accent-top accent-red">
            <div className="stat-card">
              <div className="stat-icon red">
                <AlertTriangle size={28} />
              </div>
              <div>
                <p className="stat-label">Familles Urgentes</p>
                <p className="stat-value">
                  <CountUpValue targetValue={urgentFamilies} />
                </p>
              </div>
            </div>
          </div>

          {/* Completed Visits Card */}
          <div className="card card-accent-top accent-green">
            <div className="stat-card">
              <div className="stat-icon green">
                <CheckCircle size={28} />
              </div>
              <div>
                <p className="stat-label">Visites Réalisées</p>
                <p className="stat-value">
                  <CountUpValue targetValue={visitsCount} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <DashboardCharts />

        {/* SEARCH AND TABLE SECTION */}
        <div className="mb-6">
          <div className="table-wrapper">
            <div className="table-search">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une famille..."
                className="search-input"
              />
            </div>

            {/* RESPONSIVE TABLE */}
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Statut</th>
                    <th>Besoins</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFamilies.length > 0 ? (
                    filteredFamilies.map((family) => (
                      <tr key={family._id}>
                        <td>
                          <Link to={`/family/${family._id}`} className="link-primary">
                            {family.name}
                          </Link>
                        </td>
                        <td>{family.address || '-'}</td>
                        <td>
                          <StatusBadge status={family.status} />
                        </td>
                        <td>
                          <div className="flex gap-1 flex-wrap">
                            {family.needs?.length > 0 ? (
                              family.needs.map((need, idx) => (
                                <span key={idx} className="need-pill need-pill-default">
                                  {need}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleOpenEdit(family)}
                              className="action-button edit"
                              title="Éditer"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteFamily(family._id)}
                              className="action-button delete"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-muted">
                        Aucune famille trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
