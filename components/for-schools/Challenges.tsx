'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Challenges() {
  const t = useTranslations('forSchools.challenges');

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 text-content">
              <HighlightText words={['gap', 'فجوة']}>{t('title')}</HighlightText>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-body-xl text-content-secondary leading-relaxed"
          >
            <p>{t('desc1')}</p>
            <p>{t('desc2')}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
