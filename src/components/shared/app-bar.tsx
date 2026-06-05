import { type Lang, useLang } from '../../stores/use-lang'

const LANGS: Lang[] = ['ar', 'en', 'ru']

export function AppBar() {
  const lang = useLang((s) => s.lang)
  const setLang = useLang((s) => s.setLang)

  function handleSelectLang(l: Lang) {
    setLang(l)
  }

  return (
    <header className="h-14 bg-secondary flex items-center justify-between ps-4 pe-4 shrink-0">
      <span className="font-headline text-lg font-bold text-neutral">
        GymLink
      </span>

      <div className="flex items-center gap-1">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => handleSelectLang(l)}
            className={[
              'ps-3 pe-3 py-1 rounded font-label text-xs uppercase transition-colors',
              lang === l
                ? 'text-primary font-bold'
                : 'text-neutral opacity-40 hover:opacity-70',
            ].join(' ')}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
