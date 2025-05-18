import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";
import TopProducts from "./pages/TopProducts";
import SalesAnalytics from "./pages/SalesAnalytics";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/sales-analytics" element={<SalesAnalytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
