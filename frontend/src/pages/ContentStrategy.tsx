import { motion } from 'framer-motion';
import { Search, Hash, TrendingUp, Share2, FileText, Globe } from 'lucide-react';
import { useState } from 'react';

interface ContentStrategy {
  keywords: string[];
  blogTopics: string[];
  socialMedia: {
    platform: string;
    content: string;
    frequency: string;
  }[];
  viralAngles: string[];
  contentPlatforms: {
    name: string;
    traffic: string;
    engagement: string;
  }[];
}

export default function ContentStrategy() {
  const [niche, setNiche] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strategy, setStrategy] = useState<ContentStrategy | null>(null);

  const handleGenerateStrategy = async () => {
    if (!niche.trim()) {
      alert('Please enter your business niche');
      return;
    }
  
    setIsAnalyzing(true);
    setStrategy(null); // Reset previous results
  
    try {
      const response = await fetch('https://ai-market-be.onrender.com/generate-content-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessIdea: niche }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch content strategy');
      }
  
      const data = await response.json();
      
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setStrategy(data);
      } else {
        alert('Received empty or invalid response from the server.');
      }
    } catch (error) {
      alert('Strategy generation failed. Please try again.');
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
          className="glass-panel p-8 rounded-2xl"
        >
          <h2 className="font-cyber text-3xl text-cyber-orange mb-6 neon-glow-orange">
            AI Content Strategy Generator
          </h2>

          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
                  placeholder="Enter your business niche..."
                />
              </div>
            </div>
            <button
              onClick={handleGenerateStrategy}
              disabled={isAnalyzing}
              className="glass-panel px-8 py-3 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Generate Strategy'}
            </button>
          </div>

          {strategy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Target Keywords
                  </h3>
                  <ul className="space-y-2">
                  {strategy?.targetKeywords?.length ? (
                    strategy.targetKeywords.map((keyword, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80">
                        <span className="w-2 h-2 bg-cyber-orange rounded-full" />
                        {keyword}
                      </li>
                    ))
                  ) : (
                    <li className="text-white/50">No keyword data available</li>
                  )}
                </ul>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Blog Topics
                  </h3>
                  <ul className="space-y-2">
    {strategy?.blogTopics?.length ? (
      strategy.blogTopics.map((topic, index) => (
        <li key={index} className="flex items-center gap-2 text-white/80">
          <span className="w-2 h-2 bg-cyber-orange rounded-full" />
          {topic}
        </li>
      ))
    ) : (
      <li className="text-white/50">No blog topics available</li>
    )}
  </ul>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Social Media Strategy
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
    {strategy?.socialMediaStrategy ? (
      Object.entries(strategy.socialMediaStrategy).map(([platform, details], index) => (
        <div key={index} className="p-4 bg-cyber-dark-light rounded-lg">
          <h4 className="font-cyber text-cyber-orange mb-2">{platform}</h4>
          <p className="text-white/80 text-sm mb-1">{details.description}</p>
          <p className="text-cyber-mint text-sm">{details.frequency}</p>
        </div>
      ))
    ) : (
      <p className="text-white/50">No social media strategy available</p>
    )}
  </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Viral Marketing Angles
                  </h3>
                  <ul className="space-y-2">
    {strategy?.viralMarketingAngles?.length ? (
      strategy.viralMarketingAngles.map((angle, index) => (
        <li key={index} className="flex items-center gap-2 text-white/80">
          <span className="w-2 h-2 bg-cyber-orange rounded-full" />
          {angle}
        </li>
      ))
    ) : (
      <li className="text-white/50">No viral angles available</li>
    )}
  </ul>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Content Platforms
                  </h3>
                  <div className="space-y-4">
    {strategy?.contentPlatforms ? (
      Object.entries(strategy.contentPlatforms).map(([platform, details], index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-white/80">{platform}</span>
          <div className="text-right">
            <div className="text-cyber-orange">{details.traffic} Traffic</div>
            <div className="text-cyber-mint text-sm">{details.conversion}</div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white/50">No content platform data available</p>
    )}
  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}