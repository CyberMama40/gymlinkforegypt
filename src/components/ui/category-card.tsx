/**
 * Category card for the Exercise Library grid.
 *
 * Variants:
 *   isCustom = false → dark placeholder + gradient overlay + label + lime kinetic line.
 *                      Structure is ready for a real image: swap the bg-gradient
 *                      for an <img> or style={{ backgroundImage }} and the overlay
 *                      div keeps text readable over any photo.
 *   isCustom = true  → solid lime (bg-primary) card + Plus icon + label.
 */

import { Plus } from 'lucide-react'

interface CategoryCardProps {
  slug:     string
  label:    string
  isCustom: boolean
  /** Callback prop — fires when card is pressed */
  onClick:  (slug: string) => void
}

export function CategoryCard({ slug, label, isCustom, onClick }: CategoryCardProps) {

  // ── Custom card ─────────────────────────────────────────────────────────
  if (isCustom) {
    return (
      <button
        type="button"
        onClick={() => onClick(slug)}
        aria-label={label}
        className="relative aspect-square rounded-xl overflow-hidden bg-primary flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.25)] active:scale-95 transition-all"
      >
        <Plus size={32} className="text-tertiary" />
        <span className="font-headline font-bold text-tertiary text-sm">{label}</span>
      </button>
    )
  }

  // ── Normal placeholder card ──────────────────────────────────────────────
  return (
    <button
      type="button"
      onClick={() => onClick(slug)}
      aria-label={label}
      className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-tertiary shadow-[0_0_16px_rgba(204,255,0,0.08)] hover:shadow-[0_0_22px_rgba(204,255,0,0.18)] active:scale-95 transition-all"
    >
      {/* TODO: заменить плейсхолдер на фото категории из Supabase Storage.
          Добавь <img className="absolute inset-0 w-full h-full object-cover" src={...} alt="" />
          перед overlay-div — оверлей автоматически обеспечит читаемость текста. */}

      {/* Gradient overlay — ensures label stays readable over any future photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-tertiary/90 via-tertiary/25 to-transparent" />

      {/* Label + kinetic border — anchored to bottom-start corner */}
      <div className="absolute bottom-0 start-0 end-0 p-4">
        <p className="font-headline font-bold text-neutral text-sm leading-tight">{label}</p>
        {/* Short lime underline (kinetic border) — block-level, aligns to inline-start in both LTR and RTL */}
        <div className="h-0.5 w-8 bg-primary mt-1.5 rounded-full" />
      </div>
    </button>
  )
}
