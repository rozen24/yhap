'use strict';

/* ── RENDER CACHE ─────────────────────────────────── */
const _renderCache = new Map();

/* Enable body transitions only after first paint to avoid FOUC */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.body.classList.add('transitions-ready');
  });
});

/* ── DATA ────────────────────────────────────────── */
const MODULES = [
  { titleBn:'মডিউল-১: বৈশ্বিক ও বাংলাদেশ প্রেক্ষাপট', titleEn:'Module-1: Global & Bangladesh Context',
    descBn:'এই মডিউলে বিশ্বব্যাপী এবং বাংলাদেশের তরুণ জনগোষ্ঠীর স্বাস্থ্য পরিস্থিতি, মৃত্যুহার, অসুস্থতার কারণ এবং SDG লক্ষ্যমাত্রার সাথে সংযোগ আলোচনা করা হবে।',
    descEn:'This module covers the global and Bangladesh youth health landscape, including mortality, morbidity, key health determinants, SDG connections, and Bangladesh Government commitments.',
    icon:'🌍', totalLessons:11, doneLessons:1 },
  { titleBn:'মডিউল-२: বয়ঃসন্ধিকাল', titleEn:'Module-2: Age-Related Changes',
    descBn:'এই মডিউলে বয়ঃসন্ধিকাল, বৃদ্ধি ও বিকাশের ধাপসমূহ এবং শারীরিক ও আবেগীয় পরিবর্তন সম্পর্কে আলোচনা করা হয়েছে।',
    descEn:'This module covers age-related changes, stages of growth and development during adolescence, and physical and emotional changes during adolescence.',
    icon:'🌱', totalLessons:3, doneLessons:3 },
  { titleBn:'মডিউল-३: মহিলাদের প্রজনন ব্যবস্থা ও মাসিক ব্যবস্থাপনা', titleEn:'Module-3: Female Reproductive System and Menstrual Management',
    descBn:'এই মডিউলে মহিলাদের প্রজনন ব্যবস্থা, মাসিককালীন করণীয়, অভিভাবকদের ভূমিকা এবং মাসিকের অস্বাভাবিকতা নিয়ে আলোচনা করা হয়েছে।',
    descEn:'This module covers the female reproductive system, what to do during menstruation, the role of parents in menstrual management, and menstrual abnormalities.',
    icon:'🩺', totalLessons:4, doneLessons:4 },
  { titleBn:'মডিউল-४: পুরুষ প্রজনন ব্যবস্থা এবং বীর্যপাত ব্যবস্থাপনা', titleEn:'Module-4: Male Reproductive System and Semen/Ejaculation Management',
    descBn:'এই মডিউলে পুরুষ প্রজনন ব্যবস্থা এবং ছেলেদের স্বপ্নদোষ ব্যবস্থাপনা সম্পর্কে আলোচনা করা হয়েছে।',
    descEn:'This module covers the male reproductive system and the management of nocturnal emission in boys.',
    icon:'🔬', totalLessons:2, doneLessons:2 },
  { titleBn:'মডিউল-५: বাল্যবিবাহ', titleEn:'Module-5: Child Marriage',
    descBn:'এই মডিউলে বাল্যবিবাহ, তার পরিণতি এবং বাল্যবিবাহ রোধে করণীয় সম্পর্কে আলোচনা করা হয়েছে।',
    descEn:'This module covers child marriage, its consequences, and actions to prevent child marriage.',
    icon:'⚠️', totalLessons:3, doneLessons:2 },
];

const LESSONS_BN = [
  ['তরুণদের বৈশ্বিক প্রেক্ষাপট','তরুণদের বাংলাদেশ প্রেক্ষাপট','তরুণদের স্বাস্থ্য ও সুস্থতা কেন গুরুত্বপূর্ণ?','বৈশ্বিক ও বাংলাদেশের তরুণ জনগোষ্ঠীর অসুস্থতা ও মৃত্যুহার','বাল্যবিবাহ','তথ্য উপাত্ত','কৈশোরকালীন স্বাস্থ্য এবং সুস্থতার জন্য নির্ধারক সমূহ','কিশোর-কিশোরীদের কেন বিশেষ যত্নের প্রয়োজন?','তরুন-তরুনীদের স্বাস্থ্য সম্পর্কিত SDG','বৈশ্বিক এজেন্ডায় কৈশোর স্বাস্থ্য','বাংলাদেশ সরকারের অঙ্গীকার'],
  ['বয়ঃসন্ধিকাল','বয়ঃসন্ধিকালে বৃদ্ধি ও বিকাশের ধাপসমূহ','বয়ঃসন্ধিকালে শারীরিক ও আবেগীয় পরিবর্তন'],
  ['মহিলাদের প্রজনন ব্যবস্থা','মাসিকের সময় কী করবেন','মাসিক ব্যবস্থাপনায় অভিভাবকদের ভূমিকা','মাসিকের অস্বাভাবিকতা'],
  ['পুরুষ প্রজনন ব্যবস্থা','ছেলেদের স্বপ্নদোষ ব্যবস্থাপনা'],
  ['বাল্যবিবাহ','বাল্যবিবাহের পরিণতি','বাল্যবিবাহ রোধে করণীয়'],
];

