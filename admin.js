/* ============================================================
   QAD Admin Dashboard — demo CMS (localStorage-backed)
   Production: replace with authenticated API + database.
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const DATA = window.QAD_DATA || {};
  const STORE = window.QAD_STORE || { get: (k, f) => f, set: () => {} };

  const ACCOUNTS = {
    admin:  { pass: "admin123",  role: "Admin" },
    editor: { pass: "editor123", role: "Editor" },
    viewer: { pass: "viewer123", role: "Viewer" }
  };

  const loginView = $("#login-view");
  const appView = $("#app-view");
  let session = null;

  try { session = JSON.parse(sessionStorage.getItem("qad_admin_session")); } catch {}

  function showApp() {
    loginView.classList.remove("is-login");
    appView.classList.add("is-active");
    $("#who-user").textContent = session.user;
    const pill = $("#who-role");
    pill.textContent = session.role;
    pill.className = "role-pill " + session.role.toLowerCase();
    applyRole();
    renderAll();
  }
  function showLogin() {
    appView.classList.remove("is-active");
    loginView.classList.add("is-login");
  }

  function applyRole() {
    const editable = session.role === "Admin" || session.role === "Editor";
    const adminOnly = session.role === "Admin";
    /* disable edit buttons for viewer */
    document.body.dataset.role = session.role;
    $$("[data-role-req]").forEach(n => {
      const need = n.getAttribute("data-role-req");
      if (need === "edit" && !editable) n.disabled = true;
      if (need === "admin" && !adminOnly) n.disabled = true;
    });
  }
  function canEdit() { return session && (session.role === "Admin" || session.role === "Editor"); }

  /* ---------- Login ---------- */
  const loginForm = $("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const u = $("#login-user").value.trim().toLowerCase();
      const p = $("#login-pass").value;
      const st = $("#login-status");
      const acc = ACCOUNTS[u];
      if (!acc || acc.pass !== p) {
        st.className = "form-status is-error";
        st.textContent = "Invalid username or password. Use the demo credentials shown above.";
        st.focus();
        return;
      }
      session = { user: u, role: acc.role };
      sessionStorage.setItem("qad_admin_session", JSON.stringify(session));
      st.className = "form-status";
      st.textContent = "";
      showApp();
    });
  }
  function logout() {
    sessionStorage.removeItem("qad_admin_session");
    session = null;
    showLogin();
  }
  const lo = $("#logout-btn"); if (lo) lo.addEventListener("click", logout);
  const lo2 = $("#logout-btn-2"); if (lo2) lo2.addEventListener("click", logout);

  /* ---------- Navigation ---------- */
  const titles = {
    overview: "Overview", announcements: "Announcements", issuances: "Issuances",
    forms: "Forms & Templates", statistics: "Dashboard Statistics",
    sdos: "SDO Directory", personnel: "Personnel", users: "Users & Roles"
  };
  function goPanel(name) {
    $$(".admin-panel").forEach(p => p.classList.remove("is-active"));
    const panel = $("#panel-" + name);
    if (panel) panel.classList.add("is-active");
    $$(".admin-nav button").forEach(b => b.classList.toggle("is-active", b.dataset.panel === name));
    $("#panel-title").textContent = titles[name] || name;
    if (window.matchMedia("(max-width: 899px)").matches) {
      $(".admin-side").style.display = "none";
    }
  }
  $$(".admin-nav button").forEach(b => b.addEventListener("click", () => goPanel(b.dataset.panel)));
  $$("[data-quick]").forEach(b => b.addEventListener("click", () => goPanel(b.dataset.quick)));
  const ant = $("#admin-nav-toggle");
  if (ant) ant.addEventListener("click", () => {
    const side = $(".admin-side");
    side.style.display = side.style.display === "flex" ? "none" : "flex";
    if (side.style.display === "flex") { side.style.position = "fixed"; side.style.zIndex = 50; side.style.height = "100vh"; }
  });

  /* ---------- Collections ---------- */
  const collections = {
    announcements: () => STORE.get("announcements", DATA.announcements || []),
    issuances: () => STORE.get("issuances", DATA.issuances || []),
    forms: () => STORE.get("forms", DATA.forms || []),
    kpis: () => STORE.get("kpis", (DATA.dashboard && DATA.dashboard.kpis) || []),
    sdos: () => STORE.get("sdos", DATA.sdos || []),
    personnel: () => STORE.get("personnel", [
      { id: 1, name: "[Full Name]", role: "Chief, Quality Assurance Division", unit: "QAD", email: "[Email]" },
      { id: 2, name: "[Full Name]", role: "QMS / Internal Audit Focal", unit: "QMS Unit", email: "[Email]" },
      { id: 3, name: "[Full Name]", role: "Monitoring & Evaluation Focal", unit: "M&E Unit", email: "[Email]" }
    ])
  };
  const nextId = arr => (arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const fmt = iso => { if (!iso) return "—"; const d = new Date(iso + "T00:00:00"); return isNaN(d) ? iso : d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" }); };

  function guard() { if (!canEdit()) { alert("Your role (" + session.role + ") has read-only access. Sign in as admin or editor to modify content."); return false; } return true; }

  /* ---------- Announcements ---------- */
  function renderAnn() {
    const rows = collections.announcements();
    $("#badge-ann").textContent = rows.length;
    $("#ov-ann").textContent = rows.length;
    $("#ann-table").innerHTML = rows.map(a => `
      <tr>
        <td>${fmt(a.date)}</td>
        <td>${esc(a.title)}</td>
        <td>${esc(a.cat)}</td>
        <td>
          <div class="btn-row">
            <button class="btn btn--sm btn--outline" data-ann-edit="${a.id}">Edit</button>
            <button class="btn btn--sm btn--danger" data-ann-del="${a.id}">Delete</button>
          </div>
        </td>
      </tr>`).join("") || `<tr><td colspan="4">No announcements yet.</td></tr>`;
  }
  const annForm = $("#ann-form");
  if (annForm) {
    annForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!guard()) return;
      const fd = new FormData(annForm);
      let rows = collections.announcements();
      const id = fd.get("id") ? Number(fd.get("id")) : nextId(rows);
      const rec = { id, date: fd.get("date"), cat: fd.get("cat"), title: fd.get("title"), desc: fd.get("desc"), featured: false };
      const idx = rows.findIndex(r => r.id === id);
      if (idx >= 0) rows[idx] = { ...rows[idx], ...rec }; else rows.unshift(rec);
      STORE.set("announcements", rows);
      annForm.reset();
      renderAnn();
      alert("Announcement saved (demo storage).");
    });
    document.addEventListener("click", e => {
      const ed = e.target.closest("[data-ann-edit]");
      if (ed) {
        const a = collections.announcements().find(x => x.id === Number(ed.dataset.annEdit));
        if (!a) return;
        annForm.querySelector('[name="id"]').value = a.id;
        annForm.querySelector('[name="date"]').value = a.date;
        annForm.querySelector('[name="cat"]').value = a.cat;
        annForm.querySelector('[name="title"]').value = a.title;
        annForm.querySelector('[name="desc"]').value = a.desc;
        goPanel("announcements");
        annForm.querySelector('[name="title"]').focus();
      }
      const dl = e.target.closest("[data-ann-del]");
      if (dl) {
        if (!guard()) return;
        if (!confirm("Delete this announcement?")) return;
        STORE.set("announcements", collections.announcements().filter(x => x.id !== Number(dl.dataset.annDel)));
        renderAnn();
      }
    });
  }

  /* ---------- Issuances ---------- */
  function renderIss() {
    const rows = collections.issuances();
    $("#badge-iss").textContent = rows.length;
    $("#ov-iss").textContent = rows.length;
    $("#iss-table").innerHTML = rows.map(d => `
      <tr>
        <td>${esc(d.num)}</td>
        <td>${esc(d.title)}</td>
        <td>${esc(d.type)}</td>
        <td>${fmt(d.date)}</td>
        <td><div class="btn-row"><button class="btn btn--sm btn--danger" data-iss-del="${d.id}">Delete</button></div></td>
      </tr>`).join("") || `<tr><td colspan="5">No issuances yet.</td></tr>`;
  }
  const issForm = $("#iss-form");
  if (issForm) {
    issForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!guard()) return;
      const fd = new FormData(issForm);
      const rows = collections.issuances();
      const date = fd.get("date");
      rows.unshift({
        id: nextId(rows), type: fd.get("type"), num: fd.get("num"), title: fd.get("title"),
        date, year: (date || "").slice(0, 4), desc: fd.get("desc") || "Added via Admin Dashboard.",
        file: (fd.get("file") && fd.get("file").name) || null
      });
      STORE.set("issuances", rows);
      issForm.reset();
      renderIss();
      alert("Issuance saved" + (rows[0].file ? " (file name recorded: " + rows[0].file + "). In production the PDF is uploaded to the server." : " (demo storage)."));
    });
    document.addEventListener("click", e => {
      const d = e.target.closest("[data-iss-del]");
      if (d) {
        if (!guard()) return;
        if (!confirm("Delete this issuance?")) return;
        STORE.set("issuances", collections.issuances().filter(x => x.id !== Number(d.dataset.issDel)));
        renderIss();
      }
    });
  }

  /* ---------- Forms ---------- */
  function renderFrm() {
    const rows = collections.forms();
    $("#badge-form").textContent = rows.length;
    $("#ov-form").textContent = rows.length;
    $("#frm-table").innerHTML = rows.map(f => `
      <tr>
        <td>${esc(f.num)}</td>
        <td>${esc(f.title)}</td>
        <td>${esc(f.cat)}</td>
        <td>${fmt(f.updated)}</td>
        <td><div class="btn-row"><button class="btn btn--sm btn--danger" data-frm-del="${f.id}">Delete</button></div></td>
      </tr>`).join("") || `<tr><td colspan="5">No forms yet.</td></tr>`;
  }
  const frmForm = $("#frm-form");
  if (frmForm) {
    frmForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!guard()) return;
      const fd = new FormData(frmForm);
      const rows = collections.forms();
      rows.unshift({
        id: nextId(rows), cat: fd.get("cat"), num: fd.get("num"), title: fd.get("title"),
        updated: fd.get("updated"), desc: fd.get("desc") || "Added via Admin Dashboard.",
        file: (fd.get("file") && fd.get("file").name) || null
      });
      STORE.set("forms", rows);
      frmForm.reset();
      renderFrm();
      alert("Form saved (demo storage).");
    });
    document.addEventListener("click", e => {
      const d = e.target.closest("[data-frm-del]");
      if (d) {
        if (!guard()) return;
        if (!confirm("Delete this form?")) return;
        STORE.set("forms", collections.forms().filter(x => x.id !== Number(d.dataset.frmDel)));
        renderFrm();
      }
    });
  }

  /* ---------- Statistics ---------- */
  function renderKpis() {
    const form = $("#kpi-form");
    if (!form) return;
    const kpis = collections.kpis();
    form.innerHTML = kpis.map((k, i) => `
      <div class="field"><label for="kpi-${i}">${esc(k.label)}</label>
        <input id="kpi-${i}" name="kpi-${i}" type="number" min="0" value="${k.value}" data-kpi-index="${i}"></div>`).join("");
    form.onsubmit = e => {
      e.preventDefault();
      if (!guard()) return;
      const rows = collections.kpis();
      $$("[data-kpi-index]", form).forEach(inp => {
        rows[Number(inp.dataset.kpiIndex)].value = Number(inp.value);
      });
      STORE.set("kpis", rows);
      /* also patch live QAD_DATA shape for same-session views */
      if (DATA.dashboard) DATA.dashboard.kpis = rows;
      alert("Statistics saved (demo storage). Refresh the website pages to see updated KPI values.");
    };
  }

  /* ---------- SDOs ---------- */
  function renderSdos() {
    const rows = collections.sdos();
    $("#ov-sdo").textContent = rows.length;
    $("#sdo-table").innerHTML = rows.map(s => `
      <tr>
        <td>${esc(s.name.replace("Schools Division Office — ", ""))}</td>
        <td>${esc(s.address)}</td>
        <td>${esc(s.focal)}</td>
        <td><div class="btn-row"><button class="btn btn--sm btn--outline" data-sdo-edit="${s.id}">Edit</button></div></td>
      </tr>`).join("");
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-sdo-edit]");
    if (!b) return;
    if (!guard()) return;
    const rows = collections.sdos();
    const s = rows.find(x => x.id === b.dataset.sdoEdit);
    if (!s) return;
    const addr = prompt("Address for " + s.name + ":", s.address);
    if (addr === null) return;
    const focal = prompt("QA Focal Person:", s.focal);
    if (focal === null) return;
    const phone = prompt("Telephone:", s.phone);
    if (phone === null) return;
    const email = prompt("Email:", s.email);
    if (email === null) return;
    Object.assign(s, { address: addr, focal, phone, email });
    STORE.set("sdos", rows);
    renderSdos();
  });

  /* ---------- Personnel ---------- */
  function renderPer() {
    const rows = collections.personnel();
    $("#per-table").innerHTML = rows.map(p => `
      <tr>
        <td>${esc(p.name)}</td>
        <td>${esc(p.role)}</td>
        <td>${esc(p.unit)}</td>
        <td>${esc(p.email)}</td>
        <td><div class="btn-row"><button class="btn btn--sm btn--danger" data-per-del="${p.id}">Delete</button></div></td>
      </tr>`).join("") || `<tr><td colspan="5">No personnel records.</td></tr>`;
  }
  const perForm = $("#per-form");
  if (perForm) {
    perForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!guard()) return;
      const fd = new FormData(perForm);
      const rows = collections.personnel();
      rows.push({ id: nextId(rows), name: fd.get("name"), role: fd.get("role"), email: fd.get("email") || "—", unit: fd.get("unit") || "—" });
      STORE.set("personnel", rows);
      perForm.reset();
      renderPer();
    });
    document.addEventListener("click", e => {
      const d = e.target.closest("[data-per-del]");
      if (d) {
        if (!guard()) return;
        if (!confirm("Delete personnel record?")) return;
        STORE.set("personnel", collections.personnel().filter(x => x.id !== Number(d.dataset.perDel)));
        renderPer();
      }
    });
  }

  /* ---------- Overview badges / reset ---------- */
  function renderAll() {
    renderAnn(); renderIss(); renderFrm(); renderKpis(); renderSdos(); renderPer();
  }

  /* Boot */
  if (session && ACCOUNTS[session.user]) showApp();
  else showLogin();
})();
