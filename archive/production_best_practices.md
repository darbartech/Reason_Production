# production_best_practices.md
### How to Avoid These Mistakes Going Forward — Reason Education Consultancy

This is a prevention guide, not another bug list. Across three audit rounds, the same categories of mistakes kept reappearing even after partial fixes — a placeholder gets fixed on one page but not its twin on another, a form looks fixed in the UI but was never actually wired to a backend. This document explains *why* each category keeps happening and gives a concrete rule to stop it recurring, so future changes don't reintroduce the same issues.

---

## 1. "Fixed on one page, forgotten on its twin"

**Pattern observed:** the Contact form's email placeholder was fixed to a Nepali example, but the B2B form's identical field was missed. The "Baneswor" spelling was fixed everywhere at once — because it was fixed with a sitewide search, not a manual edit.

**Why it happens:** fixes get applied to the page currently open, not to every place the same pattern exists.

**Rule going forward:**
- Never fix a placeholder, label, or copy string by editing one file. First **grep the whole `src/` directory** for the exact string (e.g. `john@example.com`, `John Doe`) and fix every match in the same commit.
- Any text string that appears in more than one form (name, email, phone examples) should be pulled into a single shared constants file (e.g. `src/lib/formPlaceholders.ts`) and imported everywhere, so it can only ever be fixed once, in one place.

---

## 2. "Looks fixed in the UI, but the backend was never touched"

**Pattern observed:** the contact form has correct Nepali placeholders, real-looking validation, and a polished success toast — but the actual submit handler still just does `console.log(...)`. It looks completely finished from the outside.

**Why it happens:** frontend polish (copy, placeholders, styling, toasts) is fast and visible, so it naturally gets attention first. The backend wiring is invisible in a screenshot and easy to defer indefinitely.

**Rule going forward:**
- Treat "does the form actually deliver data somewhere real" as a separate, explicitly tracked task from "does the form look right" — never assume one implies the other.
- Before calling any form "done," manually submit it and verify the data arrives somewhere real (inbox, CRM, database) — not just that a success message appears. A success message proves the UI works, not that the backend does.
- For a static-export Next.js site specifically: since there's no built-in server, the form **must** call an external endpoint (a serverless function, or a form-relay service like Web3Forms/Formspree/Resend). Decide and implement this before writing any client-side "success" UI, not after.

---

## 3. Placeholder / stock content that quietly survives multiple review passes

**Pattern observed:** `john@example.com` survived two full audit rounds because it was assumed fixed once the *name* placeholder was fixed — the email field right next to it was never independently checked.

**Rule going forward:**
- Never assume a category of fix ("placeholders are Nepali now") is complete based on fixing one instance. Verify with a search across **every field type** (name, email, phone, address, company, message) on **every form**, not just the form you were actively editing.
- Before launch, run one final sweep across the whole build for known red-flag strings: `john`, `jane`, `example.com` (non-Gmail), `lorem`, `123 Main`, `+1 `, `New York`. This takes two minutes and catches anything missed.

---

## 4. Domain / identity inconsistency (NAP: Name, Address, Phone)

**Pattern observed:** `studynepal.edu.np` is hardcoded into metadata, schema, canonical tags, sitemap, and robots.txt across all 13 pages, while the real contact email uses a different domain (`reasons.edu.np`).

**Why it happens:** the domain gets typed once early in a template (`metadataBase` in `layout.tsx`, `Schema.tsx`) before the real production domain is finalized, and never gets revisited once it is.

**Rule going forward:**
- **Decide the real, registered production domain before writing any metadata, schema, or SEO code** — not after. Domain, business name spelling, and address format should be locked as constants on day one of a project, in one config file, and every component should reference that file rather than hardcoding the domain again.
- Whenever the domain is genuinely finalized or changed, grep the entire codebase for the old domain string and confirm zero remaining matches — the same rule as §1.
- This matters more than it looks: once Google indexes pages under a domain that doesn't match your real business identity, that's expensive to unwind. Get this right before the first deploy, not after.

---

