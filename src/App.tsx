import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router'
import { AppLayout } from './components/shared/app-layout'
import { ActiveClientScreen } from './components/shared/active-client/active-client'
import { supabase } from './lib/supabase-client'
import { WelcomeScreen } from './components/shared/welcome-screen'
import { RoleSelectScreen } from './components/shared/role-select-screen'
import { TrainerOnboardingScreen } from './components/shared/trainer-onboarding-screen'
import { ClientOnboardingScreen } from './components/shared/client-onboarding-screen'
import { SignupScreen } from './components/shared/signup-screen'

// Stub screens — real screens will be built separately
function Search() {
  return (
    <div className="ps-4 pe-4 pt-8 font-headline text-2xl text-neutral">
      Search
    </div>
  )
}

function Profile() {
  return (
    <div className="ps-4 pe-4 pt-8 font-headline text-2xl text-neutral">
      Profile
    </div>
  )
}

// Session guard for /home, /search, /profile.
// Redirects to /welcome when there is no active Supabase session.
// Also catches the OAuth callback: Supabase processes the token from the
// URL hash/search params before this component mounts, so getSession()
// already reflects the newly-created session on return from Google.
function ProtectedRoute() {
  const navigate = useNavigate()
  const [ready,  setReady]  = useState(false)

  useEffect(() => {
    // Initial session check (covers page reload and OAuth callback return)
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/welcome', { replace: true })
      setReady(true)
    })

    // Keep in sync while the app is open (sign-out, session expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) navigate('/welcome', { replace: true })
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (!ready) return null   // brief blank while session check is in flight
  return <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Root redirect — "/" always goes to welcome ── */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* ── Onboarding flow — no app-bar / bottom-nav ── */}
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/role"    element={<RoleSelectScreen />} />
        <Route path="/trainer" element={<TrainerOnboardingScreen />} />
        <Route path="/client"  element={<ClientOnboardingScreen />} />
        <Route path="/signup"  element={<SignupScreen />} />

        {/* ── Main app — protected: requires active Supabase session ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="home"    element={<ActiveClientScreen />} />
            <Route path="search"  element={<Search />}  />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
