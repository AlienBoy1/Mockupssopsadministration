import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, FileDown, Laptop, Calendar, CheckCircle, Package } from 'lucide-react';

interface PrestamoDemo {
  id: string;
  folio: string;
  cliente: string;
  vendedor: string;
  equipo: 'UR5e' | 'MiR250 Shelf' | 'MiR100';
  cantidad: number;
  status: 'pending' | 'approved' | 'delivered' | 'returned' | 'delayed';
  fechaSalida: string;
  fechaRetornoEsperada: string;
  sla: 'verde' | 'amarillo' | 'rojo';
  checklistAntes: boolean;
  checklistDespues: boolean;
}

const MOCK_DATA: PrestamoDemo[] = [
  {
    id: '1',
    folio: 'DEMO-2024-001',
    cliente: 'TechCorp Industries',
    vendedor: 'Juan Rodríguez',
    equipo: 'UR5e',
    cantidad: 1,
    status: 'delivered',
    fechaSalida: '2024-02-05',
    fechaRetornoEsperada: '2024-02-19',
    sla: 'verde',
    checklistAntes: true,
    checklistDespues: false,
  },
  {
    id: '2',
    folio: 'DEMO-2024-002',
    cliente: 'Innovation Labs',
    vendedor: 'María González',
    equipo: 'MiR250 Shelf',
    cantidad: 1,
    status: 'approved',
    fechaSalida: '2024-02-15',
    fechaRetornoEsperada: '2024-03-01',
    sla: 'verde',
    checklistAntes: false,
    checklistDespues: false,
  },
  {
    id: '3',
    folio: 'DEMO-2024-003',
    cliente: 'Future Systems',
    vendedor: 'Pedro Martínez',
    equipo: 'UR5e',
    cantidad: 2,
    status: 'returned',
    fechaSalida: '2024-01-20',
    fechaRetornoEsperada: '2024-02-03',
    sla: 'verde',
    checklistAntes: true,
    checklistDespues: true,
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

export default function SOP4PrestamoDemo() {
  const [prestamos] = useState<PrestamoDemo[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = prestamos.filter(
    (p) =>
      p.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'returned':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'delivered':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'approved':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delayed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendiente Validación',
      approved: 'Aprobado - Pendiente Entrega',
      delivered: 'Entregado',
      returned: 'Devuelto',
      delayed: 'Atrasado',
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

  // Inventory status
  const inventory = {
    UR5e: { total: 4, available: 2, onLoan: 2 },
    MiR250: { total: 1, available: 0, onLoan: 1 },
    MiR100: { total: 1, available: 1, onLoan: 0 },
  };

  // Calculate stats
  const totalPrestamos = filtered.length;
  const activos = filtered.filter(p => p.status === 'delivered').length;
  const devueltos = filtered.filter(p => p.status === 'returned').length;

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
                SOP 4 - Préstamo de Equipos Demo
              </span>
            </h1>
            <p className="text-gray-400">
              4 UR5e, 1 MiR250 Shelf, 1 MiR100
            </p>
          </div>
          <Link to="/sop4-prestamo-demo/slas/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg">
                <Plus size={20} />
                <span>Nuevo Préstamo</span>
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
                <p className="text-sm text-gray-400">Total Préstamos</p>
                <p className="text-2xl font-bold text-white">{totalPrestamos}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Laptop className="text-blue-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Activos</p>
                <p className="text-2xl font-bold text-white">{activos}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Devueltos</p>
                <p className="text-2xl font-bold text-white">{devueltos}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inventory Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Laptop className="text-orange-400" size={24} />
                <span className="font-semibold text-orange-300">UR5e</span>
              </div>
              <span className="text-xs text-orange-400 font-medium">4 total</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-green-400">{inventory.UR5e.available}</p>
                <p className="text-xs text-gray-400 mt-1">Disponibles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">{inventory.UR5e.onLoan}</p>
                <p className="text-xs text-gray-400 mt-1">En préstamo</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Laptop className="text-orange-400" size={24} />
                <span className="font-semibold text-orange-300">MiR250 Shelf</span>
              </div>
              <span className="text-xs text-orange-400 font-medium">1 total</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-500">{inventory.MiR250.available}</p>
                <p className="text-xs text-gray-400 mt-1">Disponibles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">{inventory.MiR250.onLoan}</p>
                <p className="text-xs text-gray-400 mt-1">En préstamo</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Laptop className="text-orange-400" size={24} />
                <span className="font-semibold text-orange-300">MiR100</span>
              </div>
              <span className="text-xs text-orange-400 font-medium">1 total</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-green-400">{inventory.MiR100.available}</p>
                <p className="text-xs text-gray-400 mt-1">Disponibles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-500">{inventory.MiR100.onLoan}</p>
                <p className="text-xs text-gray-400 mt-1">En préstamo</p>
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
              placeholder="Buscar por folio, cliente o vendedor..."
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

        {/* Préstamos List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((prest) => (
            <motion.div key={prest.id} variants={cardVariants}>
              <Link to={`/sop4-prestamo-demo/slas/${prest.id}`}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-sm font-mono font-bold text-purple-400">{prest.folio}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prest.status)}`}>
                            {getStatusLabel(prest.status)}
                          </span>
                          <div className={`w-3 h-3 rounded-full shadow-lg ${getSLAIndicator(prest.sla)}`} title={`SLA: ${prest.sla}`} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-3">
                          {prest.cliente}
                        </h3>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <span>Equipo: <span className="text-gray-300">{prest.equipo} x{prest.cantidad}</span></span>
                          <span>•</span>
                          <span>Vendedor: <span className="text-gray-300">{prest.vendedor}</span></span>
                          <span>•</span>
                          <span>Salida: <span className="text-gray-300">{prest.fechaSalida}</span></span>
                          <span>•</span>
                          <span>Retorno: <span className="text-gray-300">{prest.fechaRetornoEsperada}</span></span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full shadow-lg ${prest.checklistAntes ? 'bg-green-500 shadow-green-500/50' : 'bg-gray-600'}`} />
                            <span className="text-xs text-gray-400">Checklist Antes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full shadow-lg ${prest.checklistDespues ? 'bg-green-500 shadow-green-500/50' : 'bg-gray-600'}`} />
                            <span className="text-xs text-gray-400">Checklist Después</span>
                          </div>
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
            <p className="text-gray-500 text-lg">No se encontraron préstamos</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}