'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Heart, CheckCircle } from 'lucide-react';
import Button from './Button';

const donationSchema = z.object({
  amount: z.number().min(10, 'Минимум 10 ₽').max(1000000, 'Максимум 1 000 000 ₽'),
  email: z.string().min(1, 'Укажите email').email('Неверный формат email'),
});

type DonationForm = z.infer<typeof donationSchema>;

interface Props {
  campaignId: string;
  campaignName: string;
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

export default function DonationModal({ campaignId, campaignName, isOpen, onClose }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: 1000 },
  });

  const handlePreset = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
    setValue('amount', amount, { shouldValidate: true });
  };

  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    setSelectedPreset(null);
    if (val) setValue('amount', parseInt(val), { shouldValidate: true });
  };

  const onSubmit = async (data: DonationForm) => {
    try {
      setErrorMsg('');
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          amount: data.amount,
          email: data.email,
          returnUrl: `${window.location.origin}/payment/success`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Ошибка при обработке платежа');
        setStep('error');
        return;
      }
      if (json.confirmationUrl) {
        window.location.href = json.confirmationUrl;
        return;
      }
      setStep('success');
    } catch {
      setErrorMsg('Ошибка соединения с сервером');
      setStep('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'success' ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#22c55e]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0c2461] mb-3">Спасибо!</h2>
            <p className="text-slate-600 mb-6">
              Ваше пожертвование получено. Вы помогаете {campaignName} получить необходимое лечение.
            </p>
            <Button onClick={onClose} className="w-full">Закрыть</Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#0c2461] rounded-xl flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-[#22c55e]" fill="currentColor" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0c2461]">Помочь</h2>
                <p className="text-slate-500 text-sm">{campaignName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Amount presets */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Сумма пожертвования
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {PRESET_AMOUNTS.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePreset(amount)}
                      className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedPreset === amount
                          ? 'bg-[#22c55e] border-[#22c55e] text-white'
                          : 'border-slate-200 text-slate-600 hover:border-[#22c55e] hover:text-[#22c55e]'
                      }`}
                    >
                      {amount >= 1000 ? `${amount / 1000}К` : amount} ₽
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Другая сумма, ₽"
                  value={customAmount}
                  onChange={handleCustom}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-sm transition-colors outline-none ${
                    selectedPreset === null && customAmount
                      ? 'border-[#22c55e]'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#22c55e]'
                  }`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email для квитанции
                </label>
                <input
                  type="email"
                  placeholder="your@email.ru"
                  {...register('email')}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-sm transition-colors outline-none ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#22c55e]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Error */}
              {step === 'error' && errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full py-4 text-base"
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                Пожертвовать
              </Button>

              <p className="text-center text-xs text-slate-400">
                Безопасная оплата через YooKassa. Нажимая кнопку, вы принимаете{' '}
                <a href="/terms" className="underline hover:text-slate-600">соглашение о пожертвовании</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
