function App() {
  return (
    <div className="min-h-screen bg-[#121414] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#c3f400]/10 border border-[#c3f400]/20 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-pulse" />
          <span className="text-[#c3f400] text-xs font-mono tracking-widest uppercase">
            Tailwind v4 — working
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          GymLink
        </h1>
        <p className="text-[#c4c9ac] text-lg max-w-sm mx-auto ps-4 pe-4">
          React 19 · Vite · TypeScript · Tailwind CSS v4
        </p>
      </div>
    </div>
  )
}

export default App
