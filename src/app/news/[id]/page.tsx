import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import { newsRepository } from '@/lib/repositories';
import { formatDate } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const news = await newsRepository.findById(id);
  if (!news) return { title: 'Не найдено' };
  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: [{ url: news.image || '/og-image.jpg' }],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await newsRepository.findById(id);
  if (!news) notFound();

  const imageSrc = (!news.image || news.image.startsWith('/uploads/'))
    ? `https://picsum.photos/seed/${news.id}-news/1200/600`
    : news.image;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0c2461] text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все новости
          </Link>

          <article>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
              <Calendar className="w-4 h-4" />
              {formatDate(news.publishedAt)}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0c2461] mb-6 leading-tight">
              {news.title}
            </h1>
            <div className="relative rounded-2xl overflow-hidden aspect-video mb-8 shadow-md">
              <Image
                src={imageSrc}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed mb-4 font-medium">{news.excerpt}</p>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
