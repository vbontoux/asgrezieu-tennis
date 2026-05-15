# Document d'Exigences

## Introduction

Refonte du site web du club de tennis AS Grézieu Tennis (https://www.asgrezieutennis.com/). Le site actuel est hébergé sur Wix et présente les informations essentielles du club (logo, adresse, contact, activités). L'objectif est de recréer le site avec un framework statique moderne (Astro) pour permettre un développement local, une modernisation visuelle avec animations subtiles, une conformité accessibilité WCAG, et un support bilingue français/anglais, tout en conservant la charte graphique existante.

## Glossaire

- **Site** : L'application web statique générée par le framework Astro représentant le site du club AS Grézieu Tennis
- **Visiteur** : Toute personne accédant au Site via un navigateur web
- **Charte_Graphique** : L'ensemble des éléments visuels identitaires du club (couleurs, logo, typographies) extraits du site actuel
- **Contenu** : L'ensemble des textes, images et médias présents sur le site actuel à migrer
- **Système_i18n** : Le module de gestion de l'internationalisation permettant l'affichage du Site en français et en anglais
- **Système_Animation** : Le module gérant les animations et effets visuels subtils sur le Site
- **Pipeline_Build** : Le processus de compilation et génération du site statique via Astro
- **Système_Déploiement** : Le mécanisme de mise en production du Site avec capacité de retour arrière

## Exigences

### Exigence 1 : Extraction du contenu et des assets du site actuel

**User Story :** En tant que développeur, je veux extraire le contenu et les assets du site Wix actuel, afin de disposer de toutes les ressources nécessaires à la reconstruction fidèle du site.

#### Critères d'acceptation

1. WHEN le processus d'extraction est lancé, THE Site SHALL récupérer l'ensemble des images (formats PNG, JPG, SVG, WebP), logos et médias du site actuel et les stocker dans le répertoire `src/assets/images/`
2. WHEN le processus d'extraction est lancé, THE Site SHALL récupérer l'ensemble des textes et contenus structurés du site actuel et les documenter dans un fichier `content/extracted-content.json`
3. WHEN le processus d'extraction est terminé, THE Site SHALL stocker les assets extraits dans une arborescence organisée : `src/assets/images/` pour les médias, `src/assets/fonts/` pour les polices, `src/content/` pour les textes
4. WHEN le processus d'extraction est terminé, THE Site SHALL produire un fichier `docs/charte-graphique.md` documentant les codes hexadécimaux des couleurs, les noms et graisses des typographies, et les dimensions du logo identifiés

### Exigence 2 : Configuration du projet avec framework statique moderne

**User Story :** En tant que développeur, je veux configurer un projet Astro fonctionnel, afin de pouvoir développer et tester le site localement.

#### Critères d'acceptation

1. THE Pipeline_Build SHALL générer un site statique complet dans le répertoire `dist/` à partir des sources du projet, incluant toutes les pages HTML, les fichiers CSS et JavaScript, et les assets référencés
2. WHEN la commande `npm run dev` est exécutée, THE Pipeline_Build SHALL démarrer un serveur de développement accessible sur `http://localhost:4321` dans un délai inférieur à 10 secondes
3. WHEN un fichier source (.astro, .ts, .css, .md) est modifié et sauvegardé, THE Pipeline_Build SHALL recharger automatiquement la page dans le navigateur dans un délai inférieur à 2 secondes
4. WHEN la commande `npm run build` est exécutée, THE Pipeline_Build SHALL produire un build de production avec minification du HTML, CSS et JavaScript, et compression des assets images
5. IF la commande `npm run build` échoue, THEN THE Pipeline_Build SHALL afficher un message d'erreur explicite indiquant le fichier et la ligne en cause

### Exigence 3 : Reconstruction fidèle du site existant

**User Story :** En tant que membre du club, je veux retrouver toutes les informations actuelles du site dans la nouvelle version, afin de ne perdre aucune information utile.

#### Critères d'acceptation

1. THE Site SHALL afficher le logo du club AS Grézieu Tennis sur chaque page, en respectant les dimensions, couleurs et proportions définies dans la Charte_Graphique
2. THE Site SHALL afficher l'adresse du club : 1 Route du Col-de-la-Luere, 69290 Grézieu-la-Varenne sur chaque page dans une zone de pied de page ou d'en-tête
3. THE Site SHALL afficher l'adresse email de contact : contact@asgrezieutennis.com sous forme de lien cliquable (mailto)
4. THE Site SHALL afficher le numéro de téléphone : 07 78 26 65 24 sous forme de lien cliquable (tel)
5. THE Site SHALL reproduire la palette de couleurs identifiée dans la Charte_Graphique en utilisant les valeurs exactes (codes hexadécimaux) documentées lors de l'extraction
6. THE Site SHALL reproduire l'intégralité du Contenu textuel extrait du site actuel, vérifiable par correspondance un-pour-un avec le document d'extraction produit par l'Exigence 1
7. THE Site SHALL conserver les sections de navigation suivantes issues du site actuel : Accueil, Le Club, Activités, Réservation, Contact (ou leur équivalent tel qu'identifié lors de l'extraction)
8. WHEN un Visiteur accède à une section du Site, THE Site SHALL présenter le contenu correspondant à la section équivalente du site actuel sans omission d'information
9. IF une image ou un média référencé dans le Contenu extrait est indisponible, THEN THE Site SHALL afficher un texte alternatif descriptif à la place de l'élément manquant

### Exigence 4 : Modernisation visuelle avec animations subtiles

**User Story :** En tant que visiteur, je veux découvrir un site moderne et attractif avec des animations élégantes, afin d'avoir une expérience de navigation agréable et engageante.

#### Critères d'acceptation

1. WHEN un élément animé devient visible à au moins 20% dans le viewport lors du défilement, THE Système_Animation SHALL déclencher son animation d'apparition (fade-in ou slide-in)
2. WHEN le Visiteur survole ou clique sur un élément interactif, THE Système_Animation SHALL appliquer une transition d'une durée comprise entre 150 et 300 millisecondes
3. THE Système_Animation SHALL limiter la durée de chaque animation à un maximum de 500 millisecondes
4. THE Système_Animation SHALL utiliser des courbes d'accélération (easing) correspondant aux fonctions CSS standard (ease, ease-in-out ou cubic-bezier équivalent) pour toutes les animations
5. WHILE le Visiteur a activé le paramètre `prefers-reduced-motion: reduce` dans son système d'exploitation, THE Système_Animation SHALL désactiver toutes les animations et transitions, en affichant les éléments dans leur état final sans mouvement
6. THE Site SHALL présenter une mise en page utilisant des composants visuels de type cartes et grilles avec un espacement minimum de 16px entre les blocs de contenu
7. THE Site SHALL limiter les animations aux apparitions au défilement et aux transitions d'interaction, sans appliquer d'animations en boucle continue ni d'effets clignotants
8. WHEN une animation d'apparition au défilement est déclenchée, THE Système_Animation SHALL exécuter l'animation une seule fois par élément et par chargement de page

### Exigence 5 : Conformité accessibilité WCAG

**User Story :** En tant que visiteur en situation de handicap, je veux pouvoir naviguer et consulter le site de manière accessible, afin d'accéder aux informations du club sans barrière.

#### Critères d'acceptation

1. THE Site SHALL atteindre un score de conformité WCAG 2.1 niveau AA sur toutes les pages
2. THE Site SHALL fournir un texte alternatif descriptif de 5 à 125 caractères pour chaque image informative affichée, et un attribut alt vide pour les images décoratives
3. THE Site SHALL maintenir un ratio de contraste minimum de 4.5:1 pour le texte normal (inférieur à 18pt ou inférieur à 14pt bold) et 3:1 pour le texte de grande taille (18pt et plus, ou 14pt bold et plus)
4. THE Site SHALL être entièrement navigable au clavier, permettant d'atteindre et d'activer tous les éléments interactifs via les touches Tab, Entrée, Espace et flèches directionnelles, sans piège de focus
5. THE Site SHALL utiliser une structure de titres hiérarchique sans saut de niveau (pas de h3 après un h1 sans h2 intermédiaire) avec exactement un h1 par page
6. THE Site SHALL associer des labels explicites à tous les éléments de formulaire via l'attribut for/id ou par imbrication directe
7. THE Site SHALL fournir des attributs ARIA conformes aux ARIA Authoring Practices Guide du W3C pour les composants interactifs personnalisés, incluant au minimum les rôles, états et propriétés requis par le pattern correspondant
8. THE Site SHALL être compatible avec les lecteurs d'écran NVDA (Windows) et VoiceOver (macOS), permettant la lecture de tout le contenu textuel et l'opération de tous les éléments interactifs
9. WHEN le Visiteur navigue au clavier, THE Site SHALL afficher un indicateur de focus visible d'au minimum 2px avec un ratio de contraste d'au moins 3:1 par rapport aux couleurs adjacentes sur l'élément actif
10. THE Site SHALL fournir un lien d'évitement (skip to content) en début de page permettant aux utilisateurs clavier d'accéder directement au contenu principal sans traverser la navigation

### Exigence 6 : Internationalisation bilingue français/anglais

**User Story :** En tant que visiteur anglophone, je veux pouvoir consulter le site en anglais, afin de comprendre les informations du club sans barrière linguistique.

#### Critères d'acceptation

1. THE Système_i18n SHALL proposer un sélecteur de langue dans la zone de navigation principale, visible sans défilement, opérable au clavier et identifiable par les lecteurs d'écran, sur toutes les pages
2. WHEN le Visiteur sélectionne une langue, THE Système_i18n SHALL afficher l'intégralité du Contenu dans la langue choisie, en conservant le texte en français pour tout élément dont la traduction n'est pas disponible
3. THE Système_i18n SHALL définir le français comme langue par défaut du Site
4. WHEN le Visiteur change de langue, THE Système_i18n SHALL conserver la page courante et la position de défilement
5. THE Système_i18n SHALL mettre à jour l'attribut `lang` de la balise HTML selon la langue active (valeur `fr` ou `en`)
6. THE Système_i18n SHALL fournir des URL distinctes pour chaque version linguistique (ex: /fr/, /en/)
7. THE Système_i18n SHALL inclure les balises `hreflang` dans le head HTML pour le référencement multilingue
8. WHEN le Visiteur navigue vers une autre page du Site après avoir sélectionné une langue, THE Système_i18n SHALL conserver la langue choisie pour l'affichage de la nouvelle page

### Exigence 7 : Gestion de version et stratégie de rollback

**User Story :** En tant que développeur, je veux disposer d'un contrôle de version et d'une stratégie de déploiement avec rollback, afin de pouvoir revenir à une version précédente en cas de problème.

#### Critères d'acceptation

1. THE Système_Déploiement SHALL versionner chaque déploiement avec un identifiant unique au format sémantique (MAJOR.MINOR.PATCH) associé au hash du commit Git correspondant
2. WHEN le développeur initie manuellement un rollback, THE Système_Déploiement SHALL restaurer la version précédente en production en moins de 5 minutes
3. THE Système_Déploiement SHALL conserver un minimum de 3 versions précédentes disponibles pour rollback
4. THE Site SHALL utiliser un dépôt Git avec un historique de commits structuré suivant la convention Conventional Commits (feat:, fix:, chore:, docs:)
5. THE Système_Déploiement SHALL supporter un processus de déploiement automatisé via pipeline CI/CD déclenché par un push sur la branche principale
6. WHEN un rollback est effectué, THE Système_Déploiement SHALL vérifier que le site restauré répond avec un code HTTP 200 sur la page d'accueil avant de confirmer le rollback

### Exigence 8 : Performance et optimisation

**User Story :** En tant que visiteur, je veux que le site se charge rapidement, afin de consulter les informations du club sans attente excessive.

#### Critères d'acceptation

1. THE Site SHALL atteindre un score Lighthouse Performance supérieur à 90 sur mobile avec le profil de throttling par défaut (Simulated Throttling, mobile)
2. THE Site SHALL afficher le premier contenu significatif (LCP) en moins de 2.5 secondes sur une connexion 4G
3. THE Site SHALL servir les images en formats modernes (WebP ou AVIF) avec un fallback au format JPEG ou PNG pour les navigateurs non compatibles
4. THE Site SHALL implémenter le chargement différé (lazy loading) pour toutes les images situées en dehors du viewport initial au chargement de la page
5. THE Site SHALL différer le chargement du CSS et JavaScript non nécessaires au rendu du contenu visible dans le viewport initial, de sorte que le score Lighthouse « Render-blocking resources » ne signale aucune ressource bloquante évitable
6. THE Site SHALL maintenir un Cumulative Layout Shift (CLS) inférieur à 0.1 sur toutes les pages

### Exigence 9 : Responsive design multi-appareils

**User Story :** En tant que visiteur mobile, je veux consulter le site confortablement sur mon smartphone ou ma tablette, afin d'accéder aux informations du club en mobilité.

#### Critères d'acceptation

1. THE Site SHALL adapter sa mise en page aux écrans de largeur comprise entre 320px et 2560px sans contenu tronqué ni superposition d'éléments
2. IF la largeur de l'écran est inférieure à 768px, THEN THE Site SHALL afficher un menu de navigation rétractable permettant au Visiteur d'ouvrir et fermer la liste des liens de navigation
3. THE Site SHALL afficher le texte du corps avec une taille minimale de 16px et un interligne minimal de 1.4 sur tous les appareils, sans nécessiter de zoom
4. IF la largeur de l'écran est inférieure à 768px, THEN THE Site SHALL dimensionner les zones tactiles interactives à un minimum de 44x44 pixels
5. THE Site SHALL éviter le défilement horizontal sur toutes les tailles d'écran supportées (320px à 2560px)
6. THE Site SHALL redimensionner les images et médias proportionnellement à leur conteneur sans dépasser la largeur de la zone d'affichage
