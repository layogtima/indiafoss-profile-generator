/**
 * IndiaFOSS 2026 — Speaker Poster Generator
 * Vue 3 Options API · Tailwind CSS · html-to-image
 */

/*
 * Main Track color variants.
 * Each color variant defines:
 *  - `name`: display name
 *  - `accent`: pill text & accent color
 *  - `stroke`: preview bar & stroke color
 *  - `patternImg`: background pattern PNG in generator/patterns/
 *  - `photoBackgroundGradient`: background for speaker-photo .inside div
 *  - `infoBackgroundGradient`: background for .speaker-info card
 */
const MAIN_TRACK_COLORS = {
  red: {
    name: 'Red',
    accent: '#FF643E',
    stroke: '#FF643E',
    patternImg: 'patterns/red.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #FF7C5C 1.63%, #FF5B33 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #FF6C47 -3.13%, #FF4B1F 73%)',
  },
  yellow: {
    name: 'Yellow',
    accent: '#F5AB00',
    stroke: '#F5AB00',
    patternImg: 'patterns/yellow.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #FFB50A 1.63%, #D69500 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(178deg, #F5AB00 -15.57%, #C28700 67.96%)',
  },
  pink: {
    name: 'Pink',
    accent: '#E45CFF',
    stroke: '#E45CFF',
    patternImg: 'patterns/pink.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #EB85FF 1.63%, #E147FF 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #E770FF -3.13%, #E147FF 73%)',
  },
  violet: {
    name: 'Violet',
    accent: '#8A5CFF',
    stroke: '#8A5CFF',
    patternImg: 'patterns/violet.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #AE8FFF 1.63%, #8352FF 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #AE8FFF -3.13%, #8352FF 73%)',
  },
  lime: {
    name: 'Lime',
    accent: '#9BC71A',
    stroke: '#9BC71A',
    patternImg: 'patterns/lime.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #9BC61A 1.63%, #779914 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #94BD19 -3.13%, #779914 73%)',
  },
  green: {
    name: 'Green',
    accent: '#00D668',
    stroke: '#00D668',
    patternImg: 'patterns/green.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #61D963 1.63%, #00AD54 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #00D668 -3.13%, #00AD54 73%)',
  },
  mint: {
    name: 'Mint',
    accent: '#00C2AE',
    stroke: '#00C2AE',
    patternImg: 'patterns/mint.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #00E0CA 1.63%, #00B8A6 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #00CCB8 -3.13%, #00B8A6 79.09%)',
  },
  blue: {
    name: 'Blue',
    accent: '#4BA2FF',
    stroke: '#4BA2FF',
    patternImg: 'patterns/blue.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #7ABBFF 1.63%, #3D9BFF 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #5CABFF -3.13%, #2990FF 73%)',
  },
  ruby: {
    name: 'Ruby',
    accent: '#FF3C74',
    stroke: '#FF3C74',
    patternImg: 'patterns/ruby.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #FF7AA0 1.63%, #FF3C74 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(186deg, #FF6692 -3.13%, #FF3D75 73%)',
  },
};

/*
 * Per-devroom theming.
 *  - `label`      — text shown in the dropdown + the devroom pill
 *  - `stroke`     — devroom stroke colour
 *  - `accent`     — pill text colour (a readable, deeper shade of stroke)
 *
 * The key (e.g. 'AOSP Devroom') is the canonical value matched against the CSV
 * `Track` column and the ?track= query param — keep it stable.
 */
