const LEVELS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'L1 Friendly',      color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  2: { label: 'L2 Firm',          color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  3: { label: 'L3 Urgent',        color: '#FF6B2B', bg: 'rgba(255,107,43,0.12)' },
  4: { label: 'L4 Final Warning', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  5: { label: 'L5 Legal',         color: '#A78BFA', bg: 'rgba(124,58,237,0.12)' },
}

export default function ChaseLevelBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const { label, color, bg } = LEVELS[level]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold"
      style={{ color, backgroundColor: bg }}
    >
      <span
        className="w-[10px] h-[10px] rounded-[2px] inline-block"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}
