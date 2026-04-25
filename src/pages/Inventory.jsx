import React, { useState } from 'react';
import AppNavbar from '../components/AppNavbar';

const CATEGORY_ICONS = {
  Alimentaire: '🍎',
  Médical: '💊',
  Vêtements: '👕',
  Hygiène: '🧴',
  Scolaire: '📚',
  Autre: '📦',
};

function ItemCard({ item, onAdd, onRemove, onDelete }) {
  const qty = item.quantity ?? 0;
  const threshold = item.minThreshold ?? 10;
  const isLow = qty < threshold;
  const maxForBar = Math.max(threshold, qty, 1);
  const percent = Math.min(100, (qty / maxForBar) * 100);

  const icon = CATEGORY_ICONS[item.category] || '📦';

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${
        isLow 
          ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20' 
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0" aria-hidden="true">
            {icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 truncate">{item.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.category} · {item.unit}</p>
          </div>
        </div>
        <span
          className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            isLow 
              ? 'bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-200' 
              : 'bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-200'
          }`}
        >
          {isLow ? `⚠️ Rupture` : 'En stock'}
        </span>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-sm mb-1.5 font-medium">
          <span className="text-slate-700 dark:text-slate-300">
            {qty} {item.unit}
          </span>
          <span className="text-slate-500 dark:text-slate-500">Seuil: {threshold}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLow ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={qty <= 0}
            className="min-w-[40px] min-h-[40px] rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Retirer"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => onAdd(item.id)}
            className="min-w-[40px] min-h-[40px] rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 flex items-center justify-center text-lg font-bold transition-colors"
            title="Ajouter"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

function Inventory() {
  const [items, setItems] = useState([
    { id: '1', name: 'Lait infantile', category: 'Alimentaire', quantity: 5, unit: 'boîtes', minThreshold: 10 },
    { id: '2', name: 'Doliprane 1000', category: 'Médical', quantity: 45, unit: 'boîtes', minThreshold: 20 },
    { id: '3', name: 'Couvertures', category: 'Autre', quantity: 2, unit: 'pièces', minThreshold: 5 },
    { id: '4', name: 'Cahiers scolaires', category: 'Scolaire', quantity: 120, unit: 'pièces', minThreshold: 50 },
    { id: '5', name: 'Pâtes', category: 'Alimentaire', quantity: 25, unit: 'kg', minThreshold: 30 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Alimentaire',
    quantity: 1,
    unit: 'pièces',
    minThreshold: 5,
  });

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    const itemToAdd = {
      ...newItem,
      id: Date.now().toString(),
      quantity: Number(newItem.quantity),
      minThreshold: Number(newItem.minThreshold),
    };
    setItems((prev) => [...prev, itemToAdd]);
    setModalOpen(false);
    setNewItem({
      name: '',
      category: 'Alimentaire',
      quantity: 1,
      unit: 'pièces',
      minThreshold: 5,
    });
  };

  const handleAdd = (id) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.map((i) => i.id === id && i.quantity > 0 ? { ...i, quantity: i.quantity - 1 } : i));
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <AppNavbar activeRoute="inventory" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span aria-hidden>📦</span> Gestion des Stocks
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Gérez les stocks de votre association (dons, achats, provisions).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <span aria-hidden>➕</span> Ajouter un article
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">Aucun article dans l'inventaire.</p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Ajouter votre premier article
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden p-6 z-10 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-slate-100">Nouvel article</h2>
            
            <form onSubmit={handleAddNewItem} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Nom de l'article</label>
                <input required type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="ex: Eau minérale" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Catégorie</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    {Object.keys(CATEGORY_ICONS).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Unité</label>
                  <input required type="text" value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="ex: bouteilles" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Quantité Initiale</label>
                  <input required type="number" min="0" value={newItem.quantity} onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Seuil d'alerte</label>
                  <input required type="number" min="1" value={newItem.minThreshold} onChange={(e) => setNewItem({...newItem, minThreshold: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 font-medium dark:text-white" 
                  onClick={() => setModalOpen(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700" 
                >
                  Ajouter l'article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
