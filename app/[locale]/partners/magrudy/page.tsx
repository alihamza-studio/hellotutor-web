import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { MagrudyPage } from '@/components/partners/MagrudyPage';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'magrudy' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/partners/magrudy',
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'magrudy' });
  return (
    <>
      <JsonLd
        data={{
          '@type': 'Service',
          name: t('metaTitle'),
          description: t('metaDescription'),
          provider: { '@type': 'Organization', name: 'Hello Tutor' },
          areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        }}
      />
      <MagrudyPage />
    </>
  );
}
