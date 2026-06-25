import { Donation } from '@/types';
import { JsonRepository } from './base';

class DonationRepository extends JsonRepository<Donation> {
  constructor() {
    super('donations.json');
  }

  async findByCampaign(campaignId: string): Promise<Donation[]> {
    const all = await this.findAll();
    return all.filter(d => d.campaignId === campaignId && d.status === 'succeeded');
  }

  async getTotalAmount(): Promise<number> {
    const all = await this.findAll();
    return all
      .filter(d => d.status === 'succeeded')
      .reduce((sum, d) => sum + d.amount, 0);
  }

  async getTotalDonors(): Promise<number> {
    const all = await this.findAll();
    const emails = new Set(all.filter(d => d.status === 'succeeded').map(d => d.email));
    return emails.size;
  }
}

export const donationRepository = new DonationRepository();