const DEVROOMS = {
  'Main Track': {
    label: 'Main Track',
    stroke: MAIN_TRACK_COLORS.red.stroke, accent: MAIN_TRACK_COLORS.red.accent,
    patternImg: MAIN_TRACK_COLORS.red.patternImg,
    photoBackgroundGradient: MAIN_TRACK_COLORS.red.photoBackgroundGradient,
    infoBackgroundGradient: MAIN_TRACK_COLORS.red.infoBackgroundGradient,
  },
  'Open Design Devroom': {
    label: 'Open Design Devroom',
    stroke: '#D93AA4', accent: '#D93AA4',
    patternImg: 'patterns/open-design-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #E05CB5 1.63%, #CD2797 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #E05CB5 11.26%, #CD2797 65.7%)',
  },
  'Cloud and Devops Devroom': {
    label: 'Cloud & Devops Devroom',
    stroke: '#4D76FF', accent: '#4D76FF',
    patternImg: 'patterns/cloud-&-devops-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #A3B8FF 1.63%, #4C76FF 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #A3B8FF 11.26%, #4C76FF 65.7%)',
  },
  'Compiler Devroom': {
    label: 'Compiler Devroom',
    stroke: '#D35849', accent: '#D35849',
    patternImg: 'patterns/compilers-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #EA8E85 1.63%, #DF5548 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #E46E63 11.26%, #DF5548 65.7%)',
  },
  'AOSP Devroom': {
    label: 'AOSP Devroom',
    stroke: '#00B203', accent: '#00B203',
    patternImg: 'patterns/aosp-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #61D963 1.63%, #009A03 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #61D963 15.45%, #009A03 72.4%)',
  },
  'Documentation Devroom': {
    label: 'Documentation Devroom',
    stroke: '#9739EA', accent: '#9739EA',
    patternImg: 'patterns/documention-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #BB7EF1 1.63%, #9739EA 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #BB7EF1 11.26%, #9739EA 65.7%)',
  },
  'Open Hardware Devroom': {
    label: 'Open Hardware Devroom',
    stroke: '#E37601', accent: '#E37601',
    patternImg: 'patterns/open-hardware-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #FEBA71 1.63%, #E37601 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #FEA648 11.26%, #E37601 65.7%)',
  },
  'Security Devroom': {
    label: 'Security Devroom',
    stroke: '#03B4AB', accent: '#03B4AB',
    patternImg: 'patterns/security-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #07EEE6 1.63%, #03B4AB 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #07E4DC 11.26%, #03ABA2 65.7%)',
  },
  'RTOS Devroom': {
    label: 'RTOS Devroom',
    stroke: '#A6AF00', accent: '#A6AF00',
    patternImg: 'patterns/rtos-devroom-pattern.png',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #CBD600 1.63%, #9BA300 65.28%)',
    infoBackgroundGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(166deg, #CBD600 11.26%, #9BA300 65.7%)',
  },
};

const DEFAULT_DEVROOM = 'Main Track';

/* Reference mockups for the ?debug pixel-compare overlay (only these two exist). */
const DEBUG_OVERLAYS = {
  'Open Design Devroom': 'debug/open-design.png',
  'Cloud and Devops Devroom': 'debug/cloud-and-devops.png',
};

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
      '<path d="M21.3053 11.0879H42.6905V32.473H21.3053V11.0879Z" fill="#ffffff"/>' +
      '<path d="M11.7383 36.9752H52.2575V54.9837H11.7383V36.9752Z" fill="#ffffff"/>' +
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
    let track = DEFAULT_DEVROOM;
    let color = (row['Color'] || row['Colour'] || 'red').toLowerCase();

    const lowerRawTrack = rawTrack.toLowerCase();
    if (lowerRawTrack.includes('main')) {
      track = 'Main Track';
      for (const colorKey of Object.keys(MAIN_TRACK_COLORS)) {
        if (lowerRawTrack.includes(colorKey)) {
          color = colorKey;
          break;
        }
      }
    } else if (DEVROOMS[rawTrack]) {
      track = rawTrack;
    } else {
      track = DEFAULT_DEVROOM;
    }

    acc.push({
      name,
      title: row['Title'] || '',
      category: row['Session Type'] || 'Talk',
      track,
      color: MAIN_TRACK_COLORS[color] ? color : 'red',
      designation: row['Designation'] || '',
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
        name: '',
        designation: '',
        track: DEFAULT_DEVROOM,
        color: 'red',
      },
      imageDataUrl: null,
      photoFit: 'contain',
      placeholderImage: PLACEHOLDER_IMAGE,
      speakers: [],
      isDownloading: false,
      downloadProgress: { current: 0, total: 0 },
      bulkSearch: '',
      debug: false,
      debugOpacity: 0.5,
    };
  },

  computed: {
    activeMainTrackColor() {
      return MAIN_TRACK_COLORS[this.form.color] || MAIN_TRACK_COLORS.red;
    },
    mainTrackColors() {
      return MAIN_TRACK_COLORS;
    },
    activeDevroom() {
      if (this.form.track === 'Main Track') {
        const c = this.activeMainTrackColor;
        return {
          label: 'Main Track',
          stroke: c.stroke,
          accent: c.accent,
          patternImg: c.patternImg,
          photoBackgroundGradient: c.photoBackgroundGradient,
          infoBackgroundGradient: c.infoBackgroundGradient,
        };
      }
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
    photoBgGradient() {
      return this.activeDevroom.photoBackgroundGradient;
    },
    photoStyle() {
      if (this.imageDataUrl) {
        return {
          backgroundImage: `url('${this.imageDataUrl}')`,
          backgroundColor: 'transparent',
          backgroundPosition: 'center',
          backgroundSize: this.photoFit || 'contain',
          backgroundRepeat: 'no-repeat',
        };
      }
      return {};
    },
    infoBgGradient() {
      return this.activeDevroom.infoBackgroundGradient || this.activeDevroom.photoBackgroundGradient;
    },
    patternImgUrl() {
      return this.activeDevroom.patternImg || null;
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
          s.track.toLowerCase().includes(q) ||
          (s.color && s.color.toLowerCase().includes(q)),
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

      const type = get('type', 'category', 'Session Type');
      if (type) this.form.category = type;

      const track = get('track', 'Track');
      if (track) {
        const lowerTrack = track.toLowerCase();
        if (lowerTrack === 'main' || lowerTrack === 'main track' || lowerTrack === 'main-track') {
          this.form.track = 'Main Track';
        } else if (DEVROOMS[track]) {
          this.form.track = track;
        }
      }

      const color = get('color', 'Color', 'theme');
      if (color && MAIN_TRACK_COLORS[color.toLowerCase()]) {
        this.form.color = color.toLowerCase();
        if (!track) this.form.track = 'Main Track';
      }

      // ?debug — ghost the reference mockup over the card to pixel-compare.
      // ?debug=0.3 sets the overlay opacity (0–1).
      if (p.has('debug')) {
        this.debug = true;
        const o = parseFloat(p.get('debug'));
        if (!isNaN(o) && o >= 0 && o <= 1) this.debugOpacity = o;
      }

      const designation = get('designation');
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

    removeImage() {
      this.imageDataUrl = null;
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = '';
      }
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

      const fn = format === 'jpeg' ? htmlToImage.toJpeg : htmlToImage.toPng;
      const dataUrl = await fn(preview, {
        width: 1080,
        height: 1080,
        filter: (node) => !node.dataset?.htmlToImageIgnore,
      });

      wrapper.style.transform = origTransform || '';
      wrapper.style.width = '';
      wrapper.style.height = '';

      const link = document.createElement('a');
      link.download = this.slugify(this.form.name || 'speaker-card') + '.' + format;
      link.href = dataUrl;
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
      const fn = format === 'jpeg' ? htmlToImage.toJpeg : htmlToImage.toPng;

      for (let i = 0; i < this.speakers.length; i++) {
        const s = this.speakers[i];
        Object.assign(this.form, {
          name: s.name,
          title: s.title,
          category: s.category,
          track: s.track,
          color: s.color || 'red',
          designation: s.designation || '',
        });
        this.imageDataUrl = s.imageDataUrl || null;

        await nextTick();
        await new Promise((r) => setTimeout(r, 80));

        const dataUrl = await fn(this.$refs.cardPreview, {
          width: 1080,
          height: 1080,
          filter: (node) => !node.dataset?.htmlToImageIgnore,
        });

        const blob = await fetch(dataUrl).then((r) => r.blob());
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

    devroomStyle(trackName, colorKey) {
      if (trackName === 'Main Track') {
        const color = colorKey || (this.form && this.form.track === 'Main Track' ? this.form.color : 'red') || 'red';
        const c = MAIN_TRACK_COLORS[color] || MAIN_TRACK_COLORS.red;
        return {
          label: 'Main Track',
          stroke: c.stroke,
          accent: c.accent,
          patternImg: c.patternImg,
          photoBackgroundGradient: c.photoBackgroundGradient,
          infoBackgroundGradient: c.infoBackgroundGradient,
        };
      }
      return DEVROOMS[trackName] || DEVROOMS[DEFAULT_DEVROOM];
    },

    getShareUrl(speaker) {
      const params = new URLSearchParams({
        name: speaker.name,
        title: speaker.title,
        type: speaker.category,
        track: speaker.track,
      });
      if (speaker.track === 'Main Track' && speaker.color) {
        params.set('color', speaker.color);
      }
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
        color: speaker.color || 'red',
        designation: speaker.designation || '',
      });
      this.imageDataUrl = speaker.imageDataUrl || null;
      this.mode = 'single';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  mounted() {
    this.parseQueryString();
    this.$nextTick(() => lucide.createIcons());
    Object.values(DEVROOMS).forEach((d) => {
      if (d.patternImg) {
        const img = new Image();
        img.src = d.patternImg;
      }
    });
    Object.values(MAIN_TRACK_COLORS).forEach((c) => {
      if (c.patternImg) {
        const img = new Image();
        img.src = c.patternImg;
      }
    });
  },

  updated() {
    this.$nextTick(() => lucide.createIcons());
  },
}).mount('#app');
