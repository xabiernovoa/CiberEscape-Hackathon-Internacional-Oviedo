
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { CyberButton } from '../ui/CyberButton';
import { ArrowLeft, Users, Crown, Zap } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';

interface OnlineProps {
  profile: UserProfile;
  onBack: () => void;
}

export const Online: React.FC<OnlineProps> = ({ profile, onBack }) => {
  const [joined, setJoined] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { name: "Ana_Cyber", xp: 1200, status: 'Ready' },
    { name: "David_Tech", xp: 950, status: 'In Game' },
    { name: "Lucia_Net", xp: 800, status: 'Ready' },
  ]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode) return;
    setLoading(true);
    setTimeout(() => {
        setJoined(true);
        setLoading(false);
        setLeaderboard(prev => [...prev, { name: profile.name, xp: profile.xp, status: 'Ready' }].sort((a,b) => b.xp - a.xp));
    }, 1500);
  };

  if (joined) {
      return (
          <div className="w-full min-h-full p-6 flex flex-col items-center">
             <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => setJoined(false)} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="text-[#52e9f1]" />
                    </button>
                    <div className="text-center">
                        <div className="text-xs text-gray-400 uppercase tracking-widest">AULA CONECTADA</div>
                        <GlitchText text={`SALA: ${roomCode}`} className="text-3xl font-bold" />
                    </div>
                    <div className="w-10"></div>
                </div>

                <div className="flex gap-6 flex-col md:flex-row">
                    {/* Leaderboard */}
                    <div className="flex-1 bg-[#080d19] border border-[#ff5f00]/30 rounded-lg p-4">
                        <h3 className="text-[#ff5f00] font-bold mb-4 flex items-center gap-2">
                            <Crown className="w-5 h-5" /> CLASIFICACIÓN EN TIEMPO REAL
                        </h3>
                        <div className="space-y-2">
                            {leaderboard.map((user, index) => (
                                <div key={user.name} className={`flex items-center justify-between p-3 rounded ${user.name === profile.name ? 'bg-[#ff5f00]/20 border border-[#ff5f00]/50' : 'bg-gray-800/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-500 w-4">{index + 1}</span>
                                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
                                        </div>
                                        <span className={user.name === profile.name ? 'text-white font-bold' : 'text-gray-300'}>
                                            {user.name} {user.name === profile.name && '(Tú)'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#52e9f1] font-mono font-bold">{user.xp} XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Challenge Area */}
                    <div className="w-full md:w-64 flex flex-col gap-4">
                        <div className="bg-[#52e9f1]/10 border border-[#52e9f1]/30 p-4 rounded-lg text-center">
                            <Zap className="w-8 h-8 text-[#52e9f1] mx-auto mb-2" />
                            <h4 className="text-white font-bold mb-2">RETO RÁPIDO</h4>
                            <p className="text-xs text-gray-400 mb-4">Resuelve 3 preguntas de seguridad en 60 segundos.</p>
                            <CyberButton className="w-full text-xs">EMPEZAR (DEMO)</CyberButton>
                        </div>
                        <div className="text-lg text-center text-gray-400 mt-auto font-medium animate-pulse">
                            Esperando al profesor para iniciar evento global...
                        </div>
                    </div>
                </div>
             </div>
          </div>
      );
  }

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-6">
        <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
            <ArrowLeft className="text-[#52e9f1]" />
        </button>

        <div className="max-w-md w-full bg-[#080d19] border border-gray-700 p-8 rounded-lg text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff5f00] to-[#52e9f1]"></div>
            
            <Users className="w-16 h-16 text-white mx-auto mb-4 bg-gray-800 p-3 rounded-full" />
            <GlitchText text="MODO AULA" className="text-2xl font-bold mb-2 block" />
            <p className="text-gray-400 text-sm mb-6">Introduce el código proporcionado por tu profesor para unirte a la sesión y competir con tus compañeros.</p>

            <form onSubmit={handleJoin} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="CÓDIGO DE SALA (Ej: CIBER-101)" 
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="w-full bg-black border border-gray-600 p-4 text-center text-2xl tracking-widest font-mono text-[#52e9f1] rounded focus:border-[#52e9f1] outline-none uppercase placeholder:text-gray-700"
                />
                <CyberButton className="w-full" disabled={loading || roomCode.length < 3}>
                    {loading ? 'CONECTANDO...' : 'UNIRSE A LA SALA'}
                </CyberButton>
            </form>
        </div>
    </div>
  );
};
