'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { HighlightText } from '@/components/ui/HighlightText';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LevelChallengesProps {
  translationKey: string;
  imageSrc: string;
}

export function LevelChallenges({ translationKey, imageSrc }: LevelChallengesProps) {
  const t = useTranslations(translationKey);

  const itemsRaw = t.raw('items');
  const itemsArray = (Array.isArray(itemsRaw) ? itemsRaw : Object.values(itemsRaw || {})) as Array<
    string | { text: string }
  >;

  const challenges = itemsArray.map((item, index) => {
    // If it's still an object for some reason, extract the text, otherwise use the string directly
    const itemText = typeof item === 'object' && item !== null ? item.text : item;
    return {
      num: `0${index + 1}`,
      text: itemText,
    };
  });

  return (
    <section className="bg-surface py-12 lg:py-20">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 md:text-h1 font-bold text-content mb-4"
          >
            <HighlightText words={['Primary', 'KS3', 'GCSE', 'IGCSE', 'A-Level', 'Students']}>
              {t('title')}
            </HighlightText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-content-secondary"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <span className="text-body-sm font-semibold text-content-secondary mb-2 block">
                {t.has('listTitle') ? t('listTitle') : null}
              </span>
              {challenges.map((challenge, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-surface-base flex items-center justify-center shrink-0">
                    <span className="text-body-md font-bold text-content-info">
                      {challenge.num}
                    </span>
                  </div>
                  <span className="text-body-md text-content font-normal">{challenge.text}</span>
                </div>
              ))}
            </div>

            {/* Bottom Card */}
            {t.has('bottomCardText') && (
              <div className="bg-surface-base rounded-3xl p-6 lg:p-8 mt-2">
                <span className="text-body-base text-content-secondary block leading-relaxed">
                  {t('bottomCardText')}
                </span>
              </div>
            )}
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative rounded-[2rem] overflow-hidden bg-edge aspect-[4/5] lg:aspect-square"
          >
            <Image
              src={imageSrc}
              alt={t.has('imageAlt') ? t('imageAlt') : t('title')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
