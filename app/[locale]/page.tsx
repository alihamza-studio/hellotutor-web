import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Hero } from '@/components/home/Hero';
import { HeroStatsBanner } from '@/components/home/HeroStatsBanner';
import type { Metadata } from 'next';
import { USP } from '@/components/home/USP';
import { Subjects } from '@/components/home/Subjects';

import dynamic from 'next/dynamic';
import { Trust } from '@/components/home/Trust';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQs } from '@/components/home/FAQs';

import { LazyHowItWorks, LazyWhyChooseUs, LazyCTASection } from '@/components/home/LazyClientComponents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return createMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
    path: '/',
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HeroStatsBanner />
      <USP />
      <Subjects />
      <Trust />
      <LazyHowItWorks />
      <Testimonials />
      <LazyWhyChooseUs />
      <FAQs />
      <LazyCTASection />
    </>
  );
}
