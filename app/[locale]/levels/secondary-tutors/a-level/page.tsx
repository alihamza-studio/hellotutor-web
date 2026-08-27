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
  const t = await getTranslations({ locale, namespace: 'levelPages.aLevelTutors' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/levels/secondary-tutors/a-level',
    locale,
  });
}

export default async function ALevelTutorsPage({
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
          serviceType: 'A-Level Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('levelPages.aLevelTutors.heroTitle')}
        subtitle={t('levelPages.aLevelTutors.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/A-Level-Tutors/A-LevelHero.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="A-Level"
      />
      <LevelChallenges
        translationKey="levelPages.aLevelTutors.challenges"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/A-Level-Tutors/A-LevelStudents.jpg"
      />
      <CommonChallenges translationKey="levelPages.aLevelTutors.howWeSupport" />
      <PopularSubjects translationKey="levelPages.aLevelTutors.popularSubjects" />
      <Testimonials translationKey="levelPages.aLevelTutors.testimonials" />
      <SubjectFAQs translationKey="levelPages.aLevelTutors.faqs" />
      <CTASection />
    </>
  );
}
