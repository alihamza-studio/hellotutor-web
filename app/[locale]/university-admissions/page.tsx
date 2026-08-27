import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { BaseHero } from '@/components/shared/BaseHero';
import { LevelChallenges } from '@/components/shared/LevelChallenges';
import { IncludedServices } from '@/components/shared/IncludedServices';
import { SupportedCountries } from '@/components/shared/SupportedCountries';
import { SubjectHowItWorks } from '@/components/shared/SubjectHowItWorks';
import { TargetAudienceList } from '@/components/shared/TargetAudienceList';
import { SubjectFAQs } from '@/components/shared/SubjectFAQs';
import { CTASection } from '@/components/shared/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'levelPages.universityAdmissionsPage' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/university-admissions',
    locale,
  });
}

export default async function UniversityAdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('levelPages.universityAdmissionsPage');

  return (
    <>
      <JsonLd
        data={{
          '@type': 'Service',
          serviceType: 'University Admissions Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <BaseHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/university-admissions/uni5.jpg"
        imageClassName="object-bottom lg:object-[center_60%]"
        stats={[t('statPartners'), t('statCountries'), t('statSupport')]}
      />
      <LevelChallenges
        translationKey="levelPages.universityAdmissionsPage.challenges"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/university-admissions/uni2.jpg"
      />
      <IncludedServices translationKey="levelPages.universityAdmissionsPage.included" />
      <SupportedCountries translationKey="levelPages.universityAdmissionsPage.supportedCountries" />
      <TargetAudienceList
        translationKey="levelPages.universityAdmissionsPage.whoThisIsFor"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/university-admissions/uni-4.png"
      />
      <SubjectHowItWorks
        translationKey="levelPages.universityAdmissionsPage.howItWorks"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/university-admissions/uni3.jpg"
      />
      <SubjectFAQs translationKey="levelPages.universityAdmissionsPage.faq" />
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        highlightWord="plan"
      />
    </>
  );
}
