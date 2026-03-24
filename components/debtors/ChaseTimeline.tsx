import { cn } from '@/lib/utils'

const LEVEL_LABELS = ['Friendly', 'Firm', 'Urgent', 'Final Warning', 'Legal']
const LEVEL_COLORS: Record<number, { text: string; bg: string; ring: string }> = {
  1: { text: 'text-ink-subtle', bg: '#8898AA1A', ring: '#8898AA' },
  2: { text: 'text-ink-muted', bg: '#4254661A', ring: '#425466' },
  3: { text: 'text-warning', bg: '#F4B7401A', ring: '#F4B740' },
  4: { text: 'text-danger-light', bg: '#F973161A', ring: '#F97316' },
  5: { text: 'text-danger', bg: '#DF1B411A', ring: '#DF1B41' },
}

export default function ChaseTimeline({ currentLevel, nextAction }: { currentLevel: 1 | 2 | 3 | 4 | 5; nextAction?: string }) {
  return (
    <div>
      <div className="flex items-center gap-0">
        {([1, 2, 3, 4, 5] as const).map((level, i) => {
          const done = level < currentLevel
          const active = level === currentLevel
          const { text, bg, ring } = LEVEL_COLORS[level]
          return (
            <div key={level} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all',
                    done
                      ? 'bg-success border-success text-white'
                      : active
                      ? `${text} border-current`
                      : 'bg-page border-stroke text-ink-subtle'
                  )}
                  style={active ? { backgroundColor: bg, borderColor: ring } : {}}
                >
                  {done ? '✓' : level}
                </div>
                <p className={cn('text-xs mt-1.5 font-medium text-center', active ? text : done ? 'text-success' : 'text-ink-subtle')}>
                  {LEVEL_LABELS[i]}
                </p>
              </div>
              {i < 4 && <div className={cn('h-0.5 flex-1 mb-5 mx-1', done ? 'bg-success' : 'bg-stroke')} />}
            </div>
          )
        })}
      </div>
      {nextAction && (
        <p className="text-xs text-ink-muted mt-3 pl-1">
          <span className="font-medium">Next:</span> {nextAction}
        </p>
      )}
    </div>
  )
}
