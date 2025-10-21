import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  animate = true,
  delay = 0,
  onClick,
  ...props 
}) => {
  const { isDarkMode } = useStore();

  const baseStyles = isDarkMode
    ? 'bg-gray-900/70 backdrop-blur-xl border border-gray-700/50'
    : 'bg-white/70 backdrop-blur-xl border border-cream-200/50';
  
  const baseShadow = isDarkMode
    ? { boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)' }
    : { boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)' };

  const hoverStyles = hover
    ? isDarkMode
      ? 'hover:bg-gray-800/75'
      : 'hover:bg-white/80'
    : '';

  const cardVariants = animate ? {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  } : {};

  const CardWrapper = animate ? motion.div : 'div';

  return (
    <CardWrapper
      className={`p-8 ${baseStyles} ${hoverStyles} ${className}`}
      style={{ borderRadius: '16px', ...baseShadow }}
      onClick={onClick}
      {...(animate && { variants: cardVariants, initial: 'hidden', animate: 'visible' })}
      {...(hover && { whileHover: { y: -4, scale: 1.01 } })}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

export default Card;
