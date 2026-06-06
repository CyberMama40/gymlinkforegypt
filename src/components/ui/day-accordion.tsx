/**
 * Accordion for a single training day.
 * Header: day name + exercise count badge + chevron toggle.
 * Body: ExerciseCard list + Browse Library dashed button.
 */

import { ChevronDown, PlusCircle } from 'lucide-react'
import type { DayKey } from './day-selector'
import { ExerciseCard, type Exercise } from './exercise-card'

interface DayAccordionProps {
  dayKey:             DayKey
  dayLabel:           string
  exercises:          Exercise[]
  isOpen:             boolean
  exerciseCountLabel: string   // pre-formatted, e.g. "3 exercises" — computed by parent
  browsLibraryLabel:  string
  setsLabel:          string
  repsLabel:          string
  weightLabel:        string
  /** Callback props */
  onToggle:           (day: DayKey) => void
  onAddExercise:      (day: DayKey) => void
  onRemoveExercise:   (day: DayKey, id: string) => void
  onFieldChange:      (day: DayKey, id: string, field: 'sets' | 'reps' | 'weight', value: string) => void
}

export function DayAccordion({
  dayKey, dayLabel, exercises, isOpen, exerciseCountLabel,
  browsLibraryLabel, setsLabel, repsLabel, weightLabel,
  onToggle, onAddExercise, onRemoveExercise, onFieldChange,
}: DayAccordionProps) {
  return (
    <div className="bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">

      {/* ── Accordion header ── */}
      <button
        type="button"
        onClick={() => onToggle(dayKey)}
        className="w-full flex items-center justify-between ps-5 pe-4 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="font-headline text-base font-bold text-neutral">{dayLabel}</span>
          <span className="font-label text-xs text-primary bg-primary/10 ps-2 pe-2 py-0.5 rounded-full">
            {exerciseCountLabel}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={[
            'text-neutral/50 transition-transform duration-200',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {/* ── Accordion body (conditionally rendered) ── */}
      {isOpen && (
        <div className="ps-4 pe-4 pb-4 flex flex-col gap-3">

          {exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              setsLabel={setsLabel}
              repsLabel={repsLabel}
              weightLabel={weightLabel}
              onFieldChange={(id, field, value) => onFieldChange(dayKey, id, field, value)}
              onRemove={(id) => onRemoveExercise(dayKey, id)}
            />
          ))}

          {/* Browse Library — adds the next exercise from the stub pool */}
          <button
            type="button"
            onClick={() => onAddExercise(dayKey)}
            className="border-2 border-dashed border-white/15 rounded-xl py-5 flex flex-col items-center gap-2 text-neutral/50 hover:border-primary/40 hover:text-primary/60 active:scale-95 transition-all"
          >
            <PlusCircle size={24} />
            <span className="font-label text-xs">{browsLibraryLabel}</span>
          </button>

        </div>
      )}

    </div>
  )
}