const LESSONS_EN = [
  ['Global Context of Youth','Bangladesh Context of Youth','Why Youth Health Matters?','Youth Morbidity & Mortality','Child Marriage','Data & Statistics','Determinants of Adolescent Health','Why Adolescents Need Special Care?','Youth Health & SDGs','Adolescent Health in Global Agenda','Bangladesh Government Commitment'],
  ['Age-related changes','Stages of growth and development during adolescence','Physical and emotional changes during adolescence'],
  ['Female reproductive system','What to do during menstruation','Role of parents in menstrual management','Menstrual abnormalities'],
  ['Male reproductive system','Management of nocturnal emission (wet dreams) in boys'],
  ['Child marriage','Consequences of child marriage','Actions to prevent child marriage'],
];

/* ── LESSON-SPECIFIC CONTENT ─────────────────────── */
const LESSON_CONTENT = {
  '1-0': {
    subheadingBn: 'বয়ঃসন্ধিকাল হচ্ছে শারীরিক পরিবর্তনের প্রক্রিয়া যখন ছেলে মেয়েরা যৌন পরিপক্কতা লাভ করে।',
    subheadingEn: 'Puberty is the process of physical changes when boys and girls reach sexual maturity.'
  }
};

/* ── STATE ───────────────────────────────────────── */
let activeModule = 0;
let activeLesson = 0;    // null = module overview
let currentLang  = 'bn';

/* ── UTILS ───────────────────────────────────────── */
function esc(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}
function isMobile() { return window.innerWidth <= 900; }

/* ── ACCORDION — single-open ─────────────────────── */
const _panelHeights = new Map(); // cache scrollHeight per panel id

function openModule(idx) {
  const count = MODULES.length;
  for (let i = 0; i < count; i++) {
    const trigger = document.getElementById('modTrigger-' + i);
    const panel   = document.getElementById('modPanel-'   + i);
    if (!trigger || !panel) continue;
    const open = (i === idx);
    trigger.setAttribute('aria-expanded', String(open));
    panel.dataset.open = String(open);
    if (open) {
      // Measure only if not cached or panel height might have changed
      if (!_panelHeights.has(i)) _panelHeights.set(i, panel.scrollHeight);
      panel.style.maxHeight = _panelHeights.get(i) + 'px';
    } else {
      panel.style.maxHeight = '0';
    }
  }
}

function handleModuleClick(idx) {
  const trigger = document.getElementById('modTrigger-' + idx);
  const isOpen  = trigger.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    // Close this panel (allow toggling closed)
    trigger.setAttribute('aria-expanded', 'false');
    document.getElementById('modPanel-' + idx).style.maxHeight = '0';
  } else {
    openModule(idx);
  }
  loadModule(idx);
}

/* ── NAVIGATION ──────────────────────────────────── */
function loadModule(modIdx) {
  activeModule = modIdx;
  activeLesson = null;
  syncSidebarActive(modIdx, null);
  renderModulePage(modIdx);
  syncBottomLabel();
  scrollContentToTop();
}

function loadLesson(modIdx, lesIdx) {
  activeModule = modIdx;
  activeLesson = lesIdx;
  openModule(modIdx);
  syncSidebarActive(modIdx, lesIdx);
  renderLessonPage(modIdx, lesIdx);
  syncBottomLabel();
  scrollContentToTop();
  if (isMobile()) closeMobileSidebar();
}

function navigate(dir) {
  const total = LESSONS_BN[activeModule].length;
  if (activeLesson === null) {
    if (dir > 0) loadLesson(activeModule, 0);
    return;
  }
  const next = activeLesson + dir;
  if (next < 0) {
    loadModule(activeModule);
  } else if (next >= total) {
    const nextMod = activeModule + 1;
    if (nextMod < MODULES.length) { openModule(nextMod); loadModule(nextMod); }
  } else {
    loadLesson(activeModule, next);
  }
}

function scrollContentToTop() {
  document.getElementById('contentArea').scrollTop = 0;
}

