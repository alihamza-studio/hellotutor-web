import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { TermsAndConditionsContent } from '@/components/terms-and-conditions/TermsAndConditionsContent';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsAndConditions' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/terms-and-conditions',
    locale,
  });
}

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsAndConditionsContent />;
}
