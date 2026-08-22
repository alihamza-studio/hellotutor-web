'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BarChart3, Rocket } from 'lucide-react';

export function HowItWorks() {
  const t = useTranslations('forSchools');
  const steps = ['1', '2', '3', '4', '5'];

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
            className="text-h2 text-white"
          >
            <HighlightText words={['works', 'يعمل']}>{t('howItWorks.title')}</HighlightText>
          </motion.h2>
        </div>

        {/* Steps List */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {steps.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-edge flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-body-md font-bold text-primary mb-6">
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

        {/* Pilot & Measuring Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-edge flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-h4 text-content mb-3">{t('pilot.title')}</h3>
              <p className="text-body-base text-content-secondary leading-relaxed">
                {t('pilot.desc')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-edge flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-h4 text-content mb-3">{t('impact.title')}</h3>
              <p className="text-body-base text-content-secondary leading-relaxed">
                {t('impact.desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
