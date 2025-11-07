import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const { isDarkMode } = useStore();

  const variants = {
    primary: 'bg-gradient-to-r from-mint-500 to-emerald-500 hover:from-mint-600 hover:to-emerald-600 text-white',
    secondary: isDarkMode
      ? 'bg-transparent border-2 border-gray-600 hover:bg-gray-800/50 hover:border-gray-500 text-gray-200'
      : 'bg-transparent border-2 border-sage-300 hover:bg-sage-50 hover:border-sage-400 text-sage-700',
    outline: isDarkMode
      ? 'bg-transparent border-2 border-gray-600 hover:bg-gray-800/50 text-gray-200'
      : 'bg-transparent border-2 border-sage-300 hover:bg-sage-50 text-sage-700',
    ghost: isDarkMode
      ? 'bg-transparent hover:bg-gray-800/50 text-gray-300'
      : 'bg-transparent hover:bg-cream-100/50 text-sage-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonShadow = variant === 'primary' || variant === 'danger' 
    ? { boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }
    : {};

  return (
    <motion.button
      className={`px-5 py-2.5 font-medium inline-flex items-center justify-center space-x-2 ${variants[variant]} ${disabledStyles} ${className}`}
      style={{ borderRadius: '10px', fontSize: '0.9375rem', ...buttonShadow }}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="w-5 h-5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default Button;
