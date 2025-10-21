import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Image, Video, Music, Archive, Download, Trash2, X } from 'lucide-react';
import useStore from '../store/useStore';

const FileManager = () => {
  const { 
    files, 
    searchQuery, 
    searchResults, 
    setSearchQuery, 
    searchFiles, 
    removeFile 
  } = useStore();
  
  const [localQuery, setLocalQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-mint-600" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5 text-lavender-600" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5 text-cream-600" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-5 h-5 text-sage-600" />;
    return <FileText className="w-5 h-5 text-mint-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setIsSearching(true);
      searchFiles(localQuery);
    }
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleDeleteFile = (fileId) => {
    removeFile(fileId);
    // If we're in search results, refresh the search
    if (searchQuery) {
      searchFiles(searchQuery);
    }
  };

  const displayFiles = isSearching && searchQuery ? searchResults : files;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`p-5 ${useStore.getState().isDarkMode ? 'glass-card-dark' : 'glass-card'}`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-semibold ${useStore.getState().isDarkMode ? 'text-white' : 'text-sage-800'}`}>
            {isSearching ? 'Search Results' : 'All Files'}
          </h3>
          {files.length > 0 && (
            <span className={`text-xs ${useStore.getState().isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>
              {isSearching ? `${searchResults.length} result(s)` : `${files.length} file(s)`}
            </span>
          )}
        </div>
        
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search your files semantically..."
              className={`w-full text-sm pl-9 pr-3 py-2 rounded-lg border ${
                useStore.getState().isDarkMode 
                  ? 'bg-gray-800/40 border-gray-700/50 text-white placeholder-gray-500' 
                  : 'bg-cream-100/50 border-cream-200/50 text-sage-800 placeholder-sage-400'
              }`}
            />
          </div>
          <motion.button
            type="submit"
            className="btn-primary"
            disabled={!localQuery.trim()}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Search
          </motion.button>
          {isSearching && (
            <motion.button
              type="button"
              onClick={handleClearSearch}
              className="btn-secondary flex items-center"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Clear
            </motion.button>
          )}
        </form>
        
        {isSearching && (
          <p className={`mt-2.5 text-xs ${useStore.getState().isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>
            Found {searchResults.length} result(s) for "{searchQuery}"
          </p>
        )}
      </motion.div>

      {/* Files List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-3"
      >
        {displayFiles.length === 0 ? (
          <div className={`text-center py-10 ${useStore.getState().isDarkMode ? 'glass-card-dark' : 'glass-card'}`}>
            <FileText className="w-12 h-12 text-sage-400 mx-auto mb-3" />
            <h3 className={`text-base font-semibold mb-1.5 ${useStore.getState().isDarkMode ? 'text-white' : 'text-sage-800'}`}>
              {isSearching ? 'No files found' : 'No files uploaded yet'}
            </h3>
            <p className={`text-sm ${useStore.getState().isDarkMode ? 'text-gray-400' : 'text-sage-600'}`}>
              {isSearching 
                ? 'Try a different search term' 
                : 'Upload some files to get started with secure file sharing'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {displayFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -2, scale: 1.005 }}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  useStore.getState().isDarkMode 
                    ? 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600/60' 
                    : 'bg-white/70 border-cream-200/50 hover:bg-white/80 hover:border-cream-300/60'
                }`}
                style={{ boxShadow: useStore.getState().isDarkMode ? '0 1px 2px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <h4 className={`text-sm font-medium ${useStore.getState().isDarkMode ? 'text-white' : 'text-sage-800'}`}>
                        {file.name}
                      </h4>
                      <div className={`flex items-center space-x-3 text-xs ${useStore.getState().isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2.5">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      file.status === 'Encrypted' 
                        ? useStore.getState().isDarkMode ? 'bg-mint-500/20 text-mint-300' : 'bg-mint-100 text-mint-700'
                        : useStore.getState().isDarkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-cream-100 text-cream-700'
                    }`}>
                      {file.status}
                    </span>
                    
                    <div className="flex items-center space-x-1.5">
                      <motion.button
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement('a');
                          link.href = URL.createObjectURL(file.file);
                          link.download = file.name;
                          link.click();
                        }}
                        className={`p-1.5 rounded-lg transition-colors duration-150 ${useStore.getState().isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-mint-50'}`}
                        title="Download"
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4 text-mint-600" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDeleteFile(file.id)}
                        className={`p-1.5 rounded-lg transition-colors duration-150 ${useStore.getState().isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}
                        title="Delete"
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FileManager;
