'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('forSchools');
  const steps = ['1', '2', '3', '4'];

  return (
    <section className="py-16 lg:py-24 bg-surface-brand-alt">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 text-content-invert"
          >
            <HighlightText words={['works', 'يعمل']}>{t('howItWorks.title')}</HighlightText>
          </motion.h2>
        </div>

        {/* Steps List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {steps.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-surface-base rounded-3xl p-6 border border-edge flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-hover/50 flex items-center justify-center text-body-lg font-bold text-content mb-6">
                  {key}
                </div>
                <h3 className="text-h5 font-semibold text-content mb-2">
                  {t(`howItWorks.steps.${key}.title`)}
                </h3>
                <p className="text-body-sm text-content-secondary leading-relaxed">
                  {t(`howItWorks.steps.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
