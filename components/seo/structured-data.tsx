// components/seo/structured-data.tsx
import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper function to build Organization Schema
export function getOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arduino-ochre.vercel.app/';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arduino',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.',
    sameAs: [
      // TODO: Add your social media links here
      // 'https://twitter.com/yourtwitter',
      // 'https://github.com/yourgithub',
      // 'https://linkedin.com/company/yourcompany',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      // TODO: Add your contact information here
      // email: 'support@yourdomain.com',
    },
  };
}

// Helper function to build Website Schema
export function getWebsiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arduino-ochre.vercel.app/';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arduino',
    url: siteUrl,
    description: 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Helper function to build SoftwareApplication Schema
export function getSoftwareApplicationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arduino-ochre.vercel.app/';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Arduino',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
    },
  };
}
