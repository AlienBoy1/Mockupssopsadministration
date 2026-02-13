import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Folder, Search, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const MOCK_PROJECTS = [
  {
    id: 'PROJ-001',
    name: 'Proyecto Alpha',
    client: 'TechCorp Industries',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    team: 5,
  },
  {
    id: 'PROJ-002',
    name: 'Proyecto Beta',
    client: 'Innovation Labs',
    status: 'active',
    progress: 45,
    startDate: '2024-02-01',
    endDate: '2024-04-15',
    team: 3,
  },
  {
    id: 'PROJ-003',
    name: 'Proyecto Gamma',
    client: 'Future Systems',
    status: 'planning',
    progress: 10,
    startDate: '2024-02-10',
    endDate: '2024-05-30',
    team: 4,
  },
  {
    id: 'PROJ-004',
    name: 'Proyecto Delta',
    client: 'Smart Solutions Inc',
    status: 'active',
    progress: 90,
    startDate: '2023-12-01',
    endDate: '2024-02-28',
    team: 6,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Projects() {
  const [projects] = useState(MOCK_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusConfig = (status: string, progress: number) => {
    if (progress >= 90) {
      return {
        label: 'Casi Completo',
        color: 'bg-green-600/20 text-green-400',
        icon: CheckCircle,
      };
    }
    if (status === 'active') {
      return {
        label: 'Activo',
        color: 'bg-blue-600/20 text-blue-400',
        icon: TrendingUp,
      };
    }
    return {
      label: 'Planeación',
      color: 'bg-orange-600/20 text-orange-400',
      icon: AlertCircle,
    };
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Proyectos Activos
          </h1>
          <p className="text-gray-400">
            Gestión y seguimiento de proyectos en curso
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0F1419] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project) => {
            const statusConfig = getStatusConfig(project.status, project.progress);
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div key={project.id} variants={cardVariants}>
                <Link to={`/projects/${project.id}`}>
                  <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 hover:border-blue-600/50 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-blue-600/20 rounded-lg">
                        <Folder className="text-blue-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {project.name}
                          </h3>
                          <span className="text-xs font-mono text-gray-500">
                            {project.id}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{project.client}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon size={14} />
                        <span>{statusConfig.label}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progreso</span>
                        <span className="text-sm font-medium text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-400">
                        <span className="text-gray-500">Inicio:</span> {project.startDate}
                      </div>
                      <div className="text-gray-400">
                        <span className="text-gray-500">Equipo:</span> {project.team} personas
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
