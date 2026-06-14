import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useLang, getDir, type Lang } from '../../stores/use-lang'
import { supabase } from '../../lib/supabase-client'

// Temporary inline dictionary — will be replaced by proper i18n
const copy: Record<Lang, {
  screenTitle: string
  subtitle:    string
  google:      string
  errOAuth:    string
}> = {
  en: {
    screenTitle: 'Sign In',
    subtitle:    'Welcome back!',
    google:      'Continue with Google',
    errOAuth:    'Google sign-in failed. Please try again.',
  },
  ru: {
    screenTitle: 'Войти',
    subtitle:    'С возвращением!',
    google:      'Продолжить с Google',
    errOAuth:    'Ошибка входа через Google. Попробуйте ещё раз.',
  },
  ar: {
    screenTitle: 'تسجيل الدخول',
    subtitle:    'مرحباً بعودتك!',
    google:      'المتابعة عبر Google',
    errOAuth:    'فشل تسجيل الدخول عبر Google. حاول مرة أخرى.',
  },
}

// Outside AppLayout — apply RTL effect locally
export function LoginScreen() {
  const lang     = useLang((s) => s.lang)
  const navigate = useNavigate()
  const t        = copy[lang]

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [oauthError,      setOauthError]      = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  function handleBack() {
    navigate(-1)
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)
    setOauthError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options:  { redirectTo: `${window.location.origin}/home` },
    })

    if (error) {
      setOauthError(t.errOAuth)
      setIsGoogleLoading(false)
    }
    // On success — browser navigates to Google; no further action needed here.
  }

  return (
    <div className="min-h-screen bg-tertiary flex flex-col">

      {/* ── Own app-bar ── */}
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
          {t.screenTitle}
        </h1>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col justify-center ps-6 pe-6 gap-5">

        <p className="font-body text-neutral/50 text-sm text-center">{t.subtitle}</p>

        {/* Google sign-in — same call as signup-screen.tsx: signInWithOAuth works for
            both new and existing accounts; Supabase resolves which case applies */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full bg-secondary border border-white/10 text-neutral font-headline font-bold text-sm py-4 rounded-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.google}
        </button>

        {oauthError && (
          <span className="font-label text-xs text-[#ff6b6b] text-center">{oauthError}</span>
        )}

        {/* TODO: email + password form */}

      </div>

    </div>
  )
}
