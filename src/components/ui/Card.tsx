export function Card({ children, className="" }: {children: React.ReactNode; className?:string}){
  return <div className={`rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6 shadow-[var(--shadow-card)] ${className}`}>{children}</div>
}
export function CardHeader({ children }: {children: React.ReactNode}){ return <div className="flex items-center justify-between">{children}</div> }
