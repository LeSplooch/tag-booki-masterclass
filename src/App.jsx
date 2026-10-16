// ============================================================================
// FICHIER : src/App.jsx
// RÔLE : Composant "Chef d'Orchestre" de l'application Booki Masterclass.
//
// 🎓 COURS REACT POUR TAG :
// - `App` garde en mémoire :
//   1. `activeStep` : le numéro de l'étape affichée à l'écran (de 1 à 6).
//   2. `completedSteps` : la liste des étapes que tu as déjà validées,
//      sauvegardée dans le `localStorage` du navigateur.
//   3. `theme` : le thème de couleur ('dark' par défaut, ou 'light' si tu
//      cliques sur le bouton Soleil/Lune en haut à droite !).
// ============================================================================

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { STEPS_LIST } from './data/courseData';
import Step1Semantics from './components/Step1Semantics';
import Step2FlexboxLab from './components/Step2FlexboxLab';
import Step3Specificity from './components/Step3Specificity';
import Step4ResponsiveLab from './components/Step4ResponsiveLab';
import Step5CodeExplorer from './components/Step5CodeExplorer';
import Step6OralSimulator from './components/Step6OralSimulator';
import ReactExplainerModal from './components/ReactExplainerModal';

const FIGMA_URL =
  'https://www.figma.com/design/B3eLowtWREc9YXzBcGRAHn/Maquettes-Booki?node-id=176484-708&t=KfqLxLZCOkad9tB3-0';

