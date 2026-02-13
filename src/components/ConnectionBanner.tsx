import { useConnection } from '../contexts/ConnectionContext';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ConnectionBanner() {
  const { isOnline } = useConnection();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--warning-600)] text-white overflow-hidden"
        >
          <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
            <WifiOff className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">
              Modo sin conexión — los cambios se sincronizarán al reconectarse
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
