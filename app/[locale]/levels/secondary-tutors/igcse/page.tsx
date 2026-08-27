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
  const t = await getTranslations({ locale, namespace: 'levelPages.igcseTutors' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/levels/secondary-tutors/igcse',
    locale,
  });
}

export default async function IgcseTutorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd
        data={{
          '@type': 'Service',
          serviceType: 'IGCSE Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('levelPages.igcseTutors.heroTitle')}
        subtitle={t('levelPages.igcseTutors.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/IGCSE-Tutors/IGCSEHero.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="IGCSE"
      />
      <LevelChallenges
        translationKey="levelPages.igcseTutors.challenges"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/IGCSE-Tutors/IGCSEStudents.webp"
      />
      <CommonChallenges translationKey="levelPages.igcseTutors.howWeSupport" />
      <PopularSubjects translationKey="levelPages.igcseTutors.popularSubjects" />
      <Testimonials translationKey="levelPages.igcseTutors.testimonials" />
      <SubjectFAQs translationKey="levelPages.igcseTutors.faqs" />
      <CTASection />
    </>
  );
}
