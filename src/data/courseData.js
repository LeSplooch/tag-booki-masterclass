// ============================================================================
// FICHIER : src/data/courseData.js
// RÔLE : Ce fichier centralise toutes les données pédagogiques de l'application :
//        - La liste des 6 étapes du programme d'entraînement (1 heure)
//        - Les zones du scanner "Rayons X" de la maquette Booki
//        - Les défis interactifs (HTML sémantique, Flexbox, Spécificité, Responsive)
//        - L'analyse ligne par ligne du vrai code de Tag (index.html et style.css)
//        - Les 5 corrections W3C / qualité de code repérées dans son fichier zip
//        - Les questions officielles de Sarah (la CTO jouée par l'évaluateur)
//
// POURQUOI SÉPARER LES DONNÉES DU CODE VISUEL ?
// En React, on sépare souvent les données (le texte, les questions, le code)
// des composants visuels (les boutons, les cartes). C'est exactement le même
// principe que séparer le HTML (le fond) et le CSS (la forme) !
// ============================================================================

export const STEPS_LIST = [
  {
    id: 1,
    shortTitle: '1. Découpe & HTML',
    title: 'Découpe de la Maquette & Web Sémantique',
    duration: '10 min',
    timeRange: '00:00 – 10:00',
    icon: 'fa-solid fa-layer-group',
    badge: 'Squelette HTML5',
    summary:
      "Comprendre le scénario Booki (Sarah CTO & Loïc UI Designer), découper la maquette Figma en boîtes logiques et maîtriser toutes les balises sémantiques de ton fichier index.html.",
  },
  {
    id: 2,
    shortTitle: '2. Flexbox & Cartes',
    title: 'Le Moteur Flexbox & Les Cartes Booki',
    duration: '12 min',
    timeRange: '10:00 – 22:00',
    icon: 'fa-solid fa-table-columns',
    badge: 'Mise en page CSS',
    summary:
      "Manipuler en direct Flexbox sur tes vraies sections Hébergements et Populaires, comprendre pourquoi HTML et CSS sont séparés, et maîtriser object-fit: cover.",
  },
  {
    id: 3,
    shortTitle: '3. Spécificité & Filtres',
    title: 'Spécificité CSS, Sélecteurs & Recherche',
    duration: '10 min',
    timeRange: '22:00 – 32:00',
    icon: 'fa-solid fa-sliders',
    badge: 'Règles & Priorités',
    summary:
      "Comprendre comment le navigateur calcule quel style gagne (Balise vs .Classe vs #ID), analyser ta barre de recherche et tes filtres, et corriger le bug caché de la ligne 494.",
  },
  {
    id: 4,
    shortTitle: '4. Responsive & Mobile',
    title: 'Responsive Design & Media Queries',
    duration: '10 min',
    timeRange: '32:00 – 42:00',
    icon: 'fa-solid fa-mobile-screen-button',
    badge: 'Desktop • Tablette • Mobile',
    summary:
      "Tester ton site aux 3 tailles d'écran (1440px, 1024px, 767.98px), comprendre l'inversion d'ordre avec order: 2 sur mobile et la transformation du bouton Rechercher en loupe.",
  },
  {
    id: 5,
    shortTitle: '5. Code Ligne par Ligne',
    title: 'Maîtrise Ligne par Ligne & Audit W3C',
    duration: '8 min',
    timeRange: '42:00 – 50:00',
    icon: 'fa-solid fa-magnifying-glass-code',
    badge: 'Zéro zone d’ombre',
    summary:
      "Explorer ton vrai code index.html et style.css bloc par bloc avec explications en français simple, et passer ton code au scanner W3C pour connaître les 5 micro-détails à surveiller.",
  },
  {
    id: 6,
    shortTitle: '6. Grand Oral (Sarah)',
    title: 'Simulation de Soutenance face à Sarah (CTO)',
    duration: '10 min',
    timeRange: '50:00 – 60:00',
    icon: 'fa-solid fa-graduation-cap',
    badge: 'Soutenance 30 min',
    summary:
      "Répéter ton plan de présentation de 15 minutes avec chronomètre et t'entraîner aux 7 sujets de questions officielles de Sarah pour décrocher le 100% à l'oral.",
  },
];

