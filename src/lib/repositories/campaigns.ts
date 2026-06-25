import { Campaign } from '@/types';
import { JsonRepository } from './base';

class CampaignRepository extends JsonRepository<Campaign> {
  constructor() {
    super('campaigns.json');
  }

  async findActive(): Promise<Campaign[]> {
    const all = await this.findAll();
    return all.filter(c => !c.isClosed);
  }

  async findClosed(): Promise<Campaign[]> {
    const all = await this.findAll();
    return all.filter(c => c.isClosed);
  }

  async getTotalCollected(): Promise<number> {
    const all = await this.findAll();
    return all.reduce((sum, c) => sum + c.collectedAmount, 0);
  }
}

export const campaignRepository = new CampaignRepository();
