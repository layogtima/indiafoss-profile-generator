/**
 * IndiaFOSS 2026 — Speaker Poster Generator
 * Vue 3 Options API · Tailwind CSS · html2canvas
 */

const TRACKS = {
  'Main Track': {
    accent: '#08b74f',
    badgeBg: 'rgba(8, 183, 79, 0.15)',
    cardFrom: '#191919',
    cardTo: '#4e4e4e',
  },
  'FOSS in Science Devroom': {
    accent: '#2563eb',
    badgeBg: 'rgba(37, 99, 235, 0.12)',
    cardFrom: '#0f1a3d',
    cardTo: '#2c4a8a',
  },
  'Geopolitics and Policy in FOSS Devroom': {
    accent: '#e11d48',
    badgeBg: 'rgba(225, 29, 72, 0.12)',
    cardFrom: '#3d0f1a',
    cardTo: '#8a2c4a',
  },
  'Android Open Source Project (AOSP) Devroom': {
    accent: '#0d9488',
    badgeBg: 'rgba(13, 148, 136, 0.12)',
    cardFrom: '#0a2e2b',
    cardTo: '#1a6b63',
  },
  'Open Hardware Devroom': {
    accent: '#d97706',
    badgeBg: 'rgba(217, 119, 6, 0.12)',
    cardFrom: '#3d2a0a',
    cardTo: '#8a6020',
  },
  'Compilers, Programming Languages and Systems Devroom': {
    accent: '#7c3aed',
    badgeBg: 'rgba(124, 58, 237, 0.12)',
    cardFrom: '#1f0a3d',
    cardTo: '#4a2c8a',
  },
};

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

    const rawTrack = (row['Track'] || 'Main Track').replace(/^main track$/i, 'Main Track');
    const track = TRACKS[rawTrack] ? rawTrack : 'Main Track';

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
        track: 'Main Track',
      },
      imageDataUrl: null,
      placeholderImage: PLACEHOLDER_IMAGE,
      speakers: [],
      isDownloading: false,
      downloadProgress: { current: 0, total: 0 },
      bulkSearch: '',
    };
  },

  computed: {
    activeTrack() {
      return TRACKS[this.form.track] || TRACKS['Main Track'];
    },
    cardGradient() {
      const t = this.activeTrack;
      return `linear-gradient(-10deg, ${t.cardFrom} 0%, ${t.cardTo} 100%)`;
    },
    trackNames() {
      return Object.keys(TRACKS);
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
      if (track) {
        const normalized = track.replace(/^main track$/i, 'Main Track');
        if (TRACKS[normalized]) this.form.track = normalized;
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

    trackStyle(trackName) {
      return TRACKS[trackName] || TRACKS['Main Track'];
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