// ============================================================================
// ÉTAPE 1 : ZONES DU SCANNER RAYONS-X (DÉCOUPE DE LA MAQUETTE BOOKI)
// ============================================================================
export const XRAY_ZONES = [
  {
    id: 'main-container',
    tag: '<div class="main-container">',
    linesHtml: 'Lignes 18 à 303',
    linesCss: 'Lignes 22 à 27',
    title: 'Le Conteneur Principal (.main-container)',
    role: 'Enveloppe globale qui limite la largeur maximale du site à 1440px et ajoute 50px de marge intérieure (padding) à gauche et à droite.',
    whyThisTag:
      "On utilise une <div> car ce n'est qu'un conteneur de mise en page (layout wrapper). Le <body> juste au-dessus est en display: flex et justify-content: center pour centrer ce conteneur sur les très grands écrans !",
    sarahTip:
      'Si Sarah demande : "Que se passe-t-il sur un écran géant de 2500px ?", réponds : "Grâce à max-width: 1440px sur .main-container et display: flex; justify-content: center sur body, le site reste centré et ne s’étire pas à l’infini."',
    codeSnippet: `/* style.css (Lignes 16-27) */
body {
    display: flex;
    justify-content: center;
    margin-top: 0;
}
.main-container {
    width: 100%;
    max-width: 1440px;
    padding: 0 50px;
    box-sizing: border-box;
}`,
  },
  {
    id: 'header',
    tag: '<header> + <nav> + <ul id="menu">',
    linesHtml: 'Lignes 19 à 27',
    linesCss: 'Lignes 63 à 91',
    title: "L'En-tête et la Navigation (<header> & <nav>)",
    role: "Contient le logo Booki à gauche et le menu de navigation (Hébergements / Activités) à droite avec des liens d'ancrage (#hebergements-link et #activities-link).",
    whyThisTag:
      "<header> indique l'en-tête de la page, <nav> indique la navigation principale aux lecteurs d'écran et à Google, et <ul><li> structure les liens sous forme de liste.",
    sarahTip:
      'Montre à Sarah comment tes liens <a href="#hebergements-link"> font défiler la page directement jusqu’à l’élément qui possède id="hebergements-link" ! Et explique l’astuce de la bordure blanche en haut de #menu li qui devient bleue (#0065FC) au :hover sans faire sauter le texte.',
    codeSnippet: `<!-- index.html (Lignes 19-27) -->
<header>
    <img class="logo" src="images/logo/Booki.png" alt="logo Booki">
    <nav>                
        <ul id="menu">
            <li><a href="#hebergements-link">Hébergements</a></li>
            <li><a href="#activities-link">Activités</a></li>
        </ul>
    </nav>
</header>`,
  },
  {
    id: 'search-filter',
    tag: '<section class="filter-title">',
    linesHtml: 'Lignes 29 à 57',
    linesCss: 'Lignes 94 à 195',
    title: 'Titre Principal (<h1>), Recherche & Filtres',
    role: "Regroupe l'unique titre <h1> de la page, le formulaire de recherche de ville (<form>), la barre de 4 filtres thématiques et la bulle d'info.",
    whyThisTag:
      "<h1> est unique sur toute la page car c'est le sujet principal pour le référencement (SEO). Le formulaire utilise <form>, <label>, <input type=\"text\" required> et <button type=\"submit\">.",
    sarahTip:
      'Dans le bouton Rechercher, tu as mis à la fois l’icône loupe (<i class="fa-magnifying-glass">) ET le texte (<span class="button-text">Rechercher</span>). Sur ordinateur la loupe est en display: none, et sur mobile (<768px) c’est le texte qui passe en display: none et la loupe en display: block !',
    codeSnippet: `<!-- index.html (Lignes 33-40) -->
<form>
    <label><i class="fa-solid fa-location-dot"></i></label>                
    <input type="text" name="rechercher" value="Marseille, France" required>
    <button type="submit" class="button" value="Rechercher">
        <i class="fa-solid fa-magnifying-glass"></i>
        <span class="button-text">Rechercher</span>
    </button>
</form>`,
  },
  {
    id: 'hebergements-populaires',
    tag: '<div class="hebergements-and-populaires">',
    linesHtml: 'Lignes 58 à 245',
    linesCss: 'Lignes 197 à 295',
    title: 'Le Duo Hébergements (65%) & Populaires (32%)',
    role: 'Met côte à côte sur ordinateur les deux grandes sections grises : "Hébergements à Marseille" à gauche et "Les plus populaires" à droite.',
    whyThisTag:
      "La <div> parente sert de conteneur Flexbox (display: flex; justify-content: space-between). À l'intérieur, chacun des deux blocs est une vraie <section> avec son propre titre <h2>.",
    sarahTip:
      'Chaque carte d’hôtel est enveloppée dans une balise <a href="#"> qui contient un <article class="card">. Cela rend toute la carte cliquable d’un seul coup ! Et pour les étoiles, aria-hidden="true" cache les 5 icônes aux aveugles tandis que <span class="sr-only">Note de 4 sur 5</span> lit la note clairement.',
    codeSnippet: `/* style.css (Lignes 197-207, 250, 261) */
.hebergements-and-populaires {
    display: flex;
    justify-content: space-between;
}
.hebergements { width: 65%; }
.populaires   { width: 32%; }`,
  },
  {
    id: 'activites',
    tag: '<section> Activités à Marseille',
    linesHtml: 'Lignes 246 à 276',
    linesCss: 'Lignes 297 à 336',
    title: 'Section Activités à Marseille (4 Grandes Cartes)',
    role: 'Affiche les 4 activités phares de Marseille (Vieux-Port, Fort de Pomègues, Calanques, Notre-Dame-de-la-Garde) sur une ligne en Flexbox.',
    whyThisTag:
      'Une <section> dédiée avec un titre <h2 id="activities-link"> (cible du lien du menu) et un conteneur .activities-cards en display: flex.',
    sarahTip:
      'Explique que les images des activités ont une hauteur fixe (height: 380px sur desktop, max-height: 200px sur tablette, 141px sur mobile) combinée à object-fit: cover pour qu’elles gardent toutes exactement la même taille sans jamais être écrasées.',
    codeSnippet: `/* style.css (Lignes 313-324) */
.high-card img {
    width: 100%;
    height: 380px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    object-fit: cover;
}
.activities-cards {
    display: flex;
    justify-content: space-between;
}`,
  },
  {
    id: 'footer',
    tag: '<footer>',
    linesHtml: 'Lignes 279 à 302',
    linesCss: 'Lignes 339 à 365',
    title: 'Le Pied de Page (<footer> en 3 colonnes)',
    role: 'Regroupe les liens utiles en 3 colonnes : "À propos", "Nos hébergements" et "Assistance".',
    whyThisTag:
      'La balise sémantique <footer> indique la fin du document. Chaque colonne possède un sous-titre <h3> et une liste de liens <ul><li><a>.',
    sarahTip:
      'Sur ordinateur et tablette, footer est en display: flex (les 3 colonnes sont côte à côte). Sur mobile (<768px), il passe en flex-direction: column (ligne 613 de style.css) pour empiler les 3 blocs verticalement !',
    codeSnippet: `/* style.css (Lignes 339-345 & 612-614) */
footer {
    display: flex;
    justify-content: space-between;
    background-color: var(--main-bg-color);
    margin-top: 30px;
}
/* Dans @media (max-width: 767.98px) : */
footer { flex-direction: column; }`,
  },
];

