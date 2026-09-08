import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
type Toast = { id:number; msg:string; variant: "success"|"info" }
const Ctx = createContext<{ push:(msg:string,variant?:Toast["variant"])=>void } | null>(null)
let nextId=0
export function ToastProvider({ children }: {children: ReactNode}){
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = useCallback((msg:string, variant:Toast["variant"]="success")=>{
    const id=++nextId; setToasts(t=>[...t,{id,msg,variant}])
    setTimeout(()=> setToasts(t=>t.filter(x=>x.id!==id)), 2200)
  },[])
  return (
    <Ctx.Provider value={{push}}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t=>(
          <div key={t.id} className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm font-medium shadow-[var(--shadow-hover)] transition-all ${t.variant==="success"?"bg-emerald-600 text-white border-emerald-700":"bg-[var(--color-ink)] text-white border-black"}`} style={{animation:"toastIn 180ms ease-out"}}>
            {t.msg}
          </div>
        ))}
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @media(prefers-reduced-motion:reduce){div[style*="toastIn"]{animation:none!important}}`}</style>
    </Ctx.Provider>
  )
}
export function useToast(){ const c=useContext(Ctx); if(!c) throw new Error("useToast outside provider"); return c }
