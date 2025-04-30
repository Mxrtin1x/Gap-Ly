// Import React's StrictMode to highlight potential problems in the app during development
import { StrictMode } from 'react';
// Import createRoot from ReactDOM to enable React 18's concurrent rendering
import { createRoot } from 'react-dom/client';
// Import the main App component
import App from './App.tsx';
// Import global CSS styles
import './index.css';

// Find the root HTML element and mount the React app to it
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
