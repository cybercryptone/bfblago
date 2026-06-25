'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Eye, EyeOff, Lock, User } from 'lucide-react';

const loginSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error || 'Ошибка входа');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2461] to-[#1a3a8f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#22c55e] rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-white">БФ Благо</span>
          </div>
          <p className="text-slate-300 text-sm">Административная панель</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-[#0c2461] mb-2">Войти</h1>
          <p className="text-slate-500 text-sm mb-8">Введите данные для доступа к панели управления</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Login */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Логин</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="admin"
                  autoComplete="username"
                  {...register('login')}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm outline-none transition-colors ${
                    errors.login ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-[#22c55e]'
                  }`}
                />
              </div>
              {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl text-sm outline-none transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-[#22c55e]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Вход...
                </>
              ) : 'Войти в панель'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Логин: <span className="font-mono font-semibold">admin</span> · Пароль: <span className="font-mono font-semibold">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
