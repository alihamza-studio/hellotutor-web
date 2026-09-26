# Magrudy marketing feedback — 26 September 2026

Base: a1fa6d2c17e9c12b21b1a42058ecbefe666e62de. Scope: partnership page and its English/Arabic copy. User authorised release to staging (`test`) and `main` after local review.

Applied the supplied marketing feedback, including the subsequently supplied Magrudy 50-year SVG logo above the hero heading. Reused TrustBadge, HeroProof and the current page sections. Added a reusable plain-text TextTerms section. Shared feature/timeline subtitles are now optional; existing translated subtitles still render on other pages.

Copy decisions: use “free baseline test” consistently, including metadata and the lead message. Step one asks for contact details first and explains that year group, curriculum and subject are discussed during the callback, since those form fields were removed. Retained essential descriptions and consent; removed decorative secondary labels and subject lists. Marketing's six replacement clauses replace the previous seven clauses.

Before: partnership pill, promotional eyebrows, three Ways to learn entries, numbered terms and six form inputs/groups. After: trust badge, four proof statements, two learning options, plain terms, and three required inputs (parent name, email, UAE mobile).

Verification:
- Pass: TypeScript, focused ESLint, production build, git diff whitespace check. Build reports existing middleware convention deprecation.
- Pass: English desktop hero and Arabic desktop hero visually inspected in the local browser; badge, offer and proof render correctly. Arabic required input labels present; no missing-translation logs.
- Pass: 390px phone form and plain terms visually inspected; 768px tablet terms/form inspected. Document width matches viewport at 390, 768 and 1280px.
- Pass: form exposes only three required inputs; invalid UAE mobile displays a localised error, focuses the mobile input and preserves entered values. No real lead was submitted.
- Unverified: live API acceptance, pending/success and server-error behaviour in this review. Existing acknowledgement, duplicate-submit protection and error handling retained.
- Pass: supplied logo retains its original artwork and proportions at desktop and 390px phone widths, with English and Arabic alternative text. Focused ESLint and TypeScript checks passed after adding it.

Follow-up layout: moved the proof and trust badge into one grid block. On mobile the sequence is CTA, ratings, MOHRE/DBS, offer card; desktop keeps the offer beside the headline with ratings then badge underneath. Visually verified at 1280px and 390px; focused ESLint and whitespace checks passed.

Metadata follow-up: user reconfirmed the exact meta description using “free diagnostic assessment”. Applied that wording to metadata in both locales; visible page copy retains “free baseline test”. Title already matches the supplied title.

Release checks: final production build (including TypeScript), focused ESLint and git diff whitespace checks passed. Remote main and test were checked before committing. Live lead API acceptance remains unverified; no customer enquiry was created during verification.
