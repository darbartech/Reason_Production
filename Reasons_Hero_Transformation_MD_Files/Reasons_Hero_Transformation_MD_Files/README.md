# Reasons Education — Hero Transformation Documentation

This pack is tailored to the supplied `src.zip` project. It defines a controlled, phase-by-phase transformation of hero sections across the public website without redesigning the whole site.

## Files
1. `01_EXISTING_HERO_AUDIT.md` — code-level audit and page inventory.
2. `02_TARGET_DESIGN_SYSTEM.md` — the shared visual and UX standard for hero sections.
3. `03_PAGE_BY_PAGE_HERO_PLAN.md` — distinct hero treatment for each route family.
4. `04_IMPLEMENTATION_PHASES.md` — safe implementation order, technical constraints, and acceptance checks.
5. `05_MASTER_IMPLEMENTATION_PROMPT.md` — copy/paste prompt to give your coding agent with this folder.

## How to use
1. Copy this folder into the root of the existing project.
2. Give the coding agent `05_MASTER_IMPLEMENTATION_PROMPT.md` and instruct it to read all the other files first.
3. Implement one phase at a time and run the project checks after each phase.
4. Review the home page and one route from each page family at desktop and mobile widths before proceeding.

## Important scope rule
The source archive permits a code-level audit of hero components and route usage, but not a verified live-browser visual review. The audit below distinguishes observed implementation facts from design recommendations. Do not claim a visual issue is confirmed unless it is verified in the running site.
