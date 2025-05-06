import { motion } from 'framer-motion';
import { Search, Globe, BarChart3, Cpu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Analyze() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    industry: '',
    region: 'global',
    depth: 'basic'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnalysis = async () => {
    if (!formData.industry.trim()) {
      alert('Please enter an industry or niche');
      return;
    }
  
    setIsAnalyzing(true);
  
    try {
      const response = await fetch('https://gap-ly-backend.onrender.com/analyze-market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch market analysis');
      }
  
      const data = await response.json();
      
      // Store results in localStorage
      localStorage.setItem('marketAnalysis', JSON.stringify({
        industry: formData.industry,
        region: formData.region,
        depth: formData.depth,
        timestamp: new Date().toISOString(),
        results: data
      }));
  
      // Navigate to insights page
      navigate('/insights');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };
  

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 rounded-2xl relative z-10"
        >
          <h2 className="font-cyber text-3xl md:text-4xl text-cyber-orange mb-8 text-center neon-glow-orange">
            Market Analysis Input
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-cyber text-sm text-cyber-mint">Industry/Niche</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
                  placeholder="Enter industry or niche..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-cyber text-sm text-cyber-mint">Target Region</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all appearance-none"
                >
                  <option value="global">Global</option>
                  <option value="na">North America</option>
                  <option value="eu">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="other">Other Regions</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-cyber text-sm text-cyber-mint">Analysis Depth</label>
              <div className="relative">
                <BarChart3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                <select
                  name="depth"
                  value={formData.depth}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all appearance-none"
                >
                  <option value="basic">Basic Analysis</option>
                  <option value="advanced">Advanced Analysis</option>
                  <option value="deep">Deep Dive Analysis</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="w-full glass-panel py-4 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Cpu className="animate-spin" />
                  Processing Analysis...
                </>
              ) : (
                'Generate Market Analysis'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}