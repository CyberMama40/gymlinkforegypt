/** Day-pill row for the weekly program builder. */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

/** Canonical Mon → Sun order — imported by workouts-screen.tsx and day-accordion.tsx. */
export const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

interface DaySelectorProps {
  dayOrder:     DayKey[]
  dayLabels:    Record<DayKey, string>
  selectedDays: Set<DayKey>
  /** Callback prop — fires when a day pill is toggled */
  onToggle:     (day: DayKey) => void
}

export function DaySelector({ dayOrder, dayLabels, selectedDays, onToggle }: DaySelectorProps) {
  return (
    <div className="flex gap-1.5">
      {dayOrder.map((day) => {
        const active = selectedDays.has(day)
        return (
          <button
            key={day}
            type="button"
            onClick={() => onToggle(day)}
            className={[
              'flex-1 py-2.5 rounded-full font-label text-xs tracking-wide transition-all active:scale-95',
              active
                ? 'bg-primary text-tertiary font-bold'
                : 'bg-secondary text-neutral/60 hover:text-neutral/80',
            ].join(' ')}
          >
            {dayLabels[day]}
          </button>
        )
      })}
    </div>
  )
}
