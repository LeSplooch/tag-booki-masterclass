// ============================================================================
// FICHIER : src/components/Step5CodeExplorer.jsx
// RÔLE : Composant de l'Étape 5 (Maîtrise Ligne par Ligne & Audit W3C).
//
// 🎓 COURS REACT POUR TAG :
// - Ici on utilise le Hook `useEffect` pour charger le contenu complet de tes
//   vrais fichiers `booki-original.html` et `booki-original.css` avec `fetch()`
//   au démarrage du composant !
// - C'est un excellent exemple de communication entre React et des fichiers
//   externes placés dans le dossier `public/`.
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  CODE_WALKTHROUGH_SECTIONS,
  W3C_AUDIT_ITEMS,
} from '../data/courseData';

export default function Step5CodeExplorer({ isCompleted, onCompleteStep }) {
  // Chapitre actif dans l'explorateur guidé ligne par ligne
  const [activeSectionId, setActiveSectionId] = useState(
    CODE_WALKTHROUGH_SECTIONS[0].id
  );

  // Suivi des points W3C que Tag a lus et maîtrisés
  const [checkedAudits, setCheckedAudits] = useState({});

  // État pour afficher le code intégral (306 lignes HTML / 621 lignes CSS)
  const [fullFileTab, setFullFileTab] = useState('html'); // 'html' ou 'css'
  const [rawHtml, setRawHtml] = useState('Chargement de ton index.html...');
  const [rawCss, setRawCss] = useState('Chargement de ton style.css...');

  // `useEffect` avec un tableau vide `[]` s'exécute UNE SEULE FOIS quand le composant apparaît
  useEffect(() => {
    fetch('./booki-original.html')
      .then((res) => res.text())
      .then((txt) => setRawHtml(txt))
      .catch(() => setRawHtml('Impossible de charger index.html'));

    fetch('./booki-original.css')
      .then((res) => res.text())
      .then((txt) => setRawCss(txt))
      .catch(() => setRawCss('Impossible de charger style.css'));
  }, []);

  const currentChapter =
    CODE_WALKTHROUGH_SECTIONS.find((s) => s.id === activeSectionId) ||
    CODE_WALKTHROUGH_SECTIONS[0];

  const toggleAuditChecked = (id) => {
    setCheckedAudits((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const masteredAuditCount = Object.values(checkedAudits).filter(Boolean).length;

  return (
    <div className="step-container">
      {/* BANNIÈRE D'AVERTISSEMENT DE LA SOUTENANCE : MAÎTRISE LIGNE PAR LIGNE */}
      <div className="context-banner warning-accent">
        <div className="context-banner-left">
          <div className="scenario-pill warning">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            <span>Règle d&apos;Or de la Soutenance (Encadré Orange)</span>
          </div>
          <h2>
            « Tout code que vous produisez doit être maîtrisé ligne par ligne »
          </h2>
          <p>
            Lors de la soutenance, Sarah va te demander d&apos;ouvrir ton code dans
            VS Code et de lui expliquer pourquoi tu as écrit telle ou telle ligne.
            Explore ci-dessous les <strong>5 chapitres de ton propre code</strong>{' '}
            ainsi que les <strong>4 remarques W3C / Qualité</strong> qui
            impressionneront ton évaluateur !
          </p>
        </div>

        <div className="w3c-score-card">
          <div className="w3c-score-num">
            {masteredAuditCount} / {W3C_AUDIT_ITEMS.length}
          </div>
          <span>Points d&apos;audit W3C maîtrisés</span>
        </div>
      </div>

      {/* =====================================================================
          ATELIER 1 : DÉCODEUR LIGNE PAR LIGNE EN 5 CHAPITRES
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 1 • Explication détaillée de ton code
            </span>
            <h3>Décodeur Ligne par Ligne (HTML + CSS côte à côte)</h3>
          </div>
        </div>

        <div className="chapter-tabs">
          {CODE_WALKTHROUGH_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`chapter-tab-btn ${
                activeSectionId === sec.id ? 'active' : ''
              }`}
              onClick={() => setActiveSectionId(sec.id)}
            >
              {sec.title}
            </button>
          ))}
        </div>

        <div className="walkthrough-stage">
          <div className="walkthrough-codes-row">
            <div className="code-preview-block">
              <div className="code-preview-header">
                <span>
                  <i className="fa-brands fa-html5" aria-hidden="true"></i>{' '}
                  {currentChapter.linesHtml}
                </span>
              </div>
              <pre tabIndex="0">
                <code>{currentChapter.htmlCode}</code>
              </pre>
            </div>

            <div className="code-preview-block">
              <div className="code-preview-header">
                <span>
                  <i className="fa-brands fa-css3-alt" aria-hidden="true"></i>{' '}
                  {currentChapter.linesCss}
                </span>
              </div>
              <pre tabIndex="0">
                <code>{currentChapter.cssCode}</code>
              </pre>
            </div>
          </div>

          <div className="line-by-line-cards">
            <h4>
              <i className="fa-solid fa-key" aria-hidden="true"></i> Les lignes
              clés à savoir expliquer à Sarah dans ce bloc :
            </h4>
            <div className="lbl-grid">
              {currentChapter.lineByLine.map((item) => (
                <div className="lbl-item" key={item.code}>
                  <code className="lbl-code">{item.code}</code>
                  <p>{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATELIER 2 : LES 4 POINTS W3C & QUALITÉ DANS TON CODE ZIP
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 2 • Validateurs W3C &amp; Revue de Code avec Sarah
            </span>
            <h3>
              Les 4 détails repérés dans ton zip (à corriger ou à expliquer à Sarah)
            </h3>
          </div>
        </div>

        <div className="audit-cards-grid">
          {W3C_AUDIT_ITEMS.map((item) => {
            const isChecked = !!checkedAudits[item.id];
            return (
              <div
                key={item.id}
                className={`audit-card ${isChecked ? 'mastered' : ''}`}
              >
                <div className="audit-card-top">
                  <span className="badge-tag">{item.badge}</span>
                  <button
                    type="button"
                    className={`btn-check-audit ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleAuditChecked(item.id)}
                  >
                    <i
                      className={`fa-solid ${
                        isChecked ? 'fa-circle-check' : 'fa-circle'
                      }`}
                      aria-hidden="true"
                    ></i>
                    {isChecked ? 'Maîtrisé !' : 'Marquer comme compris'}
                  </button>
                </div>

                <h4>{item.title}</h4>
                <p className="audit-exp">{item.explanation}</p>

                <div className="code-comparison-row">
                  <div className="code-box bad">
                    <div className="code-box-title">Dans ton fichier actuel</div>
                    <pre>
                      <code>{item.wrongCode}</code>
                    </pre>
                  </div>
                  <div className="code-box good">
                    <div className="code-box-title">Version optimisée W3C</div>
                    <pre>
                      <code>{item.fixedCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="inspector-box sarah-gold">
                  <h5>
                    <i className="fa-solid fa-microphone" aria-hidden="true"></i>{' '}
                    Phrase prête à dire à Sarah :
                  </h5>
                  <p>{item.whatToSayToSarah}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          ATELIER 3 : VISIONNEUSE DU CODE COMPLET DE TAG AVEC NUMÉROS DE LIGNES
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 3 • Ton code source complet avec numéros de lignes
            </span>
            <h3>
              Visionneuse Intégrale : index.html (306 lignes) &amp; style.css (621 lignes)
            </h3>
          </div>
          <div className="segmented-btns">
            <button
              type="button"
              className={fullFileTab === 'html' ? 'active' : ''}
              onClick={() => setFullFileTab('html')}
            >
              <i className="fa-brands fa-html5" aria-hidden="true"></i> index.html
            </button>
            <button
              type="button"
              className={fullFileTab === 'css' ? 'active' : ''}
              onClick={() => setFullFileTab('css')}
            >
              <i className="fa-brands fa-css3-alt" aria-hidden="true"></i> css/style.css
            </button>
          </div>
        </div>

        <div className="full-source-viewer" tabIndex="0">
          {(fullFileTab === 'html' ? rawHtml : rawCss)
            .split('\n')
            .map((line, index) => (
              <div className="source-line" key={index}>
                <span className="line-num">{index + 1}</span>
                <span className="line-code">{line}</span>
              </div>
            ))}
        </div>

        <div className="step-footer-actions">
          <button
            type="button"
            className={`btn-complete-step ${isCompleted ? 'completed' : ''}`}
            onClick={onCompleteStep}
          >
            <i
              className={`fa-solid ${
                isCompleted ? 'fa-check-double' : 'fa-flag-checkered'
              }`}
              aria-hidden="true"
            ></i>
            {isCompleted
              ? 'Étape 5 Validée ! Passer à la Simulation Finale avec Sarah'
              : 'Valider l’Étape 5 et lancer la Simulation d’Oral →'}
          </button>
        </div>
      </section>
    </div>
  );
}
