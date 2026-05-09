import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar.jsx';
import AddVisitModal from '../components/AddVisitModal.jsx';
import { generateImpactStory } from '../utils/storyGenerator.js';
import { usePreferences } from '../context/PreferencesContext';

function StatusBadge({ status, t }) {
  const isUrgent = status === 'URGENT';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isUrgent ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
      }`}
    >
      {isUrgent ? t('status.urgent') : t('status.ok')}
    </span>
  );
}

function formatDate(dateStr, locale) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function FamilyDetails({ toggleTheme, isDark }) {
  const { t, locale } = usePreferences();
  const { id } = useParams();
  
  // MOCK DATA - Different families based on ID
  const familiesData = {
    '1': {
      _id: '1',
      name: 'Famille Ben Salah',
      address: 'Sousse, Khzema',
      phone: '+216 22 334 455',
      status: 'OK',
      needs: ['Alimentaire', 'Médical'],
      membersCount: 5,
      familyHistory: 'Situation stabilisée, famille visitée régulièrement',
      needsDetails: {
        medications: ['Insuline', 'Paracetamol'],
        clothing: []
      }
    },
    '2': {
      _id: '2',
      name: 'Famille Ayadi',
      address: 'Sfax, Menzel Chaker',
      phone: '+216 98 765 432',
      status: 'URGENT',
      needs: ['Alimentaire', 'Logement'],
      membersCount: 7,
      familyHistory: 'Situation précaire, besoin urgent de soutien',
      needsDetails: {
        medications: [],
        clothing: ['Vêtements d\'hiver']
      }
    },
    '3': {
      _id: '3',
      name: 'Famille Belghith',
      address: 'Tunis, Mrezga',
      phone: '+216 55 123 789',
      status: 'URGENT',
      needs: ['Médical', 'Scolaire'],
      membersCount: 4,
      familyHistory: 'Enfants scolarisés, mère malade, père au chômage',
      needsDetails: {
        medications: ['Antibiotiques'],
        clothing: []
      }
    }
  };
  
  const mockFamily = familiesData[id] || familiesData['1'];

  // Determine visit status based on family status
  const isUrgent = mockFamily.status === 'URGENT';
  
  const [visits, setVisits] = useState(
    isUrgent
      ? [
          {
            _id: 'v1',
            date: new Date('2026-04-21T10:00:00Z').toISOString(),
            status: 'COMPLETED',
            volunteer: { name: 'Fatima Ben Mahmoud' },
            types: ['Évaluation', 'Alimentaire'],
            proofPhoto: null,
            notes: 'Visite d\'évaluation et première aide d\'urgence',
            checkInLocation: true
          },
          {
            _id: 'v2',
            date: new Date('2026-05-05T14:30:00Z').toISOString(),
            status: 'PLANNED',
            volunteer: null,
            types: ['Médical', 'Suivi'],
            proofPhoto: null,
            notes: 'Visite de suivi médical prévue',
            checkInLocation: false
          }
        ]
      : [
          {
            _id: 'v1',
            date: new Date('2026-04-21T02:24:00Z').toISOString(),
            status: 'COMPLETED',
            volunteer: { name: 'Ahmed Ben Salah' },
            types: ['Médical'],
            proofPhoto: null,
            notes: '',
            checkInLocation: true
          },
          {
            _id: 'v2',
            date: new Date('2026-03-15T14:30:00Z').toISOString(),
            status: 'COMPLETED',
            volunteer: { name: 'Leila Hakim' },
            types: ['Alimentaire'],
            proofPhoto: null,
            notes: 'Colis alimentaire mensuel déposé.',
            checkInLocation: true
          }
        ]
  );

  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [validatingId, setValidatingId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleValidatePresence = async (visit) => {
    if (!window.confirm(t('familyDetails.confirmPresence'))) return;
    
    setValidatingId(visit._id);
    
    // Simulate validation
    setTimeout(() => {
      setVisits(prev => 
        prev.map(v => v._id === visit._id ? { ...v, status: 'COMPLETED', proofPhoto: 'https://via.placeholder.com/300x200?text=Preuve' } : v)
      );
      setValidatingId(null);
      alert(t('familyDetails.visitValidated'));
    }, 1500);
  };

  const generateImpactReport = () => {
    // Generate comprehensive report content
    const reportContent = `
