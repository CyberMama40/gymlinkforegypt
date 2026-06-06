/**
 * /workouts — Weekly program builder.
 *
 * Architecture:
 *  - DaySelector   → 7 pill toggles (Mon–Sun)
 *  - DayAccordion  → one panel per selected day
 *    └─ ExerciseCard × n
 *       └─ 64×64 placeholder | name/tag | GripVertical | Trash2
 *          └─ Sets / Reps / Weight inputs
 *  - Floating Save button (fixed above BottomNav h-16)
 *
 * Inside AppLayout — RTL and shell are handled by the layout; no local useEffect.
 */

import { useState } from 'react'
import { Save } from 'lucide-react'
import { useLang, type Lang } from '../../../stores/use-lang'
import { DaySelector, DAY_ORDER, type DayKey } from '../../ui/day-selector'
import { DayAccordion } from '../../ui/day-accordion'
import type { Exercise } from '../../ui/exercise-card'

// ── Inline dictionary ────────────────────────────────────────────────────────
const copy: Record<Lang, {
  pageTitle:    string
  pageSubtitle: string
  browsLibrary: string
  savePlan:     string
  sets:         string
  reps:         string
  weight:       string
  selectDays:   string
  days:         Record<DayKey, string>
}> = {
  en: {
    pageTitle:    'Program Builder',
    pageSubtitle: 'Select training days and add exercises for each day.',
    browsLibrary: 'Browse Library',
    savePlan:     'SAVE TRAINING PLAN',
    sets:         'Sets',
    reps:         'Reps',
    weight:       'Weight (kg)',
    selectDays:   'Select training days to start',
    days: {
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
      fri: 'Fri', sat: 'Sat', sun: 'Sun',
    },
  },
  ru: {
    pageTitle:    'Конструктор программ',
    pageSubtitle: 'Выберите дни тренировок и добавьте упражнения.',
    browsLibrary: 'Библиотека',
    savePlan:     'СОХРАНИТЬ ПРОГРАММУ',
    sets:         'Подходы',
    reps:         'Повторения',
    weight:       'Вес (кг)',
    selectDays:   'Выберите дни тренировок для начала',
    days: {
      mon: 'Пн',  tue: 'Вт',  wed: 'Ср',  thu: 'Чт',
      fri: 'Пт',  sat: 'Сб',  sun: 'Вс',
    },
  },
  ar: {
    pageTitle:    'منشئ البرنامج',
    pageSubtitle: 'اختر أيام التدريب وأضف التمارين لكل يوم.',
    browsLibrary: 'مكتبة التمارين',
    savePlan:     'حفظ خطة التدريب',
    sets:         'المجموعات',
    reps:         'التكرارات',
    weight:       'الوزن (كجم)',
    selectDays:   'اختر أيام التدريب للبدء',
    days: {
      mon: 'إث',  tue: 'ثلا', wed: 'أرب', thu: 'خمي',
      fri: 'جمع', sat: 'سبت', sun: 'أحد',
    },
  },
}

// ── Static exercise pool ─────────────────────────────────────────────────────
// TODO: заменить на реальную библиотеку упражнений из Supabase
const EXERCISE_POOL = [
  { name: 'Barbell Back Squat', tag: 'Strength • Compound'    },
  { name: 'Incline DB Press',   tag: 'Strength • Hypertrophy' },
  { name: 'Deadlift',           tag: 'Strength • Compound'    },
  { name: 'Plank',              tag: 'Core • Stability'        },
]

// Initial state for all 7 days
const EMPTY_PROGRAM: Record<DayKey, Exercise[]> = {
  mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [],
}

// Lime glow — rgba derived from --color-primary #CCFF00
const LIME_GLOW = '0 0 30px rgba(204, 255, 0, 0.15)'