// ============================================================================
// ÉTAPE 1 : QUIZ / EXERCICE INTERACTIF DE DÉCOUPE & SÉMANTIQUE
// ============================================================================
export const SEMANTIC_CHALLENGES = [
  {
    id: 'sem-1',
    question:
      "Dans ton fichier index.html (ligne 63), chaque carte d'hôtel est entourée par une balise sémantique précise à l'intérieur du lien <a href=\"#\">. Laquelle et pourquoi ?",
    options: [
      {
        label: '<article class="card"> — Car chaque carte d’hôtel est un contenu autonome et indépendant',
        correct: true,
        feedback:
          'Exactement ! En HTML5, <article> représente un composant autonome (une carte produit, un hôtel, un billet de blog) qui a du sens même tout seul.',
      },
      {
        label: '<section class="card"> — Car on met des sections partout dès qu’il y a une boîte',
        correct: false,
        feedback:
          'Attention ! <section> sert aux grandes parties thématiques de la page (ex: toute la zone Hébergements), tandis que chaque carte individuelle est un <article>.',
      },
      {
        label: '<aside class="card"> — Car les cartes sont sur le côté',
        correct: false,
        feedback:
          'Non, <article class="card"> est la balise utilisée dans ton code (ligne 63) car chaque hôtel est une entité autonome.',
      },
    ],
  },
  {
    id: 'sem-2',
    question:
      'Regarde les lignes 71 à 76 de ton index.html (les étoiles de notation). Pourquoi y a-t-il aria-hidden="true" sur les étoiles <i> ET un <span class="sr-only">Note de 4 sur 5</span> ?',
    options: [
      {
        label:
          "Pour l'accessibilité : le lecteur d'écran des personnes malvoyantes ignore les 5 icônes décoratives et lit la phrase claire « Note de 4 sur 5 »",
        correct: true,
        feedback:
          'Bravo ! Sans ça, un lecteur d’écran lirait 5 fois « icône étoile » sans même savoir que la 5e est grise (.neutral-star). C’est un point que Sarah adore à l’oral !',
      },
      {
        label: 'Pour afficher une infobulle quand on passe la souris sur les étoiles',
        correct: false,
        feedback:
          'Non ! La classe .sr-only signifie "Screen Reader Only" (uniquement pour les lecteurs d’écran).',
      },
      {
        label: 'Pour empêcher Google de voir les notes des hôtels',
        correct: false,
        feedback:
          'Au contraire, cela aide les technologies d’assistance à comprendre la vraie note texte (« Note de 4 sur 5 »).',
      },
    ],
  },
  {
    id: 'sem-3',
    question:
      'Comment est organisée la hiérarchie des titres (<h1>, <h2>, <h3>) dans ton fichier index.html ?',
    options: [
      {
        label:
          'Un seul <h1> (Trouvez votre hébergement...), puis des <h2> pour les grandes sections (Hébergements, Populaires, Activités), et des <h3> pour les noms des hôtels et colonnes du footer',
        correct: true,
        feedback:
          'Parfait ! On ne saute jamais de niveau (pas de h1 vers h4) et on garde un seul <h1> par page pour que Google et les lecteurs d’écran comprennent le plan du site.',
      },
      {
        label: 'Plusieurs <h1> pour chaque titre important qui doit être écrit en gros',
        correct: false,
        feedback:
          'Surtout pas ! On ne choisit jamais une balise de titre pour sa taille visuelle (c’est le rôle du CSS avec font-size), mais pour son importance dans le plan de la page.',
      },
      {
        label: 'Uniquement des <h2> et des <p class="title">',
        correct: false,
        feedback:
          'Non, ta page respecte bien la hiérarchie h1 -> h2 -> h3 !',
      },
    ],
  },
];

// ============================================================================
// ÉTAPE 3 : DUELS DE SPÉCIFICITÉ CSS (BASÉS SUR LE CODE DE TAG)
// ============================================================================
export const SPECIFICITY_BATTLES = [
  {
    id: 'spec-1',
    title: 'Duel 1 : La couleur des icônes FontAwesome',
    context:
      'Ligne 12 de ton style.css, tu écris .fa-solid { color: var(--main-color); } (bleu). Mais pour l’icône de localisation (ligne 111), tu veux qu’elle soit noire !',
    selectorA: {
      code: 'i { color: blue; }',
      tuple: [0, 0, 0, 1],
      explanation: 'Sélecteur de balise (1 point)',
    },
    selectorB: {
      code: '.fa-location-dot { color: black; }',
      tuple: [0, 0, 1, 0],
      explanation: 'Sélecteur de classe (10 points)',
    },
    winner: 'B',
    why: 'Une classe (.fa-location-dot = 10 pts) bat toujours une simple balise (i = 1 pt). Dans ton code, .fa-solid et .fa-location-dot ont tous les deux 1 classe (10 pts), mais .fa-location-dot est écrit ligne 111 (plus bas que ligne 12), donc il gagne grâce à la Cascade !',
  },
  {
    id: 'spec-2',
    title: 'Duel 2 : La taille du titre des cartes (.card-title)',
    context:
      'Ligne 50, .card-title a font-size: 16px. Sur tablette (ligne 402), tu veux réduire uniquement les titres de la section Hébergements à 14px.',
    selectorA: {
      code: '.card-title { font-size: 16px; }',
      tuple: [0, 0, 1, 0],
      explanation: '1 classe = (0, 0, 1, 0)',
    },
    selectorB: {
      code: '.hebergements-cards .card-title { font-size: 14px; }',
      tuple: [0, 0, 2, 0],
      explanation: '2 classes combinées = (0, 0, 2, 0)',
    },
    winner: 'B',
    why: 'En combinant deux classes (.hebergements-cards .card-title), la spécificité monte à (0, 0, 2, 0), ce qui bat la classe seule .card-title (0, 0, 1, 0) !',
  },
  {
    id: 'spec-3',
    title: 'Duel 3 : Le sélecteur #menu li vs .menu-item',
    context:
      'Ligne 83 de ton style.css, tu utilises #menu li pour styliser les éléments du menu de navigation.',
    selectorA: {
      code: '#menu li { border-top: solid 2px white; }',
      tuple: [0, 1, 0, 1],
      explanation: '1 ID (#menu) + 1 balise (li) = (0, 1, 0, 1)',
    },
    selectorB: {
      code: 'nav ul li { border-top: none; }',
      tuple: [0, 0, 0, 3],
      explanation: '3 balises = (0, 0, 0, 3)',
    },
    winner: 'A',
    why: 'Un seul #ID (colonne des centaines : 100 pts) bat n’importe quel nombre de classes ou de balises ! C’est pour cela qu’en CSS, on utilise les #id avec parcimonie car ils sont très difficiles à écraser ensuite.',
  },
];

