'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Props {
  campaignId: string;
  isClosed: boolean;
}

export default function CampaignActions({ campaignId, isClosed }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await fetch(`/api/campaigns/${campaignId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isClosed: !isClosed }),
    });
    router.refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Удалить этот сбор? Это действие нельзя отменить.')) return;
    setLoading(true);
    await fetch(`/api/campaigns/${campaignId}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={loading}
        title={isClosed ? 'Открыть сбор' : 'Закрыть сбор'}
        className="flex items-center gap-1 text-xs border border-slate-200 hover:border-amber-400 hover:text-amber-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
      >
        {isClosed ? <ToggleLeft className="w-3.5 h-3.5" /> : <ToggleRight className="w-3.5 h-3.5" />}
        {isClosed ? 'Открыть' : 'Закрыть'}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Удалить"
        className="flex items-center gap-1 text-xs border border-slate-200 hover:border-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Удалить
      </button>
    </>
  );
}
