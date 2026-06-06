import { useLang, type Lang } from '../../../stores/use-lang'

// Temporary inline dictionary — will be replaced by proper i18n
const copy: Record<Lang, { title: string }> = {
  en: { title: 'Workouts'    },
  ru: { title: 'Тренировки'  },
  ar: { title: 'التمارين'    },
}

// Inside AppLayout — RTL and app-bar/bottom-nav are handled by the layout shell.
export function WorkoutsScreen() {
  const lang = useLang((s) => s.lang)
  const t    = copy[lang]

  return (
    <div className="ps-4 pe-4 pt-8">
      <h2 className="font-headline text-2xl font-bold text-neutral">{t.title}</h2>
      {/* TODO: контент экрана */}
    </div>
  )
}
