import { motion } from 'framer-motion';
import { Search, BarChart3, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function CompetitorAnalysis() {
  const [competitor, setCompetitor] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysis = async () => {
    if (!competitor.trim()) {
      alert('Please enter a competitor name or website');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    try {
      const response = await fetch('https://ai-market-be.onrender.com/analyze-competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitorName: competitor }),
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch competitor analysis');
      }
    
      const data = await response.json();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setAnalysisResult(data);
      } else {
        alert('Received empty or invalid response from server.');
        setAnalysisResult(null);
      }
      
    } catch (error) {
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
    
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl mb-8"
        >
          <h2 className="font-cyber text-3xl text-cyber-orange mb-6 neon-glow-orange">
            AI Competitor Analysis
          </h2>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                <input
                  type="text"
                  value={competitor}
                  onChange={(e) => setCompetitor(e.target.value)}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
                  placeholder="Enter competitor name or website..."
                />
              </div>
            </div>
            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="glass-panel px-8 py-3 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 grid md:grid-cols-2 gap-8"
            >
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Market Position
                </h3>
                <div className="text-2xl text-cyber-orange font-cyber">
                {analysisResult?.marketPosition || 'N/A'}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Strategy Analysis
                </h3>
                <ul className="space-y-2">
  {analysisResult?.strategyAnalysis
    ? Object.entries(analysisResult.strategyAnalysis).map(([key, value]) => (
        <li key={key} className="flex justify-between">
          <span className="text-white/80 capitalize">{key}</span>
          <span className="text-cyber-orange">{value as string}</span>
        </li>
      ))
    : <li className="text-white/50">No strategy data available</li>
  }
</ul>


              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4">Strengths</h3>
                <ul className="space-y-2">
                {analysisResult?.strengths?.length ? (
                  analysisResult.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-orange rounded-full" />
                      {strength}
                    </li>
                  ))
                ) : <li className="text-white/50">No strengths data available</li>}

                </ul>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4">Weaknesses</h3>
                <ul className="space-y-2">
                {analysisResult?.weaknesses?.length ? (
                  analysisResult.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-red rounded-full" />
                      {weakness}
                    </li>
                  ))
                ) : <li className="text-white/50">No weaknesses data available</li>}

                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}