# 1Fi Full Stack Developer Assignment

Full-stack web application that displays products (e.g., smartphones) with multiple EMI plans backed by mutual funds. All data is loaded from a backend API connected to MongoDB.

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend  | Node.js, Express  |
| Database | MongoDB           |

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## Setup and Run

1. **Clone and enter project**
   ```bash
   cd "1Fi Tech"
   ```

2. **Backend**
   - Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` (and optionally `PORT`).
   - Install and run:
   ```bash
   cd backend
   npm install
   npm run seed
   npm run dev
   ```
   API runs at `http://localhost:5000` by default.

3. **Frontend**
   - Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL=http://localhost:5000` (or your backend URL).
   - Install and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs at `http://localhost:3000`.

4. **Production build**
   ```bash
   cd frontend && npm run build
   ```
   Serve the `frontend/dist` folder (e.g. Vercel, Render).

For step-by-step instructions see [RUN.md](./RUN.md).

## API Endpoints

### GET `/api/products`

Returns a list of all products (summary).

**Example response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "variantCount": 3
    }
  ]
}
```

### GET `/api/products/:slug`

Returns a single product by slug with full details and variants (including EMI plans).

**Example:** `GET /api/products/iphone-17-pro`

**Example response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "tagline": "EMI plans backed by mutual funds",
    "isNew": true,
    "variants": [
      {
        "variantLabel": "256GB",
        "finishName": "Orange",
        "mrp": 134900,
        "currentPrice": 127400,
        "imageUrl": "https://...",
        "emiPlans": [
          {
            "monthlyAmount": 44967,
            "tenureMonths": 3,
            "interestRate": 0,
            "cashback": 7500
          }
        ]
      }
    ]
  }
}
```

### GET `/api/health`

Health check.

**Example response:** `{ "status": "ok", "timestamp": "..." }`

## Schema

**Product** (MongoDB collection: `products`)

| Field     | Type     | Description                    |
|----------|----------|--------------------------------|
| name     | String   | Product name                   |
| slug     | String   | Unique URL slug                |
| tagline  | String   | e.g. EMI tagline               |
| isNew    | Boolean  | Show NEW badge                 |
| variants | Array    | List of variants (see below)   |

**Variant** (embedded in Product)

| Field        | Type   | Description        |
|-------------|--------|--------------------|
| variantLabel| String | e.g. "256GB"       |
| finishName  | String | e.g. "Orange"      |
| mrp         | Number | Original price     |
| currentPrice| Number | Selling price      |
| imageUrl    | String | Image URL          |
| emiPlans    | Array  | EMI plan objects   |

**EMI Plan** (embedded in Variant)

| Field         | Type   | Description      |
|--------------|--------|------------------|
| monthlyAmount| Number | EMI amount       |
| tenureMonths | Number | Tenure in months |
| interestRate | Number | e.g. 0 or 10.5   |
| cashback     | Number | Cashback amount  |

## Seed Data

- **Location:** `backend/scripts/seed.js`
- **Run:** `cd backend && npm run seed`
- Seeds 3 products (iPhone 17 Pro, Samsung S24 Ultra, Google Pixel 9 Pro), each with 2+ variants and multiple EMI plans per variant.

## Project Structure

```
1Fi Tech/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/product.controller.js
│   │   ├── models/Product.js
│   │   ├── routes/product.routes.js
│   │   └── index.js
│   ├── scripts/seed.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/products.js
│   │   ├── pages/HomePage.jsx, ProductPage.jsx
│   │   ├── App.jsx, main.jsx, index.css
│   │   └── ...
│   ├── .env
│   └── package.json
├── README.md
└── RUN.md
```

## Deployed Demo

Deploy backend (e.g. Render, Railway) and frontend (e.g. Vercel). Set `VITE_API_URL` to the deployed API URL before building the frontend.
