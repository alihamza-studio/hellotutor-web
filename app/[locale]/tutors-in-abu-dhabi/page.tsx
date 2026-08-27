import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { TutorsInAbuDhabiContent } from './TutorsInAbuDhabiContent';
import { createMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tutorsInAbuDhabi' });
  
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/tutors-in-abu-dhabi',
    locale,
  });
}

export default async function TutorsInAbuDhabiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={{
          '@type': ['LocalBusiness', 'EducationalOrganization'],
          name: 'HelloTutor - Abu Dhabi Tutoring',
          url: `https://www.hellotutor.me/${locale}/tutors-in-abu-dhabi`,
          parentOrganization: {
            '@type': 'Organization',
            name: 'HelloTutor',
            url: 'https://www.hellotutor.me',
          },
          areaServed: { '@type': 'City', name: 'Abu Dhabi' },
          availableLanguage: ['English', 'Arabic'],
        }}
      />
      <TutorsInAbuDhabiContent />
    </>
  );
}
