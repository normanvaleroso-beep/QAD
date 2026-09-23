# Quality Assurance Division (QAD) — DepEd SOCCSKSARGEN Region XII

Official website of the Quality Assurance Division, Department of Education —
SOCCSKSARGEN Region XII, Philippines.

**Live site:** https://normanvaleroso-beep.github.io/QAD/

## Structure (flat — assets at repo root)

```
/
├── index.html … admin-dashboard.html   (12 pages)
├── styles.css · data.js · main.js · admin.js
├── hero-qa.jpg · about-team.jpg · best-practice-*.jpg · favicon.svg
├── docs/                               (official issuance PDFs)
├── .nojekyll
└── README.md
```

## Official issuances in /docs/

| Ref | Type | Title |
|---|---|---|
| QAD-2026-016 | Regional Memorandum | Application for Government Recognition of Private Institutions Offering SHS Program |
| QAD-2026-018 | Regional Memorandum | PISA-Based for Schools 2026 National Orientation and Training |
| QAD-2026-059 | Regional Advisory | PSHS National Competitive Examination (NCE) 2027 |
| QAD-2026-199 | Office Memorandum | Adoption of SOX PRExCI Framework |
| QAD-2026-201 | Office Memorandum | 3rd Quarter Regional Professional Learning Community (RPLC) |
| QAD-2026-211 | Office Memorandum | Finalization of PQA Regionalization Self-Assessment |

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Admin demo

`admin-dashboard.html` — login `admin` / `admin123`

## Notes

- Issuances with a green **Official** badge link to real PDFs in `docs/`.
- Amber **Sample** records are placeholders until official data is loaded.
- Placeholders (addresses, emails, personnel, vision/mission) await official info.
- © 2026 Department of Education – SOCCSKSARGEN Region XII. All Rights Reserved.
