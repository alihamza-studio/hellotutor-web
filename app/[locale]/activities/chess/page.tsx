import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { BaseHero } from '@/components/shared/BaseHero';
import { CommonChallenges } from '@/components/shared/CommonChallenges';
import { BenefitsList } from '@/components/shared/BenefitsList';
import { IncludedServices } from '@/components/shared/IncludedServices';
import { IncludedChecklist } from '@/components/shared/IncludedChecklist';
import { SubjectHowItWorks } from '@/components/shared/SubjectHowItWorks';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { MeetOurTutors } from '@/components/shared/MeetOurTutors';
import { Testimonials } from '@/components/shared/Testimonials';
import { CTASection } from '@/components/shared/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities.chess' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/activities/chess',
    locale,
  });
}

export default async function ChessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd
        data={{
          '@type': 'Service',
          serviceType: 'Chess Coaching',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('activities.chess.heroTitle')}
        subtitle={t('activities.chess.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/chess/chess-hero.jpg"
        highlightWord="Chess"
      />
      <CommonChallenges translationKey="activities.chess.challenges" />
      <BenefitsList
        translationKey="activities.chess.benefits"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/chess/teacher-support.jpg"
      />
      <IncludedServices translationKey="activities.chess.whatWeCover" />
      <Testimonials translationKey="activities.chess.testimonials" />
      <MeetOurTutors
        translationKey="activities.chess.meetOurCoaches"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/chess/teachers.jpg"
      />
      <SubjectHowItWorks
        translationKey="activities.chess.howToGetStarted"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/chess/get%20started.jpg"
      />
      <IncludedChecklist translationKey="activities.chess.whatIsIncluded" />
      <SubjectFAQs translationKey="activities.chess.faqs" />
      <CTASection />
    </>
  );
}
