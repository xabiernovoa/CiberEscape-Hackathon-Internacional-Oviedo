import React from 'react';
import { COLORS } from '../../constants';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 clip-path-polygon border-2 group overflow-hidden";
  
  const variants = {
    primary: `border-[#ff5f00] text-[#ff5f00] hover:bg-[#ff5f00] hover:text-[#080d19]`,
    secondary: `border-[#52e9f1] text-[#52e9f1] hover:bg-[#52e9f1] hover:text-[#080d19]`,
    danger: `border-red-500 text-red-500 hover:bg-red-500 hover:text-white`
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {/* Glitch overlay effect on hover could go here */}
    </button>
  );
};