/* ── SIDEBAR ACTIVE STATE ────────────────────────── */
function syncSidebarActive(modIdx, lesIdx) {
  document.querySelectorAll('.module-trigger').forEach(t => t.classList.remove('is-active'));
  document.querySelectorAll('.lesson-btn').forEach(b => {
    b.classList.remove('is-active');
    b.removeAttribute('aria-current');
  });
  const trigger = document.getElementById('modTrigger-' + modIdx);
  if (trigger) trigger.classList.add('is-active');
  if (lesIdx !== null) {
    const btns = document.querySelectorAll('#modPanel-' + modIdx + ' .lesson-btn');
    if (btns[lesIdx]) {
      btns[lesIdx].classList.add('is-active');
      btns[lesIdx].setAttribute('aria-current', 'page');
    }
  }
}

/* ── RENDER: MODULE OVERVIEW ─────────────────────── */
function renderModulePage(modIdx) {
  const cacheKey = 'mod:' + modIdx;
  if (_renderCache.has(cacheKey)) {
    document.getElementById('contentArea').innerHTML = _renderCache.get(cacheKey);
    return;
  }
  const m   = MODULES[modIdx];
  const lBn = LESSONS_BN[modIdx];
  const lEn = LESSONS_EN[modIdx];
  const pct = Math.round((m.doneLessons / m.totalLessons) * 100);

  const cards = lBn.map((titleBn, i) => {
    const titleEn  = lEn[i];
    const isDone   = i < m.doneLessons;
    const isActive = modIdx === activeModule && i === activeLesson;
    const state    = isDone ? 'done' : isActive ? 'active' : '';
    const statusCh = isDone ? '✓' : isActive ? '●' : '';
    const actionBn = isDone ? 'পুনরায়' : isActive ? 'চালিয়ে যান' : 'শুরু করুন';
    const actionEn = isDone ? 'Review'  : isActive ? 'Continue'    : 'Start';
    return `<article class="lesson-card${isDone?' is-done':''}${isActive?' is-active':''}">
      <div class="card-header">
        <span class="card-num">${String(i+1).padStart(2,'0')}</span>
        <span class="card-status" data-state="${state}" aria-hidden="true">${esc(statusCh)}</span>
      </div>
      <h3 class="card-title bn">${esc(titleBn)}</h3>
      <h3 class="card-title en">${esc(titleEn)}</h3>
      <div class="card-footer">
        <span class="card-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span class="bn">পাঠ ${i+1}</span><span class="en">Lesson ${i+1}</span>
        </span>
        <button class="card-cta${isDone?' is-done':''}" type="button"
          onclick="loadLesson(${modIdx},${i})"
          aria-label="${esc(titleEn)}">
          <span class="bn">${actionBn}</span><span class="en">${actionEn}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>`;
  }).join('');

  const html = `
  <section>
    <div class="module-hero">
      <div class="module-hero__inner">
        <div class="module-tag">
          <span class="module-tag__dot" aria-hidden="true"></span>
          <span class="bn">মডিউল ${modIdx+1}</span>
          <span class="en">Module ${modIdx+1}</span>
        </div>
        <h1 class="module-hero__title bn">${esc(m.titleBn)}</h1>
        <h1 class="module-hero__title en">${esc(m.titleEn)}</h1>
        <p class="module-hero__desc bn">${esc(m.descBn)}</p>
        <p class="module-hero__desc en">${esc(m.descEn)}</p>
        <div class="module-hero__stats">
          <div class="stat"><div class="stat__num">${m.totalLessons}</div><div class="stat__label bn">মোট পাঠ</div><div class="stat__label en">Lessons</div></div>
          <div class="stat"><div class="stat__num">${m.doneLessons}</div><div class="stat__label bn">সম্পন্ন</div><div class="stat__label en">Done</div></div>
          <div class="stat"><div class="stat__num">${pct}%</div><div class="stat__label bn">অগ্রগতি</div><div class="stat__label en">Progress</div></div>
        </div>
      </div>
      <div class="module-hero__deco" aria-hidden="true">${m.icon}</div>
    </div>
    <div class="module-lessons">
      <h2 class="section-heading">
        <span class="bn">সকল পাঠ</span><span class="en">All Lessons</span>
      </h2>
      <div class="lesson-grid">${cards}</div>
    </div>
  </section>`;
  _renderCache.set(cacheKey, html);
  document.getElementById('contentArea').innerHTML = html;
}

