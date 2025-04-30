import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navigation bar
import Home from './pages/Home';          // Home page component
import Analyze from './pages/Analyze';    // Analysis page
import Insights from './pages/Insights';  // Market insights page
import CompetitorAnalysis from './pages/CompetitorAnalysis';    // Competitor analysis page
import MarketPredictions from './pages/MarketPredictions';      // Future market prediction page
import BusinessStrategy from './pages/BusinessStrategy';        // Business strategy suggestions
import ContentStrategy from './pages/ContentStrategy';          // Content strategy suggestions

// Main App component that sets up routing and layout
function App() {
  return (
    // Set up router to enable navigation between pages without refreshing
    <Router>
      {/* Main container with a background color and full height */}
      <div className="bg-cyber-black min-h-screen">
      {/* Always visible navigation bar at the top */}
        <Navbar />
        {/* Define the different routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />               {/* Home route */}
          <Route path="/analyze" element={<Analyze />} />     {/* Analysis tool */}
          <Route path="/insights" element={<Insights />} />   {/* Market insights */}  
          <Route path="/competitor-analysis" element={<CompetitorAnalysis />} /> {/* Competitor overview */}
          <Route path="/market-predictions" element={<MarketPredictions />} />   {/* Future trends */}
          <Route path="/business-strategy" element={<BusinessStrategy />} />     {/* Business suggestions */}
          <Route path="/content-strategy" element={<ContentStrategy />} />       {/* Content suggestions */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;