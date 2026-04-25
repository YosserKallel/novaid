import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

const ALLOWED_RADIUS_METERS = 100;

const STEP = {
  LOADING_VISIT: 'loading_visit',
  GETTING_POSITION: 'getting_position',
  POSITION_FOUND: 'position_found',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
};

function VisitCheckin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(STEP.LOADING_VISIT);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);
  const [distanceMeters, setDistanceMeters] = useState(null);
  const [proofPhoto, setProofPhoto] = useState('');

  // Mock Visit Data
  const targetLat = 36.8065;
  const targetLng = 10.1815;

  useEffect(() => {
    // 1. Simuler le chargement de la visite
    const timer = setTimeout(() => {
      setStep(STEP.GETTING_POSITION);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (step !== STEP.GETTING_POSITION) return;

    // 2. Simuler la recherche GPS (Mock location to be slightly off)
    const timer2 = setTimeout(() => {
      const mockPos = { lat: 36.8068, lng: 10.1818, accuracy: 15 };
      setPosition(mockPos);
      
      // Calculate fake distance (approx)
      const dist = 45; // m
      setDistanceMeters(dist);

      setStep(STEP.POSITION_FOUND);
    }, 1500);
    return () => clearTimeout(timer2);
  }, [step]);

  const handleProofPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock photo display
      setProofPhoto(URL.createObjectURL(file));
    }
  };

  const handleValidate = () => {
    setStep(STEP.SUBMITTING);
    setTimeout(() => {
      setStep(STEP.SUCCESS);
      setTimeout(() => navigate('/missions', { replace: true }), 2000);
    }, 1500);
  };

  const distance = distanceMeters;
  const withinRadius = distance != null && distance <= ALLOWED_RADIUS_METERS;
  const canValidate = withinRadius;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <AppNavbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 max-w-md w-full relative overflow-hidden">
          
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Check-in Visite</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Validez votre présence chez la famille ciblée.
          </p>

          {step === STEP.LOADING_VISIT && (
            <div className="text-center py-6">
              <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
              <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">Chargement du dossier...</p>
            </div>
          )}

          {step === STEP.GETTING_POSITION && (
            <div className="text-center py-6">
              <div className="animate-pulse flex justify-center items-center gap-2 mb-4 text-amber-500">
                <span className="text-3xl">📍</span>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">Recherche du signal GPS...</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden position-relative">
                 <div className="bg-blue-600 h-2 rounded-full absolute top-0 left-0 animate-[ping_2s_ease-in-out_infinite]" style={{width: '20%'}}></div>
              </div>
            </div>
          )}

          {step === STEP.POSITION_FOUND && position && (
            <div className="animate-fade-in text-left">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-mono space-y-2.5 text-slate-700 dark:text-slate-300 mb-6">
                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                  <span className="text-slate-500 dark:text-slate-400">📍 Cible</span> 
                  <span>[{targetLat.toFixed(4)}, {targetLng.toFixed(4)}]</span>
                </p>
                <p className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-600">
                  <span className="text-slate-500 dark:text-slate-400">🚶 Ma position</span> 
                  <span>[{position.lat.toFixed(4)}, {position.lng.toFixed(4)}]</span>
                </p>
                <p className="flex justify-between font-medium">
                  <span className="text-slate-500 dark:text-slate-400">📏 Distance</span> 
                  <span className={withinRadius ? "text-green-600 dark:text-green-400" : "text-red-500"}>{distanceMeters} m</span>
                </p>
              </div>

              {withinRadius ? (
                <div className="mb-6 p-4 flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/60 rounded-xl">
                  <span aria-hidden className="text-xl">✅</span>
                  <p className="text-sm text-green-800 dark:text-green-200 font-medium">Excellente position. Presque sur place.</p>
                </div>
              ) : (
                <div className="mb-6 p-4 flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl">
                  <span aria-hidden className="text-xl">⛔</span>
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">Vous êtes trop éloigné ({distanceMeters} m &gt; {ALLOWED_RADIUS_METERS} m).</p>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Photo (optionnel)
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Prenez une photo en guise de preuve.
                </p>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 transition cursor-pointer group">
                  {proofPhoto ? (
                    <img src={proofPhoto} alt="Aperçu" className="max-h-32 rounded shadow-sm" />
                  ) : (
                    <>
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Ajouter une photo</span>
                    </>
                  )}
                  <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleProofPhotoChange} />
                </label>
              </div>

              <button
                type="button"
                onClick={handleValidate}
                disabled={!canValidate}
                className={`w-full min-h-[48px] py-3.5 px-4 font-semibold text-sm rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 ${
                  canValidate
                    ? 'text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 hover:-translate-y-0.5'
                    : 'text-slate-400 bg-slate-200 dark:bg-slate-700 cursor-not-allowed opacity-70'
                }`}
              >
                Valider la visite
              </button>
            </div>
          )}

          {step === STEP.SUBMITTING && (
            <div className="text-center py-8 animate-fade-in">
              <div className="animate-spin inline-block w-10 h-10 border-[4px] border-current border-t-transparent text-blue-600 rounded-full" role="status"></div>
              <p className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-300">Enregistrement...</p>
            </div>
          )}

          {step === STEP.SUCCESS && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Visite validée !</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Redirection vers les missions...</p>
            </div>
          )}

          <Link
            to="/missions"
            className="mt-6 block text-center min-h-[44px] flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            Retourner aux missions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VisitCheckin;
