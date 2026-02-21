// app/feed.xml/route.ts
import { NextResponse } from 'next/server';
import { getRSSConfig } from '@/app/feed.xml/config/rss.config';

// Function to format date to RFC 822 format for RSS
const formatRSSDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toUTCString();
};

// Function to escape XML special characters
const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Function to escape HTML in CDATA sections
const escapeCData = (text: string): string => {
  return text.replace(/]]>/g, ']]&gt;');
};

// Generate RSS XML content
const generateRSSXml = async (): Promise<string> => {
  const config = await getRSSConfig();
  const { title, description, siteUrl, language, copyright, managingEditor, webMaster, items } = config;
  
  const rssItems = items.map((item) => {
    const fullLink = item.link.startsWith('http') ? item.link : `${siteUrl}${item.link}`;
    const guid = item.guid || fullLink;
    const pubDate = formatRSSDate(item.pubDate);
    
    let itemXml = `    <item>
      <title>${escapeXml(item.title)}</title>
      <description><![CDATA[${escapeCData(item.description)}]]></description>
      <link>${escapeXml(fullLink)}</link>
      <guid isPermaLink="${item.guid ? 'false' : 'true'}">${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>`;
    
    if (item.author) {
      itemXml += `\n      <author>${escapeXml(item.author)}</author>`;
    }
    
    if (item.category && item.category.length > 0) {
      item.category.forEach(cat => {
        itemXml += `\n      <category>${escapeXml(cat)}</category>`;
      });
    }
    
    if (item.content) {
      itemXml += `\n      <content:encoded><![CDATA[${escapeCData(item.content)}]]></content:encoded>`;
    }
    
    itemXml += '\n    </item>';
    return itemXml;
  });
  
  let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(siteUrl)}</link>
    <language>${language}</language>
    <copyright>${escapeXml(copyright)}</copyright>
    <lastBuildDate>${formatRSSDate(new Date())}</lastBuildDate>
    <pubDate>${formatRSSDate(new Date())}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />`;
  
  if (managingEditor) {
    rssXml += `\n    <managingEditor>${escapeXml(managingEditor)}</managingEditor>`;
  }
  
  if (webMaster) {
    rssXml += `\n    <webMaster>${escapeXml(webMaster)}</webMaster>`;
  }
  
  rssXml += `\n${rssItems.join('\n')}
  </channel>
</rss>`;
  
  return rssXml;
};

export async function GET() {
  try {
    const xmlContent = await generateRSSXml();
    
    return new NextResponse(xmlContent, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
