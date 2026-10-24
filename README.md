# Erh Fwu Liang — AI engineer portfolio

A static portfolio site: React, TypeScript and Vite, deployed to GitHub Pages.

The site is one page that scrolls smoothly from top to bottom, with a page of detail behind each section. The design
is called Monument: the name is set at the full width of the screen, and the first screen holds a live simulation of
the safety gate from my computer-use agent project. It is labelled as a simulation: no model runs and nothing leaves
the browser.

## What is in the site

- **Home (`/`)** — the gate demo and the name, background and interests, three projects, the technology stack, the
  record, and contact.
- **Detail pages** — `/work/` (all work, with the unfinished projects), `/work/computer-agent/`,
  `/work/sidequest/` and `/work/robin/` (case studies), `/about/`, `/stack/`, `/record/`, and `/gate/`, the full
  simulator where every request and rule can be changed.

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
| `npm test` | Unit tests for the gate simulator, the home content and the route table |
| `npm run content:check` | List placeholders and wording that still needs your approval |
| `npm run assets` | Regenerate the social-share image and touch icon |
| `npm run build:subpath` | Build as if hosted under a project subpath, to test asset URLs |

## Update the content

Everything personal is in two places; components contain no facts.

1. **`src/config/site.ts`** — name, email, LinkedIn, résumé file, portrait, navigation. Empty values are hidden, not
   shown as blanks. Flip the `confirmed` flags to `true` once you have approved the wording they cover.
2. **`src/content/`**
   - `projects/` — one file per case study (typed in `types.ts`), plus `lab.ts` for unfinished work. To add a project,
     copy a file, fill the fields and add it to `projects/index.ts`. The page, sitemap entry and social tags follow
     automatically. To show it on the home page too, add its short name and one line to `home.ts`.
   - `home.ts` — the short copy the home page shows: display names, one-liners, the background statement, the
     interests and the work behind each.
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
  content/              typed project, stack, record and home-page copy
  components/           header, footer, smooth scroll, buttons, tags, diagram, tables
  sections/             the home page sections (hero, about, interests, work, stack, record, contact)
  pages/                Home plus the lazy detail pages
  gate/                 the first-screen demo: controller and its React hook
  playground/           the gate simulator: pure engine, scenarios, tests, and the full-page UI
  hooks/, lib/          reduced motion, scroll spy, page metadata; the scroll and GSAP helpers
  styles/               tokens, base, components, home, pages, gate
scripts/                postbuild (per-route HTML), SEO, placeholder check, asset generation
docs/ARCHITECTURE.md    why the site is built this way
PRODUCT.md, DESIGN.md   product truth and the visual system
```

## Honesty rules this site follows

- Private repositories are labelled private. Nothing implies code can be read when it cannot.
- Each result is printed with its sample size and limits. Work in progress is labelled as such.
- No invented employers, metrics, awards, testimonials or publications.
- The font is open (SIL OFL) and self-hosted: Chivo. The few icons are drawn for this site. The pictures are interface
  exhibits built from the projects' own data; the example quest in the Sidequest exhibit is labelled as an example.

## Licence

No licence is set yet, so the code is all rights reserved by default. Choose one (for example MIT) before inviting reuse.
