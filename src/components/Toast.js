import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Shield } from 'lucide-react';
import useStore from '../store/useStore';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 2000 }) => {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: CheckCircle2,
    info: Shield,
  };

  const Icon = icons[type] || CheckCircle2;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div
            className={`flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border ${
              isDarkMode
                ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700/50'
                : 'bg-white/95 backdrop-blur-xl border-cream-200/50'
            }`}
          >
            <div className={`p-2 rounded-xl ${
              type === 'success' 
                ? isDarkMode ? 'bg-mint-500/20' : 'bg-mint-100'
                : isDarkMode ? 'bg-lavender-500/20' : 'bg-lavender-100'
            }`}>
              <Icon className={`w-5 h-5 ${
                type === 'success'
                  ? isDarkMode ? 'text-mint-400' : 'text-mint-600'
                  : isDarkMode ? 'text-lavender-400' : 'text-lavender-600'
              }`} />
            </div>
            
            <div className="flex-1">
              <p className={`text-sm font-semibold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-sage-800'
              }`}>
                {message}
              </p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-cream-100 text-sage-600'
              }`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
