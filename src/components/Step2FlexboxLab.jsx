// ============================================================================
// FICHIER : src/components/Step2FlexboxLab.jsx
// RÔLE : Composant de l'Étape 2 (Le Moteur Flexbox & Les Cartes Booki).
//
// 🎓 COURS REACT POUR TAG :
// - Ici on utilise plusieurs états `useState` pour permettre à Tag de modifier
//   en direct les propriétés CSS (comme `flex-wrap`, `justify-content`,
//   `object-fit`, `flex-direction`) sur ses vraies cartes d'hôtels Booki !
// - Tous les extraits de code petits et grands sont rendus dans des blocs
//   colorés grâce à `<CodeBlock />` et `<code className="code-pill ...">`.
// ============================================================================

import React, { useState } from 'react';
import { CodeBlock } from './CodeHighlighter';

const HEBERGEMENTS_SAMPLE = [
  {
    title: 'Hôtel du port',
    price: '52',
    img: './images/hebergements/fred-kleber.jpg',
  },
  {
    title: 'Hôtel chez Amina',
    price: '96',
    img: './images/hebergements/febrian-zakaria.jpg',
  },
  {
    title: 'Hôtel les mouettes',
    price: '76',
    img: './images/hebergements/reisetopia.jpg',
  },
  {
    title: 'Hôtel de la mer',
    price: '46',
    img: './images/hebergements/annie-spratt.jpg',
  },
  {
    title: 'Auberge la canebière',
    price: '25',
    img: './images/hebergements/marcus-loke.jpg',
  },
  {
    title: 'Auberge le panier',
    price: '25',
    img: './images/hebergements/nicate-lee.jpg',
  },
];

const POPULAIRES_SAMPLE = [
  {
    title: 'Hôtel Le soleil du matin',
    price: '128',
    img: './images/hebergements/emile-guillemot.jpg',
  },
  {
    title: 'Chambres d’hôtes Au cœur de l’eau',
    price: '71',
    img: './images/hebergements/aw-creative.jpg',
  },
  {
    title: 'Hôtel Bleu et Blanc',
    price: '68',
    img: './images/hebergements/febrian-zakaria2.jpg',
  },
];