## 5. Stock/placeholder imagery treated as "temporary" but shipped to production

**Pattern observed:** every content image on the site — hero, team photos, country pages, blog — is hotlinked directly from Unsplash, including real staff names (Rudesh Khadgi, Roji Barnawa, etc.) paired with random stock headshots. `images.unoptimized: true` is also still set, so Next.js's image optimization is fully off.

**Why it happens:** stock photos are a reasonable placeholder *during development* to see the layout — the risk is they get treated as "close enough" and never get swapped for real photography before launch, especially because doing so requires a photo shoot, not just code.

**Rule going forward:**
- Track real photography as its own checklist item with an owner and a deadline **from the start of the project**, not as an afterthought once the code is "done." Code being finished does not mean the site is launch-ready if the imagery is still placeholder.
- Never pair a stock photo with a real, named individual (staff bios, testimonials). If a real photo isn't available yet, use a generic icon/initials avatar instead of a mismatched stock face — a placeholder that looks like a placeholder is honest; a stock photo pretending to be a real person is what breaks trust.
- Once real images exist: self-host them, convert to WebP, and set `images.unoptimized: false` in `next.config.mjs` so Next.js's built-in optimization (responsive sizing, lazy loading, compression) actually runs. Hotlinking a third party's CDN for your own site's core content is both a performance and a reliability risk (their image can disappear or change at any time).

---

## 6. SEO metadata written once, never re-checked as content grew

**Pattern observed:** page titles now duplicate the brand name twice ("About Us | Reason Education Consultancy Kathmandu | Reason Education Consultancy") because a template auto-appends the site name to a title that already included it. Several meta descriptions run 200+ characters, well past what Google displays.

**Why it happens:** a title/description template gets set up once, early, and individual pages add their own brand mention without checking what the template already adds — the duplication compounds silently across every new page.

**Rule going forward:**
- Decide the title template **once** (e.g. `%s | Reason Education Consultancy`) and document it (a one-line comment in `layout.tsx` is enough), then make sure every page's own title string does *not* re-include the brand name — the template already adds it.
- Keep meta descriptions under ~155 characters as a hard rule, checked at the time each page is written — not batch-checked after 13 pages are already live.
- When adding any new page, copy the pattern from the *most recently audited* page, not an older one — templates drift over time, and copying an old page silently propagates old mistakes into new pages.

---

## 7. Broken assets that silently ship (e.g. 0-byte image files)

**Pattern observed:** `students/sarana.jpg` is a 0-byte empty file that shipped all the way to the production build undetected.

**Why it happens:** an image gets added to the repo (e.g. via a bad export, a failed upload, or a placeholder file created and never filled) and nothing in the build process checks that image files are actually non-empty and renderable.

**Rule going forward:**
- Before every deploy, visually load every page in a browser and check the network tab for any failed (red) image requests — this takes a few minutes and catches broken files that pass a code review but fail visually.
- Add a simple pre-deploy check: any file under `public/` should be non-zero bytes. This can be a one-line script (`find public -size 0`) run before every build.

---

## 8. General process fix: a real pre-launch checklist, run as a whole, not per-fix

The single biggest reason the same mistakes kept resurfacing is that fixes were applied **reactively, one review round at a time**, rather than checked against one master list before each deploy. Adopt this order for every future release:

1. **Search, don't spot-fix.** Any text/placeholder/domain fix gets grepped across the whole codebase before being marked done.
2. **Verify backends, not just UI.** Every form gets manually submitted and the data traced to where it's supposed to land — not just visually reviewed.
3. **Audit the build, not just the source.** Check the actual exported HTML/CSS/JS (`out/`), since that's what ships — source code can look fixed while the build still contains stale references.
4. **Run one final sweep before each deploy** for: leftover placeholder strings, broken (0-byte or 404) assets, domain consistency, and title/description length — each takes minutes and catches what individual fixes miss.
5. **Track "looks done" and "is done" separately.** Frontend polish (copy, styling) and backend functionality (forms actually sending, images actually real) are different kinds of "done" and should be checked independently before calling any feature complete.
