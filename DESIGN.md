# HustleHome — Design Plan

> A resale storefront for verified secondhand goods. The whole store is built
> around a single promise the buyer needs to believe: *this exact unit was
> inspected, graded, and logged before it was listed.*

**Concept in one line:** *Resale, run like a drop.* Pure black storefront,
one earned accent color, and a signature hypnotic backdrop. It reads like a
sneaker-drop shop crossed with a minimal hardware brand — not a document,
not a certificate, a shop.

---

## 1. Color

Near-total black and white. One accent, spent only where it means something:
buy this, this is active, this is verified, this is live.

| Token | Hex | Name | Role |
|-------|------|------|------|
| `--void` | `#000000` | **Void** | Page background. Pure black. |
| `--graphite` | `#0D0D0D` | **Graphite** | Raised surfaces — cards, tiles, panels. |
| `--iron` | `#1A1A1A` | **Iron** | Hairline borders. Never a fill. |
| `--white` | `#FFFFFF` | **White** | Pure white — reserved for the biggest display type. |
| `--bone` | `#E8E8E8` | **Bone** | Primary body/heading text — a hair softer than pure white. |
| `--ash` | `#8A8A8A` | **Ash** | Muted text — meta, captions, secondary copy. |
| `--lime` | `#C7FF3A` | **Lime** | The one accent. CTAs, hover states, active nav, price/grade chips, live dots, borders-on-hover. |

Working rules:
- Lime is *earned*, never a background fill of any size. It's a border, an
  underline, a dot, a hover state, a chip, a price.
- No gradients as decoration. The one exception is the darkening overlay
  under category-tile text, which exists for legibility, not decoration.
- No text glow, ever.

---

## 2. Type

- **Space Grotesk** (700) — display and headings. Tight tracking (`-0.02em`).
- **Inter** (400 / 500) — body and UI copy.
- **JetBrains Mono** (400) — prices, grades, IDs, meta lines, form labels,
  nav links. If it's a number, a code, or a UI label, it's mono.

### Type scale

| Level | Family | Size (desktop → mobile) | Weight |
|-------|--------|--------------------------|--------|
| Display | Space Grotesk | 72 → 56 → 40px | 700 |
| H1 | Space Grotesk | 40px | 700 |
| H2 | Space Grotesk | 28px | 700 |
| H3 | Space Grotesk | 22px | 700 |
| Body | Inter | 16px | 400 |
| Meta | JetBrains Mono | 13px | 400 |

---

## 3. Layout

- Content max-width ~1280px, centered, with asymmetric moments in the hero.
- Corners are sharp — 0px radius everywhere. No pill buttons, no rounded
  cards, no card-lift-with-shadow.
- Structural division comes from 1px Iron hairlines and Graphite surfaces,
  not boxes-everywhere.
- Fully responsive down to 360px.

Homepage flow: hero → marquee ticker → categories grid → best sellers →
reviews strip → FAQ → final CTA band.

---

## 4. The signature element

A fixed, full-viewport canvas behind every page: 4–5 slow sinuous lime
trails, each a wave of ~40 points drifting diagonally across the screen,
looping edge to edge. Barely-there (`rgba(199,255,58,0.35)`, 1.5px), slow
(15–25s per crossing), never synced to each other. It's the one piece of
ambient motion the whole site is allowed — everything else is a deliberate,
short, purposeful transition.

---

## 5. Motion

- **Nav links**: white → lime on hover, 1px lime underline draws
  left-to-right, 200ms.
- **Primary CTA**: lime border + text on black, fills to lime with black
  text on hover, 180ms.
- **Category tiles**: image scales to 1.05 on hover (400ms), border shifts
  to lime, a small "→ View" reveals bottom-right.
- **Marquee**: continuous 40s linear scroll, pauses on hover.
- **FAQ**: rows expand on a smooth height transition; the `+` rotates to `×`.
- **Review screenshots**: border shifts to lime, a 2px lift on hover.
- `prefers-reduced-motion` removes every transform-based effect and
  continuous animation (marquee, snake trails, pulsing dots) and reduces
  interactions to instant color changes. The snake background becomes 5
  static lime paths at 0.15 opacity.

---

## 6. Principles

- **One accent, spent on signal.** Lime only ever marks something real and
  current: this is live, this is active, this is the price, this is the
  grade, this is the action to take.
- **Category-specific verification, unchanged.** A Dyson is graded on
  runtime and battery, a controller on stick drift, a wheel cap on OEM
  part-match, a shoe on gel-cell condition and authenticity.
- **No icon libraries.** Every glyph on the site (stars, plus/minus, arrows)
  is hand-drawn inline SVG.
- **Real placeholder content.** No lorem ipsum, no "Feature Name Here" —
  every line reads like something an actual reseller would write.
