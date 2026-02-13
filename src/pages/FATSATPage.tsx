import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useConnection } from '../contexts/ConnectionContext';

interface Checklist {
  id: string;
  projectName: string;
  type: 'FAT' | 'SAT';
  status: 'completed' | 'in-progress' | 'pending';
  createdAt: string;
  completedAt?: string;
  items: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  description: string;
  checked: boolean;
  notes?: string;
}

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

export function FATSATPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'FAT' | 'SAT'>('all');
  const { isOnline } = useConnection();

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = () => {
    const saved = localStorage.getItem('htl_checklists');
    if (saved) {
      setChecklists(JSON.parse(saved));
    } else {
      // Mock data
      const mockData: Checklist[] = [
        {
          id: '1',
          projectName: 'Proyecto Alpha',
          type: 'FAT',
          status: 'completed',
          createdAt: '2024-02-10T10:00:00Z',
          completedAt: '2024-02-12T15:30:00Z',
          items: [
            { id: '1-1', description: 'Verificación de especificaciones técnicas', checked: true },
            { id: '1-2', description: 'Prueba de funcionalidad principal', checked: true },
            { id: '1-3', description: 'Revisión de documentación', checked: true },
          ],
        },
        {
          id: '2',
          projectName: 'Proyecto Beta',
          type: 'SAT',
          status: 'in-progress',
          createdAt: '2024-02-11T09:00:00Z',
          items: [
            { id: '2-1', description: 'Instalación en sitio', checked: true },
            { id: '2-2', description: 'Configuración de red', checked: true },
            { id: '2-3', description: 'Pruebas de integración', checked: false },
            { id: '2-4', description: 'Capacitación al cliente', checked: false },
          ],
        },
        {
          id: '3',
          projectName: 'Proyecto Gamma',
          type: 'FAT',
          status: 'pending',
          createdAt: '2024-02-13T08:00:00Z',
          items: [
            { id: '3-1', description: 'Inspección visual de componentes', checked: false },
            { id: '3-2', description: 'Prueba de voltaje', checked: false },
            { id: '3-3', description: 'Prueba de corriente', checked: false },
          ],
        },
      ];
      setChecklists(mockData);
      saveChecklists(mockData);
    }
  };

  const saveChecklists = (data: Checklist[]) => {
    localStorage.setItem('htl_checklists', JSON.stringify(data));
    
    if (!isOnline) {
      localStorage.setItem('pending_sync_checklists', JSON.stringify(data));
    }
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    const updated = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        const items = checklist.items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        const allChecked = items.every(item => item.checked);
        return {
          ...checklist,
          items,
          status: allChecked ? 'completed' : 'in-progress',
          completedAt: allChecked ? new Date().toISOString() : undefined,
        } as Checklist;
      }
      return checklist;
    });
    
    setChecklists(updated);
    saveChecklists(updated);
    toast.success('Checklist actualizado');
  };

  const exportPDF = (checklist: Checklist) => {
    // Simulate PDF export
    toast.success(`PDF generado: ${checklist.projectName} - ${checklist.type}`);
  };

  const filteredChecklists = checklists.filter(c => {
    const matchesSearch = c.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: Checklist['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-[var(--success-500)]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[var(--warning-500)]" />;
      case 'pending':
        return <XCircle className="w-5 h-5 text-[var(--text-tertiary)]" />;
    }
  };

  const getStatusLabel = (status: Checklist['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'pending':
        return 'Pendiente';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Checklists FAT/SAT</h1>
        <p className="text-[var(--text-secondary)]">
          Gestión de checklists de pruebas de aceptación en fábrica y sitio
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por proyecto..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20 transition-colors"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'FAT', 'SAT'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-[var(--primary-600)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-primary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>

        {/* New Checklist */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-medium rounded-lg transition-colors"
          onClick={() => toast.info('Función de crear checklist próximamente')}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nuevo</span>
        </button>
      </div>

      {/* Checklists */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredChecklists.map((checklist) => (
          <motion.div
            key={checklist.id}
            variants={cardVariants}
            className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{checklist.projectName}</h3>
                  <span className="px-2.5 py-1 bg-[var(--primary-600)]/20 text-[var(--primary-400)] text-sm font-medium rounded-md">
                    {checklist.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  {getStatusIcon(checklist.status)}
                  <span>{getStatusLabel(checklist.status)}</span>
                  <span>•</span>
                  <span>Creado: {new Date(checklist.createdAt).toLocaleDateString()}</span>
                  {checklist.completedAt && (
                    <>
                      <span>•</span>
                      <span>Completado: {new Date(checklist.completedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => exportPDF(checklist)}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
                aria-label="Exportar PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {checklist.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)]"
                >
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.checked}
                    onChange={() => toggleItem(checklist.id, item.id)}
                    className="mt-0.5 w-5 h-5 rounded border-[var(--border-primary)] text-[var(--primary-600)] focus:ring-2 focus:ring-[var(--primary-400)]/20 transition-colors cursor-pointer"
                  />
                  <label
                    htmlFor={item.id}
                    className={`flex-1 text-sm cursor-pointer transition-colors ${
                      item.checked
                        ? 'text-[var(--text-secondary)] line-through'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {item.description}
                  </label>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-4 pt-4 border-t border-[var(--border-secondary)]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[var(--text-secondary)]">Progreso</span>
                <span className="text-[var(--text-primary)] font-medium">
                  {checklist.items.filter(i => i.checked).length} / {checklist.items.length}
                </span>
              </div>
              <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary-600)] transition-all duration-300"
                  style={{
                    width: `${(checklist.items.filter(i => i.checked).length / checklist.items.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {filteredChecklists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)]">No se encontraron checklists</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
