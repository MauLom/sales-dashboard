import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";
import TopProducts from "./pages/TopProducts";
import SalesAnalytics from "./pages/SalesAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
         <Route path="/top-products" element={<TopProducts />} /> 
         <Route path="/sales-analytics" element={<SalesAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