// ============================================================================
// ÉTAPE 5 : AUDIT W3C & EXPLORATION LIGNE PAR LIGNE DU CODE DE TAG
// ============================================================================
export const W3C_AUDIT_ITEMS = [
  {
    id: 'bug-1',
    severity: 'important',
    badge: 'Piège CSS Mobile — Ligne 494',
    file: 'css/style.css (Ligne 494)',
    title: 'Le point en trop dans #menu .li:hover sur Mobile',
    wrongCode: `/* style.css - Ligne 494 (dans @media max-width: 767.98px) */
#menu .li:hover {
    border-color: #0065FC;
    color: #0065FC;
}`,
    fixedCode: `/* Correction : enlever le point devant li ! */
#menu li:hover {
    border-color: #0065FC;
    color: #0065FC;
}`,
    explanation:
      'En version Desktop (ligne 88), tu as bien écrit `#menu li:hover` (cible la balise `<li>`). Mais en version Mobile (ligne 494), tu as écrit `#menu .li:hover` avec un point ! Le navigateur cherche donc un élément avec `class="li"` qui n’existe pas dans ton HTML.',
    whatToSayToSarah:
      'Si Sarah te demande pourquoi le survol du menu mobile ou une règle CSS ne s’applique pas, montre-lui que `.li` cherche une classe alors que `li` sans point cible la balise HTML `<li>` !',
  },
  {
    id: 'bug-2',
    severity: 'w3c',
    badge: 'Syntaxe HTML — Lignes 281, 289, 296',
    file: 'index.html (Lignes 281, 289, 296)',
    title: 'Guillemets oubliés autour de class="footer-title"',
    wrongCode: `<!-- index.html - Lignes 281, 289, 296 -->
<h3 class=footer-title>A propos</h3>`,
    fixedCode: `<!-- Correction propre avec guillemets : -->
<h3 class="footer-title">A propos</h3>`,
    explanation:
      'Dans les 3 colonnes du `<footer>`, l’attribut `class=footer-title` est écrit sans guillemets. Même si HTML5 le tolère quand il n’y a qu’un seul mot sans espace, c’est une excellente remarque à faire toi-même pendant la revue de code pour montrer ta rigueur !',
    whatToSayToSarah:
      '"J’ai remarqué dans mon footer que j’avais omis les guillemets sur `class=footer-title`. Le validateur W3C l’accepte car il n’y a qu’une seule classe sans espace, mais par bonne pratique je mets toujours les doubles guillemets."',
  },
  {
    id: 'bug-3',
    severity: 'a11y',
    badge: 'Accessibilité Formulaire — Lignes 34-35',
    file: 'index.html (Lignes 34–35)',
    title: 'Lier le <label> au champ <input> avec for et id',
    wrongCode: `<!-- index.html - Lignes 34-35 -->
<label><i class="fa-solid fa-location-dot"></i></label>                
<input type="text" name="rechercher" value="Marseille, France" required>`,
    fixedCode: `<!-- Version 100% accessible : -->
<label for="ville-recherche" aria-label="Ville de recherche">
    <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
</label>                
<input id="ville-recherche" type="text" name="rechercher" value="Marseille, France" required>`,
    explanation:
      'Pour qu’un `<label>` soit associé à son `<input>` (et qu’un clic sur l’icône GPS place le curseur dans le champ texte), on relie `<label for="ville-recherche">` à `<input id="ville-recherche">`.',
    whatToSayToSarah:
      '"Pour améliorer encore l’accessibilité du formulaire, on peut lier le `<label>` à l’`<input>` grâce au couple d’attributs `for` et `id`."',
  },
  {
    id: 'bug-4',
    severity: 'architecture',
    badge: 'Sélecteur CSS — Ligne 121',
    file: 'css/style.css (Ligne 121)',
    title: 'La pseudo-classe :required utilisée pour styliser l’input',
    wrongCode: `/* style.css - Ligne 121 */
:required {
    color: black;
    font-weight: bold;
    text-align: center;
    border: solid 1px #F2F2F2;
    padding: 15px 0px 15px 0px;
    font-size: 17px;
}`,
    fixedCode: `/* Plus ciblé pour éviter d'impacter d'autres formulaires futurs : */
#search input:required {
    color: black;
    font-weight: bold;
    text-align: center;
    border: solid 1px #F2F2F2;
    padding: 15px 0;
    font-size: 17px;
}`,
    explanation:
      'Dans ton `style.css` ligne 121, tu as utilisé `:required` pour styliser ton `<input type="text" ... required>`. C’est malin et ça fonctionne car il n’y a qu’un seul champ `required` sur la page ! Mais il faut absolument savoir expliquer à Sarah que `:required` cible cet `<input>` parce qu’il possède l’attribut HTML `required` (ligne 35).',
    whatToSayToSarah:
      '"J’ai utilisé la pseudo-classe `:required` ligne 121 qui cible mon `<input required>` de la barre de recherche. Si le site grandissait avec d’autres formulaires, je le préfixerais par `#search input` pour éviter tout effet de bord."',
  },
];

