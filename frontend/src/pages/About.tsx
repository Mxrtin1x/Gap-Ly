import { motion } from 'framer-motion';
import { Cpu, Database, Globe, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-cyber-orange" />,
      title: "DeepSeek AI Integration",
      description: "Powered by advanced artificial intelligence to analyze market trends and opportunities."
    },
    {
      icon: <Database className="w-8 h-8 text-cyber-mint" />,
      title: "Comprehensive Data Analysis",
      description: "Process millions of data points to identify market gaps and potential opportunities."
    },
    {
      icon: <Globe className="w-8 h-8 text-cyber-red" />,
      title: "Global Market Coverage",
      description: "Analyze markets across different regions and industries worldwide."
    },
    {
      icon: <Zap className="w-8 h-8 text-cyber-orange" />,
      title: "Real-time Insights",
      description: "Get instant access to market analysis and actionable recommendations."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-cyber text-4xl md:text-5xl text-cyber-orange neon-glow-orange mb-6">
            About Our Technology
          </h1>
          <p className="text-xl text-cyber-mint max-w-2xl mx-auto">
            Discover how our AI-powered platform revolutionizes market analysis and business intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-xl text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-cyber text-xl text-cyber-mint mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-panel p-8 rounded-xl"
        >
          <h2 className="font-cyber text-2xl text-cyber-orange mb-6">How It Works</h2>
          <div className="cyber-terminal">
            <p className="mb-2">$ initializing_market_analysis.sh</p>
            <p className="mb-2">{'>'} Loading DeepSeek AI modules...</p>
            <p className="mb-2">{'>'} Connecting to global market database...</p>
            <p className="mb-2">{'>'} Analyzing market patterns...</p>
            <p className="text-cyber-orange">{'>'} Ready for market gap analysis</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}