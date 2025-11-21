import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  color?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  as: Component = 'span',
  color = '#52e9f1'
}) => {
  return (
    <Component className={`relative inline-block ${className}`} style={{ color }}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#ff5f00] opacity-70 animate-pulse translate-x-[2px] clip-path-inset">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-600 opacity-70 animate-pulse -translate-x-[2px] clip-path-inset-2">
        {text}
      </span>
    </Component>
  );
};