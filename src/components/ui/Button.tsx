type Variant="primary"|"secondary"|"ghost"
export function Button({ variant="secondary", className="", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:Variant}){
  const base="min-h-10 rounded-xl border px-3 text-sm font-medium transition-all focus-ring active:scale-[0.98]"
  const v:Record<Variant,string>={
    primary:"bg-ink text-white border-ink hover:bg-black",
    secondary:"bg-white border-line hover:border-accent/30 hover:bg-paper-2",
    ghost:"bg-transparent border-transparent hover:bg-paper-2",
  }
  return <button className={`${base} ${v[variant]} ${className}`} {...props} />
}
