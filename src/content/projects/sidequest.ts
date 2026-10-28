import type { CaseStudy } from '../types.ts'

export const sidequest: CaseStudy = {
  kind: 'case-study',
  slug: 'sidequest',
  title: 'SIDEQUEST',
  headline: 'A product built phase by phase, with AI as a layer that never publishes on its own.',
  period: 'Aug–Sep 2026',
  summary:
    'A Seoul-first platform that turns free time into group activities. A Next.js web app is wired end to end to a FastAPI backend with auth, quests, friends, WebSocket quest rooms and gamification, plus local-LLM quest generation behind a provider abstraction.',
  status: 'Web and API working end to end. Mobile app not started',
  repo: { visibility: 'public', url: 'https://github.com/Liang714/sidequest' },
  stack: ['Next.js', 'TypeScript', 'FastAPI', 'SQLAlchemy (async)', 'PostgreSQL', 'Valkey', 'WebSockets', 'pnpm + Turborepo', 'Ollama', 'Anthropic API'],
  tags: [
    { label: '131 API tests, CI workflow', tone: 'green' },
    { label: 'AI behind one provider seam', tone: 'green' },
    { label: 'Payments and bookings: fake providers only', tone: 'yellow' },
    { label: 'Mobile app not started', tone: 'yellow' },
  ],
  result: {
    text: 'The web app and API work end to end through the real interface, backed by 131 API tests.',
    caveat: 'No users and no production deployment. Payments and bookings run on fake providers.',
  },
  problem: [
    'Making plans with other people fails at coordination: finding something to do, finding people, agreeing, and following through. SIDEQUEST’s loop is to discover or generate a spontaneous activity, form a temporary group, do it, and level up.',
    'The engineering question was how to ship a real product in phases without letting an LLM into places where it can cause harm. The answer was to make AI a layer on top of a working product, not the product.',
  ],
  built: [
    'Phases 0 and 1: product documents (PRD, personas, user stories, flows, schema, API, security, design system) and a clickable prototype.',
    'Phase 2 MVP: auth, quests, friends, WebSocket quest rooms and gamification, with the web app wired to the real API and no mock data left.',
    'Phases 3 and 4: AI quest generation, compatibility scoring, recommendations, and an achievement engine.',
    'Phases 5 to 7: business accounts behind an admin verification gate, Pro subscriptions with a credit-pack AI quota, a creator marketplace with a paywall, and activity booking with commission tracking.',
    'Phase 8: multi-step itinerary planning, advisory-only photo verification, and recommendation explanations grounded in the real score breakdown.',
  ],
  facts: [
    { label: 'Commits', value: '41, one author identity' },
    { label: 'API tests', value: '131 test functions across 21 files' },
    { label: 'Local setup', value: 'Postgres and Valkey as portable binaries; local models through Ollama' },
    { label: 'Verification', value: 'API tests plus browser runs through the real UI against the real backend, per the project README' },
  ],
  diagram: {
    width: 980,
    height: 430,
    caption: 'System shape. Dashed boxes are not built or not verified against a real vendor.',
    groups: [{ x: 232, y: 270, w: 744, h: 140, label: 'Provider seams: one interface each, local or fake by default' }],
    nodes: [
      { id: 'web', x: 40, y: 40, w: 260, h: 76, title: 'Web app', sub: 'Next.js App Router, TypeScript, wired to the real API', tone: 'green' },
      { id: 'mobile', x: 40, y: 150, w: 260, h: 76, title: 'Mobile app', sub: 'React Native with Expo. Not started', tone: 'yellow', dashed: true },
      { id: 'api', x: 400, y: 80, w: 290, h: 130, title: 'FastAPI modular monolith', sub: 'auth, quests, friends, chat, matching, gamification, payments, bookings, one package per concern', tone: 'green' },
      { id: 'pg', x: 780, y: 30, w: 190, h: 96, title: 'PostgreSQL', sub: 'Schema designed for PostGIS and pgvector, neither installed locally' },
      { id: 'valkey', x: 780, y: 150, w: 190, h: 76, title: 'Valkey', sub: 'cache, rate limits, WebSocket fan-out' },
      { id: 'ai', x: 250, y: 310, w: 200, h: 84, title: 'AIService', sub: 'Ollama qwen3:8b by default, Anthropic adapter', tone: 'green' },
      { id: 'vision', x: 470, y: 310, w: 160, h: 84, title: 'VisionVerifier', sub: 'llava:7b, advisory only', tone: 'yellow' },
      { id: 'pay', x: 650, y: 310, w: 150, h: 84, title: 'PaymentProvider', sub: 'fake default; Stripe and Toss unverified', tone: 'yellow', dashed: true },
      { id: 'book', x: 820, y: 310, w: 140, h: 84, title: 'BookingProvider', sub: 'fake default; no vendor', tone: 'yellow', dashed: true },
    ],
    edges: [
      { from: 'web', to: 'api', fromSide: 'r', toSide: 'l', label: 'REST + WebSocket' },
      { from: 'mobile', to: 'api', fromSide: 'r', toSide: 'l', dashed: true },
      { from: 'api', to: 'pg', fromSide: 'r', toSide: 'l' },
      { from: 'api', to: 'valkey', fromSide: 'r', toSide: 'l' },
      { from: 'api', to: 'ai', fromSide: 'b', toSide: 't' },
      { from: 'api', to: 'vision', fromSide: 'b', toSide: 't' },
      { from: 'api', to: 'pay', fromSide: 'b', toSide: 't', dashed: true },
      { from: 'api', to: 'book', fromSide: 'b', toSide: 't', dashed: true },
    ],
    textAlternative: [
      'A Next.js web app talks to the backend over REST and WebSocket. A React Native mobile app is planned but not started.',
      'The backend is a FastAPI modular monolith with one package per concern.',
      'It stores data in PostgreSQL, designed for PostGIS and pgvector but run locally without them, and uses Valkey for caching, rate limits and WebSocket fan-out.',
      'Four things sit behind provider interfaces: AI (local Ollama by default, an Anthropic adapter), photo verification (advisory only), payments (fake by default, Stripe and Toss adapters unverified) and bookings (fake by default).',
    ],
  },
  decisions: [
    {
      title: 'A modular monolith',
      body: 'One deployable, one database, and clean module boundaries: modules import each other only through public interfaces, so any one can be extracted later without a rewrite. It avoids the distributed-systems tax before there is a scale problem that justifies it.',
    },
    {
      title: 'AI is a layer, not the product',
      body: 'The MVP shipped with zero AI dependencies. Every AI feature sits behind one service chosen by an environment variable: local Ollama by default (free, no key) and an Anthropic adapter as the production target.',
    },
    {
      title: 'Generation ends at a draft a human approves',
      body: 'AI never auto-publishes a quest. An auto-published bad quest is a real-world safety and trust problem, not a user-interface bug.',
    },
    {
      title: 'No model call on the hot path',
      body: 'The default feed is served by conventional filtering and ranking; a model is called only for explicit AI interactions. When a model explains a recommendation it is handed the real score breakdown and told to explain that. It never ranks candidates itself.',
    },
    {
      title: 'Photo verification is advisory only',
      body: 'Vision verification has a measured, weaker trust profile than text generation, so it is a separate, narrower abstraction and never completes a quest on its own.',
    },
    {
      title: 'Provider seams with fake defaults',
      body: 'Payments and bookings sit behind interfaces whose default provider always succeeds, which keeps development free. Real Stripe and Toss adapters exist but have not been verified against a live account.',
    },
  ],
  evaluation: {
    method:
      'There is no usage data, because there are no users. Confidence comes from an API test suite and from running the product through its real interface against its real backend. The honest summary is what is real and what is not:',
    tables: [
      {
        caption: 'State of each area',
        columns: ['Area', 'State'],
        rows: [
          ['Auth, quests, friends, quest rooms, gamification', 'Working end to end'],
          ['Quest generation, itineraries, explanations', 'Working with a local model; Anthropic adapter implemented'],
          ['Recommendations', 'Interest overlap, proximity and fill ratio. Not embedding-based'],
          ['Payments', 'Fake provider; Stripe and Toss adapters unverified'],
          ['Bookings', 'Fake provider; no real vendor integrated'],
          ['Mobile app', 'Not started'],
        ],
      },
    ],
    limits: [
      'No real users and no production deployment are claimed.',
      'The local setup has no PostGIS or pgvector, which is why recommendations are not embedding-backed. The schema keeps the embedding columns so swapping the ranker is additive.',
      'Photo verification is measured as weaker than text generation, which is the reason it is advisory.',
    ],
  },
  lessons: [
    {
      title: 'Portable infrastructure instead of Docker',
      body: 'The development machine had neither Docker nor Homebrew, so local infrastructure is a self-contained toolchain under a gitignored folder (Node, Python, Postgres, Valkey, Ollama), installed by one idempotent script. The compose file remains the documented target for anyone who has Docker.',
    },
    {
      title: 'Name the substitute',
      body: 'Without pgvector, recommendations use a simpler, real scorer. The docs name that substitute and say exactly why, rather than describing the target design as if it were running.',
    },
    {
      title: 'Contract-first types',
      body: 'Shared TypeScript types are generated from the API’s OpenAPI schema, so the web app and backend cannot drift apart silently.',
    },
  ],
  notBuilt: [
    'The mobile app (React Native with Expo).',
    'A real payment charge through Stripe or Toss, and a real booking provider.',
    'Embedding-backed recommendations, which need pgvector.',
    'The collaborative and learned-ranking stages of the recommendation roadmap.',
  ],
}
