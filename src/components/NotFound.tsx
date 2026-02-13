import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={() => navigate(-1)}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F1419] border border-gray-800 text-white rounded-lg hover:bg-[#1A1F28] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Home size={20} />
            <span>Ir al Inicio</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
