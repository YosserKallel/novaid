import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PreferencesProvider } from './context/PreferencesContext';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Alerts from './pages/Alerts';
import MyMissions from './pages/MyMissions';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import VisitCheckin from './pages/VisitCheckin';
import Map from './pages/Map';
import Login from './pages/Login';
import FamilyDetails from './pages/FamilyDetails';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <PreferencesProvider>
      <div className="page-container">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/users" element={<Users toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/alerts" element={<Alerts toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/missions" element={<MyMissions toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/inventory" element={<Inventory toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/map" element={<Map toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/login" element={<Login toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/settings" element={<Settings toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/visits/:id/checkin" element={<VisitCheckin toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/families/:id" element={<FamilyDetails toggleTheme={toggleTheme} isDark={isDark} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </PreferencesProvider>
  );
}

export default App;
