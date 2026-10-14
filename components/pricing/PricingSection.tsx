'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { siteConfig } from '@/config/site';
import { Check, Monitor, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

/* ─── Types ─── */
type ModeType = 'online' | 'home';
type LevelType = 'primary' | 'secondary' | 'alevel';
type TermMonths = 3 | 6 | 9;

/* ─── Pricing data (per-lesson rates) ─── */
const PRICING_PER_LESSON: Record<ModeType, Record<LevelType, Record<string, number>>> = {
  online: {
    primary: { standard: 275, advanced: 270, premium: 265 },
    secondary: { standard: 295, advanced: 290, premium: 285 },
    alevel: { standard: 360, advanced: 350, premium: 340 },
  },
  home: {
    primary: { standard: 350, advanced: 340, premium: 330 },
    secondary: { standard: 375, advanced: 365, premium: 355 },
    alevel: { standard: 450, advanced: 440, premium: 425 },
  },
};

const DISCOUNTS: Record<TermMonths, number> = { 3: 0, 6: 5, 9: 7 };

const PLANS = [
  { key: 'standard', lessonsPerWeek: 1, lessonsPerMonth: 4, featured: false },
  { key: 'advanced', lessonsPerWeek: 2, lessonsPerMonth: 8, featured: true },
  { key: 'premium', lessonsPerWeek: 3, lessonsPerMonth: 12, featured: false },
] as const;

/* ─── WhatsApp icon ─── */
/*
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
*/

/* ─── Helpers ─── */
function fmt(n: number) {
  return Math.round(n).toLocaleString();
}

/* ─── Component ─── */
export function PricingSection() {
  const t = useTranslations();

  const [mode, setMode] = useState<ModeType>('online');
  const [level, setLevel] = useState<LevelType>('primary');
  const [term, setTerm] = useState<TermMonths>(3);

  const features = Array.from({ length: 8 }).map((_, i) => t(`pricingSection.features.f${i + 1}`));

  /* Compute pricing for each plan */
  const cards = useMemo(() => {
    const disc = DISCOUNTS[term] / 100;

    return PLANS.map((plan) => {
      const basePrice = PRICING_PER_LESSON[mode][level][plan.key];
      const adjPrice = basePrice * (1 - disc);
      const monthly = Math.round(adjPrice * plan.lessonsPerMonth);
      const perLesson = Math.round(adjPrice);
      const totalLessons = plan.lessonsPerMonth * term;
      const baseTotalBilled = Math.round(basePrice * totalLessons);
      const discTotalBilled = Math.round(adjPrice * totalLessons);
      const saving = baseTotalBilled - discTotalBilled;
      const freeLessons = saving > 0 ? Math.round(saving / basePrice) : 0;

      return {
        ...plan,
        monthly,
        perLesson,
        saving,
        freeLessons,
      };
    });
  }, [mode, level, term]);

  const levels: LevelType[] = ['primary', 'secondary', 'alevel'];
  const terms: { months: TermMonths; labelKey: string; saveKey?: string }[] = [
    { months: 3, labelKey: '1term' },
    { months: 6, labelKey: '2terms', saveKey: 'save5' },
    { months: 9, labelKey: 'fullYear', saveKey: 'save7' },
  ];

  return (
    <section className="relative bg-surface-alt py-12 lg:py-16">
      <Container className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 text-content mb-4"
          >
            <HighlightText words="Monthly">{t('pricingSection.title')}</HighlightText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-base md:text-body-lg text-content-secondary"
          >
            {t('pricingSection.subtitle')}
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════
            FILTERS — premium compact design
            ═══════════════════════════════════════════ */}
        <div className="flex flex-col items-center mb-10 md:mb-14 md:px-4 w-full">
          {/* ──── Row 1: Mode Toggle Tab ──── */}
          <div className="relative bg-surface-base rounded-t-2xl md:rounded-t-[1.5rem] px-2 md:px-8 py-1.5 md:py-2 flex items-center justify-center z-10 max-w-full">
            {/* SVG curves for the "folder tab" effect blending into the bottom bar (hidden on very small screens to prevent overflow) */}
            <svg className="hidden sm:block absolute -left-6 bottom-0 w-6 h-6 text-surface-base" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 0V24H0C13.255 24 24 13.255 24 0Z" />
            </svg>
            <svg className="hidden sm:block absolute -right-6 bottom-0 w-6 h-6 text-surface-base" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0V24H24C10.745 24 0 13.255 0 0Z" />
            </svg>

            <div className="flex items-center gap-1 sm:gap-0">
              {(['online', 'home'] as ModeType[]).map((m) => {
                const isActive = mode === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={twMerge(
                      'relative px-3 sm:px-8 py-2 md:py-3 rounded-full text-body-sm md:text-body-base font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 md:gap-2',
                      isActive
                        ? 'bg-content text-content-invert'
                        : 'text-content-secondary hover:text-content',
                    )}
                  >
                    {m === 'online' ? (
                      <Monitor className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isActive ? 2 : 1.5} />
                    ) : (
                      <Home className="w-4 h-4 md:w-5 md:h-5" strokeWidth={isActive ? 2 : 1.5} />
                    )}
                    {t(`pricingSection.mode.${m}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ──── Row 2: Level (radio) & Term (pills) stacked ──── */}
          <div className="relative z-20 w-full max-w-3xl md:max-w-5xl bg-surface-base rounded-b-2xl md:rounded-full px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-center gap-6 border border-edge-subtle">

            {/* Top row: Level — radio-button style */}
            <div className="flex items-center justify-center md:justify-start flex-wrap gap-5 sm:gap-10 w-full">
              {levels.map((tab) => {
                const isActive = level === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setLevel(tab)}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    {/* Radio circle */}
                    <span
                      className={twMerge(
                        'flex items-center justify-center w-[20px] h-[20px] md:w-[24px] md:h-[24px] rounded-full transition-all duration-200 flex-shrink-0',
                        isActive
                          ? 'border-[6px] md:border-[7px] border-content'
                          : 'border-2 border-edge group-hover:border-content-tertiary',
                      )}
                    />
                    <span
                      className={twMerge(
                        'text-body-base md:text-body-lg font-medium transition-colors duration-200 whitespace-nowrap',
                        isActive
                          ? 'text-content'
                          : 'text-content-secondary group-hover:text-content',
                      )}
                    >
                      {t(`pricingSection.tabs.${tab}`)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Divider */}
            <div className="w-full max-w-2xl h-px bg-edge-subtle my-2 md:hidden" />

            {/* Bottom row: Term — pill buttons */}
            <div className="flex items-center justify-center md:justify-end flex-wrap gap-x-4 gap-y-6 sm:gap-6 w-full">
              {terms.map((t_item) => {
                const isActive = term === t_item.months;
                return (
                  <div key={t_item.months} className="relative mt-2 md:mt-0">
                    {/* Floating save badge */}
                    {t_item.saveKey && (
                      <span className="absolute -top-3.5 right-0 md:-right-2 bg-content-success text-content-invert text-[11px] md:text-xs font-bold px-2 py-0.5 rounded-full leading-tight whitespace-nowrap z-10 shadow-sm">
                        {t(`pricingSection.term.${t_item.saveKey}`)}
                      </span>
                    )}
                    <button
                      onClick={() => setTerm(t_item.months)}
                      className={twMerge(
                        'px-5 sm:px-8 py-2 md:py-3 rounded-full text-body-sm md:text-body-base font-semibold cursor-pointer whitespace-nowrap transition-all duration-200',
                        isActive
                          ? 'bg-content text-content-invert'
                          : 'bg-surface-base text-content-secondary border border-edge hover:text-content hover:border-content-secondary',
                      )}
                    >
                      {t(`pricingSection.term.${t_item.labelKey}`)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            PRICING CARDS — same design as before
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-stretch">
          <AnimatePresence mode="wait">
            {cards.map((plan) => {
              const isAdvanced = plan.key === 'advanced';
              const isPremium = plan.key === 'premium';

              /* Build saving line */
              let savingLine = '';
              if (plan.saving > 0) {
                savingLine =
                  plan.freeLessons >= 1
                    ? `${t('pricingSection.savingLineWithLessons', {
                      amount: fmt(plan.saving),
                      count: plan.freeLessons,
                      s: plan.freeLessons > 1 ? 's' : '',
                    })}`
                    : `${t('pricingSection.savingLine', { amount: fmt(plan.saving) })}`;
              }

              return (
                <motion.div
                  key={plan.key}
                  className={twMerge(
                    'relative flex flex-col h-full',
                    isPremium
                      ? 'md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full'
                      : '',
                  )}
                >
                  <div
                    className={twMerge(
                      'flex flex-col h-full rounded-3xl',
                      isAdvanced
                        ? 'bg-surface-action p-1 pt-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10'
                        : 'bg-surface-base border border-edge-subtle lg:mt-8 overflow-hidden',
                    )}
                  >
                    {/* Advanced Plan Banner */}
                    {isAdvanced && (
                      <div className="text-content text-center py-2 text-xs font-bold tracking-[0.15em] uppercase">
                        {t('pricingSection.mostPopular', { defaultValue: 'Most Popular' })}
                      </div>
                    )}

                    <div className={twMerge(
                      "flex flex-col flex-grow",
                      isAdvanced ? "bg-surface-base rounded-[1.35rem] p-5 lg:p-7" : "p-6 lg:p-8"
                    )}>
                      {/* Plan Header */}
                      <div className="mb-6">
                        <h3 className="text-h5 text-content mb-1">
                          {t(`pricingSection.plans.${plan.key}.name`)}
                        </h3>
                        <p className="text-body-sm text-content-tertiary">
                          {t(`pricingSection.plans.${plan.key}.description`)}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-2">
                        <div className="text-body-xs text-content-secondary mb-1">
                          {t('pricingSection.from')}
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-[3.5rem] leading-[1] font-bold tracking-tighter text-content relative overflow-hidden flex">
                            <AnimatePresence mode="popLayout">
                              <motion.span
                                key={plan.monthly}
                                initial={{ opacity: 0, y: '50%' }}
                                animate={{ opacity: 1, y: '0%' }}
                                exit={{ opacity: 0, y: '-50%' }}
                                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                              >
                                {fmt(plan.monthly)}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                          <span className="text-body-base font-semibold text-content-tertiary">
                            {t('pricingSection.perMonth')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-body-sm font-semibold">
                          <span className="text-content-secondary">
                            {t(`pricingSection.plans.${plan.key}.freq`)}
                          </span>
                          <span className="text-content">
                            AED{' '}
                            <div className="inline-flex relative overflow-hidden align-bottom">
                              <AnimatePresence mode="popLayout">
                                <motion.span
                                  key={plan.perLesson}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                                >
                                  {plan.perLesson}
                                </motion.span>
                              </AnimatePresence>
                            </div>{' '}
                            <span className="font-medium text-content-tertiary">
                              {t('pricingSection.perLesson')}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Saving Line */}
                      <div className="h-6 mb-4">
                        <AnimatePresence mode="wait">
                          {savingLine && (
                            <motion.p
                              key={savingLine}
                              initial={{ opacity: 0, filter: 'blur(4px)' }}
                              animate={{ opacity: 1, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, filter: 'blur(4px)' }}
                              transition={{ duration: 0.2 }}
                              className="text-body-xs font-semibold text-content-success"
                            >
                              {savingLine}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* CTA */}
                      <Button
                        href={siteConfig.whatsappUrl}
                        hoverChildren={siteConfig.whatsappFormatted}
                        size="lg"
                        variant={isAdvanced ? 'primary' : 'dark'}
                        className="w-full mb-10"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get {t(`pricingSection.plans.${plan.key}.name`)}
                      </Button>

                      {/* Features list */}
                      <ul className="flex flex-col gap-4 mt-auto">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5 rounded-full p-1 flex items-center justify-center bg-content-tertiary/10 text-content-tertiary">
                              <Check className="w-3 h-3" strokeWidth={4} />
                            </div>
                            <span className="text-body-sm font-medium text-content-secondary">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ──── Footnote ──── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-body-xs text-content-tertiary max-w-xl mx-auto mt-8"
        >
          {DISCOUNTS[term] > 0
            ? t('pricingSection.footnoteWithDiscount', {
              mode: mode === 'online' ? 'online' : 'home',
              percent: DISCOUNTS[term],
              term: t(`pricingSection.termLabels.${term}`),
            })
            : t('pricingSection.footnote', {
              mode: mode === 'online' ? 'online' : 'home',
            })}
        </motion.p>
      </Container>
    </section>
  );
}
