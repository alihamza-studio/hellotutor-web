import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import { Hero } from '@/components/for-schools/Hero';
import { Challenges } from '@/components/for-schools/Challenges';
import { TargetAudience } from '@/components/for-schools/TargetAudience';
import { WhatYouGet } from '@/components/for-schools/WhatYouGet';
import { BuiltForSchools } from '@/components/for-schools/BuiltForSchools';
import { Safeguarding } from '@/components/for-schools/Safeguarding';
import { Curriculum } from '@/components/for-schools/Curriculum';
import { HowItWorks } from '@/components/for-schools/HowItWorks';
import { FAQs } from '@/components/for-schools/FAQs';
import { CTA } from '@/components/for-schools/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'forSchools' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/for-schools',
    locale,
  });
}

export default async function ForSchoolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <Hero />
      <Challenges />
      <TargetAudience />
      <WhatYouGet />
      <BuiltForSchools />
      <Safeguarding />
      <Curriculum />
      <HowItWorks />
      <FAQs />
      <CTA />
    </>
  );
}
