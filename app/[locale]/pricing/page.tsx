import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Hero } from '@/components/pricing/Hero';
import { PricingSection } from '@/components/pricing/PricingSection';
import { PricingFeaturesGrid } from '@/components/pricing/PricingFeaturesGrid';
import { SecurePayments } from '@/components/pricing/SecurePayments';
import { PricingFAQs } from '@/components/pricing/PricingFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricingPageHero' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/pricing',
    locale,
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PricingSection />
      <PricingFeaturesGrid />
      <SecurePayments />
      <PricingFAQs />
      <CTASection />
    </>
  );
}
