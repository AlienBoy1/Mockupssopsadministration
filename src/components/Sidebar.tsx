import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Package, 
  Truck, 
  ClipboardList,
  FolderOpen,
  Settings,
  X
} from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { useConnection } from '../contexts/ConnectionContext';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useI18n();
  const { isAdmin } = useAuth();
  const { isOnline } = useConnection();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/fat-sat', icon: CheckSquare, label: t('nav.fatsat') },
    { to: '/f-sap', icon: Package, label: t('nav.fsap') },
    { to: '/f-dem', icon: Truck, label: t('nav.fdem') },
    { to: '/traveler', icon: ClipboardList, label: t('nav.traveler') },
    { to: '/projects', icon: FolderOpen, label: t('nav.projects') },
  ];

  if (isAdmin) {
    navItems.push({ to: '/admin', icon: Settings, label: t('nav.admin') });
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 h-screen w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] z-50 flex flex-col lg:translate-x-0"
        style={{ transform: isOpen ? 'translateX(0)' : undefined }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-primary)]">
          <div>
            <h1 className="text-lg font-bold text-white">HTL Operations</h1>
            <p className="text-xs text-[var(--text-secondary)]">Ops Platform</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[var(--primary-600)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer - Connection Status */}
        <div className="p-4 border-t border-[var(--border-primary)]">
          <div className="flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-[var(--success-500)]' : 'bg-[var(--warning-500)] animate-pulse'
              }`}
              aria-hidden="true"
            />
            <span className="text-[var(--text-secondary)]">
              {isOnline ? t('status.online') : t('status.offline')}
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
