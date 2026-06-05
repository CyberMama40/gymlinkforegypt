import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Logo } from '../ui/logo'
import { useLang, getDir, type Lang } from '../../stores/use-lang'

// Temporary inline dictionary — will be replaced by proper i18n
const copy: Record<Lang, { tagline: string; cta: string }> = {
  ar: { tagline: 'طريقك الشخصي إلى الأداء العالي', cta: 'ابدأ الآن'                        },
  en: { tagline: 'Your Personal Path to High Performance',       cta: 'Get Started'          },
  ru: { tagline: 'Ваш персональный путь к высоким результатам',  cta: 'Начать'               },
}

export function WelcomeScreen() {
  const lang     = useLang((s) => s.lang)
  const navigate = useNavigate()
  const t        = copy[lang]

  // Welcome is outside AppLayout, so apply RTL effect here too
  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  function handleGetStarted() {
    navigate('/role')
  }

  return (
    <div className="relative min-h-screen bg-tertiary overflow-hidden">

      {/* Background photo — fallback is bg-tertiary if file missing */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/welcome-bg.jpg)' }}
      />

      {/* Dark overlay — gradient: subtle at top, heavy at bottom for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-tertiary/20 via-tertiary/60 to-tertiary/95"
      />

      {/* Content — flex column, content pushed to lower third */}
      <div className="relative flex flex-col justify-end min-h-screen ps-6 pe-6 pb-14">
        <div className="flex flex-col gap-6">

          {/* Logo lockup */}
          <Logo
            variant="lockup"
            className="w-full max-w-[260px]"
          />

          {/* Tagline */}
          <p className="font-headline text-3xl font-bold text-neutral leading-tight text-start">
            {t.tagline}
          </p>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleGetStarted}
            className="w-full bg-primary text-tertiary font-label font-bold text-base py-4 rounded-xl tracking-wide"
          >
            {t.cta}
          </button>

        </div>
      </div>

    </div>
  )
}
