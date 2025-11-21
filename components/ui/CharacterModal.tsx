
import React from 'react';
import { CyberButton } from './CyberButton';
import { GlitchText } from './GlitchText';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface CharacterModalProps {
    title: string;
    message: string;
    lesson: string;
    onClose: () => void;
    buttonText?: string;
    type?: 'success' | 'error' | 'info';
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ 
    title, 
    message, 
    lesson, 
    onClose, 
    buttonText = "CONTINUAR",
    type = 'success'
}) => {

  // Color configuration based on type
  const colors = {
      success: {
          primary: '#52e9f1', // Cyan
          border: 'border-[#52e9f1]',
          bg: 'bg-[#001a1a]',
          text: 'text-[#52e9f1]',
          glow: 'shadow-[0_0_50px_rgba(82,233,241,0.3)]',
          icon: <CheckCircle className="w-6 h-6 text-[#52e9f1]" />
      },
      error: {
          primary: '#ef4444', // Red
          border: 'border-[#ef4444]',
          bg: 'bg-[#1a0505]',
          text: 'text-[#ef4444]',
          glow: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
          icon: <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
      },
      info: {
          primary: '#3b82f6', // Blue
          border: 'border-blue-500',
          bg: 'bg-[#05101a]',
          text: 'text-blue-400',
          glow: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
          icon: <Info className="w-6 h-6 text-blue-500" />
      }
  };

  const theme = colors[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#080d19]/95 backdrop-blur-sm animate-in fade-in duration-200">
        <div className={`w-full max-w-2xl bg-black border-2 ${theme.border} rounded-xl overflow-hidden ${theme.glow} flex flex-col transform transition-all scale-100`}>
            
            {/* Header Bar */}
            <div className={`w-full ${theme.bg} border-b ${theme.border}/30 p-4 flex items-center gap-3`}>
                <div className={`${theme.border} border bg-opacity-20 px-3 py-1 rounded flex items-center gap-2`}>
                    {theme.icon}
                    <span className={`text-xs font-bold tracking-widest ${theme.text}`}>
                        {type === 'error' ? 'ALERTA DE SEGURIDAD' : type === 'info' ? 'INFORMACIÓN' : 'MENSAJE DEL SISTEMA'}
                    </span>
                </div>
                <div className={`h-px flex-1 bg-gradient-to-r from-${type === 'error' ? 'red-500' : type === 'info' ? 'blue-500' : '[#52e9f1]'}/50 to-transparent`}></div>
            </div>

            {/* Content */}
            <div className="w-full p-6 md:p-8 flex flex-col relative">
                
                <GlitchText text={title} as="h2" className={`text-2xl md:text-3xl font-bold mb-6 font-orbitron`} color={theme.primary} />

                {/* Message Box */}
                <div className="relative bg-gray-900/80 p-6 rounded-lg border border-gray-700 mb-6">
                    <p className="text-white text-lg md:text-xl leading-relaxed font-rajdhani">
                        "{message}"
                    </p>
                </div>

                <div className="mt-auto">
                    <div className="mb-6">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">ANÁLISIS:</p>
                        <p className={`${theme.text} font-bold text-lg`}>{lesson}</p>
                    </div>
                    
                    <CyberButton 
                        onClick={onClose} 
                        className="w-full text-lg" 
                        variant={type === 'error' ? 'danger' : 'primary'}
                    >
                        {type === 'error' ? 'REINTENTAR' : buttonText}
                    </CyberButton>
                </div>
            </div>
        </div>
    </div>
  );
};
