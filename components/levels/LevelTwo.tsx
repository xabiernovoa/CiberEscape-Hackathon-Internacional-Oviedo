
import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberButton';
import { X, MessageCircle, ShieldAlert } from 'lucide-react';
import { LEVEL_TIPS } from '../../constants';
import { CharacterModal } from '../ui/CharacterModal';

interface LevelTwoProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export const LevelTwo: React.FC<LevelTwoProps> = ({ onComplete, onExit }) => {
  const [modalState, setModalState] = useState<{show: boolean, type: 'success' | 'error', message: string, title: string, lesson: string} | null>(null);
  
  const handleDecision = async (isSafe: boolean) => {
    if (isSafe) {
      setModalState({
          show: true,
          type: 'success',
          title: "AMENAZA NEUTRALIZADA",
          message: LEVEL_TIPS[2],
          lesson: "Phishing en Redes Sociales"
      });
    } else {
      setModalState({
          show: true,
          type: 'error',
          title: "DISPOSITIVO COMPROMETIDO",
          message: "Has hecho clic en un enlace acortado enviado por un desconocido. En la vida real, esto habría descargado malware o robado tus credenciales.",
          lesson: "Red Flags: Enlaces ocultos (bit.ly) + Urgencia + Remitente no verificado."
      });
    }
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
                    }
                }}
                buttonText={modalState.type === 'success' ? "CONTINUAR" : "REINTENTAR"}
            />
        )}

        <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
        <button onClick={onExit} className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black">
            <X className="w-6 h-6" />
        </button>

        {/* Phone Container */}
        <div className="w-full max-w-[400px] h-[95vh] bg-white rounded-[40px] border-8 border-gray-900 overflow-hidden shadow-2xl relative flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
            
            {/* App Header */}
            <div className="bg-white border-b p-4 pt-12 flex justify-between items-center">
                <div className="font-bold text-2xl text-black">InstaPhoto</div>
                <MessageCircle className="w-8 h-8 text-black" />
            </div>

            {/* DM Content */}
            <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col">
                <div className="text-gray-500 text-sm text-center mb-6 font-medium">Hoy 14:02</div>
                
                <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/seed/hacker/100" alt="Profile" />
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl rounded-tl-none p-4 shadow-sm max-w-[85%]">
                        <p className="text-lg text-gray-900 leading-snug">Hola! 👋 Hemos detectado un inicio de sesión inusual en tu cuenta.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/seed/hacker/100" alt="Profile" />
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl rounded-tl-none p-4 shadow-sm max-w-[85%]">
                        <p className="text-lg text-gray-900 leading-snug mb-2">Por favor verifica tu identidad aquí para evitar el bloqueo permanente: <span className="text-blue-600 font-bold underline cursor-pointer block mt-2" onClick={() => handleDecision(false)}>bit.ly/verify-account-now</span></p>
                    </div>
                </div>

                <div className="mt-8 border-t pt-4">
                    <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase text-center">Analiza el remitente</h3>
                    
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm mb-4">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 bg-gray-200 rounded-full">
                                <img src="https://picsum.photos/seed/hacker/100" className="w-full h-full rounded-full" />
                            </div>
                            <div>
                                <div className="font-bold flex items-center gap-1 text-black text-base">
                                    Soporte_Oficial_IG <span className="text-gray-500 text-xs font-normal">(No verificado)</span>
                                </div>
                                <div className="text-sm text-gray-600">0 Publicaciones • 12 Seguidores</div>
                            </div>
                        </div>
                        <div className="text-sm text-red-600 font-bold bg-red-50 p-3 rounded border border-red-100">
                            ⚠️ Alerta: Este usuario te sigue desde hoy.
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-white border-t grid grid-cols-2 gap-4">
                <button 
                    onClick={() => handleDecision(false)}
                    className="bg-blue-500 text-white py-4 rounded-lg font-bold text-base hover:bg-blue-600 transition-colors shadow-sm"
                >
                    Verificar Cuenta
                </button>
                <button 
                    onClick={() => handleDecision(true)}
                    className="bg-red-500 text-white py-4 rounded-lg font-bold text-base hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <ShieldAlert className="w-5 h-5" /> Reportar Phishing
                </button>
            </div>

        </div>
        </div>
    </>
  );
};
