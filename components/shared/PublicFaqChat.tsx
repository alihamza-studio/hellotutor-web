'use client';

import { Send, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import styles from './PublicFaqOrb.module.css';

const copy = {
  'ae-en': {
    launch: 'Chat with HelloTutor',
    title: 'HelloTutor Assistant',
    greeting: 'Hi! I can help with questions about tutoring in the UAE.',
    starters: ['How does HelloTutor work?', 'Is registration free?', 'How does pricing work?'],
    close: 'Close chat',
    input: 'Type your question',
    send: 'Send question',
    loading: 'Checking...',
    error: 'I couldn’t connect. Try again or contact HelloTutor.',
    retry: 'Try again',
    contact: 'Contact HelloTutor',
    privacy: 'Please leave out account and payment details.',
  },
  'ae-ar': {
    launch: 'دردشة مع HelloTutor',
    title: 'مساعد HelloTutor',
    greeting: 'أهلًا! يمكنني مساعدتك في أسئلتك عن الدروس الخصوصية في الإمارات.',
    starters: ['كيف يعمل HelloTutor؟', 'هل التسجيل مجاني؟', 'كيف يتم تحديد الأسعار؟'],
    close: 'إغلاق الدردشة',
    input: 'اكتب سؤالك',
    send: 'إرسال السؤال',
    loading: 'جارٍ التحقق...',
    error: 'تعذّر الاتصال. حاول مرة أخرى أو تواصل مع HelloTutor.',
    retry: 'حاول مرة أخرى',
    contact: 'تواصل مع HelloTutor',
    privacy: 'يرجى عدم إدخال بيانات الحساب أو الدفع.',
  },
};

type Locale = keyof typeof copy;
type Answer = { answer: string; sources: { title: string; url: string }[] };
type Turn = { question: string; page: string; result?: Answer; failed?: boolean };

export function PublicFaqChat({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const page = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const requestInFlight = useRef(false);
  const [draft, setDraft] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const panel = log.current;
    if (dialog.current?.open && panel) panel.scrollTop = panel.scrollHeight;
  }, [turns, pending]);

  function open() {
    dialog.current?.showModal();
    const panel = log.current;
    if (panel) panel.scrollTop = panel.scrollHeight;
  }

  async function ask(text: string, retryIndex?: number) {
    const question = text.trim();
    if (!question || requestInFlight.current) return;
    requestInFlight.current = true;
    const index = retryIndex ?? turns.length;
    const sourcePage = turns[index]?.page ?? page;
    setTurns((previous) =>
      retryIndex === undefined
        ? [...previous, { question, page: sourcePage }]
        : previous.map((turn, i) => i === index ? { question, page: sourcePage } : turn),
    );
    if (retryIndex === undefined) setDraft('');
    input.current?.focus();
    setPending(true);
    try {
      const response = await fetch('/api/public-faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, locale, page: sourcePage }),
      });
      if (!response.ok) throw new Error('Public assistant unavailable');
      const result: Answer = await response.json();
      setTurns((previous) => previous.map((turn, i) => i === index ? { question, page: sourcePage, result } : turn));
    } catch {
      setTurns((previous) => previous.map((turn, i) => i === index ? { question, page: sourcePage, failed: true } : turn));
    } finally {
      requestInFlight.current = false;
      setPending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  return (
    <>
      <button
        ref={launcher}
        type="button"
        aria-label={t.launch}
        aria-haspopup="dialog"
        onClick={open}
        className={`${styles.orb} fixed bottom-4 right-4 z-50 size-14 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface-brand-alt lg:bottom-8 lg:left-8 lg:right-auto`}
      />
      <dialog
        ref={dialog}
        aria-labelledby="public-chat-title"
        onClose={() => launcher.current?.focus()}
        className="fixed inset-auto bottom-4 right-4 m-0 max-h-none w-[calc(100%-2rem)] max-w-[24rem] overflow-hidden rounded-2xl border border-neutral-300 bg-surface-base p-0 text-content shadow-2xl backdrop:bg-content/25 sm:bottom-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-auto"
      >
        <div className="flex h-[min(34rem,calc(100dvh-2rem))] flex-col">
          <header className="flex items-center gap-3 border-b border-neutral-300 bg-neutral-100 px-4 py-2.5">
            <h2 id="public-chat-title" className="flex-1 text-base leading-6 font-semibold">{t.title}</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="size-10 shrink-0 rounded-full px-0"
              aria-label={t.close}
              onClick={() => dialog.current?.close()}
            >
              <X aria-hidden="true" size={20} />
            </Button>
          </header>
          <div ref={log} role="log" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm leading-[1.6]">
            <p className="me-5 w-fit rounded-2xl bg-surface p-3">{t.greeting}</p>
            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {t.starters.map((starter) => (
                  <Button
                    key={starter}
                    size="sm"
                    variant="outline"
                    className="h-auto min-h-10 whitespace-normal rounded-full border-neutral-300 px-3 py-2 text-start text-xs leading-[1.5]"
                    onClick={() => void ask(starter)}
                  >
                    {starter}
                  </Button>
                ))}
              </div>
            )}
            {turns.map((turn, index) => (
              <div key={index} className="space-y-3">
                <p dir="auto" className="ms-auto w-fit max-w-[88%] whitespace-pre-wrap break-words rounded-2xl bg-surface-action p-3">
                  {turn.question}
                </p>
                {turn.result && (
                  <div className="me-5 w-fit break-words rounded-2xl bg-surface p-3">
                    <p>{turn.result.answer}</p>
                    {turn.result.sources.map((source) => (
                      <a key={source.url} href={source.url} className="mt-2 block text-xs leading-[1.5] font-semibold underline">
                        {source.title}
                      </a>
                    ))}
                  </div>
                )}
                {turn.failed && (
                  <div role="alert" className="me-5 rounded-2xl bg-surface p-3">
                    <p>{t.error}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="outline" className="border-neutral-300" disabled={pending} onClick={() => void ask(turn.question, index)}>
                        {t.retry}
                      </Button>
                      <a href={`/${locale}/contact`} className="text-xs leading-[1.5] font-semibold underline">{t.contact}</a>
                    </div>
                  </div>
                )}
                {pending && !turn.result && !turn.failed && (
                  <p className="me-5 w-fit rounded-2xl bg-surface p-3 text-content-secondary">{t.loading}</p>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="border-t border-neutral-300 p-4">
            <div className="flex items-center gap-2">
              <input
                ref={input}
                aria-label={t.input}
                aria-describedby="public-chat-privacy"
                placeholder={t.input}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="h-12 min-w-0 flex-1 rounded-full border border-neutral-300 bg-surface-base px-4 text-sm leading-5 focus-visible:outline-2 focus-visible:outline-edge-focus"
                dir="auto"
                autoComplete="off"
                maxLength={400}
              />
              <Button type="submit" aria-label={t.send} disabled={pending || !draft.trim()} className="size-12 shrink-0 rounded-full px-0">
                <Send aria-hidden="true" size={19} className={locale === 'ae-ar' ? '-scale-x-100' : undefined} />
              </Button>
            </div>
            <p id="public-chat-privacy" className="mt-2 text-xs leading-[1.5] text-content-secondary">{t.privacy}</p>
          </form>
        </div>
      </dialog>
    </>
  );
}
