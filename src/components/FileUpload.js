import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, Video, Music, Archive, Lock, Shield, Search } from 'lucide-react';
import useStore from '../store/useStore';

const FileUpload = () => {
  const { addFile, updateFileStatus, isDarkMode } = useStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-6 h-6 text-mint-600" />;
    if (type.startsWith('video/')) return <Video className="w-6 h-6 text-lavender-600" />;
    if (type.startsWith('audio/')) return <Music className="w-6 h-6 text-cream-600" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-6 h-6 text-sage-600" />;
    return <FileText className="w-6 h-6 text-mint-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = async (file) => {
    const fileId = Date.now() + Math.random();
    const fileData = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      file: file // Store the actual file object
    };

    // Add to uploading files
    setUploadingFiles(prev => [...prev, fileData]);
    
    // Simulate processing time
    setTimeout(() => {
      updateFileStatus(fileId, 'Encrypted');
      addFile(fileData);
      setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
    }, 2000);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(processFile);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`relative border-2 border-dashed p-12 text-center transition-all duration-200 ${
          isDragOver 
            ? `border-mint-400 scale-[1.02] ${isDarkMode ? 'bg-mint-900/30' : 'bg-mint-50/60'}` 
            : `${isDarkMode ? 'border-gray-600 bg-gray-800/70 hover:bg-gray-800/80 hover:border-gray-500' : 'border-mint-300 bg-white/60 hover:bg-white/70 hover:border-mint-400'}`
        }`}
        style={{ borderRadius: '16px', boxShadow: isDragOver ? (isDarkMode ? '0 4px 6px rgba(0,0,0,0.25)' : '0 4px 6px rgba(0,0,0,0.07)') : 'none' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          animate={{ 
            scale: isDragOver ? 1.05 : 1,
            y: isDragOver ? -3 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Upload className={`w-12 h-12 ${isDarkMode ? 'text-mint-400' : 'text-mint-600'} mx-auto mb-3`} />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'} mb-1.5`} style={{ fontSize: '1.125rem' }}>
            {isDragOver ? 'Drop files here' : 'Drag & Drop Files Here'}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-sage-600'} mb-5`}>
            or click to browse your computer
          </p>
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Choose Files
          </motion.button>
        </motion.div>
      </motion.div>

      {/* How it works section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`p-6 ${isDarkMode ? 'bg-gray-900/70 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-cream-200/50'}`}
        style={{ borderRadius: '16px', boxShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
      >
        <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>How it works</h3>
        <div className="space-y-2.5">
          <div className="flex items-start space-x-2.5">
            <Lock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`} />
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>
              Your file is encrypted client-side with <span className="font-medium">RSA-2048</span>
            </p>
          </div>
          <div className="flex items-start space-x-2.5">
            <Upload className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-lavender-400' : 'text-lavender-600'}`} />
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>
              Encrypted file is uploaded to <span className="font-medium">IPFS via Pinata</span>
            </p>
          </div>
          <div className="flex items-start space-x-2.5">
            <Shield className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`} />
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>
              Only you can decrypt with your <span className="font-medium">private key</span>
            </p>
          </div>
          <div className="flex items-start space-x-2.5">
            <Search className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-lavender-400' : 'text-lavender-600'}`} />
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-sage-700'}`}>
              AI embeddings enable <span className="font-medium">semantic search</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2.5"
        >
          <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>Uploading Files...</h4>
          {uploadingFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`flex items-center justify-between p-3 rounded-lg border backdrop-blur-xl ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-mint-200/50'}`}
            >
              <div className="flex items-center space-x-2.5">
                {getFileIcon(file.type)}
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-sage-800'}`}>{file.name}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-sage-500'}`}>{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3.5 h-3.5 border-2 ${isDarkMode ? 'border-mint-400' : 'border-mint-600'} border-t-transparent rounded-full animate-spin`}></div>
                <span className={`text-xs ${isDarkMode ? 'text-mint-400' : 'text-mint-600'} font-medium`}>Processing...</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
