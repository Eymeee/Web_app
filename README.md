# Web App (Next.js 14 + Prisma)

## Prérequis
- Node >= 18.17
- npm

## Installation
```
npm install
```

## Base de données (SQLite)
```
npm run db:generate
npm run db:migrate
npm run db:seed
```
Le fichier est stocké dans `prisma/dev.db`.

## Lancer le projet
```
npm run dev
```

## Tests
```
npm run test
```

## Endpoints principaux
- `GET /api/products` — liste des produits
- `POST /api/products` — créer
- `GET /api/products/:id` — détail
- `PUT /api/products/:id` — mise à jour
- `DELETE /api/products/:id` — suppression
- `GET /api/cart` — panier courant (items + total)
- `POST /api/cart` — ajouter/incrémenter un article
- `PUT /api/cart/:id` — modifier quantité
- `DELETE /api/cart/:id` — supprimer
- `POST /api/checkout` — crée une transaction depuis le panier et vide le panier
- `GET /api/transactions` — liste des transactions
- `GET /api/transactions/:id` — détail (items + products)
- `POST /api/detections` — ajoute au panier via label/sku

## Scénario de test manuel
1. Créer un produit (ou utiliser ceux du seed).
2. Ajouter un article au panier via `/api/cart` (ou interface /cart).
3. Consulter `/api/cart` pour vérifier le total.
4. Valider la transaction via `/api/checkout`.
5. Vérifier l’historique via `/transactions` et `/api/transactions`.

## Exemple curl /api/detections
```
curl -X POST http://localhost:3000/api/detections \
  -H "Content-Type: application/json" \
  -d '{"label":"SNACK-001","quantity":2}'
```
Retour: contenu du panier et total. Si le label ne correspond ni au nom ni au SKU, la réponse est `400` avec `Produit inconnu: ...`.
