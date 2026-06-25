import { campaignRepository, newsRepository, donationRepository } from '@/lib/repositories';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import StatsSection from '@/components/sections/StatsSection';
import CampaignsSection from '@/components/sections/CampaignsSection';
import NewsSection from '@/components/sections/NewsSection';
import AboutSection from '@/components/sections/AboutSection';

export default async function HomePage() {
  const [campaigns, news, totalDonations, totalDonors] = await Promise.all([
    campaignRepository.findAll(),
    newsRepository.findRecent(8),
    donationRepository.getTotalAmount(),
    donationRepository.getTotalDonors(),
  ]);

  const closedCampaigns = campaigns.filter(c => c.isClosed).length;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <StatsSection
          totalDonations={totalDonations}
          totalDonors={totalDonors}
          closedCampaigns={closedCampaigns}
        />
        <CampaignsSection campaigns={campaigns} />
        <NewsSection news={news} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