// ============================================================================
// ÉTAPE 5 : CHAPITRES D'EXPLICATION LIGNE PAR LIGNE DU VRAI CODE DE TAG
// ============================================================================
export const CODE_WALKTHROUGH_SECTIONS = [
  {
    id: 'head-setup',
    title: '1. Le <head> & les Variables CSS (:root)',
    linesHtml: 'index.html (Lignes 1–16)',
    linesCss: 'style.css (Lignes 1–32)',
    htmlCode: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booki</title>
    <!-- Connexion rapide aux serveurs Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Importation de la police Raleway (graisses 400, 500, 700) -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Importation des icônes Font Awesome 6.2.1 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" ... />
    <!-- Lien vers NOTRE feuille de style CSS -->
    <link rel="stylesheet" href="./css/style.css">
</head>`,
    cssCode: `* {
    font-family: 'Raleway', sans-serif;
}

:root {
    --main-color: #0065FC;
    --main-bg-color: #F2F2F2;
    --filter-bg-color: #DEEBFF;
}

.fa-solid {
    color: var(--main-color);
}

.main-container {
    width: 100%;
    max-width: 1440px;
    padding: 0 50px;
    box-sizing: border-box;
}`,
    lineByLine: [
      {
        code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        meaning:
          "Indispensable pour le Responsive ! Sans cette ligne, les téléphones mobiles dézooment la page comme si c'était un écran d'ordinateur et nos @media queries ne se déclenchent pas correctement.",
      },
      {
        code: ':root { --main-color: #0065FC; ... }',
        meaning:
          'Déclare des variables CSS globales (Custom Properties) pour les 3 couleurs de la charte graphique Booki. On les réutilise ensuite avec var(--main-color).',
      },
      {
        code: 'box-sizing: border-box;',
        meaning:
          'Fait en sorte que les marges intérieures (padding: 0 50px) et les bordures soient INCLUSES dans les 100% de largeur de .main-container, évitant ainsi l’apparition d’une barre de défilement horizontale.',
      },
    ],
  },
  {
    id: 'header-nav',
    title: '2. Le <header> & le Menu de Navigation',
    linesHtml: 'index.html (Lignes 19–27)',
    linesCss: 'style.css (Lignes 63–91)',
    htmlCode: `<header>
    <img class="logo" src="images/logo/Booki.png" alt="logo Booki">
    <nav>                
        <ul id="menu">
            <li><a href="#hebergements-link">Hébergements</a></li>
            <li><a href="#activities-link">Activités</a></li>
        </ul>
    </nav>
</header>`,
    cssCode: `header {
    display: flex;
    justify-content: space-between;
    gap: 68px;
    margin-bottom: 20px;
}
#menu {
    display: flex;
    list-style: none;
    padding: 0px 50px 0px 50px;
    gap: 68px;
    margin-top: 0;
}
#menu li {
    border-top: solid 2px white;
    padding-top: 20px;
}
#menu li:hover {
    border-color: #0065FC;
    color: #0065FC;
}`,
    lineByLine: [
      {
        code: 'justify-content: space-between;',
        meaning:
          'Sur <header>, pousse le logo tout à gauche et le bloc <nav> tout à droite.',
      },
      {
        code: 'list-style: none;',
        meaning:
          'Supprime les puces (les petits points noirs) par défaut de la liste <ul>.',
      },
      {
        code: 'border-top: solid 2px white; (puis border-color: #0065FC au :hover)',
        meaning:
          'Astuce de pro : on met déjà une bordure blanche invisible de 2px par défaut. Comme ça, quand la souris passe dessus (:hover), seule la couleur change en bleu et le texte ne saute pas de 2 pixels vers le bas !',
      },
    ],
  },
  {
    id: 'search-filters',
    title: '3. Barre de Recherche & Filtres',
    linesHtml: 'index.html (Lignes 29–57)',
    linesCss: 'style.css (Lignes 94–195)',
    htmlCode: `<div id="search">
    <form>
        <label><i class="fa-solid fa-location-dot"></i></label>                
        <input type="text" name="rechercher" value="Marseille, France" required>
        <button type="submit" class="button" value="Rechercher">
            <i class="fa-solid fa-magnifying-glass"></i>
            <span class="button-text">Rechercher</span>
        </button>
    </form>
</div>
<div id="filter">
    <p>Filtres</p>
    <a href="#" class="button-filter">
        <i class="fa-solid fa-money-bill-wave"></i>Economique</a>
    ...
</div>`,
    cssCode: `.fa-location-dot {
    background-color: #F2F2F2;
    color: black;
    padding: 16px;
    border-radius: 15px 0 0 15px;
    margin-right: -5px;
}
:required {
    color: black;
    font-weight: bold;
    text-align: center;
    border: solid 1px #F2F2F2;
    padding: 15px 0px 15px 0px;
}
.button-filter {
    display: flex;
    justify-content: center;
    border: solid 2px #D9D9D9;
    border-radius: 25px;
    padding: 4px 19px;
    align-items: center;
    gap: 10px;
}
.button-filter:hover {
    background-color: #DEEBFF;
}`,
    lineByLine: [
      {
        code: 'border-radius: 15px 0 0 15px; / 0 15px 15px 0;',
        meaning:
          "Les 4 valeurs de border-radius correspondent aux coins dans le sens des aiguilles d'une montre : Haut-Gauche, Haut-Droite, Bas-Droite, Bas-Gauche. L'icône GPS est arrondie à gauche, et le bouton Rechercher est arrondi à droite !",
      },
      {
        code: '.fa-magnifying-glass { display: none; }',
        meaning:
          'Sur ordinateur et tablette, l’icône loupe est cachée. Dans la media query mobile (ligne 535), elle passe en display: block pendant que .button-text passe en display: none.',
      },
      {
        code: '.button-filter:hover { background-color: #DEEBFF; }',
        meaning:
          'Applique le bleu très clair de la maquette quand l’utilisateur survole un filtre avec sa souris.',
      },
    ],
  },
  {
    id: 'cards-hebergements-populaires',
    title: '4. Hébergements (Grille 3x2) & Populaires (Colonne)',
    linesHtml: 'index.html (Lignes 58–245)',
    linesCss: 'style.css (Lignes 197–295)',
    htmlCode: `<div class="hebergements-and-populaires">          
    <section class="hebergements">
        <h2 class="section-title" id="hebergements-link">Hébergements à Marseille</h2>
        <div class="hebergements-cards">
            <a href="#">
                <article class="card">
                    <img src="./images/hebergements/fred-kleber.jpg" alt="...">
                    <div class="card-content">...</div>
                </article>
            </a>
            <!-- x6 cartes -->
        </div>
    </section>
    <section class="populaires">...</section>
</div>`,
    cssCode: `.hebergements-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.hebergements-cards a {
    width: 30%;
}
.populaires-cards .card {
    display: flex;
    margin-top: 33px;
}
.populaires-cards img {
    width: 33%;
    height: 136px;
    object-fit: cover;
}
.populaires-cards .card-content {
    width: 67%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}`,
    lineByLine: [
      {
        code: 'flex-wrap: wrap; + .hebergements-cards a { width: 30%; }',
        meaning:
          'Comme chaque carte prend 30% de largeur, 3 cartes prennent 90% de la ligne (3 x 30%). La 4e carte n’a plus la place (90% + 30% = 120% > 100%), donc grâce à flex-wrap: wrap, elle passe automatiquement sur une 2e ligne pour former la grille de 2 rangées de 3 cartes !',
      },
      {
        code: 'object-fit: cover;',
        meaning:
          'Empêche les photos des chambres d’être écrasées ou étirées : l’image remplit son cadre de 136px de haut en se recadrant proprement au centre.',
      },
      {
        code: '.populaires-cards .card { display: flex; }',
        meaning:
          'Contrairement aux cartes Hébergements (où l’image est au-dessus du texte), les cartes Populaires ont l’image à gauche (33%) et le texte à droite (67%) grâce à display: flex sur .card.',
      },
    ],
  },
  {
    id: 'responsive-media-queries',
    title: '5. Les 2 Media Queries (Tablette <=1024px & Mobile <768px)',
    linesHtml: 'Aucun changement HTML ! Tout se fait en CSS',
    linesCss: 'style.css (Lignes 370–621)',
    htmlCode: `<!-- Magie du Responsive : le HTML reste 100% identique ! -->
