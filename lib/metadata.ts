import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface CreateMetadataParams {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  locale?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for any page.
 * Handles title, description, canonical URL, Open Graph, Twitter card, and hreflang.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image = siteConfig.ogImage,
  locale = 'ae-en', // Default to ae-en just in case
  noIndex = false,
}: CreateMetadataParams): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const finalPath = cleanPath === '/' ? '' : cleanPath;
  
  const currentPrefix = locale === 'ae-ar' ? '/ae-ar' : '/ae-en';
  
  const currentUrl = `${siteConfig.url}${currentPrefix}${finalPath}`;
  const enUrl = `${siteConfig.url}/ae-en${finalPath}`;
  const arUrl = `${siteConfig.url}/ae-ar${finalPath}`;

  const hasBrand =
    title.includes('Hello Tutor') ||
    title.includes('HelloTutor') ||
    title.includes('هيلو تيوتر') ||
    title.includes('هالو تيوتر');
  const finalTitle = hasBrand ? title : (locale === 'ae-ar' ? `${title} | هيلو تيوتر` : `${title} | Hello Tutor`);

  return {
    title: finalTitle,
    description: description || undefined,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en-AE': enUrl,
        'ar-AE': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title: finalTitle,
      description: description || undefined,
      url: currentUrl,
      siteName: siteConfig.name,
      locale: locale === 'ae-ar' ? 'ar_AE' : 'en_GB',
      type: 'website',
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: finalTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: description || undefined,
      images: image ? [image] : [],
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}
