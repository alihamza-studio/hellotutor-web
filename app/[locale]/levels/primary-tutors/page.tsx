import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { BaseHero } from '@/components/shared/BaseHero';
import { LevelChallenges } from '@/components/shared/LevelChallenges';
import { CommonChallenges } from '@/components/shared/CommonChallenges';
import { Testimonials } from '@/components/shared/Testimonials';
import { PopularSubjects } from '@/components/shared/PopularSubjects';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'levelPages.primaryTutors' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/levels/primary-tutors',
    locale,
  });
}

export default async function PrimaryTutorsPage({
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
          serviceType: 'Primary Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('levelPages.primaryTutors.heroTitle')}
        subtitle={t('levelPages.primaryTutors.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/Primary-Tutors/PrimaryHero.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="Primary"
      />
      <LevelChallenges
        translationKey="levelPages.primaryTutors.challenges"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/Primary-Tutors/PrimaryStudents.jpg"
      />
      <CommonChallenges translationKey="levelPages.primaryTutors.howWeSupport" />
      <PopularSubjects translationKey="levelPages.primaryTutors.popularSubjects" />
      <Testimonials translationKey="levelPages.primaryTutors.testimonials" />
      <SubjectFAQs translationKey="levelPages.primaryTutors.faqs" />
      <CTASection />
    </>
  );
}
