'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import type { NewsItem } from '@/types';

const schema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
  excerpt: z.string().min(10, 'Краткое описание обязательно'),
  content: z.string().min(20, 'Содержимое статьи обязательно'),
  publishedAt: z.string().min(1, 'Укажите дату публикации'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initial?: Partial<NewsItem>;
  newsId?: string;
}

export default function NewsForm({ initial, newsId }: Props) {
  const router = useRouter();
  const [image, setImage] = useState(initial?.image || '');
  const [serverError, setServerError] = useState('');

  const defaultDate = initial?.publishedAt
    ? new Date(initial.publishedAt).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title || '',
      excerpt: initial?.excerpt || '',
      content: initial?.content || '',
      publishedAt: defaultDate,
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const payload = {
      ...data,
      image,
      publishedAt: new Date(data.publishedAt).toISOString(),
    };

    const url = newsId ? `/api/news/${newsId}` : '/api/news';
    const method = newsId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const json = await res.json();
      setServerError(json.error || 'Ошибка сохранения');
      return;
    }
    router.push('/admin/news');
    router.refresh();
  };

  const inputClass = (hasError?: string) =>
    `w-full px-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${
      hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-[#22c55e]'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Заголовок</label>
          <input
            {...register('title')}
            placeholder="Заголовок новости"
            className={inputClass(errors.title?.message)}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Дата публикации</label>
          <input
            type="date"
            {...register('publishedAt')}
            className={inputClass(errors.publishedAt?.message)}
          />
          {errors.publishedAt && <p className="text-red-500 text-xs mt-1">{errors.publishedAt.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Краткое описание</label>
          <textarea
            {...register('excerpt')}
            rows={2}
            placeholder="1-2 предложения для превью..."
            className={inputClass(errors.excerpt?.message) + ' resize-none'}
          />
          {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Содержание статьи</label>
          <textarea
            {...register('content')}
            rows={10}
            placeholder="Полный текст новости..."
            className={inputClass(errors.content?.message) + ' resize-none font-mono text-sm leading-relaxed'}
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        <ImageUpload value={image} onChange={setImage} label="Изображение статьи" />
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {serverError}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {isSubmitting ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </button>
        <Link
          href="/admin/news"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Отмена
        </Link>
      </div>
    </form>
  );
}
