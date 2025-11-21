
import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberButton';
import { Search, X, Monitor, HelpCircle } from 'lucide-react';
import { COLORS, LEVEL_TIPS, STATIC_HINTS } from '../../constants';
import { CharacterModal } from '../ui/CharacterModal';

interface LevelOneProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

type ViewState = 'DESK' | 'COMPUTER' | 'POSTIT' | 'CALENDAR' | 'PHOTO';

export const LevelOne: React.FC<LevelOneProps> = ({ onComplete, onExit }) => {
  const [view, setView] = useState<ViewState>('DESK');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{show: boolean, type: 'success' | 'error', message: string, title: string, lesson: string} | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkPassword = async () => {
    const cleanPass = password.trim().toLowerCase();
    const isCorrect = cleanPass === 'rex12';
    
    setFeedback(null); 
    setIsChecking(true);

    if (isCorrect) {
      setFeedback("¡ACCESO CONCEDIDO! Iniciando descifrado...");
      setTimeout(() => {
        setIsChecking(false);
        setModalState({
            show: true,
            type: 'success',
            title: "CÁPSULA DE CONOCIMIENTO",
            message: LEVEL_TIPS[1],
            lesson: "Ingeniería Social / Seguridad Física"
        });
      }, 1000);

    } else {
      // Show a random static hint instead of AI feedback
      const randomHint = STATIC_HINTS[Math.floor(Math.random() * STATIC_HINTS.length)];
      
      setIsChecking(false);
      setFeedback("ERROR DE AUTENTICACIÓN");
      
      setModalState({
          show: true,
          type: 'error',
          title: "ACCESO DENEGADO",
          message: `Contraseña incorrecta. Pista del sistema: ${randomHint}`,
          lesson: "Observación: Revisa el entorno (notas, calendario, fotos)."
      });
    }
  };

  const handleDeskClick = (target: ViewState) => {
    setView(target);
  };

  const renderOverlay = () => {
    if (view === 'DESK') return null;

    let content = null;
    switch (view) {
      case 'POSTIT':
        content = (
          <div className="bg-yellow-200 text-gray-900 p-8 font-handwriting transform rotate-2 shadow-xl max-w-sm border border-yellow-300">
            <p className="font-bold text-3xl mb-4 font-serif text-gray-900">Importante:</p>
            <p className="font-serif text-2xl text-gray-800 leading-tight">No olvidar el cumple de <span className="font-bold">Rex</span>. Comprar huesos.</p>
            <p className="mt-6 text-lg opacity-70 font-sans text-gray-700">(Pegado debajo del monitor)</p>
          </div>
        );
        break;
      case 'CALENDAR':
        content = (
          <div className="bg-white text-black p-6 rounded shadow-xl max-w-md border border-gray-300">
            <h3 className="text-center font-bold text-red-600 text-3xl border-b-2 border-red-600 mb-4">OCTUBRE</h3>
            <div className="grid grid-cols-7 gap-3 text-center font-mono text-xl">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <div key={d} className={`p-2 text-gray-800 ${d === 12 ? 'border-4 border-red-500 rounded-full font-bold text-red-600' : ''}`}>
                  {d}
                </div>
              ))}
            </div>
            <p className="text-center mt-4 text-red-500 font-handwriting font-bold text-2xl">¡Fiesta!</p>
          </div>
        );
        break;
      case 'PHOTO':
        content = (
          <div className="bg-white p-4 shadow-xl transform -rotate-2 max-w-sm border border-gray-200">
            <div className="w-72 h-56 bg-gray-200 mb-4 overflow-hidden relative">
                <img src="https://picsum.photos/id/237/400/300" alt="Dog" className="object-cover w-full h-full" />
            </div>
            <p className="text-center font-handwriting text-3xl text-gray-800">Rex, el mejor chico 🐶</p>
          </div>
        );
        break;
      case 'COMPUTER':
        return null; 
    }

    return (
      <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setView('DESK')}>
        <div className="relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setView('DESK')}
            className="absolute -top-14 right-0 text-white hover:text-[#ff5f00]"
          >
            <X className="w-10 h-10" />
          </button>
          {content}
          <p className="text-center text-gray-400 mt-8 text-base uppercase tracking-widest animate-pulse">Click fuera para volver</p>
        </div>
      </div>
    );
  };

  return (
    <>
        {modalState && modalState.show && (
            <CharacterModal 
                title={modalState.title}
                message={modalState.message}
                lesson={modalState.lesson}
                type={modalState.type}
                onClose={() => {
                    if (modalState.type === 'success') {
                        onComplete(true);
                    } else {
                        setModalState(null);
                        setPassword(''); // Clear password on retry
                    }
                }}
                buttonText={modalState.type === 'success' ? "COMPLETAR MISIÓN" : "REINTENTAR"}
            />
        )}

        <div className="relative w-full h-full bg-gray-900 overflow-hidden min-h-[600px]">
        {/* Header UI */}
        <div className="absolute top-0 left-0 w-full p-4 z-40 flex justify-between items-start pointer-events-none">
            <div className="bg-black/70 backdrop-blur p-4 rounded-lg border border-[#ff5f00]/30 pointer-events-auto shadow-lg">
            <h2 className="text-[#ff5f00] font-bold text-xl">CASO 01: COMISARÍA</h2>
            <p className="text-sm text-gray-400">Objetivo: Desbloquear PC</p>
            </div>
            <button onClick={onExit} className="pointer-events-auto bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500 p-2 rounded transition-colors">
            <X className="w-6 h-6" />
            </button>
        </div>

        {/* Main 3D-ish Scene */}
        <div className={`w-full h-full relative transition-all duration-500 ${view === 'COMPUTER' ? 'scale-110' : 'scale-100'}`}>
            
            {/* Background Office */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="absolute top-0 w-full h-1/3 bg-[#1a1a1a] border-b border-gray-700"></div>
            </div>

            {/* Desk Surface */}
            <div className="absolute bottom-0 w-full h-2/3 bg-[#2d2d2d] shadow-inner flex items-center justify-center perspective-1000">
                
                {/* Computer Monitor Area */}
                <div 
                    onClick={() => handleDeskClick('COMPUTER')}
                    className="absolute top-[-10%] w-1/2 md:w-1/3 aspect-video bg-black rounded-t-lg border-4 border-gray-700 flex items-center justify-center cursor-pointer hover:shadow-[0_0_30px_rgba(82,233,241,0.3)] transition-shadow group"
                >
                    <div className="w-full h-full bg-[#001a1a] overflow-hidden relative p-4 flex flex-col items-center justify-center">
                        {view !== 'COMPUTER' && (
                            <>
                                <div className="text-[#52e9f1] font-mono text-sm mb-2">SYSTEM LOCKED</div>
                                <div className="w-32 h-8 bg-gray-800 rounded animate-pulse"></div>
                            </>
                        )}
                        <Monitor className="absolute bottom-2 right-2 text-gray-600 w-6 h-6 group-hover:text-[#52e9f1]" />
                    </div>
                    {/* Base */}
                    <div className="absolute -bottom-8 w-1/3 h-8 bg-gray-800"></div>
                    <div className="absolute -bottom-10 w-2/3 h-2 bg-gray-700 rounded"></div>
                </div>

                {/* Calendar on Wall */}
                <div 
                    onClick={() => handleDeskClick('CALENDAR')}
                    className="absolute top-[-25%] left-[10%] w-28 h-32 bg-white shadow-lg transform rotate-3 cursor-pointer hover:scale-105 transition-transform p-2 flex flex-col items-center"
                >
                    <div className="w-full h-8 bg-red-600 mb-1"></div>
                    <div className="flex-1 w-full bg-gray-100 grid grid-cols-3 gap-1">
                        <div className="bg-gray-300 rounded-sm"></div>
                        <div className="bg-gray-300 rounded-sm"></div>
                        <div className="bg-gray-300 rounded-sm"></div>
                    </div>
                    <Search className="absolute -top-4 -right-4 text-[#52e9f1] opacity-0 hover:opacity-100 transition-opacity bg-black rounded-full p-1 w-8 h-8" />
                </div>

                {/* Photo Frame */}
                <div 
                    onClick={() => handleDeskClick('PHOTO')}
                    className="absolute bottom-[20%] right-[10%] w-40 h-28 bg-orange-900 border-4 border-yellow-900 shadow-lg transform -rotate-6 cursor-pointer hover:scale-105 transition-transform"
                >
                    <div className="w-full h-full bg-gray-200 overflow-hidden">
                        <img src="https://picsum.photos/id/237/200/150" alt="Mini Dog" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Post-it Note */}
                <div 
                    onClick={() => handleDeskClick('POSTIT')}
                    className="absolute top-[30%] left-[35%] w-20 h-20 bg-yellow-300 shadow-md transform rotate-12 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                >
                    <span className="font-handwriting text-xs text-center text-gray-900 font-bold leading-none p-1">Recuerda...</span>
                </div>

            </div>
        </div>

        {/* Computer Focused View Overlay */}
        {view === 'COMPUTER' && (
            <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-[#002b36] border-2 border-[#52e9f1] p-8 md:p-12 rounded shadow-[0_0_50px_rgba(82,233,241,0.2)] relative my-auto">
                <button 
                    onClick={() => setView('DESK')}
                    className="absolute top-4 right-4 text-[#52e9f1] hover:text-white"
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-[#52e9f1] font-orbitron text-2xl tracking-widest mb-2">POLICIA_OS v2.0</h3>
                    <p className="text-gray-400 text-base">Introduzca credenciales de administrador</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[#52e9f1] text-sm uppercase font-bold mb-2">Usuario</label>
                        <input type="text" value="Comisario_Rodriguez" disabled className="w-full bg-[#001a1a] border border-[#52e9f1]/30 text-gray-400 p-4 text-lg font-mono rounded cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-[#52e9f1] text-sm uppercase font-bold mb-2">Contraseña</label>
                        <input 
                            type="text" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Introduzca contraseña..."
                            className="w-full bg-[#080d19] border border-[#52e9f1] text-white p-4 text-lg font-mono rounded focus:outline-none focus:ring-2 focus:ring-[#ff5f00]"
                            autoFocus
                        />
                    </div>
                    
                    {feedback && (
                        <div className={`p-4 rounded text-base font-bold text-center animate-pulse ${feedback.includes('ACCESO CONCEDIDO') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                            {feedback}
                        </div>
                    )}

                    <CyberButton onClick={checkPassword} className="w-full mt-4 text-lg" disabled={isChecking}>
                        {isChecking ? 'VERIFICANDO...' : 'DESBLOQUEAR'}
                    </CyberButton>
                </div>
            </div>
            </div>
        )}

        {/* Detail Overlays */}
        {renderOverlay()}

        </div>
    </>
  );
};
