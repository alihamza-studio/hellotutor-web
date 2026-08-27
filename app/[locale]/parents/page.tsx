import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { BaseHero } from '@/components/shared/BaseHero';
import type { Metadata } from 'next';
import { FeatureGrid } from '@/components/shared/FeatureGrid';
import { BenefitsList } from '@/components/shared/BenefitsList';
import { Testimonials } from '@/components/shared/Testimonials';
import { StepsTimeline } from '@/components/shared/StepsTimeline';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPages.forParents' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/parents',
    locale,
  });
}

export default async function ForParentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <BaseHero
        title={t('aboutPages.forParents.heroTitle')}
        subtitle={t('aboutPages.forParents.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/for-parents/parentsHero.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="Tutoring"
      />
      <FeatureGrid translationKey="aboutPages.forParents.whyChoose" />
      <BenefitsList
        translationKey="aboutPages.forParents.benefits"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/for-parents/parentsWhat.avif"
      />
      <Testimonials translationKey="aboutPages.forParents.testimonials" />
      <StepsTimeline translationKey="aboutPages.forParents.howItWorks" />
      <SubjectFAQs translationKey="aboutPages.forParents.faqs" />
      <CTASection />
    </>
  );
}
