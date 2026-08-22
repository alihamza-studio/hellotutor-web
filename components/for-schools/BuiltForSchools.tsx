'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, Shield, Video, Layers, CalendarCheck, Users } from 'lucide-react';

const icons = [Users, Video, Layers, CalendarCheck, Shield];

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
              className="text-h2 text-white mb-6"
            >
              <HighlightText words={['not bolted on', 'وليست إضافة']}>
                {t('builtForSchools.title')}
              </HighlightText>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body-xl text-white leading-relaxed mb-8"
            >
              {t('builtForSchools.desc')}
            </motion.p>
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
                    className={`bg-white rounded-2xl p-6 border border-edge flex flex-col justify-between ${index === 4 ? 'sm:col-span-2' : ''
                      }`}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-h5 font-semibold text-content mb-1">
                        {t(`whyHelloTutor.items.${key}.title`)}
                      </h4>
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
