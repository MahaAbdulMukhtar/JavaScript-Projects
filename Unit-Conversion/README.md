# Unit Conversions

A clean, real-time unit converter web app built with vanilla HTML, CSS, and JavaScript. Covers temperature, weight, and distance with multiple conversion pairs per category.

---

## Live Demo
[View Live](https://mahaabdulmukhtar.github.io/JavaScript-Projects/Unit-Conversion/)


## Project Structure

```
unit-converter/
├── index.html   
├── style.css 
├── script.js    
└── README.md   
```

---

## Features

### Conversions supported

| Category    | Pairs available                          |
|-------------|------------------------------------------|
| Temperature | °C → °F, °F → °C, °C → K, K → °C       |
| Weight      | kg → lb, lb → kg, g → oz, oz → g        |
| Distance    | km → mi, mi → km, m → ft, ft → m        |

### UX highlights

- **Real-time results** — output updates as you type, no button press needed
- **Swap button (⇄)** — instantly reverses the conversion direction and carries the result over to the input
- **Live formula display** — shows the active formula and a plain-English result (e.g. `37°C = 98.6°F`)
- **Tab navigation** — single-page layout with no scrolling required
- **Sticky header** — the nav stays visible at all times
- **Back to top** — floating home button in the bottom-left corner
- **Responsive** — works on mobile screens down to ~320px wide

---

## How it works

### HTML (`index.html`)

- Uses semantic elements: `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- Each converter is its own `<section>` with `aria-label` for accessibility
- Panels are shown/hidden via the `.active` CSS class — no `display:none` hacks in HTML
- Labels are properly linked to inputs with matching `for`/`id` pairs

### CSS (`style.css`)

- CSS custom properties (variables) define the full colour palette and spacing scale
- Dark theme with three accent colours: red (temperature), yellow (weight), teal (distance)
- Active mode buttons are styled purely through CSS classes — no inline styles needed
- The decorative corner glow on each card is a pure CSS `::before` pseudo-element
- Fully responsive with a single `@media` breakpoint at 520px

### JavaScript (`script.js`)

Each converter category follows the same pattern:

1. **Config object** — holds `from`, `to`, `formula`, `convert` function, and `result` formatter for each mode
2. **`setXxxMode(mode)`** — updates labels, formula, and active button state; clears inputs
3. **`convertXxx()`** — reads the input, runs the conversion, writes the output, triggers flash
4. **`swapXxx()`** — looks up the reverse mode, seeds the new input with the old result, re-converts

The `round(value, places)` helper rounds to 5 decimal places and strips trailing zeros so results stay clean.

---

## Formulas reference

### Temperature

| Conversion | Formula               |
|------------|-----------------------|
| °C → °F    | `(C × 9/5) + 32`     |
| °F → °C    | `(F − 32) × 5/9`     |
| °C → K     | `C + 273.15`          |
| K → °C     | `K − 273.15`          |

### Weight

| Conversion | Formula           |
|------------|-------------------|
| kg → lb    | `kg × 2.20462`    |
| lb → kg    | `lb ÷ 2.20462`    |
| g → oz     | `g ÷ 28.3495`     |
| oz → g     | `oz × 28.3495`    |

### Distance

| Conversion | Formula           |
|------------|-------------------|
| km → mi    | `km ÷ 1.60934`    |
| mi → km    | `mi × 1.60934`    |
| m → ft     | `m × 3.28084`     |
| ft → m     | `ft ÷ 3.28084`    |

---

## Possible extensions

- Add more unit types (volume, speed, area, currency)
- Save last-used mode to `localStorage`
- Add a copy-to-clipboard button on the result
- Support dark/light mode toggle
- Add keyboard shortcut (Enter) to trigger conversion

## Author

**Maha Abdul Mukhtar**  
BS Computer Science — Virtual University of Pakistan  
