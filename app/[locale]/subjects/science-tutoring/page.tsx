import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { BaseHero } from '@/components/shared/BaseHero';
import { CommonChallenges } from '@/components/shared/CommonChallenges';
import { Testimonials } from '@/components/shared/Testimonials';
import { WhatWeCover } from '@/components/shared/WhatWeCover';
import { MeetOurTutors } from '@/components/shared/MeetOurTutors';
import { SubjectHowItWorks } from '@/components/shared/SubjectHowItWorks';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'subjectPages.scienceTutoring' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/subjects/science-tutoring',
    locale,
  });
}

export default async function ScienceTutoringPage({
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
          serviceType: 'Science Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('subjectPages.scienceTutoring.heroTitle')}
        subtitle={t('subjectPages.scienceTutoring.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/science-tutoring/hero-image.png"
        highlightWord="Science"
      />
      <CommonChallenges translationKey="subjectPages.scienceTutoring.challenges" />
      <Testimonials translationKey="subjectPages.scienceTutoring.testimonials" />
      <WhatWeCover
        translationKey="subjectPages.scienceTutoring.whatWeCover"
        images={[
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/Primary%20%3A%20Key%20Stage%201%20and%202.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/KS3%20%3A%20Years%207%2C%208%20and%209.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/GCSE%20%3A%20Foundation%20and%20Higher.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/A-Level%20%3A%20Core%2C%20Statistics%20and%20Mechanics.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/IB%20%3A%20Analysis%20and%20Approaches%2C%20Applications%20and%20Interpretation.avif',
        ]}
      />
      <MeetOurTutors
        translationKey="subjectPages.scienceTutoring.meetOurTutors"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/science-tutoring/Meet%20Our%20Science%20Tutors.webp"
      />
      <SubjectHowItWorks
        translationKey="subjectPages.scienceTutoring.howItWorks"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/science-tutoring/How%20it%20Works.webp"
      />
      <SubjectFAQs translationKey="subjectPages.scienceTutoring.faqs" />
      <CTASection />
    </>
  );
}
