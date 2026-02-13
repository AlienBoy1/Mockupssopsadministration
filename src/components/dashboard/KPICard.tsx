import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function KPICard({ title, value, icon: Icon, color, bgColor }: KPICardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)' }}
      className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={color} size={24} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </motion.div>
  );
}
