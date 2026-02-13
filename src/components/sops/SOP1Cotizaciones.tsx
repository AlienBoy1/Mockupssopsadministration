import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, FileDown, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

interface Cotizacion {
  id: string;
  folio: string;
  cliente: string;
  tipo: 'Inside Sales' | 'Field Sales' | 'Brand Leader' | 'PM';
  descripcion: string;
  status: 'draft' | 'pending' | 'inProgress' | 'approved' | 'rejected';
  monto: number;
  fechaSolicitud: string;
  sla: 'verde' | 'amarillo' | 'rojo';
  iteraciones: number;
}

const MOCK_DATA: Cotizacion[] = [
  {
    id: '1',
    folio: 'COT-2024-001',
    cliente: 'TechCorp Industries',
    tipo: 'Inside Sales',
    descripcion: 'Cotización para sistema de automatización - 3 robots colaborativos UR5e',
    status: 'inProgress',
    monto: 125000,
    fechaSolicitud: '2024-02-10',
    sla: 'verde',
    iteraciones: 1,
  },
  {
    id: '2',
    folio: 'COT-2024-002',
    cliente: 'Innovation Labs',
    tipo: 'Field Sales',
    descripcion: 'Proyecto integral - AGV MiR250 + estación de carga',
    status: 'pending',
    monto: 89500,
    fechaSolicitud: '2024-02-12',
    sla: 'amarillo',
    iteraciones: 2,
  },
  {
    id: '3',
    folio: 'COT-2024-003',
    cliente: 'Future Systems',
    tipo: 'PM',
    descripcion: 'Componentes varios para proyecto Alpha - sensores y accesorios',
    status: 'approved',
    monto: 15200,
    fechaSolicitud: '2024-02-08',
    sla: 'verde',
    iteraciones: 0,
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

export default function SOP1Cotizaciones() {
  const { t } = useI18n();
  const [cotizaciones] = useState<Cotizacion[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = cotizaciones.filter(
    (c) =>
      c.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inProgress':
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
      pending: 'Pendiente',
      inProgress: 'En Proceso',
      approved: 'Aprobada',
      rejected: 'Rechazada',
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

  // Calculate totals
  const totalMonto = filtered.reduce((sum, c) => sum + c.monto, 0);
  const avgIteraciones = filtered.length > 0 
    ? (filtered.reduce((sum, c) => sum + c.iteraciones, 0) / filtered.length).toFixed(1)
    : 0;

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
                SOP 1 - Cotizaciones - SLA's
              </span>
            </h1>
            <p className="text-gray-400">
              Distribución, proyectos y componentes
            </p>
          </div>
          <Link to="/sop1-cotizaciones/slas/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg">
                <Plus size={20} />
                <span>Nueva Cotización</span>
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
              <div className="p-3 bg-green-500/20 rounded-xl">
                <DollarSign className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold text-white">
                  ${totalMonto.toLocaleString('es-MX')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="text-blue-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Cotizaciones</p>
                <p className="text-2xl font-bold text-white">{filtered.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <TrendingUp className="text-orange-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Promedio Iteraciones</p>
                <p className="text-2xl font-bold text-white">{avgIteraciones}</p>
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
              placeholder="Buscar por folio, cliente o descripción..."
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

        {/* Cotizaciones List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((cot) => (
            <motion.div key={cot.id} variants={cardVariants}>
              <Link to={`/sop1-cotizaciones/slas/${cot.id}`}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-sm font-mono font-bold text-orange-400">{cot.folio}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cot.status)}`}>
                            {getStatusLabel(cot.status)}
                          </span>
                          <div className={`w-3 h-3 rounded-full shadow-lg ${getSLAIndicator(cot.sla)}`} title={`SLA: ${cot.sla}`} />
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs">
                            {cot.tipo}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {cot.cliente}
                        </h3>
                        
                        <p className="text-sm text-gray-400 mb-4">{cot.descripcion}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Fecha: <span className="text-gray-300">{cot.fechaSolicitud}</span></span>
                          <span>•</span>
                          <span>Iteraciones: <span className="text-gray-300">{cot.iteraciones}</span></span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                          ${cot.monto.toLocaleString('es-MX')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">MXN</p>
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
            <p className="text-gray-500 text-lg">No se encontraron cotizaciones</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}