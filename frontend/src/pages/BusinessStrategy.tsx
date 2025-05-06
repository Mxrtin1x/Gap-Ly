import { motion } from 'framer-motion';
import { BrainCircuit, Target, Users, DollarSign, Rocket, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface BusinessPlan {
  targetAudience: string[];
  productStrategy: string[];
  marketingPlan: string[];
  financials: {
    estimatedRoi: string;
    breakEven: string;
    initialInvestment: string;
  };
}

export default function BusinessStrategy() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);

  const handleGenerateStrategy = async () => {
    if (!businessIdea.trim()) {
        alert('Please enter your business idea');
        return;
    }

    setIsGenerating(true);

    try {
        const response = await fetch('https://gap-ly-backend.onrender.com/generate-business-strategy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessIdea }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch business strategy');
        }

        const data = await response.json();

        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            setBusinessPlan({
                targetAudience: data.targetAudience || [],
                productStrategy: data.productStrategy || [],
                marketingPlan: data.marketingPlan || [],
                financials: {
                    estimatedRoi: data.financialProjections?.estimatedROI || 'N/A',
                    breakEven: data.financialProjections?.breakEvenPoint || 'N/A',
                    initialInvestment: data.financialProjections?.initialInvestment || 'N/A',
                },
            });
        } else {
            alert('Received empty or invalid response from server.');
            setBusinessPlan(null);
        }

    } catch (error) {
        alert('Strategy generation failed. Please try again.');
    } finally {
        setIsGenerating(false);
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
          <h2 className="font-cyber text-3xl text-cyber-orange mb-6 neon-glow-orange flex items-center gap-3">
            <BrainCircuit className="w-8 h-8" />
            AI Business Strategy Generator
          </h2>

          <div className="mb-8">
            <textarea
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              placeholder="Describe your business idea or market gap you want to target..."
              className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all h-32 resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateStrategy}
              disabled={isGenerating}
              className="mt-4 w-full glass-panel py-4 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Rocket className="animate-pulse" />
                  Generating Strategy...
                </>
              ) : (
                <>
                  <Rocket />
                  Generate Business Strategy
                </>
              )}
            </motion.button>
          </div>

          {businessPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Target Audience
                </h3>
                <ul className="space-y-3">
                {businessPlan?.targetAudience?.length ? (
                    businessPlan.targetAudience.map((audience, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80">
                        <Users className="w-4 h-4 text-cyber-orange" />
                        {audience}
                      </li>
                    ))
                  ) : (
                    <li className="text-white/50">No target audience data available</li>
                  )}

                </ul>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Projections
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">Estimated ROI</span>
                    <span className="text-cyber-orange">{businessPlan?.financials?.estimatedRoi || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Break-even Point</span>
                    <span className="text-cyber-orange">{businessPlan?.financials?.breakEven || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Initial Investment</span>
                    <span className="text-cyber-orange">{businessPlan?.financials?.initialInvestment|| 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Product Strategy
                </h3>
                <ul className="space-y-3">
                {businessPlan?.productStrategy?.length ? (
                  businessPlan.productStrategy.map((strategy, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/80">
                      <span className="w-2 h-2 bg-cyber-orange rounded-full" />
                      {strategy}
                    </li>
                  ))
                ) : (
                  <li className="text-white/50">No product strategy available</li>
                )}

                </ul>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-cyber text-xl text-cyber-mint mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Marketing Plan
                </h3>
                <ul className="space-y-3">
                {businessPlan?.marketingPlan?.length ? (
                    businessPlan.marketingPlan.map((plan, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80">
                        <span className="w-2 h-2 bg-cyber-orange rounded-full" />
                        {plan}
                      </li>
                    ))
                  ) : (
                    <li className="text-white/50">No marketing plan available</li>
                  )}

                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}