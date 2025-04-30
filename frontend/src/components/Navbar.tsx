import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/insights', label: 'Insights' },
    { to: '/competitor-analysis', label: 'Competitors' },
    { to: '/market-predictions', label: 'Predictions' },
    { to: '/business-strategy', label: 'Strategy' },
    { to: '/content-strategy', label: 'Content' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-cyber-orange" />
            <span className="font-cyber text-cyber-mint text-xl">Gap-ly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-cyber text-white hover:text-cyber-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-cyber-black/95"
      >
        <div className="px-4 py-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block font-cyber text-white hover:text-cyber-orange py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}