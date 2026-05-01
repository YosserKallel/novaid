import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppNavbar from '../components/AppNavbar';

const ROLES = [
  { value: 'VOLUNTEER', label: 'Bénévole' },
  { value: 'COORDINATOR', label: 'Coordinateur' },
  { value: 'ADMIN', label: 'Administrateur' },
];

function Users({ toggleTheme, isDark }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('VOLUNTEER');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    
    // Simuler un appel réseau
    setTimeout(() => {
      setMessage('Utilisateur créé avec succès');
      setName('');
      setEmail('');
      setPassword('');
      setRole('VOLUNTEER');
      setLoading(false);
    }, 1000);
  };

  const isError = message && message !== 'Utilisateur créé avec succès';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <AppNavbar activeRoute="users" toggleTheme={toggleTheme} isDark={isDark} />
      <main className="max-w-md mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">Créer un utilisateur</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom complet</label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adresse email</label>
              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="user-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <input
                id="user-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="user-role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rôle</label>
              <select
                id="user-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full min-h-[44px] px-3 py-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
          {message && (
            <p className={`mt-4 text-sm ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full min-h-[44px] py-3 px-4 font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'Créer l\'utilisateur'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Users;
