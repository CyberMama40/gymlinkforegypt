/**
 * Row shape of the `exercises` table in Supabase.
 * Used by the Exercise Library screens (browse by category, detail).
 * Not to be confused with the workout-builder `Exercise` in ui/exercise-card.tsx.
 */
export interface LibraryExercise {
  id:             string
  category:       string
  name_en:        string
  name_ru:        string
  name_ar:        string
  description_en: string | null
  description_ru: string | null
  description_ar: string | null
  image_url:      string | null
  video_url:      string | null
  equipment:      string | null
  difficulty:     string | null
  sort_order:     number
}
