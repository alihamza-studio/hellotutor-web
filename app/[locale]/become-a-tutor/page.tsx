import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { TutorHero } from '@/components/become-a-tutor/TutorHero';
import type { Metadata } from 'next';
import { WhyTutor } from '@/components/become-a-tutor/WhyTutor';
import { WhoWereLookingFor } from '@/components/become-a-tutor/WhoWereLookingFor';
import { StepsTimeline } from '@/components/shared/StepsTimeline';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'becomeATutorPage' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/become-a-tutor',
    locale,
  });
}

export default async function BecomeATutorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('becomeATutorPage.cta');

  return (
    <>
      <TutorHero />
      <WhyTutor />
      <WhoWereLookingFor />
      <StepsTimeline translationKey="becomeATutorPage.applicationProcess" />
      <SubjectFAQs translationKey="becomeATutorPage.faqs" />
      <CTASection
        title={t('title')}
        subtitle={t('subtitle')}
        buttonText={t('buttonText')}
        highlightWord="teaching"
      />
    </>
  );
}
