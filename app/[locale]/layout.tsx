import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Noto_Sans_Arabic, Inter_Tight } from 'next/font/google';
import localFont from 'next/font/local';
import { routing } from '@/i18n/routing';

const awesomeSerif = localFont({
  src: [
    {
      path: '../../public/fonts/AwesomeSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AwesomeSerifItalic-Regular.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-awesome-serif',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/analytics/Analytics';
import { CookieConsentProvider } from '@/components/providers/CookieConsentProvider';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { CookieSettingsModal } from '@/components/ui/CookieSettingsModal';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { createMetadata } from '@/lib/metadata';
import type { Viewport } from 'next';
import '@/styles/globals.css';

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fff5ed',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createMetadata({
    title: 'HelloTutor — Expert Online Tutoring',
    locale,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine direction for RTL support
  const dir = locale === 'ae-ar' ? 'rtl' : 'ltr';

  // Convert custom URL locales to valid BCP-47 language tags for the browser
  const htmlLang = locale === 'ae-ar' ? 'ar-AE' : 'en-AE';

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning className={`${notoSansArabic.variable} ${interTight.variable} ${awesomeSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=2" />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col">
        <JsonLd />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <CookieConsentProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieBanner />
            <CookieSettingsModal />
            <FloatingCTA />
          </NextIntlClientProvider>

          <Analytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
