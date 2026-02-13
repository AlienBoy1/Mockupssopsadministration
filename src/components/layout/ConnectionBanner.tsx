import { motion, AnimatePresence } from 'motion/react';
import { WifiOff } from 'lucide-react';
import { useConnection } from '../../contexts/ConnectionContext';
import { useI18n } from '../../contexts/I18nContext';

export default function ConnectionBanner() {
  const { isOnline } = useConnection();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="bg-orange-600/20 border-b border-orange-600/30 px-4 py-2"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-orange-300">
            <WifiOff size={16} />
            <span>{t('connection.offline')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
