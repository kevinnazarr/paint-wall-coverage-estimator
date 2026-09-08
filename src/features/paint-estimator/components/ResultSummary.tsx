import { useEffect, useRef, useState } from "react"
import { Alert } from "../../../components/ui/Alert.tsx"
import { CAN_COVERAGE } from "../constants.ts"
import { calculateCoverage } from "../utils/calculateCoverage.ts"
import type { CanType, EstimatorResult } from "../types.ts"
function fmt(n:number){ return Number.isInteger(n)?String(n):n.toFixed(2).replace(/\.?0+$/,"") }
export function ResultSummary({ result, hasAnyWall, activeWalls, canType, coats, doorCount, windowCount }: { result: EstimatorResult; hasAnyWall:boolean; activeWalls:{widthFt:number;heightFt:number}[]; canType:CanType; coats:1|2; doorCount:number; windowCount:number }){
  const [announced,setAnnounced]=useState("")
  const timer=useRef<number|null>(null)
  const [showGuard,setShowGuard]=useState(true)
  useEffect(()=> setShowGuard(true),[result.cutoutExceedsGross])
  useEffect(()=>{
    if(timer.current) window.clearTimeout(timer.current)
    timer.current=window.setTimeout(()=>{
      if(!hasAnyWall) setAnnounced("Enter your wall dimensions to see a recommendation.")
      else if(result.cutoutExceedsGross) setAnnounced("Your door and window area is larger than your total wall area. Check your dimensions.")
      else if(result.totalCoverageNeededSqFt===0) setAnnounced("Enter wall dimensions to get a recommendation.")
      else { const unit=canType==="gallon"?(result.cansNeeded===1?"gallon":"gallons"):(result.cansNeeded===1?"quart":"quarts"); setAnnounced(`Buy ${result.cansNeeded} ${unit}. ${result.leftoverSqFt===0?"Perfect fit, no leftover.":`${fmt(result.leftoverSqFt)} square feet leftover.`}`) }
    },500)
    return ()=>{ if(timer.current) window.clearTimeout(timer.current) }
  },[result,hasAnyWall,canType])

  if(!hasAnyWall){
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-ink-muted)]">Your estimate</h2>
        <div className="mt-4"><Alert variant="info" title="Ready to calculate">Enter your wall dimensions to see a recommendation. Add each wall you plan to paint — we will handle the math instantly.</Alert></div>
        <div aria-live="polite" aria-atomic="true" className="sr-only">{announced}</div>
      </div>
    )
  }
  if(result.cutoutExceedsGross){
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-ink-muted)]">Your estimate</h2>
        {showGuard && <div className="mt-4"><Alert variant="warn" title="Check your numbers" onClose={()=>setShowGuard(false)}>Your door/window area ({fmt(result.cutoutAreaSqFt)} sq ft) is larger than your total wall area ({fmt(result.grossAreaSqFt)} sq ft) — check your wall dimensions or cutout counts.</Alert></div>}
        <div className="mt-4 rounded-xl bg-[var(--color-paper-2)] border border-[var(--color-line)] p-4 text-sm guard-enter">
          <div className="flex justify-between"><span className="text-[var(--color-ink-muted)]">Gross wall area</span><span className="font-medium">{fmt(result.grossAreaSqFt)} sq ft</span></div>
          <div className="flex justify-between mt-1"><span className="text-[var(--color-ink-muted)]">Cutout area</span><span className="font-medium">− {fmt(result.cutoutAreaSqFt)} sq ft</span></div>
          <div className="flex justify-between mt-2 pt-2 border-t border-[var(--color-line)] font-semibold"><span>Net paintable</span><span>0 sq ft</span></div>
        </div>
        <div aria-live="polite" aria-atomic="true" className="sr-only">{announced}</div>
      </div>
    )
  }
  const unit=canType==="gallon"?(result.cansNeeded===1?"gallon":"gallons"):(result.cansNeeded===1?"quart":"quarts")
  const leftoverNote=result.leftoverContext==="perfect-fit"?"That's a perfect fit — no leftover paint.":result.leftoverContext==="enough-for-another-wall"?`You'll have about ${fmt(result.leftoverSqFt)} sq ft left over — enough to repaint one more wall like your smallest one.`:`You'll have about ${fmt(result.leftoverSqFt)} sq ft left over — not quite enough for another wall, good for touch-ups.`
  const other:CanType=canType==="gallon"?"quart":"gallon"
  const otherRes=calculateCoverage({ walls:activeWalls, coats, doorCount, windowCount, canType:other })
  const otherUnit=other==="gallon"?(otherRes.cansNeeded===1?"gallon":"gallons"):(otherRes.cansNeeded===1?"quart":"quarts")
  const showSuccess=result.leftoverContext==="perfect-fit"
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-ink-muted)]">Your estimate</h2>
      <div className="mt-4 rounded-xl bg-[var(--color-paper-2)] border border-[var(--color-line)] p-4 text-sm">
        <div className="flex justify-between"><span className="text-[var(--color-ink-muted)]">Gross wall area</span><span className="font-medium number-fade">{fmt(result.grossAreaSqFt)} sq ft</span></div>
        <div className="flex justify-between mt-1"><span className="text-[var(--color-ink-muted)]">Minus doors & windows</span><span className="font-medium">− {fmt(result.cutoutAreaSqFt)} sq ft</span></div>
        <div className="flex justify-between mt-1"><span className="text-[var(--color-ink-muted)]">Net paintable area</span><span className="font-semibold">{fmt(result.netAreaSqFt)} sq ft</span></div>
        <div className="flex justify-between mt-2 pt-2 border-t border-[var(--color-line)]"><span className="text-[var(--color-ink-muted)]">× {coats} coat{coats>1?"s":""}</span><span className="font-medium">{fmt(result.totalCoverageNeededSqFt)} sq ft needed</span></div>
        <div className="flex justify-between mt-1"><span className="text-[var(--color-ink-muted)]">÷ {CAN_COVERAGE[canType]} sq ft per {canType}</span><span className="font-semibold">{result.cansNeeded} {unit}</span></div>
      </div>
      {showSuccess ? (
        <div className="mt-4"><Alert variant="success" title={`Buy ${result.cansNeeded} ${unit}`}>Perfect fit — no leftover paint. You nailed the math.</Alert></div>
      ) : (
        <>
          <p className="mt-5 text-[22px] font-bold leading-tight">Buy <span className="text-[var(--color-accent)] number-fade">{result.cansNeeded} {unit}</span></p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)] number-fade">{leftoverNote}</p>
        </>
      )}
      <div className="mt-4"><Alert variant="info"><span className="font-semibold">Compare:</span> {other} ({CAN_COVERAGE[other]} sq ft/can) would need <span className="font-semibold">{otherRes.cansNeeded} {otherUnit}</span> with ~{fmt(otherRes.leftoverSqFt)} sq ft leftover.</Alert></div>
      <div aria-live="polite" aria-atomic="true" aria-relevant="additions text" className="sr-only">{announced}</div>
    </div>
  )
}