${t('familyDetails.reportTitle')}
${'='.repeat(80)}

${t('familyDetails.reportGeneral')}
${'─'.repeat(80)}
${t('familyDetails.reportFieldName')}: ${mockFamily.name}
${t('familyDetails.reportFieldAddress')}: ${mockFamily.address}
${t('familyDetails.reportFieldPhone')}: ${mockFamily.phone}
${t('familyDetails.reportFieldStatus')}: ${mockFamily.status}
${t('familyDetails.reportFieldMembers')}: ${mockFamily.membersCount}

${t('familyDetails.reportNeeds')}
${'─'.repeat(80)}
${mockFamily.needs.join('\n')}

${t('familyDetails.reportHistory')}
${'─'.repeat(80)}
${mockFamily.familyHistory}

${t('familyDetails.reportNeedsDetails')}
${'─'.repeat(80)}
${t('familyDetails.reportFieldMeds')}: ${mockFamily.needsDetails.medications.length > 0 ? mockFamily.needsDetails.medications.join(', ') : t('familyDetails.reportNone')}
${t('familyDetails.reportFieldClothes')}: ${mockFamily.needsDetails.clothing.length > 0 ? mockFamily.needsDetails.clothing.join(', ') : t('familyDetails.reportNone')}

${t('familyDetails.reportImpact')}
${'─'.repeat(80)}
${generateImpactStory(mockFamily, visits)}

${t('familyDetails.reportVisits')}
${'─'.repeat(80)}
${[...visits].sort((a, b) => new Date(b.date) - new Date(a.date)).map((visit, idx) => {
  const isPlanned = visit.status === 'PLANNED' || (visit.status !== 'COMPLETED' && new Date(visit.date) > new Date());
  const statusText = isPlanned ? t('familyDetails.planned') : t('familyDetails.completed');
  const dateStr = formatDate(visit.date, locale);
  const volunteerText = visit.volunteer?.name ? `\n${t('familyDetails.reportVolunteer')}: ${visit.volunteer.name}` : '';
  const typesText = visit.types?.length > 0 ? `\n${t('familyDetails.reportTypes')}: ${visit.types.join(', ')}` : '';
  const notesText = visit.notes ? `\n${t('familyDetails.reportNotes')}: ${visit.notes}` : '';
  const gpsText = visit.checkInLocation ? `\n📍 ${t('familyDetails.reportGps')}` : '';

  return `
${t('familyDetails.reportVisit', { index: idx + 1 })}:
─────────────
${t('familyDetails.reportDate')}: ${dateStr}
${t('familyDetails.reportStatus')}: ${statusText}${volunteerText}${typesText}${gpsText}${notesText}`;
}).join('\n')}

${t('familyDetails.reportGenerated', { date: new Date().toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}) })}

