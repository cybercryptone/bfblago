import type { NewsItem } from '@/types';
import NewsCard from './NewsCard';

interface Props {
  news: NewsItem[];
}

export default function NewsSection({ news }: Props) {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#0c2461]/10 text-[#0c2461] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Новости фонда
          </div>
          <h2 className="text-4xl font-bold text-[#0c2461] mb-4">
            Последние новости
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Следите за нашей работой и историями успеха подопечных фонда.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
