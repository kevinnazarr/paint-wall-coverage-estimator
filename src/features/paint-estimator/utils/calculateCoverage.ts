import { CAN_COVERAGE, DOOR_SQFT, WINDOW_SQFT } from "../constants.ts"
import type { CanType, EstimatorResult, Wall } from "../types.ts"
function round2(n: number): number { return Math.round(n * 100) / 100 }
export function calculateCoverage(input: { walls: Wall[]; coats: 1 | 2; doorCount: number; windowCount: number; canType: CanType }): EstimatorResult {
  const walls = input.walls.slice(0, 4)
  let gross = 0
  let smallest: number | null = null
  for (const w of walls) {
    const wd = w.widthFt
    const ht = w.heightFt
    if (!Number.isFinite(wd) || !Number.isFinite(ht) || wd <= 0 || ht <= 0) continue
    const area = wd * ht
    gross += area
    if (smallest === null || area < smallest) smallest = area
  }
  gross = round2(gross)
  const doors = Math.max(0, Math.floor(input.doorCount))
  const wins = Math.max(0, Math.floor(input.windowCount))
  const cutout = round2(doors * DOOR_SQFT + wins * WINDOW_SQFT)
  const net = round2(Math.max(0, gross - cutout))
  const cutoutExceedsGross = gross > 0 && cutout >= gross
  const total = round2(net * input.coats)
  const coverage = CAN_COVERAGE[input.canType]
  let cansNeeded = 0
  if (total > 0) {
    const raw = total / coverage
    // ponytail: ceil with epsilon handles 2.9999999→3 (not 4) without truncating 400.05→1
    cansNeeded = Math.ceil(raw - 1e-9)
    if (Math.abs(raw - Math.round(raw)) < 1e-7) cansNeeded = Math.round(raw)
    if (cansNeeded < 1) cansNeeded = 1
  }
  const purchased = round2(cansNeeded * coverage)
  const leftover = round2(purchased - total)
  let leftoverContext: EstimatorResult["leftoverContext"] = null
  if (total === 0) leftoverContext = null
  else if (Math.abs(leftover) < 0.005) leftoverContext = "perfect-fit"
  else if (smallest !== null && leftover >= smallest - 1e-9) leftoverContext = "enough-for-another-wall"
  else leftoverContext = "touch-ups-only"
  return { grossAreaSqFt: gross, cutoutAreaSqFt: cutout, netAreaSqFt: net, cutoutExceedsGross, totalCoverageNeededSqFt: total, cansNeeded, leftoverSqFt: Math.abs(leftover) < 0.005 ? 0 : leftover, leftoverContext }
}
