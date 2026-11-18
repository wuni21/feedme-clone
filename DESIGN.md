# Design

Where design work starts. Decision contracts in `docs/decisions/` own every
rule; this file holds values and points at the contract that owns each element.

## Values

Source: `app/globals.css`. Update this section when that source changes.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

Text roles: `--font-sans` (Geist), `--font-mono` (Geist Mono); heading uses `--font-sans`.
Radius and spacing: `--radius` `0.625rem`; `--radius-sm`…`--radius-4xl` scale from it.

## Components

Source: `components/ui`. Update this section when it changes.

- `Button`

## Rejected patterns

- Hand-built markup for UI that shadcn already provides → [ui-composition](docs/decisions/ui-composition.md)
- Per-screen arbitrary colors instead of semantic tokens → [ui-composition](docs/decisions/ui-composition.md)
- LG Red on secondary buttons, selected toggles, links, or errors → [brand-style](docs/decisions/brand-style.md)
- LG logo or an LG-named logo mark → [brand-style](docs/decisions/brand-style.md)
- Square-cornered buttons, inputs, or toggles → [brand-style](docs/decisions/brand-style.md)

## Map

- Component choice and page shell → [ui-composition](docs/decisions/ui-composition.md)
- Loading, empty, error, disabled states → [ui-composition](docs/decisions/ui-composition.md)
- Narrow-screen stacking → [ui-composition](docs/decisions/ui-composition.md)
- Brand color and primary action color → [brand-style](docs/decisions/brand-style.md)
- Button, input, toggle, and card shape → [brand-style](docs/decisions/brand-style.md)
- Heading size, weight, and Korean line breaking → [brand-style](docs/decisions/brand-style.md)
- Typeface → [brand-style](docs/decisions/brand-style.md)
