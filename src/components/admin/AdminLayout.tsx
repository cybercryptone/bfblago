import AdminSidebar from './AdminSidebar';

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminPageLayout({ children, title, subtitle, action }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:ml-64">
        {/* Page Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-5 lg:px-8 pt-20 lg:pt-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0c2461]">{title}</h1>
              {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>

        {/* Main content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
