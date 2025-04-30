import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-cyber text-4xl text-cyber-orange neon-glow-orange mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-cyber-mint">
            Get in touch with our team for personalized market analysis
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-xl text-center"
          >
            <CheckCircle className="w-16 h-16 text-cyber-mint mx-auto mb-4" />
            <h2 className="text-2xl font-cyber text-cyber-orange mb-2">Message Sent!</h2>
            <p className="text-cyber-mint mb-6">We'll get back to you soon.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="glass-panel px-6 py-2 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-cyber text-sm text-cyber-mint">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-cyber text-sm text-cyber-mint">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-orange" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-cyber text-sm text-cyber-mint">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-cyber-orange" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-cyber-dark-light border border-cyber-orange rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-orange transition-all min-h-[150px]"
                    placeholder="Your message"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full glass-panel py-4 rounded-lg font-cyber text-cyber-orange border border-cyber-orange neon-border-orange flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Send size={20} className="animate-pulse" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}