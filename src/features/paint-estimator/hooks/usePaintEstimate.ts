import { useEffect, useMemo, useState } from "react"
import { calculateCoverage } from "../utils/calculateCoverage.ts"
import type { CanType, EstimatorResult } from "../types.ts"
type WallInput = { width: string; height: string }
const LS_KEY = "paint-estimator-last"
function parseDim(s: string): number { if (s.trim()==="") return 0; const n=Number(s); return Number.isFinite(n)?n:0 }
export function usePaintEstimate() {
  const [wallCount, setWallCount] = useState<1|2|3|4>(4)
  const [walls, setWalls] = useState<WallInput[]>(() => Array.from({length:4}, () => ({width:"", height:""})))
  const [coats, setCoats] = useState<1|2>(1)
  const [doorCount, setDoorCount] = useState("0")
  const [windowCount, setWindowCount] = useState("0")
  const [canType, setCanType] = useState<CanType>("gallon")
  useEffect(()=>{ try{ const raw=localStorage.getItem(LS_KEY); if(!raw) return; const d=JSON.parse(raw)
    if(typeof d.wallCount==="number"&&d.wallCount>=1&&d.wallCount<=4) setWallCount(d.wallCount as any)
    if(Array.isArray(d.walls)) setWalls(d.walls.slice(0,4).map((w:any)=>({width:String(w.width??""),height:String(w.height??"")})).concat(Array.from({length:Math.max(0,4-d.walls.length)},()=>({width:"",height:""}))).slice(0,4))
    if(d.coats===1||d.coats===2) setCoats(d.coats)
    if(d.doorCount!=null) setDoorCount(String(d.doorCount))
    if(d.windowCount!=null) setWindowCount(String(d.windowCount))
    if(d.canType==="quart"||d.canType==="gallon") setCanType(d.canType)
  }catch{} },[])
  useEffect(()=>{ try{ localStorage.setItem(LS_KEY, JSON.stringify({wallCount,walls,coats,doorCount,windowCount,canType})) }catch{} },[wallCount,walls,coats,doorCount,windowCount,canType])
  const numericWalls = useMemo(()=> walls.map(w=>({widthFt:parseDim(w.width),heightFt:parseDim(w.height)})),[walls])
  const activeWalls = useMemo(()=> numericWalls.slice(0,wallCount),[numericWalls,wallCount])
  const result: EstimatorResult = useMemo(()=> calculateCoverage({walls:activeWalls,coats,doorCount:parseDim(doorCount),windowCount:parseDim(windowCount),canType}),[activeWalls,coats,doorCount,windowCount,canType])
  const hasAnyWall = activeWalls.some(w=>w.widthFt>0&&w.heightFt>0)
  function wallError(idx:number,field:"width"|"height"):string|null{ const v=walls[idx][field]; if(v.trim()==="") return null; const n=Number(v); if(!Number.isFinite(n)) return "Enter a number"; if(n<0) return "Cannot be negative"; if(n>100) return "Max 100 ft"; return null }
  function countError(v:string):string|null{ if(v.trim()==="") return null; const n=Number(v); if(!Number.isFinite(n)) return "Enter a number"; if(n<0) return "Cannot be negative"; if(!Number.isInteger(n)) return "Whole numbers only"; if(n>99) return "Max 99"; return null }
  function updateWall(idx:number,field:"width"|"height",val:string){ setWalls(prev=> prev.map((w,i)=> i===idx?{...w,[field]:val}:w)) }
  function clearAll(){ setWallCount(4); setWalls(Array.from({length:4},()=>({width:"",height:""}))); setCoats(1); setDoorCount("0"); setWindowCount("0"); setCanType("gallon"); try{ localStorage.removeItem(LS_KEY)}catch{} }
  return { wallCount, setWallCount, walls, updateWall, coats, setCoats, doorCount, setDoorCount, windowCount, setWindowCount, canType, setCanType, result, hasAnyWall, wallError, countError, activeWalls, clearAll }
}
