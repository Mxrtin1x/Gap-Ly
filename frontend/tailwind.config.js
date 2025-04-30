/** 
 * Tailwind CSS configuration file
 * This file defines custom themes, colors, fonts, and animations.
 * It also tells Tailwind where to look for class names in the project files.
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Define the paths Tailwind should scan for class usage
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Extend the default color palette with custom "cyber" colors
      colors: {
        cyber: {
          black: '#0B1437',  // Deep navy
          orange: '#60A5FA', // Bright blue
          mint: '#FFFFFF',   // White
          red: '#3B82F6',    // Medium blue
          'dark-light': '#1E293B' // Lighter navy
        }
      },
      // Extend font families to include Orbitron and Inter
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],  // Used for cyber/tech themes
        sans: ['Inter', 'sans-serif'],      // Clean modern sans-serif font

      },
      // Custom animations used across the UI
      animation: {
        'float': 'float 6s ease-in-out infinite',           // Smooth vertical floating effect
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite', // Fading glow effect
      },
      // Define keyframe animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },       // Start and end at base position
          '50%': { transform: 'translateY(-20px)' },        // Move up midway through
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },                       // Full opacity at start and end
          '50%': { opacity: 0.5 },                          // Fade to half opacity mid-animation
        },
      },
    },
  },
  plugins: [],
};