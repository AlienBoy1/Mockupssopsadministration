import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Search, Filter, FileDown } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';
import { useConnection } from '../../contexts/ConnectionContext';
import { toast } from 'sonner@2.0.3';

interface Checklist {
  id: string;
  type: 'FAT' | 'SAT';
  projectName: string;
  status: 'draft' | 'inProgress' | 'completed';
  progress: number;
  date: string;
  lastSync: string | null;
}

const MOCK_CHECKLISTS: Checklist[] = [
  {
    id: 'CHK-001',
    type: 'FAT',
    projectName: 'Proyecto Alpha',
    status: 'completed',
    progress: 100,
    date: '2024-02-10',
    lastSync: '2024-02-10T15:30:00',
  },
  {
    id: 'CHK-002',
    type: 'SAT',
    projectName: 'Proyecto Beta',
    status: 'inProgress',
    progress: 65,
    date: '2024-02-12',
    lastSync: null,
  },
  {
    id: 'CHK-003',
    type: 'FAT',
    projectName: 'Proyecto Gamma',
    status: 'draft',
    progress: 0,
    date: '2024-02-13',
    lastSync: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Checklists() {
  const { t } = useI18n();
  const { isOnline } = useConnection();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load from localStorage or use mock data
    const stored = localStorage.getItem('htl_checklists');
    setChecklists(stored ? JSON.parse(stored) : MOCK_CHECKLISTS);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-600/20';
      case 'inProgress':
        return 'text-blue-400 bg-blue-600/20';
      default:
        return 'text-gray-400 bg-gray-600/20';
    }
  };

  const filteredChecklists = checklists.filter(
    (c) =>
      c.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast.success('Exportando checklists a Excel...');
    // Export functionality would go here
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('checklists.title')}
            </h1>
            <p className="text-gray-400">
              Gestiona tus checklists de FAT y SAT
            </p>
          </div>
          <Link to="/checklists/new">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>{t('checklists.new')}</span>
            </motion.button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0F1419] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-[#0F1419] border border-gray-800 rounded-lg text-gray-300 hover:bg-[#1A1F28] transition-colors">
            <Filter size={20} />
            <span>{t('common.filter')}</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-3 bg-[#0F1419] border border-gray-800 rounded-lg text-gray-300 hover:bg-[#1A1F28] transition-colors"
          >
            <FileDown size={20} />
            <span>{t('common.export')}</span>
          </button>
        </div>

        {/* Checklists Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredChecklists.map((checklist) => (
            <motion.div key={checklist.id} variants={cardVariants}>
              <Link to={`/checklists/${checklist.id}`}>
                <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 hover:border-blue-600/50 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-gray-400">
                          {checklist.id}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            checklist.type === 'FAT'
                              ? 'bg-purple-600/20 text-purple-400'
                              : 'bg-cyan-600/20 text-cyan-400'
                          }`}
                        >
                          {checklist.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {checklist.projectName}
                      </h3>
                    </div>
                    {!checklist.lastSync && !isOnline && (
                      <span className="text-xs text-orange-400 bg-orange-600/20 px-2 py-1 rounded">
                        Sin sync
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progreso</span>
                      <span className="text-sm font-medium text-white">
                        {checklist.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${checklist.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        checklist.status
                      )}`}
                    >
                      {t(`checklists.status.${checklist.status}`)}
                    </span>
                    <span className="text-sm text-gray-500">{checklist.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
