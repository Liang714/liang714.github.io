# Architecture decisions

Short records of the choices that shape this site, and why. The product facts live in `PRODUCT.md`; the visual
system lives in `DESIGN.md`.

## Stack: React, TypeScript, Vite, plain CSS

A static single-page app with three routes of real content. The brief asked for a maintainable, component-driven
site with no backend, so the stack stays small: React and React Router for rendering and routing, Vite for the build,
Vitest for the simulator's tests. There is no animation library and no UI kit; every motion is CSS or a short
timer-driven sequence, and every component is drawn for this site. The result ships about 118 kB of gzipped
JavaScript, most of it React.

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
React app then takes over. Case-study pages are a lazy chunk, so the home page does not pay for them.

The base path comes from `BASE_PATH` (and the absolute origin from `SITE_URL`), so the same build works at the root of
a user site or under a project subpath. CI derives both from the repository name.

## The simulator is a pure module with its own tests

`src/playground/` re-implements the stage order and policy rules of a private Python project, the capability broker in
`personal-computer-agent`. It is deliberately independent of React: `engine.ts` is a pure function from
`{config, proposal, approval}` to a trace, so the same input always gives the same output and 40 unit tests pin the
behaviour (stage order, risk escalation at ten targets, containment, symlinks, Unicode normalisation, the trust fence,
the append-only log). The React layer only animates a trace one gate at a time.

It is a simulation and says so wherever it appears. No model runs, nothing is sent anywhere, and file contents shown in
it are synthetic. Two details were checked against the original code rather than assumed: path containment runs
inside the tool at the execute stage (after approval and budget), and the budget stage writes no event row.

## Evidence rules

- Private repositories are labelled private; nothing implies code can be read when it cannot.
- Each result sits beside its sample size and its limits, marked with the yellow caution sign.
- Work that is not finished is on a separate "In progress" board, and every case study ends with what is not built.
- The technology schedule says where each technology was used, and separates earlier work from current work. There are
  no proficiency percentages.
- Dates in the record come from commit history or file dates, so each row can be checked.

## Visual system in brief

The site is a site-entrance sign system. Four colours each mean one thing and are used for nothing else: red for
blocked, yellow for caution, blue for a human decision or an action, green for permitted. Sign faces stay reflective
white in both themes. Meaning is always carried by shape and text as well as colour. Full detail in `DESIGN.md`.

## Motion budget

No single animation runs longer than about 300 ms. There is one authored moment: signs hang into place and the first
request runs through the gates. Everything else is a state change (a sign flipping to its verdict) or a hover. Under
`prefers-reduced-motion` the sequence collapses to its final state and nothing hides behind a transition.

## Accessibility approach

Semantic landmarks and one `h1` per page; a skip link; focus moved to the target after in-app navigation; visible
focus rings tuned for the light and dark grounds; a radio group for the simulator's requests; live regions for gate
results; scrollable tables, diagrams and code are keyboard-reachable; every diagram has a text alternative. ESLint's
`jsx-a11y` rules run in CI.

## Deployment

`.github/workflows/deploy.yml` runs the type check, lint and tests, builds with the right base path, and deploys with
the official Pages actions. Pull requests run the checks but do not deploy.
