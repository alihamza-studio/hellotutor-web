'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { mainNav } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.endsWith(href);
}

export function DesktopNavigation({ isTransparent }: { isTransparent: boolean }) {
  const t = useTranslations();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const closeMenus = () => {
    setOpenMenu(null);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenus();
    };
    const onResize = () => closeMenus();
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !openMenu) return;
        event.preventDefault();
        if (openSubmenu) {
          navRef.current
            ?.querySelector<HTMLButtonElement>(`[data-submenu="${openSubmenu}"]`)
            ?.focus();
          setOpenSubmenu(null);
        } else {
          navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${openMenu}"]`)?.focus();
          closeMenus();
        }
      }}
      className="hidden xl:flex items-center gap-1"
      aria-label="Main navigation"
    >
      {mainNav.map((item) => {
        const isActive = item.href ? isActivePath(pathname, item.href) : false;

        if (item.children) {
          return (
            <div key={item.titleKey} className="relative">
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                  isTransparent
                    ? 'text-content-invert/80 hover:text-content-invert'
                    : 'text-content-secondary hover:text-content-brand-strong',
                )}
                data-menu={item.titleKey}
                aria-expanded={openMenu === item.titleKey}
                aria-controls={`desktop-${item.titleKey}`}
                onClick={() => {
                  setOpenMenu(openMenu === item.titleKey ? null : item.titleKey);
                  setOpenSubmenu(null);
                }}
              >
                {item.titleKey.includes('.')
                  ? t(item.titleKey as Parameters<typeof t>[0])
                  : item.titleKey}
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    openMenu === item.titleKey && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              <div
                id={`desktop-${item.titleKey}`}
                hidden={openMenu !== item.titleKey}
                className="absolute top-full start-0 pt-2 w-64 z-[110]"
              >
                <div className="bg-surface-base border border-edge rounded-lg shadow-lg p-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <div key={child.titleKey} className="flex flex-col">
                      {child.href ? (
                        <Link
                          onClick={closeMenus}
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
                        <div className="relative">
                          <button
                            type="button"
                            data-submenu={child.titleKey}
                            aria-expanded={openSubmenu === child.titleKey}
                            aria-controls={`desktop-${child.titleKey}`}
                            onClick={() =>
                              setOpenSubmenu(openSubmenu === child.titleKey ? null : child.titleKey)
                            }
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-content-secondary hover:text-content-brand-strong hover:bg-surface-hover rounded-md transition-colors"
                          >
                            <span>
                              {child.titleKey.includes('.')
                                ? t(child.titleKey as Parameters<typeof t>[0])
                                : child.titleKey}
                            </span>
                            <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                          </button>

                          {child.children && (
                            <div
                              id={`desktop-${child.titleKey}`}
                              hidden={openSubmenu !== child.titleKey}
                              className="absolute top-0 start-full ps-1 w-56 z-[120]"
                            >
                              <div className="bg-surface-base border border-edge rounded-lg shadow-lg p-2 flex flex-col gap-1">
                                {child.children.map(
                                  (subChild) =>
                                    subChild.href && (
                                      <Link
                                        onClick={closeMenus}
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
            onClick={closeMenus}
            key={item.titleKey}
            href={item.href || '/'}
            className={cn(
              'px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? isTransparent
                  ? 'text-content-invert'
                  : 'text-surface-brand-alt'
                : isTransparent
                  ? 'text-content-invert/80 hover:text-content-invert'
                  : 'text-content-secondary hover:text-surface-brand-alt',
            )}
          >
            {item.titleKey.includes('.')
              ? t(item.titleKey as Parameters<typeof t>[0])
              : item.titleKey}
          </Link>
        );
      })}
    </nav>
  );
}
