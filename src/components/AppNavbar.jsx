import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Globe, Package, Users, Target, Settings, LogOut, Menu, X } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

function AppNavbar({ activeRoute = 'dashboard', toggleTheme, isDark }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = usePreferences();

  const NAV_ITEMS = [
    { key: 'dashboard', to: '/dashboard', label: t('nav.dashboard'), icon: null },
    { key: 'families', to: '/families', label: t('nav.families'), icon: Users },
    { key: 'alerts', to: '/alerts', label: t('nav.alerts'), icon: Bell },
    { key: 'map', to: '/map', label: t('nav.map'), icon: Globe },
    { key: 'inventory', to: '/inventory', label: t('nav.inventory'), icon: Package },
    { key: 'users', to: '/users', label: t('nav.users'), icon: Users },
    { key: 'missions', to: '/missions', label: t('nav.missions'), icon: Target },
    { key: 'settings', to: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="navbar-logo-dot" />
            NOVAID
          </Link>

          {/* Desktop Links */}
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
            <Link to="/" className="btn btn-sm btn-outline gap-2 hidden sm:flex">
              <LogOut size={14} />
              {t('nav.logout')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="navbar-logo-dot" />
              NOVAID
            </Link>
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          
          <div className="mobile-menu-links">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`mobile-menu-link ${activeRoute === item.key ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {Icon && <Icon size={20} />}
                  {item.label}
                </Link>
              );
            })}
            
            <div className="mt-auto pt-6 border-t border-slate-200/20 dark:border-slate-700/50">
              <Link 
                to="/" 
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut size={20} />
                {t('nav.logout')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppNavbar;
