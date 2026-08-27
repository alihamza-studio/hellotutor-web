import { Suspense } from 'react';
import { AllFAQs } from '@/components/shared/AllFAQs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import enMessages from '@/messages/ae-en.json';
import arMessages from '@/messages/ae-ar.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'allFaqs' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/faqs',
    locale,
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

interface FAQSection {
  items?: { question: string; answer: string }[];
}

interface AllFaqsMessages {
  students?: { sections?: FAQSection[] };
  parents?: { sections?: FAQSection[] };
  tutors?: { sections?: FAQSection[] };
}

export default async function AllFaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (locale === 'ae-ar' ? arMessages : enMessages) as { allFaqs?: AllFaqsMessages };
  const allFaqs = messages.allFaqs;

  const categories = ['students', 'parents', 'tutors'] as const;
  const faqEntities: { '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }[] = [];

  if (allFaqs) {
    for (const cat of categories) {
      const sections = allFaqs[cat]?.sections || [];
      for (const section of sections) {
        if (Array.isArray(section.items)) {
          for (const item of section.items) {
            if (item.question && item.answer) {
              faqEntities.push({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: stripHtml(item.answer),
                },
              });
            }
          }
        }
      }
    }
  }

  return (
    <>
      <JsonLd
        data={{
          '@type': 'FAQPage',
          mainEntity: faqEntities,
        }}
      />
      <Suspense fallback={null}>
        <AllFAQs />
      </Suspense>
    </>
  );
}
