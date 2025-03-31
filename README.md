# ZenBnB

ZenBnB est un projet de gestion de réservations de logements avec fonctionnalités avancées telles que le tri des logements en fonction de plusieurs critères, la validation des formulaires utilisateurs et la personnalisation des services.

---

## Démo en ligne
👉 https://Alex05510.github.io/zenBnB/

---

## Technologies utilisées
- **HTML** : Pour la structure de l'application.
- **CSS** : Pour le design des pages.
- **SCSS** : Pour une gestion plus flexible des styles CSS.
- **JavaScript** : Pour l'interactivité et la logique.
- **GSAP** : Pour les animations fluides et modernes.

---

## Fonctionnalités principales
1. **Chargement dynamique des données** :
   - Les logements sont chargés depuis un fichier JSON (`zenbnb.json`).
   - Tri des logements par prix et par critères spécifiques (Wi-Fi, Vue sur mer, etc.).

2. **Gestion des réservations** :
   - Un formulaire interactif permettant de personnaliser sa réservation (logement, services additionnels, nombre de chambres, etc.).
   - Validation et sauvegarde des informations utilisateur avec `LocalStorage`.

3. **Affichage dynamique** :
   - Les logements sont affichés dans des catégories comme :
     - Moins de 80€.
     - Entre 80€ et 120€.
     - Haut de gamme (>120€).
   - Les styles varient en fonction des notes des logements :
     - Vert pour une note >= 4.5.
     - Rouge pour une note < 3.5.

4. **Calcul du coût total** :
   - Basé sur le type de logement, le nombre de nuits, les services ajoutés (petit-déjeuner, chauffeur, guide, etc.).

5. **Animations GSAP** :
   - Apparition dynamique des éléments avec des effets élastiques.
   - Disparition des éléments avec fluidité.
   - Agrandissement au survol.

---

## Auteur
Alexandre – DevWeb, promotion 2025.

---

## Fichier JSON d'exemple (`zenbnb.json`)
Voici un exemple du fichier JSON utilisé pour alimenter le projet :

```json
{
  "listings": [
    {
      "title": "Charmante maison au bord de la mer",
      "description": "Idéal pour des vacances relaxantes.",
      "city": "Nice",
      "price_per_night": 120,
      "rating": 4.8,
      "guest_capacity": 4,
      "image": "https://via.placeholder.com/150",
      "tag": ["Vue mer", "Wi-Fi"],
      "wifi": true,
      "superhost": true,
      "seaView": true
    },
    {
      "title": "Appartement en centre-ville",
      "description": "Parfait pour un séjour en ville.",
      "city": "Marseille",
      "price_per_night": 75,
      "rating": 3.6,
      "guest_capacity": 2,
      "image": "https://via.placeholder.com/150",
      "tag": ["Centre-ville", "Accessible"],
      "wifi": false,
      "superhost": false,
      "seaView": false
    }
  ]
}
