import Link from 'next/link';
import { Plus, Pencil, CheckCircle, XCircle } from 'lucide-react';
import AdminPageLayout from '@/components/admin/AdminLayout';
import { campaignRepository } from '@/lib/repositories';
import CampaignActions from './CampaignActions';

export default async function CampaignsListPage() {
  const campaigns = await campaignRepository.findAll();

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

  return (
    <AdminPageLayout
      title="Сборы"
      subtitle={`Всего: ${campaigns.length} сборов`}
      action={
        <Link
          href="/admin/campaigns/new"
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новый сбор
        </Link>
      }
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3.5 font-semibold text-slate-600">Ребёнок</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600">Город</th>
                <th className="text-right px-4 py-3.5 font-semibold text-slate-600">Цель</th>
                <th className="text-right px-4 py-3.5 font-semibold text-slate-600">Собрано</th>
                <th className="text-center px-4 py-3.5 font-semibold text-slate-600">%</th>
                <th className="text-center px-4 py-3.5 font-semibold text-slate-600">Статус</th>
                <th className="text-right px-6 py-3.5 font-semibold text-slate-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((c: { id: string; name: string; age: number; city: string; goalAmount: number; collectedAmount: number; isClosed: boolean }) => {
                const pct = Math.min(Math.round((c.collectedAmount / c.goalAmount) * 100), 100);
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-slate-400 text-xs">{c.age} лет</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{c.city}</td>
                    <td className="px-4 py-4 text-right text-slate-700 font-medium">{formatCurrency(c.goalAmount)}</td>
                    <td className="px-4 py-4 text-right font-bold text-[#0c2461]">{formatCurrency(c.collectedAmount)}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-bold ${pct >= 100 ? 'text-green-600' : pct >= 50 ? 'text-blue-600' : 'text-slate-600'}`}>
                        {pct}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {c.isClosed ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Закрыт
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Активен
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/campaigns/${c.id}/edit`}
                          className="flex items-center gap-1.5 text-[#0c2461] hover:text-[#1a3a8f] font-semibold text-xs border border-slate-200 hover:border-[#0c2461] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Изменить
                        </Link>
                        <CampaignActions campaignId={c.id} isClosed={c.isClosed} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageLayout>
  );
}
