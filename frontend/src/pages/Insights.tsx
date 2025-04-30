import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Share2, AlertTriangle, Send, Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnalysisData {
  industry: string;
  region: string;
  depth: string;
  timestamp: string;
  results: {
    marketGrowth: number;
    competitorSaturation: string;
    entryBarriers: string;
    recommendations: string[];
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Insights() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem('marketAnalysis');
    if (!storedAnalysis) {
      navigate('/analyze');
      return;
    }

    const parsedAnalysis = JSON.parse(storedAnalysis);
    setAnalysis(parsedAnalysis);

    // Generate demo chart data based on market growth
    // ✅ Ensure correct graph data from API response
    const { graphData, keyFindings, recommendations } = parsedAnalysis.results;

    if (graphData && graphData.labels && graphData.values) {
      const formattedChartData = graphData.labels.map((label: string, index: number) => ({
        name: label,
        value: graphData.values[index] || 0, // Avoid NaN issues
      }));
      setChartData(formattedChartData);
    } else {
      console.error("⚠️ Graph data is missing or incorrect in API response");
    }

    // ✅ Ensure key findings & recommendations are set properly
    setAnalysis({
      ...parsedAnalysis,
      results: {
        ...parsedAnalysis.results,
        keyFindings: keyFindings || {}, 
        recommendations: recommendations || [],
      }
    });


    // Add initial AI message
    setMessages([
      {
        role: 'assistant',
        content: `I've analyzed the market data for ${parsedAnalysis.industry}. Feel free to ask me any questions about the analysis, market trends, or recommendations.`
      }
    ]);
  }, [navigate]);

  const handleExport = () => {
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `market-analysis-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Market Analysis Results',
          text: `Market analysis for ${analysis?.industry} - Growth Potential: ${analysis?.results.marketGrowth}%`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Share functionality is not supported in your browser');
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
  
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);
  
    try {
      const response = await fetch('https://ai-market-be.onrender.com/ai-market-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: userInput,
          industry: analysis?.industry
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }
  
      const data = await response.json();
  
      setMessages([...newMessages, { role: 'assistant', content: data.assistantResponse }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error fetching response. Try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };
  

  if (!analysis) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-cyber-orange mx-auto mb-4" />
          <h2 className="text-2xl font-cyber text-cyber-orange">No Analysis Data</h2>
          <p className="text-cyber-mint mt-2">Please run an analysis first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-cyber text-2xl text-cyber-orange neon-glow-orange">
                Market Analysis: {analysis.industry}
              </h2>
              <p className="text-cyber-mint text-sm mt-1">
                Region: {analysis.region.toUpperCase()} | Depth: {analysis.depth}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 text-cyber-mint hover:text-cyber-orange transition-colors"
              >
                <Download size={20} />
                Export
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-cyber-mint hover:text-cyber-orange transition-colors"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ff5f1f20" />
                <XAxis dataKey="name" stroke="#3fffaf" />
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
                  dataKey="value"
                  stroke="#ff5f1f"
                  strokeWidth={2}
                  dot={{ fill: '#ff5f1f' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-xl"
          >
            <h3 className="font-cyber text-xl text-cyber-mint mb-4">Key Findings</h3>
            <ul className="space-y-3 text-white/80">
  {analysis.results.keyFindings ? (
    <>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-cyber-orange rounded-full" />
        Market Growth: {analysis.results.keyFindings.marketGrowth || "N/A"}
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-cyber-mint rounded-full" />
        Competition Level: {analysis.results.keyFindings.competitionLevel || "N/A"}
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-cyber-red rounded-full" />
        Entry Barriers: {analysis.results.keyFindings.entryBarriers || "N/A"}
      </li>
    </>
  ) : (
    <li className="text-cyber-red">⚠️ No key findings available.</li>
  )}
</ul>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 rounded-xl"
          >
            <h3 className="font-cyber text-xl text-cyber-mint mb-4">Recommendations</h3>
            <ul className="space-y-3 text-white/80">
              {analysis.results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyber-orange rounded-full" />
                  {rec}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* AI Assistant Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-6 h-6 text-cyber-orange" />
            <h3 className="font-cyber text-xl text-cyber-mint">AI Market Analyst</h3>
          </div>

          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-cyber-orange/20 text-white'
                      : 'bg-cyber-mint/20 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 rounded-xl bg-cyber-mint/20 text-white">
                  <span className="animate-pulse">Analyzing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about the market analysis..."
              className="flex-1 bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim() || isTyping}
              className="glass-panel px-6 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}