
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { CyberButton } from '../ui/CyberButton';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';

interface ProfileSettingsProps {
  profile: UserProfile;
  onSave: (name: string) => void;
  onReset: () => void;
  onBack: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onSave, onReset, onBack }) => {
  const [name, setName] = useState(profile.name);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(name);
  };

  const handleResetClick = () => {
      if (window.confirm("¿ESTÁS SEGURO? \n\nEsta acción borrará todo tu progreso (XP, niveles completados y rangos) y no se puede deshacer. Volverás al nivel de Becario.")) {
          onReset();
      }
  };

  return (
    <div className="w-full min-h-full p-6 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-md">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                    <ArrowLeft className="text-[#52e9f1]" />
                </button>
                <h1 className="text-2xl font-bold font-orbitron text-white">CONFIGURACIÓN</h1>
            </div>

            <div className="bg-[#080d19] border border-gray-700 p-6 rounded-lg space-y-8">
                
                {/* Profile Edit Section */}
                <div>
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-[#ff5f00] overflow-hidden relative">
                            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`} alt="Avatar Preview" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Nombre de Agente</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-[#52e9f1]/50 p-3 rounded text-white font-mono focus:outline-none focus:border-[#52e9f1] focus:ring-1 focus:ring-[#52e9f1]"
                            />
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded text-xs text-gray-400">
                            <p>ID de Agente: #882-XA-99</p>
                            <p>Región: Europa Oeste</p>
                            <p>Versión App: v1.2.0</p>
                        </div>

                        <CyberButton className="w-full">
                            <Save className="w-4 h-4 inline mr-2" /> GUARDAR CAMBIOS
                        </CyberButton>
                    </form>
                </div>

                {/* Danger Zone */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="bg-red-900/10 border border-red-900/50 p-4 rounded-lg">
                        <h3 className="text-red-500 font-bold flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5" /> ZONA DE PELIGRO
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Reiniciar tu progreso borrará permanentemente tu experiencia, niveles desbloqueados y logros.
                        </p>
                        <CyberButton variant="danger" className="w-full" onClick={handleResetClick}>
                            <Trash2 className="w-4 h-4 inline mr-2" /> BORRAR PROGRESO
                        </CyberButton>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};
