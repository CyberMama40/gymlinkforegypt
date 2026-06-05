import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AppLayout } from './components/shared/app-layout'
import { WelcomeScreen } from './components/shared/welcome-screen'
import { RoleSelectScreen } from './components/shared/role-select-screen'

// Stub screens — real screens will be built separately
function Home() {
  return (
    <div className="ps-4 pe-4 pt-8 font-headline text-2xl text-neutral">
      Home
    </div>
  )
}

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Root redirect — "/" always goes to welcome ── */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* ── Onboarding flow — no app-bar / bottom-nav ── */}
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/role"    element={<RoleSelectScreen />} />

        {/* ── Main app — with AppLayout (app-bar + bottom-nav) ── */}
        <Route element={<AppLayout />}>
          <Route path="home"    element={<Home />}    />
          <Route path="search"  element={<Search />}  />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
