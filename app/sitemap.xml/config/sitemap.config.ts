// config/sitemap.config.ts

export interface SitemapUrl {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
}

// Sitemap configuration for different environments
const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return process.env.NODE_ENV === 'production'
    ? 'https://arduino-ochre.vercel.app/' // TODO: Add your domain address here
    : 'http://localhost:3000';
};

// Define static pages
const staticUrls: SitemapUrl[] = [
  {
    url: '/',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  // You can add more pages here
  // {
  //   url: '/about',
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.8,
  // },
];

// Function to fetch dynamic pages (e.g., from API or database)
export async function getDynamicUrls(): Promise<SitemapUrl[]> {
  // Here you can fetch dynamic pages from API or database
  // Example:
  // const posts = await fetchPosts();
  // return posts.map(post => ({
  //   url: `/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));
  
  return [];
}

// Build final config
export async function getSitemapConfig(): Promise<SitemapConfig> {
  const dynamicUrls = await getDynamicUrls();
  
  return {
    baseUrl: getBaseUrl(),
    urls: [...staticUrls, ...dynamicUrls],
  };
}
