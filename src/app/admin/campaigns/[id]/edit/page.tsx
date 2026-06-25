import { notFound } from 'next/navigation';
import AdminPageLayout from '@/components/admin/AdminLayout';
import CampaignForm from '@/components/admin/CampaignForm';
import { campaignRepository } from '@/lib/repositories';

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await campaignRepository.findById(id);
  if (!campaign) notFound();

  return (
    <AdminPageLayout title={`Редактировать: ${campaign.name}`} subtitle="Изменение данных сбора">
      <CampaignForm initial={campaign} campaignId={id} />
    </AdminPageLayout>
  );
}
