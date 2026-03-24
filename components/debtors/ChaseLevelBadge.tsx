const LEVELS: Record<number, { label: string; textClass: string; bg: string }> = {
  1: { label: 'L1', textClass: 'text-ink-subtle', bg: '#8898AA1A' },
  2: { label: 'L2', textClass: 'text-ink-muted', bg: '#4254661A' },
  3: { label: 'L3', textClass: 'text-warning', bg: '#F4B7401A' },
  4: { label: 'L4', textClass: 'text-danger-light', bg: '#F973161A' },
  5: { label: 'L5', textClass: 'text-danger', bg: '#DF1B411A' },
}
export default function ChaseLevelBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const { label, textClass, bg } = LEVELS[level]
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${textClass}`} style={{ backgroundColor: bg }}>{label}</span>
}
