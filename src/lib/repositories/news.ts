import { NewsItem } from '@/types';
import { JsonRepository } from './base';

class NewsRepository extends JsonRepository<NewsItem> {
  constructor() {
    super('news.json');
  }

  async findRecent(limit: number = 8): Promise<NewsItem[]> {
    const all = await this.findAll();
    return all
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
}

export const newsRepository = new NewsRepository();
