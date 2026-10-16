// ============================================================================
// FICHIER : src/components/CodeHighlighter.jsx
// RÔLE : Composant utilitaire qui transforme TOUS les bouts de code du site :
//        1. Les grands blocs de code (<CodeBlock />) avec coloration syntaxique
//           complète façon VS Code (balises roses, attributs bleus, valeurs vertes,
//           sélecteurs dorés, commentaires gris italiques).
//        2. Les petits bouts de code au milieu des phrases (<RichCodeText />)
//           en petits badges colorés (code pills) selon leur nature :
//           - Balise HTML (<header>, <article>) -> Badge Rose/Corail
//           - Sélecteur / Classe (.card, #menu li:hover) -> Badge Ambre/Or
//           - Propriété CSS (display: flex, order: 2) -> Badge Bleu Ciel
//           - Fichier / Attribut (index.html, style.css) -> Badge Émeraude/Violet
// ============================================================================

import React from 'react';

// ============================================================================
// 1. COLORATION SYNTAXIQUE D'UNE LIGNE DE CODE (GRANDS CODE BLOCKS)
// ============================================================================
export function highlightCodeLine(line) {
  if (!line) return '\u00A0';

  // Si toute la ligne est un commentaire CSS, HTML ou JS
  const trimmed = line.trim();
  if (
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('<!--') ||
    trimmed.startsWith('•')
  ) {
    return <span className="tok-comment">{line}</span>;
  }

  // Coloration pour une ligne HTML (contient < et >)
  if (line.includes('<') && line.includes('>')) {
    // Découpe les balises HTML <...> et le texte autour
    const parts = line.split(/(<[^>]+>)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('<!--')) {
        return (
          <span key={idx} className="tok-comment">
            {part}
          </span>
        );
      }
      if (part.startsWith('<') && part.endsWith('>')) {
        // Colorie l'intérieur de la balise : nom de balise + attributs + valeurs "..."
        const tagMatch = part.match(/^(\/?<+\/?[a-zA-Z0-9-]+)(.*?)(\/?>)$/);
        if (!tagMatch) {
          return (
            <span key={idx} className="tok-tag">
              {part}
            </span>
          );
        }
        const [, openTag, attrString, closeBracket] = tagMatch;
        const attrTokens = attrString.split(/([a-zA-Z0-9_-]+="[^"]*"|[a-zA-Z0-9_-]+=[^\s>]+)/g);
        return (
          <span key={idx}>
            <span className="tok-tag">{openTag}</span>
            {attrTokens.map((at, aIdx) => {
              if (at.includes('=')) {
                const eqIdx = at.indexOf('=');
                const attrName = at.slice(0, eqIdx);
                const attrVal = at.slice(eqIdx + 1);
                return (
                  <span key={aIdx}>
                    <span className="tok-attr">{attrName}</span>
                    <span className="tok-punct">=</span>
                    <span className="tok-string">{attrVal}</span>
                  </span>
                );
              }
              return (
                <span key={aIdx} className="tok-attr">
                  {at}
                </span>
              );
            })}
            <span className="tok-tag">{closeBracket}</span>
          </span>
        );
      }
      return (
        <span key={idx} className="tok-plain">
          {part}
        </span>
      );
    });
  }

  // Coloration pour une ligne CSS avec propriété : valeur;
  if (line.includes(':') && !line.trim().endsWith('{')) {
    const colonIdx = line.indexOf(':');
    const propPart = line.slice(0, colonIdx);
    const valPart = line.slice(colonIdx + 1);
    return (
      <span>
        <span className="tok-prop">{propPart}</span>
        <span className="tok-punct">:</span>
        <span className="tok-val">{valPart}</span>
      </span>
    );
  }

  // Ligne de sélecteur CSS ou @media (contient { ou })
  if (line.includes('{') || line.includes('}') || line.trim().startsWith('@media')) {
    return <span className="tok-selector">{line}</span>;
  }

  return <span className="tok-plain">{line}</span>;
}

