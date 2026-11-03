# Implementation Checklist - Reasons Education Production Hardening

## P0 - MUST FIX BEFORE PRODUCTION
- [ ] 1. Company identity unified in company config and all references consistent
- [ ] 2. Remove outdated/unsafe Canada immigration info; clean blog post 1
- [ ] 3. Remove temporary Unsplash production imagery (move to structured content or local)
- [ ] 4. Fix inconsistent company identity across codebase
- [ ] 5. Fix visible content/typo issues
- [ ] 6. Verify production build works
- [ ] 7. Add reliable TypeScript check (npm run typecheck exists)
- [ ] 8. Review production environment configuration (.env.example)
- [ ] 9. Verify Nginx/reverse-proxy behavior and client IP handling (TRUST_PROXY)
- [ ] 10. Verify enquiry API security and validation
- [ ] 11. Verify all legal/regulated content before publication

## P1 - SHOULD FIX BEFORE SERIOUS MARKETING
- [ ] 1. Self-host and optimize images
- [ ] 2. Centralize content
- [ ] 3. Centralize company URL/identity
- [ ] 4. Centralize JSON-LD handling
- [ ] 5. Add bot protection (Cloudflare Turnstile)
- [ ] 6. Add PostgreSQL indexes - already added in migrate.js
- [ ] 7. Harden session lifecycle
- [ ] 8. Improve enquiry duplicate protection
- [ ] 9. Improve accessibility (mobile nav + enquiry form)
- [ ] 10. Add CI validation
