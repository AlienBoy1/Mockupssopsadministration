import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function SOP1KPIs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-4 sm:p-6 lg:p-8 pt-20">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/sop1-cotizaciones')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Volver a SOP 1-Cotizaciones (distribución, proyectos y compuestos)</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              SOP 1-Cotizaciones (distribución, proyectos y compuestos) - KPI's
            </span>
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <p className="text-gray-500 text-base sm:text-lg mb-4">Contenido de KPI's próximamente...</p>
            <p className="text-gray-400 text-sm">
              Aquí se mostrarán los Key Performance Indicators para este SOP
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}