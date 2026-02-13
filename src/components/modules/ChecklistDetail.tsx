import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, CheckCircle, Circle, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useI18n } from '../../contexts/I18nContext';
import { useConnection } from '../../contexts/ConnectionContext';

interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  notes: string;
}

export default function ChecklistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { isOnline } = useConnection();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', description: 'Verificar voltaje de entrada (220V)', completed: true, notes: 'OK - 220.5V' },
    { id: '2', description: 'Inspección visual de componentes', completed: true, notes: 'Sin daños visibles' },
    { id: '3', description: 'Prueba de arranque en frío', completed: false, notes: '' },
    { id: '4', description: 'Verificar conexiones de seguridad', completed: false, notes: '' },
    { id: '5', description: 'Calibración de sensores', completed: false, notes: '' },
  ]);

  useEffect(() => {
    // Auto-save draft every 30 seconds
    const interval = setInterval(() => {
      const draft = { checklistId: id, items, timestamp: new Date().toISOString() };
      localStorage.setItem(`htl_draft_checklist_${id}`, JSON.stringify(draft));
    }, 30000);

    return () => clearInterval(interval);
  }, [id, items]);

  const toggleItem = (itemId: string) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const updateNotes = (itemId: string, notes: string) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, notes } : item
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem(`htl_checklist_${id}`, JSON.stringify(items));
    
    if (!isOnline) {
      const pending = parseInt(localStorage.getItem('htl_pending_sync') || '0', 10);
      localStorage.setItem('htl_pending_sync', String(pending + 1));
    }
    
    setLoading(false);
    toast.success(t('form.success'));
  };

  const progress = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/checklists')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">Checklist {id}</h1>
            <p className="text-gray-400">Proyecto Alpha - FAT</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{t('form.save')}</span>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progreso General</span>
            <span className="text-2xl font-bold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {item.completed ? (
                    <CheckCircle className="text-green-400" size={24} />
                  ) : (
                    <Circle className="text-gray-600" size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-lg mb-3 ${item.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {item.description}
                  </p>
                  <textarea
                    value={item.notes}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Agregar notas..."
                    className="w-full px-4 py-2 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
