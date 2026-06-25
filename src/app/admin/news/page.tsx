import Link from 'next/link';
import { Plus, Pencil, Calendar } from 'lucide-react';
import AdminPageLayout from '@/components/admin/AdminLayout';
import { newsRepository } from '@/lib/repositories';
import NewsActions from './NewsActions';

export default async function NewsListPage() {
  const news = await newsRepository.findAll();
  const sorted = [...news].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));

  return (
    <AdminPageLayout
      title="Новости"
      subtitle={`Всего: ${news.length} публикаций`}
      action={
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить новость
        </Link>
      }
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {sorted.map(item => (
            <div key={item.id} className="flex items-start gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-1 mb-2">{item.excerpt}</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.publishedAt)}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/news/${item.id}`}
                  target="_blank"
                  className="text-xs text-slate-500 hover:text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Просмотр
                </Link>
                <Link
                  href={`/admin/news/${item.id}/edit`}
                  className="flex items-center gap-1 text-[#0c2461] hover:text-[#1a3a8f] font-semibold text-xs border border-slate-200 hover:border-[#0c2461] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Изменить
                </Link>
                <NewsActions newsId={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageLayout>
  );
}
