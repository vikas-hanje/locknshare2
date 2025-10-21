import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Moon, 
  Sun, 
  LogOut, 
  LayoutDashboard, 
  Upload, 
  Folder, 
  Search, 
  ShieldCheck, 
  User,
  FileText,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  Info,
  Camera
} from 'lucide-react';
import useStore from '../store/useStore';
import FileUpload from '../components/FileUpload';
import FileManager from '../components/FileManager';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    isDarkMode, 
    toggleTheme, 
    disconnectWallet, 
    username, 
    walletAddress,
    currentView,
    setCurrentView,
    files,
    totalStorage,
    threatLevel,
    trustScore
  } = useStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'files', label: 'Files & Search', icon: Folder },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Remove mock data - we'll use real files from the store

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Dashboard Overview</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-cream-100'} transition-colors`}
                    title="Dashboard information"
                  >
                    <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-sage-400'}`} />
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                  className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
                  style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-mint-500/10' : 'bg-mint-50'}`}>
                      <FileText className={`w-4 h-4 ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`} />
                    </div>
                    <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>{files.length}</span>
                  </div>
                  <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-sage-600'}`}>Total Files</h3>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
                  style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-lavender-500/10' : 'bg-lavender-50'}`}>
                      <HardDrive className={`w-4 h-4 ${isDarkMode ? 'text-lavender-400' : 'text-lavender-600'}`} />
                    </div>
                    <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>{(totalStorage / 1024).toFixed(1)} GB</span>
                  </div>
                  <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-sage-600'}`}>Storage Used</h3>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
                  style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-mint-500/10' : 'bg-mint-50'}`}>
                      {threatLevel === 'Low' ? (
                        <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`} />
                      ) : (
                        <AlertTriangle className={`w-4 h-4 text-yellow-500`} />
                      )}
                    </div>
                    <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>{threatLevel}</span>
                  </div>
                  <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-sage-600'}`}>Threat Level</h3>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
                style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <h3 className={`text-sm font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Recent Files</h3>
                <div className="space-y-3">
                  {files.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-sage-400 mx-auto mb-3" />
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-sage-600'}`}>
                        No files uploaded yet
                      </p>
                    </div>
                  ) : (
                    files.slice(0, 3).map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`flex items-center justify-between p-2.5 rounded-lg ${isDarkMode ? 'bg-gray-800/40 hover:bg-gray-800/60' : 'bg-cream-50/50 hover:bg-cream-100/50'} transition-all duration-200`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <FileText className="w-4 h-4 text-mint-600" />
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>{file.name}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>
                              {(file.size / 1024 / 1024).toFixed(1)} MB • {file.date}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          file.status === 'Encrypted' 
                            ? `${isDarkMode ? 'bg-mint-500/20 text-mint-300' : 'bg-mint-100 text-mint-700'}` 
                            : `${isDarkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-cream-100 text-cream-700'}`
                        }`}>
                          {file.status}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
                style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <h3 className={`text-sm font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Security Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>All Clear</span>
                    <CheckCircle className="w-5 h-5 text-mint-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Trust Score</span>
                    <span className={`text-xl font-semibold ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`}>{trustScore}%</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-sage-100'} rounded-full h-1.5`}>
                    <div 
                      className="bg-gradient-to-r from-mint-500 to-lavender-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${trustScore}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        );

      case 'upload':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Upload Files</h2>
            <FileUpload />
          </motion.div>
        );

      case 'files':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>My Files</h2>
            <FileManager />
          </motion.div>
        );


      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Security Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`} style={{ borderRadius: '16px' }}>
                <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Threat Report</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Last Scan</span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Threats Detected</span>
                    <span className="text-sm text-mint-600 font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Trust Score</span>
                    <span className={`text-xl font-semibold ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`}>{trustScore}%</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`} style={{ borderRadius: '16px' }}>
                <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Security Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-5 h-5 text-mint-600" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>All systems secure</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-5 h-5 text-mint-600" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Encryption active</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-5 h-5 text-mint-600" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>AI monitoring enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Profile Settings</h2>
            <div className={`p-8 ${isDarkMode ? 'glass-card-dark' : 'glass-card'}`} style={{ borderRadius: '16px' }}>
              <div className="space-y-6">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <div className={`w-20 h-20 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800 border-2 border-gray-700' : 'bg-cream-100 border-2 border-cream-300'} flex items-center justify-center`}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className={`w-10 h-10 ${isDarkMode ? 'text-gray-600' : 'text-sage-400'}`} />
                      )}
                    </div>
                    <label 
                      htmlFor="profile-upload" 
                      className={`absolute bottom-0 right-0 p-1.5 rounded-full cursor-pointer ${isDarkMode ? 'bg-mint-600 hover:bg-mint-700' : 'bg-mint-500 hover:bg-mint-600'} transition-colors`}
                    >
                      <Camera className="w-3.5 h-3.5 text-white" />
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>
                    Click camera to upload profile picture
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Username</label>
                  <input
                    type="text"
                    value={username || ''}
                    className={`w-full ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 text-white' : 'bg-cream-100/50 border-cream-200/50 text-sage-800'} border px-4 py-2.5 text-sm`}
                    style={{ borderRadius: '10px' }}
                    readOnly
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Wallet Address</label>
                  <input
                    type="text"
                    value={walletAddress || ''}
                    className={`w-full ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 text-white' : 'bg-cream-100/50 border-cream-200/50 text-sage-800'} border px-4 py-2.5 text-sm`}
                    style={{ borderRadius: '10px' }}
                    readOnly
                  />
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <button className={isDarkMode ? 'btn-secondary-dark' : 'btn-secondary'}>Update Profile</button>
                  <button className="btn-primary">Change Password</button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 ${isDarkMode ? 'glass-card-dark' : 'glass-card'} transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-white/20'}`}>
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8" style={{ color: '#10b981' }} />
            <span className="text-xl font-bold font-display" style={{ color: '#10b981' }}>LockNShare</span>
            
          </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              ×
            </button>
          </div>
          
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <motion.button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      currentView === item.id
                        ? `${isDarkMode ? 'bg-sage-700/50 text-mint-400' : 'bg-cream-200/50 text-mint-600'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-sage-700/30' : 'text-sage-700 hover:bg-cream-200/30'}`
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar - Sticky */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`sticky top-0 z-30 flex justify-between items-center px-6 py-3 ${isDarkMode ? 'glass-card-dark' : 'glass-card'} m-4 mb-0`}
          style={{ borderRadius: '16px' }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              ☰
            </button>
            <div>
              <h1 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'}`} style={{ fontSize: '1.1875rem' }}>
                Welcome back, {username || 'User'}!
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-sage-500'}`} style={{ lineHeight: '1.55' }}>Ready to secure your files?</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-lg border ${isDarkMode ? 'border-gray-700/40' : 'border-cream-200/40'} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-sage-700" />}
            </motion.button>
            
            <motion.button
              onClick={handleDisconnect}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-lg border ${isDarkMode ? 'border-gray-700/40' : 'border-cream-200/40'} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`} />
              <span className={`text-sm font-medium tracking-tight ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>Disconnect</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Content Area */}
        <main className="p-8 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default Dashboard;

