import { motion } from 'motion/react';
import { Users, Shield, Settings, Database, Activity, FileText } from 'lucide-react';

export default function AdminPanel() {
  const sections = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios, roles y permisos',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
    },
    {
      title: 'Control de Permisos',
      description: 'Configurar accesos por módulo',
      icon: Shield,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20',
    },
    {
      title: 'Configuración del Sistema',
      description: 'Ajustes generales y preferencias',
      icon: Settings,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20',
    },
    {
      title: 'Base de Datos',
      description: 'Backup, restauración y mantenimiento',
      icon: Database,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/20',
    },
    {
      title: 'Logs de Actividad',
      description: 'Auditoría y monitoreo del sistema',
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-600/20',
    },
    {
      title: 'Reportes y Analíticas',
      description: 'Generación de reportes personalizados',
      icon: FileText,
      color: 'text-pink-400',
      bgColor: 'bg-pink-600/20',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Gestión completa del sistema y configuraciones
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-blue-400 font-semibold mb-1 text-sm sm:text-base">Sistema de Permisos Granular</h3>
              <p className="text-blue-300 text-xs sm:text-sm">
                Los permisos son configurables por módulo desde esta sección. No hay roles predefinidos hardcodeados en el sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Sections Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
              }}
              whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.15)' }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-gray-700 transition-all"
            >
              <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <section.icon className={section.color} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-gray-400">
                {section.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-1">Total de Usuarios</p>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-1">Sesiones Activas</p>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-1">Espacio Utilizado</p>
            <p className="text-3xl font-bold text-white">2.4 GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}