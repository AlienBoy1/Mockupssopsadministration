import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface TravelerStep {
  id: string;
  station: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed' | 'blocked';
  assignedTo: string;
  startTime: string | null;
  endTime: string | null;
}

const MOCK_TRAVELERS = [
  {
    id: 'TRV-SI-001',
    projectName: 'Sistema de Control Alpha',
    status: 'inProgress',
    progress: 60,
    startDate: '2024-02-10',
  },
  {
    id: 'TRV-SI-002',
    projectName: 'Sistema de Monitoreo Beta',
    status: 'pending',
    progress: 0,
    startDate: '2024-02-14',
  },
];

export default function TravelerSI() {
  const [travelers] = useState(MOCK_TRAVELERS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-400';
      case 'inProgress':
        return 'bg-blue-600/20 text-blue-400';
      case 'blocked':
        return 'bg-red-600/20 text-red-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} />;
      case 'blocked':
        return <AlertCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Traveler Ensamble SI
            </h1>
            <p className="text-gray-400">
              Sistema de seguimiento de ensamble de Sistemas Integrados
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Nuevo Traveler</span>
          </motion.button>
        </div>

        {/* Travelers List */}
        <div className="space-y-6">
          {travelers.map((traveler) => (
            <motion.div
              key={traveler.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-blue-400">
                        {traveler.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(traveler.status)}`}>
                        {traveler.status === 'inProgress' ? 'En Progreso' : 'Pendiente'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {traveler.projectName}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Inicio: {traveler.startDate}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progreso de Ensamble</span>
                    <span className="text-sm font-medium text-white">
                      {traveler.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${traveler.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Assembly Stations */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">
                  ESTACIONES DE ENSAMBLE
                </h4>
                <div className="space-y-3">
                  {[
                    { name: 'Preparación de Componentes', status: 'completed' },
                    { name: 'Ensamble Mecánico Principal', status: 'completed' },
                    { name: 'Cableado y Conexiones', status: 'inProgress' },
                    { name: 'Pruebas Eléctricas', status: 'pending' },
                    { name: 'Calibración de Sensores', status: 'pending' },
                    { name: 'Inspección Final', status: 'pending' },
                  ].map((station, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        station.status === 'inProgress'
                          ? 'bg-blue-600/10 border border-blue-600/30'
                          : 'bg-[#1A1F28]'
                      }`}
                    >
                      <div className={`${station.status === 'completed' ? 'text-green-400' : station.status === 'inProgress' ? 'text-blue-400' : 'text-gray-600'}`}>
                        {getStatusIcon(station.status)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${station.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {station.name}
                        </p>
                      </div>
                      {station.status === 'inProgress' && (
                        <span className="text-xs text-blue-400">En proceso</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
