# How to Run the Project

Follow these steps to run the 1Fi EMI app locally.

## 1. Environment

- Install **Node.js** (v18 or newer): https://nodejs.org/
- Install **MongoDB** locally or create a free cluster at https://www.mongodb.com/cloud/atlas and get the connection string.

## 2. Backend

1. Open a terminal and go to the backend folder:
   ```
   ```

2. Create/update the `.env` file (copy from `.env.example` if needed). Set:
   - `MONGODB_URI` – your MongoDB connection string (e.g. `mongodb://localhost:27017/1fi-emi` or Atlas URI).
   - `PORT` – optional, default is 5000.

3. Install dependencies and seed the database:
   ```bash
   npm install
   npm run seed
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   You should see "MongoDB connected" and "Server running on port 5000". Keep this terminal open.

## 3. Frontend

1. Open a **new** terminal and go to the frontend folder:
   ```
   ```

2. Create/update the `.env` file. Set:
   - `VITE_API_URL=http://localhost:5000` (or the URL where your backend is running).

3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```

4. Open the URL shown (usually http://localhost:3000) in your browser.

## 4. What You Can Do

- **Home:** List of products; click one to open its product page.
- **Product page:** View name, variant, MRP, current price, image; switch finishes (color circles); select an EMI plan; click "Proceed with selected plan".

## 5. Re-seed Database

To reset and re-seed the database:

```bash
cd backend
npm run seed
```

## 6. Production Build (Frontend)

To build the frontend for deployment:

```bash
cd frontend"
npm run build
```

Output is in `frontend/dist`. Deploy this folder to Vercel/Netlify/etc. Set `VITE_API_URL` to your production API URL **before** running `npm run build`.

## Troubleshooting

- **"Cannot connect to MongoDB"**  
  Check `MONGODB_URI` in `backend/.env`. For Atlas, ensure IP is whitelisted and the URI includes username/password.

- **Frontend shows "Could not load products"**  
  Ensure backend is running on the port in `VITE_API_URL` and CORS is enabled (it is by default). If using a different host/port, update `VITE_API_URL` and restart the frontend dev server.

- **Port already in use**  
  Change `PORT` in `backend/.env` or the port in `frontend/vite.config.js` and update `VITE_API_URL` accordingly.
