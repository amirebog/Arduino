// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arduino-ochre.vercel.app/';
  
  return {
    name: 'Arduino - source code platform',
    short_name: 'Arduino',
    description: 'Transform your workflow with AI-powered automation. Arduino AI brings cutting-edge machine learning to your fingertips.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/arduino.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/arduino.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/arduino.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['productivity', 'developer', 'ai'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
  };
}
