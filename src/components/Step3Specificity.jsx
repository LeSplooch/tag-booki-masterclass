// ============================================================================
// FICHIER : src/components/Step3Specificity.jsx
// RÔLE : Composant de l'Étape 3 (Spécificité CSS, Sélecteurs & Bug Ligne 494).
//
// 🎓 COURS REACT POUR TAG :
// - Ce composant montre comment gérer un champ de saisie contrôlé (`<input>`)
//   en React : la valeur du champ est stockée dans `customSelector` via `useState`.
// - Tous les extraits de code petits et grands sont rendus dans des blocs
//   colorés grâce à `<CodeBlock />` et `<RichCodeText />` !
// ============================================================================

import React, { useState } from 'react';
import { SPECIFICITY_BATTLES } from '../data/courseData';
import { CodeBlock, RichCodeText } from './CodeHighlighter';

const TAG_SELECTORS_PRESETS = [
  {
    selector: '*',
    line: 'Ligne 2',
    desc: 'Sélecteur universel (applique la police Raleway partout) — vaut 0 point !',
  },
  {
    selector: 'header',
    line: 'Ligne 63',
    desc: 'Sélecteur de balise simple — vaut 1 point dans la colonne Balise.',
  },
  {
    selector: '.card',
    line: 'Ligne 39',
    desc: 'Sélecteur de classe — vaut 10 points (colonne Classe).',
  },
  {
    selector: ':required',
    line: 'Ligne 121',
    desc: 'Pseudo-classe (cible ton <input required>) — compte comme une classe (10 points) !',
  },
  {
    selector: '.button-filter:hover',
    line: 'Ligne 192',
    desc: '1 classe (.button-filter) + 1 pseudo-classe (:hover) = 2 dans la colonne Classe !',
  },
  {
    selector: '.hebergements-cards .card-title',
    line: 'Ligne 241',
    desc: '2 classes combinées par un espace (descendant) = (0, 0, 2, 0).',
  },
  {
    selector: '#menu li',
    line: 'Ligne 83',
    desc: '1 ID (#menu) + 1 balise (li) = (0, 1, 0, 1). Très fort grâce au #ID !',
  },
  {
    selector: '#menu li:hover',
    line: 'Ligne 88',
    desc: '1 ID (#menu) + 1 pseudo-classe (:hover) + 1 balise (li) = (0, 1, 1, 1).',
  },
];

