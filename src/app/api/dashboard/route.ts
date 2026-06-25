import { NextResponse } from 'next/server';
import { campaignRepository, newsRepository, donationRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdminSession();
    const [campaigns, news, totalAmount, totalDonors] = await Promise.all([
      campaignRepository.findAll(),
      newsRepository.findAll(),
      donationRepository.getTotalAmount(),
      donationRepository.getTotalDonors(),
    ]);

    const stats = {
      totalDonations: totalAmount,
      totalCampaigns: campaigns.length,
      closedCampaigns: campaigns.filter(c => c.isClosed).length,
      totalNews: news.length,
      totalDonors,
    };

    return NextResponse.json(stats);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}
