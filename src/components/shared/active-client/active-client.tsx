import type { ComponentType } from 'react'
import { UserPlus, CheckCircle, MessageSquare } from 'lucide-react'
import { useLang, type Lang } from '../../../stores/use-lang'
import { ClientCard, type ClientCardData } from '../../ui/client-card'
import { ProgressBar } from '../../ui/progress-bar'

// ── Temporary inline dictionary — will be replaced by proper i18n ──
const copy: Record<Lang, {
  pageTitle:        string
  pageSubtitle:     string
  addClient:        string
  weeklyProgress:   string
  coachPerformance: string
  totalActive:      string
  compliance:       string
  monthlyTarget:    string
  recentActions:    string
}> = {
  en: {
    pageTitle:        'Active Clients',
    pageSubtitle:     'Managing 12 elite athletes today.',
    addClient:        'Add Client',
    weeklyProgress:   'WEEKLY PROGRESS',
    coachPerformance: 'COACH PERFORMANCE',
    totalActive:      'Total Active',
    compliance:       'Compliance',
    monthlyTarget:    'MONTHLY TARGET',
    recentActions:    'RECENT ACTIONS',
  },
  ru: {
    pageTitle:        'Активные клиенты',
    pageSubtitle:     'Управляем 12 элитными спортсменами сегодня.',
    addClient:        'Добавить клиента',
    weeklyProgress:   'ПРОГРЕСС ЗА НЕДЕЛЮ',
    coachPerformance: 'ЭФФЕКТИВНОСТЬ ТРЕНЕРА',
    totalActive:      'Всего активных',
    compliance:       'Выполнение',
    monthlyTarget:    'ЦЕЛЬ МЕСЯЦА',
    recentActions:    'ПОСЛЕДНИЕ СОБЫТИЯ',
  },
  ar: {
    pageTitle:        'العملاء النشطون',
    pageSubtitle:     'إدارة 12 رياضياً متميزاً اليوم.',
    addClient:        'إضافة عميل',
    weeklyProgress:   'التقدم الأسبوعي',
    coachPerformance: 'أداء المدرب',
    totalActive:      'المجموع النشط',
    compliance:       'الالتزام',
    monthlyTarget:    'الهدف الشهري',
    recentActions:    'الإجراءات الأخيرة',
  },
}

// ── Static client data — TODO: заменить на запрос к Supabase ──
const CLIENTS: ClientCardData[] = [
  {
    id:             '1',
    name:           'Sarah Connor',
    lastWorkout:    'HEAVY LEGS • 2H AGO',
    weeklyProgress: 82,
    isOnline:       true,
  },
  {
    id:             '2',
    name:           'Marcus Aurelius',
    lastWorkout:    'UPPER PUSH • 1D AGO',
    weeklyProgress: 45,
    isOnline:       false,
  },
  {
    id:             '3',
    name:           'Elena Rodriguez',
    lastWorkout:    'RECOVERY YOGA • 4H AGO',
    weeklyProgress: 95,
    isOnline:       true,
  },
]

interface RecentActionItem {
  id:          string
  icon:        ComponentType<{ size: number }>
  highlighted: boolean    // true → lime icon bg, false → dim
  title:       string     // content data — not localised
  subtitle:    string
}

// ── Static activity feed — TODO: заменить на запрос к Supabase ──
const RECENT_ACTIONS: RecentActionItem[] = [
  {
    id:          '1',
    icon:        CheckCircle,
    highlighted: true,
    title:       'Sarah logged PR',
    subtitle:    'Squat: 105kg x 5',
  },
  {
    id:          '2',
    icon:        MessageSquare,
    highlighted: false,
    title:       'Marcus sent a message',
    subtitle:    '"Lower back feels tight..."',
  },
]

// Lime glow — rgba derived from --color-primary #CCFF00, NOT the prototype's #c3f400
const LIME_GLOW = '0 0 15px rgba(204, 255, 0, 0.2)'

export function ActiveClientScreen() {
  // Inside AppLayout — RTL is managed by AppLayout; no local useEffect needed.
  const lang = useLang((s) => s.lang)
  const t    = copy[lang]

  function handleAddClient() {
    // TODO: navigate to add-client form
    console.log('add client')
  }

  function handleMorePress(clientId: string) {
    // TODO: open client options bottom sheet
    console.log('more options for client', clientId)
  }

  return (
    <div className="ps-4 pe-4 py-6 flex flex-col gap-6">

      {/* ── 1. Title block ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-neutral">{t.pageTitle}</h2>
          <p className="font-body text-sm text-neutral/50 mt-1">{t.pageSubtitle}</p>
        </div>

        <button
          type="button"
          onClick={handleAddClient}
          style={{ boxShadow: LIME_GLOW }}
          className="flex items-center gap-2 bg-primary text-tertiary font-headline font-bold text-sm ps-4 pe-4 py-2.5 rounded-lg tracking-wide shrink-0 active:scale-95 transition-all"
        >
          <UserPlus size={16} />
          <span>{t.addClient}</span>
        </button>
      </div>

      {/* ── 2. Client list (rendered from static array) ── */}
      <div className="flex flex-col gap-3">
        {CLIENTS.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            weeklyProgressLabel={t.weeklyProgress}
            onMorePress={handleMorePress}
          />
        ))}
      </div>

      {/* ── 3. Coach Performance ── */}
      <div className="bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex flex-col gap-4">

        <h3 className="font-label text-xs tracking-wider text-primary">
          {t.coachPerformance}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-neutral/60">{t.totalActive}</span>
          <span className="font-label text-lg font-bold text-neutral">12</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-neutral/60">{t.compliance}</span>
          <span className="font-label text-lg font-bold text-neutral">92%</span>
        </div>

        <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs text-neutral/50">{t.monthlyTarget}</span>
            <span className="font-label text-xs text-primary">12 / 15</span>
          </div>
          <ProgressBar percent={80} />
        </div>

      </div>

      {/* ── 4. Recent Actions ── */}
      <div className="bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex flex-col gap-4">

        <h3 className="font-label text-xs tracking-wider text-primary">
          {t.recentActions}
        </h3>

        {RECENT_ACTIONS.map(({ id, icon: Icon, highlighted, title, subtitle }) => (
          <div key={id} className="flex items-start gap-3">
            {/* Icon badge — text color propagates to lucide icon via currentColor */}
            <div
              className={[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                highlighted ? 'bg-primary/15 text-primary' : 'bg-white/5 text-neutral/40',
              ].join(' ')}
            >
              <Icon size={18} />
            </div>
            <div>
              <p className="font-body text-sm text-neutral leading-tight">{title}</p>
              <p className="font-label text-xs text-neutral/50 mt-0.5">{subtitle}</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}
