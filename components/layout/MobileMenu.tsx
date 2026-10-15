'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { mainNav } from '@/config/navigation';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { X, ChevronDown } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.endsWith(href);
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] xl:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-gray-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute top-0 end-0 h-[100dvh] w-full max-w-sm bg-surface shadow-xl animate-slide-in-right flex flex-col pb-[env(safe-area-inset-bottom)]">
        <div className="p-5 flex items-center justify-between border-b border-edge-subtle">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 text-content-tertiary hover:text-content transition-colors rounded-lg hover:bg-surface-hover"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {mainNav.map((item) => (
              <div key={item.titleKey} className="flex flex-col">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'text-base font-semibold transition-colors py-3',
                      isActivePath(pathname, item.href)
                        ? 'text-surface-brand-alt'
                        : 'text-content-secondary hover:text-content',
                    )}
                  >
                    {item.titleKey.includes('.')
                      ? t(item.titleKey as Parameters<typeof t>[0])
                      : item.titleKey}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.titleKey)}
                    className="flex items-center justify-between text-base font-semibold text-content-secondary py-3"
                    aria-expanded={expandedItems.includes(item.titleKey)}
                  >
                    <span>
                      {item.titleKey.includes('.')
                        ? t(item.titleKey as Parameters<typeof t>[0])
                        : item.titleKey}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expandedItems.includes(item.titleKey) && 'rotate-180',
                      )}
                    />
                  </button>
                )}

                {item.children && (item.href || expandedItems.includes(item.titleKey)) && (
                  <div className="flex flex-col gap-4 ps-4 border-s-2 border-edge-subtle mt-2">
                    {item.children.map((child) => (
                      <div key={child.titleKey}>
                        {child.href ? (
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              'text-sm transition-colors py-2 block',
                              isActivePath(pathname, child.href)
                                ? 'text-surface-brand-alt font-semibold'
                                : 'text-content-secondary hover:text-content',
                            )}
                          >
                            {child.titleKey.includes('.')
                              ? t(child.titleKey as Parameters<typeof t>[0])
                              : child.titleKey}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleExpanded(child.titleKey)}
                            className="flex items-center justify-between w-full text-sm font-semibold text-content-secondary py-2"
                            aria-expanded={expandedItems.includes(child.titleKey)}
                          >
                            <span>
                              {child.titleKey.includes('.')
                                ? t(child.titleKey as Parameters<typeof t>[0])
                                : child.titleKey}
                            </span>
                            <ChevronDown
                              className={cn(
                                'h-3.5 w-3.5 transition-transform',
                                expandedItems.includes(child.titleKey) && 'rotate-180',
                              )}
                            />
                          </button>
                        )}

                        {child.children && expandedItems.includes(child.titleKey) && (
                          <div className="flex flex-col gap-3 ps-4 mt-2">
                            {child.children.map(
                              (subchild) =>
                                subchild.href && (
                                  <Link
                                    key={subchild.titleKey}
                                    href={subchild.href}
                                    onClick={onClose}
                                    className={cn(
                                      'text-sm transition-colors py-2 block',
                                      isActivePath(pathname, subchild.href)
                                        ? 'text-surface-brand-alt font-semibold'
                                        : 'text-content-secondary hover:text-content',
                                    )}
                                  >
                                    {subchild.titleKey.includes('.')
                                      ? t(subchild.titleKey as Parameters<typeof t>[0])
                                      : subchild.titleKey}
                                  </Link>
                                ),
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t border-edge-subtle flex flex-col gap-4 bg-surface-alt">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-content-tertiary">Language</span>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              href={siteConfig.loginUrl}
              variant="outline"
              className="w-full"
              rel="noopener noreferrer"
            >
              {t('common.login')}
            </Button>
            {pathname !== '/become-a-tutor' && (
              <Button
                href={siteConfig.whatsappUrl}
                variant="primary"
                className="w-full"
                hoverChildren={siteConfig.whatsappFormatted}
              >
                {t('common.bookConsultation')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
