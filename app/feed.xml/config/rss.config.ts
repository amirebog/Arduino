// config/rss.config.ts

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date | string;
  guid?: string;
  author?: string;
  category?: string[];
  content?: string;
}

export interface RSSConfig {
  title: string;
  description: string;
  siteUrl: string;
  language: string;
  copyright: string;
  managingEditor?: string;
  webMaster?: string;
  items: RSSItem[];
}

// Get base URL for RSS feed
const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return process.env.NODE_ENV === 'production'
    ? 'https://arduino-ochre.vercel.app'
    : 'http://localhost:3000';
};

// Define static RSS items (you can add blog posts, updates, etc.)
const staticRSSItems: RSSItem[] = [
  {
    title: 'Welcome to Arduino - AI-Powered Source Code Platform',
    description: 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.',
    link: '/',
    pubDate: new Date(),
    author: 'amirebog',
    category: ['announcement', 'platform'],
  },
  // You can add more RSS items here
  // {
  //   title: 'New Feature: Advanced Code Analysis',
  //   description: 'We\'ve added advanced code analysis capabilities to help you write better code.',
  //   link: '/blog/new-feature-code-analysis',
  //   pubDate: new Date('2024-01-15'),
  //   author: 'amirebog',
  //   category: ['feature', 'update'],
  // },
];

// Function to fetch dynamic RSS items (e.g., from API or database)
export async function getDynamicRSSItems(): Promise<RSSItem[]> {
  // Here you can fetch dynamic RSS items from API or database
  // Example:
  // const posts = await fetchPosts();
  // return posts.map(post => ({
  //   title: post.title,
  //   description: post.excerpt,
  //   link: `/blog/${post.slug}`,
  //   pubDate: post.publishedAt,
  //   author: post.author,
  //   category: post.categories,
  //   content: post.content,
  // }));
  
  return [];
}

// Build final RSS config
export async function getRSSConfig(): Promise<RSSConfig> {
  const baseUrl = getBaseUrl();
  const dynamicItems = await getDynamicRSSItems();
  
  return {
    title: 'Arduino - Source Code Platform',
    description: 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.',
    siteUrl: baseUrl,
    language: 'en-US',
    copyright: `Copyright ${new Date().getFullYear()} Arduino. All rights reserved.`,
    managingEditor: 'amirebog',
    webMaster: 'amirebog',
    items: [...staticRSSItems, ...dynamicItems],
  };
}
