import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useLang, getDir, type Lang } from '../../stores/use-lang'

// ── Temporary inline dictionary — will be replaced by proper i18n ──
const copy: Record<Lang, {
  sectionTitle:  string
  label:         string
  headline:      string
  subtitle:      string
  ctaSignUp:     string
  ctaLogin:      string
  statDaysLabel:  string
  statGoalsLabel: string
}> = {
  en: {
    sectionTitle:  'FOR CLIENTS',
    label:         'YOUR TRAINING JOURNEY',
    headline:      'Train with\nyour coach',
    subtitle:      'Get personalised programs from your trainer, log your workouts, and track your progress — weight, measurements, results.',
    ctaSignUp:     'Get Started',
    ctaLogin:      'Already have an account? Log in',
    statDaysLabel:  'Training days',
    statGoalsLabel: 'Goals achieved',
  },
  ru: {
    sectionTitle:  'ДЛЯ КЛИЕНТОВ',
    label:         'ТВОЙ ПУТЬ ТРЕНИРОВОК',
    headline:      'Тренируйся со\nсвоим тренером',
    subtitle:      'Получай персональные программы от своего тренера, отмечай выполнение и следи за прогрессом — вес, замеры, результаты.',
    ctaSignUp:     'Начать',
    ctaLogin:      'Уже есть аккаунт? Войти',
    statDaysLabel:  'Дней тренировок',
    statGoalsLabel: 'Достигнуто целей',
  },
  ar: {
    sectionTitle:  'للعملاء',
    label:         'رحلتك التدريبية',
    headline:      'تدرّب مع\nمدربك',
    subtitle:      'احصل على برامج مخصصة من مدربك، سجّل تمارينك، وتابع تقدمك — الوزن والقياسات والنتائج.',
    ctaSignUp:     'ابدأ الآن',
    ctaLogin:      'لديك حساب؟ تسجيل الدخول',
    statDaysLabel:  'أيام التدريب',
    statGoalsLabel: 'الأهداف المحققة',
  },
}

export function ClientOnboardingScreen() {
  const lang     = useLang((s) => s.lang)
  const navigate = useNavigate()
  const t        = copy[lang]

  // Outside AppLayout — apply RTL effect locally
  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  function handleBack() {
    navigate(-1)
  }

  function handleSignUp() {
    navigate('/signup')
  }

  function handleNavigateToSignIn() {
    navigate('/login')
  }

  return (
    <div className="relative min-h-screen bg-tertiary overflow-hidden">

      {/* ── Background photo — fallback is bg-tertiary if file missing ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/client-bg.jpg)' }}
      />

      {/* ── Dark gradient overlay — readable text over photo ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-tertiary/55 to-tertiary/95"
      />

      {/* ── All content — flex col filling the screen ── */}
      <div className="relative flex flex-col min-h-screen">

        {/* Own app-bar — NOT the shared AppBar */}
        <header className="flex items-center gap-3 ps-4 pe-4 pt-12 pb-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="text-neutral hover:opacity-70 active:scale-90 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-label text-xs uppercase tracking-widest text-primary">
            {t.sectionTitle}
          </span>
        </header>

        {/* Spacer — pushes content block to the bottom third */}
        <div className="flex-1" />

        {/* ── Content block ── */}
        <section className="flex flex-col gap-5 ps-6 pe-6 pb-12">

          {/* Label */}
          <span className="font-label text-xs uppercase tracking-widest text-primary">
            {t.label}
          </span>

          {/* Headline — newlines honoured via whitespace-pre-line */}
          <h1 className="font-headline text-4xl font-bold text-neutral leading-tight text-start whitespace-pre-line">
            {t.headline}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base text-neutral/60 text-start leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full bg-primary text-tertiary font-headline font-bold text-base py-4 rounded-lg tracking-wide"
            >
              {t.ctaSignUp}
            </button>
            <button
              type="button"
              onClick={handleNavigateToSignIn}
              className="w-full border border-secondary text-neutral font-headline font-bold text-base py-4 rounded-lg tracking-wide"
            >
              {t.ctaLogin}
            </button>
          </div>

          {/* Stats block — placeholder values until real data available */}
          {/* TODO: replace "—" with real metrics from API */}
          <div className="flex gap-10 pt-2">
            <div className="flex flex-col gap-1">
              <span className="font-headline text-2xl font-bold text-neutral">—</span>
              <span className="font-label text-xs uppercase tracking-wider text-neutral/40">
                {t.statDaysLabel}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline text-2xl font-bold text-neutral">—</span>
              <span className="font-label text-xs uppercase tracking-wider text-neutral/40">
                {t.statGoalsLabel}
              </span>
            </div>
          </div>

        </section>
      </div>

    </div>
  )
}
