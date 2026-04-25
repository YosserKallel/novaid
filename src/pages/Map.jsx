import 'leaflet/dist/leaflet.css';
import '../utils/leaflet-heat-init.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HeatmapLayer from '../components/maps/HeatmapLayer.jsx';
import UserLocationMarker from '../components/maps/UserLocationMarker.jsx';
import AppNavbar from '../components/AppNavbar.jsx';

// Fix Leaflet icons issue when using bundlers like Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TUNISIA_CENTER = [34.0, 9.0];
const DEFAULT_ZOOM = 5;

// Mock families data specifically matching the 3 points in the screenshot
const families = [
  { _id: '1', name: 'Famille A', status: 'URGENT', coordinates: { lat: 36.8065, lng: 10.1815 } },
  { _id: '2', name: 'Famille B', status: 'OK', coordinates: { lat: 35.6, lng: 9.8 } },
  { _id: '3', name: 'Famille C', status: 'URGENT', coordinates: { lat: 34.8, lng: 10.2 } }
];

function StatusBadge({ status }) {
  const isUrgent = status === 'URGENT';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        isUrgent ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
      }`}
    >
      {status}
    </span>
  );
}

function Map() {
  const [showHeatmap, setShowHeatmap] = useState(true);

  const count = families.length;
  const familiesLabel = count === 1 ? '1 famille géolocalisée' : `${count} familles géolocalisées`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <AppNavbar activeRoute="map" />
      
      <div className="px-4 py-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-600 flex justify-end">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {familiesLabel}
        </span>
      </div>
      
      <div className="relative w-full shrink-0 flex-1" style={{ minHeight: 400 }}>
        <button
          type="button"
          onClick={() => setShowHeatmap((v) => !v)}
          className="absolute top-2 right-2 z-[1000] inline-flex items-center gap-2 min-h-[44px] rounded-lg bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition"
        >
          <span aria-hidden>🔥</span> {showHeatmap ? 'Masquer la heatmap' : 'Afficher la heatmap'}
        </button>
        
        <MapContainer
          center={TUNISIA_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showHeatmap && <HeatmapLayer families={families} />}
          <UserLocationMarker />
          
          {families.map((family) => (
            <Marker
              key={family._id}
              position={[family.coordinates.lat, family.coordinates.lng]}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{family.name}</p>
                  <div className="mb-2">
                    <StatusBadge status={family.status} />
                  </div>
                  <Link
                    to={`/families/${family._id}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center mt-2"
                  >
                    Voir le dossier →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
