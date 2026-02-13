import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, FileDown, Clock, CheckCircle, Package } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

interface Requisicion {
  id: string;
  folio: string;
  solicitante: string;
  departamento: 'PM' | 'Ingeniería' | 'SI' | 'Almacén' | 'Compras USA' | 'Administración MX';
  descripcion: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'completed';
  fechaSolicitud: string;
  sla: 'verde' | 'amarillo' | 'rojo';
  urgente: boolean;
  tipoCompra: 'Material' | 'Servicio' | 'Equipo';
}

const MOCK_DATA: Requisicion[] = [
  {
    id: '1',
    folio: 'REQ-2024-001',
    solicitante: 'Carlos Méndez',
    departamento: 'PM',
    descripcion: 'Componentes para proyecto Alpha - Sensores y cables',
    status: 'approved',
    fechaSolicitud: '2024-02-10',
    sla: 'verde',
    urgente: false,
    tipoCompra: 'Material',
  },
  {
    id: '2',
    folio: 'REQ-2024-002',
    solicitante: 'Ana Torres',
    departamento: 'Ingeniería',
    descripcion: 'Servicio de calibración para equipos de laboratorio',
    status: 'pending',
    fechaSolicitud: '2024-02-13',
    sla: 'amarillo',
    urgente: true,
    tipoCompra: 'Servicio',
  },
  {
    id: '3',
    folio: 'REQ-2024-003',
    solicitante: 'Pedro Ramírez',
    departamento: 'Almacén',
    descripcion: 'Reposición stock - Tornillería y sujetadores M6',
    status: 'completed',
    fechaSolicitud: '2024-02-08',
    sla: 'verde',
    urgente: false,
    tipoCompra: 'Material',
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

export default function SOP2Requisiciones() {
  const { t } = useI18n();
  const [requisiciones] = useState<Requisicion[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = requisiciones.filter(
    (r) =>
      r.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
      draft: 'Borrador',
      pending: 'Pendiente Aprobación',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      completed: 'Completada',
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
  const totalRequisiciones = filtered.length;
  const urgentes = filtered.filter(r => r.urgente).length;
  const completadas = filtered.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-4 sm:p-6 lg:p-8 pt-20">
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
                SOP 2 - Requisiciones - SLA's
              </span>
            </h1>
            <p className="text-gray-400">
              Canal único de materiales/servicios a través de compras
            </p>
          </div>
          <Link to="/sop2-requisiciones/slas/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg">
                <Plus size={20} />
                <span>Nueva Requisición</span>
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
                <p className="text-sm text-gray-400">Total Requisiciones</p>
                <p className="text-2xl font-bold text-white">{totalRequisiciones}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Clock className="text-orange-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Urgentes</p>
                <p className="text-2xl font-bold text-white">{urgentes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completadas</p>
                <p className="text-2xl font-bold text-white">{completadas}</p>
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
              placeholder="Buscar por folio, solicitante o descripción..."
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

        {/* Requisiciones List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((req) => (
            <motion.div key={req.id} variants={cardVariants}>
              <Link to={`/sop2-requisiciones/slas/${req.id}`}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-sm font-mono font-bold text-purple-400">{req.folio}</span>
                          {req.urgente && (
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold animate-pulse">
                              URGENTE
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                            {getStatusLabel(req.status)}
                          </span>
                          <div className={`w-3 h-3 rounded-full shadow-lg ${getSLAIndicator(req.sla)}`} title={`SLA: ${req.sla}`} />
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs">
                            {req.tipoCompra}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {req.descripcion}
                        </h3>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Solicitante: <span className="text-gray-300">{req.solicitante}</span></span>
                          <span>•</span>
                          <span>Depto: <span className="text-gray-300">{req.departamento}</span></span>
                          <span>•</span>
                          <span>Fecha: <span className="text-gray-300">{req.fechaSolicitud}</span></span>
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
            <p className="text-gray-500 text-lg">No se encontraron requisiciones</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}