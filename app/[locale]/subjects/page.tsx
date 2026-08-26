import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { BaseHero } from '@/components/shared/BaseHero';
import { WhatWeCover } from '@/components/shared/WhatWeCover';
import { AllSubjectsList } from '@/components/shared/AllSubjectsList';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'subjectPages.allSubjects' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/subjects',
    locale,
  });
}

export default async function SubjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <JsonLd />
      <BaseHero
        title={t('subjectPages.allSubjects.heroTitle')}
        subtitle={t('subjectPages.allSubjects.heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/hero-image.png"
        imageClassName="object-bottom lg:object-[center_60%]"
        highlightWord="subject"
      />
      <WhatWeCover
        translationKey="subjectPages.allSubjects.whatWeCover"
        images={[
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/Maths%20Tutoring.jpg',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/English%20Tutoring.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/Science%20Tutoring.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/Arabic%20Tutoring.webp',
          'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/all-subjects/Exam%20Preparation.webp',
        ]}
      />
      <AllSubjectsList translationKey="subjectPages.allSubjects.allSubjectsList" />
      <SubjectFAQs translationKey="subjectPages.allSubjects.faqs" />
      <CTASection />
    </>
  );
}
