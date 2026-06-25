'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function NewsActions({ newsId }: { newsId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Удалить эту новость?')) return;
    setLoading(true);
    await fetch(`/api/news/${newsId}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-xs border border-slate-200 hover:border-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" />
      Удалить
    </button>
  );
}
