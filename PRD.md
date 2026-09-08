# Product Requirements Document — Paint Wall Coverage Estimator

## Challenge
- Name: Paint Wall Coverage Estimator
- Type: Duel
- Source: VibeDev brief (single-page live calculator)

## Problem
First-time DIY painters mis-estimate paint: forgetting door/window subtraction, misunderstanding coats (doubles paint needed, not wall area), and not knowing whether leftover after rounding up is useful. They need visible reasoning, not just a number.

## Goal
Deliver a complete, polished, responsive single-page calculator with live recalculation, per-wall input model, correct area/coat/cutout math, and friendly explained purchase recommendation — no backend, no reload.

## Target User
Someone who has never estimated paint before and thinks in rooms/walls, not square-footage math. Wants to avoid second hardware-store trip or wasteful over-buy.

## User Flow
1. Opens app → sees 4 wall rows (default), 1 coat, 0 cutouts, gallon selected, empty prompt "Enter your wall dimensions..."
2. Chooses wall count 1–4 → that many independent width×height rows appear (wall-row-enter 160ms)
3. Types width/height per wall → per-wall area shown inline, summary recalculates instantly
4. Adjusts coats (1|2), door/window counts, can size (quart 100 / gallon 400) → total/coats/cans update live
5. Reads summary breakdown (gross→cutout→net→coats→cans) + "Buy N gallons" + contextual leftover + comparison callout
6. If cutout ≥ gross → guard message explains, net clamps 0, no misleading "Buy 0"
7. Invalid field (negative, >100, non-integer cutout) → inline error via aria-describedby, calculation continues with last valid/0

## Required Features
- Wall count selector 1–4 + per-wall independent width/height (ft) + inline per-wall area
- Coats selector 1|2 (radiogroup)
- Door count + window count (integer ≥0, fixed 20/15 sq ft)
- Can size selector quart/gallon (100/400 sq ft) with coverage shown
- Pure calculation engine: gross → cutout → net (max 0) → × coats → ÷ coverage → ceil (epsilon-safe) → leftover + context
- Live recalculation on every change, no submit, no reload
- Summary card: full breakdown + "Buy N" + leftover contextual note + comparison (other can size)
- Guards: cutout-exceeds-gross, empty (no valid walls), invalid inputs
- Responsive: mobile single-col, tablet/desktop two-col sticky summary, wide max-width, no overflow, 44px touch targets, inputMode decimal/numeric
- Accessibility: labels, radiogroups, debounced aria-live polite (500ms), aria-describedby errors, focus-ring, reduced-motion gating

## Functional Requirements
- calculateCoverage is pure, no React, directly unit-testable (src/features/paint-estimator/utils/calculateCoverage.ts)
- Walls ≤0 excluded from gross (treated as not-yet-entered, row still shown)
- cutoutExceedsGross = cutout ≥ gross && gross>0 (distinct from empty)
- cansNeeded = ceil(raw -1e-9), integer-artifact guard (abs(raw-round)<1e-7 → round), 0 when total 0
- leftover = purchased - total, round2, 0 when abs<0.005 → "perfect-fit"
- leftoverContext: perfect-fit | enough-for-another-wall (leftover ≥ smallest wall) | touch-ups-only | null (total 0)
- Floating-point-safe: round2 on gross/cutout/net/total/purchased/leftover, epsilon ceil for cans
- Input limits: wall max 100ft, cutout max 99, non-negative, integer cutouts
- Optional localStorage remember-last-inputs (P3): read on mount, write on change, fail silent

## UX Requirements
- Tone: practical, reassuring, plain-spoken (hardware-store friend)
- Motion: wall-row-enter 160ms, number-fade 150ms, guard-enter 150ms, comparison fade 120ms — all gated @media (prefers-reduced-motion: reduce)
- Announcement: visual sync instant, screen-reader debounced 500ms aria-live polite atomic
- Visual: recommendation number is focus, breakdown scannable stepped list, warning amber only for guard
- Empty/guard distinct from normal result

## Responsive Requirements
- ≤640px: single-col, numeric keyboards, summary below reachable in one scroll
- 641–1024px: stacked or two-col at agent discretion (chosen: lg 1024 sticky)
- 1025–1439px: two-col inputs left sticky summary right
- ≥1440px: same two-col max 1120px, no edge stretch
- No horizontal overflow, no hover-only interactions

## Technical Stack
- Framework: React 19 + Vite 6
- Language: TypeScript 5.7 (strict, no any)
- Styling: Tailwind CSS 4 (@tailwindcss/vite) + CSS vars theme
- Data: local state + custom hook usePaintEstimate, localStorage optional
- Testing: Vitest 3 + Testing Library + jsdom
- Runtime: static SPA, no backend

## Technical Constraints
- No backend, no routing, no state lib, no form lib
- Pure engine isolated, zero duplicated arithmetic in components
- No dangerouslySetInnerHTML, no secrets

## Acceptance Criteria
- 4 varied walls + 1 coat + gallon → correct breakdown + Buy N + leftover
- 1→2 coats → total doubles, cans update, no re-entry
- Cutout ≥ gross → net 0 + guard, not "Buy 0" as normal
- Just-over multiple → rounds up, not inflated by float artifact
- Exact multiple → perfect-fit, no spurious leftover
- No dimensions → prompt, not "Buy 0"
- Any input change → instant recalc, no submit/reload
- Negative/non-numeric → inline error, rest continues, no NaN
- Mobile → numeric keyboard, no overflow, summary reachable

## Out of Scope
- Metric units / unit toggle
- Multi-room persistence / named saves / backend
- Print/share layout beyond stretch (P3 optional)
