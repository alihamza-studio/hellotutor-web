import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'levels' });
  return createMetadata({
    title: t('admissionsAbroad'),
    description: t('admissionsAbroad'),
    path: '/admissions-abroad',
    locale,
  });
}

export default async function AdmissionsAbroadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('levels');

  return (
    <>
      <JsonLd
        data={{
          '@type': 'Service',
          serviceType: 'Admissions Abroad Tutoring',
          provider: { '@type': 'Organization', name: 'HelloTutor', url: 'https://www.hellotutor.me' },
          areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          audience: { '@type': 'Audience', audienceType: 'Students and Parents' },
        }}
      />
      <div className="pt-32 pb-20 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">{t('admissionsAbroad')}</h1>
          {/* Content will be added here later */}
        </div>
      </div>
    </>
  );
}
