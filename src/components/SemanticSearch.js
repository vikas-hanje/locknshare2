import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Image, Video, Music, Archive, Download, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';

const SemanticSearch = () => {
  const { 
    files, 
    searchQuery, 
    searchResults, 
    setSearchQuery, 
    searchFiles, 
    removeFile 
  } = useStore();
  
  const [localQuery, setLocalQuery] = useState('');

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
      searchFiles(localQuery);
    }
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  const handleDeleteFile = (fileId) => {
    removeFile(fileId);
    // If we're in search results, refresh the search
    if (searchQuery) {
      searchFiles(searchQuery);
    }
  };

  const displayFiles = searchQuery ? searchResults : files;

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 ${useStore.getState().isDarkMode ? 'glass-card-dark' : 'glass-card'}`}
      >
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sage-500" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search your files semantically..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-mint-500 ${
                useStore.getState().isDarkMode 
                  ? 'bg-sage-700/30 border-sage-600/30 text-white' 
                  : 'bg-cream-200/30 border-cream-300/30 text-sage-800'
              }`}
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn-secondary"
            >
              Clear
            </button>
          )}
        </form>
        
        {searchQuery && (
          <p className="mt-3 text-sm text-sage-600">
            Found {searchResults.length} result(s) for "{searchQuery}"
          </p>
        )}
      </motion.div>

      {/* Search Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {displayFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-sage-600 mb-2">
              {searchQuery ? 'No files found' : 'No files uploaded yet'}
            </h3>
            <p className="text-sage-500">
              {searchQuery 
                ? 'Try a different search term' 
                : 'Upload some files to get started'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {displayFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  useStore.getState().isDarkMode 
                    ? 'bg-sage-700/30 border-sage-600/30 hover:bg-sage-700/50' 
                    : 'bg-cream-100/50 border-cream-200/50 hover:bg-cream-100/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(file.type)}
                    <div>
                      <h4 className="font-semibold text-sage-800">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-sage-600">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      file.status === 'Encrypted' 
                        ? 'bg-mint-100 text-mint-800' 
                        : 'bg-cream-100 text-cream-800'
                    }`}>
                      {file.status}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement('a');
                          link.href = URL.createObjectURL(file.file);
                          link.download = file.name;
                          link.click();
                        }}
                        className="p-2 rounded-lg hover:bg-mint-100 transition-colors duration-200"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-mint-600" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
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

export default SemanticSearch;
