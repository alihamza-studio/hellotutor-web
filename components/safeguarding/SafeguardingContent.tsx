'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Container } from '@/components/layout/Container';
import { CTASection } from '@/components/shared/CTASection';
import { HighlightText } from '@/components/ui/HighlightText';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Shield,
    FileText,
    Scale,
    Target,
    Building2,
    UserCheck,
    GraduationCap,
    Users,
    AlertTriangle,
    RefreshCw,
    Mail,
    ChevronRight,
    ExternalLink,
    Phone,
    Eye,
    Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/* ------------------------------------------------------------------ */
// Types
/* ------------------------------------------------------------------ */

interface ClauseItem {
    id: string;
    text: string;
}

interface PolicySection {
    id: string;
    number: number;
    title: string;
    icon: React.ReactNode;
    clauses: ClauseItem[];
}

/* ------------------------------------------------------------------ */
// Icon map for sections (must match translation IDs)
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, React.ReactNode> = {
    overview: <FileText className="w-6 h-6" />,
    legislation: <Scale className="w-6 h-6" />,
    aims: <Target className="w-6 h-6" />,
    'hellotutor-responsibilities': <Building2 className="w-6 h-6" />,
    'tutor-responsibilities': <UserCheck className="w-6 h-6" />,
    'student-responsibilities': <GraduationCap className="w-6 h-6" />,
    'parent-responsibilities': <Users className="w-6 h-6" />,
    'reported-breach': <AlertTriangle className="w-6 h-6" />,
    'updating-policy': <RefreshCw className="w-6 h-6" />,
    contact: <Mail className="w-6 h-6" />,
};

/* ------------------------------------------------------------------ */
// Sub-components
/* ------------------------------------------------------------------ */

function PrincipleCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-base border border-edge-subtle"
        >
            <div className="w-12 h-12 rounded-xl bg-surface-brand-alt/10 text-surface-brand-alt flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-h5 font-semibold text-content mb-2">{title}</h3>
            <p className="text-body-sm text-content-secondary leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function SectionCard({ section, isActive }: { section: PolicySection; isActive: boolean }) {
    const st = useTranslations('safeguarding');
    return (
        <div
            id={section.id}
            data-sg-section={section.id}
            className={cn(
                'scroll-mt-28 mb-12 lg:mb-16 p-6 md:p-8 lg:p-10 rounded-3xl border transition-colors',
                isActive ? 'bg-surface-base border-edge' : 'bg-surface-base border-edge-subtle',
            )}
        >
            <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-surface-brand-alt/10 text-surface-brand-alt flex items-center justify-center">
                    {section.icon}
                </div>
                <div>
                    <span className="text-label-sm text-content-tertiary uppercase tracking-wider">
                        {st('sectionLabel', { number: section.number })}
                    </span>
                    <h2 className="text-h4 text-content ">{section.title}</h2>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {section.clauses.map((clause) => (
                    <div key={clause.id} className="flex gap-4">
                        <span className="shrink-0 text-body-sm font-mono font-semibold text-content-tertiary pt-0.5 w-10 text-right">
                            {clause.id}
                        </span>
                        <p className="text-body-base text-content-secondary leading-relaxed">{clause.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
// Main component
/* ------------------------------------------------------------------ */

export function SafeguardingContent() {
    const t = useTranslations('safeguarding');
    // Build sections from translations
    const sections = useMemo<PolicySection[]>(() => {
        const raw = t.raw('sections');
        const items = (Array.isArray(raw) ? raw : Object.values(raw || {})) as Array<{
            id: string;
            number: string;
            title: string;
            clauses: Array<{ id: string; text: string }>;
        }>;
        return items.map((s) => ({
            id: s.id,
            number: Number(s.number),
            title: s.title,
            icon: ICON_MAP[s.id] ?? <FileText className="w-6 h-6" />,
            clauses: s.clauses,
        }));
    }, [t]);

    const [activeSection, setActiveSection] = useState<string>(() => sections[0]?.id || '');

    const resolvedActiveSection = activeSection || sections[0]?.id || '';

    // Intersection observer for sidebar highlighting
    useEffect(() => {
        const sectionEls = document.querySelectorAll('[data-sg-section]');
        if (!sectionEls.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-sg-section');
                        if (id) setActiveSection(id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' },
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-surface">
                <Container size="narrow" className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-danger-light text-content-danger text-body-sm font-medium mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        <span>{t('heroBadge')}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-h1 text-content mb-5 "
                    >
                        <HighlightText words="Safeguarding">{t('heroTitle')}</HighlightText>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-body-xl text-content-secondary max-w-2xl mx-auto mb-10"
                    >
                        {t('heroSubtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-3 text-body-sm text-content-tertiary"
                    >
                        <span className="inline-flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <a href="#contact" className="underline hover:text-content transition-colors">
                                {t('lastUpdated')}
                            </a>
                        </span>
                    </motion.div>
                </Container>
            </section>

            {/* Principles strip */}
            <section className="pb-12 lg:pb-16 bg-surface">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <PrincipleCard
                            icon={<Shield className="w-6 h-6" />}
                            title={t('principles.childSafety')}
                            desc={t('principles.childSafetyDesc')}
                        />
                        <PrincipleCard
                            icon={<Eye className="w-6 h-6" />}
                            title={t('principles.verifiedTutors')}
                            desc={t('principles.verifiedTutorsDesc')}
                        />
                        <PrincipleCard
                            icon={<Video className="w-6 h-6" />}
                            title={t('principles.lessonRecording')}
                            desc={t('principles.lessonRecordingDesc')}
                        />
                        <PrincipleCard
                            icon={<Phone className="w-6 h-6" />}
                            title={t('principles.reportConcerns')}
                            desc={t('principles.reportConcernsDesc')}
                        />
                    </div>
                </Container>
            </section>

            {/* Main two-column layout */}
            <section className="py-12 lg:py-16 bg-surface-alt">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Sidebar */}
                        <aside className="lg:w-64 shrink-0">
                            <div className="lg:sticky lg:top-24">
                                <p className="text-label-sm text-content-tertiary uppercase tracking-wider mb-4 hidden lg:block">
                                    {t('sidebarTitle')}
                                </p>

                                {/* Mobile: horizontal scroll */}
                                <div className="flex lg:hidden gap-2 overflow-x-auto hide-scrollbar pb-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={cn(
                                                'px-4 py-2 rounded-xl text-body-sm font-medium whitespace-nowrap transition-all cursor-pointer',
                                                resolvedActiveSection === section.id
                                                    ? 'bg-surface-brand-alt text-white'
                                                    : 'bg-surface-base text-content-secondary hover:bg-surface-strong',
                                            )}
                                        >
                                            {section.number}. {section.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Desktop: vertical list */}
                                <ul className="hidden lg:flex flex-col gap-1">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => scrollToSection(section.id)}
                                                className={cn(
                                                    'w-full text-left px-3 py-2.5 rounded-lg text-body-sm font-medium transition-all cursor-pointer flex items-center gap-2.5',
                                                    resolvedActiveSection === section.id
                                                        ? 'bg-surface-brand-alt/10 text-surface-brand-alt'
                                                        : 'text-content-secondary hover:bg-surface-strong hover:text-content',
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0',
                                                        resolvedActiveSection === section.id
                                                            ? 'bg-surface-brand-alt text-white'
                                                            : 'bg-surface-strong text-content-tertiary',
                                                    )}
                                                >
                                                    {section.number}
                                                </span>
                                                <span className="truncate">{section.title}</span>
                                                <ChevronRight
                                                    className={cn(
                                                        'w-3.5 h-3.5 ml-auto shrink-0 transition-opacity',
                                                        resolvedActiveSection === section.id ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Main content */}
                        <main className="flex-1 min-w-0">
                            {sections.map((section) => (
                                <SectionCard
                                    key={section.id}
                                    section={section}
                                    isActive={resolvedActiveSection === section.id}
                                />
                            ))}

                            {/* Report Concern callout */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-12 p-6 md:p-8 rounded-3xl bg-surface-danger-light border border-edge-danger"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-content-danger text-white flex items-center justify-center">
                                        <Shield className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-h5 text-content mb-2">{t('reportCallout.title')}</h3>
                                        <p className="text-body-base text-content-secondary mb-4">
                                            {t('reportCallout.body')}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href="mailto:safeguarding@hellotutor.me"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-content-danger text-white text-body-sm font-semibold hover:opacity-90 transition-opacity"
                                            >
                                                <Mail className="w-4 h-4" />
                                                safeguarding@hellotutor.me
                                            </a>
                                            <a
                                                href={siteConfig.phoneUrl}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white border border-edge text-content text-body-sm font-semibold hover:bg-surface-strong transition-colors"
                                            >
                                                <Phone className="w-4 h-4" />
                                                {siteConfig.whatsappFormatted}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact strip */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-6 lg:p-8 rounded-3xl bg-surface-base border border-edge-subtle"
                            >
                                <h4 className="text-h5 font-semibold text-content mb-2">
                                    {t('contactStrip.title')}
                                </h4>
                                <p className="text-body-base text-content-secondary mb-6">
                                    {t('contactStrip.body')}
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {(
                                        [
                                            'support@hellotutor.me',
                                            'safeguarding@hellotutor.me',
                                            'privacy@hellotutor.me',
                                        ] as const
                                    ).map((email) => (
                                        <a
                                            key={email}
                                            href={`mailto:${email}`}
                                            className="text-body-base text-content font-medium hover:text-surface-brand-alt transition-colors"
                                        >
                                            {email}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </main>
                    </div>
                </Container>
            </section>

            <CTASection />
        </>
    );
}
