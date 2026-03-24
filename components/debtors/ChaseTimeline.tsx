const LEVELS = [
  { label: 'Friendly',      color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { label: 'Firm',          color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { label: 'Urgent',        color: '#FF6B2B', bg: 'rgba(255,107,43,0.15)' },
  { label: 'Final Warning', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  { label: 'Legal',         color: '#A78BFA', bg: 'rgba(124,58,237,0.15)' },
]

export default function ChaseTimeline({ currentLevel, nextAction }: { currentLevel: 1 | 2 | 3 | 4 | 5; nextAction?: string }) {
  return (
    <div>
      <div className="flex items-center">
        {LEVELS.map(({ label, color, bg }, i) => {
          const level = (i + 1) as 1 | 2 | 3 | 4 | 5
          const done   = level < currentLevel
          const active = level === currentLevel
          return (
            <div key={level} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all"
                  style={
                    active
                      ? { backgroundColor: bg, borderColor: color, color }
                      : done
                      ? { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: '#10B981', color: '#10B981' }
                      : { backgroundColor: '#1A2234', borderColor: '#1F2D45', color: '#64748B' }
                  }
                >
                  {done ? '✓' : level}
                </div>
                <p className="text-[11px] mt-1.5 font-medium text-center truncate w-full px-1"
                   style={{ color: active ? color : done ? '#10B981' : '#64748B' }}>
                  {label}
                </p>
              </div>
              {i < 4 && (
                <div
                  className="h-0.5 flex-1 mb-5 mx-1 rounded-full"
                  style={{ backgroundColor: done ? '#10B981' : '#1F2D45' }}
                />
              )}
            </div>
          )
        })}
      </div>
      {nextAction && (
        <p className="text-xs text-ink-muted mt-3 pl-1">
          <span className="font-medium text-ink-subtle">Next:</span> {nextAction}
        </p>
      )}
    </div>
  )
}
