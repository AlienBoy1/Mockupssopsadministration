import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, FileDown, Headphones, AlertCircle, Clock, CheckCircle, Package } from 'lucide-react';

interface TicketSoporte {
  id: string;
  folio: string;
  cliente: string;
  tipo: 'Preventa' | 'Postventa' | 'Mantenimiento';
  severidad: 'S1' | 'S2' | 'S3';
  descripcion: string;
  status: 'pending' | 'inProgress' | 'waiting' | 'resolved' | 'closed';
  fechaCreacion: string;
  sla: 'verde' | 'amarillo' | 'rojo';
  tiempoRespuesta: string;
  asignadoA: string;
}

const MOCK_DATA: TicketSoporte[] = [
  {
    id: '1',
    folio: 'SRV-2024-001',
    cliente: 'TechCorp Industries',
    tipo: 'Postventa',
    severidad: 'S1',
    descripcion: 'Robot UR5e con error en controlador - Producción detenida',
    status: 'inProgress',
    fechaCreacion: '2024-02-13 08:30',
    sla: 'verde',
    tiempoRespuesta: '1.5h',
    asignadoA: 'Iván Ramírez',
  },
  {
    id: '2',
    folio: 'SRV-2024-002',
    cliente: 'Innovation Labs',
    tipo: 'Preventa',
    severidad: 'S2',
    descripcion: 'Asesoría técnica para integración de MiR con sistema WMS existente',
    status: 'waiting',
    fechaCreacion: '2024-02-12 14:20',
    sla: 'amarillo',
    tiempoRespuesta: '6h',
    asignadoA: 'Fidencio Martínez',
  },
  {
    id: '3',
    folio: 'SRV-2024-003',
    cliente: 'Future Systems',
    tipo: 'Mantenimiento',
    severidad: 'S3',
    descripcion: 'Mantenimiento preventivo programado - 3 robots UR5e',
    status: 'resolved',
    fechaCreacion: '2024-02-10 09:00',
    sla: 'verde',
    tiempoRespuesta: '24h',
    asignadoA: 'Ventas PM',
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

export default function SOP5Soporte() {
  const [tickets] = useState<TicketSoporte[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = tickets.filter(
    (t) =>
      t.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inProgress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'waiting':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      waiting: 'Esperando Cliente',
      resolved: 'Resuelto',
      closed: 'Cerrado',
    };
    return labels[status] || status;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'S1':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'S2':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'S3':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
  const totalTickets = filtered.length;
  const enProgreso = filtered.filter(t => t.status === 'inProgress').length;
  const resueltos = filtered.filter(t => t.status === 'resolved' || t.status === 'closed').length;

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
                SOP 5 - Soporte y Servicios
              </span>
            </h1>
            <p className="text-gray-400">
              Preventa, Postventa y Mantenimiento
            </p>
          </div>
          <Link to="/sop5-soporte/slas/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg">
                <Plus size={20} />
                <span>Nuevo Ticket</span>
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
                <p className="text-sm text-gray-400">Total Tickets</p>
                <p className="text-2xl font-bold text-white">{totalTickets}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="text-blue-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">En Progreso</p>
                <p className="text-2xl font-bold text-white">{enProgreso}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Resueltos</p>
                <p className="text-2xl font-bold text-white">{resueltos}</p>
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

        {/* Tickets List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((ticket) => (
            <motion.div key={ticket.id} variants={cardVariants}>
              <Link to={`/sop5-soporte/slas/${ticket.id}`}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-sm font-mono font-bold text-purple-400">{ticket.folio}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(ticket.severidad)}`}>
                            {ticket.severidad}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                            {getStatusLabel(ticket.status)}
                          </span>
                          <div className={`w-3 h-3 rounded-full shadow-lg ${getSLAIndicator(ticket.sla)}`} title={`SLA: ${ticket.sla}`} />
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs">
                            {ticket.tipo}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {ticket.descripcion}
                        </h3>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Cliente: <span className="text-gray-300">{ticket.cliente}</span></span>
                          <span>•</span>
                          <span>Asignado: <span className="text-gray-300">{ticket.asignadoA}</span></span>
                          <span>•</span>
                          <span>Tiempo: <span className="text-gray-300">{ticket.tiempoRespuesta}</span></span>
                          <span>•</span>
                          <span>Creado: <span className="text-gray-300">{ticket.fechaCreacion}</span></span>
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
            <p className="text-gray-500 text-lg">No se encontraron tickets</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}