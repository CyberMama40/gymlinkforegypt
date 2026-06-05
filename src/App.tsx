import { BrowserRouter, Routes, Route } from 'react-router'
import { AppLayout } from './components/shared/app-layout'

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
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
