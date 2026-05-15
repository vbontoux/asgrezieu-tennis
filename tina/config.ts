import { defineConfig } from 'tinacms';

export default defineConfig({
  // Tina Cloud — renseigner ces valeurs pour le déploiement en production
  // clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // token: process.env.TINA_TOKEN,
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [

      // ──────────────────────────────────────────────────────────────
      // 1. CONSEIL D'ADMINISTRATION
      //    Un fichier par membre. Pas de locale : les données sont
      //    partagées FR/EN (noms et rôles identiques dans les deux langues).
      // ──────────────────────────────────────────────────────────────
      {
        name: 'conseil',
        label: 'Conseil d\'administration',
        path: 'content/conseil',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) => {
              const prenom = (values?.prenom || '').toLowerCase().replace(/\s+/g, '-');
              const nom = (values?.nom || '').toLowerCase().replace(/\s+/g, '-');
              return `${nom}-${prenom}`;
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'nom',
            label: 'Nom de famille',
            required: true,
          },
          {
            type: 'string',
            name: 'prenom',
            label: 'Prénom',
            required: true,
          },
          {
            type: 'string',
            name: 'role',
            label: 'Rôle',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
            required: true,
          },
          {
            type: 'image',
            name: 'photo',
            label: 'Photo',
          },
          {
            type: 'string',
            name: 'categorie',
            label: 'Catégorie',
            required: true,
            options: [
              { value: 'direction', label: 'Direction (Président / Vice-Président)' },
              { value: 'bureau', label: 'Bureau (Trésorier, Secrétaire…)' },
              { value: 'membre', label: 'Membre du conseil' },
            ],
          },
          {
            type: 'number',
            name: 'ordre',
            label: 'Ordre d\'affichage',
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────
      // 2. SPONSORS
      //    Un fichier par sponsor. Partagé FR/EN.
      // ──────────────────────────────────────────────────────────────
      {
        name: 'sponsors',
        label: 'Partenaires / Sponsors',
        path: 'content/sponsors',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'nom',
            label: 'Nom du partenaire',
            required: true,
            isTitle: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo',
          },
          {
            type: 'string',
            name: 'url',
            label: 'Site web',
          },
          {
            type: 'number',
            name: 'ordre',
            label: 'Ordre d\'affichage',
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────
      // 3. ACTUALITÉS / ÉVÉNEMENTS
      //    Un fichier par événement, par locale (fr/ et en/).
      // ──────────────────────────────────────────────────────────────
      {
        name: 'actualites',
        label: 'Actualités & Événements',
        path: 'content/actualites',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titre',
            label: 'Titre',
            required: true,
            isTitle: true,
          },
          {
            type: 'string',
            name: 'tag',
            label: 'Tag affiché (ex: 🎾 Événement)',
          },
          {
            type: 'string',
            name: 'dates',
            label: 'Dates (ex: Du 2 au 25 avril 2025)',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'lien',
            label: 'URL du lien CTA',
          },
          {
            type: 'string',
            name: 'lienLabel',
            label: 'Texte du lien CTA (ex: S\'inscrire sur Ten\'Up →)',
          },
          {
            type: 'image',
            name: 'image',
            label: 'Image de fond',
          },
          {
            type: 'string',
            name: 'locale',
            label: 'Langue',
            required: true,
            options: [
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
            ],
          },
          {
            type: 'boolean',
            name: 'publie',
            label: 'Publié',
          },
        ],
      },

      // ──────────────────────────────────────────────────────────────
      // 4. ENTRAÎNEMENTS
      //    Document singleton par locale : coachs + planning semaine.
      //    content/entrainements/fr.md et content/entrainements/en.md
      // ──────────────────────────────────────────────────────────────
      {
        name: 'entrainements',
        label: 'Entraînements (coachs & planning)',
        path: 'content/entrainements',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'locale',
            label: 'Langue',
            required: true,
            options: [
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
            ],
          },
          // Coachs
          {
            type: 'object',
            name: 'coachs',
            label: 'Coachs',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.nom || 'Coach' }) },
            fields: [
              {
                type: 'string',
                name: 'nom',
                label: 'Nom complet',
                required: true,
              },
              {
                type: 'string',
                name: 'diplome',
                label: 'Diplôme (ex: DEJEPS, CQP)',
              },
            ],
          },
          // Planning : un objet par jour de la semaine
          {
            type: 'object',
            name: 'planning',
            label: 'Planning de la semaine',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.jour || 'Jour' }) },
            fields: [
              {
                type: 'string',
                name: 'jour',
                label: 'Jour',
                required: true,
                options: [
                  { value: 'lundi',    label: 'Lundi' },
                  { value: 'mardi',    label: 'Mardi' },
                  { value: 'mercredi', label: 'Mercredi' },
                  { value: 'jeudi',    label: 'Jeudi' },
                  { value: 'vendredi', label: 'Vendredi' },
                  { value: 'samedi',   label: 'Samedi' },
                ],
              },
              {
                type: 'object',
                name: 'creneaux',
                label: 'Créneaux',
                list: true,
                ui: { itemProps: (item) => ({ label: `${item?.time || ''} — ${item?.label || ''}` }) },
                fields: [
                  {
                    type: 'string',
                    name: 'time',
                    label: 'Horaire (ex: 9H - 10H)',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Groupe (ex: ADULTES MIXTE)',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'coach',
                    label: 'Coach(s)',
                  },
                ],
              },
            ],
          },
        ],
      },

    ],
  },
});
