type Variant = "info" | "warn" | "success"
export function Alert({ variant="info", title, children, onClose }: { variant?: Variant; title?: string; children: React.ReactNode; onClose?: ()=>void }) {
  const styles: Record<Variant,string> = {
    info: "border-[var(--color-line)] bg-[var(--color-paper-2)] text-[var(--color-ink)]",
    warn: "border-amber-300 bg-[var(--color-warn-bg)] text-[#78350F]",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  }
  return (
    <div role="alert" className={`relative rounded-2xl border p-4 guard-enter ${styles[variant]}`}>
      {title && <p className="text-sm font-bold leading-none">{title}</p>}
      <div className={`text-sm leading-relaxed ${title?"mt-2":""}`}>{children}</div>
      {onClose && <button onClick={onClose} aria-label="Dismiss notification" className="absolute right-2 top-2 rounded-lg p-1.5 text-xs opacity-60 hover:opacity-100 hover:bg-black/5 transition-colors focus-ring">✕</button>}
    </div>
  )
}
