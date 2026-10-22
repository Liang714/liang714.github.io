import type { StackGroup } from './types.ts'

/**
 * A schedule, not a skill meter. Each entry says where the technology was actually used.
 * "Earlier work" means the technology is listed in the owner's brief but no project on this site shows it.
 */
export const stackGroups: readonly StackGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', evidence: 'used', where: 'All six projects' },
      { name: 'TypeScript', evidence: 'used', where: 'SIDEQUEST web app, this site' },
      { name: 'SQL', evidence: 'used', where: 'DuckDB in ROBIN, Postgres in SIDEQUEST, SQLite event log' },
      { name: 'C++', evidence: 'earlier', where: 'Earlier work, no project shown here' },
    ],
  },
  {
    title: 'Machine learning',
    items: [
      { name: 'PyTorch', evidence: 'used', where: 'ROBIN value network and MAML' },
      { name: 'NumPy', evidence: 'used', where: 'ROBIN' },
      { name: 'Hugging Face Transformers and PEFT', evidence: 'building', where: 'PEFT ablation study' },
      { name: 'scikit-learn', evidence: 'earlier', where: 'Earlier work, no project shown here' },
      { name: 'TensorFlow', evidence: 'earlier', where: 'Earlier work, no project shown here' },
    ],
  },
  {
    title: 'Vision and multimodal',
    items: [
      { name: 'Speech-to-text (faster-whisper)', evidence: 'used', where: 'Personal agent' },
      { name: 'Vision-language verification (llava)', evidence: 'used', where: 'SIDEQUEST, advisory only' },
      { name: 'CNN image classification (ResNet50, VGG16)', evidence: 'earlier', where: 'Public repository Animal-Classification, 2024' },
      { name: 'OpenCV', evidence: 'earlier', where: 'Earlier work, no project shown here' },
    ],
  },
  {
    title: 'LLMs and agents',
    items: [
      { name: 'Policy-gated tool-calling agents', evidence: 'used', where: 'Computer-use agent core' },
      { name: 'Agent benchmark design', evidence: 'used', where: 'Computer-use agent core' },
      { name: 'Anthropic API', evidence: 'used', where: 'Personal agent, SIDEQUEST adapter' },
      { name: 'Local models through Ollama', evidence: 'used', where: 'Computer-use agent, SIDEQUEST, personal agent' },
      { name: 'LLM-as-judge evaluation', evidence: 'building', where: 'P-Check multilingual test' },
    ],
  },
  {
    title: 'Data and infrastructure',
    items: [
      { name: 'PostgreSQL', evidence: 'used', where: 'SIDEQUEST' },
      { name: 'DuckDB', evidence: 'used', where: 'ROBIN' },
      { name: 'SQLite', evidence: 'used', where: 'Computer-use agent event log' },
      { name: 'FastAPI', evidence: 'used', where: 'SIDEQUEST, personal agent' },
      { name: 'MLflow', evidence: 'building', where: 'PEFT ablation study' },
    ],
  },
  {
    title: 'Engineering practice',
    items: [
      { name: 'pytest, mypy and ruff', evidence: 'used', where: 'Computer-use agent core' },
      { name: 'GitHub Actions CI', evidence: 'used', where: 'Computer-use agent, SIDEQUEST, this site' },
      { name: 'React and Vite', evidence: 'used', where: 'This site' },
      { name: 'pnpm and Turborepo', evidence: 'used', where: 'SIDEQUEST' },
    ],
  },
]
