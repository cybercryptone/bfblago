import { MetadataRoute } from 'next';
import { campaignRepository, newsRepository } from '@/lib/repositories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const [campaigns, news] = await Promise.all([
    campaignRepository.findAll(),
    newsRepository.findAll(),
  ]);

  void campaigns; // campaigns used for potential future expansion

  const newsUrls: MetadataRoute.Sitemap = news.map(item => ({
    url: `${base}/news/${item.id}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/#campaigns`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/#news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/#about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...newsUrls,
  ];
}
