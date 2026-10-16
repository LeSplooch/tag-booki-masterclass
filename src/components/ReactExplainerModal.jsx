// ============================================================================
// FICHIER : src/components/ReactExplainerModal.jsx
// RÔLE : Fenêtre modale pédagogique « Comment ce site est codé en React ? »
//        spécialement conçue pour que Tag puisse apprendre dans un second temps
//        comment cette application interactive a été fabriquée !
// ============================================================================

import React from 'react';
import { CodeBlock } from './CodeHighlighter';

export default function ReactExplainerModal({ isOpen, onClose }) {
  // En React, si un composant retourne `null`, il n'affiche rien du tout à l'écran !
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="react-guide-title"
      >
        <div className="modal-header">
          <div>
            <span className="panel-kicker">
              Bonus Développeuse • Dans les coulisses de ce site
            </span>
            <h3 id="react-guide-title">
              Comment cette Web App est codée en React (Guide pour Tag)
            </h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            ✕ Fermer
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-intro">
            Maintenant que tu maîtrises <strong>HTML &amp; CSS</strong> avec
            Booki, tu as déjà fait 70% du chemin vers <strong>React</strong> !
            Tous les fichiers de ce site (dans le dossier{' '}
            <code className="code-pill pill-file">src/</code> du dépôt GitHub)
            sont remplis de commentaires pour débutants. Voici les 4 concepts
            clés utilisés pour construire ce site :
          </p>

          <div className="react-concepts-grid">
            <div className="react-concept-card">
              <div className="concept-badge">1. Les Composants (.jsx)</div>
              <h4>Découper l&apos;interface en briques Lego réutilisables</h4>
              <p>
                Dans Booki, tu as copié-collé 6 fois le HTML de{' '}
                <code className="code-pill pill-html">
                  &lt;article class=&quot;card&quot;&gt;
                </code>
                . En React, on crée une fonction{' '}
                <code className="code-pill pill-selector">
                  function HotelCard(props)
                </code>{' '}
                une seule fois, et elle génère le HTML automatiquement !
              </p>
              <CodeBlock
                title="Exemple de composant React (.jsx)"
                lang="JSX"
                variant="compact"
                code={`// Un composant React est juste une fonction qui retourne du HTML (JSX) :
function HotelCard({ title, price }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>Nuit à partir de {price}€</p>
    </article>
  );
}`}
              />
            </div>

            <div className="react-concept-card">
              <div className="concept-badge">2. L&apos;État (useState)</div>
              <h4>Donner une mémoire interactive à la page</h4>
              <p>
                Quand tu cliques sur une étape ou que tu changes{' '}
                <code className="code-pill pill-css-prop">flex-wrap: wrap</code>{' '}
                dans le laboratoire, React utilise{' '}
                <code className="code-pill pill-selector">useState</code> pour
                mémoriser ton choix et mettre à jour l&apos;écran instantanément
                sans recharger la page.
              </p>
              <CodeBlock
                title="src/App.jsx — Hook useState"
                lang="JSX"
                variant="compact"
                code={`import { useState } from 'react';

// activeStep vaut 1 au départ. setActiveStep permet de le modifier :
const [activeStep, setActiveStep] = useState(1);`}
              />
            </div>

            <div className="react-concept-card">
              <div className="concept-badge">3. Les Listes (.map)</div>
              <h4>Générer plusieurs cartes à partir d&apos;un tableau de données</h4>
              <p>
                Dans{' '}
                <code className="code-pill pill-file">src/data/courseData.js</code>
                , on a rangé les 6 étapes et les 7 questions de Sarah dans des
                tableaux JavaScript. Ensuite,{' '}
                <code className="code-pill pill-selector">.map()</code> transforme
                chaque élément en carte visuelle.
              </p>
              <CodeBlock
                title="Rendu dynamique avec .map()"
                lang="JSX"
                variant="compact"
                code={`{STEPS_LIST.map((step) => (
  <button key={step.id} onClick={() => setActiveStep(step.id)}>
    {step.shortTitle}
  </button>
))}`}
              />
            </div>

            <div className="react-concept-card">
              <div className="concept-badge">4. Structure des fichiers du repo</div>
              <h4>Par quel fichier commencer ta lecture du code ?</h4>
              <ul className="clean-bullet-list">
                <li>
                  <code className="code-pill pill-file">index.html</code> :
                  Contient l&apos;unique{' '}
                  <code className="code-pill pill-html">
                    &lt;div id=&quot;root&quot;&gt;
                  </code>
                  .
                </li>
                <li>
                  <code className="code-pill pill-file">src/main.jsx</code> :
                  Démarre React et affiche{' '}
                  <code className="code-pill pill-html">&lt;App /&gt;</code>.
                </li>
                <li>
                  <code className="code-pill pill-file">src/App.jsx</code> : Gère
                  la barre de navigation des 6 étapes et ta progression
                  sauvegardée dans{' '}
                  <code className="code-pill pill-selector">localStorage</code>.
                </li>
                <li>
                  <code className="code-pill pill-file">
                    src/components/Step1..Step6.jsx
                  </code>{' '}
                  : Les 6 ateliers interactifs !
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
