import { NavLink } from 'react-router'
import { Home, Dumbbell, MessageCircle, User } from 'lucide-react'
import type { ComponentType } from 'react'
import { type Lang, useLang } from '../../stores/use-lang'

// Temporary inline dictionary — will be replaced by proper i18n
const labels: Record<Lang, {
  home:     string
  workouts: string
  messages: string
  profile:  string
}> = {
  en: { home: 'Home',       workouts: 'Workouts',    messages: 'Messages',   profile: 'Profile'  },
  ru: { home: 'Главная',    workouts: 'Тренировки',  messages: 'Сообщения',  profile: 'Профиль'  },
  ar: { home: 'الرئيسية',  workouts: 'التمارين',    messages: 'الرسائل',    profile: 'الملف'    },
}

interface NavItem {
  to:       string
  end?:     boolean
  icon:     ComponentType<{ size: number }>
  labelKey: keyof typeof labels.en
}

const NAV_ITEMS: NavItem[] = [
  { to: '/home',     end: true, icon: Home,          labelKey: 'home'     },
  { to: '/workouts',            icon: Dumbbell,      labelKey: 'workouts' },
  { to: '/messages',            icon: MessageCircle, labelKey: 'messages' },
  { to: '/profile',             icon: User,          labelKey: 'profile'  },
]

export function BottomNav() {
  const lang = useLang((s) => s.lang)
  const t    = labels[lang]

  return (
    // inset-x-0 ensures full-width stretch; border-t + rounded-t-xl + lime glow above the bar
    <nav className="bg-secondary border-t border-white/10 rounded-t-xl shadow-[0_-4px_10px_rgba(204,255,0,0.1)] flex justify-around items-center h-16 shrink-0 inset-x-0">
      {NAV_ITEMS.map(({ to, end, icon: Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              'flex flex-col items-center gap-0.5 py-2 ps-3 pe-3 rounded-full transition-colors',
              isActive ? 'text-primary bg-white/5' : 'text-neutral/60',
            ].join(' ')
          }
        >
          <Icon size={22} />
          <span className="font-label text-xs">{t[labelKey]}</span>
        </NavLink>
      ))}
    </nav>
  )
}
