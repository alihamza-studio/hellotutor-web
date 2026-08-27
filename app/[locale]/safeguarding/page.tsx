import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { SafeguardingContent } from '@/components/safeguarding/SafeguardingContent';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'safeguarding' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/safeguarding',
    locale,
  });
}

export default async function SafeguardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SafeguardingContent />;
}
