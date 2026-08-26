'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

interface AllSubjectsListProps {
  translationKey: string;
  buttonHref?: string;
}

export function AllSubjectsList({ translationKey, buttonHref }: AllSubjectsListProps) {
  const t = useTranslations(translationKey);

  const listRaw = t.raw('list');
  const subjectsList = (Array.isArray(listRaw) ? listRaw : Object.values(listRaw || {})) as string[];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 12 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="bg-surface py-16 lg:py-24 overflow-hidden border-t border-edge-subtle">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 md:text-h1 font-bold text-content mb-4"
          >
            <HighlightText words={['subjects.', 'simple match.', 'مادة دراسية.', 'بسيط.']}>
              {t('title')}
            </HighlightText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-content-secondary leading-relaxed max-w-4xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-3.5 max-w-5xl mx-auto mb-12 lg:mb-16"
        >
          {subjectsList.map((subject, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="group flex items-center justify-center bg-white border border-edge hover:border-edge-strong shadow-2xs hover:shadow-md rounded-full px-5 py-2.5 md:px-6 md:py-3 transition-all cursor-default"
            >
              <span className="text-body-sm md:text-body-base font-medium text-content group-hover:text-primary transition-colors whitespace-nowrap text-center">
                {subject}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <Button href={buttonHref || siteConfig.whatsappUrl} variant="primary" size="lg">
            {t('buttonText')}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
