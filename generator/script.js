/**
 * IndiaFOSS 2026 — Speaker Poster Generator
 * Vue 3 Options API · Tailwind CSS · html2canvas
 */

/*
 * Per-devroom theming.
 *  - `label`   — text shown in the dropdown + the devroom pill
 *  - `stroke`  — the torn-band + photo-card + line-art colour (README "Stroke")
 *  - `doodle`  — the colour the doodle field renders in (lighter "bg" tone)
 *  - `bake`    — the colour currently baked into the pattern SVG file; it is
 *               string-replaced with `doodle` at load time
 *  - `accent`  — pill text colour (a readable, deeper shade of stroke)
 *  - `pattern` — the doodle-field SVG (served from generator/patterns/)
 *
 * The key (e.g. 'AOSP Devroom') is the canonical value matched against the CSV
 * `Track` column and the ?track= query param — keep it stable.
 */
const DEVROOMS = {
  'Open Design Devroom': {
    label: 'Open Design Devroom',
    stroke: '#FF4EC4', accent: '#E337AA',
    doodle: '#FF95DB', bake: '#FF95DB',
    pattern: 'patterns/open-design.svg',
  },
  'Cloud and Devops Devroom': {
    label: 'Cloud & Devops Devroom',
    stroke: '#85A1FF', accent: '#5D7DF0',
    doodle: '#85A1FF', bake: '#85A1FF',
    pattern: 'patterns/cloud-and-devops.svg',
  },
  'Compiler Devroom': {
    label: 'Compiler Devroom',
    stroke: '#E77D74', accent: '#D35849',
    doodle: '#F0AEA8', bake: '#E77D74',
    pattern: 'patterns/compiler.svg',
  },
  'AOSP Devroom': {
    label: 'AOSP Devroom',
    stroke: '#00C603', accent: '#0A9E0C',
    doodle: '#94FF96', bake: '#00C603',
    pattern: 'patterns/aosp.svg',
  },
  'Documentation Devroom': {
    label: 'Documentation Devroom',
    stroke: '#A14CEC', accent: '#8B36D6',
    doodle: '#E2C8F9', bake: '#A14CEC',
    pattern: 'patterns/documentation.svg',
  },
  'Open Hardware Devroom': {
    label: 'Open Hardware Devroom',
    stroke: '#FABA75', accent: '#E08A2E',
    doodle: '#FEB567', bake: '#FABA75',
    pattern: 'patterns/open-hardware.svg',
  },
  'Security Devroom': {
    label: 'Security Devroom',
    stroke: '#04C7BD', accent: '#039B93',
    doodle: '#87FDF7', bake: '#04C7BD',
    pattern: 'patterns/security.svg',
  },
  'RTOS Devroom': {
    label: 'RTOS Devroom',
    stroke: '#A6AF00', accent: '#818800',
    doodle: '#BACC5C', bake: '#A6AF00',
    pattern: 'patterns/rtos.svg',
  },
};

const DEFAULT_DEVROOM = 'Open Design Devroom';

/* Reference mockups for the ?debug pixel-compare overlay (only these two exist). */
const DEBUG_OVERLAYS = {
  'Open Design Devroom': 'debug/open-design.png',
  'Cloud and Devops Devroom': 'debug/cloud-and-devops.png',
};

/* The shared torn-band shape; #FF4EC4 gets recoloured to each devroom's stroke. */
const BAND_SRC = 'patterns/band.svg';
const BAND_BASE_COLOR = '#FF4EC4';

/*
 * The torn "edge-cut" region (from the reference design). The doodle field is
 * clipped to this shape so it has a clean jagged boundary against the white
 * card instead of bleeding edge-to-edge. Coordinates are in the 1080×1350 frame.
 */
const DECOR_MASK_PATH =
  'M547.501 610.945L1108 473.445V1355.45H-27.9993V912.445L168.501 879.945L159.501 1155.45L330.001 950.945L493.501 1146.95V950.945L739.001 1077.95L601.001 785.445L896.001 746.445L547.501 610.945Z';

