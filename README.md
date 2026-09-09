# IndiaFOSS Speaker Poster Generator

Browser-based tool to generate speaker announcement cards for IndiaFOSS 2026. Single card editor with live preview, or bulk-generate from a CSV.

## Features

- **Single mode** — fill in speaker details, pick a track, upload a photo, download PNG/JPEG
- **Bulk mode** — upload a CSV, add images per speaker, download all cards as a ZIP
- **Query string prefill** — link to a pre-filled card: `?name=X&title=Y&track=Z&type=Talk&desc=...`
- **Devroom-based theming** — each devroom is themed by two colours (a **Stroke** colour for the jagged torn-band + line art, and a **Mask** colour for the doodle field) and its own doodle pattern. Currently wired: **Open Design** and **Cloud & Devops** (see Colors below); the remaining devroom patterns live in `../assets/images/` and can be rolled in by adding an entry to `DEVROOMS` in `script.js`
- **Mobile-friendly** — responsive layout, card preview scales to viewport

## Quick start

```
cd generator
python3 -m http.server 8080
# open http://localhost:8080
```

## CSV format

| Session Type | Track | Full Name | Title | Post desc |
|---|---|---|---|---|
| Talk | Main Track | Speaker Name | Talk Title | Short description |

See `generator/sample.csv` for a complete example with all columns.

## File structure

```
generator/
  index.html    — Vue template + inline SVGs
  script.js     — app logic, DEVROOMS config, CSV parser
  styles.css    — card poster styles (1080×1350), responsive overrides
  sample.csv    — mock data for testing
  patterns/     — per-devroom doodle SVGs + shared torn-band (band.svg),
                  fetched at runtime and recoloured per devroom
```

> The doodle SVGs are loaded via `fetch()` from `patterns/`, so the tool must be
> **served over HTTP** (the quick-start below) — opening `index.html` directly from
> the filesystem (`file://`) will not load them.

## Devroom and Main Track colours

### Main Track

Main Track supports 9 switchable pattern color themes. Each has a dedicated background pattern, accent/stroke color, and radial/linear gradients for the speaker photo inside container and speaker info card:

| Color | Accent / Stroke | Background Pattern |
|---|---|---|
| **Red** | `#FF643E` | `patterns/red.png` |
| **Yellow** | `#F5AB00` | `patterns/yellow.png` |
| **Pink** | `#E45CFF` | `patterns/pink.png` |
| **Violet** | `#8A5CFF` | `patterns/violet.png` |
| **Lime** | `#9BC71A` | `patterns/lime.png` |
| **Green** | `#00D668` | `patterns/green.png` |
| **Mint** | `#00C2AE` | `patterns/mint.png` |
| **Blue** | `#4BA2FF` | `patterns/blue.png` |
| **Ruby** | `#FF3C74` | `patterns/ruby.png` |

Use `?track=Main+Track&color=ruby` in the URL or select **Main Track** in the generator to switch colors.

### Devroom colours

Each devroom is themed by a **Stroke** colour and pattern. Defined in `DEVROOMS` in `script.js`:

| Devroom | Stroke | Pattern |
|---|---|---|
| Open Design Devroom | `#D93AA4` | `patterns/open-design-devroom-pattern.png` |
| Cloud & Devops Devroom | `#4D76FF` | `patterns/cloud-&-devops-devroom-pattern.png` |
| Compiler Devroom | `#D35849` | `patterns/compilers-devroom-pattern.png` |
| AOSP Devroom | `#00B203` | `patterns/aosp-devroom-pattern.png` |
| Documentation Devroom | `#9739EA` | `patterns/documention-devroom-pattern.png` |
| Open Hardware Devroom | `#E37601` | `patterns/open-hardware-devroom-pattern.png` |
| Security Devroom | `#03B4AB` | `patterns/security-devroom-pattern.png` |
| RTOS Devroom | `#A6AF00` | `patterns/rtos-devroom-pattern.png` |

Pills use a deeper, readable `accent` shade of the stroke (see `script.js`). The track's
dropdown key (e.g. `Main Track`, `AOSP Devroom`) is the exact value matched against the CSV `Track` column
and the `?track=` query param.

## Debug overlay

Append `?debug` to the URL to ghost the reference mockup on top of the live card for
pixel-comparison (Open Design & Cloud & Devops only — the two devrooms with reference PNGs in
`generator/debug/`). Set the opacity with `?debug=0.3` (0–1, default 0.5). The overlay is
`pointer-events:none` and is excluded from downloads, so it never bakes into an exported card.

## Output

Cards render at **1080 × 1350px** (portrait social media format). Downloads use html2canvas; bulk export bundles into a ZIP via JSZip.

## License

[GPL-3.0](LICENSE)
