'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/#campaigns', label: 'Сборы' },
    { href: '/#news', label: 'Новости' },
    { href: '/#about', label: 'О фонде' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#0c2461] rounded-lg flex items-center justify-center group-hover:bg-[#1a3a8f] transition-colors">
              <Heart className="w-5 h-5 text-[#22c55e]" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-[#0c2461] tracking-tight">БФ Благо</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-slate-600 hover:text-[#0c2461] font-medium transition-colors text-sm"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#campaigns"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Помочь
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-[#0c2461]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            <nav className="flex flex-col gap-1">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2.5 text-slate-700 hover:text-[#0c2461] hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#campaigns"
                className="mt-2 mx-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-3 rounded-full text-center transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Помочь
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
