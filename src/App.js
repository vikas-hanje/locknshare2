import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import useStore from './store/useStore';
import './index.css';

function App() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: isDarkMode
              ? 'url(/assets/bg-dark.png)'
              : 'url(/assets/bg-white.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            zIndex: 0,
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Elegant gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.50) 50%, rgba(0, 0, 0, 0.55) 100%)'
              : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.55) 50%, rgba(255, 255, 255, 0.58) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* App content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;