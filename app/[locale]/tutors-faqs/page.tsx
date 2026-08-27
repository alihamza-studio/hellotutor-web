import { setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({
    title: 'Tutor FAQs | Hello Tutor Online Tutoring Dubai & UAE',
    description:
      'Answers to common questions for tutors joining Hello Tutor. Learn about applying, payments, safety and teaching in Dubai & UAE.',
    path: '/tutors-faqs',
    locale,
  });
}

export default async function TutorsFaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section className="bg-gradient-to-b from-surface-alt to-surface">
      <Container className="py-20 text-center">
        <h1 className="text-h2 text-content mb-6">Tutors Faqs</h1>
        <p className="text-body-xl text-content-tertiary max-w-2xl mx-auto">
          This page is currently under construction. Content strategy pending.
        </p>
      </Container>
    </Section>
  );
}
