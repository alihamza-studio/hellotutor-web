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
  const t = await getTranslations({ locale, namespace: 'activities.music' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/activities/music',
    locale,
  });
}

export default async function MusicPage({
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
          serviceType: 'Music Lessons',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('activities.music.heroTitle')}
        subtitle={t('activities.music.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/music/music-hero.png"
        highlightWord="Music"
      />
      <CommonChallenges translationKey="activities.music.challenges" />
      <BenefitsList
        translationKey="activities.music.benefits"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/music/teacher-support.jpg"
      />
      <IncludedServices translationKey="activities.music.whatWeCover" />
      <Testimonials translationKey="activities.music.testimonials" />
      <MeetOurTutors
        translationKey="activities.music.meetOurCoaches"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/music/teachers.jpg"
      />
      <SubjectHowItWorks
        translationKey="activities.music.howToGetStarted"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/music/get-started.jpg"
      />
      <IncludedChecklist translationKey="activities.music.whatIsIncluded" />
      <SubjectFAQs translationKey="activities.music.faqs" />
      <CTASection />
    </>
  );
}
