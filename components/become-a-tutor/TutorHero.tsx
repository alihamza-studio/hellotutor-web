'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function TutorHero() {
  const t = useTranslations();

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
            <HighlightText words="Expert">{t('becomeATutorPage.hero.title')}</HighlightText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-xl text-content-secondary mb-8 max-w-2xl"
          >
            {t('becomeATutorPage.hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start gap-3 mb-4"
          >
            <Button
              href={siteConfig.tutorSignupUrl}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('becomeATutorPage.hero.buttonText')}</span>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-body-xs text-content-tertiary mb-10"
          >
            {t('becomeATutorPage.hero.disclaimer')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full rounded-4xl bg-surface-strong overflow-hidden aspect-[16/9] lg:aspect-[2.2/1] relative"
        >
          <Image
            src="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/become-a-tutor/tutorhero.png"
            alt="Tutor teaching"
            fill
            className="object-cover object-center lg:object-[center_20%]"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
