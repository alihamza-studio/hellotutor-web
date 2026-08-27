import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { BaseHero } from '@/components/shared/BaseHero';
import type { Metadata } from 'next';
import { WhatWeCover } from '@/components/shared/WhatWeCover';
import { CommitmentBanner } from '@/components/shared/CommitmentBanner';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPages.safetyAndTrust' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/safety-and-trust',
    locale,
  });
}

export default async function SafetyAndTrustPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <BaseHero
        title={t('aboutPages.safetyAndTrust.heroTitle')}
        subtitle={t('aboutPages.safetyAndTrust.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/safety-and-trust/safetyhero.jpg"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="safety"
      />
      <WhatWeCover
        translationKey="aboutPages.safetyAndTrust.howWeKeepSafe"
        images={[
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/safety-and-trust/safetytrust.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/safety-and-trust/safetysecure.avif',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/safety-and-trust/safetyclear.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/safety-and-trust/safetyparent.webp',
        ]}
      />
      <CommitmentBanner translationKey="aboutPages.safetyAndTrust.commitment" />
      <SubjectFAQs translationKey="aboutPages.safetyAndTrust.faqs" />
      <CTASection />
    </>
  );
}
