export function Header({ onClear, onPrint }: {onClear:()=>void; onPrint:()=>void}){
  return (
    <header className="mx-auto max-w-280 px-4 sm:px-6 pt-8 pb-2 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-none">Paint Wall Coverage Estimator</h1>
        <p className="mt-2 text-[15px] text-ink-muted">Figure out how many cans to buy before your hardware store trip.</p>
      </div>
      <div className="no-print hidden sm:flex gap-2 shrink-0 pt-1">
        <button onClick={onClear} className="min-h-10 rounded-xl border border-line bg-white px-3 text-sm font-medium hover:border-[var(--color-accent)]/30 hover:bg-accent-subtle transition-all focus-ring">Clear</button>
        <button onClick={onPrint} className="min-h-10 rounded-xl border border-ink bg-ink px-3 text-sm font-semibold text-white hover:bg-black transition-all focus-ring">Print</button>
      </div>
    </header>
  )
}
export function Footer(){
  return <footer className="mx-auto max-w-280 px-4 sm:px-6 pb-8 text-center text-xs text-ink-muted">Doors subtract 20 sq ft, windows 15 sq ft. Always rounded up. Auto-saved locally.</footer>
}
