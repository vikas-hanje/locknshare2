import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Clock, Activity, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';

const SecurityDrawer = ({ isOpen, onClose }) => {
  const { isDarkMode, files, threatLevel, trustScore } = useStore();

  const recentActivities = [
    { icon: Lock, text: 'File encrypted: document.pdf', time: '2 minutes ago', status: 'success' },
    { icon: CheckCircle2, text: 'Security scan completed', time: '1 hour ago', status: 'success' },
    { icon: Activity, text: 'IPFS sync successful', time: '3 hours ago', status: 'info' },
  ];

  const drawerVariants = {
    closed: { x: '100%' },
    open: { 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      x: '100%',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="exit"
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className={`fixed right-0 top-0 h-full w-full sm:w-96 z-50 ${
                isDarkMode 
                  ? 'bg-gray-900/60' 
                  : 'bg-white/60'
              } backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.25)] border-l ${
                isDarkMode ? 'border-gray-700/50' : 'border-cream-200/50'
              }`}
            >
              {/* Drawer Content */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b ${
                  isDarkMode ? 'border-gray-700/50' : 'border-cream-200/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                      isDarkMode ? 'bg-mint-500/20' : 'bg-mint-100'
                    }`}>
                      <Shield className={`w-6 h-6 ${
                        isDarkMode ? 'text-mint-400' : 'text-mint-600'
                      }`} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-sage-800'
                      }`}>Security Status</h2>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-sage-600'
                      }`}>Real-time monitoring</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-xl ${
                      isDarkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-cream-100'
                    } transition-all duration-200`}
                  >
                    <X className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-sage-600'
                    }`} />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Encryption Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`p-5 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border border-gray-700/30' 
                        : 'bg-cream-50/50 border border-cream-200/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-sage-800'
                      }`}>Encryption Level</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? 'bg-mint-500/20 text-mint-400' 
                          : 'bg-mint-100 text-mint-700'
                      }`}>AES-256</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex-1 h-2 rounded-full ${
                        isDarkMode ? 'bg-gray-700' : 'bg-cream-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-2 rounded-full bg-gradient-to-r from-mint-500 to-emerald-500"
                        />
                      </div>
                      <span className={`text-sm font-semibold ${
                        isDarkMode ? 'text-mint-400' : 'text-mint-600'
                      }`}>100%</span>
                    </div>
                  </motion.div>

                  {/* Trust Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`p-5 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border border-gray-700/30' 
                        : 'bg-cream-50/50 border border-cream-200/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-sage-800'
                      }`}>Trust Score</h3>
                      <span className={`text-3xl font-bold ${
                        isDarkMode ? 'text-mint-400' : 'text-mint-600'
                      }`}>{trustScore}%</span>
                    </div>
                    <div className={`flex-1 h-2 rounded-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-cream-200'
                    } mt-3`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trustScore}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-2 rounded-full bg-gradient-to-r from-mint-500 to-lavender-500"
                      />
                    </div>
                  </motion.div>

                  {/* Threat Level */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-5 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border border-gray-700/30' 
                        : 'bg-cream-50/50 border border-cream-200/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-sage-800'
                      }`}>Threat Level</h3>
                      <div className="flex items-center space-x-2">
                        {threatLevel === 'Low' ? (
                          <CheckCircle2 className="w-5 h-5 text-mint-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className={`font-semibold ${
                          threatLevel === 'Low' 
                            ? 'text-mint-600' 
                            : 'text-yellow-600'
                        }`}>{threatLevel}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Last Sync */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`p-5 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border border-gray-700/30' 
                        : 'bg-cream-50/50 border border-cream-200/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className={`w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-sage-600'
                        }`} />
                        <h3 className={`font-semibold ${
                          isDarkMode ? 'text-gray-200' : 'text-sage-800'
                        }`}>Last Sync</h3>
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-sage-600'
                      }`}>2 minutes ago</span>
                    </div>
                  </motion.div>

                  {/* Recent Activities */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-200' : 'text-sage-800'
                    }`}>Recent Activity</h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className={`flex items-start space-x-3 p-3 rounded-xl ${
                            isDarkMode 
                              ? 'bg-gray-800/30 hover:bg-gray-800/50' 
                              : 'bg-cream-50/30 hover:bg-cream-50/60'
                          } transition-all duration-200`}
                        >
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'success'
                              ? isDarkMode ? 'bg-mint-500/20' : 'bg-mint-100'
                              : isDarkMode ? 'bg-lavender-500/20' : 'bg-lavender-100'
                          }`}>
                            <activity.icon className={`w-4 h-4 ${
                              activity.status === 'success'
                                ? isDarkMode ? 'text-mint-400' : 'text-mint-600'
                                : isDarkMode ? 'text-lavender-400' : 'text-lavender-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-200' : 'text-sage-800'
                            }`}>{activity.text}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-500' : 'text-sage-500'
                            }`}>{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* File Statistics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className={`p-5 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-mint-500/10 to-lavender-500/10 border border-gray-700/30' 
                        : 'bg-gradient-to-br from-mint-50 to-lavender-50 border border-cream-200/30'
                    }`}
                  >
                    <h3 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-200' : 'text-sage-800'
                    }`}>File Statistics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className={`text-2xl font-bold ${
                          isDarkMode ? 'text-mint-400' : 'text-mint-600'
                        }`}>{files.length}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-sage-600'
                        }`}>Total Files</p>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${
                          isDarkMode ? 'text-lavender-400' : 'text-lavender-600'
                        }`}>{files.filter(f => f.status === 'Encrypted').length}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-sage-600'
                        }`}>Encrypted</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );
};

export default SecurityDrawer;
