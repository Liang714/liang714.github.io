import type { RecordEntry } from './types.ts'

/**
 * A revision table, newest first. Dates for projects come from commit history or file dates,
 * so every row can be checked. Education dates are the owner's to add (see site.confirmed).
 */
export const record: readonly RecordEntry[] = [
  {
    rev: 'G',
    date: 'Oct 2026',
    title: 'P-Check multilingual test',
    detail: 'Public repository. Experiment prepared; results pending.',
    source: 'GitHub',
  },
  {
    rev: 'F',
    date: 'Oct 2026',
    title: 'ROBIN',
    detail: 'Learned join-order optimizer reproduced on DuckDB, with an honest results log.',
    source: 'File dates',
  },
  {
    rev: 'E',
    date: 'Sep 2026',
    title: 'Computer-use agent core',
    detail: 'Broker, trust lattice, event log and benchmark harness. 42 commits.',
    source: 'Git history',
  },
  {
    rev: 'D',
    date: 'Aug–Sep 2026',
    title: 'SIDEQUEST',
    detail: 'Web and API product across eight phases. 41 commits.',
    source: 'Git history',
  },
  {
    rev: 'C',
    date: 'Aug 2026',
    title: 'PEFT ablation study',
    detail: 'Design locked, baseline and full fine-tune measured. 16 commits.',
    source: 'Git history',
  },
  {
    rev: 'B',
    date: 'Jul–Aug 2026',
    title: 'Personal agent',
    detail: 'Hybrid hosted and local assistant for mail, calendar and voice memos. 11 commits.',
    source: 'Git history',
  },
  {
    rev: 'A',
    date: 'Mar 2024',
    title: 'Animal-Classification',
    detail: 'Image classification with ResNet50 and VGG16. Public repository.',
    source: 'GitHub',
  },
  {
    rev: '0',
    date: '',
    title: 'B.S. Civil Engineering',
    detail: 'National Taiwan University.',
    source: 'Owner-supplied',
  },
]
