import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useLang, getDir } from '../../stores/use-lang'
import { AppBar } from './app-bar'
import { BottomNav } from './bottom-nav'

export function AppLayout() {
  const lang = useLang((s) => s.lang)

  // RTL effect: runs on every lang change, never inside a callback
  useEffect(() => {
    document.documentElement.dir = getDir(lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="flex flex-col h-screen bg-tertiary text-neutral">
      <AppBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