export default function App() {
  // 1. Étape actuellement sélectionnée (1 par défaut)
  const [activeStep, setActiveStep] = useState(1);

  // 2. Thème visuel : 'dark' (Mode Sombre) par défaut, avec option 'light' (Mode Clair)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('tag_booki_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // 3. Étapes terminées (chargées depuis localStorage au démarrage)
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('tag_booki_completed_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. État pour ouvrir ou fermer la modale "Comment ce site est codé en React ?"
  const [reactModalOpen, setReactModalOpen] = useState(false);

  // Synchronise l'attribut `data-theme` sur la balise <html> et sauvegarde le choix dans localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaScheme) {
      metaScheme.setAttribute('content', theme);
    }
    try {
      localStorage.setItem('tag_booki_theme', theme);
    } catch {
      // Ignore si localStorage est bloqué
    }
  }, [theme]);

  // Sauvegarde automatique dans localStorage à chaque fois que completedSteps change
  useEffect(() => {
    try {
      localStorage.setItem(
        'tag_booki_completed_steps',
        JSON.stringify(completedSteps)
      );
    } catch {
      // Ignore en navigation privée stricte
    }
  }, [completedSteps]);

  // Fonction pour basculer entre Dark Mode et Light Mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fonction appelée quand Tag clique sur le bouton "Valider l'étape"
  const handleCompleteStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prev) => [...prev, stepId]);
    }
    // Lance une pluie de confettis aux couleurs de Booki (#0065FC et #38bdf8) !
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#0065FC', '#38bdf8', '#10b981', '#f59e0b'],
    });

    // Passe automatiquement à l'étape suivante s'il en reste une
    if (stepId < STEPS_LIST.length) {
      setActiveStep(stepId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentStepMeta =
    STEPS_LIST.find((s) => s.id === activeStep) || STEPS_LIST[0];
  const progressPercent = Math.round(
    (completedSteps.length / STEPS_LIST.length) * 100
  );

  return (
    <div className="app-shell" data-theme={theme}>
      {/* =====================================================================
          EN-TÊTE PRINCIPAL (NAVIGATION & BARRE DE PROGRESSION)
      ===================================================================== */}
      <header className="top-navbar">
        <div className="top-navbar-inner">
          <div className="brand-block">
            <div className="brand-logo-badge">
              <img src="./images/logo/Booki.png" alt="Logo Booki" />
            </div>
            <div>
              <div className="brand-kicker">
                Parcours Intensif 60 min • Préparation Soutenance HTML/CSS
              </div>
              <h1 className="brand-title">
                L&apos;Atelier Interactif de <span>Tag</span>
              </h1>
            </div>
          </div>

          <div className="navbar-actions">
            {/* Barre de progression globale */}
            <div className="global-progress-pill" title="Ta progression sur les 6 étapes">
              <div className="progress-text-row">
                <span>Progression Masterclass</span>
                <strong>
                  {completedSteps.length}/{STEPS_LIST.length} ({progressPercent}%)
                </strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* BOUTON DE BASCULE DARK MODE / LIGHT MODE */}
            <button
              type="button"
              className="nav-action-btn theme-toggle-btn"
              onClick={toggleTheme}
              title="Basculer entre le Mode Sombre et le Mode Clair"
            >
              <i
                className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}
                aria-hidden="true"
              ></i>
              <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
            </button>

            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-action-btn"
            >
              <i className="fa-brands fa-figma" aria-hidden="true"></i>
              <span>Maquette Figma</span>
            </a>

            <a
              href="./booki-original.html"
              target="_blank"
              rel="noreferrer"
              className="nav-action-btn"
            >
              <i className="fa-solid fa-display" aria-hidden="true"></i>
              <span>Voir mon site Booki</span>
            </a>

            <button
              type="button"
              className="nav-action-btn react-bonus-btn"
              onClick={() => setReactModalOpen(true)}
            >
              <i className="fa-brands fa-react" aria-hidden="true"></i>
              <span>Comment ce site est fait ?</span>
            </button>
          </div>
        </div>

        {/* BARRE DES 6 ÉTAPES (CHRONOMÉTRÉES SUR 1 HEURE) */}
        <nav className="steps-ribbon" aria-label="Étapes du parcours">
          {STEPS_LIST.map((step) => {
            const isCurrent = step.id === activeStep;
            const isDone = completedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                className={`step-tab ${isCurrent ? 'active' : ''} ${
                  isDone ? 'done' : ''
                }`}
                onClick={() => {
                  setActiveStep(step.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="step-tab-top">
                  <span className="step-time-badge">{step.timeRange}</span>
                  {isDone ? (
                    <i
                      className="fa-solid fa-circle-check step-check-icon"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i className={`${step.icon} step-icon`} aria-hidden="true"></i>
                  )}
                </div>
                <strong className="step-tab-title">{step.shortTitle}</strong>
                <small className="step-tab-badge">{step.badge}</small>
              </button>
            );
          })}
        </nav>
      </header>

      {/* =====================================================================
          CONTENU DE L'ÉTAPE ACTIVE
      ===================================================================== */}
      <main className="main-workspace">
        <div className="step-header-strip">
          <div>
            <span className="step-strip-kicker">
              Étape {currentStepMeta.id} sur {STEPS_LIST.length} • Durée conseillée :{' '}
              {currentStepMeta.duration} ({currentStepMeta.timeRange})
            </span>
            <h2>{currentStepMeta.title}</h2>
            <p>{currentStepMeta.summary}</p>
          </div>

          <div className="step-quick-nav">
            <button
              type="button"
              className="btn-step-nav"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            >
              ← Étape précédente
            </button>
            <button
              type="button"
              className="btn-step-nav"
              disabled={activeStep === STEPS_LIST.length}
              onClick={() =>
                setActiveStep((prev) => Math.min(STEPS_LIST.length, prev + 1))
              }
            >
              Étape suivante →
            </button>
          </div>
        </div>

        {/* Rendu conditionnel : on affiche le composant correspondant à activeStep */}
        {activeStep === 1 && (
          <Step1Semantics
            isCompleted={completedSteps.includes(1)}
            onCompleteStep={() => handleCompleteStep(1)}
          />
        )}
        {activeStep === 2 && (
          <Step2FlexboxLab
            isCompleted={completedSteps.includes(2)}
            onCompleteStep={() => handleCompleteStep(2)}
          />
        )}
        {activeStep === 3 && (
          <Step3Specificity
            isCompleted={completedSteps.includes(3)}
            onCompleteStep={() => handleCompleteStep(3)}
          />
        )}
        {activeStep === 4 && (
          <Step4ResponsiveLab
            isCompleted={completedSteps.includes(4)}
            onCompleteStep={() => handleCompleteStep(4)}
          />
        )}
        {activeStep === 5 && (
          <Step5CodeExplorer
            isCompleted={completedSteps.includes(5)}
            onCompleteStep={() => handleCompleteStep(5)}
          />
        )}
        {activeStep === 6 && (
          <Step6OralSimulator
            isCompleted={completedSteps.includes(6)}
            onCompleteStep={() => handleCompleteStep(6)}
          />
        )}
      </main>

      {/* PIED DE PAGE AVEC RAPPEL PÉDAGOGIQUE */}
      <footer className="app-footer">
        <div>
          <strong>Booki Masterclass — Créé sur-mesure pour Tag</strong> •
          Application React commentée ligne par ligne pour apprendre tout en
          pratiquant.
        </div>
        <button
          type="button"
          className="btn-link-footer"
          onClick={() => setReactModalOpen(true)}
        >
          <i className="fa-brands fa-react" aria-hidden="true"></i> Découvrir
          comment ce site React fonctionne
        </button>
      </footer>

      {/* MODALE EXPLICATIVE REACT */}
      <ReactExplainerModal
        isOpen={reactModalOpen}
        onClose={() => setReactModalOpen(false)}
      />
    </div>
  );
}
