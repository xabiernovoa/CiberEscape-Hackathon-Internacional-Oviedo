
import React from 'react';
import { UserProfile } from '../../types';
import { LEVELS_METADATA } from '../../constants';
import { CyberButton } from '../ui/CyberButton';
import { ArrowLeft, Play, Lock } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';

interface ArcadeProps {
  profile: UserProfile;
  onSelectLevel: (id: number) => void;
  onBack: () => void;
}

export const Arcade: React.FC<ArcadeProps> = ({ profile, onSelectLevel, onBack }) => {
  const unlockedLevels = LEVELS_METADATA.filter(level => 
    profile.completedLevels.includes(level.id) || level.id === 1
  );

  return (
    <div className="w-full min-h-full p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={onBack} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                <ArrowLeft className="text-[#52e9f1]" />
            </button>
            <GlitchText text="MODO ARCADE" as="h1" className="text-3xl font-bold" />
        </div>

        <p className="text-gray-400 mb-6 max-w-2xl">
            Entrenamiento intensivo. Repite los escenarios desbloqueados para mejorar tus tiempos y mantener tus habilidades afiladas. Sin consecuencias en la historia principal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            {LEVELS_METADATA.map((level) => {
                const isUnlocked = profile.completedLevels.includes(level.id) || level.id === 1;
                
                return (
                    <div 
                        key={level.id}
                        className={`border rounded-lg p-6 relative overflow-hidden transition-all flex flex-col
                            ${isUnlocked 
                                ? 'border-[#52e9f1]/30 bg-[#080d19]/80 hover:border-[#52e9f1] hover:shadow-[0_0_15px_rgba(82,233,241,0.2)]' 
                                : 'border-gray-800 bg-gray-900/50 opacity-50'}
                        `}
                    >
                        {!isUnlocked && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
                                <Lock className="w-8 h-8 text-gray-500" />
                            </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-sm font-bold px-3 py-1 rounded ${
                                level.difficulty === 'Easy' ? 'bg-green-900 text-green-400' :
                                level.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-400' :
                                'bg-red-900 text-red-400'
                            }`}>
                                {level.difficulty}
                            </span>
                            {isUnlocked && <Play className="w-5 h-5 text-[#52e9f1]" />}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 font-orbitron">{level.title}</h3>
                        <p className="text-lg text-gray-300 mb-6 flex-1">{level.description}</p>

                        <CyberButton 
                            onClick={() => isUnlocked && onSelectLevel(level.id)} 
                            disabled={!isUnlocked}
                            className="w-full text-base py-3 mt-auto"
                            variant={isUnlocked ? 'secondary' : 'primary'}
                        >
                            {isUnlocked ? 'REPETIR' : 'BLOQUEADO'}
                        </CyberButton>
                    </div>
                );
            })}
        </div>
    </div>
  );
};
