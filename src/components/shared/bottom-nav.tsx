import { NavLink } from 'react-router'
import { Home, Search, User } from 'lucide-react'
import type { ComponentType } from 'react'
import { type Lang, useLang } from '../../stores/use-lang'

// Temporary inline dictionary — will be replaced by proper i18n
const labels: Record<Lang, { home: string; search: string; profile: string }> = {
  en: { home: 'Home',      search: 'Search', profile: 'Profile' },
  ru: { home: 'Главная',   search: 'Поиск',  profile: 'Профиль' },
  ar: { home: 'الرئيسية', search: 'بحث',     profile: 'الملف'   },
}

interface NavItem {
  to: string
  end?: boolean
  icon: ComponentType<{ size: number }>
  labelKey: keyof typeof labels.en
}

const NAV_ITEMS: NavItem[] = [
  { to: '/home',    end: true,  icon: Home,   labelKey: 'home'    },
  { to: '/search',             icon: Search, labelKey: 'search'  },
  { to: '/profile',            icon: User,   labelKey: 'profile' },
]

export function BottomNav() {
  const lang = useLang((s) => s.lang)
  const t = labels[lang]

  return (
    <nav className="bg-secondary flex justify-around items-center h-16 shrink-0">
      {NAV_ITEMS.map(({ to, end, icon: Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              'flex flex-col items-center gap-0.5 py-2 ps-3 pe-3',
              isActive ? 'text-primary' : 'text-neutral opacity-40',
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
