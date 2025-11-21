
import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberButton';
import { X, Smartphone, QrCode, AlertTriangle } from 'lucide-react';
import { LEVEL_TIPS } from '../../constants';
import { CharacterModal } from '../ui/CharacterModal';

interface LevelFourProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export const LevelFour: React.FC<LevelFourProps> = ({ onComplete, onExit }) => {
  const [modalState, setModalState] = useState<{show: boolean, type: 'success' | 'error', message: string, title: string, lesson: string} | null>(null);

  const handleScan = (isTrap: boolean) => {
      if(isTrap) {
          setModalState({
              show: true,
              type: 'error',
              title: "MALWARE DETECTADO",
              message: "¡Has caído en la trampa! Ese código QR era una pegatina falsa colocada sobre el cartel original. Te ha redirigido a una web de descarga maliciosa.",
              lesson: "Quishing: Inspecciona físicamente los QR callejeros. Si es una pegatina, desconfía."
          });
      } else {
          setModalState({
              show: true,
              type: 'success',
              title: "AMENAZA EVITADA",
              message: LEVEL_TIPS[4],
              lesson: "Quishing (QR Phishing)"
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

        <div className="relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
        <button onClick={onExit} className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black">
            <X className="w-6 h-6" />
        </button>

        {/* Street Scene Background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, #111, #333)' }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl text-white font-bold mb-10 bg-black/50 px-6 py-3 rounded border border-gray-700">Calle Principal - Cartel Publicitario</h2>

            {/* The Poster */}
            <div className="bg-white p-8 rounded shadow-2xl max-w-md w-full transform rotate-1 relative">
                <div className="border-4 border-blue-600 p-6 text-center">
                    <h1 className="text-5xl font-black text-blue-600 mb-4">¡GANA BITCOIN!</h1>
                    <p className="text-gray-600 text-lg mb-6">Escanea para reclamar 0.01 BTC gratis. Oferta limitada.</p>
                    
                    <div className="relative w-64 h-64 mx-auto bg-gray-100 mb-6 flex items-center justify-center group cursor-pointer" onClick={() => handleScan(true)}>
                        <QrCode className="w-48 h-48 text-gray-800" />
                        {/* The "Sticker" Effect */}
                        <div className="absolute inset-0 m-2 border-2 border-dashed border-gray-300 rounded transform rotate-1 shadow-md bg-white/90 flex items-center justify-center">
                            <QrCode className="w-56 h-56 text-black" />
                        </div>
                        <div className="absolute -right-6 -top-6 bg-yellow-400 text-black text-sm font-bold p-2 transform rotate-12 shadow-lg">¡NUEVO!</div>
                    </div>

                    <p className="text-sm text-gray-400">Patrocinado por CryptoWorld X</p>
                </div>
            </div>

            {/* Player Controls */}
            <div className="mt-10 flex gap-6">
                <button 
                    onClick={() => handleScan(true)}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
                >
                    <Smartphone className="w-6 h-6" /> Escanear QR
                </button>

                <button 
                    onClick={() => handleScan(false)}
                    className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                >
                    <AlertTriangle className="w-6 h-6" /> ¡Es una estafa!
                </button>
            </div>

            <p className="mt-6 text-gray-400 text-base max-w-md text-center bg-black/60 p-3 rounded">
                <span className="text-[#52e9f1] font-bold">PISTA:</span> Fíjate bien en la superficie del código QR.
            </p>
        </div>
        </div>
    </>
  );
};
