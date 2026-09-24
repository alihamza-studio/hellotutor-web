'use client';

import { useState, useEffect, useRef } from 'react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { useLocale } from 'next-intl';
import { phoneInputMessages } from '@/i18n/phone-input';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputBase =
  'w-full rounded-xl border bg-surface-base px-4 py-3 text-body-base text-content outline-none transition-colors placeholder:text-content-disabled focus:border-edge-focus focus:ring-1 focus:ring-edge-focus';

const isoPlaceholderMap: Record<string, string> = {
  AE: '55 123 4567',
  SA: '55 123 4567',
  KW: '55 123 456',
  QA: '55 123 456',
  BH: '55 123 456',
  OM: '55 123 456',
  EG: '100 123 4567',
  GB: '7700 900 000',
  US: '123 456 7890',
  IN: '98765 43210',
  PK: '300 123 4567',
  TR: '530 123 4567',
  CN: '138 0013 8000',
  DE: '1512 3456789',
  FR: '6 12 34 56 78',
  IT: '312 345 6789',
  ES: '612 34 56 78',
  NL: '6 12345678',
  BE: '470 12 34 56',
  CH: '79 123 45 67',
};

export function getPhonePlaceholder(iso: string): string {
  return isoPlaceholderMap[iso] ?? '55 123 4567';
}

/** Convert ISO country code to emoji flag */
function isoToFlag(iso: string): string {
  return iso
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join('');
}

interface CountryCodeItem {
  code: string;
  country: string;
  iso: string;
}

export function CountryCodeDropdown({
  value,
  countryIso,
  onChange,
}: {
  value: string;
  countryIso?: string;
  onChange: (code: string, countryIso: string) => void;
}) {
  const locale = useLocale();
  const labels = phoneInputMessages[locale === 'ae-ar' ? 'ae-ar' : 'ae-en'];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<CountryCodeItem[]>([
    { code: '+971', country: 'United Arab Emirates', iso: 'AE' },
  ]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/leads/country-codes', {
      signal: AbortSignal.timeout(10000),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Country codes unavailable');
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data);
        } else {
          throw new Error('Invalid country codes');
        }
      })
      .catch(() => {
        // Keep all supported countries available during an API outage.
        const names = new Intl.DisplayNames([locale === 'ae-ar' ? 'ar' : 'en'], { type: 'region' });
        setItems(
          getCountries()
            .map((iso) => ({
              iso,
              code: `+${getCountryCallingCode(iso)}`,
              country: names.of(iso) || iso,
            }))
            .sort((a, b) =>
              a.iso === 'AE' ? -1 : b.iso === 'AE' ? 1 : a.country.localeCompare(b.country),
            ),
        );
      })
      .finally(() => setLoading(false));
  }, [locale]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open]);

  const filtered = items.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return item.country.toLowerCase().includes(q) || item.code.toLowerCase().includes(q);
  });

  const selected = items.find((i) => (countryIso ? i.iso === countryIso : i.code === value));

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          containerRef.current?.querySelector('button')?.focus();
        }
      }}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-label={labels.countryCode}
        aria-expanded={open}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              setSearch('');
              setTimeout(() => inputRef.current?.focus(), 10);
            }
            return next;
          });
        }}
        className={cn(
          inputBase,
          'inline-flex items-center gap-2 pe-8 ps-3 py-3 cursor-pointer border-edge min-w-[120px] select-none',
        )}
      >
        {selected ? (
          <>
            <span className="text-base">{isoToFlag(selected.iso)}</span>
            <span className="text-body-sm font-medium text-content">{selected.code}</span>
          </>
        ) : (
          <span className="text-body-sm text-content-disabled">+971</span>
        )}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-content-tertiary absolute end-2.5 top-1/2 -translate-y-1/2 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute start-0 z-50 mt-2 w-64 max-w-[calc(100vw-6rem)] bg-surface-base rounded-2xl border border-edge shadow-xl overflow-hidden"
          >
            {/* Search */}
            <div className="p-3 border-b border-edge-subtle">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={labels.search}
                  aria-label={labels.search}
                  className={cn(inputBase, 'pr-3 pl-9 py-2.5 text-body-sm border-edge')}
                />
                <svg
                  className="w-4 h-4 text-content-tertiary absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto p-1.5">
              {loading ? (
                <div className="py-8 text-center text-body-sm text-content-secondary">
                  {labels.loading}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-8 text-center text-body-sm text-content-secondary">
                  {labels.empty}
                </div>
              ) : (
                filtered.map((item) => {
                  const isSelected = countryIso ? item.iso === countryIso : item.code === value;
                  return (
                    <button
                      key={`${item.iso}-${item.code}`}
                      type="button"
                      onClick={() => {
                        onChange(item.code, item.iso);
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-colors',
                        isSelected ? 'bg-surface-alt' : 'hover:bg-surface-strong',
                      )}
                    >
                      <span className="text-xl shrink-0">{isoToFlag(item.iso)}</span>
                      <span className="flex-1 text-body-sm text-content truncate">
                        {item.country} <span className="text-content-secondary">({item.code})</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-surface-brand shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
