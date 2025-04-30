import { motion } from 'framer-motion';
import { Search, Globe, BarChart3 } from 'lucide-react';

export default function MarketAnalysis() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-panel p-8 md:p-12 rounded-2xl max-w-4xl w-full mx-4 relative z-10"
      >
        <h2 className="font-cyber text-3xl md:text-4xl text-cyber-primary mb-8 text-center neon-glow">
          Market Analysis Input
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-cyber text-sm text-cyber-primary">Industry/Niche</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-primary" />
              <input
                type="text"
                className="w-full bg-cyber-dark-light border border-cyber-primary rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-primary transition-all"
                placeholder="Enter industry or niche..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-cyber text-sm text-cyber-primary">Target Region</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-primary" />
              <select className="w-full bg-cyber-dark-light border border-cyber-primary rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-primary transition-all appearance-none">
                <option value="global">Global</option>
                <option value="na">North America</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-cyber text-sm text-cyber-primary">Analysis Depth</label>
            <div className="relative">
              <BarChart3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-primary" />
              <select className="w-full bg-cyber-dark-light border border-cyber-primary rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-cyber-primary transition-all appearance-none">
                <option value="basic">Basic Analysis</option>
                <option value="advanced">Advanced Analysis</option>
                <option value="deep">Deep Dive Analysis</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full glass-panel py-4 rounded-lg font-cyber text-cyber-primary border border-cyber-primary neon-border mt-8"
          >
            Generate Market Analysis
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}