import { motion } from 'framer-motion';
import { Brain, ChevronDown, Cpu, Globe, BarChart3, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="relative pt-20 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Brain className="w-20 h-20 mx-auto mb-6 text-cyber-orange animate-float" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cyber text-5xl md:text-7xl font-bold mb-6 neon-glow-orange glitch-text"
            data-text="Gap-Ly"
          >
            Gap-Ly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-cyber-mint max-w-2xl"
          >
            Harness the power of advanced AI to uncover hidden market opportunities and stay ahead of the competition
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/analyze"
              className="relative z-10 inline-block glass-panel px-8 py-4 rounded-full font-cyber text-cyber-orange border border-cyber-orange neon-border-orange hover:bg-cyber-orange/10 transition-all cursor-pointer"
            >
              Start Analysis
            </Link>
            <button
              onClick={scrollToFeatures}
              className="relative z-10 inline-block glass-panel px-8 py-4 rounded-full font-cyber text-cyber-mint border border-cyber-mint hover:bg-cyber-mint/10 transition-all cursor-pointer"
            >
              Explore Features
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-cyber-orange animate-bounce" />
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 bg-gradient-to-r from-cyber-orange via-cyber-mint to-cyber-red rounded-full blur-3xl animate-[spin_10s_linear_infinite]" />
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-cyber text-center text-cyber-orange mb-16 neon-glow-orange"
          >
            Market Gap Identifier Powered by Advanced AI
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-12 h-12" />,
                title: "AI Integration",
                description: "Advanced artificial intelligence analyzing market trends in real-time"
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Global Coverage",
                description: "Comprehensive analysis across different regions and industries"
              },
              {
                icon: <BarChart3 className="w-12 h-12" />,
                title: "Deep Analytics",
                description: "Process millions of data points to identify market opportunities"
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Real-time Insights",
                description: "Get instant access to market analysis and recommendations"
              },
              {
                icon: <Lock className="w-12 h-12" />,
                title: "Secure Analysis",
                description: "Enterprise-grade security for your market research data"
              },
              {
                icon: <Brain className="w-12 h-12" />,
                title: "Smart Predictions",
                description: "AI-powered forecasting of market trends and opportunities"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl text-center group hover:border-cyber-orange transition-all duration-300"
              >
                <div className="mb-4 text-cyber-orange group-hover:scale-110 transform transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-cyber text-xl text-cyber-mint mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Demo Section */}
      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cyber-terminal rounded-xl overflow-hidden"
          >
            <div className="bg-cyber-dark-light p-2 border-b border-cyber-orange/20">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-cyber-red" />
                <div className="w-3 h-3 rounded-full bg-cyber-orange" />
                <div className="w-3 h-3 rounded-full bg-cyber-mint" />
              </div>
            </div>
            <div className="p-6 font-mono text-sm">
              <p className="text-cyber-mint">$ initializing_market_analysis.sh</p>
              <p className="text-white/70 mt-2">&gt; Loading AI modules...</p>
              <p className="text-white/70">&gt; Connecting to global market database...</p>
              <p className="text-white/70">&gt; Analyzing market patterns...</p>
              <p className="text-cyber-orange">&gt; Ready for market gap analysis</p>
              <p className="text-cyber-mint mt-4 animate-pulse">█</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}