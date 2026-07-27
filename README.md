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

## Devroom colours

Each devroom is themed by a **Stroke** colour (torn band + photo card + pill accent) and a
**Doodle** colour (the lighter tone the doodle field is recoloured to). Defined in `DEVROOMS`
in `script.js`. All eight devrooms are wired up:

| Devroom | Stroke | Doodle (bg) |
|---|---|---|
| Open Design Devroom | `#FF4EC4` | `#FF95DB` |
| Cloud & Devops Devroom | `#85A1FF` | `#85A1FF` |
| Compiler Devroom | `#E77D74` | `#F0AEA8` |
| AOSP Devroom | `#00C603` | `#94FF96` |
| Documentation Devroom | `#A14CEC` | `#E2C8F9` |
| Open Hardware Devroom | `#FABA75` | `#FEB567` |
| Security Devroom | `#04C7BD` | `#87FDF7` |
| RTOS Devroom | `#A6AF00` | `#BACC5C` |

Pills use a deeper, readable `accent` shade of the stroke (see `script.js`). The devroom's
dropdown key (e.g. `AOSP Devroom`) is the exact value matched against the CSV `Track` column
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
