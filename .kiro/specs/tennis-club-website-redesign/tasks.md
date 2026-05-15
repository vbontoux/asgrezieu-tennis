# Plan d'Implémentation : Refonte du site AS Grézieu Tennis

## Vue d'ensemble

Ce plan convertit la conception technique en étapes de développement incrémentales. Le site est reconstruit avec Astro (framework statique moderne) en remplacement de Wix, avec un design modernisé, des animations subtiles, un support bilingue FR/EN, et une conformité accessibilité.

## Tâches

- [x] 1. Initialisation du projet Astro et configuration de base
  - [x] 1.1 Créer le projet Astro avec la structure de répertoires
  - [x] 1.2 Configurer Astro avec le routage i18n natif (fr/en, prefixDefaultLocale)
  - [x] 1.3 Installer Playwright pour l'extraction et les tests

- [x] 2. Extraction du contenu et des assets du site actuel
  - [x] 2.1 Extraire les images via Playwright headless (hero, courts, logo, board, sponsors)
  - [x] 2.2 Identifier la charte graphique (bleu marine #2b3a67, #1e2a4a, doré #c9a84c)
  - [x] 2.3 Extraire le contenu textuel de toutes les pages (conseil, sponsoring, etc.)

- [x] 3. Styles globaux et structure de base
  - [x] 3.1 Créer global.css avec variables CSS (couleurs, typographie Montserrat/Inter, espacements)
  - [x] 3.2 Créer responsive.css (breakpoints, menu mobile, zones tactiles 44px)
  - [x] 3.3 Créer animations.css (fade-in, slide-up, scale-in, hover effects, prefers-reduced-motion)

- [x] 4. Composants communs et layout
  - [x] 4.1 SkipLink accessible bilingue
  - [x] 4.2 Header avec logo, navigation, icônes réseaux sociaux, switch langue, glassmorphism au scroll
  - [x] 4.3 Footer avec adresse, email (mailto), téléphone (tel)
  - [x] 4.4 BaseLayout avec head, hreflang, lang dynamique, Google Fonts
  - [x] 4.5 Menu mobile hamburger avec ARIA

- [x] 5. Système d'internationalisation
  - [x] 5.1 Fichiers de traduction fr.json et en.json (navigation, pages, contenu)
  - [x] 5.2 Utilitaires i18n (getTranslation, getLocalePath avec mapping slugs, getHreflangLinks)
  - [x] 5.3 Switch de langue dans le header (conserve la page courante)

- [x] 6. Composant ScrollReveal
  - [x] 6.1 IntersectionObserver avec seuil 20%, exécution unique
  - [x] 6.2 Animations : fade-in, slide-up, slide-left, slide-right, scale-in
  - [x] 6.3 Stagger delays pour les grilles
  - [x] 6.4 Respect de prefers-reduced-motion

- [x] 7. Pages FR — Design modernisé
  - [x] 7.1 Accueil : hero Ken Burns + overlay dégradé + badges glassmorphism + galerie zoom + contact cards
  - [x] 7.2 Entraînements : cartes avec accent gradient + animations stagger
  - [x] 7.3 Actualités : cartes avec accent + animations
  - [x] 7.4 Conseil d'administration : fond bleu marine, photos rondes, président/VP en haut, séparateur doré
  - [x] 7.5 Sponsoring : carousel horizontal auto-scroll + modal zoom avec lien site + CTA doré + texte fidèle
  - [x] 7.6 Contact : formulaire avec focus glow + coordonnées + animations slide

- [x] 8. Pages EN — Miroir complet des pages FR
  - [x] 8.1 Home : même design que FR avec traductions
  - [x] 8.2 Training : cartes avec accent
  - [x] 8.3 News : cartes avec accent
  - [x] 8.4 Board : photos, fond bleu, même layout que FR
  - [x] 8.5 Sponsoring : carousel + modal + CTA + texte traduit
  - [x] 8.6 Contact : formulaire + coordonnées

- [x] 9. Package de distribution
  - [x] 9.1 Build production (npm run build → dist/)
  - [x] 9.2 Zip avec instructions (EMAIL-ME.txt)
  - [x] 9.3 Instructions pour visualisation locale (python3 -m http.server)

---

## Phase 3 : Accessibilité, Performance et Déploiement (à venir)

- [ ] 10. Accessibilité WCAG 2.1 AA
  - [ ] 10.1 Vérifier les contrastes (4.5:1 texte normal, 3:1 grande taille)
  - [ ] 10.2 Vérifier la navigation clavier complète sans piège de focus
  - [ ] 10.3 Ajouter les attributs ARIA manquants sur les composants interactifs
  - [ ] 10.4 Tester avec axe-core sur toutes les pages
  - _Exigences : 5.1 à 5.10_

- [ ] 11. Optimisation des performances
  - [ ] 11.1 Optimisation d'images (WebP/AVIF via composant Picture, lazy loading, dimensions explicites)
  - [ ] 11.2 Différer CSS/JS non critiques, viser Lighthouse > 90
  - [ ] 11.3 Vérifier CLS < 0.1 et LCP < 2.5s
  - _Exigences : 8.1 à 8.6_

- [ ] 12. Pipeline CI/CD et déploiement
  - [ ] 12.1 Créer le pipeline GitHub Actions (build, test, deploy)
  - [ ] 12.2 Implémenter le versionnement sémantique et rollback
  - [ ] 12.3 Configurer le déploiement (Vercel/Netlify ou hébergement statique)
  - _Exigences : 7.1 à 7.6_

- [ ] 13. Checkpoint final — Validation complète

## Notes

- Phases 1 à 9 terminées — le site est fonctionnel, bilingue, avec animations et design modernisé
- Le zip de distribution (3.5 Mo) est prêt à envoyer par email
- Phase 3 couvre l'accessibilité avancée, la performance et le déploiement en production
- Toutes les animations respectent `prefers-reduced-motion`
- Navigation : Accueil, Entraînements, Actualités, Conseil d'administration, Sponsoring, Infos & Contacts
- Palette : bleu marine #2b3a67 / #1e2a4a, doré #c9a84c, blanc
- Typographie : Montserrat (titres), Inter (corps)
