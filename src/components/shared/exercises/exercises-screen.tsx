/**
 * /exercises — Exercise Library: browse by muscle group.
 *
 * Grid: 2 columns × 4 rows = 8 category cards.
 * 7 normal cards  → dark placeholder, ready for a Supabase Storage image.
 * 1 custom card   → solid lime, Plus icon.
 *
 * Inside AppLayout — RTL and shell handled by the layout; no local useEffect.
 */

import { useNavigate } from 'react-router'
import { useLang, type Lang } from '../../../stores/use-lang'
import { CategoryCard } from '../../ui/category-card'

// ── Inline dictionary ────────────────────────────────────────────────────────
const copy: Record<Lang, {
  pageTitle:    string
  pageSubtitle: string
  categories: {
    arms:      string
    back:      string
    cardio:    string
    chest:     string
    core:      string
    legs:      string
    shoulders: string
    custom:    string
  }
}> = {
  en: {
    pageTitle:    'Exercise Library',
    pageSubtitle: 'Browse by muscle group',
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
  },
  ru: {
    pageTitle:    'Библиотека упражнений',
    pageSubtitle: 'Выбрать по группе мышц',
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
  },
  ar: {
    pageTitle:    'مكتبة التمارين',
    pageSubtitle: 'تصفح حسب مجموعة العضلات',
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
  },
}

// ── Category data ─────────────────────────────────────────────────────────────
// slug  — technical kebab key, never localised.
// isCustom — drives the lime-card variant in CategoryCard.
type CategorySlug = keyof typeof copy.en.categories

interface Category {
  slug:      CategorySlug
  isCustom:  boolean
  /** Local path under /public — omit until photo is available, falls back to dark placeholder */
  imageSrc?: string
}

const CATEGORIES: Category[] = [
  { slug: 'arms',      isCustom: false, imageSrc: '/categories/screen.png' },
  { slug: 'back',      isCustom: false, imageSrc: '/categories/back.png' },
  { slug: 'cardio',    isCustom: false, imageSrc: '/categories/cardio.png' },
  { slug: 'chest',     isCustom: false, imageSrc: '/categories/chest.png' },
  { slug: 'core',      isCustom: false, imageSrc: '/categories/core.png' },
  { slug: 'legs',      isCustom: false, imageSrc: '/categories/legs.png'      },
  { slug: 'shoulders', isCustom: false, imageSrc: '/categories/shoulders.png' },
  { slug: 'custom',    isCustom: true  },
]

// ── Component ────────────────────────────────────────────────────────────────
export function ExercisesScreen() {
  const lang     = useLang((s) => s.lang)
  const navigate = useNavigate()
  const t        = copy[lang]

  function handleSelectCategory(slug: string) {
    navigate(`/exercises/${slug}`)
  }

  return (
    <div className="ps-4 pe-4 py-6 pb-24 flex flex-col gap-6">

      {/* ── 1. Title block ── */}
      <div>
        <h2 className="font-headline text-2xl font-bold text-neutral">{t.pageTitle}</h2>
        <p className="font-body text-sm text-neutral/50 mt-1">{t.pageSubtitle}</p>
      </div>

      {/* ── 2. Category grid 2 × 4 ── */}
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.slug}
            slug={cat.slug}
            label={t.categories[cat.slug]}
            isCustom={cat.isCustom}
            imageSrc={cat.imageSrc}
            onClick={handleSelectCategory}
          />
        ))}
      </div>

    </div>
  )
}