/* Strip the outer <svg> wrapper so inner content can be re-composed. */
function innerSvg(text) {
  return text.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

/* Cache fetched SVG text so switching devrooms doesn't refetch. */
const svgCache = {};
async function loadSvg(url) {
  if (svgCache[url] !== undefined) return svgCache[url];
  try {
    const res = await fetch(url);
    svgCache[url] = await res.text();
  } catch (e) {
    svgCache[url] = '';
  }
  return svgCache[url];
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const CATEGORIES = [
  'Talk',
  'Lightning Talk',
  'Workshop',
  'Devroom',
  'BOF Session',
  'Panel Discussion',
  'Invited Talk',
];

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="64" height="64" fill="#eaeaea"/>' +
      '<path d="M21.3053 11.0879H42.6905V32.473H21.3053V11.0879Z" fill="#fafafa"/>' +
      '<path d="M11.7383 36.9752H52.2575V54.9837H11.7383V36.9752Z" fill="#fafafa"/>' +
      '</svg>',
  );

/* ── CSV parser (handles quoted fields with commas) ── */

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).reduce((acc, line) => {
    const vals = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => (row[h] = (vals[i] || '').trim()));

    const name = row['Full Name'] || '';
    if (!name) return acc;

    const rawTrack = row['Track'] || DEFAULT_DEVROOM;
    const track = DEVROOMS[rawTrack] ? rawTrack : DEFAULT_DEVROOM;

    acc.push({
      name,
      title: row['Title'] || '',
      category: row['Session Type'] || 'Talk',
      track,
      description: row['Post desc'] || '',
      designation: '',
      imageDataUrl: null,
    });
    return acc;
  }, []);
}

/* ── Vue app ── */

const { createApp, nextTick } = Vue;

