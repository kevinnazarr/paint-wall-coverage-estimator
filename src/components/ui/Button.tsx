type Variant="primary"|"secondary"|"ghost"
export function Button({ variant="secondary", className="", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:Variant}){
  const base="min-h-[40px] rounded-xl border px-3 text-sm font-medium transition-all focus-ring active:scale-[0.98]"
  const v:Record<Variant,string>={
    primary:"bg-[var(--color-ink)] text-white border-[var(--color-ink)] hover:bg-black",
    secondary:"bg-white border-[var(--color-line)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-paper-2)]",
    ghost:"bg-transparent border-transparent hover:bg-[var(--color-paper-2)]",
  }
  return <button className={`${base} ${v[variant]} ${className}`} {...props} />
}
