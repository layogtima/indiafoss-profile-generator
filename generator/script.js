/**
 * IndiaFOSS 2026 — Speaker Poster Generator
 * Vue 3 Options API · Tailwind CSS · html-to-image
 */

/*
 * General Track color variants.
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
  /* General Track theming is resolved dynamically in the activeDevroom computed
     property based on form.color. This entry only provides the dropdown key + label. */
  'General Track': {
    label: 'General Track',
    stroke: '#FF643E',   // red default — overridden by activeDevroom when selected
    accent: '#FF643E',
    patternImg: 'patterns/red.png',
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

const DEFAULT_DEVROOM = 'General Track';

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

/* ── Track & Category resolvers ── */

function resolveTrack(rawTrack) {
  if (!rawTrack) return DEFAULT_DEVROOM;
  const trimmed = rawTrack.trim();
  if (DEVROOMS[trimmed]) return trimmed;

  const lower = trimmed.toLowerCase();
  if (lower.includes('main') || lower.includes('general')) {
    return 'General Track';
  }
  if (lower.includes('cloud') || lower.includes('devops')) {
    return 'Cloud and Devops Devroom';
  }
  if (lower.includes('compiler')) {
    return 'Compiler Devroom';
  }
  if (lower.includes('aosp') || lower.includes('android')) {
    return 'AOSP Devroom';
  }
  if (lower.includes('doc')) {
    return 'Documentation Devroom';
  }
  if (lower.includes('hardware')) {
    return 'Open Hardware Devroom';
  }
  if (lower.includes('security')) {
    return 'Security Devroom';
  }
  if (lower.includes('rtos') || lower.includes('real time')) {
    return 'RTOS Devroom';
  }
  if (lower.includes('design')) {
    return 'Open Design Devroom';
  }

  for (const name of Object.keys(DEVROOMS)) {
    if (name.toLowerCase() === lower) return name;
  }

  return DEFAULT_DEVROOM;
}

function resolveCategory(rawCategory) {
  if (!rawCategory) return 'Talk';
  const trimmed = rawCategory.trim();
  for (const cat of CATEGORIES) {
    if (cat.toLowerCase() === trimmed.toLowerCase()) return cat;
  }
  const lower = trimmed.toLowerCase();
  if (lower.includes('bof') || lower.includes('feather')) return 'BOF Session';
  if (lower.includes('lightning')) return 'Lightning Talk';
  if (lower.includes('workshop')) return 'Workshop';
  if (lower.includes('panel')) return 'Panel Discussion';
  if (lower.includes('invited')) return 'Invited Talk';
  if (lower.includes('devroom')) return 'Devroom';
  if (lower.includes('talk')) return 'Talk';
  return trimmed;
}

/* ── CSV parser (RFC 4180 compliant: quotes, commas, escapes, multi-line) ── */

function parseCSVRows(text) {
  const cleanText = (text || '').replace(/^\uFEFF/, '');
  const rows = [];
  let currentVal = '';
  let currentRow = [];
  let inQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const ch = cleanText[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < cleanText.length && cleanText[i + 1] === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((ch === '\r' || ch === '\n') && !inQuotes) {
      if (ch === '\r' && cleanText[i + 1] === '\n') {
        i++;
      }
      currentRow.push(currentVal);
      currentVal = '';
      if (currentRow.some((v) => v.trim())) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += ch;
    }
  }
  if (currentVal || currentRow.length) {
    currentRow.push(currentVal);
    if (currentRow.some((v) => v.trim())) {
      rows.push(currentRow);
    }
  }
  return rows;
}

function parseCSVLine(line) {
  const rows = parseCSVRows(line);
  return rows.length ? rows[0] : [];
}

function parseCSV(text) {
  const rows = parseCSVRows(text);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());

  let nameCol = -1;
  let titleCol = -1;
  let devroomCol = -1;
  let typeCol = -1;
  let statusCol = -1;
  let linkCol = -1;
  let designationCol = -1;
  let colorCol = -1;
  let hasWhichTrackCol = false;
  let genericTrackCol = -1;

  headers.forEach((h, idx) => {
    const hl = h.toLowerCase();
    if (hl.includes('which track') || hl.includes('applying for')) {
      devroomCol = idx;
      hasWhichTrackCol = true;
    } else if (['devroom'].includes(hl)) {
      devroomCol = idx;
    } else if (['track'].includes(hl)) {
      genericTrackCol = idx;
    }

    if (['session type', 'session_type', 'session-type', 'type', 'category'].includes(hl)) {
      typeCol = idx;
    }

    if (['full name', 'speaker', 'name', 'speaker name', 'speaker_name'].includes(hl)) {
      if (nameCol === -1 || hl === 'speaker' || hl === 'full name') {
        nameCol = idx;
      }
    }

    if (['session_title', 'session title', 'title', 'talk title', 'talk_title', 'topic'].includes(hl)) {
      if (titleCol === -1 || hl === 'session_title' || hl === 'title') {
        titleCol = idx;
      }
    }

    if (['review_status', 'review status', 'status', 'review-status', 'post status', 'design status'].includes(hl)) {
      if (statusCol === -1 || hl.includes('review')) {
        statusCol = idx;
      }
    }

    if (['link', 'url', 'proposal url', 'proposal_url'].includes(hl)) {
      linkCol = idx;
    }

    if (['designation', 'role', 'bio', 'speaker bio', 'speaker_bio'].includes(hl)) {
      designationCol = idx;
    }

    if (['color', 'colour', 'theme'].includes(hl)) {
      colorCol = idx;
    }
  });

  // In CFP submissions exports, "Which track are you applying for?" is the devroom,
  // and the "track" column specifies the session type (Talk, Lightning Talk, etc.)
  if (hasWhichTrackCol && genericTrackCol !== -1 && typeCol === -1) {
    typeCol = genericTrackCol;
  } else if (!hasWhichTrackCol && genericTrackCol !== -1 && devroomCol === -1) {
    devroomCol = genericTrackCol;
  }

  return rows.slice(1).reduce((acc, vals) => {
    const getVal = (colIdx) => (colIdx >= 0 && colIdx < vals.length ? vals[colIdx].trim() : '');

    const name = getVal(nameCol);
    if (!name) return acc;

    const title = getVal(titleCol);
    const rawTrack = getVal(devroomCol);
    const track = resolveTrack(rawTrack);
    const rawType = getVal(typeCol);
    const category = resolveCategory(rawType);
    const status = getVal(statusCol);
    const link = getVal(linkCol);
    const designation = getVal(designationCol);

    let color = getVal(colorCol).toLowerCase();
    if (!color || !MAIN_TRACK_COLORS[color]) {
      const lowerRawTrack = (rawTrack || '').toLowerCase();
      color = 'red';
      for (const colorKey of Object.keys(MAIN_TRACK_COLORS)) {
        if (lowerRawTrack.includes(colorKey)) {
          color = colorKey;
          break;
        }
      }
    }

    acc.push({
      name,
      title,
      category,
      track,
      color,
      designation,
      status,
      link,
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
      placeholderImage: PLACEHOLDER_IMAGE,
      speakers: [],
      isDownloading: false,
      downloadProgress: { current: 0, total: 0 },
      bulkSearch: '',
      statusFilter: 'all',
      trackFilter: 'all',
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
      if (this.form.track === 'General Track') {
        const c = this.activeMainTrackColor;
        return {
          label: 'General Track',
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
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        };
      }
      return {};
    },
    infoBgGradient() {
      return this.activeDevroom.infoBackgroundGradient;
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
    cardTitle() {
      const title = this.form.title || 'Talk title goes here...';
      return title.length > 95 ? title.slice(0, 95).trimEnd() + '...' : title;
    },
    availableStatuses() {
      const counts = {};
      this.speakers.forEach((s) => {
        if (s.status) {
          counts[s.status] = (counts[s.status] || 0) + 1;
        }
      });
      return Object.keys(counts)
        .sort((a, b) => {
          if (a.toLowerCase() === 'approved') return -1;
          if (b.toLowerCase() === 'approved') return 1;
          return a.localeCompare(b);
        })
        .map((status) => ({ name: status, count: counts[status] }));
    },
    filteredSpeakers() {
      let list = this.speakers;

      if (this.statusFilter && this.statusFilter !== 'all') {
        const sf = this.statusFilter.toLowerCase();
        list = list.filter((s) => (s.status || '').toLowerCase() === sf);
      }

      if (this.trackFilter && this.trackFilter !== 'all') {
        list = list.filter((s) => s.track === this.trackFilter);
      }

      if (this.bulkSearch) {
        const q = this.bulkSearch.toLowerCase().trim();
        list = list.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.title.toLowerCase().includes(q) ||
            s.track.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            (s.status && s.status.toLowerCase().includes(q)) ||
            (s.color && s.color.toLowerCase().includes(q)),
        );
      }
      return list;
    },
    bulkStats() {
      const total = this.speakers.length;
      const filtered = this.filteredSpeakers.length;
      const withImage = this.filteredSpeakers.filter((s) => s.imageDataUrl).length;
      return { total, filtered, withImage };
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
      if (type) this.form.category = resolveCategory(type);

      const track = get('track', 'Track');
      if (track) {
        this.form.track = resolveTrack(track);
      }

      const color = get('color', 'Color', 'theme');
      if (color && MAIN_TRACK_COLORS[color.toLowerCase()]) {
        this.form.color = color.toLowerCase();
        if (!track) this.form.track = 'General Track';
      }

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

    statusBadgeClass(status) {
      const s = (status || '').toLowerCase();
      if (s === 'approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      if (s === 'screening') return 'bg-amber-50 text-amber-700 border-amber-200';
      if (s === 'rejected') return 'bg-rose-50 text-rose-700 border-rose-200';
      if (s === 'withdrawn') return 'bg-gray-100 text-gray-600 border-gray-200';
      return 'bg-blue-50 text-blue-700 border-blue-200';
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
        const hasApproved = this.speakers.some(
          (s) => s.status && s.status.toLowerCase() === 'approved',
        );
        this.statusFilter = hasApproved ? 'Approved' : 'all';
        this.trackFilter = 'all';
        this.bulkSearch = '';
      };
      reader.readAsText(file);
    },

    async loadSampleCSV() {
      try {
        const res = await fetch('sample.csv');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        this.speakers = parseCSV(text);
        this.statusFilter = 'all';
        this.trackFilter = 'all';
        this.bulkSearch = '';
      } catch (err) {
        console.error('Could not load sample.csv:', err);
      }
    },

    async loadSubmissionsCSV() {
      try {
        const res = await fetch('IndiaFOSS 2026-submissions.csv');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        this.speakers = parseCSV(text);
        const hasApproved = this.speakers.some(
          (s) => s.status && s.status.toLowerCase() === 'approved',
        );
        this.statusFilter = hasApproved ? 'Approved' : 'all';
        this.trackFilter = 'all';
        this.bulkSearch = '';
      } catch (err) {
        console.error('Could not load IndiaFOSS 2026-submissions.csv:', err);
        alert('Could not automatically fetch IndiaFOSS 2026-submissions.csv. Please use the "Upload Speaker CSV" button above to select the file.');
      }
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
      const targets = this.filteredSpeakers;
      if (!targets.length) return;

      this.isDownloading = true;
      this.downloadProgress = { current: 0, total: targets.length };

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
      const usedFilenames = new Set();

      for (let i = 0; i < targets.length; i++) {
        const s = targets[i];
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
        const baseName = this.slugify(s.name || 'speaker');
        let filename = `${baseName}.${format}`;
        let counter = 2;
        while (usedFilenames.has(filename)) {
          filename = `${baseName}-${counter}.${format}`;
          counter++;
        }
        usedFilenames.add(filename);
        zip.file(filename, blob);
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
      if (trackName === 'General Track') {
        const color = colorKey || (this.form && this.form.track === 'General Track' ? this.form.color : 'red') || 'red';
        const c = MAIN_TRACK_COLORS[color] || MAIN_TRACK_COLORS.red;
        return {
          label: 'General Track',
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
      if (speaker.track === 'General Track' && speaker.color) {
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
