interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

const colors = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
};

export default function StatsCard({ icon, label, value, description, color = 'blue' }: Props) {
  const c = colors[color];
  return (
    <div className={`bg-white rounded-2xl p-6 border ${c.border} shadow-sm`}>
      <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
        <div className={c.icon}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-[#0c2461] mb-1">{value}</p>
      <p className="text-slate-700 font-semibold text-sm mb-1">{label}</p>
      {description && <p className="text-slate-400 text-xs">{description}</p>}
    </div>
  );
}