createApp({
  data() {
    return {
      mode: 'single',
      form: {
        category: 'Talk',
        title: '',
        description: '',
        name: '',
        designation: '',
        track: DEFAULT_DEVROOM,
      },
      imageDataUrl: null,
      placeholderImage: PLACEHOLDER_IMAGE,
      speakers: [],
      isDownloading: false,
      downloadProgress: { current: 0, total: 0 },
      bulkSearch: '',
      decorSvg: '',
      debug: false,
      debugOpacity: 0.5,
    };
  },

  computed: {
    activeDevroom() {
      return DEVROOMS[this.form.track] || DEVROOMS[DEFAULT_DEVROOM];
    },
    strokeColor() {
      return this.activeDevroom.stroke;
    },
    accentColor() {
      return this.activeDevroom.accent;
    },
    pillBg() {
      return hexToRgba(this.activeDevroom.accent, 0.1);
    },
    photoColor() {
      const s = this.activeDevroom.stroke;
      return `linear-gradient(150deg, ${hexToRgba(s, 0)} 42%, ${hexToRgba(s, 0.7)} 100%)`;
    },
    descGradient() {
      return `linear-gradient(180deg, #ffffff 0%, ${hexToRgba(this.activeDevroom.stroke, 0.06)} 100%)`;
    },
    devroomNames() {
      return Object.keys(DEVROOMS);
    },
    debugOverlaySrc() {
      return DEBUG_OVERLAYS[this.form.track] || null;
    },
    categories() {
      return CATEGORIES;
    },
    filteredSpeakers() {
      if (!this.bulkSearch) return this.speakers;
      const q = this.bulkSearch.toLowerCase();
      return this.speakers.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.track.toLowerCase().includes(q),
      );
    },
    bulkStats() {
      const total = this.speakers.length;
      const withImage = this.speakers.filter((s) => s.imageDataUrl).length;
      return { total, withImage };
    },
  },

  methods: {
    /* ── Query-string pre-fill ── */
    parseQueryString() {
      const p = new URLSearchParams(window.location.search);
      const get = (...keys) => {
        for (const k of keys) {
          const v = p.get(k);
          if (v) return v;
        }
        return '';
      };

      const name = get('name', 'Full Name');
      if (name) this.form.name = name;

      const title = get('title', 'Title');
      if (title) this.form.title = title;

      const desc = get('desc', 'description', 'Post desc');
      if (desc) this.form.description = desc;

      const type = get('type', 'category', 'Session Type');
      if (type) this.form.category = type;

      const track = get('track', 'Track');
      if (track && DEVROOMS[track]) this.form.track = track;

      // ?debug — ghost the reference mockup over the card to pixel-compare.
      // ?debug=0.3 sets the overlay opacity (0–1).
      if (p.has('debug')) {
        this.debug = true;
        const o = parseFloat(p.get('debug'));
        if (!isNaN(o) && o >= 0 && o <= 1) this.debugOpacity = o;
      }

      const designation = get('designation');
      if (designation) this.form.designation = designation;
    },

    /* ── Image handling ── */
    handleImage(event) {
      const file = event.target.files?.[0];
      if (!file) {
        this.imageDataUrl = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => (this.imageDataUrl = e.target.result);
      reader.readAsDataURL(file);
    },

    handleBulkImage(event, speaker) {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => (speaker.imageDataUrl = e.target.result);
      reader.readAsDataURL(file);
    },

    removeBulkImage(speaker) {
      speaker.imageDataUrl = null;
    },

    /* ── CSV upload ── */
    handleCSV(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.speakers = parseCSV(e.target.result);
      };
      reader.readAsText(file);
    },

    async loadSampleCSV() {
      const res = await fetch('sample.csv');
      const text = await res.text();
      this.speakers = parseCSV(text);
    },

    /* ── Single card download ── */
    async downloadCard(format) {
      const preview = this.$refs.cardPreview;
      const wrapper = this.$refs.previewWrapper;
      if (!preview) return;

      const origTransform = wrapper.style.transform;
      wrapper.style.transform = 'none';
      wrapper.style.width = 'auto';
      wrapper.style.height = 'auto';

      await nextTick();

      const canvas = await html2canvas(preview, {
        width: 1080,
        height: 1350,
        scale: 1,
        useCORS: true,
      });

      wrapper.style.transform = origTransform || '';
      wrapper.style.width = '';
      wrapper.style.height = '';

      const link = document.createElement('a');
      link.download = this.slugify(this.form.name || 'speaker-card') + '.' + format;
      link.href = canvas.toDataURL('image/' + format);
      link.click();
    },

    /* ── Bulk download (ZIP) ── */
    async downloadAllCards(format) {
      if (!this.speakers.length) return;

      this.isDownloading = true;
      this.downloadProgress = { current: 0, total: this.speakers.length };

      const savedForm = { ...this.form };
      const savedImage = this.imageDataUrl;
      const savedMode = this.mode;

      this.mode = 'single';
      await nextTick();

      const wrapper = this.$refs.previewWrapper;
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.transform = 'none';
      wrapper.style.width = 'auto';
      wrapper.style.height = 'auto';

      const zip = new JSZip();

      for (let i = 0; i < this.speakers.length; i++) {
        const s = this.speakers[i];
        Object.assign(this.form, {
          name: s.name,
          title: s.title,
          category: s.category,
          track: s.track,
          description: s.description,
          designation: s.designation || '',
        });
        this.imageDataUrl = s.imageDataUrl || null;

        await nextTick();
        await new Promise((r) => setTimeout(r, 80));

        const canvas = await html2canvas(this.$refs.cardPreview, {
          width: 1080,
          height: 1350,
          scale: 1,
          useCORS: true,
        });

        const blob = await new Promise((r) => canvas.toBlob(r, 'image/' + format));
        zip.file(this.slugify(s.name) + '.' + format, blob);
        this.downloadProgress.current = i + 1;
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'indiafoss-2026-speakers.' + format + '.zip');

      Object.assign(this.form, savedForm);
      this.imageDataUrl = savedImage;
      this.mode = savedMode;

      wrapper.style.position = '';
      wrapper.style.left = '';
      wrapper.style.transform = '';
      wrapper.style.width = '';
      wrapper.style.height = '';

      this.isDownloading = false;
    },

    /* ── Helpers ── */
    slugify(str) {
      return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'speaker';
    },

    devroomStyle(trackName) {
      return DEVROOMS[trackName] || DEVROOMS[DEFAULT_DEVROOM];
    },

    /* ── Decorative layers, composed as one inline SVG ──
       band (recoloured, behind) + doodle field clipped to the torn edge. */
    async loadDecor() {
      const d = this.activeDevroom;
      const [bandRaw, doodleRaw] = await Promise.all([loadSvg(BAND_SRC), loadSvg(d.pattern)]);
      const band = innerSvg(bandRaw).split(BAND_BASE_COLOR).join(d.stroke);
      const doodles = innerSvg(doodleRaw).split(d.bake).join(d.doodle);
      this.decorSvg =
        '<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" ' +
        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
        '<defs><clipPath id="ifDecorClip"><path d="' + DECOR_MASK_PATH + '"/></clipPath></defs>' +
        '<g transform="translate(0 441)">' + band + '</g>' +
        '<g clip-path="url(#ifDecorClip)"><g transform="translate(0 473)">' + doodles + '</g></g>' +
        '</svg>';
    },

    getShareUrl(speaker) {
      const params = new URLSearchParams({
        name: speaker.name,
        title: speaker.title,
        type: speaker.category,
        track: speaker.track,
        desc: speaker.description,
      });
      return window.location.origin + window.location.pathname + '?' + params.toString();
    },

    copyShareUrl(speaker) {
      navigator.clipboard.writeText(this.getShareUrl(speaker));
    },

    loadSpeakerToForm(speaker) {
      Object.assign(this.form, {
        name: speaker.name,
        title: speaker.title,
        category: speaker.category,
        track: speaker.track,
        description: speaker.description,
        designation: speaker.designation || '',
      });
      this.imageDataUrl = speaker.imageDataUrl || null;
      this.mode = 'single';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  watch: {
    'form.track'() {
      this.loadDecor();
    },
  },

  mounted() {
    this.parseQueryString();
    this.loadDecor();
    this.$nextTick(() => lucide.createIcons());
  },

  updated() {
    this.$nextTick(() => lucide.createIcons());
  },
}).mount('#app');
