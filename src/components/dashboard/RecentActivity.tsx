import { CheckCircle, FileText, PackageOpen, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'checklist',
    title: 'Checklist FAT-2024-001 completado',
    time: 'Hace 2 horas',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    id: 2,
    type: 'form',
    title: 'Formulario F-SAP enviado para proyecto Alpha',
    time: 'Hace 4 horas',
    icon: FileText,
    color: 'text-blue-400',
  },
  {
    id: 3,
    type: 'material',
    title: 'Material Demo entregado - Cliente Beta Corp',
    time: 'Hace 6 horas',
    icon: PackageOpen,
    color: 'text-purple-400',
  },
  {
    id: 4,
    type: 'traveler',
    title: 'Traveler SI-2024-015 en progreso',
    time: 'Hace 1 día',
    icon: Clock,
    color: 'text-orange-400',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 bg-[#1A1F28] rounded-lg hover:bg-[#1F2530] transition-colors"
          >
            <div className={`p-2 rounded-lg bg-gray-800/50 ${activity.color}`}>
              <activity.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white mb-1">{activity.title}</p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