function computeCssSpecificity(rawSelector) {
  const cleaned = rawSelector.trim();
  if (!cleaned || cleaned === '*') {
    return [0, 0, 0, 0];
  }
  const idMatches = cleaned.match(/#[a-zA-Z0-9_-]+/g) || [];
  const classMatches = cleaned.match(/\.[a-zA-Z0-9_-]+/g) || [];
  const pseudoClassMatches =
    cleaned.replace(/::[a-zA-Z-]+/g, '').match(/:[a-zA-Z-]+/g) || [];
  const withoutIdsClasses = cleaned
    .replace(/#[a-zA-Z0-9_-]+/g, ' ')
    .replace(/\.[a-zA-Z0-9_-]+/g, ' ')
    .replace(/::?[a-zA-Z-]+/g, ' ')
    .replace(/[>+~*]/g, ' ')
    .trim();

  const tagTokens = withoutIdsClasses
    ? withoutIdsClasses.split(/\s+/).filter(Boolean)
    : [];

  return [
    0,
    idMatches.length,
    classMatches.length + pseudoClassMatches.length,
    tagTokens.length,
  ];
}

export default function Step3Specificity({ isCompleted, onCompleteStep }) {
  const [selectedPreset, setSelectedPreset] = useState(
    TAG_SELECTORS_PRESETS[7]
  );
  const [customSelector, setCustomSelector] = useState('#menu li:hover');
  const [line494Fixed, setLine494Fixed] = useState(false);
  const [battlePicks, setBattlePicks] = useState({});

  const tuple = computeCssSpecificity(customSelector);

  return (
    <div className="step-container">
      {/* BANNIÈRE D'EXPLICATION DE LA SPÉCIFICITÉ CSS */}
      <div className="context-banner">
        <div className="context-banner-left">
          <div className="scenario-pill">
            <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
            <span>Étape 3 (10 min) • Sujet Officiel de Sarah : La Spécificité CSS</span>
          </div>
          <h2>
            La Spécificité en CSS : Comment le navigateur décide quelle règle gagne
          </h2>
          <p>
            C&apos;est l&apos;une des questions préférées de Sarah à l&apos;oral !
            Quand deux règles CSS ciblent le même élément HTML, le navigateur
            calcule un <strong>score de priorité</strong> sur 4 colonnes :{' '}
            <code className="code-pill pill-selector">
              (Style Inline, #ID, .Classe / :pseudo, Balise)
            </code>
            . Et en cas d&apos;égalité parfaite ? C&apos;est{' '}
            <strong>la dernière règle écrite</strong> tout en bas du fichier{' '}
            <code className="code-pill pill-file">style.css</code> qui gagne (la
            Cascade) !
          </p>
        </div>

        <div className="specificity-podium">
          <div className="podium-tier tier-id">
            <strong>100 pts</strong>
            <span>#ID</span>
            <code className="code-pill pill-selector">#menu, #filter</code>
          </div>
          <div className="podium-tier tier-class">
            <strong>10 pts</strong>
            <span>.Classe &amp; :pseudo</span>
            <code className="code-pill pill-selector">.card, :hover, :required</code>
          </div>
          <div className="podium-tier tier-tag">
            <strong>1 pt</strong>
            <span>Balise HTML</span>
            <code className="code-pill pill-html">header, li, a, img</code>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ATELIER 1 : CALCULATEUR DE SPÉCIFICITÉ SUR LES SÉLECTEURS DE TAG
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 1 • Analyseur de tes propres sélecteurs CSS
            </span>
            <h3>
              Clique sur un sélecteur de ton{' '}
              <code className="code-pill pill-file">style.css</code> (ou tape le tien)
            </h3>
          </div>
        </div>

        <div className="preset-chips-row">
          {TAG_SELECTORS_PRESETS.map((item) => (
            <button
              key={item.selector}
              type="button"
              className={`selector-chip ${
                customSelector === item.selector ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedPreset(item);
                setCustomSelector(item.selector);
              }}
            >
              <code className="code-pill pill-selector">{item.selector}</code>
              <small>{item.line}</small>
            </button>
          ))}
        </div>

        <div className="specificity-calculator-box">
          <div className="calc-input-col">
            <label htmlFor="css-selector-input">
              Sélecteur CSS testé :
            </label>
            <input
              id="css-selector-input"
              type="text"
              className="selector-live-input"
              value={customSelector}
              onChange={(e) => setCustomSelector(e.target.value)}
              placeholder="Ex: #menu li:hover"
            />
            {selectedPreset && selectedPreset.selector === customSelector && (
              <p className="preset-desc-note">
                <i className="fa-solid fa-circle-info" aria-hidden="true"></i>{' '}
                <strong>{selectedPreset.line} de ton style.css :</strong>{' '}
                <RichCodeText text={selectedPreset.desc} />
              </p>
            )}
          </div>

          <div className="tuple-score-grid">
            <div className="tuple-card inline-col">
              <span className="tuple-num">{tuple[0]}</span>
              <strong>Style Inline</strong>
              <code className="code-pill pill-attr">style=&quot;...&quot;</code>
            </div>
            <div className="tuple-card id-col">
              <span className="tuple-num">{tuple[1]}</span>
              <strong>#ID (×100)</strong>
              <code className="code-pill pill-selector">#menu, #search</code>
            </div>
            <div className="tuple-card class-col">
              <span className="tuple-num">{tuple[2]}</span>
              <strong>.Classe / :pseudo (×10)</strong>
              <code className="code-pill pill-selector">.card, :hover</code>
            </div>
            <div className="tuple-card tag-col">
              <span className="tuple-num">{tuple[3]}</span>
              <strong>Balise (×1)</strong>
              <code className="code-pill pill-html">header, li, img</code>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATELIER 2 : LE BUG CACHÉ DE LA LIGNE 494 (#menu .li:hover)
      ===================================================================== */}
      <section className="interactive-panel highlight-border">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 2 • Découverte importante dans ton fichier style.css !
            </span>
            <h3>
              Le petit piège de la ligne 494 :{' '}
              <code className="code-pill pill-selector">#menu .li:hover</code> vs{' '}
              <code className="code-pill pill-selector">#menu li:hover</code>
            </h3>
          </div>
          <button
            type="button"
            className={`btn-preset ${line494Fixed ? 'success' : 'danger'}`}
            onClick={() => setLine494Fixed(!line494Fixed)}
          >
            {line494Fixed ? (
              <>
                ✅ Corrigé : <code className="code-pill pill-selector">#menu li:hover</code>
              </>
            ) : (
              <>
                🔧 Cliquer pour corriger le point devant{' '}
                <code className="code-pill pill-selector">.li</code>
              </>
            )}
          </button>
        </div>

        <div className="bug494-split">
          <div className="bug494-explanation">
            <p>
              Regarde bien ton fichier{' '}
              <code className="code-pill pill-file">css/style.css</code> :
            </p>
            <ul className="clean-bullet-list">
              <li>
                <strong>Ligne 88 (Desktop) :</strong> tu as écrit{' '}
                <code className="code-pill pill-selector">#menu li:hover</code> (sans
                point). Cela cible bien les balises{' '}
                <code className="code-pill pill-html">&lt;li&gt;</code> situées dans{' '}
                <code className="code-pill pill-selector">#menu</code>.
              </li>
              <li>
                <strong>Ligne 494 (Mobile) :</strong> tu as écrit{' '}
                <code className="code-pill pill-selector">#menu .li:hover</code> avec
                un <strong>point</strong> devant{' '}
                <code className="code-pill pill-selector">.li</code> !
              </li>
              <li>
                <strong>Conséquence :</strong> en CSS, un point signifie{' '}
                <em>
                  « cherche un élément qui possède{' '}
                  <code className="code-pill pill-attr">class=&quot;li&quot;</code> »
                </em>
                . Or tes <code className="code-pill pill-html">&lt;li&gt;</code>{' '}
                n&apos;ont pas de classe{' '}
                <code className="code-pill pill-attr">class=&quot;li&quot;</code> !
              </li>
            </ul>

            <div className="code-comparison-row">
              <CodeBlock
                title="❌ Ligne 494 actuelle (Point en trop)"
                lang="CSS"
                variant="bad"
                code={`#menu .li:hover {
  border-color: #0065FC;
  color: #0065FC;
}`}
              />
              <CodeBlock
                title="✅ Ligne 494 corrigée (Sans point)"
                lang="CSS"
                variant="good"
                code={`#menu li:hover {
  border-color: #0065FC;
  color: #0065FC;
}`}
              />
            </div>
          </div>

          {/* SIMULATEUR VISUEL DU MENU MOBILE AU SURVOL */}
          <div className="mobile-menu-sim">
            <div className="mobile-sim-header">
              <span>Simulateur Menu Mobile (&lt; 768px) — Passe ta souris sur les liens !</span>
            </div>
            <div className="mobile-sim-phone">
              <img
                src="./images/logo/Booki.png"
                alt="Booki"
                style={{ height: '19px', margin: '16px auto', display: 'block' }}
              />
              <ul
                className={`sim-mobile-nav ${
                  line494Fixed ? 'fixed-hover' : 'broken-hover'
                }`}
              >
                <li>Hébergements</li>
                <li>Activités</li>
              </ul>
              <p className="sim-status-note">
                <RichCodeText
                  text={
                    line494Fixed
                      ? '🎉 Bravo ! Avec `#menu li:hover`, la bordure grise en bas devient bien bleue `#0065FC` au survol sur mobile !'
                      : '⚠️ Avec `#menu .li:hover`, la bordure du bas reste grise `#F2F2F2` sur mobile car aucune balise n’a `class="li"`.'
                  }
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATELIER 3 : LES 3 DUELS DE SPÉCIFICITÉ CSS
      ===================================================================== */}
      <section className="interactive-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              Atelier 3 • Entraînement aux questions de Sarah
            </span>
            <h3>Qui gagne le duel de priorité CSS ?</h3>
          </div>
        </div>

        <div className="challenges-grid">
          {SPECIFICITY_BATTLES.map((battle) => {
            const picked = battlePicks[battle.id];
            return (
              <div className="challenge-card" key={battle.id}>
                <div className="challenge-number">{battle.title}</div>
                <p className="challenge-q">
                  <RichCodeText text={battle.context} />
                </p>

                <div className="duel-buttons">
                  {['A', 'B'].map((letter) => {
                    const sel =
                      letter === 'A' ? battle.selectorA : battle.selectorB;
                    const isPicked = picked === letter;
                    const isCorrect = battle.winner === letter;
                    let cls = 'option-btn duel-btn';
                    if (isPicked) {
                      cls += isCorrect ? ' correct' : ' wrong';
                    }
                    return (
                      <button
                        key={letter}
                        type="button"
                        className={cls}
                        onClick={() =>
                          setBattlePicks((prev) => ({
                            ...prev,
                            [battle.id]: letter,
                          }))
                        }
                      >
                        <span className="option-letter">{letter}</span>
                        <div className="duel-code-wrap">
                          <code className="code-pill pill-selector">{sel.code}</code>
                          {picked && (
                            <small className="duel-score-tag">
                              Score : ({sel.tuple.join(', ')}) — {sel.explanation}
                            </small>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {picked && (
                  <div
                    className={`feedback-banner ${
                      picked === battle.winner ? 'success' : 'error'
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        picked === battle.winner
                          ? 'fa-circle-check'
                          : 'fa-lightbulb'
                      }`}
                      aria-hidden="true"
                    ></i>
                    <span>
                      <RichCodeText text={battle.why} />
                    </span>
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
              ? 'Étape 3 Validée ! Passer à l’Étape 4 (Responsive)'
              : 'Valider l’Étape 3 et passer au Responsive Design →'}
          </button>
        </div>
      </section>
    </div>
  );
}
