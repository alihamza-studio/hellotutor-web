'use client';

import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  UserCheck,
  MessageSquare,
  GraduationCap,
  Clock,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface FeatureGridProps {
  translationKey: string;
  iconBackground?: 'brand' | 'surface';
}

export function FeatureGrid({ translationKey, iconBackground = 'brand' }: FeatureGridProps) {
  const t = useTranslations(translationKey);

  const icons = [
    <UserCheck key="1" className="w-5 h-5 text-icon-accent" />,
    <MessageSquare key="2" className="w-5 h-5 text-icon-accent" />,
    <GraduationCap key="3" className="w-5 h-5 text-icon-accent" />,
    <Clock key="4" className="w-5 h-5 text-icon-accent" />,
    <ShieldCheck key="5" className="w-5 h-5 text-icon-accent" />,
    <RefreshCw key="6" className="w-5 h-5 text-icon-accent" />,
  ];

  const cardsRaw = t.raw('cards');
  const cardsData = (Array.isArray(cardsRaw) ? cardsRaw : Object.values(cardsRaw || {})) as {
    title: string;
    desc: string;
  }[];

  const cards = cardsData.map((card, index) => ({
    id: index.toString(),
    title: card.title,
    desc: card.desc,
    icon: icons[index],
  }));

  const gridCols = cards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-h2 text-content mb-4"
          >
            <HighlightText words={['Different', 'Parents', 'Choose', 'Hello']}>
              {t('title')}
            </HighlightText>
          </motion.h2>
          {t.has('subtitle') && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body-lg text-content-tertiary"
            >
              {t('subtitle')}
            </motion.p>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-3xl p-6"
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-6',
                  iconBackground === 'surface' ? 'bg-surface' : 'bg-icon-accent-bg',
                )}
              >
                {card.icon}
              </div>
              <h3 className="text-h5 font-semibold text-content mb-3">{card.title}</h3>
              <p className="text-body-sm text-content-secondary leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
