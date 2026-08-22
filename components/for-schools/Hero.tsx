'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export function Hero() {
  const t = useTranslations('forSchools');
  const tCommon = useTranslations('common');
  const tHero = useTranslations('hero');
  const imageSrc = "https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/for-schools/for-school-hero.jpg";

  return (
    <section className="pt-[calc(40px+8rem)] xl:pt-[calc(48px+8rem)] bg-surface">
      <Container>
        <div className="max-w-3xl mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-h1 text-content mb-6 "
          >
            <HighlightText words={['platform', 'منصة']}>{t('heroTitle')}</HighlightText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-xl text-content-secondary mb-8 max-w-2xl leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-2 mb-4"
          >
            <Button
              href={siteConfig.whatsappUrl}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              hoverChildren={siteConfig.whatsappFormatted}
              hoverStartSlot={<WhatsAppIcon className="w-5 h-5" />}
            >
              <WhatsAppIcon className="w-5 h-5" />
              {tCommon('bookConsultation')}
            </Button>
            <Button
              href="/how-it-works"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white"
            >
              {tCommon('howItWorks')}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-body-xs text-content-tertiary mb-10"
          >
            {tHero('noCommitment')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[
                'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/hero-base/1.webp',
                'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/hero-base/2.webp',
                'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/hero-base/3.webp',
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-surface overflow-hidden relative"
                >
                  <Image src={src} alt="Avatar" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="text-body-sm font-semibold text-content flex items-center gap-3 flex-wrap">
              <span>{t('credibility.stat1')}</span>
              <span className="text-edge-strong font-normal">/</span>
              <span>{t('credibility.stat2')}</span>
              <span className="text-edge-strong font-normal">/</span>
              <span>{t('credibility.stat3')}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full rounded-4xl bg-surface-strong overflow-hidden aspect-[16/9] lg:aspect-[2.2/1] relative"
        >
          <Image
            src={imageSrc}
            alt="Students in a classroom"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
