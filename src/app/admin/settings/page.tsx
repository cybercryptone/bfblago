import { settingsRepository } from '@/lib/repositories';
import AdminPageLayout from '@/components/admin/AdminLayout';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
  const settings = await settingsRepository.get();
  return (
    <AdminPageLayout title="Настройки" subtitle="Управление данными и внешним видом сайта">
      <SettingsForm initial={settings} />
    </AdminPageLayout>
  );
}
