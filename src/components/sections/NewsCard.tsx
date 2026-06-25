import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/types';
import { formatDate } from '@/lib/utils';

interface Props {
  news: NewsItem;
}

export default function NewsCard({ news }: Props) {
  const imageSrc = (!news.image || news.image.startsWith('/uploads/'))
    ? `https://picsum.photos/seed/${news.id}-news/600/400`
    : news.image;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(news.publishedAt)}
        </div>
        <h3 className="font-bold text-[#0c2461] text-base leading-tight mb-3 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
          {news.excerpt}
        </p>
        <Link
          href={`/news/${news.id}`}
          className="inline-flex items-center gap-1 text-[#22c55e] hover:text-[#16a34a] font-semibold text-sm transition-colors group"
        >
          Читать полностью
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
