'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { Accordion } from '@/components/ui/Accordion';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function FAQs() {
  const t = useTranslations('forSchools.faqs');

  const faqItems = Array.from({ length: 8 }).map((_, i) => ({
    question: t(`items.${i}.q`),
    answer: t(`items.${i}.a`),
  }));

  return (
    <section className="py-16 lg:py-24 bg-surface-alt border-y border-edge">
      <Container className="max-w-4xl">
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 text-content mb-2"
          >
            <HighlightText words={['questions', 'الشائعة']}>{t('title')}</HighlightText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-xl text-content-secondary"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </Container>
    </section>
  );
}
