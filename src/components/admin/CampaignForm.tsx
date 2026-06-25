'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import type { Campaign } from '@/types';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  age: z.number().int().min(0).max(18, 'Возраст 0-18'),
  city: z.string().min(2, 'Укажите город'),
  shortStory: z.string().min(5, 'Краткое описание обязательно'),
  story: z.string().min(10, 'Полная история обязательна'),
  goalAmount: z.number().positive('Сумма должна быть положительной'),
  collectedAmount: z.number().min(0, 'Не может быть отрицательным'),
  isClosed: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initial?: Partial<Campaign>;
  campaignId?: string;
}

export default function CampaignForm({ initial, campaignId }: Props) {
  const router = useRouter();
  const [image, setImage] = useState(initial?.image || '');
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name || '',
      age: initial?.age ?? 0,
      city: initial?.city || '',
      shortStory: initial?.shortStory || '',
      story: initial?.story || '',
      goalAmount: initial?.goalAmount ?? 0,
      collectedAmount: initial?.collectedAmount ?? 0,
      isClosed: initial?.isClosed ?? false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const payload = { ...data, image };

    const url = campaignId ? `/api/campaigns/${campaignId}` : '/api/campaigns';
    const method = campaignId ? 'PUT' : 'POST';

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
    router.push('/admin/campaigns');
    router.refresh();
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputClass = (hasError?: string) =>
    `w-full px-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${
      hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-[#22c55e]'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Имя и фамилия" error={errors.name?.message}>
          <input {...register('name')} placeholder="Иван Иванов" className={inputClass(errors.name?.message)} />
        </Field>

        <Field label="Возраст" error={errors.age?.message}>
          <input type="number" {...register('age', { valueAsNumber: true })} min={0} max={18} className={inputClass(errors.age?.message)} />
        </Field>

        <Field label="Город" error={errors.city?.message}>
          <input {...register('city')} placeholder="Москва" className={inputClass(errors.city?.message)} />
        </Field>

        <Field label="Цель (₽)" error={errors.goalAmount?.message}>
          <input type="number" {...register('goalAmount', { valueAsNumber: true })} placeholder="1000000" className={inputClass(errors.goalAmount?.message)} />
        </Field>

        <Field label="Уже собрано (₽)" error={errors.collectedAmount?.message}>
          <input type="number" {...register('collectedAmount', { valueAsNumber: true })} placeholder="0" className={inputClass(errors.collectedAmount?.message)} />
        </Field>

        <Field label="Статус сбора">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register('isClosed')} className="w-5 h-5 accent-[#22c55e] rounded" />
            <span className="text-sm text-slate-700">Сбор закрыт</span>
          </label>
        </Field>

        <div className="md:col-span-2">
          <Field label="Краткое описание (для карточки)" error={errors.shortStory?.message}>
            <textarea {...register('shortStory')} rows={2} placeholder="1-2 предложения..." className={inputClass(errors.shortStory?.message) + ' resize-none'} />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Полная история" error={errors.story?.message}>
            <textarea {...register('story')} rows={5} placeholder="Подробная история ребёнка..." className={inputClass(errors.story?.message) + ' resize-none'} />
          </Field>
        </div>

        <div className="md:col-span-2">
          <ImageUpload value={image} onChange={setImage} label="Фотография" />
        </div>
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
          href="/admin/campaigns"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Отмена
        </Link>
      </div>
    </form>
  );
}
