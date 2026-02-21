import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GeistPixelLine } from 'geist/font/pixel'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData, getOrganizationSchema, getWebsiteSchema, getSoftwareApplicationSchema } from '@/components/seo/structured-data'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arduino-ochre.vercel.app/';
const siteName = 'Arduino';
const siteDescription = 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - source code platform`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  generator: 'Arduino',
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  keywords: ['Arduino', 'AI', 'Machine Learning', 'Automation', 'Source Code', 'Platform'],
  authors: [{ name: 'amirebog' }],
  creator: 'amirebog',
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/arduino.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/arduino.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/arduino.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/arduino.png',
  },
  manifest: '/manifest.json',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'RSS Feed' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - source code platform`,
    description: siteDescription,
    images: [
      {
        url: '/arduino.png', // Add an Open Graph image
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - source code platform`,
    description: siteDescription,
    images: ['/arduino.png'], // Add a Twitter Card image
    creator: '@yourtwitter', // Add your Twitter handle here
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    //  Add search engine verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${GeistPixelLine.variable} font-sans antialiased`}>
        <StructuredData data={getOrganizationSchema()} />
        <StructuredData data={getWebsiteSchema()} />
        <StructuredData data={getSoftwareApplicationSchema()} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