${'='.repeat(80)}
${t('familyDetails.reportFooter')}
`;

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Rapport_${mockFamily.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <AppNavbar toggleTheme={toggleTheme} isDark={isDark} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* En-tête famille */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-6 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{mockFamily.name}</h1>
            <StatusBadge status={mockFamily.status} t={t} />
          </div>
          <dl className="space-y-2 text-sm">
            {mockFamily.address && (
              <div>
                <dt className="text-slate-500 dark:text-slate-400">{t('familyDetails.address')}</dt>
                <dd className="text-slate-800 dark:text-slate-200">{mockFamily.address}</dd>
              </div>
            )}
            {mockFamily.phone && (
              <div>
                <dt className="text-slate-500 dark:text-slate-400">{t('familyDetails.phone')}</dt>
                <dd className="text-slate-800 dark:text-slate-200">{mockFamily.phone}</dd>
              </div>
            )}
            {mockFamily.needs?.length > 0 && (
              <div>
                <dt className="text-slate-600 dark:text-slate-400">{t('familyDetails.needs')}</dt>
                <dd className="text-slate-800 dark:text-slate-200">{mockFamily.needs.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Carte Histoire d'impact */}
        <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
            <span aria-hidden>✨</span> {t('familyDetails.impactTitle')}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {generateImpactStory(mockFamily, visits)}
          </p>
        </div>

        {/* Historique des visites */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t('familyDetails.visitsHistory')}</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generateImpactReport}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-3 text-sm font-medium text-white bg-slate-600 dark:bg-slate-500 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <span aria-hidden>📄</span> {t('familyDetails.downloadReport')}
            </button>
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(true)}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-3 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              {t('familyDetails.newVisit')}
            </button>
          </div>
        </div>

        <AddVisitModal
          isOpen={isVisitModalOpen}
          onClose={() => setIsVisitModalOpen(false)}
          selectedFamily={mockFamily}
          onSuccess={(newVisit) => {
            if (newVisit) {
              setVisits(prev => [newVisit, ...prev]);
              alert(t('familyDetails.newVisitSaved'));
            }
            setIsVisitModalOpen(false);
          }}
        />

        {visits.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-12 text-center text-slate-600 dark:text-slate-400">
            {t('familyDetails.noVisits')}
          </div>
        ) : (
          <div className="relative mt-6">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-600" />
            <ul className="space-y-0">
              {[...visits].sort((a, b) => new Date(b.date) - new Date(a.date)).map((visit) => {
                const isPlanned =
                  visit.status === 'PLANNED' ||
                  (visit.status !== 'COMPLETED' && new Date(visit.date) > new Date());
                return (
                  <li key={visit._id} className="relative pl-12 pb-8">
                    <div
                      className={`absolute left-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow ${
                        isPlanned ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ marginLeft: '11px', marginTop: '16px' }}
                    />
                    <div
                      className={`rounded-xl border p-5 ${
                        isPlanned
                          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2 min-w-0">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100 shrink-0">
                          {formatDate(visit.date, locale)}
                          {visit.checkInLocation && (
                            <span className="ms-1.5 text-slate-600 dark:text-slate-400" title={t('familyDetails.validatedGps')}>
                              📍 {t('familyDetails.validatedGps')}
                            </span>
                          )}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                            isPlanned
                              ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-200'
                              : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
                          }`}
                        >
                          {isPlanned ? `📅 ${t('familyDetails.planned')}` : (
                            <>✅ {t('familyDetails.completed')}{visit.proofPhoto ? ' 📷' : ''}</>
                          )}
                        </span>
                        {visit.status === 'PLANNED' && (
                          <button
                            type="button"
                            onClick={() => handleValidatePresence(visit)}
                            disabled={validatingId === visit._id}
                            className="ms-auto inline-flex flex-wrap items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-5 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md ring-2 ring-green-500/30 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 shrink-0"
                          >
                            {validatingId === visit._id ? (
                                <span className="animate-pulse">{t('familyDetails.validating')}</span>
                            ) : (
                              `✅ ${t('familyDetails.validatePresence')}`
                            )}
                          </button>
                        )}
                      </div>
                    {visit.volunteer?.name && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        {t('familyDetails.by', { name: visit.volunteer.name })}
                      </p>
                    )}
                    {visit.types?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {visit.types.map((t) => (
                          <span
                            key={t}
                            className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {visit.notes && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">{visit.notes}</p>
                    )}
                        </div>
                        {visit.proofPhoto && (
                          <button
                            type="button"
                            onClick={() => setLightboxImage(visit.proofPhoto)}
                            className="flex-shrink-0 w-[60px] h-[60px] min-h-[44px] min-w-[44px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-500 bg-slate-100 dark:bg-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                            aria-label={t('familyDetails.viewProof')}
                          >
                            <img
                              src={visit.proofPhoto}
                              alt={t('familyDetails.viewProof')}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Lightbox photo preuve */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 safe-area-modal"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 end-4 z-10 min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl hover:bg-white dark:hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              ×
            </button>
            <img
              src={lightboxImage}
              alt="Photo"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default FamilyDetails;
