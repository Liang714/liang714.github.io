# Architecture decisions

Short records of the choices that shape this site, and why. The product facts live in `PRODUCT.md`; the visual
system lives in `DESIGN.md`.

## Stack: React, TypeScript, Vite, plain CSS

A static single-page app: one long home page and seven detail routes. The brief asked for a maintainable,
component-driven site with no backend, so the stack stays small: React and React Router for rendering and routing,
Vite for the build, Vitest for tests, GSAP for the first-screen demo and Lenis for smooth scrolling. There is no UI
kit; every component is drawn for this site. The home bundle is about 97 kB gzipped (React, the router, the content
and the rule engine). GSAP (27 kB) and Lenis (5 kB) load after the page has painted, so the name and the text do not
wait for them.

## Content is typed data, separate from presentation

Anything personal or factual lives in two places and nowhere else:

- `src/config/site.ts` — name, links, navigation, and a `confirmed` checklist for wording that still needs the
  owner's approval.
- `src/content/` — projects, the technology schedule and the record of revisions, all typed by `types.ts`.

Components render this data and never contain facts of their own. Build scripts import the same TypeScript files
(Node runs erasable TypeScript natively), so page titles and descriptions cannot drift from page content.
`npm run content:check` lists unfilled placeholders.

## One HTML file per route, written at build time

GitHub Pages serves static files and has no rewrite rules, so a client-only router would break direct visits and give
every page the same title. `scripts/postbuild.mjs` therefore writes a real `index.html` for each route, with its own
title, description, canonical URL and social tags, plus `404.html`, `sitemap.xml`, `robots.txt` and `.nojekyll`. The
React app then takes over. Each detail page is a lazy chunk, preloaded on its own route, so the home page does not pay for them.

The base path comes from `BASE_PATH` (and the absolute origin from `SITE_URL`), so the same build works at the root of
a user site or under a project subpath. CI derives both from the repository name.

## The simulator is a pure module with its own tests

`src/playground/` re-implements the stage order and policy rules of a private Python project, the capability broker in
`personal-computer-agent`. It is deliberately independent of React: `engine.ts` is a pure function from
`{config, proposal, approval}` to a trace, so the same input always gives the same output and 40 unit tests pin the
behaviour (stage order, risk escalation at ten targets, containment, symlinks, Unicode normalisation, the trust fence,
the append-only log).

Two parts of the site use it. The full simulator at `/gate/` lets a visitor change any request and rule. The
first-screen demo (`src/gate/`) sends five fixed requests through the same engine: `playground/demo.ts` takes every
verdict from the engine's own output, and `demo.test.ts` fails if the words on screen ever disagree with it. The
Agent core exhibit on the home page shows a real ruling from the same trace. Each request carries a plain label ("Delete 12 drafts") and the word on the gate (Allowed, Held, Denied) comes from the engine's verdict; a test keeps the labels short enough to fit beside the gate on a phone.

It is a simulation and says so wherever it appears. No model runs, nothing is sent anywhere, and file contents shown in
it are synthetic. Two details were checked against the original code rather than assumed: path containment runs
inside the tool at the execute stage (after approval and budget), and the budget stage writes no event row.

## Evidence rules

- Private repositories are labelled private; nothing implies code can be read when it cannot.
- Each result sits beside its sample size and its limits, marked with a shape and a word.
- Work that is not finished is on the Work page under "In progress", and every case study ends with what is not built.
- The technology schedule says where each technology was used, and separates earlier work from current work. There are
  no proficiency percentages.
- Dates in the record come from commit history or file dates, so each row can be checked.
- Robin's exhibit on the home page draws the numbers in the case study; a test compares the two.

## Visual system in brief

The name is set as a monument and the owner's gate is the picture. Graphite ground, one cobalt field, one pale field,
and safety orange for the single action. One typeface (Chivo). No shadows, gradients or hairlines; depth is a step in
tone. State is always a shape and a word, never colour alone. Full detail in `DESIGN.md`.

## Scrolling and motion

Smooth scrolling is Lenis, driven from the GSAP ticker, and it is optional: under `prefers-reduced-motion` it is not
created and the browser scrolls natively. Anchor and route changes go through one function (`lib/scroll.ts`), which
recalculates the page height first so a jump to a section of a taller page lands where it should. Parts of a section
rise once, by scroll position rather than by intersection, so a jump that skips a section never leaves it hidden.
Interests and project names brighten as they cross the middle of the screen. The project names pass a pinned square only on wide screens; below 900px the pinned layout would hide its own words, so each project becomes a card (name, picture, then the result and its limit) and nothing is pinned. The name rises once in CSS. The gate demo
plays four requests on its own and then stops; a visitor can pause it or take over, and under reduced motion nothing
travels and each ruling simply appears.

## Accessibility approach

Semantic landmarks and one `h1` per page; a skip link; focus moved to the target after in-app navigation; visible
focus rings on every ground; keyboard-operable gate controls with focus handed to the decision and back; live regions
for the demo that stay silent while it plays by itself; scrollable tables, diagrams and code are keyboard-reachable;
every diagram has a text alternative; touch targets are 44px or larger. ESLint's `jsx-a11y` rules run in CI.

## Deployment

`.github/workflows/deploy.yml` runs the type check, lint and tests, builds with the right base path, and deploys with
the official Pages actions. Pull requests run the checks but do not deploy.
