import type { LabProject } from '../types.ts'

export const peftAblation: LabProject = {
  kind: 'lab',
  slug: 'peft-ablation',
  title: 'PEFT ablation study',
  period: 'Aug 2026',
  summary: 'Full fine-tuning against LoRA and QLoRA under one fixed compute budget.',
  status: 'Step 4 of 10 done: baseline and full fine-tuning',
  repo: { visibility: 'private' },
  stack: ['PyTorch', 'Transformers', 'PEFT', 'MLflow', 'pytest', 'Colab T4'],
  question:
    'How do full fine-tuning, LoRA (a rank sweep) and QLoRA compare on one task under the same compute budget, in accuracy, forgetting, training cost and inference latency?',
  exists: [
    'Locked design before any code: Qwen2.5-0.5B-Instruct, the closed-QA and extraction categories of Dolly-15k, a fixed 150-question MMLU subset for forgetting, and a fixed budget of 2,383,278 training tokens per run.',
    'A data pipeline whose leakage check fails the build, with tests that plant a leak and assert it is caught.',
    'One YAML config per method, no hard-coded hyperparameters, and 48 tests.',
    'A baseline and a full fine-tune measured on a free Colab T4.',
  ],
  pending: [
    'The LoRA rank sweep (4, 8, 16, 32) and the QLoRA run.',
    'Forgetting evaluation for every run, before and after.',
    'The summary table, the plot, the inference endpoint and the full write-up.',
  ],
  table: {
    caption: 'Results so far: one run per column, one seed',
    columns: ['Metric', 'Baseline', 'Full fine-tune'],
    rows: [
      ['Task F1 (n = 314)', '29.4%', '51.3%'],
      ['Task exact match (n = 314)', '1.3%', '9.6%'],
      ['MMLU subset (n = 150)', '34.7%', '40.0%'],
      ['Training wall-clock', '—', '7,420 s (about 2.1 h)'],
      ['Peak GPU memory', '—', '11.6 of 14.6 GB'],
    ],
  },
  limits: [
    'One run per method and one seed, so no variance is measured yet.',
    'With 150 MMLU questions the margin is roughly 8 points either way (my calculation). The small rise only says that no large forgetting showed up at this budget.',
    'LoRA and QLoRA have not been run, so the study’s question is still unanswered.',
  ],
  learned:
    'Running on Colab surfaced six bugs that local CPU runs hid: a checkpoint loader that assumed every checkpoint was a LoRA adapter, data splits never committed to git, a data-collator crash from version drift, unpinned dependencies, bf16 assumed on a GPU without hardware support, and a CUDA out-of-memory error from an evaluation batch larger than the training batch.',
}

export const pcheckMultilingual: LabProject = {
  kind: 'lab',
  slug: 'pcheck-multilingual',
  title: 'P-Check multilingual test',
  period: 'Oct 2026',
  summary: 'Does a personalised LLM judge lose accuracy when a user’s history is not in English?',
  status: 'Experiment designed and prepared. GPU run and results pending',
  repo: { visibility: 'public', url: 'https://github.com/Liang714/pcheck-multilingual' },
  stack: ['Python', 'Llama 3.1 8B', 'Llama 3.2 3B', 'NLLB-200', 'Kaggle GPU'],
  question:
    'Does a personalised LLM judge (P-Check, Seo and Lee, ACL 2026) get less accurate when a user’s past conversations are in Korean, Chinese or Malay instead of English?',
  exists: [
    'A design built on 100 PRISM test users and 377 chosen-versus-rejected pairs, with histories translated by NLLB-200 into Korean, Chinese and Malay, plus a mixed-language version.',
    'Only the history is translated. The test question and both answers stay in English, so any change comes from the history language alone.',
    '95% bootstrap confidence intervals and paired differences against English.',
    'A pipeline tested without a GPU: rebuilt prompts match the originals exactly for all 362 users.',
  ],
  pending: [
    'The Kaggle GPU run, roughly 3 to 5 hours.',
    'A hand check of translation meaning errors for Chinese and Malay.',
    'The write-up of results.',
  ],
  limits: [
    'With about 377 pairs, a difference from English has to be around 7 points to clearly stand out from noise.',
    'The checklist model is the untrained base 3B, not the paper’s trained one, so absolute accuracy is not comparable with the paper. Only the languages are compared with each other.',
    'Not yet tested: the vLLM install on Kaggle, model downloads, translation quality and real run times.',
  ],
}

export const personalAgent: LabProject = {
  kind: 'lab',
  slug: 'personal-agent',
  title: 'Personal agent',
  period: 'Jul–Aug 2026',
  summary: 'A hybrid assistant for mail, calendar and voice memos: a hosted model for tool-calling, local models for the rest.',
  status: 'Working prototype',
  repo: { visibility: 'private' },
  stack: ['Python', 'FastAPI', 'Anthropic API', 'Ollama (qwen2.5:14b)', 'faster-whisper', 'Google APIs', 'SQLite'],
  question:
    'Can a small hybrid setup, with a hosted model for the tool-calling loop and local models for narrower jobs, run a useful personal assistant at low cost?',
  exists: [
    'A chat and tool-calling loop on the Anthropic API, where tool-calling reliability is worth a small real cost.',
    'Inbox triage that drafts replies and never sends them.',
    'Calendar and task actions, with deterministic controls in the web UI that bypass the model.',
    'Voice memos turned into tasks or journal entries with local speech-to-text.',
    'A command line, a small HTTP API, a phone-friendly web UI and 46 tests.',
  ],
  pending: ['A benchmark. Reliability fixes so far came from live testing, not from measurement.'],
  limits: ['Built around one person’s own accounts.'],
}

export const labProjects: readonly LabProject[] = [peftAblation, pcheckMultilingual, personalAgent]