export default function Step2FlexboxLab({ isCompleted, onCompleteStep }) {
  // États du simulateur Flexbox pour les 6 cartes Hébergements (lignes 210-252 de style.css)
  const [flexWrap, setFlexWrap] = useState('wrap');
  const [justifyContent, setJustifyContent] = useState('space-between');
  const [cardWidth, setCardWidth] = useState('30%');
  const [objectFit, setObjectFit] = useState('cover');

  // États du simulateur pour les cartes horizontales Populaires (lignes 271-294)
  const [popCardDisplay, setPopCardDisplay] = useState('flex');
  const [popContentJustify, setPopContentJustify] = useState('space-between');

  const triggerBug = (bugNumber) => {
    if (bugNumber === 1) {
      setFlexWrap('nowrap');
    } else if (bugNumber === 2) {
      setObjectFit('fill');
    } else if (bugNumber === 3) {
      setPopCardDisplay('block');
    }
  };

  const fixBug = (bugNumber) => {
    if (bugNumber === 1) {
      setFlexWrap('wrap');
      setCardWidth('30%');
      setJustifyContent('space-between');
    } else if (bugNumber === 2) {
      setObjectFit('cover');
    } else if (bugNumber === 3) {
      setPopCardDisplay('flex');
      setPopContentJustify('space-between');
    }
  };

  return (
    <div className="step-container">
      {/* BANNIÈRE PÉDAGOGIQUE : POURQUOI SÉPARER HTML & CSS + FLEXBOX */}
      <div className="context-banner">
        <div className="context-banner-left">
          <div className="scenario-pill">
            <i className="fa-solid fa-table-columns" aria-hidden="true"></i>
            <span>Étape 2 (12 min) • Architecture CSS &amp; Flexbox</span>
          </div>
          <h2>
            Comprendre ton fichier{' '}
            <code className="code-pill pill-file">style.css</code> : Flexbox,
            Cartes &amp; Images
          </h2>
          <p>
            Dans ton projet, le HTML et le CSS sont séparés :{' '}
            <code className="code-pill pill-file">index.html</code> contient la
            structure et <code className="code-pill pill-file">css/style.css</code>{' '}
            gère le visuel. Grâce à la classe{' '}
            <code className="code-pill pill-selector">.card</code> (ligne 39 de ton{' '}
            <code className="code-pill pill-file">style.css</code>), tu stylises{' '}
            <strong>9 cartes d&apos;hôtels d&apos;un seul coup</strong> ! Découvrons
            ensemble comment tes règles{' '}
            <code className="code-pill pill-css-prop">display: flex</code> alignent
            tout au pixel près.
          </p>
        </div>

        <div className="css-root-box">
          <div className="css-root-title">
            Tes variables <code className="code-pill pill-selector">:root</code> (Lignes 6–10)
          </div>
          <div className="swatch-row">
            <span className="swatch" style={{ background: '#0065FC' }}></span>
            <code className="code-pill pill-css-prop">--main-color: #0065FC;</code>
          </div>
          <div className="swatch-row">
            <span className="swatch" style={{ background: '#F2F2F2' }}></span>
            <code className="code-pill pill-css-prop">--main-bg-color: #F2F2F2;</code>
          </div>
          <div className="swatch-row">
            <span className="swatch" style={{ background: '#DEEBFF' }}></span>
            <code className="code-pill pill-css-prop">--filter-bg-color: #DEEBFF;</code>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LABORATOIRE 1 : LA GRILLE DES 6 CARTES HÉBERGEMENTS (.hebergements-cards)
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Laboratoire Interactif 1 • style.css (Lignes 210 à 252)
            </span>
            <h3>
              Comment tes 6 cartes{' '}
              <code className="code-pill pill-selector">.hebergements-cards</code>{' '}
              forment une grille 3 × 2
            </h3>
          </div>
          <div className="preset-buttons">
            <button
              type="button"
              className="btn-preset danger"
              onClick={() => triggerBug(1)}
            >
              💥 Tester sans <code className="code-pill pill-css-prop">flex-wrap: wrap</code>
            </button>
            <button
              type="button"
              className="btn-preset danger"
              onClick={() => triggerBug(2)}
            >
              💥 Tester sans <code className="code-pill pill-css-prop">object-fit: cover</code>
            </button>
            <button
              type="button"
              className="btn-preset success"
              onClick={() => {
                fixBug(1);
                fixBug(2);
              }}
            >
              ✨ Remettre le code exact de Tag
            </button>
          </div>
        </div>

        <div className="flexbox-controls-bar">
          <div className="control-group">
            <label>
              <code className="code-pill pill-selector">.hebergements-cards</code>{' '}
              <code className="code-pill pill-css-prop">flex-wrap:</code>
            </label>
            <div className="segmented-btns">
              {['wrap', 'nowrap'].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={flexWrap === val ? 'active' : ''}
                  onClick={() => setFlexWrap(val)}
                >
                  <code>{val}</code> {val === 'wrap' ? '✅' : '⚠️'}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>
              <code className="code-pill pill-css-prop">justify-content:</code>
            </label>
            <div className="segmented-btns">
              {['space-between', 'flex-start', 'center'].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={justifyContent === val ? 'active' : ''}
                  onClick={() => setJustifyContent(val)}
                >
                  <code>{val}</code>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>
              <code className="code-pill pill-selector">.hebergements-cards a</code>{' '}
              <code className="code-pill pill-css-prop">width:</code>
            </label>
            <div className="segmented-btns">
              {['30%', '48%', '100%'].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={cardWidth === val ? 'active' : ''}
                  onClick={() => setCardWidth(val)}
                >
                  <code>{val}</code> {val === '30%' ? '(3/ligne)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>
              <code className="code-pill pill-selector">.card img</code>{' '}
              <code className="code-pill pill-css-prop">object-fit:</code>
            </label>
            <div className="segmented-btns">
              {['cover', 'fill', 'contain'].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={objectFit === val ? 'active' : ''}
                  onClick={() => setObjectFit(val)}
                >
                  <code>{val}</code> {val === 'cover' ? '✅' : '⚠️'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EXPLICATION DYNAMIQUE DE CE QUI SE PASSE À L'ÉCRAN */}
        <div className="live-explanation-banner">
          {flexWrap === 'nowrap' ? (
            <p className="warn-text">
              <strong>⚠️ Regarde ce qui se passe sans</strong>{' '}
              <code className="code-pill pill-css-prop">flex-wrap: wrap</code> ! Par
              défaut en Flexbox, <code className="code-pill pill-css-prop">flex-wrap: nowrap</code>{' '}
              force les 6 cartes à s&apos;écraser sur une seule ligne. En ajoutant{' '}
              <code className="code-pill pill-css-prop">flex-wrap: wrap</code> (ligne 220 de ton{' '}
              <code className="code-pill pill-file">style.css</code>) avec{' '}
              <code className="code-pill pill-css-prop">width: 30%</code> (ligne 225), 3
              cartes prennent 90% de la ligne et les 3 suivantes passent à la ligne !
            </p>
          ) : objectFit !== 'cover' ? (
            <p className="warn-text">
              <strong>⚠️ Regarde les photos des lits sans</strong>{' '}
              <code className="code-pill pill-css-prop">object-fit: cover</code> ! Comme tu as
              imposé <code className="code-pill pill-css-prop">height: 136px</code> et{' '}
              <code className="code-pill pill-css-prop">width: 100%</code> (lignes 211-212),
              les images sont écrasées. La propriété{' '}
              <code className="code-pill pill-css-prop">object-fit: cover</code> (lignes 47 et 215)
              recadre automatiquement la photo sans jamais la déformer !
            </p>
          ) : (
            <p className="ok-text">
              <strong>✅ Configuration exacte de ton</strong>{' '}
              <code className="code-pill pill-file">style.css</code> :{' '}
              <code className="code-pill pill-css-prop">display: flex;</code>{' '}
              <code className="code-pill pill-css-prop">flex-wrap: {flexWrap};</code>{' '}
              <code className="code-pill pill-css-prop">justify-content: {justifyContent};</code>{' '}
              sur <code className="code-pill pill-selector">.hebergements-cards</code> +{' '}
              <code className="code-pill pill-css-prop">width: {cardWidth};</code> sur chaque{' '}
              <code className="code-pill pill-html">&lt;a&gt;</code> +{' '}
              <code className="code-pill pill-css-prop">object-fit: {objectFit};</code> sur les images.
            </p>
          )}
        </div>

        {/* RENDU EN DIRECT DES VRAIES CARTES BOOKI DE TAG */}
        <div className="booki-live-section-box">
          <h4 className="booki-real-h2">Hébergements à Marseille</h4>
          <div
            className="booki-real-heb-grid"
            style={{
              display: 'flex',
              flexWrap: flexWrap,
              justifyContent: justifyContent,
              gap: justifyContent === 'flex-start' ? '16px' : '0px',
            }}
          >
            {HEBERGEMENTS_SAMPLE.map((item) => (
              <div
                key={item.title}
                className="booki-real-card-link"
                style={{
                  width: cardWidth,
                  flexShrink: flexWrap === 'nowrap' ? 1 : 0,
                }}
              >
                <article className="booki-real-card">
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '136px',
                      objectFit: objectFit,
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      display: 'block',
                    }}
                  />
                  <div className="booki-real-card-content">
                    <h5>{item.title}</h5>
                    <p>
                      Nuit à partir de {item.price}
                      <strong>€</strong>
                    </p>
                    <div className="booki-real-stars">
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star neutral"></i>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          LABORATOIRE 2 : LES CARTES HORIZONTALES "LES PLUS POPULAIRES"
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Laboratoire Interactif 2 • style.css (Lignes 271 à 294)
            </span>
            <h3>
              Pourquoi les cartes{' '}
              <code className="code-pill pill-selector">.populaires-cards .card</code>{' '}
              ont l&apos;image à gauche (33% / 67%)
            </h3>
          </div>
          <div className="preset-buttons">
            <button
              type="button"
              className="btn-preset danger"
              onClick={() => triggerBug(3)}
            >
              💥 Enlever <code className="code-pill pill-css-prop">display: flex</code> sur{' '}
              <code className="code-pill pill-selector">.card</code>
            </button>
            <button
              type="button"
              className="btn-preset success"
              onClick={() => fixBug(3)}
            >
              ✨ Remettre <code className="code-pill pill-css-prop">display: flex</code>
            </button>
          </div>
        </div>

        <div className="pop-explainer-split">
          <div className="pop-controls-col">
            <p>
              Dans <code className="code-pill pill-selector">.hebergements-cards</code>,
              l&apos;image est <em>au-dessus</em> du texte. Mais dans{' '}
              <code className="code-pill pill-selector">.populaires-cards .card</code>,
              Loïc a placé l&apos;image <strong>à gauche</strong> (
              <code className="code-pill pill-css-prop">width: 33%</code>) et le
              texte <strong>à droite</strong> (
              <code className="code-pill pill-css-prop">width: 67%</code>) !
            </p>
            <div className="control-group vertical">
              <label>
                <code className="code-pill pill-selector">.populaires-cards .card</code>{' '}
                <code className="code-pill pill-css-prop">display:</code>
              </label>
              <div className="segmented-btns">
                {['flex', 'block'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={popCardDisplay === val ? 'active' : ''}
                    onClick={() => setPopCardDisplay(val)}
                  >
                    <code>{val}</code>{' '}
                    {val === 'flex' ? '✅ (Image à gauche)' : '⚠️ (Image en haut)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group vertical">
              <label>
                <code className="code-pill pill-selector">.populaires-cards .card-content</code>{' '}
                <code className="code-pill pill-css-prop">justify-content:</code>
              </label>
              <div className="segmented-btns">
                {['space-between', 'flex-start'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={popContentJustify === val ? 'active' : ''}
                    onClick={() => setPopContentJustify(val)}
                  >
                    <code>{val}</code>{' '}
                    {val === 'space-between'
                      ? '✅ (Étoiles poussées en bas)'
                      : '⚠️ (Étoiles collées au prix)'}
                  </button>
                ))}
              </div>
            </div>

            <CodeBlock
              title="Ton code exact dans style.css (Lignes 271–290)"
              lang="CSS"
              code={`.populaires-cards .card {
    display: ${popCardDisplay};
    margin-top: 33px;
}
.populaires-cards img {
    width: 33%;
    height: 136px;
}
.populaires-cards .card-content {
    width: 67%;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: ${popContentJustify};
}`}
            />
          </div>

          <div className="booki-live-section-box pop-preview-box">
            <div className="pop-header-row">
              <h4 className="booki-real-h2">Les plus populaires</h4>
              <i className="fa-solid fa-chart-line" style={{ color: '#0065FC' }}></i>
            </div>
            <div className="pop-cards-stack">
              {POPULAIRES_SAMPLE.map((item) => (
                <article
                  key={item.title}
                  className="booki-real-card"
                  style={{
                    display: popCardDisplay,
                    marginTop: '16px',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: popCardDisplay === 'flex' ? '33%' : '100%',
                      height: '136px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '16px',
                      borderBottomLeftRadius:
                        popCardDisplay === 'flex' ? '16px' : '0px',
                      borderTopRightRadius:
                        popCardDisplay === 'flex' ? '0px' : '16px',
                      display: 'block',
                    }}
                  />
                  <div
                    className="booki-real-card-content"
                    style={{
                      width: popCardDisplay === 'flex' ? '67%' : '100%',
                      paddingLeft: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: popContentJustify,
                      minHeight: '130px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div>
                      <h5>{item.title}</h5>
                      <p>
                        Nuit à partir de {item.price}
                        <strong>€</strong>
                      </p>
                    </div>
                    <div className="booki-real-stars">
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star"></i>
                      <i className="fa-xs fa-solid fa-star neutral"></i>
                    </div>
                  </div>
                </article>
              ))}
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
              ? 'Étape 2 Validée ! Passer à l’Étape 3 (Spécificité CSS)'
              : 'Valider l’Étape 2 et passer à la Spécificité CSS →'}
          </button>
        </div>
      </section>
    </div>
  );
}
