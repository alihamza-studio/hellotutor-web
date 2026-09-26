'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const inputClass =
  'w-full rounded-xl border border-edge bg-surface-base px-4 py-3 text-body-base text-content outline-none focus:border-edge-focus focus:ring-1 focus:ring-edge-focus';

export function PartnerOfferForm() {
  const t = useTranslations('magrudy.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const value = (key: string) => String(fields.get(key) || '').trim();
    setError('');
    if (!value('fullName') || !value('email')) {
      setError(t('requiredError'));
      return;
    }
    const phone = parsePhoneNumberFromString(value('phoneNumber'), 'AE');
    // The partnership accepts UAE mobile numbers only, in local or +971 format.
    if (!phone?.isValid() || phone.country !== 'AE' || !phone.nationalNumber.startsWith('5')) {
      setError(t('phoneError'));
      form.querySelector<HTMLInputElement>('[name="phoneNumber"]')?.focus();
      return;
    }
    submitting.current = true;
    setStatus('submitting');
    try {
      // Preserve the existing lead API contract. Partnership details travel in
      // the message so coordinators can apply the offer without new API fields.
      const response = await fetch('https://api.hellotutor.me/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          fullName: value('fullName'),
          email: value('email'),
          phoneCountryCode: '+971',
          phoneNumber: phone.nationalNumber,
          preferredContact: ['phone'],
          message: [
            "Magrudy's partnership offer: 10% off the first 3, 6 or 9 month term and a free 30-minute baseline test.",
            'Source: /partners/magrudy',
            'Parent agreed to be contacted about this enquiry.',
          ].join('\n'),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success === false || (response.status !== 204 && !data)) {
        setError(t('error'));
        setStatus('idle');
        return;
      }
      setStatus('success');
    } catch {
      setError(t('networkError'));
      setStatus('idle');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="bg-surface-base rounded-3xl p-6 md:p-8 lg:p-10 border border-edge-subtle">
      {status === 'success' ? (
        <div role="status" className="py-10 text-center">
          <CheckCircle2
            className="w-12 h-12 text-content-success mx-auto mb-6"
            aria-hidden="true"
          />
          <h3 className="text-h3 text-content mb-4">{t('successTitle')}</h3>
          <p className="text-body-lg text-content-secondary">{t('success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === 'submitting'}>
          <fieldset disabled={status === 'submitting'} className="space-y-6">
            <div>
              <label
                htmlFor="partner-name"
                className="block text-body-sm font-medium text-content mb-2"
              >
                {t('name')} *
              </label>
              <input
                id="partner-name"
                name="fullName"
                autoComplete="name"
                required
                maxLength={150}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="partner-email"
                className="block text-body-sm font-medium text-content mb-2"
              >
                {t('email')} *
              </label>
              <input
                id="partner-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                dir="ltr"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="partner-phone"
                className="block text-body-sm font-medium text-content mb-2"
              >
                {t('phone')} *
              </label>
              <div className="flex gap-2">
                <div
                  dir="ltr"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-edge bg-surface-base px-4 py-3 text-body-sm font-medium text-content"
                >
                  <span aria-hidden="true">🇦🇪</span>
                  <span>+971</span>
                </div>
                <input
                  id="partner-phone"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel-national"
                  required
                  maxLength={25}
                  placeholder="55 123 4567"
                  dir="ltr"
                  className={`${inputClass} min-w-0 flex-1`}
                />
              </div>
            </div>
          </fieldset>
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-surface-danger-light p-4 text-body-sm text-content-danger"
            >
              {error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full">
            {status === 'submitting' && (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            )}
            {t(status === 'submitting' ? 'submitting' : 'submit')}
          </Button>
          <p className="text-body-xs text-content-tertiary">{t('consent')}</p>
        </form>
      )}
    </div>
  );
}
