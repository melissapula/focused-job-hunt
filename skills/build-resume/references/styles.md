# Resume styles

Set `"style"` in the spec. All styles are one page, single column, with real text (no tables, text boxes or images), so applicant tracking systems read them cleanly.

| Style | Look | Best for |
| - | - | - |
| `classic` (default) | Centered name, Calibri, teal (#2E75B6) uppercase section headers with a thin rule | Most roles |
| `minimal` | Left-aligned name, Arial, black and white only, thin black rules | Conservative employers, government, strict ATS portals |
| `modern` | Large left-aligned name, optional headline under it, deep green (#1F6F5C) title-case headers on a light band | Design-minded companies, startups |
| `compact` | Classic look with tighter spacing and a slightly smaller base size | Long histories that need more room on one page |

Options any style accepts:
- `"accent": "#RRGGBB"` overrides the accent color (ignored by `minimal`).
- `"font"` overrides the font. Stick to common fonts: Calibri, Arial, Georgia, Garamond, Helvetica.
- `"headline"` adds a one-line title under the name (for example "Full-Stack Engineer · Angular, NestJS, AI").

To preview styles during setup, build `sample-spec.json` (or `sample-spec-nursing.json`, if it is closer to the user's field) once per style, following the setup skill's resume-preferences step, and send the PDFs or a preview image.
