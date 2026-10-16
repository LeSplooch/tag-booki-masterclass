// ============================================================================
// FICHIER : src/main.jsx
// RÔLE : Point d'entrée principal de l'application React.
//
// 🎓 EXPLICATION POUR DÉBUTANT (TAG) :
// 1. On importe React et ReactDOM (la bibliothèque qui connecte React au navigateur).
// 2. On importe notre composant principal `App` depuis `./App.jsx`.
// 3. On importe notre feuille de style CSS globale `./styles/index.css`.
// 4. `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`
//    dit à React : "Trouve la balise <div id="root"> dans index.html et
//    affiche toute notre application à l'intérieur !"
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
