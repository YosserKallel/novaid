import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Globe, Package, Users, Target, Settings, Moon, Sun, LogOut } from 'lucide-react';

function AppNavbar({ activeRoute = 'dashboard', toggleTheme, isDark }) {
  const NAV_ITEMS = [
    { key: 'dashboard', to: '/dashboard', label: 'Tableau de bord', icon: null },
    { key: 'alerts', to: '/alerts', label: 'Alertes', icon: Bell },
    { key: 'map', to: '/map', label: 'Carte', icon: Globe },
    { key: 'inventory', to: '/inventory', label: 'Stocks', icon: Package },
    { key: 'users', to: '/users', label: 'Utilisateurs', icon: Users },
    { key: 'missions', to: '/missions', label: 'Mes Missions', icon: Target },
    { key: 'settings', to: '/settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-logo">
          <span className="navbar-logo-dot" />
          NOVAID
        </Link>

        <div className="navbar-links">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`navbar-link ${activeRoute === item.key ? 'active' : ''}`}
              >
                {Icon && <Icon size={16} />}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="navbar-right">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="lang-tabs">
            <button type="button" className="lang-tab active">FR</button>
            <button type="button" className="lang-tab">عر</button>
            <button type="button" className="lang-tab">EN</button>
          </div>

          <button type="button" className="btn btn-sm btn-outline gap-2">
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
