import { MoreVertical } from 'lucide-react'
import { ProgressBar } from './progress-bar'

// ── Data shape — exported so active-client.tsx can build the array ──
export interface ClientCardData {
  id:             string
  name:           string
  lastWorkout:    string   // content data, not localised (user-generated text)
  weeklyProgress: number   // 0–100
  isOnline:       boolean
}

interface ClientCardProps {
  client:              ClientCardData
  /** Localised "WEEKLY PROGRESS" label — passed in by the parent screen */
  weeklyProgressLabel: string
  /** Callback prop — fires when the ⋮ button is pressed */
  onMorePress:         (id: string) => void
}

/** Derives two-letter initials from a full name (e.g. "Sarah Connor" → "SC") */
function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
}

export function ClientCard({ client, weeklyProgressLabel, onMorePress }: ClientCardProps) {
  return (
    <div className="bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl p-5">

      {/* ── Top row: avatar + name/workout + more button ── */}
      <div className="flex items-start justify-between mb-4">

        <div className="flex items-center gap-3">
          {/* Avatar with online dot */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-secondary border border-white/10 flex items-center justify-center">
              <span className="font-headline text-base font-bold text-neutral">
                {initials(client.name)}
              </span>
            </div>
            {/* Online indicator — end-0/bottom-0, never right-0 */}
            <span
              className={[
                'absolute end-0 bottom-0 w-3 h-3 rounded-full border-2 border-tertiary',
                client.isOnline ? 'bg-primary' : 'bg-neutral/25',
              ].join(' ')}
            />
          </div>

          {/* Name + last workout */}
          <div>
            <p className="font-body font-semibold text-neutral">{client.name}</p>
            <p className="font-label text-xs text-neutral/50 mt-0.5 tracking-wider">
              {client.lastWorkout}
            </p>
          </div>
        </div>

        {/* More options — stub, no action yet */}
        <button
          type="button"
          onClick={() => onMorePress(client.id)}
          aria-label="More options"
          className="text-neutral/40 hover:text-neutral/70 active:scale-90 transition-all"
        >
          <MoreVertical size={20} />
        </button>

      </div>

      {/* ── Progress row ── */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-label text-xs text-neutral/50">{weeklyProgressLabel}</span>
        <span className="font-label text-xs text-primary">{client.weeklyProgress}%</span>
      </div>
      <ProgressBar percent={client.weeklyProgress} />

    </div>
  )
}
