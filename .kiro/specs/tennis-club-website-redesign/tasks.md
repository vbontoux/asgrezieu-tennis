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

---

## Phase 4 : Intégration Tina CMS — Édition sans code

Objectif : permettre à des non-développeurs de mettre à jour le contenu du site via une interface visuelle (`/admin`), sans toucher au code. Le site reste un site statique Astro identique visuellement.

- [ ] 14. Installation et configuration Tina CMS
  - [ ] 14.1 Installer `tinacms` et mettre à jour les scripts `dev` / `build` dans `package.json`
  - [ ] 14.2 Créer `tina/config.ts` avec la configuration de base (clientId, branch, build)
  - [ ] 14.3 Vérifier que `npm run dev` démarre bien le site ET l'éditeur sur `:4321/admin`
  - _Exigence : 10.1_

- [ ] 15. Modélisation du contenu — Schémas Tina
  - [ ] 15.1 Collection `conseil` : champs nom, rôle, email, photo, catégorie (direction / bureau / membre), locale (fr/en)
  - [ ] 15.2 Collection `sponsors` : champs logo, url, alt, ordre
  - [ ] 15.3 Collection `actualites` : champs titre, dates, description, lien externe, locale (fr/en)
  - [ ] 15.4 Collection `entrainements` : sous-schémas coachs (nom, diplôme) + créneaux par jour (heure, label, coach), locale
  - _Exigence : 10.2_

- [ ] 16. Migration des données hardcodées vers fichiers Markdown
  - [ ] 16.1 Extraire `fr/conseil.astro` → `content/conseil/fr/*.md` (11 fichiers membres)
  - [ ] 16.2 Extraire `en/board.astro` → `content/conseil/en/*.md` (miroir EN)
  - [ ] 16.3 Extraire `fr/sponsoring.astro` → `content/sponsors/*.md` (5 sponsors, partagé FR/EN)
  - [ ] 16.4 Extraire `fr/actualites.astro` → `content/actualites/fr/*.md`
  - [ ] 16.5 Extraire `en/news.astro` → `content/actualites/en/*.md`
  - [ ] 16.6 Extraire coachs + planning de `fr/entrainements.astro` → `content/entrainements/fr/*.md`
  - _Exigence : 10.2_

- [ ] 17. Refactoring des pages Astro pour utiliser les queries Tina
  - [ ] 17.1 Refactorer `fr/conseil.astro` et `en/board.astro` — remplacer les arrays par `tinaClient.queries`
  - [ ] 17.2 Refactorer `fr/sponsoring.astro` et `en/sponsoring.astro`
  - [ ] 17.3 Refactorer `fr/actualites.astro` et `en/news.astro`
  - [ ] 17.4 Refactorer `fr/entrainements.astro` et `en/training.astro`
  - [ ] 17.5 Vérifier que le rendu visuel est identique avant/après sur toutes les pages
  - _Exigence : 10.3_

- [ ] 18. Configuration Tina Cloud et workflow éditorial
  - [ ] 18.1 Créer un compte Tina Cloud et connecter le repo GitHub
  - [ ] 18.2 Configurer les variables d'environnement (`TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN`)
  - [ ] 18.3 Mettre à jour le pipeline GitHub Actions pour intégrer `tinacms build`
  - [ ] 18.4 Tester le workflow complet : édition dans `/admin` → commit auto → build → déploiement GitHub Pages
  - [ ] 18.5 Documenter le processus d'édition pour les membres non-techniques du club
  - _Exigence : 10.4_

- [ ] 19. Checkpoint Phase 4 — Validation éditoriale
  - [ ] 19.1 Un éditeur non-technique peut modifier un membre du conseil et voir le changement en ligne
  - [ ] 19.2 Un éditeur peut ajouter un événement dans Actualités sans toucher au code
  - [ ] 19.3 Le site statique final (dist/) est identique en rendu à avant l'intégration Tina

---

## Notes

- Phases 1 à 9 terminées — le site est fonctionnel, bilingue, avec animations et design modernisé
- Phase 3 (tâches 10-13) : accessibilité WCAG, performances, CI/CD — à traiter en parallèle ou après Phase 4
- Phase 4 (tâches 14-19) : intégration Tina CMS pour édition sans code par les membres du club
- Tina CMS : édition locale via filesystem, édition en ligne via Tina Cloud (gratuit jusqu'à 2 utilisateurs)
- Le site reste un site statique pur — Tina ne s'exécute pas côté visiteur
- Toutes les animations respectent `prefers-reduced-motion`
- Navigation : Accueil, Entraînements, Actualités, Conseil d'administration, Sponsoring, Infos & Contacts
- Palette : bleu marine #2b3a67 / #1e2a4a, doré #c9a84c, blanc
- Typographie : Montserrat (titres), Inter (corps)
