'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Heart, LayoutDashboard, Megaphone, Newspaper,
  Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard, exact: true },
  { href: '/admin/campaigns', label: 'Сборы', icon: Megaphone, exact: false },
  { href: '/admin/news', label: 'Новости', icon: Newspaper, exact: false },
  { href: '/admin/settings', label: 'Настройки', icon: Settings, exact: false },
];

interface Props {
  adminLogin?: string;
}

export default function AdminSidebar({ adminLogin = 'admin' }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" target="_blank" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">БФ Благо</p>
            <p className="text-slate-400 text-xs mt-0.5">Панель управления</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-[#22c55e] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-4 h-4 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{adminLogin[0].toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{adminLogin}</p>
            <p className="text-slate-400 text-xs">Администратор</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? 'Выход...' : 'Выйти'}
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors mt-1"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Перейти на сайт
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0c2461] fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0c2461] border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#22c55e] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-white font-bold">БФ Благо</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="bg-[#0c2461] border-t border-white/10 pb-4" style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
            <SidebarContent />
          </div>
        )}
      </div>
    </>
  );
}
