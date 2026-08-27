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
  const t = await getTranslations({ locale, namespace: 'activities.martialArts' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/activities/martial-arts',
    locale,
  });
}

export default async function MartialArtsPage({
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
          serviceType: 'Martial Arts Coaching',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('activities.martialArts.heroTitle')}
        subtitle={t('activities.martialArts.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/martial-arts/martialarts-hero.png"
        highlightWord="Martial Arts"
      />
      <CommonChallenges translationKey="activities.martialArts.challenges" />
      <BenefitsList
        translationKey="activities.martialArts.benefits"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/martial-arts/teacher-support.jpg"
      />
      <IncludedServices translationKey="activities.martialArts.whatWeCover" />
      <Testimonials translationKey="activities.martialArts.testimonials" />
      <MeetOurTutors
        translationKey="activities.martialArts.meetOurCoaches"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/martial-arts/our-teachers.jpg"
      />
      <SubjectHowItWorks
        translationKey="activities.martialArts.howToGetStarted"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/martial-arts/get-started.jpg"
      />
      <IncludedChecklist translationKey="activities.martialArts.whatIsIncluded" />
      <SubjectFAQs translationKey="activities.martialArts.faqs" />
      <CTASection />
    </>
  );
}
