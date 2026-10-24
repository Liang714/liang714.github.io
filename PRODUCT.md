# Product

<!-- impeccable:product-schema 1 -->

> Provenance: written from the owner's master brief and a discovery conversation. The owner told the agent to proceed
> without a further interview round, so facts marked *(inferred)* are unconfirmed and must be re-checked before launch.

## Platform

web

## Stack

Delegated within the brief's preferred list: React + TypeScript + Vite, static build, deployed to GitHub Pages.
No backend. The brief names this stack as preferred and asks for GitHub Pages unless another option is clearly better.

## Users

- **Primary:** hiring managers, AI engineers, researchers, startup founders and recruiters who have a few minutes
  to decide whether this person builds real AI systems. They arrive from a GitHub profile, CV or LinkedIn link, on
  desktop or phone, and they verify claims by clicking through.
- **Secondary:** peers and collaborators reading the case studies for technical depth.

## Product Purpose

A personal portfolio for Liang, an AI engineer (supporting identity: Software Engineer | Applied AI | Intelligent
Systems). Success means a visitor believes this person engineers AI systems with rigor, can read exactly what was
built and how it was evaluated, and knows how to get in touch.

## Positioning

The owner's projects are verifiable engineering artifacts, not demos: a safety-first agent core whose benchmark found
six defects that unit tests missed, a product build with documented phases, and a paper reproduction that reports
inconclusive results honestly. A neighbouring portfolio cannot truthfully copy those projects or their stated limits.
The civil-engineering background (checks, safety factors, load paths, records) is the lens, not decoration.

## Operating Context

- Case studies are read by engineers who will check claims against repositories where those are public.
- Most project repositories are **private**; only some older and newer repositories are public. Source links must
  never imply availability that does not exist.
- The gate demo in the first screen and the full simulator at `/gate/` are a **local simulation** of the
  personal-computer-agent's capability broker. They re-implement the stage order and policy rules in TypeScript. No model
  runs in the browser and nothing is sent anywhere.
- The home page is one page with a detail page behind each section (work, about, stack, record, the gate in full).
  The owner is a student and has no work history; the page says "currently a student" and never implies employment.

## Capabilities and Constraints

- Static site, no server. Contact is `mailto:` and external links; no form that silently discards messages.
- Owner details live in one config file. Email and LinkedIn were supplied by the owner and are published on the site.
  Still unfilled: résumé file, education dates, per-project contribution statements, approval of the wording about
  AI-assisted development.
- Verified: the ROBIN README's citation (arXiv:2604.14725, RELOAD, Lee, Sim, Kim, Li, Zhu and Park) matches arXiv's record.
- Terminology: "capability broker", "trust lattice", "audit log" are the agent project's own terms.
- Target: WCAG 2.2 AA, `prefers-reduced-motion` honoured, keyboard-operable playground, works under a GitHub Pages
  project subpath.

## Brand Commitments

- Brief personality: analytical, curious, ambitious, experimental, precise, creative, execution-oriented.
- Origin story to tell concisely: civil engineering at National Taiwan University, into software and AI; academic and
  professional experience across Malaysia, Taiwan and South Korea.
- Binding bans from the brief: no purple-gradient/glow/floating-particle AI look, no skill-percentage bars, no
  invented testimonials, metrics, awards, employers, publications, user counts or production deployments.
- Name shown: "Erh Fwu Liang" (confirmed by the owner). The narrow phone header shows "Liang" so it fits.

## Evidence on Hand

Real, locally verified projects (all authored under the GitHub account `Liang714`):

- **personal-computer-agent** — 42 commits, tests, CI, security and benchmark docs. Headless agent core and benchmark
  harness are implemented; macOS layer, browser tools and UI are not. Benchmark: 5 tasks x 3 repeats on one local model;
  its own docs state the limits. Private repository.
- **SIDEQUEST** — 41 commits. Next.js + FastAPI + Postgres monorepo with local-LLM quest generation. The schema is
  designed for PostGIS and pgvector but the local setup has neither, so recommendations are not embedding-based.
  Payments and bookings run on fake providers; mobile app not started. Private repository.
- **ROBIN** — a from-scratch concept reproduction of a learned query optimizer on DuckDB with an honest results log.
  Not a reproduction of published numbers. Not yet under version control.
- **PEFT ablation study** — 16 commits; baseline and full fine-tuning done, LoRA/QLoRA not yet run. Work in progress.
- **pcheck-multilingual** — public repository; multilingual test of a personalised LLM judge. Results status unverified.
- **personal-agent** — Claude + local-Ollama assistant for mail, calendar and voice memos. Private repository.
- Older public repositories: Animal-Classification (ResNet50/VGG16), To-Do-List, YouTube-Media-Player-.

**Absent and must not be fabricated:** employers or work history, publications, awards, testimonials, client logos,
user counts, production deployments, product screenshots, a résumé file, a LinkedIn URL.

## Product Principles

1. **Evidence before adjectives.** Every claim sits beside the artifact that supports it.
2. **Limits travel with results.** Sample sizes, single-model caveats and "not significant" are shown, not buried.
3. **Simulation is labelled as simulation.** Never imply a live model or backend where there is none.
4. **The site is itself an engineering artifact:** typed, tested, accessible, fast, configurable from one file.
5. **Placeholders are visible to the owner and invisible to visitors as fake facts.** Missing details are omitted or
   clearly marked, never invented.

## Accessibility & Inclusion

WCAG 2.2 AA target. Full keyboard operation including the playground, visible focus, reduced-motion alternatives,
no reliance on colour or motion alone, readable on small phones. English only at launch.
