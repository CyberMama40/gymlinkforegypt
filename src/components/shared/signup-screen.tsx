import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useLang, getDir, type Lang } from '../../stores/use-lang'

// ── Temporary inline dictionary — will be replaced by proper i18n ──
const copy: Record<Lang, {
  screenTitle:       string
  firstName:         string
  lastName:          string
  email:             string
  password:          string
  confirmPassword:   string
  submit:            string
  orDivider:         string
  google:            string
  apple:             string
  haveAccount:       string
  errRequired:       string
  errEmail:          string
  errPasswordShort:  string
  errPasswordMatch:  string
}> = {
  en: {
    screenTitle:      'Create Account',
    firstName:        'First Name',
    lastName:         'Last Name',
    email:            'Email',
    password:         'Password',
    confirmPassword:  'Confirm Password',
    submit:           'Create Account',
    orDivider:        'or',
    google:           'Continue with Google',
    apple:            'Continue with Apple',
    haveAccount:      'Already have an account? Sign in',
    errRequired:      'This field is required',
    errEmail:         'Please enter a valid email',
    errPasswordShort: 'Password must be at least 8 characters',
    errPasswordMatch: 'Passwords do not match',
  },
  ru: {
    screenTitle:      'Создать аккаунт',
    firstName:        'Имя',
    lastName:         'Фамилия',
    email:            'Электронная почта',
    password:         'Пароль',
    confirmPassword:  'Подтвердите пароль',
    submit:           'Зарегистрироваться',
    orDivider:        'или',
    google:           'Продолжить с Google',
    apple:            'Продолжить с Apple',
    haveAccount:      'Уже есть аккаунт? Войти',
    errRequired:      'Это поле обязательно',
    errEmail:         'Введите корректный email',
    errPasswordShort: 'Пароль — не менее 8 символов',
    errPasswordMatch: 'Пароли не совпадают',
  },
  ar: {
    screenTitle:      'إنشاء حساب',
    firstName:        'الاسم الأول',
    lastName:         'اسم العائلة',
    email:            'البريد الإلكتروني',
    password:         'كلمة المرور',
    confirmPassword:  'تأكيد كلمة المرور',
    submit:           'إنشاء حساب',
    orDivider:        'أو',
    google:           'المتابعة عبر Google',
    apple:            'المتابعة عبر Apple',
    haveAccount:      'لديك حساب؟ تسجيل الدخول',
    errRequired:      'هذا الحقل مطلوب',
    errEmail:         'أدخل بريداً إلكترونياً صحيحاً',
    errPasswordShort: 'كلمة المرور 8 أحرف على الأقل',
    errPasswordMatch: 'كلمات المرور غير متطابقة',
  },
}

interface FormErrors {
  firstName?:       string
  lastName?:        string
  email?:           string
  password?:        string
  confirmPassword?: string
}

// Shared input className builder — avoids repeating long class strings
function inputCls(hasError: boolean): string {
  return [
    'w-full bg-secondary rounded-lg ps-4 py-3 font-body text-sm text-neutral',
    'border outline-none transition-colors placeholder:text-neutral/40',
    hasError
      ? 'border-[#ff6b6b]'
      : 'border-white/10 focus:border-primary',
  ].join(' ')
}

