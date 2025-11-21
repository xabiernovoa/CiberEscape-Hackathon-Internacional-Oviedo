
import React from 'react';
import { CyberButton } from '../ui/CyberButton';
import { ArrowLeft, Phone, Globe, ShieldCheck, ExternalLink, Book } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';

interface ResourcesProps {
  onBack: () => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onBack }) => {
  
  const openLink = (url: string) => {
      window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-full p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={onBack} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                <ArrowLeft className="text-[#52e9f1]" />
            </button>
            <GlitchText text="RECURSOS DE CIBERSEGURIDAD" as="h1" className="text-3xl font-bold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            
            {/* INCIBE Highlight Section */}
            <div className="bg-[#080d19] border-2 border-[#ff5f00] rounded-xl p-8 shadow-[0_0_30px_rgba(255,95,0,0.15)] relative overflow-hidden lg:col-span-2">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5f00]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                            <ShieldCheck className="w-10 h-10 text-[#ff5f00]" />
                            INCIBE - TU 017
                        </h2>
                        <p className="text-xl text-gray-300 mb-6">
                            ¿Tienes dudas? ¿Has sufrido un ciberataque? El Instituto Nacional de Ciberseguridad (INCIBE) pone a tu disposición el <strong>017</strong>, un número gratuito y confidencial.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                className="bg-[#ff5f00] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-[#ff5f00] transition-colors flex items-center gap-3 shadow-lg"
                                onClick={() => window.location.href = 'tel:017'}
                            >
                                <Phone className="w-6 h-6" /> LLAMAR AL 017
                            </button>
                            <button 
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-black transition-colors flex items-center gap-3"
                                onClick={() => openLink('https://www.incibe.es')}
                            >
                                <Globe className="w-6 h-6" /> WEB OFICIAL
                            </button>
                        </div>
                    </div>
                    
                    {/* Decorative large text */}
                    <div className="text-9xl font-black text-white/5 select-none absolute right-0 bottom-0 pointer-events-none">
                        017
                    </div>
                </div>
            </div>

            {/* Useful Links */}
            <div className="bg-gray-900/80 border border-gray-700 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-[#52e9f1] mb-6 flex items-center gap-2">
                    <ExternalLink className="w-6 h-6" /> ENLACES DE INTERÉS
                </h3>
                <div className="space-y-4">
                    <CyberButton variant="secondary" className="w-full text-lg justify-between" onClick={() => openLink('https://www.osi.es')}>
                        OSI (Oficina de Seguridad del Internauta) <ExternalLink className="w-5 h-5" />
                    </CyberButton>
                    <CyberButton variant="secondary" className="w-full text-lg justify-between" onClick={() => openLink('https://www.incibe.es/protege-tu-empresa')}>
                        Protege tu Empresa <ExternalLink className="w-5 h-5" />
                    </CyberButton>
                    <CyberButton variant="secondary" className="w-full text-lg justify-between" onClick={() => openLink('https://is4k.es')}>
                        Internet Segura for Kids (IS4K) <ExternalLink className="w-5 h-5" />
                    </CyberButton>
                </div>
            </div>

            {/* Cyber Dictionary / Mini Glossary */}
            <div className="bg-gray-900/80 border border-gray-700 p-6 rounded-xl">
                 <h3 className="text-2xl font-bold text-[#52e9f1] mb-6 flex items-center gap-2">
                    <Book className="w-6 h-6" /> CIBER-DICCIONARIO
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <div>
                        <h4 className="text-[#ff5f00] font-bold text-lg">PHISHING</h4>
                        <p className="text-gray-400 text-base">Técnica de engaño para robar datos (contraseñas, tarjetas) suplantando a una entidad de confianza.</p>
                    </div>
                    <div className="border-t border-gray-800 pt-4">
                        <h4 className="text-[#ff5f00] font-bold text-lg">RANSOMWARE</h4>
                        <p className="text-gray-400 text-base">Malware que "secuestra" tus archivos cifrándolos y pide un rescate económico para liberarlos.</p>
                    </div>
                    <div className="border-t border-gray-800 pt-4">
                        <h4 className="text-[#ff5f00] font-bold text-lg">BOTNET</h4>
                        <p className="text-gray-400 text-base">Red de ordenadores infectados controlados remotamente por un ciberdelincuente.</p>
                    </div>
                    <div className="border-t border-gray-800 pt-4">
                        <h4 className="text-[#ff5f00] font-bold text-lg">2FA (Doble Factor)</h4>
                        <p className="text-gray-400 text-base">Capa extra de seguridad. Además de la contraseña, necesitas un código que llega a tu móvil.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};
