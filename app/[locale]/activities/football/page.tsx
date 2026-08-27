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
  const t = await getTranslations({ locale, namespace: 'activities.football' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/activities/football',
    locale,
  });
}

export default async function FootballPage({
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
          serviceType: 'Football Coaching',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('activities.football.heroTitle')}
        subtitle={t('activities.football.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/football/football-hero.jpg"
        highlightWord="Football"
      />
      <CommonChallenges translationKey="activities.football.challenges" />
      <BenefitsList
        translationKey="activities.football.benefits"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/football/teacher-support.jpg"
      />
      <IncludedServices translationKey="activities.football.whatWeCover" />
      <Testimonials translationKey="activities.football.testimonials" />
      <MeetOurTutors
        translationKey="activities.football.meetOurCoaches"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/football/teachers.jpg"
      />
      <SubjectHowItWorks
        translationKey="activities.football.howToGetStarted"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/football/get-started.jpg"
      />
      <IncludedChecklist translationKey="activities.football.whatIsIncluded" />
      <SubjectFAQs translationKey="activities.football.faqs" />
      <CTASection />
    </>
  );
}
