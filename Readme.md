# 🧩 Sales & Revenue Dashboard

Full-Stack take-home assignment for an e-commerce analytics dashboard.

## 📦 Project Structure

```
sales-dashboard/
├── backend/       # Node.js + Express + Apollo Server + MongoDB
└── frontend/      # React + Apollo Client + Chakra UI
```

---

## 🚀 Quick Start

### 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run seed       # Populate test data
npm run dev        # Start server with nodemon
```

📂 `.env` example:

```
MONGO_URI=mongodb://localhost:27017/sales_dashboard
```

Backend GraphQL available at:
`http://localhost:4000/graphql`

---

### ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend available at:
`http://localhost:3000`

---

## 🔍 Functional Pages

### 1. Customer Dashboard `/`

* Input: Customer ID
* Output:

  * Total spent
  * Average order value
  * Last order date

### 2. Top Products `/top-products`

* Filter: Limit (5, 10, 20)
* Output:

  * Name
  * Quantity sold
  * Price

### 3. Sales Analytics `/sales-analytics`

* Input: Date range (start + end)
* Output:

  * Total revenue
  * Completed orders
  * Bar chart of revenue per category

---

## 🧠 Tech Stack

### Backend

* Node.js, Express, Apollo Server
* MongoDB, Mongoose
* GraphQL + Aggregation Pipeline
* Indexed fields for performance (`orderDate`, `status`)

### Frontend

* React.js
* Apollo Client
* Chakra UI
* Recharts
* React Router DOM

---

## 📁 Directory Overview

```
/backend
  ├── models/
  ├── resolvers/
  ├── schema/
  ├── server.js
  ├── seed.js
/frontend
  └── src/
      ├── components/
      ├── pages/
      ├── graphql/
      ├── App.js
      ├── index.js
```

## 👤 Author

Mauricio Lombano – mauricio.lombano@gmail.com –2025
