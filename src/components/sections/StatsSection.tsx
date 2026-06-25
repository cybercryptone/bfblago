interface Props {
  totalDonations: number;
  totalDonors: number;
  closedCampaigns: number;
}

function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} млн ₽`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)} тыс. ₽`;
  }
  return `${amount} ₽`;
}

export default function StatsSection({ totalDonations, totalDonors, closedCampaigns }: Props) {
  const stats = [
    {
      value: formatCurrencyCompact(totalDonations),
      label: 'Собрано пожертвований',
      icon: '💰',
      description: 'Общая сумма всех пожертвований',
    },
    {
      value: `${totalDonors.toLocaleString('ru-RU')}+`,
      label: 'Благотворителей',
      icon: '🤝',
      description: 'Неравнодушных людей по всей России',
    },
    {
      value: closedCampaigns.toString(),
      label: 'Закрытых сборов',
      icon: '✅',
      description: 'Детей получили помощь благодаря вам',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white px-8 py-10 text-center hover:bg-slate-50 transition-colors"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-[#0c2461] mb-2">{stat.value}</div>
              <div className="text-slate-700 font-semibold mb-1">{stat.label}</div>
              <div className="text-slate-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
