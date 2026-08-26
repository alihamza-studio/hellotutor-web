'use client';

import { useTranslations } from 'next-intl';

export function TopBar() {
  const t = useTranslations('topBar');

  return (
    <aside
      aria-label="Event announcement"
      className="bg-green-950 text-white text-xs sm:text-sm py-2 px-4 relative z-[110]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-2.5 text-center flex-wrap">
        <svg
          width="18"
          height="21"
          viewBox="0 0 23 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 h-4.5 w-auto"
          aria-hidden="true"
        >
          <path
            d="M14 20C14 23.866 10.866 27 7 27C3.13401 27 0 23.866 0 20C0 16.134 3.13401 13 7 13C10.866 13 14 16.134 14 20Z"
            fill="#3C8CCC"
          />
          <path
            d="M23 10.5C23 16.299 18.299 21 12.5 21C6.70101 21 2 16.299 2 10.5C2 4.70101 6.70101 0 12.5 0C18.299 0 23 4.70101 23 10.5Z"
            fill="#E11E28"
          />
          <path
            d="M7 13C10.866 13 14 16.134 14 20C14 20.3046 13.9772 20.6041 13.9395 20.8984C13.4687 20.963 12.9885 21 12.5 21C8.09049 21 4.31841 18.2808 2.7627 14.4287C3.93903 13.5327 5.40714 13 7 13Z"
            fill="#6D3239"
          />
        </svg>

        <span className="text-white/95 font-medium">{t('text')}</span>

        <span className="text-white/60 mx-0.5 hidden sm:inline" aria-hidden="true">
          -
        </span>

        <a
          href="https://calendly.com/hellotutor/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors whitespace-nowrap"
        >
          {t('cta')}
        </a>
      </div>
    </aside>
  );
}
