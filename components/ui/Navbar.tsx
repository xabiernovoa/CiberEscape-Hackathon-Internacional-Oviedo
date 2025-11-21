
import React from 'react';
import { UserProfile, Screen } from '../../types';
import { Shield, Wifi, BookOpen } from 'lucide-react';

interface NavbarProps {
  profile: UserProfile;
  onNavigate: (screen: Screen) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onNavigate }) => {
  return (
    <nav className="w-full h-16 border-b border-[#52e9f1]/30 bg-[#080d19]/90 backdrop-blur-sm flex items-center justify-between px-4 z-40">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(Screen.HUB)}>
        <Shield className="w-8 h-8 text-[#ff5f00]" />
        <div className="flex flex-col">
          <span className="text-[#ff5f00] font-bold font-orbitron text-base leading-none">CIBERESCAPE</span>
          <span className="text-xs text-gray-400">Protocol: SECURE</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Resources / SOS Button */}
        <button 
            onClick={() => onNavigate(Screen.RESOURCES)}
            className="flex items-center gap-2 px-3 py-1.5 border border-green-500/50 rounded bg-green-900/20 text-green-400 hover:bg-green-500/20 transition-colors mr-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
        >
            <BookOpen className="w-5 h-5" />
            <span className="font-bold text-sm hidden sm:inline">Recursos / Incibe</span>
        </button>

        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-[#52e9f1]/20 rounded bg-[#000]/40">
          <span className="text-[#52e9f1] text-base font-bold">RANK:</span>
          <span className="text-white text-base">{profile.rank}</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-1.5 border border-[#ff5f00]/20 rounded bg-[#000]/40">
          <span className="text-[#ff5f00] text-base font-bold">XP:</span>
          <span className="text-white text-base">{profile.xp}</span>
        </div>
        
        <div className="flex gap-2 text-[#52e9f1]">
            <Wifi className="w-5 h-5 hidden sm:block" />
        </div>
      </div>
    </nav>
  );
};
