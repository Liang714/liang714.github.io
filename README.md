# Liang — AI engineer portfolio

A static portfolio site: React, TypeScript and Vite, deployed to GitHub Pages.

The design is a site-entrance sign system. Four colours each carry one meaning (red blocked, yellow caution, blue a
human decision, green permitted), and the centrepiece is an interactive simulation of the safety gate from my
computer-use agent project. It is labelled as a simulation: no model runs and nothing leaves the browser.

## What is in the site

- **Home** — hero with the gate simulation running, selected work, the full gate demo, about, technology schedule,
  record of revisions, contact.
- **Case studies** — `/work/computer-agent/`, `/work/sidequest/` and `/work/robin/`, each with the problem, an
  architecture diagram, decisions, results beside their limits, what broke, and what is not built.
- **In progress** — three unfinished projects, labelled as such.

## Requirements

Node 22.18 or newer (build scripts import TypeScript natively). The deploy workflow uses Node 24.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type check, production build, then per-route HTML, sitemap, robots and 404 |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type check, lint (includes accessibility rules) and tests. CI runs this |
| `npm test` | Unit tests for the gate simulator |
| `npm run content:check` | List placeholders and wording that still needs your approval |
| `npm run assets` | Regenerate the social-share image and touch icon |
| `npm run build:subpath` | Build as if hosted under a project subpath, to test asset URLs |

## Update the content

Everything personal is in two places; components contain no facts.

1. **`src/config/site.ts`** — name, email, LinkedIn, résumé file, portrait, navigation. Empty values are hidden, not
   shown as blanks. Flip the `confirmed` flags to `true` once you have approved the wording they cover.
2. **`src/content/`**
   - `projects/` — one file per case study (typed in `types.ts`), plus `lab.ts` for unfinished work. To add a project,
     copy a file, fill the fields and add it to `projects/index.ts`. The page, card, sitemap entry and social tags
     follow automatically.
   - `stack.ts` — the technology schedule. Each entry says where it was used.
   - `record.ts` — the revision table. Keep dates verifiable.

Then run `npm run content:check` and `npm run build`.

To add a résumé, put the file in `public/` and set `site.resume` to its name. To add a portrait, put it in `public/`
and set `site.portrait` and `site.portraitAlt`.

## Deploy

The workflow in `.github/workflows/deploy.yml` checks, builds and deploys on every push to `main`.

1. Create the repository. The name `<username>.github.io` publishes at the site root; any other name publishes at
   `https://<username>.github.io/<repo>/`. The workflow works out the base path and URL itself.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. The Actions tab shows the run and the final URL.

To publish from your own machine instead, run `npm run build` and upload `dist/`. Set `BASE_PATH` and `SITE_URL` first
if the site is not at the domain root.

## Structure

```
src/
  config/site.ts        owner details and navigation
  content/              typed project, stack and record data
  components/           shared pieces: signs, buttons, diagram, tables, header, footer
  sections/             home page sections
  pages/                Home, CaseStudyPage, NotFound
  playground/           the gate simulator: pure engine, scenarios, tests, and its UI
  hooks/                theme, reduced motion, scroll spy, page metadata
  styles/               tokens, base, layout, and one file per area
scripts/                postbuild (per-route HTML), SEO, placeholder check, asset generation
docs/ARCHITECTURE.md    why the site is built this way
PRODUCT.md, DESIGN.md   product truth and the visual system
```

## Honesty rules this site follows

- Private repositories are labelled private. Nothing implies code can be read when it cannot.
- Each result is printed with its sample size and limits. Work in progress is labelled as such.
- No invented employers, metrics, awards, testimonials or publications.
- Fonts are open (SIL OFL) and self-hosted: Barlow Condensed, Overpass and Overpass Mono. Icons and pictograms are drawn
  for this site.

## Licence

No licence is set yet, so the code is all rights reserved by default. Choose one (for example MIT) before inviting reuse.
