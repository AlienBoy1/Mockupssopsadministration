import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  es: {
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.logout': 'Cerrar sesión',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.sop1': 'SOP 1 - Cotizaciones',
    'nav.sop2': 'SOP 2 - Requisiciones',
    'nav.sop3': 'SOP 3 - Control Material',
    'nav.sop4': 'SOP 4 - Préstamo Demo',
    'nav.sop5': 'SOP 5 - Soporte y Servicios',
    'nav.admin': 'Administración',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido',
    'dashboard.kpi.pending': 'Pendientes',
    'dashboard.kpi.completed': 'Completados',
    'dashboard.kpi.inProgress': 'En Progreso',
    'dashboard.kpi.overdue': 'Fuera de SLA',
    
    // SOPs
    'sop1.title': 'Cotizaciones',
    'sop1.subtitle': 'Distribución, proyectos y componentes',
    'sop1.new': 'Nueva Cotización',
    'sop2.title': 'Requisiciones',
    'sop2.subtitle': 'Canal único de materiales/servicios',
    'sop2.new': 'Nueva Requisición',
    'sop3.title': 'Control de Material',
    'sop3.subtitle': 'Descarga a costo para proyectos',
    'sop3.new': 'Nueva Descarga',
    'sop4.title': 'Préstamo Demo',
    'sop4.subtitle': '4 UR5e, 1 MiR250 Shelf, 1 MiR100',
    'sop4.new': 'Nuevo Préstamo',
    'sop5.title': 'Soporte y Servicios',
    'sop5.subtitle': 'Preventa, postventa y mantenimientos',
    'sop5.new': 'Nuevo Ticket',
    
    // Status
    'status.draft': 'Borrador',
    'status.pending': 'Pendiente',
    'status.inProgress': 'En Progreso',
    'status.approved': 'Aprobado',
    'status.rejected': 'Rechazado',
    'status.completed': 'Completado',
    'status.blocked': 'Bloqueado',
    
    // Forms
    'form.save': 'Guardar',
    'form.cancel': 'Cancelar',
    'form.submit': 'Enviar',
    'form.required': 'Campo requerido',
    'form.success': 'Guardado exitosamente',
    
    // Connection
    'connection.offline': 'Modo sin conexión — los cambios se sincronizarán al reconectarse',
    'connection.online': 'Conexión restaurada',
    'connection.synced': 'registros sincronizados',
    
    // Common
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.export': 'Exportar',
    'common.date': 'Fecha',
    'common.status': 'Estado',
    'common.actions': 'Acciones',
    'common.loading': 'Cargando...',
    'common.sla': 'SLA',
    'common.kpi': 'KPI',
    'common.objective': 'Objetivo',
    'common.scope': 'Alcance',
  },
  en: {
    // Auth
    'auth.login': 'Log In',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.logout': 'Log Out',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.sop1': 'SOP 1 - Quotations',
    'nav.sop2': 'SOP 2 - Requisitions',
    'nav.sop3': 'SOP 3 - Material Control',
    'nav.sop4': 'SOP 4 - Demo Loan',
    'nav.sop5': 'SOP 5 - Support & Services',
    'nav.admin': 'Administration',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.kpi.pending': 'Pending',
    'dashboard.kpi.completed': 'Completed',
    'dashboard.kpi.inProgress': 'In Progress',
    'dashboard.kpi.overdue': 'Out of SLA',
    
    // SOPs
    'sop1.title': 'Quotations',
    'sop1.subtitle': 'Distribution, projects and components',
    'sop1.new': 'New Quotation',
    'sop2.title': 'Requisitions',
    'sop2.subtitle': 'Single channel for materials/services',
    'sop2.new': 'New Requisition',
    'sop3.title': 'Material Control',
    'sop3.subtitle': 'Cost discharge for projects',
    'sop3.new': 'New Discharge',
    'sop4.title': 'Demo Loan',
    'sop4.subtitle': '4 UR5e, 1 MiR250 Shelf, 1 MiR100',
    'sop4.new': 'New Loan',
    'sop5.title': 'Support & Services',
    'sop5.subtitle': 'Pre-sale, post-sale and maintenance',
    'sop5.new': 'New Ticket',
    
    // Status
    'status.draft': 'Draft',
    'status.pending': 'Pending',
    'status.inProgress': 'In Progress',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.completed': 'Completed',
    'status.blocked': 'Blocked',
    
    // Forms
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.submit': 'Submit',
    'form.required': 'Required field',
    'form.success': 'Saved successfully',
    
    // Connection
    'connection.offline': 'Offline mode — changes will sync when reconnected',
    'connection.online': 'Connection restored',
    'connection.synced': 'records synced',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.date': 'Date',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.loading': 'Loading...',
    'common.sla': 'SLA',
    'common.kpi': 'KPI',
    'common.objective': 'Objective',
    'common.scope': 'Scope',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
