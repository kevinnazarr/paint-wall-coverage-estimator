---
name: "Paint Wall Coverage Estimator"
description: "Practical, reassuring calculator for first-time painters — calm neutral, terracotta accent, stepped breakdown, trust-building motion"
colors:
  paper: "#FDFCF8"
  paper2: "#F5F1E8"
  ink: "#1A1A1E"
  inkMuted: "#6B6B73"
  line: "#EAE8E3"
  accent: "#C46A2C"
  accentHover: "#A85A24"
  accentSubtle: "#FFF4E8"
  warn: "#B45309"
  warnBg: "#FFFBEB"
  success: "#15803D"
typography:
  display: { fontFamily: "Inter, ui-sans-serif, system-ui", fontSize: "32px", fontWeight: 800 }
  heading: { fontFamily: "Inter", fontSize: "13px", fontWeight: 600, letterSpacing: "0.14em" }
  body: { fontFamily: "Inter", fontSize: "15px", fontWeight: 400, lineHeight: 1.6 }
  number: { fontFamily: "Inter", fontSize: "22px", fontWeight: 700 }
spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", container: "1120px" }
rounded: { md: "12px", xl: "16px", pill: "9999px" }
motion:
  wallEnter: "160ms ease-out opacity+translateY(6px)"
  numberFade: "150ms ease-out opacity+translateY"
  guardEnter: "150ms ease-out"
  comparison: "120ms fade"
  reducedMotion: "@media (prefers-reduced-motion: reduce) { none }"
---

# Design — Paint Wall Coverage Estimator

## Visual Direction
Calm utility, not marketing. Warm paper #FDFCF8 + ink #1A1A1E + terracotta #C46A2C accent only for primary recommendation. Card separation: inputs (white, line border) vs elevated summary (white, shadow-card). Tone reduces anxiety — plain language, generous spacing around "Buy N".

## Typography
Inter throughout (numbers-first legibility). Display 28–32/800 for title, mono-like tabular for breakdown numbers, 13/600 tracking-widest for section labels ("YOUR ROOM", "YOUR ESTIMATE").

## Color Roles
- paper/paper2 neutral background, ink primary, inkMuted secondary, line borders
- accent #C46A2C for "Buy N" number + selected radiogroup, hover: accent/40 + subtle bg
- warn amber only for guard (border-amber-300 bg-warnBg text #78350F) — never for normal
- success not needed except perfect-fit note

## Layout
Header: title 28–32 + 15 muted subline. Main: 1 col mobile, lg 1.1fr/0.9fr two-col, summary sticky top-6. Max 1120px, no edge stretch. Footer 12 muted.

## Components
- Wall count / coats / can size: segmented radiogroups (role radiogroup, role radio, aria-checked), min 44px, resting white/line → hover accent/40+subtle+shadow+translateY(-1px) → focus-visible ring-2 accent → active scale 0.98, transition-all 150ms (reduced-motion none)
- Wall row: rounded-xl paper bg, wall-row-enter, per-wall area muted inline number-fade
- Inputs: rounded-xl white, line border, focus accent, error red-400/50, aria-describedby, inputMode decimal/numeric, placeholder e.g. 12/8
- Summary: breakdown paper2 box with gross→cutout→net→coats→cans, "Buy N" 22/700 accent, leftover muted, comparison dashed paper box
- Guard: amber warnBg + guard-enter, distinct from empty

## States
- Empty: prompt, not "Buy 0"
- Guard: amber, breakdown still visible, net 0
- Invalid: inline red text + aria-invalid, calculation continues
- Focus: ring-2 accent ring-offset-2 on every interactive (focus-ring class)

## Responsive
Mobile single-col summary below (one scroll away), tablet stacked, desktop sticky, wide constrained. No hover-only.

## Accessibility
Labels for every input, radiogroups keyboard-operable, debounced aria-live polite 500ms atomic, errors via aria-describedby not color alone, focus states, contrast, reduced-motion gating.

## Motion Mapping (revised per Quest — not grid/toast copy-paste)
- wall row add/remove: wall-row-enter 160ms ease-out
- summary numbers changing: number-fade 150ms
- guard appearing: guard-enter 150ms
- comparison: 120ms fade
- All gated (prefers-reduced-motion: reduce) → none

## Verification Checklist (explicit, before freeze)
- [ ] Each button/input shows 4 distinct visuals: resting → hover (border accent/40+subtle+shadow+lift) → focus-visible (ring-2) → active (scale 0.98) + transition
- [ ] Tab through all interactive, screenshot hover vs resting side-by-side
- [ ] Reduced-motion emulated → transitions off
- [ ] aria-live announces only after 500ms debounce, not per keystroke
