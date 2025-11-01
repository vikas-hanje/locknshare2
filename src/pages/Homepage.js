import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Moon, Sun, Github, Twitter, Search, Lock, HardDrive, Brain } from 'lucide-react';
import useStore from '../store/useStore';

const Homepage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, connectWallet } = useStore();

  const handleConnectWallet = () => {
    connectWallet('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', 'User123');
    navigate('/dashboard');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    { icon: <Search className="w-7 h-7 text-mint-600" />, title: "AI-Powered Search", description: "Find your files instantly with intelligent search algorithms" },
    { icon: <Lock className="w-7 h-7 text-mint-600" />, title: "End-to-End Encryption", description: "Your files are protected with military-grade encryption" },
    { icon: <HardDrive className="w-7 h-7 text-mint-600" />, title: "IPFS Storage", description: "Decentralized storage powered by the InterPlanetary File System" },
    { icon: <Brain className="w-7 h-7 text-mint-600" />, title: "Smart Threat Detection", description: "AI monitors for anomalies and potential security threats" }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Floating blockchain elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div className="absolute top-20 left-10 w-4 h-4 bg-mint-400/20 rounded-sm floating-block"
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute top-40 right-20 w-3 h-3 bg-lavender-400/20 rounded-sm floating-block"
          animate={{ y: [0, 15, 0], rotate: [0, -3, 3, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div className="absolute bottom-40 left-1/4 w-2 h-2 bg-mint-300/25 rounded-sm floating-block"
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div className="absolute top-60 right-1/3 w-3 h-3 bg-lavender-300/20 rounded-sm floating-block"
          animate={{ y: [0, 12, 0], rotate: [0, -4, 4, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Header - Sticky with backdrop blur - more compact */}
      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        className="sticky top-0 z-30 flex justify-between items-center px-8 py-3 backdrop-blur-xl border-b border-white/10"
      >
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Shield className="w-7 h-7" style={{ color: '#10b981' }} />
          <span className="text-xl font-bold font-display" style={{ color: '#10b981' }}>LockNShare</span>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl ${isDarkMode ? 'glass-card-dark hover:bg-gray-700/60' : 'glass-card hover:bg-white/70'} transition-all duration-300`}
            whileHover={{ scale: 1.1, rotate: 180 }} 
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-cream-200" /> : <Moon className="w-5 h-5 text-sage-700" />}
          </motion.button>

          <motion.button onClick={handleConnectWallet} className="btn-primary"
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Connect Wallet
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section - increased spacing */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center py-32 px-8 relative z-20">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-5xl mx-auto">
          <h1 className="heading-primary mb-8" style={{ letterSpacing: '0.015em' }}>
            <span style={{ color: '#10b981' }}>Decentralized File Sharing,</span>
            <br />
            <span className={isDarkMode ? 'text-cream-100' : 'text-sage-800'}>Reinvented.</span>
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-cream-200' : 'text-sage-600'} mb-16 max-w-2xl mx-auto`} style={{ lineHeight: '1.7' }}>
            Secure, encrypted storage powered by IPFS & AI anomaly detection.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.button onClick={handleConnectWallet} className="btn-primary px-8 py-3"
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Connect Wallet
            </motion.button>
            <motion.button onClick={handleLearnMore} className={`px-8 py-3 ${isDarkMode ? 'btn-secondary-dark' : 'btn-secondary'}`}
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section - more spacing from hero */}
      <motion.section id="features-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-32 px-8 mt-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="heading-secondary text-center mb-20 text-mint-600" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            Powerful Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true }}
                className={`p-10 text-center ${isDarkMode ? 'glass-card-dark glass-card-hover-dark' : 'glass-card glass-card-hover'}`} 
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="mb-5 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-4 font-display ${isDarkMode ? 'text-cream-100' : 'text-sage-800'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-cream-200' : 'text-sage-600'}`} style={{ fontSize: '0.9375rem', lineHeight: '1.65' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-16 px-8 mt-32 border-t border-white/20 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className={`text-body mb-4 md:mb-0 ${isDarkMode ? 'text-cream-200' : 'text-sage-600'}`}>© 2025 LockNShare. All rights reserved.</p>

          <div className="flex space-x-4">
            <motion.a href="#" className={`p-2.5 rounded-xl ${isDarkMode ? 'glass-card-dark hover:bg-gray-700/60' : 'glass-card hover:bg-white/70'} transition-all duration-300`} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Github className={`w-5 h-5 ${isDarkMode ? 'text-cream-200' : 'text-sage-600'}`} />
            </motion.a>
            <motion.a href="#" className={`p-2.5 rounded-xl ${isDarkMode ? 'glass-card-dark hover:bg-gray-700/60' : 'glass-card hover:bg-white/70'} transition-all duration-300`} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Twitter className={`w-5 h-5 ${isDarkMode ? 'text-cream-200' : 'text-sage-600'}`} />
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Homepage;
