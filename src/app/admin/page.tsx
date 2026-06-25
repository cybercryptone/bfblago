import Link from 'next/link';
import { Megaphone, Newspaper, CheckCircle, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import AdminPageLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import { campaignRepository, newsRepository, donationRepository } from '@/lib/repositories';

export default async function AdminDashboard() {
  const [campaigns, news, totalAmount, totalDonors] = await Promise.all([
    campaignRepository.findAll(),
    newsRepository.findAll(),
    donationRepository.getTotalAmount(),
    donationRepository.getTotalDonors(),
  ]);

  const closedCampaigns = campaigns.filter((c: { isClosed: boolean }) => c.isClosed).length;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

  const recentCampaigns = campaigns.slice(0, 5);

  return (
    <AdminPageLayout title="Дашборд" subtitle="Обзор основных показателей фонда">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatsCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Сумма пожертвований"
          value={formatCurrency(totalAmount)}
          description="Все успешные платежи"
          color="green"
        />
        <StatsCard
          icon={<Megaphone className="w-6 h-6" />}
          label="Всего сборов"
          value={campaigns.length}
          description={`${closedCampaigns} закрытых`}
          color="blue"
        />
        <StatsCard
          icon={<CheckCircle className="w-6 h-6" />}
          label="Закрытых сборов"
          value={closedCampaigns}
          description="Помощь оказана"
          color="orange"
        />
        <StatsCard
          icon={<Newspaper className="w-6 h-6" />}
          label="Новостей"
          value={news.length}
          description="Публикаций на сайте"
          color="purple"
        />
      </div>

      {/* Quick actions + Recent campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent campaigns */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-[#0c2461]">Последние сборы</h2>
            <Link href="/admin/campaigns" className="text-[#22c55e] hover:text-[#16a34a] text-sm font-semibold flex items-center gap-1">
              Все сборы <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentCampaigns.map((c: { id: string; name: string; city: string; age: number; collectedAmount: number; goalAmount: number; isClosed: boolean }) => {
              const pct = Math.min(Math.round((c.collectedAmount / c.goalAmount) * 100), 100);
              return (
                <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{c.name}</p>
                    <p className="text-slate-400 text-xs">{c.city} · {c.age} лет</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#0c2461]">{pct}%</p>
                    <p className="text-xs text-slate-400">
                      {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(c.collectedAmount)}
                    </p>
                  </div>
                  {c.isClosed && (
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full shrink-0">Закрыт</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-[#0c2461] mb-4">Быстрые действия</h2>
            <div className="space-y-3">
              <Link
                href="/admin/campaigns/new"
                className="flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Создать сбор
              </Link>
              <Link
                href="/admin/news/new"
                className="flex items-center gap-3 bg-[#0c2461] hover:bg-[#1a3a8f] text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Добавить новость
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 border-2 border-slate-200 hover:border-[#0c2461] text-slate-700 hover:text-[#0c2461] font-semibold px-4 py-3 rounded-xl text-sm transition-colors"
              >
                Настройки сайта
              </Link>
            </div>
          </div>

          <div className="bg-[#0c2461] rounded-2xl p-6 text-white">
            <p className="font-bold mb-1">Итого собрано</p>
            <p className="text-3xl font-bold text-[#22c55e]">{formatCurrency(totalAmount)}</p>
            <p className="text-slate-300 text-sm mt-2">от {totalDonors} жертвователей</p>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
