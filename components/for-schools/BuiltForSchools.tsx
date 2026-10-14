'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduationCap, Users, House, Video, FileText } from 'lucide-react';

const icons = [GraduationCap, Users, House, Video, FileText];

export function BuiltForSchools() {
  const t = useTranslations('forSchools');
  const items = ['1', '2', '3', '4', '5'];

  return (
    <section className="py-16 lg:py-24 bg-surface-brand-alt border-y border-edge">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-h2 text-content-invert mb-6"
            >
              <HighlightText words={['families', 'الأسر']}>
                {t('builtForSchools.title')}
              </HighlightText>
            </motion.h2>
          </div>

          {/* Right Column - Why Hello Tutor Features */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((key, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`bg-surface-base rounded-2xl p-6 border border-edge flex flex-col justify-between ${
                      index === 4 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-surface-hover/50 flex items-center justify-center mb-4 text-content">
                        <Icon className="w-5 h-5 text-content" aria-hidden="true" />
                      </div>
                      <h3 className="text-h5 font-semibold text-content mb-1">
                        {t(`whyHelloTutor.items.${key}.title`)}
                      </h3>
                      <p className="text-body-sm text-content-secondary leading-relaxed">
                        {t(`whyHelloTutor.items.${key}.desc`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
