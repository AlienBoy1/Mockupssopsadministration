import { motion } from 'motion/react';
import { FileText, ShoppingCart, Package, Laptop, Headphones, FolderKanban, Wrench, Settings as SettingsIcon, Rocket, BarChart3, Package2, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { Link } from 'react-router';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0.0, 0.2, 1]
    } 
  },
};

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useI18n();

  const sops = [
    {
      id: 'sop1',
      path: '/sop1-cotizaciones',
      title: 'SOP 1-Cotizaciones',
      subtitle: '(distribución, proyectos y compuestos)',
      icon: FileText,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 5, inProgress: 3, completed: 12 },
    },
    {
      id: 'sop2',
      path: '/sop2-requisiciones',
      title: 'SOP 2-Requisiciones',
      subtitle: '',
      icon: ShoppingCart,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 8, inProgress: 2, completed: 24 },
    },
    {
      id: 'sop3',
      path: '/sop3-control-material',
      title: 'SOP 3-Control de materiales para proyecto',
      subtitle: '',
      icon: Package,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 3, inProgress: 5, completed: 18 },
    },
    {
      id: 'sop4',
      path: '/sop4-prestamo-demo',
      title: 'SOP 4-Préstamo de equipo',
      subtitle: '',
      icon: Laptop,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 2, inProgress: 1, completed: 7 },
    },
    {
      id: 'sop5',
      path: '/sop5-soporte',
      title: 'SOP 5-Soporte de servicios',
      subtitle: '',
      icon: Headphones,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 6, inProgress: 4, completed: 31 },
    },
    {
      id: 'sop6',
      path: '/sop6-ciclo-proyectos',
      title: 'SOP 6-Ciclo de proyectos',
      subtitle: '',
      icon: FolderKanban,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 4, inProgress: 6, completed: 15 },
    },
    {
      id: 'sop7',
      path: '/sop7-fabricacion',
      title: 'SOP 7-Fabricación de partes con proveedores',
      subtitle: '',
      icon: Wrench,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 2, inProgress: 3, completed: 9 },
    },
    {
      id: 'sop8',
      path: '/sop8-ensamble',
      title: 'SOP 8-Ensamble en systems integration',
      subtitle: '',
      icon: SettingsIcon,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 3, inProgress: 2, completed: 11 },
    },
    {
      id: 'sop9',
      path: '/sop9-commissioning',
      title: 'SOP 9-Puesta en marcha (Commissioning)',
      subtitle: '',
      icon: Rocket,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 1, inProgress: 4, completed: 8 },
    },
    {
      id: 'sop10',
      path: '/sop10-diseno',
      title: 'SOP 10-Diseño',
      subtitle: '',
      icon: Package2,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 5, inProgress: 3, completed: 14 },
    },
    {
      id: 'sop11',
      path: '/sop11-ventas',
      title: 'SOP 11-Ventas',
      subtitle: '',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 7, inProgress: 5, completed: 22 },
    },
    {
      id: 'sop12',
      path: '/sop12-trafico',
      title: 'SOP 12-Tráfico y logística',
      subtitle: '',
      icon: Package,
      gradient: 'from-orange-500 to-red-600',
      stats: { pending: 4, inProgress: 2, completed: 19 },
    },
  ];

  const globalKpis = [
    {
      title: 'Total Pendientes',
      value: 50,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/10',
      borderColor: 'border-orange-600/30',
    },
    {
      title: 'En Progreso',
      value: 40,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/10',
      borderColor: 'border-blue-600/30',
    },
    {
      title: 'Completados (mes)',
      value: 190,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-600/10',
      borderColor: 'border-green-600/30',
    },
    {
      title: 'Fuera de SLA',
      value: 3,
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-600/10',
      borderColor: 'border-red-600/30',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with improved animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="mb-8 lg:mb-10 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              HTL Electronics
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">Tablero de medición</p>
          <p className="text-sm text-gray-500 mt-2">
            {t('dashboard.welcome')}, {user?.name}
          </p>
        </motion.div>

        {/* Global KPIs with enhanced animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 lg:mb-10"
        >
          {globalKpis.map((kpi, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
              }}
              className={`${kpi.bgColor} border ${kpi.borderColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${kpi.bgColor} border ${kpi.borderColor}`}>
                  <kpi.icon className={kpi.color} size={20} />
                </div>
              </div>
              <div>
                <motion.p 
                  className="text-2xl sm:text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {kpi.value}
                </motion.p>
                <p className="text-xs sm:text-sm text-gray-400">{kpi.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SOPs Grid - More prominent cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sops.map((sop) => (
            <motion.div
              key={sop.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
              }}
            >
              <Link to={sop.path}>
                <div className="relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 animate-pulse" />
                  
                  {/* Main card with glassmorphism */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-orange-500/50 transition-all duration-300 shadow-2xl">
                    {/* Icon with gradient background */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${sop.gradient} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                      <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${sop.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <sop.icon className="text-white" size={32} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {sop.title}
                    </h3>
                    {sop.subtitle && (
                      <p className="text-xs text-gray-400 mb-4 leading-relaxed">{sop.subtitle}</p>
                    )}
                    
                    {/* Stats preview with improved design */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50" />
                        <span className="text-sm font-semibold text-gray-300">{sop.stats.pending}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50" />
                        <span className="text-sm font-semibold text-gray-300">{sop.stats.inProgress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/50" />
                        <span className="text-sm font-semibold text-gray-300">{sop.stats.completed}</span>
                      </div>
                    </div>

                    {/* Hover arrow indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA with improved design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative group w-full sm:w-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
            <div className="relative px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-semibold text-white shadow-2xl text-sm sm:text-base">
              Seguimiento y medición del cumplimiento del SLA (Global)
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}