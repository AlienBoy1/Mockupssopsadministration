import { Menu, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-4 lg:px-8 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
          aria-label="Toggle language"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase font-medium">{language}</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{user?.role}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-[var(--primary-600)] flex items-center justify-center text-white font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--error-500)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
          aria-label={t('auth.logout')}
          title={t('auth.logout')}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