// ── Component ────────────────────────────────────────────────────────────────
export function WorkoutsScreen() {
  const lang = useLang((s) => s.lang)
  const t    = copy[lang]

  // Which days are active in the pill row
  const [selectedDays, setSelectedDays] = useState<Set<DayKey>>(new Set())

  // Exercises for ALL 7 days — including deselected ones.
  // Intentional: toggling a day off does NOT wipe its exercises.
  // If the trainer re-enables the day, their previous entries reappear.
  // Data is only removed when the trainer explicitly presses Trash2.
  const [programByDay, setProgramByDay] = useState<Record<DayKey, Exercise[]>>(EMPTY_PROGRAM)

  // Which day accordions are expanded
  const [openDays, setOpenDays] = useState<Set<DayKey>>(new Set())

  // ── Handlers ────────────────────────────────────────────────────────────

  function handleToggleDay(day: DayKey) {
    setSelectedDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) {
        next.delete(day)
        // Collapse the accordion when day is deselected
        setOpenDays((op) => { const o2 = new Set(op); o2.delete(day); return o2 })
      } else {
        next.add(day)
        // Auto-expand accordion when day is selected
        setOpenDays((op) => new Set([...op, day]))
      }
      return next
    })
  }

  function handleToggleAccordion(day: DayKey) {
    setOpenDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else               next.add(day)
      return next
    })
  }

  function handleAddExercise(day: DayKey) {
    setProgramByDay((prev) => {
      const dayList   = prev[day]
      const poolEntry = EXERCISE_POOL[dayList.length % EXERCISE_POOL.length]
      const exercise: Exercise = {
        id:     `${day}-${Date.now()}`,
        name:   poolEntry.name,
        tag:    poolEntry.tag,
        sets:   '',
        reps:   '',
        weight: '',
      }
      return { ...prev, [day]: [...dayList, exercise] }
    })
  }

  function handleRemoveExercise(day: DayKey, exerciseId: string) {
    setProgramByDay((prev) => ({
      ...prev,
      [day]: prev[day].filter((ex) => ex.id !== exerciseId),
    }))
  }

  function handleFieldChange(
    day:        DayKey,
    exerciseId: string,
    field:      'sets' | 'reps' | 'weight',
    value:      string,
  ) {
    setProgramByDay((prev) => ({
      ...prev,
      [day]: prev[day].map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      ),
    }))
  }

  function handleSavePlan() {
    // TODO: persist training plan to Supabase
    const plan: Partial<Record<DayKey, Exercise[]>> = {}
    for (const day of activeDays) plan[day] = programByDay[day]
    console.log('[WorkoutsScreen] save plan:', plan)
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** Proper plural forms without an i18n library — add more langs as needed. */
  function formatExerciseCount(n: number): string {
    if (lang === 'ru') {
      const m = n % 10, h = n % 100
      if (m === 1 && h !== 11)                      return `${n} упражнение`
      if (m >= 2 && m <= 4 && (h < 10 || h >= 20)) return `${n} упражнения`
      return `${n} упражнений`
    }
    if (lang === 'ar') return `${n} تمارين`
    return `${n} exercise${n === 1 ? '' : 's'}`
  }

  // Preserve canonical week order in the accordion list
  const activeDays = DAY_ORDER.filter((d) => selectedDays.has(d))

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    // pb-36 provides clearance for the fixed floating Save button (above BottomNav h-16)
    <div className="ps-4 pe-4 py-6 pb-36 flex flex-col gap-6">

      {/* ── 1. Title block ── */}
      <div>
        <h2 className="font-headline text-2xl font-bold text-neutral">{t.pageTitle}</h2>
        <p className="font-body text-sm text-neutral/50 mt-1">{t.pageSubtitle}</p>
      </div>

      {/* ── 2. Day selector ── */}
      <DaySelector
        dayOrder={DAY_ORDER}
        dayLabels={t.days}
        selectedDays={selectedDays}
        onToggle={handleToggleDay}
      />

      {/* ── 3. Day accordions (canonical week order) or empty state ── */}
      {activeDays.length > 0 ? (
        <div className="flex flex-col gap-4">
          {activeDays.map((day) => (
            <DayAccordion
              key={day}
              dayKey={day}
              dayLabel={t.days[day]}
              exercises={programByDay[day]}
              isOpen={openDays.has(day)}
              exerciseCountLabel={formatExerciseCount(programByDay[day].length)}
              browsLibraryLabel={t.browsLibrary}
              setsLabel={t.sets}
              repsLabel={t.reps}
              weightLabel={t.weight}
              onToggle={handleToggleAccordion}
              onAddExercise={handleAddExercise}
              onRemoveExercise={handleRemoveExercise}
              onFieldChange={handleFieldChange}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-16">
          <p className="font-label text-sm text-neutral/40 text-center">{t.selectDays}</p>
        </div>
      )}

      {/* ── 4. Floating Save button ──────────────────────────────────────────
           fixed + inset-x-0 → full-width stripe above BottomNav.
           flex justify-center (NOT left-1/2) centres the button within it.  ── */}
      <div className="fixed inset-x-0 bottom-16 z-10 px-4 pb-2 flex justify-center">
        <button
          type="button"
          onClick={handleSavePlan}
          style={{ boxShadow: LIME_GLOW }}
          className="max-w-md w-full flex items-center justify-center gap-2 bg-primary text-tertiary font-headline font-bold py-4 rounded-xl tracking-wide active:scale-95 transition-all"
        >
          <Save size={18} />
          <span>{t.savePlan}</span>
        </button>
      </div>

    </div>
  )
}
