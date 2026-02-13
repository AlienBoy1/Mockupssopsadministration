import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Package,
  Truck,
  ClipboardList,
  FolderOpen
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export function DashboardPage() {
  const kpis = [
    {
      label: 'Checklists Completados',
      value: '24',
      change: '+12%',
      icon: CheckCircle2,
      color: 'var(--success-500)',
    },
    {
      label: 'Pendientes de Revisión',
      value: '8',
      change: '-3%',
      icon: Clock,
      color: 'var(--warning-500)',
    },
    {
      label: 'Proyectos Activos',
      value: '15',
      change: '+5%',
      icon: FolderOpen,
      color: 'var(--primary-500)',
    },
    {
      label: 'Alertas Críticas',
      value: '2',
      change: '-50%',
      icon: AlertCircle,
      color: 'var(--error-500)',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'FAT/SAT',
      title: 'Checklist FAT completado - Proyecto Alpha',
      timestamp: 'Hace 2 horas',
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: 'F-SAP',
      title: 'Salida de material aprobada - Orden #1234',
      timestamp: 'Hace 4 horas',
      icon: Package,
    },
    {
      id: 3,
      type: 'F-DEM',
      title: 'Préstamo demo registrado - Cliente Beta',
      timestamp: 'Hace 6 horas',
      icon: Truck,
    },
    {
      id: 4,
      type: 'Traveler',
      title: 'Traveler de ensamble iniciado - SI-2024-001',
      timestamp: 'Hace 8 horas',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[var(--text-secondary)]">
          Bienvenido a HTL Operations Platform
        </p>
      </div>

      {/* KPIs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6 transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}20` }}
              >
                <kpi.icon
                  className="w-6 h-6"
                  style={{ color: kpi.color }}
                  aria-hidden="true"
                />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.change.startsWith('+') ? 'text-[var(--success-500)]' : 'text-[var(--error-500)]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{kpi.value}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Actividad Reciente</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-600)]/20 flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-5 h-5 text-[var(--primary-400)]" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-[var(--text-primary)] truncate">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{activity.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
