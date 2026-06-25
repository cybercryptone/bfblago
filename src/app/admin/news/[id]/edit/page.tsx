import { notFound } from 'next/navigation';
import AdminPageLayout from '@/components/admin/AdminLayout';
import NewsForm from '@/components/admin/NewsForm';
import { newsRepository } from '@/lib/repositories';

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem = await newsRepository.findById(id);
  if (!newsItem) notFound();

  return (
    <AdminPageLayout title="Редактировать новость" subtitle={newsItem.title}>
      <NewsForm initial={newsItem} newsId={id} />
    </AdminPageLayout>
  );
}
