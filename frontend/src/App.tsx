import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Insights from './pages/Insights';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import MarketPredictions from './pages/MarketPredictions';
import BusinessStrategy from './pages/BusinessStrategy';
import ContentStrategy from './pages/ContentStrategy';

function App() {
  return (
    <Router>
      <div className="bg-cyber-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
          <Route path="/market-predictions" element={<MarketPredictions />} />
          <Route path="/business-strategy" element={<BusinessStrategy />} />
          <Route path="/content-strategy" element={<ContentStrategy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;