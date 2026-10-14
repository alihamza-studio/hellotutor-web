# School partnership rewrite — 14 October 2026

Base: 09c6946ba1e286f69f58c33acf6e4d49b443bbe3. Scope: schools page and translations, shared About navigation, metadata image-alt option, payment mark and footer emphasis. Existing page components, numbered benefits and semantic tokens retained. No shared environment changes, publishing or deployment.

Replaced the funded intervention offer with the supplied referral partnership copy, moved the four partnership steps directly after the introduction, removed the audience/pilot/impact sections and replaced the FAQs. English and Arabic describe the same offer. Primary actions use the existing WhatsApp number; the pack request uses support@hellotutor.me. The floating schools CTA now uses the partnership label. About links to the existing route on desktop and mobile.

Ziina vector paths sourced from https://ziina.com on 14 October 2026; recoloured through existing semantic tokens within the shared payment icon. Footer uses translated rich-text emphasis for tutor and difference.

Verification passed: production build (90 static pages), TypeScript, focused ESLint and whitespace checks. Initial sandboxed build could not fetch Google Fonts; network-enabled retry passed. Existing Next.js middleware deprecation warning remains.

Primary-session browser checks passed: English desktop 1440px, phone 390px and tablet 820px visual checks and no horizontal overflow; Arabic RTL at 820px; desktop and mobile About > For Schools navigation; desktop Enter/Escape disclosure behaviour; mobile referral FAQ expansion; WhatsApp/email hrefs; exact title/description/OG alt; correct section order and removed sections; footer italic emphasis and Ziina rendering. Fresh page load had no console errors. Earlier hot-refresh translation errors during edits did not recur after reload. No external messages sent. Form/loading/error submission states do not apply to this informational page.

Before: funded school intervention offer, five steps, eight FAQs, Stripe mark, plain footer tagline. After: referral partnership offer, four steps, five FAQs, Ziina mark, emphasised tagline. Local screenshots: /tmp/hello-tutor-schools-hero.png and /tmp/hello-tutor-schools-footer.png. Arabic wording has not had independent human linguistic review. Not deployed.

## Hover correction

The shared Button faded its normal label on hover at every viewport, but the replacement number used `hidden xl:flex`, leaving the button blank below 1280px. Removed that display breakpoint so both layers use the same hover condition at every width. This fixes both school CTAs and other buttons using the shared hover content. Focused ESLint, TypeScript and whitespace checks passed. Live hover re-verification was blocked by the browser tool's URL security policy when binding the localhost page; no workaround attempted. Visual hover acceptance remains pending.

## Site-wide CTA follow-up

Audited WhatsApp CTA call sites. Added missing hover numbers to the pricing-plan buttons and AllSubjectsList. CTASection only substitutes the number when its destination is WhatsApp; internal contact links retain their labels. Button now overlaps normal and hover content in a grid so the longer of the two determines its intrinsic width, avoiding clipping for short labels. No viewport display restriction remains.

Primary-session browser verification now supersedes the earlier pending hover acceptance. Both school buttons passed at confirmed window.innerWidth values 320, 390, 768, 1024, 1279, 1280, 1440 and 1920: actual :hover, opacity 1, display flex, correct full number and text bounds within the button. Shared CTA variants checked across home, pricing, subjects, about, how-it-works, contact, become-a-tutor, safety-and-trust, maths, music, primary tutors, Dubai and Arabic schools/pricing. Desktop sweep: 32 hover checks at confirmed 1440px, all passed. Narrow-window checks, mobile-menu hover and floating CTA at 1024px also passed. The contact details link displays its number permanently. An initially sampled animation frame on how-it-works reached opacity 1 on recheck. Early viewport requests against a background tab were not reliable; final desktop and eight-width school sweeps explicitly verified window.innerWidth.

Production build passed. A malformed generated .next/dev/types/validator.ts initially blocked standalone TypeScript; restarted the local dev server and regenerated that cache file. Local server remains running at http://localhost:3000. Hover proof: /tmp/hello-tutor-cta-hover-fixed.png. Touch-only devices have no hover; they retain the normal actionable label. No deployment performed.

## Final styling and release preparation

All four partnership step markers and all 15 family-benefit, safeguarding and curriculum card icons use 48px circles with the lighter `bg-surface-hover/50` token. Icons are 20px and retain their dark content colour; step numbers remain dark. Local browser inspection verified the icon dimensions and colours. Final production build, including TypeScript and all 90 static pages, passed; changed-file ESLint, translation-key parity and whitespace checks passed.

On 14 October 2026 the user explicitly authorised pushing these changes to staging and main. Repository staging branch is `test`. Fetched `origin/main` and `origin/test`; both were at base 09c6946ba1e286f69f58c33acf6e4d49b443bbe3 before release. The same commit is intended for both branches. Hosting deployment completion is separate from Git push verification.
