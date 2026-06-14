/**
 * LibraryExerciseCard — used in CategoryExercisesScreen.
 * Compact horizontal layout: rectangular thumbnail (start) + name (end).
 * object-contain keeps wide multi-phase exercise images fully visible.
 */

import type { LibraryExercise } from '../../types/library-exercise'
import type { Lang } from '../../stores/use-lang'

interface LibraryExerciseCardProps {
  exercise: LibraryExercise
  lang:     Lang
  /** Callback prop — fires when the card is tapped */
  onSelect: (id: string) => void
}

function getName(exercise: LibraryExercise, lang: Lang): string {
  if (lang === 'ar') return exercise.name_ar || exercise.name_en
  if (lang === 'ru') return exercise.name_ru || exercise.name_en
  return exercise.name_en
}

export function LibraryExerciseCard({ exercise, lang, onSelect }: LibraryExerciseCardProps) {
  const name = getName(exercise, lang)

  return (
    <button
      type="button"
      onClick={() => onSelect(exercise.id)}
      className={[
        'w-full flex items-center text-start',
        'bg-secondary rounded-xl border border-white/5 p-3',
        'hover:border-white/15 hover:shadow-[0_0_22px_rgba(204,255,0,0.10)]',
        'active:scale-[0.98] transition-all',
      ].join(' ')}
    >
      {/* ── Thumbnail 96×64 — rectangular matches wide multi-phase images;
           object-contain shows the full image without cropping;
           bg-secondary fills the letterbox areas cleanly ── */}
      <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-secondary">
        {exercise.image_url && (
          <img
            src={exercise.image_url}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* ── Name — ms-3 (logical margin-inline-start) so the gap
           between thumbnail and text flips correctly in RTL ── */}
      <span className="ms-3 font-body font-semibold text-neutral text-sm leading-snug line-clamp-2">
        {name}
      </span>
    </button>
  )
}
