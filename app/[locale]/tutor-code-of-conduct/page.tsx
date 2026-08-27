import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { TutorCodeOfConductContent } from '@/components/tutor-code-of-conduct/TutorCodeOfConductContent';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tutorCodeOfConduct' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/tutor-code-of-conduct',
    locale,
  });
}

export default async function TutorCodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TutorCodeOfConductContent />;
}
