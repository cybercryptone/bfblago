import AdminPageLayout from '@/components/admin/AdminLayout';
import CampaignForm from '@/components/admin/CampaignForm';

export default function NewCampaignPage() {
  return (
    <AdminPageLayout title="Новый сбор" subtitle="Создание нового благотворительного сбора">
      <CampaignForm />
    </AdminPageLayout>
  );
}
