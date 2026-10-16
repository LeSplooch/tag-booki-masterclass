# 🏖️ Booki Masterclass — L'Atelier Interactif de Tag

Bienvenue sur le dépôt de **Booki Masterclass**, une application web interactive créée en **React + Vite** pour accompagner **Tag** dans la maîtrise complète (ligne par ligne) de son projet d'intégration **Booki (HTML5 & CSS3)** et la préparation de sa soutenance orale face à **Sarah (CTO)**.

---

## 🎯 Ce que contient l'application (Parcours 1 Heure en 6 Étapes)

1. **Étape 1 (10 min) — Découpe Figma & Web Sémantique (`src/components/Step1Semantics.jsx`)**
   - Scanner **Rayons-X** interactif de la maquette Booki (chaque zone cliquée affiche la balise exacte de `index.html`, ses numéros de lignes et quoi dire à Sarah).
   - Quiz pratique sur `<article>`, `<section>`, la hiérarchie `h1 > h2 > h3` et l'accessibilité des étoiles (`aria-hidden="true"` + `.sr-only`).
2. **Étape 2 (12 min) — Laboratoire Flexbox & Cartes Booki (`src/components/Step2FlexboxLab.jsx`)**
   - Bac à sable Flexbox en direct sur les vraies photos des hôtels de Marseille (`flex-wrap: wrap`, `justify-content: space-between`, `width: 30%`, `object-fit: cover`).
   - Comparateur interactif entre les cartes verticales (*Hébergements*) et les cartes horizontales (*Les plus populaires* en `33% / 67%`).
3. **Étape 3 (10 min) — Spécificité CSS, Sélecteurs & Filtres (`src/components/Step3Specificity.jsx`)**
   - Calculateur de spécificité CSS `[Inline, #ID, .Classe, Balise]` pré-chargé avec les vrais sélecteurs du fichier `style.css` de Tag.
   - Simulateur et correcteur du bug mobile de la **ligne 494** (`#menu .li:hover` vs `#menu li:hover`).
4. **Étape 4 (10 min) — Responsive Design & Media Queries (`src/components/Step4ResponsiveLab.jsx`)**
   - Banc d'essai multi-écrans intégrant le vrai site Booki en direct (**Desktop 1440px**, **Tablette 1024px**, **Mobile 375px**).
   - Simulateurs interactifs des 2 astuces stars de Tag sur mobile : l'inversion d'ordre avec `.hebergements { order: 2; }` (ligne 555) et la transformation du bouton *Rechercher* en icône loupe.
5. **Étape 5 (8 min) — Maîtrise Ligne par Ligne & Audit W3C (`src/components/Step5CodeExplorer.jsx`)**
   - Décodeur en 5 chapitres du vrai code `index.html` et `style.css` de Tag.
   - Audit W3C des 4 détails techniques repérés dans le zip + visionneuse intégrale numérotée (306 lignes HTML / 621 lignes CSS).
6. **Étape 6 (10 min) — Simulation du Grand Oral face à Sarah (`src/components/Step6OralSimulator.jsx`)**
   - Chronomètre officiel de soutenance (30 min : 15m Présentation + 10m Questions + 5m Débrief).
   - Conducteur de présentation cochable + simulateur de jeu de rôle sur les **7 sujets officiels de l'évaluateur**.

---

## 🎓 Comment apprendre React grâce à ce code ?

Tous les fichiers du dossier `src/` sont **abondamment commentés en français pour débutants** :
- `src/main.jsx` : Le point d'entrée qui connecte React à `<div id="root">`.
- `src/App.jsx` : Le composant chef d'orchestre qui gère la navigation entre les 6 étapes et sauvegarde la progression dans `localStorage`.
- `src/data/courseData.js` : Toutes les données pédagogiques séparées proprement de l'interface.
- `src/components/*.jsx` : Les 6 ateliers interactifs construits avec `useState`, `useEffect`, les `props` et `.map()`.

---

## 🚀 Lancer le projet en local

```bash
npm install
npm run dev
```
