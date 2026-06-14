/**
 * /exercises/:category — list of exercises in one muscle-group category.
 *
 * Outside AppLayout (no bottom-nav, own header with back button).
 * Fetches from Supabase `exercises` table filtered by `category` slug.
 * Shows: skeleton while loading · error message · empty state · exercise list.
 */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useLang, getDir, type Lang } from '../../../stores/use-lang'
import { supabase } from '../../../lib/supabase-client'
import type { LibraryExercise } from '../../../types/library-exercise'
import { LibraryExerciseCard } from '../../ui/library-exercise-card'

// ── Inline dictionary ────────────────────────────────────────────────────────
const copy: Record<Lang, {
  /** Category display names — keyed by slug */
  categories: Record<string, string>
  loading:    string
  errorMsg:   string
  empty:      string
}> = {
  en: {
    categories: {
      arms:      'Arms',
      back:      'Back',
      cardio:    'Cardio',
      chest:     'Chest',
      core:      'Core',
      legs:      'Legs',
      shoulders: 'Shoulders',
      custom:    'Custom',
    },
    loading:  'Loading exercises…',
    errorMsg: 'Failed to load exercises. Please try again.',
    empty:    'No exercises in this category yet.',
  },
  ru: {
    categories: {
      arms:      'Руки',
      back:      'Спина',
      cardio:    'Кардио',
      chest:     'Грудь',
      core:      'Пресс',
      legs:      'Ноги',
      shoulders: 'Плечи',
      custom:    'Своё',
    },
    loading:  'Загружаем упражнения…',
    errorMsg: 'Не удалось загрузить упражнения. Попробуйте ещё раз.',
    empty:    'В этой категории пока нет упражнений.',
  },
  ar: {
    categories: {
      arms:      'الذراعين',
      back:      'الظهر',
      cardio:    'كارديو',
      chest:     'الصدر',
      core:      'العضلات الأساسية',
      legs:      'الساقين',
      shoulders: 'الأكتاف',
      custom:    'مخصص',
    },
    loading:  'جارٍ تحميل التمارين…',
    errorMsg: 'فشل تحميل التمارين. حاول مرة أخرى.',
    empty:    'لا توجد تمارين في هذه الفئة حتى الآن.',
  },
}

// ── Component ────────────────────────────────────────────────────────────────
export function CategoryExercisesScreen() {
  const { category = '' } = useParams<{ category: string }>()
  const lang              = useLang((s) => s.lang)
  const navigate          = useNavigate()
  const t                 = copy[lang]

  const [exercises, setExercises] = useState<LibraryExercise[]>([])
  const [loading,   setLoading]   = useState(true)
  const [hasError,  setHasError]  = useState(false)

  // Outside AppLayout — apply RTL effect locally
  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  // Fetch exercises for this category.
  // Dependency: only `category` — error/empty strings are read from `t` at render time
  // so they automatically reflect the current language without re-fetching.
  useEffect(() => {
    if (!category) return

    let cancelled = false
    setLoading(true)
    setHasError(false)

    supabase
      .from('exercises')
      .select('*')
      .eq('category', category)
      .order('sort_order')
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setHasError(true)
        } else {
          setExercises(data ?? [])
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [category])

  function handleBack() {
    navigate(-1)
  }

  function handleSelectExercise(_id: string) {
    // TODO: navigate to exercise detail screen
  }

  const pageTitle = t.categories[category] ?? category

  return (
    <div className="min-h-screen bg-tertiary flex flex-col">

      {/* ── Own app-bar — NOT the shared AppBar ── */}
      <header className="flex items-center gap-3 ps-4 pe-4 pt-12 pb-4 border-b border-white/5 sticky top-0 bg-tertiary z-10">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="text-neutral hover:opacity-70 active:scale-90 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-headline text-lg font-bold text-neutral">
          {pageTitle}
        </h1>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 ps-4 pe-4 py-6 flex flex-col gap-3">

        {/* Loading skeleton — mirrors horizontal card shape: rect thumbnail + text bar */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full flex items-center bg-secondary/40 rounded-xl p-3 animate-pulse"
              >
                {/* thumbnail placeholder — matches w-24 h-16 */}
                <div className="w-24 h-16 shrink-0 rounded-lg bg-secondary/60" />
                {/* name placeholder */}
                <div className="ms-3 h-4 w-1/2 rounded bg-secondary/60" />
              </div>
            ))}
          </>
        )}

        {/* Error state */}
        {!loading && hasError && (
          <p className="font-body text-sm text-[#ff6b6b] text-center py-12">
            {t.errorMsg}
          </p>
        )}

        {/* Empty state */}
        {!loading && !hasError && exercises.length === 0 && (
          <p className="font-body text-sm text-neutral/50 text-center py-12">
            {t.empty}
          </p>
        )}

        {/* Exercise list */}
        {!loading && !hasError && exercises.map((ex) => (
          <LibraryExerciseCard
            key={ex.id}
            exercise={ex}
            lang={lang}
            onSelect={handleSelectExercise}
          />
        ))}

      </div>

    </div>
  )
}
