# Le Temps des Solitudes

> Une data story en scrollytelling vertical pour la Journée du Câlin (21 janvier)

## 📖 Concept

**Le Temps des Solitudes** est une expérience web interactive qui explore le phénomène de la solitude en France à travers une narration immersive en scrollytelling vertical avec des effets parallax. 

Ce projet transforme les données de l'étude "Solitudes 2024" de la Fondation de France en une histoire visuelle et émotionnelle, proposée à l'occasion de la Journée mondiale du câlin (21 janvier). L'objectif est de sensibiliser le public aux différentes facettes de la solitude et encourager la connexion humaine.

## 📊 Sources de données

Les données proviennent de l'étude **"Solitudes 2024"** publiée par la **Fondation de France**.

- **Source principale** : Rapport "Solitudes 2024" - Fondation de France
- **Stockage** : Fichiers JSON statiques dans `/src/data/`
- **Validation** : Chaque donnée inclut un badge de vérification :
  - `source_verifiee` : Donnée vérifiée et citée avec référence
  - `source_a_verifier` : Donnée à confirmer ou à mettre à jour

### Format des données

Chaque point de données inclut :
- `value` : La valeur numérique ou textuelle
- `description` : Description de la donnée
- `source` : Référence précise (page, figure, tableau)
- `badge` : `"source_verifiee"` ou `"source_a_verifier"`

Exemple :
```json
{
  "id": "solitude_france_2024",
  "value": "11 millions",
  "description": "Nombre de personnes en situation de solitude en France",
  "source": {
    "document": "Solitudes 2024",
    "organisme": "Fondation de France",
    "page": 8,
    "figure": "Figure 1"
  },
  "badge": "source_verifiee"
}
```

## 🛠️ Stack technique

### Framework & Outils
- **Vite** : Build tool et dev server
- **React** : Bibliothèque UI
- **Scrollama** : Gestion du scrollytelling et des transitions
- **D3.js / SVG** : Visualisations de données interactives
- **Tailwind CSS** : Styling et design responsive

### Architecture
```
Vite (bundler) 
  → React (components)
    → Scrollama (scroll-driven storytelling)
    → D3/SVG (data visualizations)
    → Tailwind (styling)
```

## 🚀 Installation et lancement local

### Prérequis
- Node.js >= 18.x
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/hericlibong/Calin_day.git
cd Calin_day

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Autres commandes

```bash
# Build de production
npm run build

# Preview du build de production
npm run preview

# Linting
npm run lint

# Formattage du code
npm run format
```

## 📁 Structure du projet

```
Calin_day/
├── public/              # Assets statiques
│   └── images/         # Images et illustrations
├── src/
│   ├── components/     # Composants React
│   │   ├── ScrollySection.jsx   # Section de scrollytelling
│   │   ├── DataViz.jsx          # Visualisations D3
│   │   ├── ParallaxLayer.jsx    # Couches parallax
│   │   └── StoryCard.jsx        # Cartes de contenu
│   ├── data/           # Données JSON
│   │   ├── solitudes.json       # Données principales
│   │   └── sources.json         # Références des sources
│   ├── hooks/          # Custom hooks React
│   │   └── useScrollama.js      # Hook pour Scrollama
│   ├── styles/         # Styles globaux
│   │   └── index.css           # Tailwind + custom CSS
│   ├── utils/          # Fonctions utilitaires
│   │   └── dataLoader.js       # Chargement et validation des données
│   ├── App.jsx         # Composant principal
│   └── main.jsx        # Point d'entrée
├── index.html          # Template HTML
├── package.json        # Dépendances et scripts
├── vite.config.js      # Configuration Vite
├── tailwind.config.js  # Configuration Tailwind
└── README.md          # Ce fichier
```

## 📐 Conventions des données JSON

### Structure du fichier `solitudes.json`

```json
{
  "metadata": {
    "title": "Solitudes 2024",
    "source": "Fondation de France",
    "date": "2024",
    "url": "https://www.fondationdefrance.org"
  },
  "sections": [
    {
      "id": "section_1",
      "title": "Les chiffres de la solitude",
      "data": [
        {
          "id": "data_1",
          "value": "11 millions",
          "description": "Personnes en situation de solitude",
          "source": {
            "page": 8,
            "figure": "Figure 1"
          },
          "badge": "source_verifiee"
        }
      ]
    }
  ]
}
```

### Badges de vérification

- **`source_verifiee`** : Donnée extraite directement du rapport avec référence précise (page, figure, tableau)
- **`source_a_verifier`** : Donnée nécessitant une vérification supplémentaire ou une mise à jour

### Références des sources

Le fichier `sources.json` centralise toutes les références bibliographiques :

```json
{
  "sources": [
    {
      "id": "solitudes_2024",
      "title": "Rapport sur les Solitudes 2024",
      "author": "Fondation de France",
      "year": 2024,
      "url": "https://www.fondationdefrance.org/fr/rapport-solitudes-2024",
      "type": "rapport"
    }
  ]
}
```

## 🗺️ Roadmap

### Version 1.0 (MVP) - Journée du Câlin 2025
- [x] Conception et architecture du projet
- [ ] Intégration des données Solitudes 2024
- [ ] Développement de la structure de scrollytelling
- [ ] Création de 3-5 visualisations D3 clés
- [ ] Effets parallax et animations
- [ ] Design responsive (mobile-first)
- [ ] Tests et optimisations de performance
- [ ] Déploiement pour le 21 janvier

### Version 2.0 (Évolutions futures)
- [ ] Ajout d'interactions utilisateur (quiz, témoignages)
- [ ] Visualisations avancées (cartographie, timeline)
- [ ] Comparaisons internationales
- [ ] Version multilingue (FR/EN)
- [ ] Intégration de l'API de la Fondation de France (si disponible)
- [ ] Partage social et export de données
- [ ] Accessibilité RGAA/WCAG AA
- [ ] Analytics et suivi d'engagement

## 🎨 Design & UX

- **Approche** : Mobile-first, progressive enhancement
- **Palette** : Tons chaleureux et accessibles (à définir selon charte)
- **Typographie** : Lisible et émotionnelle
- **Animations** : Fluides et significatives (pas de décoration superflue)
- **Accessibilité** : Respect des standards WCAG 2.1 niveau AA

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Committer vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est développé dans le cadre d'une sensibilisation au phénomène de la solitude, en s'appuyant sur les données publiques de la Fondation de France.

## 🔗 Ressources

- [Fondation de France - Rapport Solitudes 2024](https://www.fondationdefrance.org/fr/rapport-solitudes-2024)
- [Journée mondiale du câlin - 21 janvier](https://fr.wikipedia.org/wiki/Journ%C3%A9e_mondiale_du_c%C3%A2lin)
- [Scrollama.js](https://github.com/russellsamora/scrollama)
- [D3.js Documentation](https://d3js.org/)
- [Vite Documentation](https://vitejs.dev/)

---

**Fait avec ❤️ pour sensibiliser à l'importance du lien social**
