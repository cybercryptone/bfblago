import AdminPageLayout from '@/components/admin/AdminLayout';
import NewsForm from '@/components/admin/NewsForm';

export default function NewNewsPage() {
  return (
    <AdminPageLayout title="Новая публикация" subtitle="Создание новой новости">
      <NewsForm />
    </AdminPageLayout>
  );
}
