import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, FileDown, Box, Clock, CheckCircle, Package } from 'lucide-react';

interface ControlMaterial {
  id: string;
  folio: string;
  proyecto: string;
  solicitante: string;
  departamento: 'Ingeniería/SI' | 'Almacén' | 'Administración';
  descripcion: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  fechaSolicitud: string;
  sla: 'verde' | 'amarillo' | 'rojo';
  pickingList: boolean;
}

const MOCK_DATA: ControlMaterial[] = [
  {
    id: '1',
    folio: 'CM-2024-001',
    proyecto: 'Proyecto Alpha',
    solicitante: 'Luis García',
    departamento: 'Ingeniería/SI',
    descripcion: 'Descarga de componentes electrónicos para ensamble fase 2',
    status: 'approved',
    fechaSolicitud: '2024-02-11',
    sla: 'verde',
    pickingList: true,
  },
  {
    id: '2',
    folio: 'CM-2024-002',
    proyecto: 'Proyecto Beta',
    solicitante: 'María Fernández',
    departamento: 'Almacén',
    descripcion: 'Kitting para traveler SI-2024-015',
    status: 'completed',
    fechaSolicitud: '2024-02-09',
    sla: 'verde',
    pickingList: true,
  },
  {
    id: '3',
    folio: 'CM-2024-003',
    proyecto: 'Proyecto Gamma',
    solicitante: 'Roberto Sánchez',
    departamento: 'Ingeniería/SI',
    descripcion: 'Material para pruebas FAT - Gabinete de control',
    status: 'pending',
    fechaSolicitud: '2024-02-13',
    sla: 'amarillo',
    pickingList: false,
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

export default function SOP3ControlMaterial() {
  const [materiales] = useState<ControlMaterial[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = materiales.filter(
    (m) =>
      m.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'approved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendiente ID',
      approved: 'Aprobado - Listo Kitting',
      completed: 'Completado',
      rejected: 'Rechazado',
    };
    return labels[status] || status;
  };

  const getSLAIndicator = (sla: string) => {
    const colors = {
      verde: 'bg-green-500 shadow-green-500/50',
      amarillo: 'bg-yellow-500 shadow-yellow-500/50',
      rojo: 'bg-red-500 shadow-red-500/50',
    };
    return colors[sla as keyof typeof colors] || 'bg-gray-500';
  };

  // Calculate stats
  const totalMateriales = filtered.length;
  const conPickingList = filtered.filter(m => m.pickingList).length;
  const completados = filtered.filter(m => m.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                SOP 3 - Control de Material para Proyecto
              </span>
            </h1>
            <p className="text-gray-400">
              Descarga a costo para reflejar costo real del proyecto
            </p>
          </div>
          <Link to="/sop3-control-material/slas/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg">
                <Plus size={20} />
                <span>Nueva Descarga</span>
              </div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Package className="text-purple-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Descargas</p>
                <p className="text-2xl font-bold text-white">{totalMateriales}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Box className="text-blue-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Con Picking List</p>
                <p className="text-2xl font-bold text-white">{conPickingList}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completados</p>
                <p className="text-2xl font-bold text-white">{completados}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar por folio, proyecto o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:border-orange-500/50 transition-all"
          >
            <FileDown size={20} />
            <span>Exportar</span>
          </motion.button>
        </motion.div>

        {/* Control Material List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((mat) => (
            <motion.div key={mat.id} variants={cardVariants}>
              <Link to={`/sop3-control-material/slas/${mat.id}`}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-sm font-mono font-bold text-purple-400">{mat.folio}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(mat.status)}`}>
                            {getStatusLabel(mat.status)}
                          </span>
                          <div className={`w-3 h-3 rounded-full shadow-lg ${getSLAIndicator(mat.sla)}`} title={`SLA: ${mat.sla}`} />
                          {mat.pickingList && (
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-medium">
                              Picking List
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {mat.proyecto}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">{mat.descripcion}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Solicitante: <span className="text-gray-300">{mat.solicitante}</span></span>
                          <span>•</span>
                          <span>Depto: <span className="text-gray-300">{mat.departamento}</span></span>
                          <span>•</span>
                          <span>Fecha: <span className="text-gray-300">{mat.fechaSolicitud}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">No se encontraron registros</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}