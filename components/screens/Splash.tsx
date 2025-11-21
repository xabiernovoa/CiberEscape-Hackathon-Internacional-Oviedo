
import React, { useEffect, useState } from 'react';
import { GlitchText } from '../ui/GlitchText';
import { COLORS } from '../../constants';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#080d19] z-50 absolute inset-0">
      <div className={`flex flex-col items-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative mb-4">
          <div className="absolute -inset-4 bg-[#52e9f1]/20 rounded-full blur-xl animate-pulse"></div>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={COLORS.neonOrange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 mx-auto animate-bounce">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M12 8v4"/>
            <path d="M12 16h.01"/>
          </svg>
        </div>
        <GlitchText text="CIBER" as="h1" className="text-5xl md:text-7xl font-black tracking-tighter" color={COLORS.white} />
        <GlitchText text="ESCAPE" as="h1" className="text-5xl md:text-7xl font-black tracking-tighter block" color={COLORS.neonOrange} />
        
        <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#52e9f1] animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="mt-2 text-center text-[#52e9f1] text-xs font-mono tracking-widest">INITIALIZING SYSTEM...</p>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};
