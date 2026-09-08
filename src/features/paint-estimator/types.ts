export type Wall = { widthFt: number; heightFt: number }
export type CanType = "quart" | "gallon"
export type EstimatorInput = {
  walls: Wall[]
  coats: 1 | 2
  doorCount: number
  windowCount: number
  canType: CanType
}
export type LeftoverContext = "perfect-fit" | "enough-for-another-wall" | "touch-ups-only" | null
export type EstimatorResult = {
  grossAreaSqFt: number
  cutoutAreaSqFt: number
  netAreaSqFt: number
  cutoutExceedsGross: boolean
  totalCoverageNeededSqFt: number
  cansNeeded: number
  leftoverSqFt: number
  leftoverContext: LeftoverContext
}
