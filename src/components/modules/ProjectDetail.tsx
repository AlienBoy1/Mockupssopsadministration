import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Calendar, TrendingUp, FileText, AlertCircle } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock project data
  const project = {
    id: id,
    name: 'Proyecto Alpha',
    client: 'TechCorp Industries',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    description: 'Implementación de sistema de control industrial automatizado con integración IoT y monitoreo en tiempo real.',
    team: [
      { name: 'Ingeniero Lead', role: 'Líder Técnico' },
      { name: 'Especialista Eléctrico', role: 'Diseño Eléctrico' },
      { name: 'Técnico de Campo', role: 'Instalación' },
      { name: 'QA Engineer', role: 'Control de Calidad' },
      { name: 'Project Manager', role: 'Gestión' },
    ],
    milestones: [
      { name: 'Diseño Conceptual', status: 'completed', date: '2024-01-20' },
      { name: 'Fabricación de Componentes', status: 'completed', date: '2024-02-05' },
      { name: 'Ensamble y Pruebas', status: 'inProgress', date: '2024-02-20' },
      { name: 'Instalación en Sitio', status: 'pending', date: '2024-03-10' },
      { name: 'Comisionamiento', status: 'pending', date: '2024-03-20' },
    ],
    documents: [
      { name: 'Checklist FAT-001', type: 'FAT', date: '2024-02-10' },
      { name: 'Formulario F-SAP-023', type: 'SAP', date: '2024-02-08' },
      { name: 'Traveler SI-015', type: 'Traveler', date: '2024-02-12' },
    ],
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                Activo
              </span>
            </div>
            <p className="text-gray-400">{project.client}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Progreso del Proyecto</h2>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Completado</span>
                  <span className="text-2xl font-bold text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-4 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Hitos del Proyecto</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      {milestone.status === 'completed' ? (
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      ) : milestone.status === 'inProgress' ? (
                        <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-6 h-6 bg-gray-700 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${milestone.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {milestone.name}
                        </p>
                        <span className="text-sm text-gray-500">{milestone.date}</span>
                      </div>
                      {milestone.status === 'inProgress' && (
                        <span className="text-sm text-blue-400">En progreso</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Documentos Relacionados</h2>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-[#1A1F28] rounded-lg hover:bg-[#1F2530] transition-colors cursor-pointer">
                    <FileText className="text-blue-400" size={20} />
                    <div className="flex-1">
                      <p className="text-white">{doc.name}</p>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                    <span className="text-sm text-gray-500">{doc.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Información</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Fecha de Inicio</p>
                    <p className="text-white">{project.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Fecha de Entrega</p>
                    <p className="text-white">{project.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-gray-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Estado</p>
                    <p className="text-blue-400">Activo</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-gray-500" size={20} />
                <h3 className="text-lg font-semibold text-white">Equipo</h3>
              </div>
              <div className="space-y-3">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-orange-600/10 border border-orange-600/30 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="text-orange-400 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-orange-400 font-medium mb-1">Pendiente</h3>
                  <p className="text-sm text-orange-300">
                    Revisión de checklist SAT programada para el 20 de febrero
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
