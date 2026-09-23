/* ============================================================
   QAD DepEd Region XII — Central data store
   ALL records below are SAMPLE / PLACEHOLDER data.
   Replace via the Admin Dashboard or by editing this file.
   ============================================================ */
window.QAD_DATA = {

  notice: "All statistics and records shown are SAMPLE DATA for layout demonstration only.",

  /* ---------- Dashboard KPIs (replaceable) ---------- */
  dashboard: {
    updated: "2026-01-15",
    kpis: [
      { label: "Total SDOs", value: 8, suffix: "", delta: "Region-wide" },
      { label: "Programs Monitored", value: 24, suffix: "", delta: "Sample value" },
      { label: "Monitoring Activities", value: 86, suffix: "", delta: "Sample value" },
      { label: "Schools Covered", value: 412, suffix: "", delta: "Sample value" },
      { label: "Technical Assistance", value: 57, suffix: "", delta: "Sample value" },
      { label: "QMS Audits Conducted", value: 12, suffix: "", delta: "Sample value" },
      { label: "Corrective Actions Monitored", value: 33, suffix: "", delta: "Sample value" },
      { label: "Accomplishment Rate", value: 87, suffix: "%", delta: "Sample value" }
    ],
    /* Regional vs SDO comparison — bar chart */
    regionalCompare: {
      labels: ["Cotabato", "GenSan", "Kidapawan", "Koronadal", "Sarangani", "S. Cotabato", "S. Kudarat", "Tacurong"],
      datasets: [
        { label: "Monitoring Coverage (%)", values: [92, 88, 79, 90, 84, 86, 81, 77] },
        { label: "Compliance Rate (%)", values: [88, 91, 75, 89, 83, 87, 80, 74] }
      ]
    },
    /* Monthly trend — line chart */
    trend: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        { label: "Monitoring Activities", values: [6, 9, 12, 10, 8, 7, 11, 13, 10, 9, 7, 4] },
        { label: "Technical Assistance", values: [3, 4, 6, 5, 5, 4, 6, 7, 5, 4, 4, 4] }
      ]
    },
    /* Donut: distribution of QA activities */
    donut: {
      labels: ["Monitoring", "Audits", "Technical Assistance", "Training", "Documentation"],
      values: [35, 18, 24, 14, 9]
    },
    /* SDO performance progress bars */
    sdoProgress: [
      { name: "SDO Cotabato", value: 92 },
      { name: "SDO General Santos City", value: 88 },
      { name: "SDO Kidapawan City", value: 79 },
      { name: "SDO Koronadal City", value: 90 },
      { name: "SDO Sarangani", value: 84 },
      { name: "SDO South Cotabato", value: 86 },
      { name: "SDO Sultan Kudarat", value: 81 },
      { name: "SDO Tacurong City", value: 77 }
    ],
    /* KPI progress toward targets */
    targets: [
      { name: "Schools Covered vs Target", value: 82 },
      { name: "QMS Audit Schedule", value: 75 },
      { name: "CAPA Closure Rate", value: 68 },
      { name: "Reports Submitted On Time", value: 91 }
    ]
  },

  /* ---------- Programs & Services ---------- */
  programs: [
    { id: "qms", icon: "certificate", title: "Quality Management System (QMS)", desc: "Establishment and maintenance of a region-wide QMS aligned with One DepEd, One QMS and ISO 9001:2015 principles.", cat: "qms" },
    { id: "iqa", icon: "search-doc", title: "Internal Quality Audit", desc: "Structured internal audits of regional and division processes to verify conformity and identify improvement areas.", cat: "qms" },
    { id: "me", icon: "chart", title: "Monitoring and Evaluation", desc: "Systematic monitoring of program implementation and evaluation of outcomes against DepEd standards.", cat: "monitoring" },
    { id: "pir", icon: "clipboard", title: "Program Implementation Review", desc: "Periodic review of program implementation status, bottlenecks, and corrective actions across the region.", cat: "monitoring" },
    { id: "qam", icon: "shield", title: "Quality Assurance Monitoring", desc: "Routine QA monitoring of schools and offices to assess compliance with quality benchmarks.", cat: "monitoring" },
    { id: "ta", icon: "people", title: "Technical Assistance", desc: "Targeted coaching, mentoring, and capability building for SDOs, schools, and personnel.", cat: "support" },
    { id: "compliance", icon: "checklist", title: "School/Program Compliance Monitoring", desc: "Verification of school and program compliance with DepEd policies, standards, and requirements.", cat: "monitoring" },
    { id: "private", icon: "school", title: "Private School Quality Assurance", desc: "QA support and monitoring for private schools in coordination with relevant regional offices.", cat: "support" },
    { id: "research", icon: "flask", title: "Research and Evidence-Based Practice", desc: "Development and use of research evidence to inform quality decisions and interventions.", cat: "support" },
    { id: "ci", icon: "cycle", title: "Continuous Improvement", desc: "Facilitation of improvement projects, quality circles, and best-practice sharing across the region.", cat: "qms" },
    { id: "risk", icon: "alert", title: "Risk Management", desc: "Identification, analysis, and treatment of organizational risks through the QMS risk-based thinking.", cat: "qms" },
    { id: "dq", icon: "database", title: "Data Quality Assurance", desc: "Validation, verification, and governance of education data used for planning and decision-making.", cat: "monitoring" }
  ],

  /* ---------- Issuances ----------
     Entries with a `pdf` field are REAL official documents (files in /docs/).
     Entries without `pdf` are SAMPLE records clearly marked in the UI. */
  issuances: [
    { id: 101, type: "Office Memoranda", num: "QAD-2026-211", title: "Finalization of PQA Regionalization Self-Assessment", date: "2026-09-10", year: "2026", desc: "Office Memorandum on the finalization of the PQA Regionalization Self-Assessment.", pdf: "docs/om-qad-2026-211-pqa-regionalization.pdf", sample: false },
    { id: 102, type: "Regional Memoranda", num: "QAD-2026-018", title: "PISA-Based for Schools 2026 National Orientation and Training", date: "2026-09-09", year: "2026", desc: "Regional Memorandum on the PISA-Based for Schools 2026 National Orientation and Training.", pdf: "docs/rm-qad-2026-018-pisa-based-schools-2026.pdf", sample: false },
    { id: 103, type: "Office Memoranda", num: "QAD-2026-201", title: "3rd Quarter Regional Professional Learning Community (RPLC)", date: "2026-09-09", year: "2026", desc: "Office Memorandum on the 3rd Quarter Regional Professional Learning Community (RPLC).", pdf: "docs/om-qad-2026-201-rplc-q3.pdf", sample: false },
    { id: 104, type: "Office Memoranda", num: "QAD-2026-199", title: "Adoption of SOX PRExCI Framework", date: "2026-09-03", year: "2026", desc: "Office Memorandum on the adoption of the SOX PRExCI Framework.", pdf: "docs/om-qad-2026-199-sox-prexci-framework.pdf", sample: false },
    { id: 105, type: "Regional Advisories", num: "Advisory No. 059, s. 2026 · QAD-2026-059", title: "Application for the Philippine Science High School National Competitive Examination (NCE) 2027", date: "2026-08-18", year: "2026", desc: "Announcement of PSHS applications for incoming Grade 7 students, S.Y. 2027–2028 (application window: June 16 – November 7, 2026). Issued in compliance with DO No. 8, s. 2013.", pdf: "docs/ra-qad-2026-059-pshs-nce-2027.pdf", sample: false },
    { id: 106, type: "Regional Memoranda", num: "QAD-2026-016", title: "Application for Government Recognition of Private Institutions Offering SHS Program", date: "2026-08-11", year: "2026", desc: "Regional Memorandum on the application for government recognition of private institutions offering the Senior High School program.", pdf: "docs/rm-qad-2026-016-government-recognition-shs.pdf", sample: false },

    { id: 1, type: "DepEd Orders", num: "DO No. 000, s. 2026", title: "[Sample] Policy on Regional Quality Assurance Standards", date: "2026-01-10", year: "2026", desc: "Sample record demonstrating a DepEd Order entry in the repository." },
    { id: 2, type: "DepEd Orders", num: "DO No. 000, s. 2025", title: "[Sample] Guidelines on National Quality Benchmarks", date: "2025-08-15", year: "2025", desc: "Sample record. Official title and number to be supplied by QAD." },
    { id: 3, type: "DepEd Memoranda", num: "DM-OSEC-No. 000, s. 2026", title: "[Sample] Conduct of Internal Quality Audits", date: "2026-02-03", year: "2026", desc: "Sample memorandum entry for audit scheduling." },
    { id: 4, type: "DepEd Memoranda", num: "DM-No. 000, s. 2025", title: "[Sample] Submission of Monitoring Reports", date: "2025-11-20", year: "2025", desc: "Sample record demonstrating report submission guidelines entry." },
    { id: 5, type: "Regional Memoranda", num: "RM-No. 000, s. 2026", title: "[Sample] Regional QA Monitoring Schedule", date: "2026-03-01", year: "2026", desc: "Sample regional memorandum on monitoring schedule." },
    { id: 6, type: "Regional Memoranda", num: "RM-No. 000, s. 2025", title: "[Sample] Designation of QA Focal Persons", date: "2025-06-12", year: "2025", desc: "Sample record for SDO QA focal designations." },
    { id: 7, type: "Regional Advisories", num: "RA-No. 000, s. 2026", title: "[Sample] Advisory on QMS Awareness Activity", date: "2026-04-18", year: "2026", desc: "Sample regional advisory entry." },
    { id: 8, type: "Regional Advisories", num: "RA-No. 000, s. 2025", title: "[Sample] Advisory on Data Quality Validation", date: "2025-09-05", year: "2025", desc: "Sample record demonstrating advisory entry." },
    { id: 9, type: "Office Orders", num: "OO-No. 000, s. 2026", title: "[Sample] Creation of the Internal Quality Audit Team", date: "2026-01-22", year: "2026", desc: "Sample office order entry." },
    { id: 10, type: "Special Orders", num: "SO-No. 000, s. 2026", title: "[Sample] Authorization for School Monitoring Visits", date: "2026-05-09", year: "2026", desc: "Sample special order entry." },
    { id: 11, type: "QA Guidelines", num: "QAG-000", title: "[Sample] Regional QA Framework and Guidelines", date: "2026-02-14", year: "2026", desc: "Sample QA guideline document record." },
    { id: 12, type: "QA Guidelines", num: "QAG-001", title: "[Sample] Monitoring and Evaluation Manual", date: "2025-07-30", year: "2025", desc: "Sample record for the M&E manual entry." },
    { id: 13, type: "QMS Documents", num: "QMS-MAN-001", title: "[Sample] QMS Quality Manual", date: "2026-01-05", year: "2026", desc: "Sample quality manual record (placeholder)." },
    { id: 14, type: "QMS Documents", num: "QMS-POL-001", title: "[Sample] Quality Policy Statement", date: "2026-01-05", year: "2026", desc: "Sample quality policy record (placeholder)." },
    { id: 15, type: "Monitoring Guidelines", num: "MG-000", title: "[Sample] School Compliance Monitoring Protocol", date: "2025-10-11", year: "2025", desc: "Sample monitoring guideline record." },
    { id: 16, type: "DepEd Orders", num: "DO No. 000, s. 2024", title: "[Sample] Basic Education Quality Framework", date: "2024-05-19", year: "2024", desc: "Sample archived DepEd Order entry." },
    { id: 17, type: "Regional Memoranda", num: "RM-No. 000, s. 2024", title: "[Sample] Regional Orientation on Quality Assurance", date: "2024-08-22", year: "2024", desc: "Sample archived regional memorandum." },
    { id: 18, type: "QA Guidelines", num: "QAG-002", title: "[Sample] Internal Audit Procedure", date: "2024-12-02", year: "2024", desc: "Sample internal audit procedure record." }
  ],
  issuanceTypes: [
    "DepEd Orders", "DepEd Memoranda", "Regional Memoranda", "Regional Advisories",
    "Office Orders", "Office Memoranda", "Special Orders", "QA Guidelines", "QMS Documents", "Monitoring Guidelines"
  ],

  /* ---------- Forms & Templates (SAMPLE) ---------- */
  forms: [
    { id: 1, cat: "QA Forms", title: "[Sample] QA Monitoring Checklist", num: "QAD-F-001", updated: "2026-01-12", desc: "Checklist used during scheduled quality assurance monitoring visits." },
    { id: 2, cat: "Monitoring Forms", title: "[Sample] School Monitoring Report Form", num: "QAD-F-002", updated: "2026-01-12", desc: "Standard form for documenting school monitoring findings." },
    { id: 3, cat: "Evaluation Forms", title: "[Sample] Program Evaluation Form", num: "QAD-F-003", updated: "2025-11-08", desc: "Form for evaluating program implementation outcomes." },
    { id: 4, cat: "QMS Templates", title: "[Sample] Quality Objectives Tracker", num: "QAD-T-001", updated: "2026-02-01", desc: "Template for monitoring organization quality objectives." },
    { id: 5, cat: "Audit Forms", title: "[Sample] Internal Audit Plan Template", num: "QAD-T-002", updated: "2026-02-03", desc: "Annual internal quality audit planning template." },
    { id: 6, cat: "Audit Forms", title: "[Sample] Internal Audit Checklist", num: "QAD-F-004", updated: "2026-02-03", desc: "Process-level checklist for IQA teams." },
    { id: 7, cat: "RCA/CAPA Templates", title: "[Sample] Root Cause Analysis Worksheet", num: "QAD-T-003", updated: "2025-12-15", desc: "Structured RCA worksheet (5 Why / Fishbone)." },
    { id: 8, cat: "RCA/CAPA Templates", title: "[Sample] Corrective Action Report", num: "QAD-F-005", updated: "2025-12-15", desc: "Documenting corrective and preventive actions with verification." },
    { id: 9, cat: "Risk Registry Templates", title: "[Sample] Risk Register Template", num: "QAD-T-004", updated: "2026-01-20", desc: "Risk identification, analysis, and treatment registry." },
    { id: 10, cat: "Technical Assistance Forms", title: "[Sample] TA Request and Accomplishment Form", num: "QAD-F-006", updated: "2025-10-25", desc: "For requesting and documenting technical assistance." },
    { id: 11, cat: "Reports Templates", title: "[Sample] Monthly QA Accomplishment Report", num: "QAD-T-005", updated: "2026-01-05", desc: "Monthly report template for QA personnel." },
    { id: 12, cat: "Reports Templates", title: "[Sample] PIR Results Template", num: "QAD-T-006", updated: "2025-09-30", desc: "Template for Program Implementation Review results." },
    { id: 13, cat: "Other QAD Forms", title: "[Sample] Document Transmittal Slip", num: "QAD-F-007", updated: "2025-07-14", desc: "Official transmittal of QAD documents." },
    { id: 14, cat: "QA Forms", title: "[Sample] Stakeholder Feedback Form", num: "QAD-F-008", updated: "2026-03-02", desc: "Collects feedback on QAD services for improvement." }
  ],
  formCategories: [
    "QA Forms", "Monitoring Forms", "Evaluation Forms", "QMS Templates", "Audit Forms",
    "RCA/CAPA Templates", "Risk Registry Templates", "Technical Assistance Forms",
    "Reports Templates", "Other QAD Forms"
  ],

  /* ---------- Announcements (SAMPLE) ---------- */
  announcements: [
    { id: 1, date: "2026-04-15", cat: "Training", title: "[Sample] Regional QMS Awareness Training", desc: "Two-day awareness session on the One DepEd, One QMS framework for regional and division personnel. Sample entry.", featured: true },
    { id: 2, date: "2026-04-02", cat: "Audit Schedule", title: "[Sample] Schedule of Internal Quality Audits — Q2", desc: "Announcement of the second-quarter IQA schedule for target offices. Sample entry.", featured: false },
    { id: 3, date: "2026-03-20", cat: "Monitoring Schedule", title: "[Sample] School Compliance Monitoring Window", desc: "Regional monitoring teams will conduct school visits during the declared window. Sample entry.", featured: false },
    { id: 4, date: "2026-03-10", cat: "Deadline", title: "[Sample] Submission of QA Accomplishment Reports", desc: "Deadline reminder for the consolidation of division QA accomplishment reports. Sample entry.", featured: false },
    { id: 5, date: "2026-03-05", cat: "Workshop", title: "[Sample] Data Quality Validation Workshop", desc: "Workshop for division data personnel on validation protocols and tools. Sample entry.", featured: true },
    { id: 6, date: "2026-02-25", cat: "Meeting", title: "[Sample] QA Focal Persons Coordination Meeting", desc: "Quarterly coordination meeting of SDO quality assurance focal persons. Sample entry.", featured: false },
    { id: 7, date: "2026-02-12", cat: "Regional Activity", title: "[Sample] Regional Quality Assurance Assembly", desc: "Assembly highlighting QA milestones, challenges, and continuous improvement priorities. Sample entry.", featured: false },
    { id: 8, date: "2026-05-08", cat: "Training", title: "[Sample] Internal Auditor Course (QAD-organized)", desc: "Capacity building for members of Internal Quality Audit Teams. Sample entry.", featured: false }
  ],
  announcementCats: ["Training", "Audit Schedule", "Monitoring Schedule", "Deadline", "Meeting", "Workshop", "Regional Activity"],

  /* ---------- Knowledge Hub resources (SAMPLE) ---------- */
  resources: [
    { id: 1, cat: "QA Guidelines", title: "[Sample] Regional QA Framework Primer", type: "PDF", desc: "Introductory guide to the regional quality assurance framework.", updated: "2026-02-10" },
    { id: 2, cat: "FAQs", title: "[Sample] Frequently Asked Questions on QMS", type: "Web", desc: "Common questions on quality management system implementation.", updated: "2026-01-28" },
    { id: 3, cat: "Learning Resources", title: "[Sample] Fundamentals of Quality Assurance in Education", type: "PDF", desc: "Self-learning module on QA concepts for educators.", updated: "2025-11-15" },
    { id: 4, cat: "Training Materials", title: "[Sample] Monitoring and Evaluation Deck", type: "PPTX", desc: "Presentation deck used in regional M&E orientation.", updated: "2025-10-02" },
    { id: 5, cat: "Presentations", title: "[Sample] State of Quality Assurance — Region XII", type: "PPTX", desc: "Sample presentation for regional briefings.", updated: "2026-01-10" },
    { id: 6, cat: "Videos", title: "[Sample] Understanding the Audit Cycle", type: "Video", desc: "Short explainer on the internal audit cycle.", updated: "2025-09-18" },
    { id: 7, cat: "QA Best Practices", title: "[Sample] Checklist-Driven School Monitoring", type: "PDF", desc: "Practice brief on structured monitoring checklists.", updated: "2025-08-27" },
    { id: 8, cat: "Quality Improvement Stories", title: "[Sample] Improving Report Timeliness through CAPA", type: "Article", desc: "Improvement story template entry.", updated: "2026-03-01" },
    { id: 9, cat: "Research and Studies", title: "[Sample] Study on QA Practices in Divisions", type: "PDF", desc: "Placeholder record for research publications.", updated: "2025-07-09" },
    { id: 10, cat: "QA Guidelines", title: "[Sample] How to Conduct an Internal Audit", type: "PDF", desc: "Step-by-step internal audit guideline.", updated: "2026-02-03" }
  ],
  resourceCats: ["QA Guidelines", "FAQs", "Learning Resources", "Training Materials", "Presentations", "Videos", "QA Best Practices", "Quality Improvement Stories", "Research and Studies"],

  /* ---------- Best practices / stories (SAMPLE) ---------- */
  stories: [
    { id: 1, img: "assets/img/best-practice-1.jpg", cat: "Quality Improvement", title: "[Sample Story] Data-Driven Improvement Cycle", desc: "How a division used monitoring data to prioritize interventions and track improvement over one school year. Placeholder narrative.", place: "[School/SDO Name — placeholder]" },
    { id: 2, img: "assets/img/best-practice-2.jpg", cat: "Innovation", title: "[Sample Story] Classroom-Level Quality Checks", desc: "A school-based peer review routine that strengthened instruction quality. Placeholder narrative.", place: "[School Name — placeholder]" },
    { id: 3, img: "assets/img/best-practice-3.jpg", cat: "QMS", title: "[Sample Story] Process Mapping for Faster Reports", desc: "An SDO mapped its reporting process to cut duplication and delays. Placeholder narrative.", place: "[SDO Name — placeholder]" }
  ],
  storyCats: ["Quality Improvement", "Innovation", "Monitoring and Evaluation", "QMS", "School Governance", "Program Implementation", "Data Management"],

  /* ---------- SDO directory (names real; contact details placeholders) ---------- */
  sdos: [
    { id: "cotabato", name: "Schools Division Office — Cotabato", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "QA Guidelines, Monitoring Forms" },
    { id: "gensan", name: "Schools Division Office — General Santos City", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "QMS Templates, Audit Forms" },
    { id: "kidapawan", name: "Schools Division Office — Kidapawan City", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "Monitoring Forms, Reports Templates" },
    { id: "koronadal", name: "Schools Division Office — Koronadal City", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "QA Guidelines, RCA/CAPA Templates" },
    { id: "sarangani", name: "Schools Division Office — Sarangani", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "Evaluation Forms, Risk Registry" },
    { id: "south-cotabato", name: "Schools Division Office — South Cotabato", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "QMS Documents, Audit Forms" },
    { id: "sultan-kudarat", name: "Schools Division Office — Sultan Kudarat", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "Monitoring Guidelines, QA Forms" },
    { id: "tacurong", name: "Schools Division Office — Tacurong City", address: "[Full office address — placeholder]", phone: "[Telephone — placeholder]", email: "[Email — placeholder]", site: "[Website/Facebook link — placeholder]", focal: "[QA Focal Person — placeholder]", resources: "Reports Templates, TA Forms" }
  ],

  /* ---------- Download center (SAMPLE) ---------- */
  downloads: [
    { id: 1, cat: "Policies", title: "[Sample] Regional QA Policy Record", fmt: "PDF", size: "—", updated: "2026-01-10" },
    { id: 2, cat: "Guidelines", title: "[Sample] Monitoring and Evaluation Guidelines", fmt: "PDF", size: "—", updated: "2025-11-01" },
    { id: 3, cat: "Forms", title: "[Sample] QA Forms Bundle", fmt: "PDF", size: "—", updated: "2026-01-12" },
    { id: 4, cat: "Templates", title: "[Sample] QMS Templates Bundle", fmt: "DOCX", size: "—", updated: "2026-02-01" },
    { id: 5, cat: "Reports", title: "[Sample] Annual QA Accomplishment Report Format", fmt: "DOCX", size: "—", updated: "2025-12-05" },
    { id: 6, cat: "Presentations", title: "[Sample] QMS Awareness Deck", fmt: "PPTX", size: "—", updated: "2026-02-14" },
    { id: 7, cat: "Monitoring Tools", title: "[Sample] School Compliance Checklist", fmt: "PDF", size: "—", updated: "2026-03-01" },
    { id: 8, cat: "Audit Documents", title: "[Sample] Internal Audit Report Format", fmt: "DOCX", size: "—", updated: "2026-02-03" }
  ],
  downloadCats: ["Policies", "Guidelines", "Forms", "Templates", "Reports", "Presentations", "Monitoring Tools", "Audit Documents"],

  /* ---------- Reports (SAMPLE) ---------- */
  reports: [
    { id: 1, cat: "Monitoring Reports", title: "[Sample] Regional Monitoring Report — School Year 2025-2026", period: "SY 2025-2026", updated: "2026-03-15" },
    { id: 2, cat: "Audit Reports", title: "[Sample] Internal Quality Audit Report — Q1", period: "Q1 2026", updated: "2026-04-05" },
    { id: 3, cat: "Accomplishment Reports", title: "[Sample] QAD Accomplishment Report — 1st Semester", period: "1st Sem 2025-2026", updated: "2026-01-31" },
    { id: 4, cat: "PIR Reports", title: "[Sample] Program Implementation Review Results", period: "Q4 2025", updated: "2025-12-20" },
    { id: 5, cat: "Dashboard Exports", title: "[Sample] QA Dashboard Data Export", period: "Q1 2026", updated: "2026-04-10" },
    { id: 6, cat: "Monitoring Reports", title: "[Sample] SDO Compliance Summary", period: "SY 2025-2026", updated: "2026-03-28" }
  ],
  reportCats: ["Monitoring Reports", "Audit Reports", "Accomplishment Reports", "PIR Reports", "Dashboard Exports"]
};

/* Local persistence helpers (demo CMS) */
window.QAD_STORE = {
  key: "qad_cms_v1",
  read() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { return {}; }
  },
  write(obj) {
    try { localStorage.setItem(this.key, JSON.stringify(obj)); } catch {}
  },
  get(collection, fallback) {
    const s = this.read();
    return s[collection] !== undefined ? s[collection] : fallback;
  },
  set(collection, value) {
    const s = this.read();
    s[collection] = value;
    this.write(s);
  }
};
