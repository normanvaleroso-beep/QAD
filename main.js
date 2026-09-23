/* ============================================================
   QAD DepEd Region XII — Site interactions
   Nav · Global search · Filters · Charts · Forms
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const DATA = window.QAD_DATA || {};

  /* ---------- Helpers ---------- */
  function el(tag, attrs, html) {
    const n = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    });
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
  }
  function iconSvg(name, size) {
    const s = size || 20;
    const paths = {
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
      doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
      download: '<path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/>',
      external: '<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
      calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16"/><path d="M9 3v4M15 3v4"/>',
      pin: '<path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
      phone: '<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/>',
      clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
      chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-8"/><path d="M22 20H2"/>',
      shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
      cycle: '<path d="M4 12a8 8 0 0 1 14-5"/><path d="M18 4v4h-4"/><path d="M20 12a8 8 0 0 1-14 5"/><path d="M6 20v-4h4"/>',
      people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 2.5-5 6-5s6 2 6 5"/><path d="M15 14.5c2.5.3 4.5 2 4.5 4.5"/>',
      checklist: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
      school: '<path d="M4 21V10l8-5 8 5v11"/><path d="M9 21v-6h6v6"/>',
      flask: '<path d="M10 3h4"/><path d="M11 3v6L5 19a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 19l-6-10V3"/><path d="M8 15h8"/>',
      alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
      database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
      certificate: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M8 9h8M8 13h5"/><path d="M15 17l2 4 2-1.5L21 21l-1-3"/>',
      clipboard: '<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M9 11h6M9 15h6"/>',
      "search-doc": '<circle cx="10" cy="10" r="6"/><path d="M20 20l-4.5-4.5"/><path d="M8 10h4"/>',
      file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M6 17h13"/>',
      home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
      megaphone: '<path d="M3 11v2a2 2 0 0 0 2 2h2l6 4V5L7 9H5a2 2 0 0 0-2 2z"/><path d="M17 9a4 4 0 0 1 0 6"/>',
      grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>'
    };
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.file}</svg>`;
  }
  window.QAD_ICON = iconSvg;
  window.QAD_FMT_DATE = fmtDate;

  /* ---------- Mobile navigation ---------- */
  const navToggle = $(".nav-toggle");
  const mainNav = $("#main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mainNav.classList.toggle("is-open", !open);
    });
  }

  /* Dropdown toggles (keyboard/touch) */
  $$(".nav-item--drop > .nav-link").forEach(link => {
    link.addEventListener("click", e => {
      const wide = window.matchMedia("(min-width: 1100px)").matches;
      const item = link.parentElement;
      const hasSub = link.getAttribute("aria-haspopup");
      if (hasSub && (!wide || link.getAttribute("data-toggled") === "1")) {
        e.preventDefault();
        const open = item.classList.toggle("is-open");
        link.setAttribute("data-toggled", "1");
        link.setAttribute("aria-expanded", String(open));
        $$(".nav-item--drop.is-open").forEach(o => { if (o !== item) o.classList.remove("is-open"); });
      } else if (hasSub && wide && link.getAttribute("data-toggled") !== "1") {
        link.setAttribute("data-toggled", "1"); // first click on desktop with href goes through
      }
    });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".nav-item--drop")) {
      $$(".nav-item--drop.is-open").forEach(o => o.classList.remove("is-open"));
    }
  });

  /* Active nav highlighting */
  (function markActive() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const hash = location.hash;
    $$(".nav-link[data-page]").forEach(a => {
      const page = a.getAttribute("data-page");
      if (page === path) a.classList.add("is-active");
    });
    if (path === "index.html" || path === "" || path === "/") {
      const home = $('.nav-link[data-page="index.html"]');
      if (home && !hash) home.classList.add("is-active");
    }
  })();

  /* Header shadow on scroll */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Global search modal ---------- */
  const searchModal = $("#search-modal");
  const searchInput = $("#global-search-input");
  const searchResults = $("#global-search-results");

  function buildSearchIndex() {
    const idx = [];
    (DATA.issuances || []).forEach(d => idx.push({ type: "Issuance", title: d.title, desc: `${d.num} · ${d.type} · ${fmtDate(d.date)}`, href: "issuances.html#doc-" + d.id, terms: [d.title, d.num, d.type, d.desc, d.year].join(" ") }));
    (DATA.forms || []).forEach(d => idx.push({ type: "Form", title: d.title, desc: `${d.num} · ${d.cat}`, href: "forms.html#form-" + d.id, terms: [d.title, d.num, d.cat, d.desc].join(" ") }));
    (DATA.resources || []).forEach(d => idx.push({ type: "Resource", title: d.title, desc: `${d.cat} · ${d.type}`, href: "resources.html#res-" + d.id, terms: [d.title, d.cat, d.desc, d.type].join(" ") }));
    (DATA.announcements || []).forEach(d => idx.push({ type: "Announcement", title: d.title, desc: `${d.cat} · ${fmtDate(d.date)}`, href: "announcements.html#ann-" + d.id, terms: [d.title, d.cat, d.desc].join(" ") }));
    (DATA.downloads || []).forEach(d => idx.push({ type: "Download", title: d.title, desc: `${d.cat} · ${d.fmt}`, href: "resources.html#downloads", terms: [d.title, d.cat].join(" ") }));
    (DATA.reports || []).forEach(d => idx.push({ type: "Report", title: d.title, desc: `${d.cat} · ${d.period}`, href: "reports.html", terms: [d.title, d.cat, d.period].join(" ") }));
    (DATA.programs || []).forEach(d => idx.push({ type: "Program", title: d.title, desc: d.desc, href: "programs.html#" + d.id, terms: [d.title, d.desc].join(" ") }));
    (DATA.sdos || []).forEach(d => idx.push({ type: "SDO", title: d.name, desc: d.address, href: "index.html#sdo-directory", terms: [d.name, d.resources].join(" ") }));
    /* Static pages */
    [
      ["About QAD", "Vision, mission, core functions, structure and personnel", "about.html"],
      ["Quality Management System", "One DepEd One QMS, ISO 9001:2015, quality policy and objectives", "qms.html"],
      ["Monitoring & Evaluation", "PIR, KPIs, performance dashboards and data visualization", "monitoring.html"],
      ["Programs & Services", "Twelve core quality assurance programs and services", "programs.html"],
      ["Contact QAD", "Office details, map placeholder and contact form", "contact.html"],
      ["QA Dashboard", "Sample quality assurance indicators for Region XII", "monitoring.html#dashboard"],
      ["Download Center", "Policies, guidelines, forms, templates and tools", "resources.html#downloads"],
      ["Quality Practices in Action", "Success stories from schools and SDOs in Region XII", "resources.html#best-practices"]
    ].forEach(([t, d, h]) => idx.push({ type: "Page", title: t, desc: d, href: h, terms: t + " " + d }));
    return idx;
  }
  const SEARCH_INDEX = buildSearchIndex();

  function renderSearch(q) {
    if (!searchResults) return;
    const query = (q || "").trim().toLowerCase();
    searchResults.innerHTML = "";
    if (query.length < 2) {
      searchResults.innerHTML = `<li class="search-empty">Type at least 2 characters to search issuances, forms, resources, announcements and pages.</li>`;
      return;
    }
    const hits = SEARCH_INDEX.filter(i => i.terms.toLowerCase().includes(query)).slice(0, 12);
    if (!hits.length) {
      searchResults.innerHTML = `<li class="search-empty">No results for “${q.replace(/</g, "&lt;")}”. Try a document number, keyword, or category.</li>`;
      return;
    }
    hits.forEach(h => {
      const li = el("li");
      li.innerHTML = `<a href="${h.href}">
        <span class="sr-type">${h.type}</span>
        <span class="sr-title">${h.title}</span>
        <span class="sr-desc">${h.desc}</span>
      </a>`;
      searchResults.appendChild(li);
    });
  }

  function openSearch(prefill) {
    if (!searchModal) return;
    searchModal.classList.add("is-open");
    searchModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (searchInput) {
      searchInput.value = prefill || "";
      searchInput.focus();
      renderSearch(searchInput.value);
    }
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove("is-open");
    searchModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$("[data-open-search]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openSearch(); }));
  const closeBtn = $("#search-close");
  if (closeBtn) closeBtn.addEventListener("click", closeSearch);
  if (searchModal) searchModal.addEventListener("click", e => { if (e.target === searchModal) closeSearch(); });
  if (searchInput) searchInput.addEventListener("input", () => renderSearch(searchInput.value));
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") closeSearch();
  });

  /* Hero / hub search launchers */
  $$("[data-search-launch]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = $("input", form);
      openSearch(input ? input.value : "");
    });
  });

  /* ---------- Charts (pure SVG, no deps) ---------- */
  const PALETTE = ["#0038a8", "#f0c14b", "#2e6de0", "#1b7a43", "#b8860b", "#00246b", "#5b6b7f", "#d4a017"];

  function drawBarChart(mount, cfg) {
    const w = 640, h = 300, pad = { l: 42, r: 12, t: 18, b: 64 };
    const labels = cfg.labels;
    const ds = cfg.datasets;
    const maxV = Math.max(...ds.flatMap(d => d.values), 10);
    const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
    const groupW = plotW / labels.length;
    const barW = Math.min(22, (groupW - 8) / ds.length);
    let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${cfg.aria || "Bar chart"}">`;
    /* gridlines */
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + plotH - (plotH * i / 4);
      const val = Math.round(maxV * i / 4);
      s += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="#e8edf5" stroke-width="1"/>`;
      s += `<text x="${pad.l - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#7a8798">${val}</text>`;
    }
    labels.forEach((lb, i) => {
      const gx = pad.l + groupW * i + groupW / 2;
      ds.forEach((d, j) => {
        const v = d.values[i];
        const bh = (v / maxV) * plotH;
        const x = gx - (ds.length * barW) / 2 + j * barW;
        const y = pad.t + plotH - bh;
        s += `<rect x="${x}" y="${y}" width="${barW - 2}" height="${Math.max(bh, 1)}" rx="3" fill="${PALETTE[j % PALETTE.length]}"><title>${lb}: ${v}</title></rect>`;
      });
      s += `<text x="${gx}" y="${pad.t + plotH + 16}" text-anchor="middle" font-size="9.5" fill="#5b6b7f">${lb.length > 9 ? lb.slice(0, 8) + "…" : lb}</text>`;
    });
    s += `<line x1="${pad.l}" y1="${pad.t + plotH}" x2="${w - pad.r}" y2="${pad.t + plotH}" stroke="#d9e1ec"/>`;
    s += `</svg>`;
    mount.innerHTML = s + legendHtml(ds.map((d, i) => ({ label: d.label, color: PALETTE[i % PALETTE.length] })));
  }

  function drawLineChart(mount, cfg) {
    const w = 640, h = 280, pad = { l: 40, r: 14, t: 16, b: 40 };
    const labels = cfg.labels, ds = cfg.datasets;
    const maxV = Math.max(...ds.flatMap(d => d.values), 5) * 1.15;
    const plotW = w - pad.l - pad.r, plotH = h - pad.t - pad.b;
    const xAt = i => pad.l + (plotW * i) / (labels.length - 1);
    const yAt = v => pad.t + plotH - (v / maxV) * plotH;
    let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${cfg.aria || "Line chart"}">`;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + plotH - (plotH * i / 4);
      s += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="#e8edf5"/>`;
      s += `<text x="${pad.l - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#7a8798">${Math.round(maxV * i / 4)}</text>`;
    }
    ds.forEach((d, j) => {
      const pts = d.values.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ");
      s += `<polyline points="${pts}" fill="none" stroke="${PALETTE[j % PALETTE.length]}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
      d.values.forEach((v, i) => {
        s += `<circle cx="${xAt(i)}" cy="${yAt(v)}" r="3.6" fill="#fff" stroke="${PALETTE[j % PALETTE.length]}" stroke-width="2"><title>${labels[i]}: ${v}</title></circle>`;
      });
    });
    labels.forEach((lb, i) => {
      s += `<text x="${xAt(i)}" y="${h - 12}" text-anchor="middle" font-size="10" fill="#5b6b7f">${lb}</text>`;
    });
    s += `</svg>`;
    mount.innerHTML = s + legendHtml(ds.map((d, i) => ({ label: d.label, color: PALETTE[i % PALETTE.length] })));
  }

  function drawDonut(mount, cfg) {
    const size = 260, cx = 130, cy = 130, r = 92, sw = 34;
    const total = cfg.values.reduce((a, b) => a + b, 0) || 1;
    let angle = -90;
    let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${cfg.aria || "Donut chart"}">`;
    cfg.values.forEach((v, i) => {
      const frac = v / total;
      const a2 = angle + frac * 360;
      const large = frac > 0.5 ? 1 : 0;
      const rad1 = angle * Math.PI / 180, rad2 = a2 * Math.PI / 180;
      const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
      const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
      if (frac >= 0.999) {
        s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PALETTE[i % PALETTE.length]}" stroke-width="${sw}"/>`;
      } else {
        s += `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}" fill="none" stroke="${PALETTE[i % PALETTE.length]}" stroke-width="${sw}"><title>${cfg.labels[i]}: ${v} (${Math.round(frac * 100)}%)</title></path>`;
      }
      angle = a2;
    });
    s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="#00246b">${total}</text>`;
    s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="10" fill="#7a8798">TOTAL ACTIVITIES</text>`;
    s += `</svg>`;
    mount.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:center;">` +
      s +
      `<ul style="list-style:none;margin:0;padding:0;font-size:.82rem;color:#334155;">` +
      cfg.labels.map((l, i) => `<li style="display:flex;align-items:center;gap:.5rem;margin:.3rem 0;"><i style="width:12px;height:12px;border-radius:3px;background:${PALETTE[i % PALETTE.length]};display:inline-block;"></i>${l} <strong style="margin-left:auto;color:#00246b;">${cfg.values[i]}</strong></li>`).join("") +
      `</ul></div>`;
  }

  function legendHtml(items) {
    return `<div class="chart-legend">` + items.map(i => `<span><i style="background:${i.color}"></i>${i.label}</span>`).join("") + `</div>`;
  }

  function drawProgressList(mount, items, gold) {
    mount.innerHTML = `<ul class="progress-list">` + items.map((it, i) => `
      <li>
        <div class="progress-row"><span>${it.name}</span><span>${it.value}%</span></div>
        <div class="progress-track" role="progressbar" aria-valuenow="${it.value}" aria-valuemin="0" aria-valuemax="100" aria-label="${it.name}">
          <div class="progress-fill ${gold && i % 2 ? "gold" : ""}" style="width:${it.value}%"></div>
        </div>
      </li>`).join("") + `</ul>`;
  }

  /* Render dashboard if present */
  (function renderDashboard() {
    const dash = DATA.dashboard;
    if (!dash) return;

    const kpiMount = $("#kpi-grid");
    if (kpiMount) {
      kpiMount.innerHTML = dash.kpis.map(k => `
        <div class="kpi">
          <span class="kpi__label">${k.label}</span>
          <span class="kpi__value">${k.value}${k.suffix}</span>
          <span class="kpi__delta">${k.delta}</span>
        </div>`).join("");
    }

    const bar = $("#chart-bar");
    if (bar) drawBarChart(bar, { labels: dash.regionalCompare.labels, datasets: dash.regionalCompare.datasets, aria: "Regional versus SDO comparison bar chart, sample data" });

    const line = $("#chart-line");
    if (line) drawLineChart(line, { labels: dash.trend.labels, datasets: dash.trend.datasets, aria: "Monthly QA activities line chart, sample data" });

    const donut = $("#chart-donut");
    if (donut) drawDonut(donut, { labels: dash.donut.labels, values: dash.donut.values, aria: "QA activity distribution donut chart, sample data" });

    const prog = $("#chart-progress-sdo");
    if (prog) drawProgressList(prog, dash.sdoProgress);

    const tgt = $("#chart-progress-target");
    if (tgt) drawProgressList(prog && tgt ? tgt : tgt, dash.targets, true);

    const updated = $("#dash-updated");
    if (updated) updated.textContent = fmtDate(dash.updated);

    const heroStats = $("#hero-stats");
    if (heroStats) {
      heroStats.innerHTML = dash.kpis.slice(0, 4).map(k =>
        `<div class="hero__stat"><strong>${k.value}${k.suffix}</strong><span>${k.label}</span></div>`).join("");
    }
  })();

  /* ---------- Issuances page ---------- */
  (function issuancesPage() {
    const root = $("#issuances-app");
    if (!root) return;
    const q = $("#iss-q"), yr = $("#iss-year"), ty = $("#iss-type"), count = $("#iss-count"), tbody = $("#iss-body");
    let docs = QAD_STORE.get("issuances", DATA.issuances || []);

    /* year options */
    const years = [...new Set(docs.map(d => d.year))].sort().reverse();
    years.forEach(y => yr.appendChild(el("option", { value: y, text: y })));
    (DATA.issuanceTypes || []).forEach(t => ty.appendChild(el("option", { value: t, text: t })));

    function render() {
      const query = (q.value || "").toLowerCase().trim();
      const y = yr.value, t = ty.value;
      const rows = docs.filter(d =>
        (!query || (d.title + " " + d.num + " " + d.desc + " " + d.type).toLowerCase().includes(query)) &&
        (!y || d.year === y) &&
        (!t || d.type === t)
      );
      count.textContent = `${rows.length} document${rows.length === 1 ? "" : "s"} found`;
      if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="1"><div class="empty-state">No documents match your filters. Try clearing the search field or filters.</div></td></tr>`;
        return;
      }
      tbody.innerHTML = rows.map(d => {
        const hasPdf = !!d.pdf;
        const chip = hasPdf
          ? '<span class="chip chip--green">Official</span>'
          : '<span class="chip chip--sample">Sample</span>';
        const viewAttr = hasPdf
          ? `href="${d.pdf}" target="_blank" rel="noopener noreferrer"`
          : `href="#" data-demo-download="${d.title}"`;
        const dlAttr = hasPdf
          ? `href="${d.pdf}" download data-demo-pdf="${d.title}"`
          : `href="#" data-demo-download="${d.title}"`;
        return `
        <tr id="doc-${d.id}">
          <td>
            <div class="doc-title">${d.title}</div>
            <div class="text-muted" style="font-size:.84rem;">${d.desc}</div>
            <div class="card__meta" style="margin:.5rem 0 0;"><span class="chip chip--blue">${d.type}</span>${chip}</div>
          </td>
          <td class="doc-num">${d.num}</td>
          <td>${fmtDate(d.date)}</td>
          <td>
            <div class="btn-row">
              <a class="btn btn--sm btn--outline" ${viewAttr} aria-label="View ${d.title}">${iconSvg("search-doc", 15)} View</a>
              <a class="btn btn--sm btn--primary" ${dlAttr} aria-label="Download PDF of ${d.title}">${iconSvg("download", 15)} PDF</a>
            </div>
          </td>
        </tr>`;
      }).join("");
    }
    /* deep links: issuances.html?type=DepEd%20Orders or ?year=2026 */
    const params = new URLSearchParams(location.search);
    if (params.get("type")) ty.value = params.get("type");
    if (params.get("year")) yr.value = params.get("year");
    if (params.get("q")) q.value = params.get("q");

    [q, yr, ty].forEach(c => c.addEventListener("input", render));
    render();
  })();

  /* ---------- Forms page ---------- */
  (function formsPage() {
    const root = $("#forms-app");
    if (!root) return;
    const q = $("#form-q"), cat = $("#form-cat"), count = $("#form-count"), list = $("#form-list");
    let forms = QAD_STORE.get("forms", DATA.forms || []);
    (DATA.formCategories || []).forEach(c => cat.appendChild(el("option", { value: c, text: c })));

    function render() {
      const query = (q.value || "").toLowerCase().trim();
      const c = cat.value;
      const rows = forms.filter(f =>
        (!query || (f.title + " " + f.num + " " + f.desc + " " + f.cat).toLowerCase().includes(query)) &&
        (!c || f.cat === c)
      );
      count.textContent = `${rows.length} form${rows.length === 1 ? "" : "s"} found`;
      if (!rows.length) { list.innerHTML = `<div class="empty-state">No forms match your search.</div>`; return; }
      list.innerHTML = rows.map(f => {
        const official = f.sample === false;
        const chip = f.pdf
          ? '<span class="chip chip--green">Official</span>'
          : official
            ? '<span class="chip chip--green">Official · request file</span>'
            : '<span class="chip chip--sample">Sample</span>';
        const viewAttr = f.pdf
          ? `href="${f.pdf}" target="_blank" rel="noopener noreferrer"`
          : `href="#" data-demo-download="${f.title}"`;
        const dlAttr = f.pdf
          ? `href="${f.pdf}" download data-demo-pdf="${f.title}"`
          : `href="#" data-demo-download="${f.title}"`;
        return `
        <div class="download-row" id="form-${f.id}">
          <div class="download-row__info">
            <strong>${f.title}</strong>
            <span>${f.num} · ${f.cat} · Updated ${fmtDate(f.updated)} ${chip}</span>
          </div>
          <div class="download-row__actions">
            <a class="btn btn--sm btn--outline" ${viewAttr}>${iconSvg("search-doc", 15)} View Document</a>
            <a class="btn btn--sm btn--primary" ${dlAttr}>${iconSvg("download", 15)} Download</a>
          </div>
        </div>`;
      }).join("");
    }
    /* deep links: forms.html?cat=QMS%20Templates or ?q=checklist */
    const params = new URLSearchParams(location.search);
    if (params.get("cat")) cat.value = params.get("cat");
    if (params.get("q")) q.value = params.get("q");

    [q, cat].forEach(c => c.addEventListener("input", render));
    render();
  })();

  /* ---------- Announcements page + home feed ---------- */
  (function annPage() {
    const grid = $("#ann-grid");
    const feed = $("#ann-feed");
    let anns = QAD_STORE.get("announcements", DATA.announcements || []);

    /* Home page mini-feed (runs even when full grid is absent) */
    if (feed) {
      const rows = [...anns].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 3);
      feed.innerHTML = rows.map(a => `
        <article class="news-card">
          <div class="news-card__accent"></div>
          <div class="news-card__body">
            <div class="news-card__date">${fmtDate(a.date)} <span class="chip chip--blue">${a.cat}</span></div>
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <div class="news-card__foot"><span class="chip chip--sample">Sample</span>
            <a class="btn btn--sm btn--outline" href="announcements.html">Read More</a></div>
          </div>
        </article>`).join("");
    }

    if (!grid) return;
    const tabs = $$("[data-ann-tab]");
    let active = "all";

    function render() {
      const rows = anns
        .filter(a => active === "all" || a.cat === active)
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      if (!rows.length) { grid.innerHTML = `<div class="empty-state">No announcements in this category yet.</div>`; return; }
      grid.innerHTML = rows.map(a => `
        <article class="news-card" id="ann-${a.id}">
          <div class="news-card__accent"></div>
          <div class="news-card__body">
            <div class="news-card__date">${iconSvg("calendar", 14)} ${fmtDate(a.date)} <span class="chip chip--blue">${a.cat}</span>${a.featured ? '<span class="chip chip--sample">Featured</span>' : ""}</div>
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <div class="news-card__foot">
              <span class="chip chip--sample">Sample entry</span>
              <a class="btn btn--sm btn--outline" href="#" data-demo-more>Read More ${iconSvg("external", 14)}</a>
            </div>
          </div>
        </article>`).join("");
    }
    tabs.forEach(t => t.addEventListener("click", () => {
      tabs.forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
      t.classList.add("is-active"); t.setAttribute("aria-selected", "true");
      active = t.getAttribute("data-ann-tab");
      render();
    }));
    render();
  })();

  /* ---------- Resources page (knowledge hub) ---------- */
  (function resourcesPage() {
    const list = $("#res-list");
    if (!list) return;
    const q = $("#res-q"), cat = $("#res-cat"), count = $("#res-count");
    (DATA.resourceCats || []).forEach(c => cat.appendChild(el("option", { value: c, text: c })));
    function render() {
      const query = (q.value || "").toLowerCase().trim();
      const c = cat.value;
      const rows = (DATA.resources || []).filter(r =>
        (!query || (r.title + " " + r.desc + " " + r.cat + " " + r.type).toLowerCase().includes(query)) &&
        (!c || r.cat === c)
      );
      count.textContent = `${rows.length} resource${rows.length === 1 ? "" : "s"} found`;
      if (!rows.length) { list.innerHTML = `<div class="empty-state">No resources match your search.</div>`; return; }
      list.innerHTML = rows.map(r => {
        const official = r.sample === false;
        const chip = r.pdf
          ? '<span class="chip chip--green">Official</span>'
          : official
            ? '<span class="chip chip--green">Official</span>'
            : '<span class="chip chip--sample">Sample</span>';
        const viewAttr = r.pdf
          ? `href="${r.pdf}" target="_blank" rel="noopener noreferrer"`
          : `href="#" data-demo-download="${r.title}"`;
        const dlAttr = r.pdf
          ? `href="${r.pdf}" download data-demo-pdf="${r.title}"`
          : `href="#" data-demo-download="${r.title}"`;
        return `
        <div class="resource-item" id="res-${r.id}">
          <div class="resource-item__icon">${iconSvg(r.type === "Video" ? "megaphone" : "book", 20)}</div>
          <div style="flex:1;min-width:0;">
            <div class="card__meta"><span class="chip chip--blue">${r.cat}</span><span class="chip chip--placeholder">${r.type}</span>${chip}</div>
            <h4>${r.title}</h4>
            <p>${r.desc} · Updated ${fmtDate(r.updated)}</p>
            <div class="btn-row">
              <a class="btn btn--sm btn--outline" ${viewAttr}>${iconSvg("search-doc", 14)} View</a>
              <a class="btn btn--sm btn--primary" ${dlAttr}>${iconSvg("download", 14)} Download</a>
            </div>
          </div>
        </div>`;
      }).join("");
    }
    [q, cat].forEach(c => c.addEventListener("input", render));
    render();

    /* Download center */
    const dl = $("#dl-list");
    if (dl) {
      const dq = $("#dl-q"), dc = $("#dl-cat"), dcount = $("#dl-count");
      (DATA.downloadCats || []).forEach(c => dc.appendChild(el("option", { value: c, text: c })));
      function renderDl() {
        const query = (dq.value || "").toLowerCase().trim();
        const c = dc.value;
        const rows = (DATA.downloads || []).filter(d =>
          (!query || (d.title + " " + d.cat).toLowerCase().includes(query)) &&
          (!c || d.cat === c)
        );
        dcount.textContent = `${rows.length} file${rows.length === 1 ? "" : "s"} found`;
        dl.innerHTML = rows.length ? rows.map(d => {
          const official = d.sample === false;
          const chip = d.pdf
            ? '<span class="chip chip--green">Official</span>'
            : official
              ? '<span class="chip chip--green">Official</span>'
              : '<span class="chip chip--sample">Sample</span>';
          const viewAttr = d.pdf
            ? `href="${d.pdf}" target="_blank" rel="noopener noreferrer"`
            : `href="#" data-demo-download="${d.title}"`;
          const dlAttr = d.pdf
            ? `href="${d.pdf}" download data-demo-pdf="${d.title}"`
            : `href="#" data-demo-download="${d.title}"`;
          return `
          <div class="download-row">
            <div class="download-row__info">
              <strong>${d.title}</strong>
              <span>${d.cat} · ${d.fmt} · Updated ${fmtDate(d.updated)} ${chip}</span>
            </div>
            <div class="download-row__actions">
              <a class="btn btn--sm btn--outline" ${viewAttr}>${iconSvg("search-doc", 15)} View</a>
              <a class="btn btn--sm btn--primary" ${dlAttr}>${iconSvg("download", 15)} Download</a>
            </div>
          </div>`;
        }).join("") : `<div class="empty-state">No files match your search.</div>`;
      }
      [dq, dc].forEach(c => c.addEventListener("input", renderDl));
      renderDl();
    }
  })();

  /* ---------- Reports page ---------- */
  (function reportsPage() {
    const list = $("#rep-list");
    if (!list) return;
    const q = $("#rep-q"), cat = $("#rep-cat"), count = $("#rep-count");
    (DATA.reportCats || []).forEach(c => cat.appendChild(el("option", { value: c, text: c })));
    function render() {
      const query = (q.value || "").toLowerCase().trim();
      const c = cat.value;
      const rows = (DATA.reports || []).filter(r =>
        (!query || (r.title + " " + r.cat + " " + r.period).toLowerCase().includes(query)) &&
        (!c || r.cat === c)
      );
      count.textContent = `${rows.length} report${rows.length === 1 ? "" : "s"} found`;
      list.innerHTML = rows.length ? rows.map(r => `
        <div class="download-row">
          <div class="download-row__info">
            <strong>${r.title}</strong>
            <span>${r.cat} · ${r.period} · Updated ${fmtDate(r.updated)} <span class="chip chip--sample">Sample</span></span>
          </div>
          <div class="download-row__actions">
            <a class="btn btn--sm btn--outline" href="#" data-demo-download="${r.title}">${iconSvg("search-doc", 15)} View</a>
            <a class="btn btn--sm btn--primary" href="#" data-demo-download="${r.title}">${iconSvg("download", 15)} Download PDF</a>
          </div>
        </div>`).join("") : `<div class="empty-state">No reports match your search.</div>`;
    }
    [q, cat].forEach(c => c.addEventListener("input", render));
    render();
  })();

  /* ---------- SDO directory filter ---------- */
  (function sdoDir() {
    const grid = $("#sdo-grid");
    if (!grid) return;
    const q = $("#sdo-q");
    function render() {
      const query = (q ? q.value : "").toLowerCase().trim();
      const rows = (DATA.sdos || []).filter(s => !query || (s.name + " " + s.resources).toLowerCase().includes(query));
      grid.innerHTML = rows.length ? rows.map(s => `
        <article class="sdo-card">
          <h3>${s.name.replace("Schools Division Office — ", "")}</h3>
          <div class="sdo-card__sub">Schools Division Office</div>
          <dl>
            <dt>Address</dt><dd>${s.address} <span class="chip chip--placeholder">Placeholder</span></dd>
            <dt>Contact</dt><dd>${s.phone} · ${s.email}</dd>
            <dt>Website / Social</dt><dd>${s.site}</dd>
            <dt>QA Focal Person</dt><dd>${s.focal}</dd>
            <dt>Available QA Resources</dt><dd>${s.resources}</dd>
          </dl>
          <div class="sdo-card__actions">
            <a class="btn btn--sm btn--outline" href="contact.html">Contact</a>
            <a class="btn btn--sm btn--primary" href="resources.html">QA Resources</a>
          </div>
        </article>`).join("") : `<div class="empty-state">No SDO matches your search.</div>`;
    }
    if (q) q.addEventListener("input", render);
    render();
  })();

  /* ---------- Programs page cards ---------- */
  (function programsPage() {
    const grid = $("#programs-grid");
    if (!grid) return;
    const tabs = $$("[data-prog-tab]");
    let active = "all";
    let progs = DATA.programs || [];
    function render() {
      const rows = progs.filter(p => active === "all" || p.cat === active);
      grid.innerHTML = rows.map(p => `
        <article class="card" id="${p.id}">
          <div class="card__icon">${iconSvg(p.icon, 24)}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <a class="btn btn--sm btn--outline" href="contact.html?subject=${encodeURIComponent(p.title)}">Learn More ${iconSvg("external", 14)}</a>
        </article>`).join("");
    }
    tabs.forEach(t => t.addEventListener("click", () => {
      tabs.forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
      t.classList.add("is-active"); t.setAttribute("aria-selected", "true");
      active = t.getAttribute("data-prog-tab");
      render();
    }));
    render();
  })();

  /* Home programs preview */
  (function homePrograms() {
    const grid = $("#programs-preview");
    if (!grid) return;
    grid.innerHTML = (DATA.programs || []).slice(0, 6).map(p => `
      <article class="card" id="prev-${p.id}">
        <div class="card__icon">${iconSvg(p.icon, 24)}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a class="btn btn--sm btn--outline" href="programs.html#${p.id}">Learn More ${iconSvg("external", 14)}</a>
      </article>`).join("");
  })();

  /* ---------- Contact form ---------- */
  (function contactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("#contact-status");
    /* prefill subject from query */
    const params = new URLSearchParams(location.search);
    if (params.get("subject")) {
      const subj = form.querySelector('[name="subject"]');
      if (subj) subj.value = params.get("subject");
    }
    form.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(form);
      const required = ["name", "email", "message"];
      let ok = true;
      required.forEach(k => {
        const v = (fd.get(k) || "").toString().trim();
        const field = form.querySelector(`[name="${k}"]`);
        if (!v) { ok = false; field.setAttribute("aria-invalid", "true"); field.style.borderColor = "#b32424"; }
        else { field.removeAttribute("aria-invalid"); field.style.borderColor = ""; }
      });
      const email = (fd.get("email") || "").toString();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ok = false;
        form.querySelector('[name="email"]').style.borderColor = "#b32424";
      }
      if (!ok) {
        status.className = "form-status is-error";
        status.textContent = "Please complete the required fields (Name, valid Email, Message).";
        status.focus();
        return;
      }
      status.className = "form-status is-success";
      status.textContent = "Thank you. Your message has been recorded in this demo. In the production site it will be sent to the QAD office (email endpoint to be configured).";
      status.focus();
      form.reset();
    });
  })();

  /* ---------- Demo download / read-more notices ---------- */
  document.addEventListener("click", e => {
    /* Real PDFs: let the native href/download proceed untouched */
    const realPdf = e.target.closest("[data-demo-pdf]");
    if (realPdf) return;
    const dl = e.target.closest("[data-demo-download]");
    if (dl) {
      e.preventDefault();
      alert("Demo notice:\n\n“" + dl.getAttribute("data-demo-download") + "”\n\nThis is a sample record. Connect the real PDF file (or CMS upload) to enable downloads.");
    }
    const more = e.target.closest("[data-demo-more]");
    if (more) {
      e.preventDefault();
      alert("Demo notice: Full announcement text will be shown here once published from the Admin Dashboard.");
    }
  });

  /* ---------- Current year ---------- */
  $$("[data-year]").forEach(n => { n.textContent = String(new Date().getFullYear()); });
})();
