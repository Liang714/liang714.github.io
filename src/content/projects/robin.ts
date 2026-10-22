import type { CaseStudy } from '../types.ts'

export const robin: CaseStudy = {
  kind: 'case-study',
  slug: 'robin',
  title: 'ROBIN',
  headline: 'A learned query optimizer, reproduced from scratch, with the negative results left in.',
  pictogram: 'join',
  period: 'Oct 2026',
  summary:
    'An RL agent that learns join orders for DuckDB. It rebuilds two ideas from the RELOAD paper (prioritised experience replay and MAML-based transfer) and adds a safe-fallback guard. Its results log reports what did not work.',
  status: 'Synthetic-workload study complete. Benchmark run on JOB pending',
  repo: { visibility: 'unpublished' },
  stack: ['Python', 'PyTorch', 'DuckDB 1.4.5', 'NumPy', 'pytest', 'matplotlib'],
  tags: [
    { label: '27 tests', tone: 'green' },
    { label: 'Found and fixed an unfair baseline', tone: 'green' },
    { label: 'Results not statistically significant', tone: 'yellow' },
    { label: 'Not the authors’ code; no claim to their numbers', tone: 'yellow' },
  ],
  result: {
    text: 'The best variant had 8.3 ± 0.5 regressions out of 18 unseen queries, against 10.7 ± 2.5 for the baseline.',
    caveat: 'The gap is about one standard deviation over three seeds: not significant. Every variant still trails the expert plan on about half the queries.',
  },
  problem: [
    'A learned query optimizer can beat a database’s expert plans on average and still make individual queries slower. A user who sees one query regress does not care about the mean. The RELOAD paper (Lee, Sim, Kim, Li, Zhu and Park, arXiv:2604.14725) targets exactly that robustness problem.',
    'This project rebuilds the paper’s core ideas from its description, at small scale, to learn what is easy, what is under-specified, and what the evaluation really measures. It is explicitly not the authors’ code and not a replication of their numbers.',
  ],
  built: [
    'A Balsa-style reinforcement-learning loop: a value network and beam search over join orders, executed in DuckDB with the join order forced.',
    'Experience-aware retention: prioritised replay weighted by recency and TD error.',
    'Complexity-aware transfer: training queries grouped into tasks by a complexity measure chosen with the Davies–Bouldin index, then MAML meta-initialisation on cheap simulated data.',
    'Per-query evaluation: regressions classed as Plateau or Rebound against a noise band, plus GMRL and WRL.',
    'A safe-fallback guard added by this project: use the learned plan only if the value network predicts it beats the expert plan by a margin.',
  ],
  facts: [
    { label: 'Tests', value: '27 test functions' },
    { label: 'Engine', value: 'DuckDB 1.4.5, one thread per run' },
    { label: 'Workload', value: 'Synthetic, 54 train and 18 test queries, template-disjoint' },
    { label: 'Runs', value: '3 seeds, 40 RL iterations each' },
    { label: 'Version control', value: 'None yet, so no public repository' },
  ],
  diagram: {
    width: 980,
    height: 420,
    caption: 'The training loop and its two RELOAD ideas. The guard is this project’s own addition.',
    nodes: [
      { id: 'workload', x: 40, y: 40, w: 170, h: 76, title: 'Workload', sub: 'SQL queries, template-disjoint split' },
      { id: 'search', x: 250, y: 40, w: 210, h: 76, title: 'Plan search', sub: 'value network and beam search over join orders' },
      { id: 'guard', x: 500, y: 40, w: 210, h: 76, title: 'Safe-fallback guard', sub: 'learned plan only if predicted to beat the expert', tone: 'blue' },
      { id: 'exec', x: 750, y: 40, w: 190, h: 76, title: 'DuckDB executor', sub: 'join order forced, latency measured' },
      { id: 'eval', x: 40, y: 190, w: 170, h: 80, title: 'Per-query evaluation', sub: 'Plateau, Rebound, GMRL, WRL', tone: 'green' },
      { id: 'train', x: 500, y: 190, w: 210, h: 80, title: 'Value-network training', sub: 'learns from measured latency' },
      { id: 'replay', x: 750, y: 190, w: 190, h: 80, title: 'Replay buffer', sub: 'prioritised by recency and TD error' },
      { id: 'sim', x: 250, y: 320, w: 210, h: 70, title: 'Simulator pre-training', sub: 'cost model on random plans' },
      { id: 'maml', x: 500, y: 320, w: 250, h: 70, title: 'MAML meta-initialisation', sub: 'tasks grouped by complexity' },
    ],
    edges: [
      { from: 'workload', to: 'search', fromSide: 'r', toSide: 'l' },
      { from: 'search', to: 'guard', fromSide: 'r', toSide: 'l' },
      { from: 'guard', to: 'exec', fromSide: 'r', toSide: 'l' },
      { from: 'exec', to: 'replay', fromSide: 'b', toSide: 't', label: 'latency' },
      { from: 'replay', to: 'train', fromSide: 'l', toSide: 'r' },
      { from: 'train', to: 'search', fromSide: 't', toSide: 'b', label: 'updated model' },
      { from: 'workload', to: 'eval', fromSide: 'b', toSide: 't', label: 'test queries' },
      { from: 'sim', to: 'maml', fromSide: 'r', toSide: 'l' },
      { from: 'maml', to: 'train', fromSide: 't', toSide: 'b', dashed: true },
    ],
    textAlternative: [
      'Training queries go to plan search, where a value network and beam search choose a join order.',
      'A guard compares the learned plan with the expert plan and falls back to the expert unless the learned one is predicted to be better by a margin.',
      'DuckDB executes the chosen plan with the join order forced and the latency is measured.',
      'Measured experience goes into a prioritised replay buffer, which trains the value network, which feeds back into plan search.',
      'Separately, the value network can start from simulator pre-training or from MAML meta-initialisation over tasks grouped by complexity.',
      'Held-out test queries are scored per query for regressions.',
    ],
  },
  decisions: [
    {
      title: 'Compare plans, not execution paths',
      body: 'DuckDB’s own join tree, pushed through the same forced explicit-JOIN path the learner uses, ran in 0.1 to 0.4 times the time of plain SQL for the same join order (535 ms became 54 ms on one heavy query). The expert baseline is now that forced path, so learned and expert plans differ only in join order.',
    },
    {
      title: 'Make the noise band relative',
      body: 'A 2 ms absolute floor hid 20 to 40 percent slowdowns on queries that take 5 to 10 ms. The tolerance is now the expert mean plus the largest of two standard deviations, 5 percent and 0.3 ms.',
    },
    {
      title: 'Keep the statistics imperfect',
      body: 'Features and the simulator use optimizer-style selectivity guesses rather than true filtered counts. With exact statistics the simulator is an oracle and there is nothing left to learn.',
    },
    {
      title: 'Hold out whole templates',
      body: 'Test queries come from templates never seen in training, so the test measures generalisation rather than memorisation.',
    },
    {
      title: 'List every choice the paper left open',
      body: 'The value-network architecture, MAML task loss, number of tasks, noise-band floors and exploration policy are not specified by the paper. Each is chosen here and written down.',
    },
  ],
  evaluation: {
    method:
      'Per-query regressions on 18 unseen-template queries, mean and standard deviation over 3 seeds. A query regresses if its learned plan stays slower than the expert beyond the noise band (Plateau) or improves and then gets worse again (Rebound). Lower is better; GMRL below 1 means faster than the expert.',
    tables: [
      {
        caption: 'Full comparison: regressions out of 18 unseen queries',
        columns: ['Variant', 'Regressions / 18', 'Test GMRL'],
        rows: [
          ['Vanilla (simulator pre-training)', '10.7 ± 2.5', '1.08 ± 0.06'],
          ['RELOAD ideas (MAML + hybrid replay)', '10.7 ± 2.1', '1.13 ± 0.09'],
          ['Vanilla + expert demonstrations', '10.0 ± 1.6', '1.08 ± 0.04'],
          ['RELOAD ideas + expert demonstrations', '8.3 ± 0.5', '1.04 ± 0.06'],
        ],
      },
      {
        caption: 'Transfer ablation: how tasks are grouped for MAML',
        columns: ['Pre-training', 'Regressions / 18', 'Test GMRL'],
        rows: [
          ['None', '12.3 ± 3.1', '1.12 ± 0.08'],
          ['Plain simulator', '12.3 ± 1.2', '1.16 ± 0.04'],
          ['MAML, Halstead tasks', '15.3 ± 1.2', '1.28 ± 0.12'],
          ['MAML, operator count', '12.0 ± 2.2', '1.14 ± 0.04'],
          ['MAML, estimated cost', '8.7 ± 0.5', '1.07 ± 0.02'],
          ['MAML, estimated rows (index’s pick)', '10.0 ± 0.8', '1.08 ± 0.01'],
        ],
      },
    ],
    limits: [
      'Every variant is still slower than the expert on roughly half of the unseen-template queries.',
      'MAML plus hybrid replay alone did not reduce regressions. With expert demonstrations it had the fewest, but the gap is about one standard deviation with three seeds: not significant.',
      'The Davies–Bouldin index did not predict which grouping worked best here. Four policies on one synthetic workload is an observation to test on the JOB benchmark, not a conclusion.',
      'Second-order MAML cost about 90 to 115 s per run against 4 s for plain simulator pre-training, an overhead the paper does not report.',
      'A small synthetic workload is a sanity check of the pipeline. It is not evidence for or against the paper’s claims.',
    ],
  },
  lessons: [
    {
      title: 'The first headline number was wrong',
      body: 'An early version compared forced learned plans against plain SQL and reported a test WRL of 0.45. Most of that was the execution path, not better join orders. Finding it meant measuring the baseline through both paths.',
    },
    {
      title: 'A noise floor that hid regressions',
      body: 'The absolute 2 ms tolerance absorbed real slowdowns on fast queries, so the regression count looked better than it was. Measured relative noise is about 5 percent, which is what the band now uses.',
    },
    {
      title: 'A metric that saturated',
      body: 'The checkpoint-based convergence metric reached its threshold at the first non-trivial checkpoint for every variant, so it separated nothing. It was replaced by a per-iteration best-so-far measure.',
    },
    {
      title: 'Numbers from different code versions',
      body: 'Adding JOB support changed the feature vocabulary from 8 to 21 tables, so synthetic numbers from the third transfer run onward are not bit-comparable with earlier ones. A final rerun of every suite on the final code is planned and the log says so.',
    },
  ],
  notBuilt: [
    'The JOB benchmark run (the data build is in progress).',
    'A final rerun of every synthetic suite on the final code.',
    'Version control and a public repository.',
  ],
}
