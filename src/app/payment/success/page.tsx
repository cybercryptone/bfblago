import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f8fafc] flex items-center">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-[#22c55e]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0c2461] mb-4">Спасибо за пожертвование!</h1>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Ваш вклад поможет нуждающимся получить необходимое лечение. Вы делаете этот мир лучше.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#campaigns"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
            >
              Помочь ещё
            </Link>
            <Link
              href="/"
              className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