export function SignupScreen() {
  const lang     = useLang((s) => s.lang)
  const navigate = useNavigate()
  const t        = copy[lang]

  // ── Field state ──
  const [firstName,       setFirstName]       = useState('')
  const [lastName,        setLastName]         = useState('')
  const [email,           setEmail]            = useState('')
  const [password,        setPassword]         = useState('')
  const [confirmPassword, setConfirmPassword]  = useState('')

  // ── UI state ──
  const [showPassword,        setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors,              setErrors]              = useState<FormErrors>({})

  // Outside AppLayout — apply RTL effect locally
  useEffect(() => {
    document.documentElement.dir  = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  function handleBack() {
    navigate(-1)
  }

  function handleTogglePassword(field: 'password' | 'confirm') {
    if (field === 'password') setShowPassword((v) => !v)
    else                      setShowConfirmPassword((v) => !v)
  }

  function handleSubmit() {
    const next: FormErrors = {}

    if (!firstName.trim())       next.firstName       = t.errRequired
    if (!lastName.trim())        next.lastName        = t.errRequired

    if (!email.trim()) {
      next.email = t.errRequired
    } else if (!email.includes('@') || !email.includes('.')) {
      next.email = t.errEmail
    }

    if (!password) {
      next.password = t.errRequired
    } else if (password.length < 8) {
      next.password = t.errPasswordShort
    }

    if (!confirmPassword) {
      next.confirmPassword = t.errRequired
    } else if (confirmPassword !== password) {
      next.confirmPassword = t.errPasswordMatch
    }

    setErrors(next)

    if (Object.keys(next).length === 0) {
      // TODO: подключить Supabase Auth — передать { firstName, lastName, email, password }
      console.log('signup data:', { firstName, lastName, email })
    }
  }

  function handleGoogleSignup() {
    // TODO: OAuth через Supabase (Google provider)
    console.log('google signup')
  }

  function handleAppleSignup() {
    // TODO: OAuth через Supabase (Apple provider)
    console.log('apple signup')
  }

  function handleGoToLogin() {
    // TODO: navigate to /login when that screen is built
    navigate('/welcome')
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

      {/* ── Scrollable form area ── */}
      <div className="flex-1 overflow-y-auto ps-6 pe-6 py-8">
        <div className="flex flex-col gap-5">

          {/* firstName */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs text-neutral/60 uppercase tracking-wider">
              {t.firstName}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t.firstName}
              className={inputCls(!!errors.firstName)}
            />
            {errors.firstName && (
              <span className="font-label text-xs text-[#ff6b6b]">{errors.firstName}</span>
            )}
          </div>

          {/* lastName */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs text-neutral/60 uppercase tracking-wider">
              {t.lastName}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t.lastName}
              className={inputCls(!!errors.lastName)}
            />
            {errors.lastName && (
              <span className="font-label text-xs text-[#ff6b6b]">{errors.lastName}</span>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs text-neutral/60 uppercase tracking-wider">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={inputCls(!!errors.email)}
            />
            {errors.email && (
              <span className="font-label text-xs text-[#ff6b6b]">{errors.email}</span>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs text-neutral/60 uppercase tracking-wider">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={[inputCls(!!errors.password), 'pe-12'].join(' ')}
              />
              <button
                type="button"
                onClick={() => handleTogglePassword('password')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 end-0 flex items-center pe-4 text-neutral/40 hover:text-neutral/70 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="font-label text-xs text-[#ff6b6b]">{errors.password}</span>
            )}
          </div>

          {/* confirmPassword */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs text-neutral/60 uppercase tracking-wider">
              {t.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={[inputCls(!!errors.confirmPassword), 'pe-12'].join(' ')}
              />
              <button
                type="button"
                onClick={() => handleTogglePassword('confirm')}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 end-0 flex items-center pe-4 text-neutral/40 hover:text-neutral/70 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="font-label text-xs text-[#ff6b6b]">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-primary text-tertiary font-headline font-bold text-base py-4 rounded-lg tracking-wide mt-1"
          >
            {t.submit}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-label text-xs text-neutral/40 uppercase tracking-widest">
              {t.orDivider}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full bg-secondary border border-white/10 text-neutral font-headline font-bold text-sm py-4 rounded-lg tracking-wide"
            >
              {t.google}
            </button>
            <button
              type="button"
              onClick={handleAppleSignup}
              className="w-full bg-secondary border border-white/10 text-neutral font-headline font-bold text-sm py-4 rounded-lg tracking-wide"
            >
              {t.apple}
            </button>
          </div>

          {/* Login link */}
          <button
            type="button"
            onClick={handleGoToLogin}
            className="w-full text-primary font-headline font-bold text-sm py-3 tracking-wide"
          >
            {t.haveAccount}
          </button>

        </div>
      </div>

    </div>
  )
}
