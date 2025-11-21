
import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberButton';
import { X, ArrowLeft, MoreVertical } from 'lucide-react';
import { LEVEL_TIPS } from '../../constants';
import { CharacterModal } from '../ui/CharacterModal';

interface LevelThreeProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export const LevelThree: React.FC<LevelThreeProps> = ({ onComplete, onExit }) => {
  const [modalState, setModalState] = useState<{show: boolean, type: 'success' | 'error' | 'info', message: string, title: string, lesson: string} | null>(null);
  
  const messages = [
    {
      id: 1,
      sender: "Mamá",
      preview: "¿Vienes a comer el domingo? He hecho paella.",
      time: "10:30",
      isScam: false,
      content: "Hola hijo, ¿vienes a comer el domingo? He hecho paella y tu padre ha comprado vino. Avísame para poner un plato más."
    },
    {
      id: 2,
      sender: "Banco Segura",
      preview: "Código de confirmación: 89210. No compartas este código.",
      time: "Yesterday",
      isScam: false,
      content: "Banco Segura: Tu código de confirmación para la operación es 89210. No compartas este código con nadie, ni siquiera con empleados del banco."
    },
    {
      id: 3,
      sender: "CorreosExpress",
      preview: "Su paquete ES-9921 está retenido. Pague tasas de aduana aquí...",
      time: "14:15",
      isScam: true,
      content: "Su paquete ES-9921 está retenido en el centro de distribución debido a tasas de aduana impagadas (2,99€). Pague aquí para liberar la entrega: http://correos-pagos-seguros.net/pago",
      flags: ["URL sospechosa (.net en vez de .es)", "Urgencia innecesaria", "Cantidad pequeña para que no lo pienses"]
    }
  ];

  const [selectedMsg, setSelectedMsg] = useState<number | null>(null);

  const handleReport = async () => {
    const msg = messages.find(m => m.id === selectedMsg);
    if (msg?.isScam) {
        setModalState({
            show: true,
            type: 'success',
            title: "AMENAZA IDENTIFICADA",
            message: LEVEL_TIPS[3],
            lesson: "Smishing (SMS Phishing)"
        });
    } else {
        setModalState({
            show: true,
            type: 'info',
            title: "FALSO POSITIVO",
            message: "Este mensaje es legítimo. Verifica el contexto: es una conversación normal con un contacto conocido o un mensaje informativo sin enlaces peligrosos.",
            lesson: "No todo mensaje es una estafa. Busca enlaces extraños o solicitudes de dinero."
        });
        setSelectedMsg(null);
    }
  };

  const handleSafeMark = () => {
      const msg = messages.find(m => m.id === selectedMsg);
      if (msg?.isScam) {
          setModalState({
            show: true,
            type: 'error',
            title: "ERROR DE JUICIO",
            message: "¡Cuidado! Has marcado como seguro un mensaje que intenta robarte dinero. Fíjate en el enlace: correos-pagos-seguros.net NO es la web oficial.",
            lesson: "Siempre verifica la URL antes de confiar. Ante la duda, no hagas clic."
          });
      } else {
          // Correctly identified safe message, just go back
          setSelectedMsg(null);
      }
  }

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
                buttonText={modalState.type === 'success' ? "FINALIZAR MISIÓN" : "ENTENDIDO"}
            />
        )}
        
        <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
        <button onClick={onExit} className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black">
            <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-[400px] h-[90vh] bg-white rounded-[30px] overflow-hidden shadow-2xl flex flex-col">
            {/* SMS App Header */}
            <div className="bg-green-600 p-5 pt-8 text-white flex items-center gap-4 shadow-md">
                {selectedMsg ? (
                    <ArrowLeft className="cursor-pointer hover:opacity-80 w-6 h-6" onClick={() => setSelectedMsg(null)} />
                ) : <div className="w-6" />}
                <h1 className="font-bold text-2xl flex-1 tracking-tight">Mensajes</h1>
                <MoreVertical className="w-6 h-6" />
            </div>

            {/* Message List or Detail */}
            <div className="flex-1 overflow-y-auto bg-white">
                {!selectedMsg ? (
                    <div className="divide-y divide-gray-200">
                        {messages.map(msg => (
                            <div 
                                key={msg.id} 
                                onClick={() => setSelectedMsg(msg.id)}
                                className="p-5 hover:bg-gray-50 cursor-pointer transition-colors group"
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-gray-900 text-lg group-hover:text-black">{msg.sender}</span>
                                    <span className="text-sm text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-base text-gray-600 truncate">{msg.preview}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col h-full bg-gray-50">
                        <div className="flex-1 p-5">
                            {/* Message Bubble */}
                            <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-200 max-w-[95%] mb-2">
                                <p className="text-gray-900 text-xl leading-relaxed font-medium">
                                    {messages.find(m => m.id === selectedMsg)?.content}
                                </p>
                            </div>
                            <div className="text-sm text-gray-400 ml-2">
                                {messages.find(m => m.id === selectedMsg)?.time}
                            </div>
                        </div>
                        
                        <div className="p-5 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <p className="text-base font-bold text-center text-gray-800 mb-4 uppercase tracking-wide">¿Es este mensaje una estafa?</p>
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleSafeMark}
                                    className="flex-1 py-4 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-lg"
                                >
                                    Es Seguro
                                </button>
                                <button 
                                    onClick={handleReport}
                                    className="flex-1 py-4 bg-red-500 rounded-lg font-bold text-white hover:bg-red-600 transition-colors shadow-md text-lg"
                                >
                                    REPORTAR
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    </>
  );
};
