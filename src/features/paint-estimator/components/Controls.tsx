type CanType="quart"|"gallon"
export function CoatsSelect({ coats, onChange }: {coats:1|2; onChange:(v:1|2)=>void}){
  return (
    <fieldset>
      <legend className="text-sm font-medium">Coats</legend>
      <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Number of coats">
        {[1,2].map(n=>(
          <button key={n} role="radio" aria-checked={coats===n} onClick={()=>onChange(n as any)} className={`min-h-11 flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all focus-ring ${coats===n?"bg-ink text-white border-ink":"bg-white border-line hover:border-accent/40 hover:bg-accent-subtle active:scale-[0.98]"}`}>{n} coat{n>1?"s":""}</button>
        ))}
      </div>
    </fieldset>
  )
}
export function CanSizeSelect({ canType, onChange }: {canType:CanType; onChange:(v:CanType)=>void}){
  return (
    <fieldset>
      <legend className="text-sm font-medium">Can size</legend>
      <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Paint can size">
        <button role="radio" aria-checked={canType==="gallon"} onClick={()=>onChange("gallon")} className={`min-h-11 flex-1 rounded-xl border px-3 py-2.5 text-left transition-all focus-ring ${canType==="gallon"?"bg-ink text-white border-ink":"bg-white border-line hover:border-accent/40 hover:bg-accent-subtle active:scale-[0.98]"}`}><span className="text-sm font-semibold">Gallon</span><span className={`block text-xs ${canType==="gallon"?"text-white/70":"text-ink-muted"}`}>400 sq ft / can</span></button>
        <button role="radio" aria-checked={canType==="quart"} onClick={()=>onChange("quart")} className={`min-h-11 flex-1 rounded-xl border px-3 py-2.5 text-left transition-all focus-ring ${canType==="quart"?"bg-ink text-white border-ink":"bg-white border-line hover:border-accent/40 hover:bg-accent-subtle active:scale-[0.98]"}`}><span className="text-sm font-semibold">Quart</span><span className={`block text-xs ${canType==="quart"?"text-white/70":"text-ink-muted"}`}>100 sq ft / can</span></button>
      </div>
    </fieldset>
  )
}
export function CutoutInputs({ doorCount, windowCount, onDoor, onWindow, countError }: {doorCount:string; windowCount:string; onDoor:(v:string)=>void; onWindow:(v:string)=>void; countError:(v:string)=>string|null}){
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label htmlFor="door-count" className="text-sm font-medium">Doors (20 sq ft each)</label>
        <input id="door-count" inputMode="numeric" type="text" value={doorCount} onChange={e=>onDoor(e.target.value)} aria-describedby={countError(doorCount)?"door-err":undefined} aria-invalid={!!countError(doorCount)} className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all focus-ring ${countError(doorCount)?"border-red-400 bg-red-50":"border-line focus:border-accent"}`} />
        {countError(doorCount)&&<p id="door-err" className="mt-1 text-xs text-red-600">{countError(doorCount)}</p>}
      </div>
      <div>
        <label htmlFor="window-count" className="text-sm font-medium">Windows (15 sq ft each)</label>
        <input id="window-count" inputMode="numeric" type="text" value={windowCount} onChange={e=>onWindow(e.target.value)} aria-describedby={countError(windowCount)?"window-err":undefined} aria-invalid={!!countError(windowCount)} className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all focus-ring ${countError(windowCount)?"border-red-400 bg-red-50":"border-line focus:border-accent"}`} />
        {countError(windowCount)&&<p id="window-err" className="mt-1 text-xs text-red-600">{countError(windowCount)}</p>}
      </div>
    </div>
  )
}
export function WallCountSelect({ wallCount, onChange }: {wallCount:1|2|3|4; onChange:(v:1|2|3|4)=>void}){
  return (
    <fieldset>
      <legend className="text-sm font-medium">How many walls are you painting?</legend>
      <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Number of walls">
        {[1,2,3,4].map(n=>(
          <button key={n} role="radio" aria-checked={wallCount===n} onClick={()=>onChange(n as any)} className={`min-h-11 min-w-11 flex-1 rounded-xl border text-sm font-semibold transition-all focus-ring ${wallCount===n?"bg-ink text-white border-ink":"bg-white border-line hover:border-accent/40 hover:bg-accent-subtle hover:shadow-[var(--shadow-hover)] hover:-translate-y-px active:scale-[0.98]"}`}>{n}</button>
        ))}
      </div>
    </fieldset>
  )
}