// ============================================================================
// 2. COMPOSANT <CodeBlock /> (POUR TOUS LES GRANDS BLOCS DE CODE)
// ============================================================================
export function CodeBlock({
  code,
  title,
  lang = 'CODE',
  variant = 'default', // 'default' | 'bad' | 'good' | 'compact'
  showLineNumbers = true,
}) {
  const lines = (code || '').split('\n');

  return (
    <div className={`colored-code-block variant-${variant}`}>
      {title && (
        <div className="ccb-header">
          <div className="ccb-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="ccb-title">{title}</span>
          <span className="ccb-lang-badge">{lang}</span>
        </div>
      )}
      <pre className="ccb-pre" tabIndex="0">
        <code>
          {lines.map((line, i) => (
            <div className="ccb-line" key={i}>
              {showLineNumbers && (
                <span className="ccb-line-num">{i + 1}</span>
              )}
              <span className="ccb-line-content">{highlightCodeLine(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

// ============================================================================
// 3. COMPOSANT <RichCodeText /> (POUR TRANSFORMER TOUS LES BOUTS DE CODE
//    DANS LES TEXTES EN PETITS CODE BLOCKS COLORÉS AUTOMATIQUEMENT !)
// ============================================================================

// Expression régulière qui repère tous les bouts de code dans une phrase en français :
// - Texte entouré de backticks `...`
// - Balises HTML comme <header>, <article class="card">, <h1>, <div>, etc.
// - Règles @media (...)
// - Propriétés CSS fréquentes (display: flex, flex-wrap: wrap, order: 2, width: 100%, etc.)
// - Sélecteurs CSS (#menu .li:hover, #menu li:hover, .hebergements-and-populaires, :required, :hover, :root, etc.)
// - Noms de fichiers (index.html, css/style.css, style.css, validator.w3.org, jigsaw.w3.org/css-validator)
// - Codes couleurs Hex (#0065FC, #F2F2F2, #DEEBFF)
const CODE_TOKEN_REGEX =
  /(`[^`]+`|<\/?[a-zA-Z0-9-]+(?:\s+[^>]*)?>|@media\s*\([^)]+\)|(?:display|flex-wrap|flex-direction|justify-content|align-items|object-fit|box-sizing|background-color|border-top|border-bottom|border-color|border-radius|max-width|max-height|width|height|padding|gap|order|font-size|font-family|color)\s*:\s*[a-zA-Z0-9#.% -]+;?|(?:aria-hidden|class|href|id|for|style|type|name|value)=["']?[^\s"',.)]+["']?|#menu\s+\.?li(?::hover)?|#search\s+input(?::required)?|\.[a-zA-Z][a-zA-Z0-9_-]*(?:\s+\.[a-zA-Z][a-zA-Z0-9_-]*)*(?::hover)?|#[a-zA-Z][a-zA-Z0-9_-]*(?:\s+[a-zA-Z0-9._:-]+)?|:(?:root|required|hover)|(?:css\/)?style\.css|index\.html|\.vscode\/settings\.json|validator\.w3\.org|jigsaw\.w3\.org(?:\/css-validator)?|#[0-9A-Fa-f]{6}\b|\b(?:F12|Ctrl\+S|localStorage|useState|useEffect)\b)/g;

function getPillCategory(rawToken) {
  const token = rawToken.replace(/^`|`$/g, '');
  if (token.startsWith('<') && token.endsWith('>')) {
    return 'pill-html'; // Rose/Corail pour les balises HTML
  }
  if (
    token.includes(':') &&
    !token.startsWith(':') &&
    !token.includes('hover') &&
    !token.includes('required')
  ) {
    return 'pill-css-prop'; // Bleu ciel pour les propriétés CSS (ex: display: flex)
  }
  if (
    token.startsWith('.') ||
    token.startsWith('#') ||
    token.startsWith(':') ||
    token.startsWith('@media')
  ) {
    return 'pill-selector'; // Or/Ambre pour les sélecteurs CSS (.card, #menu, @media)
  }
  if (
    token.endsWith('.html') ||
    token.endsWith('.css') ||
    token.endsWith('.json') ||
    token.includes('w3.org')
  ) {
    return 'pill-file'; // Émeraude pour les fichiers et outils
  }
  return 'pill-attr'; // Violet pour les attributs et mots-clés techniques
}

export function RichCodeText({ text }) {
  if (!text || typeof text !== 'string') return text;

  const parts = text.split(CODE_TOKEN_REGEX);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        // Vérifie si ce fragment correspond à notre regex de code
        CODE_TOKEN_REGEX.lastIndex = 0;
        if (CODE_TOKEN_REGEX.test(part)) {
          const cleanText = part.replace(/^`|`$/g, '');
          const pillClass = getPillCategory(part);
          return (
            <code key={idx} className={`code-pill ${pillClass}`}>
              {cleanText}
            </code>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}
