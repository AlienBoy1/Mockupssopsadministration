import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Package,
  Laptop,
  Headphones,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { useConnection } from '../../contexts/ConnectionContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const { t, language, setLanguage } = useI18n();
  const { isOnline } = useConnection();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard'), end: true },
    { path: '/sop1-cotizaciones', icon: FileText, label: 'SOP 1', badge: 'Cotizaciones' },
    { path: '/sop2-requisiciones', icon: ShoppingCart, label: 'SOP 2', badge: 'Requisiciones' },
    { path: '/sop3-control-material', icon: Package, label: 'SOP 3', badge: 'Material' },
    { path: '/sop4-prestamo-demo', icon: Laptop, label: 'SOP 4', badge: 'Demo' },
    { path: '/sop5-soporte', icon: Headphones, label: 'SOP 5', badge: 'Soporte' },
    { path: '/admin', icon: Settings, label: t('nav.admin') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#0F1419]/95 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:bg-red-600 transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0F1419] border-r border-gray-800 flex flex-col shadow-2xl"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-800 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">HTL Electronics</h1>
              <p className="text-xs text-gray-400 leading-tight">Operations</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:bg-[#1A1F28] hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block">{item.label}</span>
                {item.badge && (
                  <span className="text-xs text-gray-500 block truncate">{item.badge}</span>
                )}
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          {/* User Info */}
          <div className="px-3 py-2 bg-[#1A1F28] rounded-lg">
            <p className="text-sm text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1A1F28] hover:text-white transition-colors"
          >
            <Globe size={18} />
            <span className="text-sm">{language.toUpperCase()}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">{t('auth.logout')}</span>
          </button>

          {/* Connection Status */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
              }`}
            />
            <span className="text-xs text-gray-500">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}