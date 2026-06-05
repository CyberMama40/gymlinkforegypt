import { useEffect } from 'react'
import { useLang, getDir, type Lang } from '../../stores/use-lang'

// Temporary inline dictionary — will be replaced by proper i18n
const copy: Record<Lang, { title: string; trainer: string; client: string }> = {
  ar: { title: 'اختر دورك',       trainer: 'مدرب',   client: 'عميل'   },
  en: { title: 'Choose Your Role', trainer: 'Trainer', client: 'Client' },
  ru: { title: 'Выберите роль',    trainer: 'Тренер',  client: 'Клиент' },
}

export function RoleSelectScreen() {
  const lang = useLang((s) => s.lang)
  const t    = copy[lang]

  // Outside AppLayout — apply RTL effect locally
  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="min-h-screen bg-tertiary flex flex-col items-center justify-center gap-10 ps-6 pe-6">

      <h1 className="font-headline text-3xl font-bold text-neutral text-start w-full max-w-sm">
        {t.title}
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">

        {/* Trainer button — primary style */}
        <button
          type="button"
          onClick={() => console.log('trainer selected')}
          className="w-full bg-primary text-tertiary font-label font-bold text-base py-4 rounded-xl tracking-wide"
        >
          {t.trainer}
        </button>

        {/* Client button — outlined style */}
        <button
          type="button"
          onClick={() => console.log('client selected')}
          className="w-full border border-neutral/30 text-neutral font-label font-bold text-base py-4 rounded-xl tracking-wide"
        >
          {t.client}
        </button>

      </div>

    </div>
  )
}
