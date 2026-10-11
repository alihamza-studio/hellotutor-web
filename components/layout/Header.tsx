'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { DesktopNavigation } from './DesktopNavigation';
import { Logo } from '@/components/ui/Logo';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Container } from './Container';
import { TopBar } from './TopBar';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isTransparent = !isScrolled && pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 start-0 end-0 z-[100] transition-all duration-normal">
      <TopBar />
      <div
        className={cn(
          'transition-all duration-normal border-b',
          isScrolled
            ? 'bg-surface/90 border-edge shadow-sm py-3 backdrop-blur-md'
            : 'bg-transparent border-transparent py-5',
        )}
      >
        <Container className="flex items-center justify-between">
          <Logo variant={isTransparent ? 'white' : 'black'} />

          {/* Desktop Navigation */}
          <DesktopNavigation key={pathname} isTransparent={isTransparent} />

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href={siteConfig.loginUrl}
              className={cn(
                'text-sm font-medium transition-colors px-3 py-2',
                isTransparent
                  ? 'text-white hover:text-white/80'
                  : 'text-content-secondary hover:text-content-brand-strong',
              )}
              rel="noopener noreferrer"
            >
              {t('common.login')}
            </a>
            <LanguageSwitcher isTransparent={isTransparent} />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              'xl:hidden p-2 transition-colors',
              isTransparent
                ? 'text-white hover:text-white/80'
                : 'text-content-secondary hover:text-content-brand-strong',
            )}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </Container>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
