import type { Campaign } from '@/types';
import CampaignCard from './CampaignCard';

interface Props {
  campaigns: Campaign[];
}

export default function CampaignsSection({ campaigns }: Props) {
  return (
    <section id="campaigns" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#22c55e]/10 text-[#16a34a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Актуальные сборы
          </div>
          <h2 className="text-4xl font-bold text-[#0c2461] mb-4">
            Кому нужна ваша помощь
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Каждый из этих детей ждёт вашей поддержки. Вместе мы можем дать им шанс на выздоровление.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
