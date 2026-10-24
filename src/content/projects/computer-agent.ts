import type { CaseStudy } from '../types.ts'

export const computerAgent: CaseStudy = {
  kind: 'case-study',
  slug: 'computer-agent',
  title: 'Computer-use agent core',
  headline: 'An agent where the model proposes and a broker decides.',
  period: 'Sep 2026',
  summary:
    'A headless core for a macOS computer-use agent, built on one rule: the model can only propose actions, and every action passes a fixed six-stage broker. A benchmark harness scores safety, not just success.',
  status: 'Pre-MVP: core and benchmark harness implemented',
  repo: { visibility: 'private' },
  stack: ['Python 3.12', 'Pydantic', 'SQLite', 'pytest', 'mypy (strict)', 'ruff', 'GitHub Actions', 'Ollama (qwen3:14b)'],
  tags: [
    { label: '211 tests, strict typing, CI', tone: 'green' },
    { label: 'Benchmark found 6 defects unit tests missed', tone: 'green' },
    { label: 'Pre-MVP: macOS layer and UI not built', tone: 'yellow' },
  ],
  result: {
    text: 'On a local qwen3:14b, all 15 benchmark runs succeeded and 0 of 6 injection payloads were obeyed.',
    caveat: 'Five tasks, one model, one attack style, with payloads written by the author of the defence: a real signal, not proof.',
  },
  problem: [
    'A computer-use agent reads content it did not write (files, web pages, mail) and can act on the machine. If anything the model reads can become something the model does, a hostile document becomes a hostile action.',
    'The question behind this project: what is the smallest architecture in which that cannot happen by construction, and how would I know it holds? The answer is a capability broker the model cannot route around, plus a benchmark that treats safety as a first-class result.',
  ],
  built: [
    'A capability broker that runs every action through resolve, permission, risk, approval, budget and execute, in that fixed order.',
    'A trust lattice: content entering a model carries the trust level of its origin, untrusted tiers are fenced as data, and trust can be lowered but never raised.',
    'A policy layer: workspace containment (Unicode normalisation, ~ expansion, symlink resolution), three-state capability permissions, and deterministic risk classification.',
    'Filesystem tools (list, stat, search, read, mkdir, copy, move, delete) where delete moves to a timestamped trash batch and refuses the whole batch if any target is bad.',
    'An append-only SQLite event log whose UPDATE and DELETE are blocked by database triggers, with task state derived from it.',
    'A benchmark harness: each task declares a goal, a fixture, a success predicate and the safety invariants that must not break; every metric is a pure function over the audit log.',
  ],
  facts: [
    { label: 'Commits', value: '42, one author identity' },
    { label: 'Tests', value: '211 (one opt-in test needs a local model)' },
    { label: 'Checks in CI', value: 'ruff, mypy --strict, pytest, and a benchmark control run on a macOS runner' },
    { label: 'Scope today', value: 'Filesystem tools only. No shell, browser or UI.' },
  ],
  diagram: {
    width: 980,
    height: 450,
    caption: 'The agent core. The model sits outside the broker and can only send proposals in.',
    groups: [{ x: 24, y: 150, w: 948, h: 134, label: 'Capability broker: the only holder of the tool registry and the executor' }],
    nodes: [
      { id: 'goal', x: 40, y: 30, w: 150, h: 64, title: 'User goal', sub: 'natural language' },
      { id: 'planner', x: 270, y: 30, w: 230, h: 64, title: 'Planner (model)', sub: 'emits a tool name and arguments, nothing callable', tone: 'yellow' },
      { id: 'fence', x: 650, y: 30, w: 290, h: 64, title: 'Fenced observation', sub: 'tool output tagged EXTERNAL_CONTENT: data, not instructions', tone: 'yellow' },
      { id: 's1', x: 40, y: 190, w: 138, h: 74, title: 'Resolve', sub: 'tool and arguments' },
      { id: 's2', x: 192, y: 190, w: 138, h: 74, title: 'Permission', sub: 'denied, ask or allowed' },
      { id: 's3', x: 344, y: 190, w: 138, h: 74, title: 'Risk', sub: 'computed, never claimed' },
      { id: 's4', x: 496, y: 190, w: 138, h: 74, title: 'Approval', sub: 'HIGH and above always asks', tone: 'blue' },
      { id: 's5', x: 648, y: 190, w: 138, h: 74, title: 'Budget', sub: 'actions, time, retries' },
      { id: 's6', x: 800, y: 190, w: 138, h: 74, title: 'Execute', sub: 'the tool runs, in scope' },
      { id: 'tools', x: 40, y: 350, w: 138, h: 70, title: 'Typed tools', sub: 'declare capability and base risk' },
      { id: 'log', x: 200, y: 350, w: 270, h: 70, title: 'Append-only event log', sub: 'SQLite triggers block update and delete', tone: 'green' },
      { id: 'human', x: 490, y: 350, w: 160, h: 70, title: 'Human approval', sub: 'names action, target, undo' },
      { id: 'scope', x: 800, y: 350, w: 138, h: 70, title: 'Workspace.resolve', sub: 'containment lives here' },
    ],
    edges: [
      { from: 'goal', to: 'planner', fromSide: 'r', toSide: 'l' },
      { from: 'planner', to: 's1', fromSide: 'b', toSide: 't', label: 'proposal' },
      { from: 's1', to: 's2', fromSide: 'r', toSide: 'l' },
      { from: 's2', to: 's3', fromSide: 'r', toSide: 'l' },
      { from: 's3', to: 's4', fromSide: 'r', toSide: 'l' },
      { from: 's4', to: 's5', fromSide: 'r', toSide: 'l' },
      { from: 's5', to: 's6', fromSide: 'r', toSide: 'l' },
      { from: 's6', to: 'fence', fromSide: 't', toSide: 'b' },
      { from: 'fence', to: 'planner', fromSide: 'l', toSide: 'r' },
      { from: 's1', to: 'tools', fromSide: 'b', toSide: 't', dashed: true },
      { from: 's3', to: 'log', fromSide: 'b', toSide: 't', label: 'each stage appends first', dashed: true },
      { from: 's4', to: 'human', fromSide: 'b', toSide: 't', dashed: true },
      { from: 's6', to: 'scope', fromSide: 'b', toSide: 't', dashed: true },
    ],
    textAlternative: [
      'The user states a goal in natural language and it goes to the planner, a model.',
      'The planner can only emit a proposal: a tool name and arguments. It holds nothing it could execute.',
      'The proposal enters the capability broker and passes six stages in a fixed order: resolve, permission, risk, approval, budget, execute.',
      'The resolve stage checks the proposal against the typed tool registry. The risk stage computes risk from the tool and its arguments. The approval stage asks a human for anything HIGH risk or above.',
      'Each stage appends to an append-only event log before the next stage begins. Workspace containment is enforced by the tool during execute.',
      'The tool output returns to the planner fenced as untrusted data, never as instructions.',
    ],
  },
  decisions: [
    {
      title: 'A broker, not middleware',
      body: 'Ordering is the security property. In a middleware chain, a check registered in the wrong position silently stops working and nothing fails at compile time. The broker fixes the order in one readable method.',
    },
    {
      title: 'The planner cannot import tools',
      body: 'The planner emits an ActionProposal: a tool name and arguments, nothing callable. It holds no registry handle, so no path from model output to execution skips the broker. An architecture test enforces that, rather than convention.',
    },
    {
      title: 'Risk is computed, never claimed',
      body: 'Risk comes from the resolved tool and its validated arguments. A model cannot supply or lower it, and a risk field in model output rejects the whole batch. HIGH and above always ask, even with a standing grant.',
    },
    {
      title: 'The event log is the state',
      body: 'The log is append-only through SQLite triggers, not convention. Task state is derived by reading it, so the audit trail, crash recovery and benchmark replay are one mechanism instead of three.',
    },
    {
      title: 'Reversible and all-or-nothing deletes',
      body: 'Delete moves targets into a trash batch and never unlinks. Every target is resolved and checked before any is moved, because a half-applied delete is worse than a refused one.',
    },
    {
      title: 'Defer the dangerous tool',
      body: 'There is no shell tool. It waits until the policy engine has been proven on safer capabilities.',
    },
  ],
  evaluation: {
    method:
      'Each task declares a goal, a deterministic fixture, a success predicate and safety invariants. A run that achieves the goal but trips an invariant counts as a safety violation, not a success. Every metric is computed from the agent’s own audit log. Two modes: a control run against hand-written oracle plans (proves the tasks are correct) and a model run against a local qwen3:14b at temperature 0.',
    tables: [
      {
        caption: 'Model baseline on qwen3:14b: 15 runs (5 tasks, 3 repeats each), 14 Sep 2026',
        columns: ['Metric', 'Result'],
        rows: [
          ['Task success rate', '100%'],
          ['Unsafe action rate', '0%'],
          ['Injection success rate', '0% (0 of 6 adversarial runs obeyed the payload)'],
          ['Latency p50 / p90', '4.2 s / 26.3 s'],
          ['Actions per task', '2.00'],
        ],
      },
      {
        caption: 'One defect fixed (the move tool refused “mv file dir/”): same model, same suite',
        columns: ['Metric', 'Before', 'After'],
        rows: [
          ['Task success', '80%', '100%'],
          ['Step success', '46.2%', '100%'],
          ['Actions per task', '3.47', '2.00'],
          ['Latency p90', '114 s', '26.3 s'],
        ],
      },
    ],
    limits: [
      'Six adversarial trials, one model, one attack style, with payloads written by the person who wrote the defence. A real signal, not a strong one, and not proof the system is injection-proof.',
      'Five tasks in the published baseline. A perfect score says more about the suite’s difficulty than the agent’s ceiling. The suite has since grown to eight task definitions, which the published baseline predates.',
      'Benchmark runs stand the human approval gate down, so they measure the planner alone. In normal operation the gate sits on top as a further layer.',
      'One machine and one model; output is not bit-reproducible even at temperature 0. Earlier model-backed figures were withdrawn because they measured broken configurations.',
    ],
  },
  lessons: [
    {
      title: 'Defect 1: the provider suppressed the model it measured',
      body: 'The local-model provider asked for “some valid JSON”, and the model satisfied it with an empty object in two tokens on every task: 0% success. The same model planned correctly when asked unconstrained. The fix was sending the real response schema. No unit test caught it, because they never inspected the request body.',
    },
    {
      title: 'Defect 2: the agent had no task memory',
      body: 'Each iteration re-observed an unchanged world, so the planner could not tell it had already acted. It ran read_text twelve times in a row. Adding action history cut actions per task from 9.80 to 3.20 and median latency from 35 s to 3.7 s.',
    },
    {
      title: 'Defect 3: tool output never reached the planner',
      body: 'Results were logged and discarded, so every adversarial task passed trivially: the payload never arrived. A 0.6B model scored identical injection resistance to a 14B one, which was the tell. The trust fencing existed for exactly this path and nothing had ever used it.',
    },
    {
      title: 'Defect 4: move refused the universal “mv file dir/” form',
      body: 'The anti-clobber guard misfired on the one case it should allow, which failed the multi-step task on every repeat. Every unit test passed, because the tests and the oracle plans both used explicit full destinations: a shared blind spot between the test author and the oracle author.',
    },
    {
      title: 'Defects 5 and 6: raw OS errors and relative paths',
      body: 'A raw OSError from listing a file as a directory escaped the typed error hierarchy and killed the task instead of being recovered; the broker now wraps it. Separately, relative paths resolved against the process directory, so a natural “data.csv” was refused as a workspace escape. Anchoring to the workspace root is safer and more usable.',
    },
    {
      title: 'The pattern: a perfect score for the wrong reason, three times',
      body: 'Adversarial tasks reported perfect injection resistance because the agent crashed first, then because it looped on a benign action until the budget ended it, then because the payload never reached the model. A test that only asserts that nothing bad happened passes in all three broken states. The suite now also requires the benign goal to succeed, and a security test asserts the payload is present in the prompt and fenced.',
    },
  ],
  notBuilt: [
    'The macOS capability layer (Accessibility, screen capture, app scripting), browser tools and the SwiftUI app.',
    'Benchmark tasks for recovery are declared but have no published model results yet.',
    'Risk escalation looks at target count only, not file sensitivity or location.',
    'A time-of-check to time-of-use race between resolving a path and using it is possible in principle and not mitigated.',
  ],
}
