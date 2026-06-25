'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Save, Globe, Phone } from 'lucide-react';
import type { Settings } from '@/types';

const flatSchema = z.object({
  foundationName: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(1, 'Обязательное поле'),
  address: z.string().min(1, 'Обязательное поле'),
  vk: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  seoTitle: z.string().min(1, 'Обязательное поле'),
  seoDescription: z.string().min(1, 'Обязательное поле'),
  seoKeywords: z.string().optional(),
});

type FormData = z.infer<typeof flatSchema>;

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(flatSchema),
    defaultValues: {
      foundationName: initial.foundationName,
      description: initial.description,
      email: initial.email,
      phone: initial.phone,
      address: initial.address,
      vk: initial.social.vk,
      telegram: initial.social.telegram,
      instagram: initial.social.instagram,
      youtube: initial.social.youtube,
      seoTitle: initial.seo.title,
      seoDescription: initial.seo.description,
      seoKeywords: initial.seo.keywords,
    },
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    setSaved(false);
    const payload: Partial<Settings> = {
      foundationName: data.foundationName,
      description: data.description,
      email: data.email,
      phone: data.phone,
      address: data.address,
      social: {
        vk: data.vk || '',
        telegram: data.telegram || '',
        instagram: data.instagram || '',
        youtube: data.youtube || '',
      },
      seo: {
        title: data.seoTitle,
        description: data.seoDescription,
        keywords: data.seoKeywords || '',
        ogImage: initial.seo.ogImage,
      },
    };

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error || 'Ошибка сохранения');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${
      err ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-[#22c55e]'
    }`;

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#0c2461]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#0c2461]" />
        </div>
        <h2 className="font-bold text-[#0c2461]">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {/* Basic Info */}
      <Section title="Основная информация" icon={Globe}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Название фонда</label>
          <input {...register('foundationName')} className={inputClass(errors.foundationName?.message)} />
          {errors.foundationName && <p className="text-red-500 text-xs mt-1">{errors.foundationName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Описание</label>
          <textarea {...register('description')} rows={3} className={inputClass(errors.description?.message) + ' resize-none'} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
      </Section>

      {/* Contacts */}
      <Section title="Контакты" icon={Phone}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input type="email" {...register('email')} className={inputClass(errors.email?.message)} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон</label>
            <input {...register('phone')} placeholder="+7 (495) 000-00-00" className={inputClass(errors.phone?.message)} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Адрес</label>
          <input {...register('address')} className={inputClass(errors.address?.message)} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
      </Section>

      {/* Social */}
      <Section title="Социальные сети" icon={Globe}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: 'vk' as const, label: 'ВКонтакте', placeholder: 'https://vk.com/...' },
            { key: 'telegram' as const, label: 'Telegram', placeholder: 'https://t.me/...' },
            { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/...' },
            { key: 'youtube' as const, label: 'YouTube', placeholder: 'https://youtube.com/...' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
              <input {...register(key)} placeholder={placeholder} className={inputClass()} />
            </div>
          ))}
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO настройки" icon={Globe}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Заголовок страницы</label>
          <input {...register('seoTitle')} className={inputClass(errors.seoTitle?.message)} />
          {errors.seoTitle && <p className="text-red-500 text-xs mt-1">{errors.seoTitle.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Мета-описание</label>
          <textarea {...register('seoDescription')} rows={2} className={inputClass(errors.seoDescription?.message) + ' resize-none'} />
          {errors.seoDescription && <p className="text-red-500 text-xs mt-1">{errors.seoDescription.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Ключевые слова</label>
          <input {...register('seoKeywords')} placeholder="слово1, слово2, слово3" className={inputClass()} />
        </div>
      </Section>

      {/* Error / Success */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
      )}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
          ✓ Настройки успешно сохранены
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-colors"
      >
        {isSubmitting ? (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        ) : <Save className="w-4 h-4" />}
        {isSubmitting ? 'Сохранение...' : 'Сохранить настройки'}
      </button>
    </form>
  );
}
