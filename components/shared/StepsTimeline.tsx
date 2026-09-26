'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface StepsTimelineProps {
  translationKey: string;
}

export function StepsTimeline({ translationKey }: StepsTimelineProps) {
  const t = useTranslations(translationKey);

  const itemsRaw = t.raw('items');
  const itemsArray = (Array.isArray(itemsRaw) ? itemsRaw : Object.values(itemsRaw || {})) as {
    title: string;
    desc: string;
  }[];

  return (
    <section className="py-12 lg:py-20 bg-surface-alt">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 text-content mb-4"
          >
            <HighlightText words={['Works', 'Process', 'Application']}>{t('title')}</HighlightText>
          </motion.h2>
          {t.has('subtitle') && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-body-lg text-content-secondary"
            >
              {t('subtitle')}
            </motion.p>
          )}
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden lg:block relative">
          {/* Central vertical dashed line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full border-l-2 border-dashed border-edge" />
          </div>

          <div className="relative space-y-12">
            {itemsArray.map((item, i) => {
              const isLeft = i % 2 === 0;
              const num = `0${i + 1}`;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center"
                >
                  {isLeft ? (
                    <>
                      {/* Left card */}
                      <div className="w-[calc(50%-3rem)] flex justify-end">
                        <div className="bg-white rounded-3xl p-8 border border-edge-subtle w-full max-w-xl">
                          <h3 className="text-h5 font-semibold text-content mb-2">
                            {t(`stepLabel`)} {i + 1}: {item.title}
                          </h3>
                          <p className="text-body-base text-content-secondary leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      {/* Center number */}
                      <div className="w-24 flex justify-center shrink-0 relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-surface-brand-alt flex items-center justify-center ">
                          <span className="text-h5 text-white font-bold">{num}</span>
                        </div>
                      </div>
                      {/* Right spacer */}
                      <div className="w-[calc(50%-3rem)]" />
                    </>
                  ) : (
                    <>
                      {/* Left spacer */}
                      <div className="w-[calc(50%-3rem)]" />
                      {/* Center number */}
                      <div className="w-24 flex justify-center shrink-0 relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-surface-brand-alt flex items-center justify-center ">
                          <span className="text-h5 text-white font-bold">{num}</span>
                        </div>
                      </div>
                      {/* Right card */}
                      <div className="w-[calc(50%-3rem)] flex justify-start">
                        <div className="bg-white rounded-3xl p-8 border border-edge-subtle w-full max-w-xl">
                          <h3 className="text-h5 font-semibold text-content mb-2">
                            {t(`stepLabel`)} {i + 1}: {item.title}
                          </h3>
                          <p className="text-body-base text-content-secondary leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden space-y-6">
          {itemsArray.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex gap-4"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-xl bg-surface-brand-alt flex items-center justify-center">
                  <span className="text-body-lg text-white font-bold">{`0${i + 1}`}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-edge-subtle flex-1">
                <h3 className="text-body-lg font-semibold text-content mb-1.5">
                  {t(`stepLabel`)} {i + 1}: {item.title}
                </h3>
                <p className="text-body-sm text-content-secondary leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
