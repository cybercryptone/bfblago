import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0c2461] via-[#1a3a8f] to-[#0c2461] overflow-hidden min-h-[90vh] flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22c55e]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="text-white animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/30 rounded-full px-4 py-2 text-[#4ade80] text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            Благотворительный фонд помощи людям
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Помогаем тем,{' '}
            <span className="text-[#22c55e]">кто нуждается</span>{' '}
            больше всего
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg">
            Каждый день мы помогаем нуждающимся по всей России получить необходимое лечение.
            Вместе мы можем изменить жизни тех, кто в этом нуждается.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#campaigns"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
            >
              Помочь сейчас
            </Link>
            <Link
              href="#about"
              className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:bg-white/10 text-center"
            >
              О фонде
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0c2461] bg-gradient-to-br from-slate-300 to-slate-400"
                />
              ))}
            </div>
            <p className="text-slate-300 text-sm">
              <span className="text-white font-semibold">1 200+</span> благотворителей{' '}
              уже помогли нуждающимся
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block animate-fade-in-up animate-delay-200">
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-[#22c55e]/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src="https://picsum.photos/seed/charity-hero/600/750"
                alt="Помощь нуждающимся"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 600px"
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <p className="text-[#0c2461] font-bold text-sm">Последний сбор закрыт!</p>
                    <p className="text-slate-500 text-xs mt-0.5">Артём Смирнов · Москва</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[#22c55e] font-bold">100%</p>
                    <p className="text-slate-400 text-xs">собрано</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
