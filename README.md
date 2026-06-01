# IndiaFOSS Speaker Poster Generator

Browser-based tool to generate speaker announcement cards for IndiaFOSS 2026. Single card editor with live preview, or bulk-generate from a CSV.

## Features

- **Single mode** — fill in speaker details, pick a track, upload a photo, download PNG/JPEG
- **Bulk mode** — upload a CSV, add images per speaker, download all cards as a ZIP
- **Query string prefill** — link to a pre-filled card: `?name=X&title=Y&track=Z&type=Talk&desc=...`
- **Track-based theming** — each track (Main Track, Science, Geopolitics, AOSP, Hardware, Compilers) gets its own colour palette
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
  script.js     — app logic, track config, CSV parser
  styles.css    — card poster styles (1080×1350), responsive overrides
  sample.csv    — mock data for testing
```

## Output

Cards render at **1080 × 1350px** (portrait social media format). Downloads use html2canvas; bulk export bundles into a ZIP via JSZip.

## License

[GPL-3.0](LICENSE)
