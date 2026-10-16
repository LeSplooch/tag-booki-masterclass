// ============================================================================
// FICHIER : src/components/Step1Semantics.jsx
// RÔLE : Composant de l'Étape 1 (Découpe de la Maquette & Web Sémantique).
//
// 🎓 COURS REACT POUR TAG :
// - Un "Composant" React est une fonction JavaScript (ici `Step1Semantics`)
//   qui retourne du JSX (du HTML enrichi avec du JavaScript entre accolades {}).
// - Il reçoit des "props" (propriétés) envoyées par son parent `App.jsx` :
//   ici `onCompleteStep` permet de prévenir le parent quand Tag a terminé l'étape !
// - Le Hook `useState` permet de créer une "mémoire" locale au composant :
//   dès que cette mémoire change (ex: quand Tag clique sur une zone du site),
//   React met automatiquement à jour l'écran sans recharger la page !
// ============================================================================

import React, { useState } from 'react';
import { XRAY_ZONES, SEMANTIC_CHALLENGES } from '../data/courseData';

export default function Step1Semantics({ isCompleted, onCompleteStep }) {
  // 1. État (State) pour savoir quelle zone de la maquette Booki est sélectionnée
  const [selectedZoneId, setSelectedZoneId] = useState(XRAY_ZONES[0].id);

  // 2. État pour activer ou désactiver la vue "Rayons X" (bordures colorées des boîtes)
  const [xrayActive, setXrayActive] = useState(true);

  // 3. État pour stocker les réponses de Tag aux 3 mini-défis sémantiques
  // Exemple : { 'sem-1': 0, 'sem-2': 1 }
  const [answers, setAnswers] = useState({});

  // On cherche l'objet complet de la zone actuellement sélectionnée
  const activeZone =
    XRAY_ZONES.find((z) => z.id === selectedZoneId) || XRAY_ZONES[0];

  // Fonction appelée quand Tag clique sur une réponse du quiz
  const handleSelectOption = (challengeId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [challengeId]: optionIndex,
    }));
  };

  // Calcul du nombre de bonnes réponses obtenues par Tag
  const correctCount = SEMANTIC_CHALLENGES.filter((ch) => {
    const pickedIdx = answers[ch.id];
    return pickedIdx !== undefined && ch.options[pickedIdx]?.correct;
  }).length;

  return (
    <div className="step-container">
      {/* BANNIÈRE D'INTRODUCTION DU SCÉNARIO BOOKI */}
      <div className="context-banner">
        <div className="context-banner-left">
          <div className="scenario-pill">
            <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
            <span>Le Scénario de ta Soutenance (10 min)</span>
          </div>
          <h2>
            Bienvenue chez Booki ! Comment expliquer le contexte et la découpe à Sarah
          </h2>
          <p>
            Pendant ta soutenance, ton évaluateur joue le rôle de{' '}
            <strong>Sarah (la CTO de Booki)</strong>. Tu travailles avec elle et{' '}
            <strong>Loïc (l&apos;UI Designer)</strong> qui a créé les maquettes Figma
            pour permettre aux usagers de trouver des hébergements et des activités
            à Marseille. Avant d&apos;écrire la moindre ligne de code, un développeur
            découpe toujours la maquette en <strong>boîtes HTML sémantiques</strong>.
          </p>
        </div>

        <div className="personas-grid">
          <div className="persona-card">
            <span className="persona-avatar sarah">S</span>
            <div>
              <strong>Sarah — CTO @Booki</strong>
              <small>Jouée par ton évaluateur ! Te challenge sur le W3C, la sémantique et le CSS.</small>
            </div>
          </div>
          <div className="persona-card">
            <span className="persona-avatar loic">L</span>
            <div>
              <strong>Loïc — UI Designer</strong>
              <small>A dessiné les maquettes Figma Desktop (1440px), Tablette (1024px) et Mobile (375px).</small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ATELIER INTERACTIF 1 : LE SCANNER RAYONS-X DE LA MAQUETTE BOOKI
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">Atelier 1 • Étude & Découpe de la Maquette</span>
            <h3>Scanner Rayons-X de ton fichier index.html</h3>
          </div>
          <button
            type="button"
            className={`btn-toggle-xray ${xrayActive ? 'active' : ''}`}
            onClick={() => setXrayActive(!xrayActive)}
          >
            <i className="fa-solid fa-x-ray" aria-hidden="true"></i>
            {xrayActive ? 'Rayons-X Activés (Boîtes visibles)' : 'Activer les Rayons-X'}
          </button>
        </div>

        <p className="panel-subtitle">
          Clique sur n&apos;importe quelle zone de la miniature Booki à gauche pour voir
          quelle balise HTML tu as utilisée dans ton code, à quelle ligne elle se
          trouve, et <strong>quoi répondre à Sarah</strong> si elle t&apos;interroge dessus !
        </p>

        <div className="xray-workbench">
          {/* COLONNE GAUCHE : MAQUETTE INTERACTIVE CLIQUABLE */}
          <div className={`wireframe-stage ${xrayActive ? 'xray-mode' : ''}`}>
            <div
              className={`wf-box wf-main-container ${
                selectedZoneId === 'main-container' ? 'selected' : ''
              }`}
              onClick={() => setSelectedZoneId('main-container')}
            >
              <div className="wf-tag-bar">
                <code>&lt;div class=&quot;main-container&quot;&gt;</code>
                <span>max-width: 1440px</span>
              </div>

              {/* Zone 1 : Header */}
              <div
                className={`wf-box wf-header ${
                  selectedZoneId === 'header' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('header');
                }}
              >
                <div className="wf-header-inner">
                  <div className="wf-logo">
                    <img src="./images/logo/Booki.png" alt="Booki" />
                    {xrayActive && <span className="wf-badge">&lt;header&gt;</span>}
                  </div>
                  <div className="wf-nav">
                    {xrayActive && <span className="wf-badge">&lt;nav&gt; &gt; ul#menu</span>}
                    <span className="wf-nav-item active">Hébergements</span>
                    <span className="wf-nav-item">Activités</span>
                  </div>
                </div>
              </div>

              {/* Zone 2 : Search & Filters */}
              <div
                className={`wf-box wf-search ${
                  selectedZoneId === 'search-filter' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('search-filter');
                }}
              >
                {xrayActive && (
                  <span className="wf-badge">&lt;section class=&quot;filter-title&quot;&gt; + &lt;h1&gt;</span>
                )}
                <div className="wf-h1">Trouvez votre hébergement pour des vacances de rêve</div>
                <div className="wf-searchbar-mock">
                  <span className="wf-pin">
                    <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  </span>
                  <span className="wf-input">Marseille, France</span>
                  <span className="wf-btn">Rechercher</span>
                </div>
                <div className="wf-filters-mock">
                  <strong>Filtres</strong>
                  <span><i className="fa-solid fa-money-bill-wave"></i> Économique</span>
                  <span><i className="fa-solid fa-person"></i> Familial</span>
                  <span><i className="fa-solid fa-heart"></i> Romantique</span>
                  <span><i className="fa-solid fa-fire"></i> Nos pépites</span>
                </div>
              </div>

              {/* Zone 3 : Hébergements & Populaires */}
              <div
                className={`wf-box wf-heb-pop ${
                  selectedZoneId === 'hebergements-populaires' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('hebergements-populaires');
                }}
              >
                {xrayActive && (
                  <span className="wf-badge">
                    &lt;div class=&quot;hebergements-and-populaires&quot;&gt; (display: flex)
                  </span>
                )}
                <div className="wf-heb-Split">
                  <div className="wf-sub-section wf-heb-left">
                    <div className="wf-sub-header">
                      <strong>Hébergements à Marseille</strong>
                      {xrayActive && <code>&lt;section&gt; 65%</code>}
                    </div>
                    <div className="wf-mini-grid">
                      {[
                        { name: 'Hôtel du port', img: './images/hebergements/fred-kleber.jpg', price: '52€' },
                        { name: 'Hôtel chez Amina', img: './images/hebergements/febrian-zakaria.jpg', price: '96€' },
                        { name: 'Hôtel les mouettes', img: './images/hebergements/reisetopia.jpg', price: '76€' },
                      ].map((h) => (
                        <div className="wf-mini-card" key={h.name}>
                          <img src={h.img} alt={h.name} />
                          <div>
                            <strong>{h.name}</strong>
                            <small>Nuit dès {h.price}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                    {xrayActive && (
                      <div className="wf-code-note">
                        6x <code>&lt;a&gt;&lt;article class=&quot;card&quot;&gt;</code>
                      </div>
                    )}
                  </div>

                  <div className="wf-sub-section wf-pop-right">
                    <div className="wf-sub-header">
                      <strong>Les plus populaires 📈</strong>
                      {xrayActive && <code>&lt;section&gt; 32%</code>}
                    </div>
                    <div className="wf-mini-col">
                      <div className="wf-mini-horiz">
                        <img src="./images/hebergements/emile-guillemot.jpg" alt="Soleil du matin" />
                        <div>
                          <strong>Le soleil du matin</strong>
                          <small>128€ • ★★★★☆</small>
                        </div>
                      </div>
                      <div className="wf-mini-horiz">
                        <img src="./images/hebergements/aw-creative.jpg" alt="Au cœur de l'eau" />
                        <div>
                          <strong>Au cœur de l&apos;eau</strong>
                          <small>71€ • ★★★★☆</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone 4 : Activités */}
              <div
                className={`wf-box wf-activites ${
                  selectedZoneId === 'activites' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('activites');
                }}
              >
                <div className="wf-sub-header">
                  <strong>Activités à Marseille</strong>
                  {xrayActive && (
                    <span className="wf-badge">&lt;section&gt; &gt; .activities-cards</span>
                  )}
                </div>
                <div className="wf-act-row">
                  {[
                    { title: 'Vieux-Port', img: './images/activites/reno-laithienne.jpg' },
                    { title: 'Fort de Pomègues', img: './images/activites/paul-hermann.jpg' },
                    { title: 'Calanques', img: './images/activites/kilyan-sockalingum.jpg' },
                    { title: 'Notre-Dame', img: './images/activites/florian-wehde.jpg' },
                  ].map((act) => (
                    <div className="wf-act-card" key={act.title}>
                      <img src={act.img} alt={act.title} />
                      <span>{act.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone 5 : Footer */}
              <div
                className={`wf-box wf-footer ${
                  selectedZoneId === 'footer' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('footer');
                }}
              >
                {xrayActive && <span className="wf-badge">&lt;footer&gt; (display: flex)</span>}
                <div className="wf-footer-cols">
                  <div>
                    <strong>À propos</strong>
                    <small>Fonctionnement • CGV</small>
                  </div>
                  <div>
                    <strong>Nos hébergements</strong>
                    <small>Charte qualité</small>
                  </div>
                  <div>
                    <strong>Assistance</strong>
                    <small>Centre d&apos;aide • Contact</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FICHE D'INSPECTION DE LA ZONE SÉLECTIONNÉE */}
          <div className="xray-inspector-card">
            <div className="inspector-badges">
              <span className="badge-tag">{activeZone.tag}</span>
              <span className="badge-lines">HTML : {activeZone.linesHtml}</span>
              <span className="badge-lines">CSS : {activeZone.linesCss}</span>
            </div>

            <h4>{activeZone.title}</h4>
            <p className="inspector-role">{activeZone.role}</p>

            <div className="inspector-box semantic-why">
              <h5>
                <i className="fa-solid fa-code" aria-hidden="true"></i> Pourquoi cette balise
                sémantique ?
              </h5>
              <p>{activeZone.whyThisTag}</p>
            </div>

            <div className="inspector-box sarah-gold">
              <h5>
                <i className="fa-solid fa-comments" aria-hidden="true"></i> Ce qu&apos;il faut
                dire à Sarah (CTO) :
              </h5>
              <p>{activeZone.sarahTip}</p>
            </div>

            <div className="code-preview-block">
              <div className="code-preview-header">
                <span>Extrait de ton vrai code Booki</span>
              </div>
              <pre tabIndex="0">
                <code>{activeZone.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATELIER INTERACTIF 2 : LES 3 QUESTIONS CLÉS SUR TON HTML SÉMANTIQUE
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">Atelier 2 • Vérifie ta compréhension</span>
            <h3>Défi Pratique : Les 3 secrets de ton fichier index.html</h3>
          </div>
          <div className="score-pill">
            Score : <strong>{correctCount} / {SEMANTIC_CHALLENGES.length}</strong>
          </div>
        </div>

        <div className="challenges-grid">
          {SEMANTIC_CHALLENGES.map((ch, idx) => {
            const picked = answers[ch.id];
            const pickedObj = picked !== undefined ? ch.options[picked] : null;
            return (
              <div className="challenge-card" key={ch.id}>
                <div className="challenge-number">Question {idx + 1}</div>
                <p className="challenge-q">{ch.question}</p>
                <div className="challenge-options">
                  {ch.options.map((opt, optIdx) => {
                    const isSelected = picked === optIdx;
                    let statusClass = '';
                    if (isSelected) {
                      statusClass = opt.correct ? 'correct' : 'wrong';
                    }
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        className={`option-btn ${statusClass}`}
                        onClick={() => handleSelectOption(ch.id, optIdx)}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                {pickedObj && (
                  <div
                    className={`feedback-banner ${
                      pickedObj.correct ? 'success' : 'error'
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        pickedObj.correct ? 'fa-circle-check' : 'fa-circle-xmark'
                      }`}
                      aria-hidden="true"
                    ></i>
                    <span>{pickedObj.feedback}</span>
                  </div>
                )}
              </div>
            );
          })}
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
              ? 'Étape 1 Validée ! Passer à l’Étape 2 (Flexbox)'
              : 'Valider l’Étape 1 et passer à Flexbox →'}
          </button>
        </div>
      </section>
    </div>
  );
}
