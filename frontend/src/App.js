import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";
import TopProducts from "./pages/TopProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
         <Route path="/top-products" element={<TopProducts />} /> 
      </Routes>
    </Router>
  );
}

export default App;
