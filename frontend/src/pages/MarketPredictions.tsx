import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { useState } from 'react';

export default function MarketPredictions() {
  // State to store selected industry
  const [selectedIndustry, setSelectedIndustry] = useState('');
  // State to store fetched prediction data
  const [predictions, setPredictions] = useState<any>(null);

  // Function to handle prediction request
  const handlePrediction = async () => {
    // Prevent submission if no industry is selected
    if (!selectedIndustry) {
        alert('Please select an industry');
        return;
    }

    try {
        // Send POST request to prediction API
        const response = await fetch('https://gap-ly-backend.onrender.com/predict-market', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ industry: selectedIndustry }),
        });

        // Handle server errors
        if (!response.ok) {
            throw new Error('Failed to fetch market predictions');
        }

        const data = await response.json();
        // Validate and structure the received data
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            setPredictions({
                growthScore: data.growthScore.score,
                trend: data.growthScore.trend,
                futureModels: data.futureBusinessModels,
                yearlyGrowth: data.growthProjection.years.map((year, index) => ({
                    year: year,
                    growth: data.growthProjection.values[index],
                })),
            });
        } else {
            alert('Received empty or invalid response from server.');
            setPredictions(null);
        }

    } catch (error) {
        alert('Prediction failed. Please try again.');
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
            5-Year Market Predictions
          </h2>

          <div className="flex gap-4 mb-8">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="flex-1 bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
            >
              <option value="">Select Industry</option>
              <option value="tech">Technology</option>
              <option value="health">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
            </select>
            <button
              onClick={handlePrediction}
              className="glass-panel px-8 py-3 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange"
            >
              Generate Predictions
            </button>
          </div>

          {predictions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Score
                  </h3>
                  <div className="text-4xl text-cyber-orange font-cyber">
                    {predictions.growthScore}
                  </div>
                  <p className="text-white/80 mt-2">Industry Trend: {predictions.trend}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl md:col-span-2">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Future Business Models
                  </h3>
                  <ul className="space-y-2">
                  {predictions.futureModels?.length ? (
                      predictions.futureModels.map((model: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-cyber-orange" />
                          <span className="text-white/80">{model}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-white/50">No future business models available</li>
                    )}

                  </ul>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-6">Growth Projection</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictions.yearlyGrowth || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ff5f1f20" />
                      <XAxis dataKey="year" stroke="#3fffaf" />
                      <YAxis stroke="#3fffaf" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0a0a0a',
                          border: '1px solid #ff5f1f',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="#ff5f1f"
                        strokeWidth={2}
                        dot={{ fill: '#ff5f1f' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}