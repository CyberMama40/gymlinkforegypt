/**
 * Exercise card — used inside DayAccordion.
 * Shows a 64×64 colour-block placeholder, exercise name + tag,
 * a decorative drag handle, a delete button, and Sets/Reps/Weight inputs.
 */

import { GripVertical, Trash2 } from 'lucide-react'

export interface Exercise {
  id:     string
  name:   string
  tag:    string    // e.g. "Strength • Compound" — content data, not localised
  sets:   string    // stored as string to allow empty state; user types a number
  reps:   string
  weight: string
}

interface ExerciseCardProps {
  exercise:    Exercise
  setsLabel:   string
  repsLabel:   string
  weightLabel: string
  /** Callback prop — fires when a numeric field changes */
  onFieldChange: (id: string, field: 'sets' | 'reps' | 'weight', value: string) => void
  /** Callback prop — fires when the delete button is pressed */
  onRemove:    (id: string) => void
}

export function ExerciseCard({
  exercise, setsLabel, repsLabel, weightLabel, onFieldChange, onRemove,
}: ExerciseCardProps) {
  const inputCls =
    'w-full bg-secondary border border-white/10 rounded-lg py-2 ps-3 pe-3 ' +
    'font-label text-sm text-primary focus:border-primary/60 outline-none transition-colors'

  return (
    <div className="bg-secondary/40 border border-white/5 rounded-xl p-4">

      {/* ── Top row: placeholder thumbnail + name/tag + drag + delete ── */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* 64×64 colour-block — replace with <img> when Supabase library is connected */}
          <div className="w-16 h-16 rounded-lg bg-secondary shrink-0" />
          <div>
            <p className="font-body font-semibold text-neutral">{exercise.name}</p>
            <p className="font-label text-xs text-neutral/50 mt-0.5 tracking-wide">{exercise.tag}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* GripVertical — decorative only; real drag-and-drop is a future task */}
          <button
            type="button"
            aria-label="Drag to reorder"
            className="p-2 rounded-lg text-neutral/30 hover:bg-white/5 hover:text-neutral/60 transition-colors cursor-grab"
          >
            <GripVertical size={18} />
          </button>
          <button
            type="button"
            onClick={() => onRemove(exercise.id)}
            aria-label="Remove exercise"
            className="p-2 rounded-lg text-[#ff6b6b] hover:bg-red-500/10 active:scale-90 transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* ── Sets / Reps / Weight grid ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs text-neutral/50">{setsLabel}</label>
          {/* dir="ltr": numbers are written left-to-right in all languages */}
          <input
            type="number"
            inputMode="numeric"
            dir="ltr"
            value={exercise.sets}
            placeholder="3"
            onChange={(e) => onFieldChange(exercise.id, 'sets', e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs text-neutral/50">{repsLabel}</label>
          <input
            type="number"
            inputMode="numeric"
            dir="ltr"
            value={exercise.reps}
            placeholder="12"
            onChange={(e) => onFieldChange(exercise.id, 'reps', e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs text-neutral/50">{weightLabel}</label>
          <input
            type="number"
            inputMode="numeric"
            dir="ltr"
            value={exercise.weight}
            placeholder="32"
            onChange={(e) => onFieldChange(exercise.id, 'weight', e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

    </div>
  )
}
