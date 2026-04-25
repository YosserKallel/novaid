import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <PreferencesProvider>
      <div className="dark bg-slate-900 text-slate-100 min-h-screen">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/missions" element={<MyMissions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/visits/:id/checkin" element={<VisitCheckin />} />
          <Route path="/families/:id" element={<FamilyDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
    </PreferencesProvider>
  );
}

export default App;
