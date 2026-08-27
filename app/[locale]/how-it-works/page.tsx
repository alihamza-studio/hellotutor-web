import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Hero } from '@/components/how-it-works/Hero';
import { Steps } from '@/components/how-it-works/Steps';
import { HowLessonsWork } from '@/components/how-it-works/HowLessonsWork';
import { CTASection } from '@/components/shared/CTASection';
import { FAQs } from '@/components/how-it-works/FAQs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'howItWorksPageHero' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/how-it-works',
    locale,
  });
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Steps />
      <HowLessonsWork />
      <FAQs />
      <CTASection />
    </>
  );
}
