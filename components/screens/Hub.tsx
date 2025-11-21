
import React, { useState } from 'react';
import { UserProfile, Screen } from '../../types';
import { LEVELS_METADATA, RANKS_DATA } from '../../constants';
import { MapPin, Lock, PlayCircle, Users, User, CheckCircle, Settings, Gamepad2, Trophy, X } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';

interface HubProps {
  profile: UserProfile;
  onSelectLevel: (id: number) => void;
  onNavigate: (screen: Screen) => void;
}

export const Hub: React.FC<HubProps> = ({ profile, onSelectLevel, onNavigate }) => {
  const [showRanks, setShowRanks] = useState(false);

  // Calculate positions for a zig-zag path
  const positions = [
    { x: 15, y: 80 },  // Level 1 (Bottom Left)
    { x: 35, y: 50 },  // Level 2
    { x: 60, y: 70 },  // Level 3
    { x: 80, y: 40 },  // Level 4
    { x: 50, y: 15 },  // Level 5 (Top Center)
  ];

  // Generate SVG path string
  const pathD = positions.reduce((acc, pos, i) => {
      if (i === 0) return `M ${pos.x} ${pos.y}`;
      return `${acc} L ${pos.x} ${pos.y}`;
  }, "");

  const currentRankIndex = RANKS_DATA.findIndex(r => r.title === profile.rank);
  const nextRank = RANKS_DATA[currentRankIndex + 1];
  const progressToNext = nextRank 
    ? ((profile.xp - RANKS_DATA[currentRankIndex].minXp) / (nextRank.minXp - RANKS_DATA[currentRankIndex].minXp)) * 100 
    : 100;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
      {/* Main Map Area */}
      <div className="w-full lg:flex-1 border-2 border-[#52e9f1]/30 bg-[#000]/80 relative rounded-xl overflow-hidden shadow-2xl flex flex-col h-96 lg:h-auto min-h-[400px]">
        
        {/* Map Header */}
        <div className="absolute top-4 left-4 bg-black/90 p-3 rounded border border-[#ff5f00] z-20 shadow-lg">
          <GlitchText text="CIUDAD SECTOR 01" className="font-bold text-xl md:text-2xl tracking-widest" />
          <div className="text-sm text-[#52e9f1] flex items-center gap-1 mt-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> ONLINE
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-full flex-1 bg-grid-pattern min-h-[inherit]">
             {/* Decorative Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'linear-gradient(#52e9f1 1px, transparent 1px), linear-gradient(90deg, #52e9f1 1px, transparent 1px)', 
                backgroundSize: '50px 50px'
            }}></div>

             {/* SVG Connection Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                 <defs>
                     <filter id="glow">
                         <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                         <feMerge>
                             <feMergeNode in="coloredBlur"/>
                             <feMergeNode in="SourceGraphic"/>
                         </feMerge>
                     </filter>
                 </defs>
                 {/* Background Line */}
                 <path d={pathD.replace(/(\d+)/g, (m) => `${m}%`)} stroke="#1f2937" strokeWidth="8" fill="none" />
                 
                 {/* Progress Line */}
                 {/* Simplified logic: Just highlight lines for unlocked levels */}
                 {profile.completedLevels.length > 0 && (
                     <path 
                        d={positions.slice(0, profile.completedLevels.length + 1).reduce((acc, pos, i) => i===0 ? `M ${pos.x}% ${pos.y}%` : `${acc} L ${pos.x}% ${pos.y}%`, "")} 
                        stroke="#52e9f1" 
                        strokeWidth="4" 
                        fill="none"
                        filter="url(#glow)"
                        strokeDasharray="10 5"
                        className="animate-[dash_20s_linear_infinite]"
                     />
                 )}
             </svg>

             {/* Level Nodes */}
             {LEVELS_METADATA.map((level, index) => {
                const pos = positions[index];
                const isUnlocked = index === 0 || profile.completedLevels.includes(LEVELS_METADATA[index - 1].id);
                const isCompleted = profile.completedLevels.includes(level.id);

                return (
                    <div 
                        key={level.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isUnlocked ? 'cursor-pointer hover:scale-110 z-20' : 'opacity-50 z-10'}`}
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        onClick={() => isUnlocked && onSelectLevel(level.id)}
                    >
                        <div className="relative flex flex-col items-center group">
                            {/* Hexagon/Circle Shape */}
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl rotate-45 border-4 flex items-center justify-center bg-black shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-colors
                                ${!isUnlocked ? 'border-gray-700 text-gray-700' : 
                                isCompleted ? 'border-green-500 text-green-500 bg-green-900/20' : 'border-[#ff5f00] text-[#ff5f00] bg-[#ff5f00]/10 animate-pulse'}
                            `}>
                                <div className="-rotate-45">
                                    {!isUnlocked ? <Lock className="w-6 h-6 md:w-8 md:h-8" /> : 
                                    isCompleted ? <CheckCircle className="w-6 h-6 md:w-8 md:h-8" /> : <MapPin className="w-6 h-6 md:w-8 md:h-8" />}
                                </div>
                            </div>

                            {/* Label */}
                            <div className={`absolute -bottom-14 w-48 text-center pointer-events-none transition-all
                                ${isUnlocked ? 'opacity-100' : 'opacity-60 scale-90'}
                            `}>
                                <div className={`text-base md:text-lg font-bold px-4 py-2 bg-black/90 border rounded shadow-lg backdrop-blur
                                    ${!isUnlocked ? 'border-gray-700 text-gray-500' : 'border-[#52e9f1] text-[#52e9f1]'}
                                `}>
                                    {level.title}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Sidebar Actions */}
      {/* Added h-full to Sidebar Container so it matches Map height */}
      <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-4 flex-shrink-0 lg:h-full lg:overflow-y-auto custom-scrollbar pb-2">
        
        {/* Modes Card */}
        <div className="bg-[#080d19] border border-[#52e9f1]/30 p-6 rounded-xl shadow-lg flex-shrink-0">
            <h3 className="text-[#52e9f1] font-bold mb-4 flex items-center gap-2 text-xl">
                <PlayCircle className="w-6 h-6" /> MODOS DE JUEGO
            </h3>
            <div className="space-y-3">
                <button className="w-full text-left p-4 bg-[#52e9f1]/10 border-l-4 border-[#52e9f1] text-[#52e9f1] font-bold shadow-inner text-lg">
                    HISTORIA (En curso)
                </button>
                <button 
                    onClick={() => onNavigate(Screen.ARCADE)}
                    className="w-full text-left p-4 bg-gray-800/50 hover:bg-[#ff5f00]/10 border border-transparent hover:border-[#ff5f00] rounded text-gray-300 transition-all flex items-center gap-3 group text-lg"
                >
                    <Gamepad2 className="w-5 h-5 group-hover:text-[#ff5f00]"/> 
                    <span className="font-medium">ARCADE</span>
                </button>
                <button 
                    onClick={() => onNavigate(Screen.ONLINE)}
                    className="w-full text-left p-4 bg-gray-800/50 hover:bg-[#ff5f00]/10 border border-transparent hover:border-[#ff5f00] rounded text-gray-300 transition-all flex items-center gap-3 group text-lg"
                >
                    <Users className="w-5 h-5 group-hover:text-[#ff5f00]"/> 
                    <span className="font-medium">ONLINE (Clase)</span>
                </button>
            </div>
        </div>

        {/* Profile Summary */}
        {/* Added flex-1 to make this card stretch to fill the remaining vertical space */}
        <div className="bg-[#080d19] border border-[#ff5f00]/30 p-6 rounded-xl flex flex-col shadow-lg relative flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#ff5f00] font-bold flex items-center gap-2 text-xl">
                    <User className="w-6 h-6" /> PERFIL DE AGENTE
                </h3>
                <button 
                    onClick={() => onNavigate(Screen.PROFILE_SETTINGS)}
                    className="text-gray-400 hover:text-[#52e9f1] transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                 <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-[#ff5f00] overflow-hidden flex-shrink-0">
                    <img 
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.name}`} 
                        alt="Avatar" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-1 break-all">{profile.name}</div>
                    <div className="text-xl text-[#ff5f00] uppercase font-bold tracking-wider mb-2">{profile.rank}</div>
                    <button 
                        onClick={() => setShowRanks(true)}
                        className="text-base flex items-center gap-1 text-[#52e9f1] hover:underline font-medium"
                    >
                        <Trophy className="w-4 h-4" /> Ver Rangos
                    </button>
                </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-base text-gray-400 mb-2 font-medium">
                    <span>XP Actual: <span className="text-white">{profile.xp}</span></span>
                    <span>Siguiente Rango</span>
                </div>
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff5f00]" style={{ width: `${Math.min(progressToNext, 100)}%` }}></div>
                </div>
            </div>
            
            {/* Stats Block - Pushed to bottom with mt-auto if extra space exists */}
            <div className="space-y-4 text-base text-gray-300 bg-black/40 p-6 rounded mt-auto">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg">Nivel Acceso</span>
                    <span className="text-white font-mono font-bold text-2xl">{profile.level}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg">Casos Resueltos</span>
                    <span className="text-white font-mono font-bold text-2xl">{profile.completedLevels.length}/{LEVELS_METADATA.length}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-lg">Racha Actual</span>
                    <span className="text-[#52e9f1] font-mono font-bold text-2xl">{profile.streak} días 🔥</span>
                </div>
            </div>
        </div>
      </div>

      {/* Ranks Modal */}
      {showRanks && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-md bg-[#080d19] border-2 border-[#ff5f00] rounded-xl p-6 relative my-auto">
                  <button 
                    onClick={() => setShowRanks(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                      <X className="w-6 h-6" />
                  </button>
                  
                  <h2 className="text-3xl font-bold text-[#ff5f00] mb-8 font-orbitron text-center">RANGOS DE AGENTE</h2>
                  
                  <div className="space-y-4">
                      {RANKS_DATA.map((rank, i) => {
                          const isUnlocked = profile.xp >= rank.minXp;
                          const isCurrent = profile.rank === rank.title;
                          
                          return (
                              <div key={i} className={`flex items-center gap-4 p-4 rounded-lg border ${
                                  isCurrent ? 'border-[#ff5f00] bg-[#ff5f00]/10' : 
                                  isUnlocked ? 'border-gray-600 bg-gray-800/50' : 'border-gray-800 bg-black/50 opacity-50'
                              }`}>
                                  <div className="text-4xl">{rank.icon}</div>
                                  <div className="flex-1">
                                      <div className={`text-lg font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{rank.title}</div>
                                      <div className="text-sm text-gray-400">{rank.minXp} XP Requeridos</div>
                                  </div>
                                  {isCurrent && <div className="text-[#ff5f00] text-sm font-bold uppercase">Actual</div>}
                                  {!isUnlocked && <Lock className="w-5 h-5 text-gray-600" />}
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
