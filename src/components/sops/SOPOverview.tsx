import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, BarChart3 } from 'lucide-react';

interface SOPOverviewProps {
  sopNumber: string;
  sopTitle: string;
  sopSubtitle?: string;
  slaRoute: string;
  kpiRoute: string;
}

export default function SOPOverview({ sopNumber, sopTitle, sopSubtitle, slaRoute, kpiRoute }: SOPOverviewProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver al Menú Principal</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            {sopNumber}-{sopTitle}
          </h1>
          {sopSubtitle && (
            <p className="text-xl text-gray-400">{sopSubtitle}</p>
          )}
        </motion.div>

        {/* Main Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* SLA Button */}
          <motion.button
            onClick={() => navigate(slaRoute)}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl opacity-75 group-hover:opacity-100 blur transition-opacity duration-500" />
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-center shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              >
                <Clock className="text-white" size={40} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">SLA's</h2>
              <p className="text-white/80 text-sm">Service Level Agreements</p>
            </div>
          </motion.button>

          {/* KPI Button */}
          <motion.button
            onClick={() => navigate(kpiRoute)}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl opacity-75 group-hover:opacity-100 blur transition-opacity duration-500" />
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-center shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              >
                <BarChart3 className="text-white" size={40} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">KPI's</h2>
              <p className="text-white/80 text-sm">Key Performance Indicators</p>
            </div>
          </motion.button>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-blue-600/10 border border-blue-600/30 rounded-2xl backdrop-blur-sm"
        >
          <p className="text-center text-blue-300">
            Selecciona una opción para gestionar los Service Level Agreements o visualizar los Key Performance Indicators
          </p>
        </motion.div>
      </div>
    </div>
  );
}
