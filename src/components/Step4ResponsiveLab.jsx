// ============================================================================
// FICHIER : src/components/Step4ResponsiveLab.jsx
// RÔLE : Composant de l'Étape 4 (Responsive Design & Media Queries).
//
// 🎓 COURS REACT POUR TAG :
// - Ici, nous intégrons un vrai banc d'essai multi-écrans (Desktop 1440px,
//   Tablette 1024px, Mobile 375px) qui charge ton vrai site Booki dans une
//   `<iframe>` redimensionnable en temps réel !
// - Nous avons aussi créé deux simulateurs interactifs pour t'entraîner à
//   expliquer tes deux meilleures astuces responsive à Sarah :
//   1. `order: 2` sur `.hebergements` (ligne 555)
//   2. Le bouton Rechercher qui remplace son texte par l'icône loupe (lignes 524 & 535).
// ============================================================================

import React, { useState } from 'react';
import { CodeBlock, RichCodeText } from './CodeHighlighter';

const VIEWPORTS = [
  {
    id: 'desktop',
    label: 'Desktop (1440px)',
    width: '100%',
    iframeWidth: '1380px',
    scale: 0.62,
    breakpointRule: 'Style par défaut (Lignes 1 à 365 de style.css)',
    icon: 'fa-solid fa-desktop',
    highlights: [
      '.main-container limité à max-width: 1440px avec padding: 0 50px.',
      '.hebergements (65%) et .populaires (32%) sont côte à côte (flex-direction: row par défaut).',
      'Le bouton de recherche affiche le texte « Rechercher » (.fa-magnifying-glass est en display: none).',
      'Les 4 cartes Activités sont alignées sur une seule ligne avec height: 380px sur les images.',
    ],
  },
  {
    id: 'tablet',
    label: 'Tablette (1024px)',
    width: '960px',
    iframeWidth: '960px',
    scale: 0.78,
    breakpointRule: '@media (max-width: 1024px) — Lignes 372 à 450',
    icon: 'fa-solid fa-tablet-screen-button',
    highlights: [
      '.hebergements-and-populaires passe en flex-direction: column (ligne 391) : Populaires descend SOUS Hébergements !',
      '.hebergements et .populaires prennent chacun width: 100% (lignes 395 & 411).',
      '.populaires-cards passe en flex-direction: row (ligne 417) : les 3 cartes populaires s’alignent côte à côte !',
      '#filter passe en flex-wrap: wrap avec #filter p { width: 100% } pour mettre le mot « Filtres » au-dessus des boutons.',
      'Les images d’activités réduisent leur hauteur avec max-height: 200px (ligne 435).',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile (375px)',
    width: '375px',
    iframeWidth: '375px',
    scale: 1,
    breakpointRule: '@media (max-width: 767.98px) — Lignes 455 à 621',
    icon: 'fa-solid fa-mobile-screen-button',
    highlights: [
      'header passe en flex-direction: column (ligne 466) et #menu li met sa bordure EN BAS (border-bottom).',
      'Bouton Rechercher : .button-text passe en display: none (ligne 525) et .fa-magnifying-glass en display: block (ligne 536) !',
      'Inversion magique : .hebergements reçoit order: 2 (ligne 555) et passe APRÈS « Les plus populaires » (resté à order: 0) !',
      'Fond transparent sur .hebergements (background-color: transparent, ligne 550) et border-radius: 0.',
      'Toutes les cartes (Hébergements, Populaires, Activités) et le footer passent sur 1 seule colonne (width: 100%).',
    ],
  },
];

export default function Step4ResponsiveLab({ isCompleted, onCompleteStep }) {
  // État pour choisir la taille d'écran active (desktop, tablet, mobile)
  const [activeViewportId, setActiveViewportId] = useState('mobile');

  // État pour le simulateur interactif de la propriété `order: 2` sur mobile
  const [mobileOrderActive, setMobileOrderActive] = useState(true);

  // État pour le simulateur du bouton Rechercher (Desktop vs Mobile)
  const [mobileSearchMode, setMobileSearchMode] = useState(true);

  const currentVp =
    VIEWPORTS.find((v) => v.id === activeViewportId) || VIEWPORTS[0];

  return (
    <div className="step-container">
      {/* BANNIÈRE PÉDAGOGIQUE : LES 2 MEDIA QUERIES DE BOOKI */}
      <div className="context-banner">
        <div className="context-banner-left">
          <div className="scenario-pill">
            <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
            <span>Étape 4 (10 min) • Démonstration Desktop, Tablette &amp; Mobile</span>
          </div>
          <h2>
            Le Responsive Design : 1 seul fichier HTML, 3 mises en page CSS !
          </h2>
          <p>
            Pendant les 15 premières minutes de ta soutenance, tu dois montrer à
            Sarah ton site en <strong>Desktop</strong>, <strong>Tablette (1024px)</strong>{' '}
            et <strong>Mobile (&lt; 768px)</strong>. Ton approche est{' '}
            <strong>Desktop-First</strong> : tu as codé le style ordinateur par
            défaut, puis ajouté deux{' '}
            <code className="code-pill pill-selector">@media (max-width: ...)</code>{' '}
            à la fin de ton fichier{' '}
            <code className="code-pill pill-file">style.css</code>.
          </p>
        </div>

        <div className="breakpoints-summary-box">
          <div className="bp-pill desktop">
            <strong>Desktop</strong>
            <span>&gt; 1024px (max 1440px)</span>
          </div>
          <div className="bp-pill tablet">
            <strong>Tablette</strong>
            <span>
              <code className="code-pill pill-selector">
                @media (max-width: 1024px)
              </code>
            </span>
          </div>
          <div className="bp-pill mobile">
            <strong>Mobile</strong>
            <span>
              <code className="code-pill pill-selector">
                @media (max-width: 767.98px)
              </code>
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ATELIER 1 : LES 2 ASTUCES STARS À MONTRER À SARAH SUR MOBILE
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 1 • Les 2 points techniques complexes à montrer à Sarah
            </span>
            <h3>
              Manipule tes 2 meilleures astuces Mobile (Lignes 524–557 de{' '}
              <code className="code-pill pill-file">style.css</code>)
            </h3>
          </div>
        </div>

        <div className="responsive-tricks-grid">
          {/* ASTUCE A : ORDER: 2 SUR .HEBERGEMENTS */}
          <div className="trick-card">
            <div className="trick-card-header">
              <span className="badge-tag">Astuce #1 • style.css Ligne 555</span>
              <button
                type="button"
                className={`btn-preset ${mobileOrderActive ? 'success' : 'danger'}`}
                onClick={() => setMobileOrderActive(!mobileOrderActive)}
              >
                {mobileOrderActive
                  ? '✅ .hebergements { order: 2; } ACTIF'
                  : '⚠️ order: 0 (Ordre HTML normal)'}
              </button>
            </div>
            <h4>
              Comment « Les plus populaires » passe EN PREMIER sur Mobile sans
              toucher au HTML
            </h4>
            <p>
              Dans ton <code className="code-pill pill-file">index.html</code>, la
              section <code className="code-pill pill-selector">.hebergements</code>{' '}
              est écrite <strong>avant</strong>{' '}
              <code className="code-pill pill-selector">.populaires</code>. Mais sur
              la maquette mobile de Loïc, <strong>Populaires</strong> doit être tout
              en haut ! En mettant{' '}
              <code className="code-pill pill-css-prop">order: 2</code> sur{' '}
              <code className="code-pill pill-selector">.hebergements</code>, elle
              passe après{' '}
              <code className="code-pill pill-selector">.populaires</code> (qui vaut{' '}
              <code className="code-pill pill-css-prop">order: 0</code> par défaut).
            </p>

            <div className="order-demo-stage">
              <div
                className="order-demo-parent"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div
                  className="order-demo-child heb"
                  style={{
                    order: mobileOrderActive ? 2 : 0,
                  }}
                >
                  <div>
                    <strong>
                      1er dans le HTML :{' '}
                      <code className="code-pill pill-html">
                        &lt;section class=&quot;hebergements&quot;&gt;
                      </code>
                    </strong>
                    <small>
                      Fond :{' '}
                      {mobileOrderActive ? (
                        <code className="code-pill pill-css-prop">
                          background-color: transparent
                        </code>
                      ) : (
                        <code className="code-pill pill-css-prop">
                          background-color: #F2F2F2
                        </code>
                      )}
                    </small>
                  </div>
                  <code className="code-pill pill-css-prop">
                    order: {mobileOrderActive ? '2' : '0'}
                  </code>
                </div>

                <div
                  className="order-demo-child pop"
                  style={{
                    order: 0,
                  }}
                >
                  <div>
                    <strong>
                      2e dans le HTML :{' '}
                      <code className="code-pill pill-html">
                        &lt;section class=&quot;populaires&quot;&gt;
                      </code>
                    </strong>
                    <small>
                      Garde son fond gris{' '}
                      <code className="code-pill pill-css-prop">#F2F2F2</code> sur
                      mobile
                    </small>
                  </div>
                  <code className="code-pill pill-css-prop">order: 0 (défaut)</code>
                </div>
              </div>
            </div>
          </div>

          {/* ASTUCE B : BOUTON RECHERCHER TEXTE VS LOUPE */}
          <div className="trick-card">
            <div className="trick-card-header">
              <span className="badge-tag">Astuce #2 • style.css Lignes 524 &amp; 535</span>
              <button
                type="button"
                className={`btn-preset ${mobileSearchMode ? 'success' : ''}`}
                onClick={() => setMobileSearchMode(!mobileSearchMode)}
              >
                {mobileSearchMode
                  ? '📱 Mode Mobile (< 768px) : Loupe'
                  : '🖥️ Mode Desktop : Texte « Rechercher »'}
              </button>
            </div>
            <h4>
              Comment le bouton « Rechercher » se transforme en icône Loupe sur
              Mobile
            </h4>
            <p>
              Dans ton <code className="code-pill pill-file">index.html</code>{' '}
              (lignes 36–39), le{' '}
              <code className="code-pill pill-html">&lt;button&gt;</code> contient{' '}
              <strong>à la fois</strong> l&apos;icône{' '}
              <code className="code-pill pill-selector">.fa-magnifying-glass</code>{' '}
              et le{' '}
              <code className="code-pill pill-html">
                &lt;span class=&quot;button-text&quot;&gt;Rechercher&lt;/span&gt;
              </code>
              . Tu joues simplement avec{' '}
              <code className="code-pill pill-css-prop">display: none</code> et{' '}
              <code className="code-pill pill-css-prop">display: block</code> !
            </p>

            <div className="search-demo-stage">
              <div className="booki-real-searchbar">
                <span className="real-pin">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <input
                  type="text"
                  readOnly
                  value="Marseille, France"
                  aria-label="Ville"
                />
                <button
                  type="button"
                  className={`real-search-btn ${
                    mobileSearchMode ? 'mobile-btn' : 'desktop-btn'
                  }`}
                >
                  {mobileSearchMode ? (
                    <i className="fa-solid fa-magnifying-glass"></i>
                  ) : (
                    <span>Rechercher</span>
                  )}
                </button>
              </div>

              <CodeBlock
                title={
                  mobileSearchMode
                    ? 'css/style.css — Mobile (@media max-width: 767.98px)'
                    : 'css/style.css — Desktop (Par défaut, ligne 143)'
                }
                lang="CSS"
                variant="compact"
                showLineNumbers={false}
                code={
                  mobileSearchMode
                    ? `/* Mobile (@media max-width: 767.98px) */
.button-text { display: none; }
.fa-magnifying-glass { display: block; border-radius: 15px; }`
                    : `/* Desktop (Par défaut, ligne 143) */
.button-text { display: inline; }
.fa-magnifying-glass { display: none; }`
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATELIER 2 : BANC D'ESSAI MULTI-ÉCRANS DU VRAI SITE BOOKI DE TAG
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 2 • Aperçu Live de ton vrai code Booki aux 3 tailles d&apos;écran
            </span>
            <h3>Banc d&apos;Essai Responsive (Desktop • Tablette • Mobile)</h3>
          </div>

          <div className="viewport-switcher">
            {VIEWPORTS.map((vp) => (
              <button
                key={vp.id}
                type="button"
                className={`vp-btn ${activeViewportId === vp.id ? 'active' : ''}`}
                onClick={() => setActiveViewportId(vp.id)}
              >
                <i className={vp.icon} aria-hidden="true"></i>
                <span>{vp.label}</span>
              </button>
            ))}
            <a
              href="./booki-original.html"
              target="_blank"
              rel="noreferrer"
              className="vp-btn external-link"
            >
              <i className="fa-solid fa-up-right-from-square" aria-hidden="true"></i>
              <span>Ouvrir en plein écran</span>
            </a>
          </div>
        </div>

        <div className="vp-changes-banner">
          <div className="vp-rule-badge">
            <i className="fa-solid fa-code" aria-hidden="true"></i>
            <strong>
              <RichCodeText text={currentVp.breakpointRule} />
            </strong>
          </div>
          <ul className="vp-highlights-list">
            {currentVp.highlights.map((h) => (
              <li key={h}>
                <RichCodeText text={h} />
              </li>
            ))}
          </ul>
        </div>

        {/* CADRE DE PRÉVISUALISATION CONTENANT LE VRAI SITE BOOKI DE TAG */}
        <div className="device-stage-wrapper">
          <div className={`device-frame device-${currentVp.id}`}>
            <div className="device-topbar">
              <span className="device-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="device-url">
                booki-marseille.fr — {currentVp.label}
              </span>
            </div>
            <div className="device-iframe-container">
              <iframe
                title={`Aperçu Booki ${currentVp.label}`}
                src="./booki-original.html"
                style={{
                  width: currentVp.iframeWidth,
                  height: '680px',
                  border: 'none',
                  background: '#ffffff',
                }}
              />
            </div>
          </div>
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
              ? 'Étape 4 Validée ! Passer à l’Étape 5 (Code Ligne par Ligne & W3C)'
              : 'Valider l’Étape 4 et explorer le code ligne par ligne →'}
          </button>
        </div>
      </section>
    </div>
  );
}
