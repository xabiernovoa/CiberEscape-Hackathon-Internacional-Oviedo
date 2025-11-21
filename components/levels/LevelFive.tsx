
import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberButton';
import { X, Wifi, Lock } from 'lucide-react';
import { LEVEL_TIPS } from '../../constants';
import { CharacterModal } from '../ui/CharacterModal';

interface LevelFiveProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export const LevelFive: React.FC<LevelFiveProps> = ({ onComplete, onExit }) => {
  const [modalState, setModalState] = useState<{show: boolean, type: 'success' | 'error' | 'info', message: string, title: string, lesson: string} | null>(null);
  const [selectedNet, setSelectedNet] = useState<number | null>(null);

  const networks = [
      { id: 1, name: "Aeropuerto_Guest_FREE", locked: false, signal: 3, evil: true },
      { id: 2, name: "Airport_Official_Secure", locked: true, signal: 3, evil: false },
      { id: 3, name: "Cafeteria_Wifi", locked: true, signal: 2, evil: false },
      { id: 4, name: "iPhone de Maria", locked: true, signal: 1, evil: false },
  ];

  const handleConnect = () => {
      if (selectedNet === null) return;
      const net = networks.find(n => n.id === selectedNet);
      
      if (net?.evil) {
          setModalState({
              show: true,
              type: 'error',
              title: "EVIL TWIN DETECTADO",
              message: "¡Peligro! Te has conectado a una red trampa. El hacker ha clonado el nombre del WiFi oficial para interceptar tus datos. Al ser una red 'abierta' sin candado, todo tu tráfico es visible.",
              lesson: "Evita redes abiertas (sin candado) en sitios públicos. Usa VPN o datos móviles."
          });
      } else if (net?.name === "Airport_Official_Secure") {
           setModalState({
              show: true,
              type: 'success',
              title: "CONEXIÓN SEGURA",
              message: LEVEL_TIPS[5],
              lesson: "Wi-Fi Pública (Evil Twin)"
           });
      } else {
          setModalState({
              show: true,
              type: 'info',
              title: "ACCESO DENEGADO",
              message: "Esta red está protegida y no conoces la contraseña. Busca la red oficial del aeropuerto.",
              lesson: "Las redes privadas son más seguras, pero necesitas credenciales."
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
                buttonText={modalState.type === 'success' ? "MISIÓN CUMPLIDA" : "VOLVER"}
            />
        )}

        <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
        <button onClick={onExit} className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black">
            <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-[400px] h-[85vh] bg-white rounded-[30px] shadow-2xl border-4 border-gray-300 overflow-hidden flex flex-col">
            {/* Settings Header */}
            <div className="bg-gray-100 p-6 border-b flex items-center gap-4">
                <div className="font-bold text-2xl">Wi-Fi</div>
                <div className="animate-spin ml-auto">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            </div>

            {/* Network List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 text-sm text-gray-500 uppercase font-bold">Redes Disponibles</div>
                <div className="divide-y">
                    {networks.map(net => (
                        <div 
                            key={net.id}
                            onClick={() => setSelectedNet(net.id)}
                            className={`p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${selectedNet === net.id ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-gray-900 text-lg">{net.name}</span>
                                {!net.locked && <span className="text-sm text-orange-500 font-bold">Red Abierta</span>}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                {net.locked && <Lock className="w-5 h-5" />}
                                <div className="flex gap-0.5 items-end h-5">
                                    <div className={`w-1.5 bg-current rounded-sm ${net.signal >= 1 ? 'h-2' : 'h-1 opacity-30'}`}></div>
                                    <div className={`w-1.5 bg-current rounded-sm ${net.signal >= 2 ? 'h-3' : 'h-1 opacity-30'}`}></div>
                                    <div className={`w-1.5 bg-current rounded-sm ${net.signal >= 3 ? 'h-4' : 'h-1 opacity-30'}`}></div>
                                </div>
                                {selectedNet === net.id && <div className="w-5 h-5 rounded-full border-4 border-blue-500 ml-2"></div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Connect Button Area */}
            <div className="p-6 border-t bg-gray-50">
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Estás en el aeropuerto. Necesitas enviar un documento urgente.
                </p>
                <button 
                    onClick={handleConnect}
                    disabled={selectedNet === null}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${selectedNet ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Conectar
                </button>
            </div>
        </div>
        </div>
    </>
  );
};