/* ── RENDER: LESSON PAGE ─────────────────────────── */
function renderLessonPage(modIdx, lesIdx) {
  const cacheKey = 'les:' + modIdx + ':' + lesIdx;
  if (_renderCache.has(cacheKey)) {
    document.getElementById('contentArea').innerHTML = _renderCache.get(cacheKey);
    return;
  }
  const m       = MODULES[modIdx];
  const titleBn = LESSONS_BN[modIdx][lesIdx];
  const titleEn = LESSONS_EN[modIdx][lesIdx];
  const mLabelBn = `মডিউল ${modIdx+1}`;
  const mLabelEn = `Module ${modIdx+1}`;
  
  // Get lesson-specific content
  const contentKey = `${modIdx}-${lesIdx}`;
  const lessonContent = LESSON_CONTENT[contentKey];
  
  let subheadingHtml = '';
  if (lessonContent && (lessonContent.subheadingBn || lessonContent.subheadingEn)) {
    subheadingHtml = `
      <p class="lesson-subheading bn">${esc(lessonContent.subheadingBn)}</p>
      <p class="lesson-subheading en">${esc(lessonContent.subheadingEn)}</p>`;
  }

  const lessonBodyContent = subheadingHtml || `
  <div class="lesson-placeholder">
    <div class="lesson-placeholder__icon" aria-hidden="true">${m.icon}</div>
    <h2 class="bn">আসছে শীঘ্রই</h2>
    <h2 class="en">Coming Soon</h2>
    <p class="bn">এই পাঠের কন্টেন্ট শীঘ্রই যুক্ত করা হবে। পরবর্তী পাঠে যেতে নিচের বাটন ব্যবহার করুন।</p>
    <p class="en">Lesson content will be added soon. Use the navigation buttons to proceed.</p>
  </div>`;

  const html = `
  <article>
    <div class="lesson-body">
      <h1 class="lesson-heading bn">${esc(titleBn)}</h1>
      <h1 class="lesson-heading en">${esc(titleEn)}</h1>
      <div class="lesson-meta">
        <span class="bn">${esc(mLabelBn)}</span><span class="en">${esc(mLabelEn)}</span>
        <span class="lesson-meta__dot" aria-hidden="true"></span>
        <span class="bn">পাঠ ${lesIdx+1}</span><span class="en">Lesson ${lesIdx+1}</span>
      </div>
      ${lessonBodyContent}
    </div>
  </article>`;
  
  _renderCache.set(cacheKey, html);
  document.getElementById('contentArea').innerHTML = html;
}

/* ── BOTTOM LABEL ────────────────────────────────── */
function syncBottomLabel() {
  const el = document.getElementById('bottomLabel');
  const isBn = currentLang === 'bn';
  el.textContent = activeLesson === null
    ? (isBn ? `মডিউল ${activeModule+1} — পরিচিতি` : `Module ${activeModule+1} — Overview`)
    : (isBn ? `মডিউল ${activeModule+1} — পাঠ ${activeLesson+1}` : `Module ${activeModule+1} — Lesson ${activeLesson+1}`);
}

/* ── SIDEBAR TOGGLE ──────────────────────────────── */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebarToggle');
  if (isMobile()) {
    const open = sidebar.dataset.mobileOpen === 'true';
    if (open) { closeMobileSidebar(); } else {
      sidebar.dataset.mobileOpen = 'true';
      document.getElementById('sidebarOverlay').classList.add('is-visible');
      toggle.setAttribute('aria-expanded', 'true');
    }
  } else {
    const collapsed = sidebar.dataset.collapsed === 'true';
    sidebar.dataset.collapsed = String(!collapsed);
    toggle.setAttribute('aria-expanded', String(collapsed));
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.dataset.mobileOpen = 'false';
  document.getElementById('sidebarOverlay').classList.remove('is-visible');
  document.getElementById('sidebarToggle').setAttribute('aria-expanded', 'false');
}

/* ── LANGUAGE ────────────────────────────────────── */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
  document.getElementById('btnBn').setAttribute('aria-pressed', String(lang === 'bn'));
  document.getElementById('btnEn').setAttribute('aria-pressed', String(lang === 'en'));
  syncBottomLabel();
}

/* ── THEME ───────────────────────────────────────── */
function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  const btn = document.getElementById('themeBtn');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.setAttribute('aria-label', isDark ? 'Switch to dark mode' : 'Switch to light mode');
}

/* ── KEYBOARD ────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isMobile()) closeMobileSidebar();
});

/* ── INIT ────────────────────────────────────────── */
(function () {
  openModule(0);        // open Module 1 accordion
  loadModule(0);        // load Module 1 overview
  setLang('bn');        // default language
})();
