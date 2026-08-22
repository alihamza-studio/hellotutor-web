'use client';

import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function WhatYouGet() {
  const t = useTranslations('forSchools.whatYouGet');
  const items = ['1', '2', '3', '4', '5'];
  const imageSrc =
    'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/for-schools/student-online.jpg';

  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 md:text-h1 font-bold text-content mb-4"
          >
            <HighlightText words={['What you get', 'ما تحصل عليه']}>{t('title')}</HighlightText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-content-secondary"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* 2-Column Content Grid: Left List + Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side - Numbered Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {items.map((key, i) => (
              <div key={key} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-base flex items-center justify-center shrink-0 mt-0.5 border border-edge/40">
                  <span className="text-body-md font-bold text-content-info">{`0${i + 1}`}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-body-lg font-semibold text-content">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-body-base text-content-secondary leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-[2rem] overflow-hidden bg-edge aspect-[4/5] lg:aspect-square"
          >
            <Image
              src={imageSrc}
              alt={t('title')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
