import React, { useState } from 'react';
import { Package, Plus, Minus, Trash2, X } from 'lucide-react';
import AppNavbar from '../components/AppNavbar';

function ItemCard({ item, onAdd, onRemove, onDelete }) {
  const qty = item.quantity ?? 0;
  const threshold = item.minThreshold ?? 10;
  const isLow = qty < threshold;
  const maxForBar = Math.max(threshold, qty, 1);
  const percent = Math.min(100, (qty / maxForBar) * 100);

  const accentClass = isLow ? 'accent-red' : 'accent-green';
  const statusBadge = isLow ? 'urgent' : 'stable';

  return (
    <div className={`card card-accent-top ${accentClass}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-primary mb-1">{item.name}</h3>
          <p className="text-xs text-secondary">{item.category} • {item.unit}</p>
        </div>
        <span className={`badge badge-${statusBadge} shrink-0`}>
          <span className={`badge-dot ${isLow ? 'pulse' : ''}`} />
          {isLow ? 'Bas' : 'OK'}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="font-medium text-primary">{qty} {item.unit}</span>
          <span className="text-muted">Seuil: {threshold}</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${isLow ? 'red' : 'green'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-muted/20">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={qty <= 0}
            className="control-btn control-btn-minus"
            title="Retirer"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={() => onAdd(item.id)}
            className="control-btn control-btn-plus"
            title="Ajouter"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

function Inventory({ toggleTheme, isDark }) {
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
    <div className="page-container">
      <AppNavbar activeRoute="inventory" toggleTheme={toggleTheme} isDark={isDark} />

      <main className="page-main">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <Package size={32} style={{ color: 'var(--color-blue)' }} />
              Gestion des Stocks
            </h1>
            <p className="text-secondary">Gérez les stocks de votre association</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
          >
            + Ajouter un article
          </button>
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-muted" style={{ color: 'var(--text-muted)' }} />
            <p className="text-secondary mb-4">Aucun article dans l'inventaire.</p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="link-primary font-medium"
            >
              Ajouter votre premier article
            </button>
          </div>
        ) : (
          <div className="grid-3 gap-4">
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md card z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Nouvel Article</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-elevated rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Nom de l'article</label>
                <input 
                  required 
                  type="text" 
                  value={newItem.name} 
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})} 
                  className="input-field"
                  placeholder="ex: Eau minérale" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Catégorie</label>
                  <select 
                    value={newItem.category} 
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})} 
                    className="input-field"
                  >
                    <option value="Alimentaire">Alimentaire</option>
                    <option value="Médical">Médical</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Hygiène">Hygiène</option>
                    <option value="Scolaire">Scolaire</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Unité</label>
                  <input 
                    required 
                    type="text" 
                    value={newItem.unit} 
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})} 
                    className="input-field"
                    placeholder="ex: boîtes" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Quantité</label>
                  <input 
                    required 
                    type="number" 
                    min="0" 
                    value={newItem.quantity} 
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} 
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Seuil d'alerte</label>
                  <input 
                    required 
                    type="number" 
                    min="1" 
                    value={newItem.minThreshold} 
                    onChange={(e) => setNewItem({...newItem, minThreshold: e.target.value})} 
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  Ajouter
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
