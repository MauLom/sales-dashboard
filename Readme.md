# 🔩 Sales & Revenue Dashboard

Full-Stack take-home assignment for an e-commerce analytics dashboard.

## 📦 Project Structure

```
sales-dashboard/
🔺📂 backend/       # Node.js + Express + Apollo Server + MongoDB
🔺📂 frontend/      # React + Apollo Client + Chakra UI
```

---

## 🚀 Quick Start

### 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run seed       # Optional: populate test data
npm run dev        # Runs server with nodemon
```

📂 `.env` example:

```
MONGO_URI=mongodb://localhost:27017/sales_dashboard
```

The server will run at:
`http://localhost:4000/graphql`

---

### ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run at:
`http://localhost:3000`

---

## 🔍 Functional Overview

### 1. Customer Dashboard

* Input: Customer ID
* Output: Total spent, average order value, last order date

### 2. Top Products

* Filter: Limit selector (5, 10, 20)
* Output: Product list with name, quantity sold, price

### 3. Sales Analytics

* Input: Date range
* Output: Revenue stats, completed orders, category-wise chart

---

## 🧠 Tech Stack

### Backend

* Node.js, Express, Apollo Server
* MongoDB, Mongoose
* GraphQL (typeDefs + resolvers)
* Redis (optional)
* Docker (optional)

### Frontend

* React
* Apollo Client
* Chakra UI
* Chart.js or Recharts
* React Router

---

## 📌 Dev Scripts

### Backend

* `npm run dev` – run backend with `nodemon`
* `npm run seed` – populate mock data

### Frontend

* `npm start` – run development server

---

## 📁 To-Do via Pull Requests

* [ ] Add GraphQL typeDefs and resolvers
* [ ] Implement queries: `getCustomerSpending`, `getTopSellingProducts`, `getSalesAnalytics`
* [ ] Build customer dashboard UI
* [ ] Add date picker and product filters
* [ ] Add error and loading states
* [ ] Bonus: Redis caching, Docker, tests

---

## ✅ Submission Checklist

* [ ] Functional backend with GraphQL queries
* [ ] Responsive frontend with dashboards
* [ ] `.env.example` and seed data
* [ ] README with setup instructions
* [ ] Sample GraphQL queries (`/queries.graphql`)
* [ ] Screenshots (optional)

---

## 👤 Author

Mauricio Lombano – 2025
