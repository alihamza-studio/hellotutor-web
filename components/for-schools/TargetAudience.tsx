'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduationCap, ArrowUpRight, ArrowLeftRight, Sparkles, BookOpen } from 'lucide-react';

const icons = [GraduationCap, ArrowUpRight, ArrowLeftRight, Sparkles, BookOpen];

export function TargetAudience() {
  const t = useTranslations('forSchools.targetAudience');

  const items = ['1', '2', '3', '4', '5'];

  return (
    <section className="py-16 lg:py-24 bg-surface-alt border-y border-edge">
      <Container>
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 text-content mb-4"
          >
            <HighlightText words={["Who it's for", 'لمن هذا البرنامج']}>{t('title')}</HighlightText>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((key, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-edge flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-h4 text-content mb-3">{t(`items.${key}.title`)}</h3>
                  <p className="text-body-base text-content-secondary leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
