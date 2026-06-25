// All shared TypeScript types for the project

export interface Campaign {
  id: string;
  name: string;
  age: number;
  city: string;
  story: string;
  shortStory: string;
  goalAmount: number;
  collectedAmount: number;
  image: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  foundationName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
  social: {
    vk: string;
    telegram: string;
    instagram: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}

export interface Admin {
  id: string;
  login: string;
  passwordHash: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  amount: number;
  email: string;
  status: 'pending' | 'succeeded' | 'failed';
  paymentId?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalDonations: number;
  totalCampaigns: number;
  closedCampaigns: number;
  totalNews: number;
  totalDonors: number;
}
