# Design

Where design work starts. Decision contracts in `docs/decisions/` own every
rule; this file holds values and points at the contract that owns each element.

## Values

Source: `app/globals.css`. Update this section when that source changes.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#ffffff` | `#121212` |
| `--foreground` | `#111111` | `#f2f2f2` |
| `--card` | `#ffffff` | `#1c1c1c` |
| `--primary` | `#a50034` | `#c8285a` |
| `--primary-foreground` | `#ffffff` | `#ffffff` |
| `--secondary` | `#f6f3f2` | `#2c2a29` |
| `--muted` | `#f6f3f2` | `#262423` |
| `--muted-foreground` | `#6b6b6b` | `#a8a4a2` |
| `--accent` | `#f6f3f2` | `#2c2a29` |
| `--destructive` | `#d0021b` | `#ff5a6e` |
| `--border` | `#e4e0de` | `#34312f` |
| `--input` | `#cfcac8` | `#4a4644` |
| `--ring` | `#a50034` | `#e0436e` |

Text roles: `--font-sans` (LG Smart, LG EI Text, Pretendard, Malgun Gothic 순서의 시스템 한글 서체), `--font-mono` (Geist Mono); heading uses `--font-sans`.
Radius and spacing: `--radius` `1rem`; `--radius-sm`…`--radius-4xl` scale from it.

## Components

Source: `components/ui`. Update this section when it changes.

- `Alert`, `Button`, `Card`, `Empty`, `Field`, `Input`, `Label`, `Separator`, `Skeleton`, `Sonner`, `Toggle`, `ToggleGroup`

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