<!-- C'est uniquement le CSS qui réorganise les boîtes selon la largeur de l'écran -->`,
    cssCode: `/* Tablette (<= 1024px) */
@media (max-width: 1024px) {
    .hebergements-and-populaires { flex-direction: column; }
    .hebergements, .populaires { width: 100%; }
    .populaires-cards { display: flex; flex-direction: row; gap: 15px; }
}

/* Mobile (<= 767.98px) */
@media (max-width: 767.98px) {
    header { flex-direction: column; }
    .hebergements { order: 2; background-color: transparent; }
    .hebergements-cards a, .populaires-cards a { width: 100%; }
    .activities-cards { flex-direction: column; }
    footer { flex-direction: column; }
}`,
    lineByLine: [
      {
        code: '@media (max-width: 1024px)',
        meaning:
          'S’applique dès que la largeur de l’écran est inférieure ou égale à 1024px (Tablette). Le bloc Populaires passe SOUS Hébergements (flex-direction: column) et ses 3 cartes s’alignent horizontalement.',
      },
      {
        code: '@media (max-width: 767.98px)',
        meaning:
          'S’applique sur Mobile (< 768px). Attention : comme 500px est à la fois <= 1024px ET <= 767.98px, le téléphone applique d’abord les règles Tablette PUIS les règles Mobile écrites en dessous !',
      },
      {
        code: '.hebergements { order: 2; }',
        meaning:
          'Dans un conteneur Flexbox (.hebergements-and-populaires), tous les enfants ont order: 0 par défaut. En donnant order: 2 à .hebergements sur mobile, .populaires (qui est resté à order: 0) passe visuellement EN PREMIER, exactement comme sur la maquette mobile de Loïc !',
      },
    ],
  },
];

// ============================================================================
// ÉTAPE 6 : LES 7 QUESTIONS OFFICIELLES DE SARAH (CTO) + PLAN DE SOUTENANCE
// ============================================================================
export const PRESENTATION_TIMELINE = [
  {
    id: 'pres-1',
    time: '00:00 – 02:30 (2m30)',
    title: '1. Rappel du Contexte Projet (Pourquoi, Quoi, Pour qui)',
    checklist: [
      "Présenter Booki : entreprise qui permet aux usagers de trouver des hébergements et des activités dans la ville de leur choix (ici Marseille).",
      "Rappeler ton rôle : intégrer la maquette réalisée par Loïc (UI Designer) en HTML5 et CSS3, en suivant les spécifications techniques envoyées par Sarah (CTO), à partir d'une base de code fournie.",
      "Rappeler les contraintes clés : aucun framework CSS autorisé (pas de Bootstrap/Tailwind), respect de la structure de dossiers (index.html, css/style.css, images/), compatibilité Desktop, Tablette et Mobile.",
    ],
    speechBubble:
      "« Bonjour Sarah ! Aujourd'hui je te présente l'intégration HTML et CSS de la page d'accueil de Booki. À partir des maquettes Figma de Loïc et de ta note de synthèse, j'ai intégré l'ensemble des sections — en-tête, recherche, filtres, hébergements, populaires, activités et footer — en HTML5 sémantique et CSS3 natif, entièrement responsive sur Desktop, Tablette et Mobile. »",
  },
  {
    id: 'pres-2',
    time: '02:30 – 06:30 (4m00)',
    title: '2. Démonstration du Rendu Visuel (Desktop, Tablette, Mobile)',
    checklist: [
      "Montrer la version Desktop (jusqu'à 1440px) : tester le survol (:hover) sur le menu en haut, sur les filtres (#DEEBFF), et cliquer sur les liens d'ancrage « Hébergements » et « Activités ».",
      "Ouvrir l'inspecteur du navigateur (F12 -> Mode Responsive) et passer à 1024px (Tablette) : montrer que « Les plus populaires » passe sous « Hébergements » avec ses 3 cartes en ligne.",
      "Passer sous 768px (ex: 375px iPhone) : montrer le menu centré sur 2 colonnes avec bordure basse, le bouton Rechercher devenu une icône loupe, et la section « Les plus populaires » qui passe EN PREMIER grâce à Flexbox.",
    ],
    speechBubble:
      "« Sur Desktop, on voit les deux sections Hébergements (65%) et Populaires (32%) côte à côte. Quand je réduis l'écran sous 1024px pour la version Tablette, elles passent l'une sous l'autre. Enfin, sous 768px sur Mobile, la section Populaires remonte en premier, le bouton Rechercher se transforme en icône loupe et toutes les cartes passent sur une seule colonne. »",
  },
  {
    id: 'pres-3',
    time: '06:30 – 13:00 (6m30)',
    title: '3. Présentation du Code dans VS Code & Points Complexes',
    checklist: [
      "Montrer index.html : la structure sémantique (<header>, <nav>, <main>, <section>, <article>, <footer>) et les ancres (#hebergements-link).",
      "Montrer une carte <a href=\"#\"><article class=\"card\"> et expliquer l'accessibilité des étoiles (aria-hidden=\"true\" + .sr-only).",
      "Montrer style.css : les variables CSS (:root), l'utilisation de Flexbox (.hebergements-cards en flex-wrap: wrap avec width: 30%), object-fit: cover sur les images, et les 2 @media queries.",
      "Expliquer un point technique complexe maîtrisé : par exemple l'inversion d'ordre sur mobile avec .hebergements { order: 2; } (ligne 555) ou le double contenu du bouton de recherche (texte vs loupe).",
    ],
    speechBubble:
      "« Le point le plus intéressant à coder a été le passage en responsive mobile : sur la maquette de Loïc, la section Populaires doit apparaître avant Hébergements sur téléphone, alors qu'elle est après dans le HTML. Plutôt que de dupliquer le HTML, j'ai utilisé la propriété Flexbox order: 2 sur .hebergements dans la media query mobile. »",
  },
  {
    id: 'pres-4',
    time: '13:00 – 15:00 (2m00)',
    title: '4. Bilan du Projet & Validation W3C',
    checklist: [
      "Mentionner le passage du code aux validateurs W3C HTML et CSS.",
      "Résumer ce que ce projet t'a apporté : maîtrise de Flexbox, du découpage d'une maquette Figma en boîtes, et des media queries desktop-first.",
    ],
    speechBubble:
      "« Pour conclure, ce projet m'a permis de bien maîtriser le découpage d'une maquette Figma en boîtes HTML sémantiques, le positionnement avec Flexbox et la gestion des breakpoints responsive. Je suis prête pour tes questions, Sarah ! »",
  },
];

export const SARAH_QUESTIONS = [
  {
    id: 'q-semantic',
    topic: 'Sujet Officiel #1 — Le Web Sémantique',
    question:
      '« Tag, qu’est-ce que le Web sémantique et pourquoi n’as-tu pas simplement utilisé des balises <div> partout dans ton index.html ? »',
    hint: 'Pense aux 3 bénéficiaires : les personnes malvoyantes (lecteurs d’écran), les moteurs de recherche (SEO Google), et les développeurs qui relisent le code.',
    keyPoints: [
      'Donner du sens (une signification) au contenu HTML et pas seulement une apparence.',
      'Accessibilité : aide les lecteurs d’écran à naviguer de région en région (<header>, <nav>, <main>, <section>, <article>, <footer>).',
      'SEO (Référencement naturel) : aide les robots de Google à comprendre la hiérarchie (<h1>, <h2>, <h3>) et le sujet de la page.',
      'Maintenabilité : le code est beaucoup plus lisible pour l’équipe technique.',
    ],
    codeReference:
      'Dans ton index.html : <header> (ligne 19), <nav> (ligne 21), <main> (ligne 28), <section> (lignes 29, 59, 180, 246), <article class="card"> (ligne 63), <footer> (ligne 279).',
    idealAnswer:
      "« Le Web sémantique consiste à utiliser des balises HTML qui décrivent le sens et le rôle de leur contenu plutôt que des <div> génériques. Dans Booki, j'ai utilisé <header>, <nav>, <main>, <section>, <article> pour chaque carte d'hôtel, et <footer>. C'est essentiel pour trois raisons : l'accessibilité pour les lecteurs d'écran, le référencement SEO sur les moteurs de recherche, et la lisibilité du code pour l'équipe. »",
  },
  {
    id: 'q-validators',
    topic: 'Sujet Officiel #2 — Validité W3C & Importance des Validateurs',
    question:
      '« Pourquoi est-ce si important de passer son code HTML et CSS aux validateurs du W3C avant de livrer, même si le site s’affiche déjà bien sur ton navigateur ? »',
    hint: 'Un navigateur comme Chrome essaie de "deviner" et réparer les erreurs en silence, mais un autre navigateur ou un lecteur d’écran peut casser !',
    keyPoints: [
      'Compatibilité inter-navigateurs (Chrome, Firefox, Safari, Edge) : un code valide W3C garantit un rendu uniforme partout.',
      'Détection des erreurs invisibles : balises mal fermées, ID dupliqués, fautes de frappe dans les propriétés CSS.',
      'Accessibilité et respect des standards internationaux du Web (W3C).',
      'Performance et facilité de maintenance future.',
    ],
    codeReference:
      'Outils utilisés : validator.w3.org (pour index.html) et jigsaw.w3.org/css-validator (pour css/style.css).',
    idealAnswer:
      "« Même si un navigateur moderne tente de corriger visuellement un HTML mal formé, il ne le fait pas toujours de la même façon sur Chrome, Safari ou Firefox. Passer son code aux validateurs W3C permet de détecter les balises oubliées, de respecter les standards internationaux, de garantir l'accessibilité pour les technologies d'assistance et d'éviter des bugs imprévisibles lors des futures mises à jour. »",
  },
  {
    id: 'q-specificity',
    topic: 'Sujet Officiel #3 — La Spécificité en CSS',
    question:
      '« Peux-tu m’expliquer ce qu’est la spécificité en CSS ? Si deux règles CSS ciblent le même élément avec des couleurs différentes, comment le navigateur choisit laquelle appliquer ? »',
    hint: 'Rappelle la hiérarchie des poids : Style inline (1000) > #ID (100) > .Classe / :hover (10) > Balise (1), puis la règle de la Cascade (le dernier écrit gagne en cas d’égalité).',
    keyPoints: [
      'C’est le système de score (de poids) qui détermine quelle règle CSS est prioritaire en cas de conflit.',
      'Ordre de priorité : 1. Attribut style="" inline -> 2. Sélecteur #id -> 3. Sélecteur .classe ou pseudo-classe (:hover, :required) -> 4. Sélecteur de balise (header, li, a).',
      'Si deux sélecteurs ont exactement la même spécificité, c’est la Cascade qui décide : la règle écrite le plus bas dans le fichier style.css l’emporte.',
    ],
    codeReference:
      'Exemple dans ton style.css : .fa-solid (ligne 12, couleur bleue) et .fa-location-dot (ligne 111, couleur noire) ont chacun 1 classe, donc .fa-location-dot gagne car il est plus bas. Et #menu li (ligne 83) utilise un ID + une balise.',
    idealAnswer:
      "« La spécificité est le calcul de priorité que fait le navigateur quand plusieurs règles CSS ciblent le même élément. Une balise comme li vaut 1 point, une classe comme .card ou une pseudo-classe :hover vaut 10 points, et un identifiant comme #menu vaut 100 points. Par exemple dans mon code, .hebergements-cards .card-title (2 classes) est plus spécifique que .card-title tout seul (1 classe). Et à spécificité égale, c'est la règle déclarée le plus bas dans le fichier CSS qui gagne : c'est pour cela que mes @media queries sont placées tout en bas de style.css ! »",
  },
  {
    id: 'q-separation',
    topic: 'Sujet Officiel #4 — Séparer le HTML du CSS',
    question:
      '« Pourquoi est-il indispensable de séparer le code HTML (dans index.html) et le code CSS (dans css/style.css) au lieu de mettre du CSS directement dans le HTML ? »',
    hint: 'Pense à tes 9 cartes d’hôtels qui partagent toutes la classe .card ! Imagine si tu avais dû écrire le style sur chacune des 9 cartes dans le HTML...',
    keyPoints: [
      'Séparation des responsabilités : HTML = structure et sens du contenu ; CSS = présentation visuelle et mise en page.',
      'Réutilisabilité (principe DRY - Don’t Repeat Yourself) : une seule classe .card dans style.css stylise les 9 cartes d’un coup.',
      'Maintenabilité : si Loïc change le bleu #0065FC, on modifie une seule ligne dans :root de style.css.',
      'Performance : le fichier style.css est mis en cache par le navigateur.',
    ],
    codeReference:
      'Ligne 14 de index.html : <link rel="stylesheet" href="./css/style.css"> et la classe .card (ligne 39 de style.css) réutilisée 9 fois.',
    idealAnswer:
      "« Séparer le HTML du CSS permet de séparer le fond de la forme : le HTML gère uniquement la structure sémantique et le contenu, tandis que le CSS gère le design et le responsive. Cela évite la répétition du code : par exemple, j'ai défini ma classe .card une seule fois dans style.css et je l'ai réutilisée sur mes 9 cartes d'hébergements. Si le designer change une couleur ou un arrondi, je modifie un seul fichier CSS et tout le site se met à jour instantanément. »",
  },
  {
    id: 'q-mockup',
    topic: 'Sujet Officiel #5 — Étude et Découpe de la Maquette',
    question:
      '« Comment as-tu procédé pour étudier et découper la maquette Figma de Loïc avant de commencer à coder ? »',
    hint: 'Du plus grand au plus petit (approche par boîtes imbriquées) : Conteneur global -> Grandes régions -> Sections -> Grilles de cartes -> Contenu d’une carte.',
    keyPoints: [
      'Approche "Top-Down" (du général au particulier) en imaginant tout sous forme de boîtes rectangulaires (Box Model).',
      '1. Repérer le conteneur global (.main-container à 1440px max) et les 3 grandes zones (<header>, <main>, <footer>).',
      '2. Découper <main> en blocs logiques : Recherche/Filtres, le duo Hébergements + Populaires (en Flexbox), puis Activités.',
      '3. Identifier les éléments répétitifs (les cartes .card, les boutons .button-filter) pour créer des classes CSS réutilisables.',
      '4. Relever sur Figma les constantes : police Raleway, couleurs (:root), tailles de texte et breakpoints (1024px et 768px).',
    ],
    codeReference:
      'Structure visible dans index.html : .main-container > main > .hebergements-and-populaires > section.hebergements > .hebergements-cards > a > article.card.',
    idealAnswer:
      "« J'ai découpé la maquette Figma de Loïc en partant des plus grandes boîtes vers les plus petites. J'ai d'abord isolé le .main-container (max-width 1440px), puis les trois grandes balises <header>, <main> et <footer>. Ensuite, dans <main>, j'ai repéré comment aligner les blocs en Flexbox — notamment la boîte .hebergements-and-populaires qui met côte à côte les deux sections à 65% et 32%. Enfin, j'ai analysé la structure interne d'une carte type (.card avec image en haut et .card-content en bas) pour pouvoir la dupliquer proprement. »",
  },
  {
    id: 'q-ide',
    topic: 'Sujet Officiel #6 — Fonctionnement de l’IDE & des Outils',
    question:
      '« Quel IDE as-tu utilisé pour développer Booki et quelles fonctionnalités t’ont le plus aidée au quotidien ? »',
    hint: 'Parle de VS Code, de l’extension Live Server, de l’auto-complétion Emmet, de l’indentation automatique et des DevTools (F12) du navigateur.',
    keyPoints: [
      'IDE utilisé : Visual Studio Code (VS Code).',
      'Extension Live Server : recharge automatiquement la page dans le navigateur à chaque sauvegarde (Ctrl+S).',
      'Coloration syntaxique, auto-fermeture des balises, Emmet et formatage / indentation pour repérer vite une balise mal fermée.',
      'Complément indispensable : les DevTools du navigateur (F12) pour tester les propriétés Flexbox en direct et simuler les écrans 1024px et 375px.',
    ],
    codeReference:
      'Le dossier .vscode/settings.json présent dans ton projet et l’inspecteur Chrome/Brave.',
    idealAnswer:
      "« J'ai travaillé sur Visual Studio Code. J'ai utilisé l'extension Live Server pour voir mes modifications HTML et CSS en temps réel à chaque sauvegarde, ainsi que l'auto-complétion et l'indentation automatique qui m'aident à vérifier que chaque balise ouverte est bien fermée. En parallèle, j'ai beaucoup utilisé l'inspecteur du navigateur (DevTools) pour tester mes alignements Flexbox et vérifier mes media queries à 1024px et 767px. »",
  },
  {
    id: 'q-responsive-code',
    topic: 'Sujet Officiel #7 — Question Technique sur ton Code (Responsive & Flexbox)',
    question:
      '« Sur la version Mobile, la section "Les plus populaires" apparaît AU-DESSUS de "Hébergements à Marseille", alors que dans ton HTML elle est écrite APRÈS. Comment as-tu réussi ça sans toucher au HTML ? »',
    hint: 'Regarde la ligne 555 de ton fichier style.css dans @media (max-width: 767.98px) !',
    keyPoints: [
      'Le parent .hebergements-and-populaires est en display: flex et passe en flex-direction: column (depuis la media query 1024px).',
      'Par défaut en Flexbox, tous les éléments enfants ont la propriété order: 0.',
      'Dans la media query mobile (@media max-width: 767.98px, ligne 555), on applique .hebergements { order: 2; }.',
      'Comme .populaires garde son order: 0 (qui est plus petit que 2), il s’affiche en premier et .hebergements passe en second !',
    ],
    codeReference:
      'style.css ligne 391 (.hebergements-and-populaires { flex-direction: column; }) et ligne 554 (.hebergements { order: 2; }).',
    idealAnswer:
      "« C'est grâce à Flexbox ! Comme le conteneur parent .hebergements-and-populaires est en display: flex et flex-direction: column, je peux contrôler l'ordre visuel de ses enfants avec la propriété CSS order. Par défaut, les deux sections ont un order égal à 0. Dans ma media query mobile à la ligne 555, j'ai ajouté order: 2 sur la classe .hebergements : elle passe donc automatiquement après .populaires qui est restée à 0, sans avoir besoin de dupliquer le moindre code HTML. »",
  },
];
