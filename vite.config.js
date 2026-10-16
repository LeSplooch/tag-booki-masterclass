// ============================================================================
// FICHIER : vite.config.js
// RÔLE : Configuration de Vite (l'outil qui lance le serveur de développement
//        et construit la version finale du site React pour GitHub Pages).
// ============================================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Active le support de React (JSX, Fast Refresh)
  plugins: [react()],
  // base: './' permet d'utiliser des chemins relatifs lors du build final.
  // C'est indispensable pour que le site fonctionne parfaitement sur GitHub Pages !
  base: './',
});
