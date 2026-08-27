import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { AboutHero } from '@/components/shared/AboutHero';
import type { Metadata } from 'next';
import { StorySection } from '@/components/shared/StorySection';
import { ValuesSection } from '@/components/shared/ValuesSection';
import { FeatureGrid } from '@/components/shared/FeatureGrid';
import { Testimonials } from '@/components/shared/Testimonials';
import { StatsGrid } from '@/components/shared/StatsGrid';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPages.aboutUs' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/about',
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <AboutHero
        title={t('aboutPages.aboutUs.heroTitle')}
        subtitle={t('aboutPages.aboutUs.heroSubtitle')}
        highlightWord="believe"
      />
      <StorySection
        translationKey="aboutPages.aboutUs.story"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/about-us/story.jpg"
      />
      <ValuesSection translationKey="aboutPages.aboutUs.values" />
      <FeatureGrid translationKey="aboutPages.aboutUs.howDifferent" />
      <Testimonials translationKey="aboutPages.aboutUs.testimonials" />
      <StatsGrid translationKey="aboutPages.aboutUs.stats" />
      <SubjectFAQs translationKey="aboutPages.aboutUs.faqs" />
      <CTASection />
    </>
  );
}
