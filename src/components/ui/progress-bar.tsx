interface ProgressBarProps {
  /** 0–100 */
  percent: number
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, percent))

  return (
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
