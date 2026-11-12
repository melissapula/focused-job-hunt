# Resume spec format

`scripts/build.js` reads a JSON spec. Every string must come from the Job Hunt Profile. Two worked examples (fictional people) are in this folder: `sample-spec.json` (software developer) and `sample-spec-nursing.json` (nurse, with custom section titles, a custom order and an Earlier Experience section).

```json
{
  "style": "classic",
  "accent": "#2E75B6",
  "font": "Calibri",
  "paper": "letter",
  "headline": "Optional one-line title under the name",
  "contact": {
    "name": "Jane Doe",
    "location": "Duluth, MN (Remote)",
    "phone": "555-555-5555",
    "email": "jane@example.com",
    "links": [{ "label": "LinkedIn", "url": "https://linkedin.com/in/jane" }]
  },
  "summary": "2–3 lines that only restate profile facts, leading with the strongest true overlap with the posting.",
  "sectionTitles": { "skills": "Clinical Skills", "experience": "Clinical Experience" },
  "order": ["summary", "skills", "experience", "earlier", "projects", "Education"],
  "skills": [["Category", "Skill, skill; another skill in personal projects"]],
  "experience": [
    { "title": "Real Title", "org": "Employer (remote)", "dates": "Feb 2020 – Aug 2026", "bullets": ["Confirmed accomplishment…"] }
  ],
  "earlierExperience": [{ "title": "Older Role", "org": "Employer", "dates": "2012 – 2015" }],
  "projects": [{ "name": "Project", "url": "https://example.com/project", "text": "What it is and the tools used." }],
  "extraSections": [
    { "title": "Certifications", "lines": [{ "text": "Cert name · Another cert" }] },
    { "title": "Education", "lines": [{ "bold": "B.S. Degree", "rest": "School", "dates": "2020" }] }
  ]
}
```

| Field | Required | Notes |
| - | - | - |
| `contact.name`, `summary` | yes | |
| `skills` | no | List of `[category, text]` pairs. Leave out if none. |
| `experience` | no | Leave out for someone without work history. Each entry needs `title`, `org`, `dates`. |
| `earlierExperience` | no | One line per older role (title, employer, dates), for fitting long careers on one page. |
| `projects` | no | Each needs `name`; `url`, `linkText` (shown instead of the bare URL) and `text` optional. |
| `extraSections` | no | Each needs `title`; lines are `{ "text" }` or `{ "bold", "rest", "dates" }`. |
| `sectionTitles` | no | Override any of `summary`, `skills`, `experience`, `earlier`, `projects`. Defaults: Professional Summary, Skills, Professional Experience, Earlier Experience, Selected Projects. |
| `order` | no | Section order using `summary`, `skills`, `experience`, `earlier`, `projects` and extra-section titles. Anything left out of the order is added at the end. Default: summary, skills, experience, earlier, projects, then extra sections. |
| `size` | no | Body font size in half-points, 19–24 (same as the script's optional third argument, which wins if both are given). |
| `paper` | no | `"letter"` (default; US and Canada) or `"a4"` (most other countries). |
| `style`, `accent`, `font`, `headline` | no | See `styles.md`. |

The script refuses a spec with missing required fields or malformed entries and lists every problem, so fix the spec and rerun.

Optional third argument to the script is the body font size in half-points (default 20 = 10pt; 19 = 9.5pt is the floor for fitting one page; whole numbers only, 19 to 24). The compact style already uses 19.
