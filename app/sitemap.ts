// app/sitemap.ts
// This file is automatically made available by Next.js at /sitemap.xml
import { MetadataRoute } from 'next';
import { getSitemapConfig } from '@/app/sitemap.xml/config/sitemap.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const config = await getSitemapConfig();
    
    return config.urls.map(({ url, lastModified, changeFrequency, priority }) => {
      // If URL is complete (starts with http), use it as is
      // Otherwise, prepend baseUrl
      const fullUrl = url.startsWith('http') ? url : `${config.baseUrl}${url}`;
      
      return {
        url: fullUrl,
        lastModified: lastModified 
          ? (typeof lastModified === 'string' ? new Date(lastModified) : lastModified)
          : new Date(),
        changeFrequency,
        priority,
      };
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return empty sitemap on error
    return [];
  }
}
