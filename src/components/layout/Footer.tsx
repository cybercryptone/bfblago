import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c2461] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#22c55e] rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">БФ Благо</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Помогаем детям получить необходимое лечение и дарим им шанс на полноценную жизнь.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: 'ВК', href: 'https://vk.com/bfblago' },
                { label: 'TG', href: 'https://t.me/bfblago' },
                { label: 'YT', href: 'https://youtube.com/bfblago' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-[#22c55e] rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {['Сборы', 'Новости', 'О фонде'].map(item => (
                <li key={item}>
                  <Link
                    href={`/#${item === 'Сборы' ? 'campaigns' : item === 'Новости' ? 'news' : 'about'}`}
                    className="text-slate-300 hover:text-[#22c55e] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-slate-300 text-sm transition-colors">
                  Админ-панель
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                <a href="mailto:info@bfblago.ru" className="text-slate-300 hover:text-white text-sm transition-colors">
                  info@bfblago.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                <a href="tel:+74951234567" className="text-slate-300 hover:text-white text-sm transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm">
                  г. Москва, ул. Тверская, д. 1, оф. 100
                </span>
              </li>
            </ul>
          </div>

          {/* Donate CTA */}
          <div>
            <h3 className="font-semibold text-white mb-4">Помочь фонду</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Каждое пожертвование меняет судьбу ребёнка. Присоединяйтесь к нашей миссии.
            </p>
            <Link
              href="#campaigns"
              className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Сделать пожертвование
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© {currentYear} БФ Благо. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Пользовательское соглашение
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
