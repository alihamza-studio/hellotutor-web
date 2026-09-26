'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { LevelChallenges } from '@/components/shared/LevelChallenges';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { TextTerms } from '@/components/shared/TextTerms';
import { HeroProof } from '@/components/shared/HeroProof';
import { FeatureGrid } from '@/components/shared/FeatureGrid';
import { SubjectHowItWorks } from '@/components/shared/SubjectHowItWorks';
import { StepsTimeline } from '@/components/shared/StepsTimeline';
import { PartnerOfferForm } from './PartnerOfferForm';

type CopyItem = { title: string; desc: string };

export function MagrudyPage() {
  const t = useTranslations('magrudy');
  const proof = t.raw('proof') as string[];
  const coverage = t.raw('coverage.cards') as CopyItem[];
  const levelIcons = [BookOpen, GraduationCap, Sparkles];

  return (
    <>
      <section className="bg-surface pt-44 pb-12 lg:pt-52 lg:pb-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Image
                src="/images/partners/magrudy-50-years.svg"
                alt={t('logoAlt')}
                width={756}
                height={203}
                className="w-56 sm:w-64 h-auto mb-8"
                loading="eager"
              />
              <h1 className="text-h1 text-content mb-6">
                {t('heroTitle')}
                <br />
                <HighlightText words={t('heroAccent')}>{t('heroAccent')}</HighlightText>
              </h1>
              <p className="text-body-lg text-content-secondary max-w-2xl mb-8">{t('intro')}</p>
              <Button
                href="#claim-offer"
                size="lg"
                className="h-auto min-h-14 py-4 w-full sm:w-auto text-start"
              >
                {t('cta')}
              </Button>
            </div>
            <div className="lg:col-span-12 lg:row-start-2">
              <HeroProof items={proof} />
              <TrustBadge className="mt-8" />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 rounded-4xl bg-surface-brand-alt text-content-invert p-8 md:p-10 relative overflow-hidden">
              <BookOpen
                className="absolute -end-6 -top-6 w-44 h-44 opacity-10 -rotate-12"
                strokeWidth={1}
                aria-hidden="true"
              />
              <div className="py-10 relative">
                <p className="font-serif text-8xl md:text-9xl tracking-tight leading-none">
                  {t('discount')}
                </p>
                <p className="text-h4 mt-4">{t('discountLabel')}</p>
              </div>
              <div className="border-t border-content-invert/20 pt-6 space-y-3">
                <p className="text-body-lg font-medium flex items-start gap-3">
                  <Sparkles
                    className="w-5 h-5 shrink-0 mt-1 text-surface-action"
                    aria-hidden="true"
                  />
                  {t('freeTest')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <LevelChallenges
        translationKey="magrudy.included"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/Primary-Tutors/PrimaryStudents.jpg"
      />
      <FeatureGrid translationKey="magrudy.why" iconBackground="surface" />
      <StepsTimeline translationKey="magrudy.steps" />
      <Section className="bg-surface">
        <Container>
          <div className="max-w-2xl mb-10">
            <h2 className="text-h2 text-content">{t('coverage.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {coverage.map((item, i) => {
              const Icon = levelIcons[i];
              return (
                <article key={item.title} className="rounded-3xl bg-surface-base p-7 lg:p-8">
                  <Icon className="w-7 h-7 text-icon-accent mb-8" aria-hidden="true" />
                  <h3 className="text-h4 text-content mb-3">{item.title}</h3>
                  <p className="text-body-base text-content-secondary">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
      <SubjectHowItWorks
        translationKey="magrudy.ways"
        itemsKey="items"
        imageSrc="https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/maths-tutoring/How%20it%20Works.webp"
      />
      <TextTerms title={t('terms.title')} items={t.raw('terms.items') as CopyItem[]} />
      <Section id="claim-offer" className="bg-surface scroll-mt-36">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <h2 className="text-h2 text-content mb-6">{t('form.title')}</h2>
              <p className="text-body-lg text-content-secondary max-w-md">{t('form.intro')}</p>
              <div className="mt-8 rounded-2xl bg-surface-brand-alt p-6 flex gap-3 items-start max-w-md">
                <Sparkles
                  className="w-5 h-5 mt-1 text-content-invert shrink-0"
                  aria-hidden="true"
                />
                <p className="text-body-base text-content-invert font-medium">
                  {t('form.automatic')}
                </p>
              </div>
            </div>
            <PartnerOfferForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
