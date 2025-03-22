import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomerInsights from './components/CustomerInsights';
import VoiceCare from './components/VoiceCare';
import VisionPage from './components/VisionPage';
import ToolsPage from './components/ToolsPage';
import ProductsPage from './components/ProductsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-sand">
        <div className="fixed inset-0 bg-grain pointer-events-none"></div>
        <div className="relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<VisionPage />} />
            <Route path="/customer-insights" element={<CustomerInsights />} />
            <Route path="/voicecare" element={<VoiceCare />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;