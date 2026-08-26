'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { mainNav } from '@/config/navigation';
import { Logo } from '@/components/ui/Logo';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Container } from './Container';
import { TopBar } from './TopBar';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.endsWith(href);
}

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
 <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
 {mainNav.map((item) => {
 const isActive = item.href ? isActivePath(pathname, item.href) : false;

 if (item.children) {
 return (
 <div key={item.titleKey} className="relative group">
 <button
 type="button"
 className={cn(
 'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
 isTransparent
 ? 'text-white/80 hover:text-white'
 : 'text-content-secondary hover:text-content-brand-strong'
 )}
 aria-expanded="false"
 aria-haspopup="true"
 >
 {item.titleKey.includes('.')
 ? t(item.titleKey as Parameters<typeof t>[0])
 : item.titleKey}
 <ChevronDown
 className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
 aria-hidden="true"
 />
 </button>

 {/* Dropdown Menu */}
 <div className="absolute top-full start-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
 <div className="bg-white border border-edge rounded-lg shadow-lg p-2 flex flex-col gap-1">
 {item.children.map((child) => (
 <div key={child.titleKey} className="flex flex-col">
 {child.href ? (
 <Link
 href={child.href}
 className={cn(
 'px-3 py-2 text-sm text-content-secondary hover:text-surface-brand-alt hover:bg-surface-hover rounded-md transition-colors',
 isActivePath(pathname, child.href)
 ? 'text-surface-brand-alt bg-surface-hover font-medium'
 : '',
 )}
 >
 {child.titleKey.includes('.')
 ? t(child.titleKey as Parameters<typeof t>[0])
 : child.titleKey}
 </Link>
 ) : (
 <div className="relative group/sub">
 <button
 type="button"
 className="w-full flex items-center justify-between px-3 py-2 text-sm text-content-secondary hover:text-content-brand-strong hover:bg-surface-hover rounded-md transition-colors"
 >
 <span>
 {child.titleKey.includes('.')
 ? t(child.titleKey as Parameters<typeof t>[0])
 : child.titleKey}
 </span>
 <ChevronRight className="h-4 w-4" />
 </button>

 {child.children && (
 <div className="absolute top-0 start-full ms-1 w-56 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-[120]">
 <div className="bg-white border border-edge rounded-lg shadow-lg p-2 flex flex-col gap-1">
 {child.children.map(
 (subChild) =>
 subChild.href && (
 <Link
 key={subChild.titleKey}
 href={subChild.href}
 className={cn(
 'px-3 py-2 text-sm text-content-secondary hover:text-surface-brand-alt hover:bg-surface-hover rounded-md transition-colors',
 isActivePath(pathname, subChild.href)
 ? 'text-surface-brand-alt bg-surface-hover font-medium'
 : '',
 )}
 >
 {subChild.titleKey.includes('.')
 ? t(subChild.titleKey as Parameters<typeof t>[0])
 : subChild.titleKey}
 </Link>
 ),
 )}
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </div>
 );
 }

 return (
 <Link
 key={item.titleKey}
 href={item.href || '/'}
 className={cn(
 'px-3 py-2 text-sm font-medium transition-colors',
 isActive 
 ? (isTransparent ? 'text-white' : 'text-surface-brand-alt')
 : (isTransparent ? 'text-white/80 hover:text-white' : 'text-content-secondary hover:text-surface-brand-alt')
 )}
 >
 {item.titleKey.includes('.')
 ? t(item.titleKey as Parameters<typeof t>[0])
 : item.titleKey}
 </Link>
 );
 })}
 </nav>

 {/* Desktop Actions */}
 <div className="hidden xl:flex items-center gap-4">
 <a
 href={siteConfig.loginUrl}
 className={cn(
 'text-sm font-medium transition-colors px-3 py-2',
 isTransparent
 ? 'text-white hover:text-white/80'
 : 'text-content-secondary hover:text-content-brand-strong'
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
 : 'text-content-secondary hover:text-content-brand-strong'
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
