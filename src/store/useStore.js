import { create } from 'zustand';

const useStore = create((set) => ({
  // Wallet state
  isWalletConnected: false,
  walletAddress: null,
  username: null,
  
  // Theme state
  isDarkMode: false,
  
  // Files state
  files: [],
  totalStorage: 0,
  threatLevel: 'Low',
  trustScore: 95,
  searchResults: [],
  searchQuery: '',
  
  // UI state
  currentView: 'dashboard',
  
  // Actions
  connectWallet: (address, username) => set({ 
    isWalletConnected: true, 
    walletAddress: address, 
    username: username 
  }),
  
  disconnectWallet: () => set({ 
    isWalletConnected: false, 
    walletAddress: null, 
    username: null 
  }),
  
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  setCurrentView: (view) => set({ currentView: view }),
  
  addFile: (file) => set((state) => ({ 
    files: [...state.files, file],
    totalStorage: state.totalStorage + file.size
  })),
  
  removeFile: (fileId) => set((state) => {
    const fileToRemove = state.files.find(f => f.id === fileId);
    return {
      files: state.files.filter(f => f.id !== fileId),
      totalStorage: state.totalStorage - (fileToRemove?.size || 0)
    };
  }),
  
  updateFileStatus: (fileId, status) => set((state) => ({
    files: state.files.map(file => 
      file.id === fileId ? { ...file, status } : file
    )
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  searchFiles: (query) => set((state) => {
    if (!query.trim()) {
      return { searchResults: [], searchQuery: '' };
    }
    
    const results = state.files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.type.toLowerCase().includes(query.toLowerCase()) ||
      file.status.toLowerCase().includes(query.toLowerCase())
    );
    
    return { searchResults: results, searchQuery: query };
  }),
  
  updateThreatLevel: (level) => set({ threatLevel: level }),
  updateTrustScore: (score) => set({ trustScore: score }),
}));

export default useStore;
