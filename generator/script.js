/**
 * IndiaFOSS 2026 — Speaker Poster Generator
 * Vue 3 Options API · Tailwind CSS · html-to-image
 */

/*
 * Per-devroom theming.
 *  - `label`      — text shown in the dropdown + the devroom pill
 *  - `stroke`     — photo-card border colour
 *  - `accent`     — pill text colour (a readable, deeper shade of stroke)
 *  - `patternImg` — the PNG background pattern image (from generator/patterns/)
 *
 * The key (e.g. 'AOSP Devroom') is the canonical value matched against the CSV
 * `Track` column and the ?track= query param — keep it stable.
 */
const DEVROOMS = {
  'Open Design Devroom': {
    label: 'Open Design Devroom',
    stroke: '#FF4EC4', accent: '#E337AA',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 99.52%), linear-gradient(166deg, #EDA1D4 1.63%, #E337AA 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #FFF0FA 118.15%)',
    patternImg: 'patterns/open-design-devroom pattern.png',
  },
  'Cloud and Devops Devroom': {
    label: 'Cloud & Devops Devroom',
    stroke: '#85A1FF', accent: '#5D7DF0',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #A3B8FF 1.63%, #4C76FF 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #F3F4F7 118.15%)',
    patternImg: 'patterns/cloud & devops devroom pattern.png',
  },
  'Compiler Devroom': {
    label: 'Compiler Devroom',
    stroke: '#E77D74', accent: '#D35849',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #EEA5A0 1.63%, #DF5447 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #FCEFEE 118.15%)',
    patternImg: 'patterns/compilers devroom pattern.png',
  },
  'AOSP Devroom': {
    label: 'AOSP Devroom',
    stroke: '#00C603', accent: '#0A9E0C',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #C2FFC2 1.63%, #00B203 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #EAFFEA 118.15%)',
    patternImg: 'patterns/aosp devroom pattern.png',
  },
  'Documentation Devroom': {
    label: 'Documentation Devroom',
    stroke: '#A14CEC', accent: '#8B36D6',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #C798FF 1.63%, #9C42EB 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #F9F4FE 118.15%)',
    patternImg: 'patterns/documention devroom pattern.png',
  },
  'Open Hardware Devroom': {
    label: 'Open Hardware Devroom',
    stroke: '#FABA75', accent: '#E08A2E',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #F9C58A 1.63%, #D56F01 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #FFF0E1 118.15%)',
    patternImg: 'patterns/open hardware devroom pattern.png',
  },
  'Security Devroom': {
    label: 'Security Devroom',
    stroke: '#04C7BD', accent: '#039B93',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #07EEE6 1.63%, #03B4AB 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #E7FFFD 118.15%)',
    patternImg: 'patterns/security devroom pattern.png',
  },
  'RTOS Devroom': {
    label: 'RTOS Devroom',
    stroke: '#A6AF00', accent: '#818800',
    photoBackgroundGradient: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 48%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(166deg, #CBD600 1.63%, #9BA300 65.28%)',
    descriptionBackgroundGradient: 'linear-gradient(211deg, #FFF 13.69%, #F1F5DE 118.15%)',
    patternImg: 'patterns/rtos devroom pattern.png',
  },
};

const DEFAULT_DEVROOM = 'Open Design Devroom';

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
    photoBgGradient() {
      return this.activeDevroom.photoBackgroundGradient;
    },
    descBgGradient() {
      return this.activeDevroom.descriptionBackgroundGradient;
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

      const fn = format === 'jpeg' ? htmlToImage.toJpeg : htmlToImage.toPng;
      const dataUrl = await fn(preview, {
        width: 1080,
        height: 1350,
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
          description: s.description,
          designation: s.designation || '',
        });
        this.imageDataUrl = s.imageDataUrl || null;

        await nextTick();
        await new Promise((r) => setTimeout(r, 80));

        const dataUrl = await fn(this.$refs.cardPreview, {
          width: 1080,
          height: 1350,
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

    devroomStyle(trackName) {
      return DEVROOMS[trackName] || DEVROOMS[DEFAULT_DEVROOM];
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

  mounted() {
    this.parseQueryString();
    this.$nextTick(() => lucide.createIcons());
  },

  updated() {
    this.$nextTick(() => lucide.createIcons());
  },
}).mount('#app');
