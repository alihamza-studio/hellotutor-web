import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { StudentCodeOfConductContent } from '@/components/student-code-of-conduct/StudentCodeOfConductContent';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'studentCodeOfConduct' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/student-code-of-conduct',
    locale,
  });
}

export default async function StudentCodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StudentCodeOfConductContent />;
}
