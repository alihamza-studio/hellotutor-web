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
  const t = await getTranslations({ locale, namespace: 'subjectPages.biologyTutoring' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/subjects/biology-tutoring',
    locale,
  });
}

export default async function ChemistryTutoringPage({
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
          serviceType: 'Biology Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('subjectPages.biologyTutoring.heroTitle')}
        subtitle={t('subjectPages.biologyTutoring.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/biology-tutoring/hero-image.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="Biology"
      />
      <CommonChallenges translationKey="subjectPages.biologyTutoring.challenges" />
      <Testimonials translationKey="subjectPages.biologyTutoring.testimonials" />
      <WhatWeCover
        translationKey="subjectPages.biologyTutoring.whatWeCover"
        images={[
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/KS3%20%3A%20Years%207%2C%208%20and%209.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/GCSE%20%3A%20Foundation%20and%20Higher.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/A-Level%20%3A%20Core%2C%20Statistics%20and%20Mechanics.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/IB%20%3A%20Analysis%20and%20Approaches%2C%20Applications%20and%20Interpretation.avif',
        ]}
      />
      <MeetOurTutors
        translationKey="subjectPages.biologyTutoring.meetOurTutors"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/biology-tutoring/Meet%20Our%20Biology%20Tutors.jpg"
      />
      <SubjectHowItWorks
        translationKey="subjectPages.biologyTutoring.howItWorks"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/biology-tutoring/How%20it%20Works.jpg"
      />
      <SubjectFAQs translationKey="subjectPages.biologyTutoring.faqs" />
      <CTASection />
    </>
  );
}
