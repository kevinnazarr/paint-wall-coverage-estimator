type WallInput = { width:string; height:string }
export function WallInputs({ wallCount, walls, onUpdate, wallError }: { wallCount:number; walls: WallInput[]; onUpdate:(i:number,field:"width"|"height",v:string)=>void; wallError:(i:number,f:"width"|"height")=>string|null }){
  function fmtArea(w:number,h:number){ if(!w||!h||w<=0||h<=0) return ""; const a=w*h; return Number.isInteger(a)?`${a} sq ft`:`${a.toFixed(1)} sq ft` }
  return (
    <div className="space-y-4">
      {Array.from({length:wallCount}).map((_,i)=>{
        const wErr=wallError(i,"width"); const hErr=wallError(i,"height")
        const area=fmtArea(Number(walls[i].width), Number(walls[i].height))
        return (
          <div key={i} className="wall-row-enter rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] p-4">
            <div className="flex items-center justify-between"><span className="text-sm font-semibold">Wall {i+1}</span>{area&&<span className="text-xs font-medium text-[var(--color-ink-muted)] number-fade">{area}</span>}</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`wall-${i}-width`} className="text-xs font-medium text-[var(--color-ink-muted)]">Width (ft)</label>
                <input id={`wall-${i}-width`} inputMode="decimal" type="text" value={walls[i].width} onChange={e=>onUpdate(i,"width",e.target.value)} aria-describedby={wErr?`wall-${i}-width-err`:undefined} aria-invalid={!!wErr} placeholder="e.g. 12" className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all focus-ring ${wErr?"border-red-400 bg-red-50":"border-[var(--color-line)] focus:border-[var(--color-accent)]"}`} />
                {wErr&&<p id={`wall-${i}-width-err`} className="mt-1 text-xs text-red-600">{wErr}</p>}
              </div>
              <div>
                <label htmlFor={`wall-${i}-height`} className="text-xs font-medium text-[var(--color-ink-muted)]">Height (ft)</label>
                <input id={`wall-${i}-height`} inputMode="decimal" type="text" value={walls[i].height} onChange={e=>onUpdate(i,"height",e.target.value)} aria-describedby={hErr?`wall-${i}-height-err`:undefined} aria-invalid={!!hErr} placeholder="e.g. 8" className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all focus-ring ${hErr?"border-red-400 bg-red-50":"border-[var(--color-line)] focus:border-[var(--color-accent)]"}`} />
                {hErr&&<p id={`wall-${i}-height-err`} className="mt-1 text-xs text-red-600">{hErr}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
