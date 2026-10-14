'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Video, Lock, Users, FileBadge } from 'lucide-react';

const icons = [ShieldCheck, Video, Lock, Users];

export function Safeguarding() {
  const t = useTranslations('forSchools.safeguarding');
  const items = ['1', '2', '3', '4'];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <Container>
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 text-content mb-4"
          >
            <HighlightText words={['Safeguarding', 'حماية']}>{t('title')}</HighlightText>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((key, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-surface-base p-6 rounded-3xl border border-edge flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-surface-hover/50 flex items-center justify-center mb-6 text-content">
                    <Icon className="w-5 h-5 text-content" aria-hidden="true" />
                  </div>
                  <h3 className="text-h5 font-semibold text-content mb-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-body-sm text-content-secondary leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-alt border border-edge rounded-full text-body-sm text-content-secondary font-medium">
            <FileBadge className="w-4 h-4 text-primary" />
            <span>{t('footer')}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
