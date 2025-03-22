import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ElderlyCareHome from './components/elderly-care/ElderlyCareHome';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-sand">
        <div className="fixed inset-0 bg-grain pointer-events-none"></div>
        <div className="relative">
          <Routes>
            <Route path="/" element={<ElderlyCareHome />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;