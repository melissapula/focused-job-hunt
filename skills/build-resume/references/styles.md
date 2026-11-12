# Resume formatting rules

Build every resume as a Word .docx with Claude's built-in docx (Word) skill, following these rules exactly so each style looks the same every time. Measurements are in points (pt) and inches; "half-points" are what Word's font-size fields use (20 half-points = 10pt).

## Rules for every style

**Page**
- One page, single column. Letter (8.5 × 11 in) by default; A4 (210 × 297 mm) when the profile says A4.
- 0.5 in margins on all sides.
- Real text only: no tables, text boxes, columns, images, icons, headers or footers. Applicant tracking systems read this layout cleanly.

**Name and contact block** (top of the page)
1. The name, bold, in the accent color; 1pt space after.
2. Optional headline (one line, gray `#555555`, 1pt larger than body text; black in minimal), only if the profile has one; 1pt space after.
3. One contact line at body size in black: location · phone · email · links, separated by " · ". The phone is plain text. The email is a clickable `mailto:` link, and LinkedIn, portfolio and GitHub are clickable links labelled with their names (for example "LinkedIn"); all links are in the accent color and underlined. 3pt space after the contact line.

**Section headers**
- Bold, 11pt, in the accent color; 5.5pt space before, 2pt after (scaled by the style's spacing factor).
- Type the header text in capital letters for UPPERCASE styles (don't use Word's all-caps font setting), so applicant tracking systems read it as written.
- A rule is a paragraph bottom border with 1pt of space between text and line (Word stores border widths in eighths of a point: 0.5pt = 4, 0.75pt = 6, 1.5pt = 12). Case and decoration depend on the style (below).

**Section order and titles**
- Default order: Professional Summary, Skills, Professional Experience, Earlier Experience, Selected Projects, then extra sections (certifications and licenses, education, military service, volunteer or domain experience).
- Default titles for extra sections: Certifications, Licenses & Certifications (when there are licenses), Education, Military Service, Volunteer Experience.
- Use the titles and order from the profile's resume preferences when it gives them (for example "Clinical Experience", or Education before Experience for a new grad).
- Leave out any section with nothing in it.

**Body content**
- Summary: one paragraph of 2–3 lines.
- Skills: up to 3 lines, each "**Category:** item, item, item" (category bold).
- Each role: one line with **Title** (bold) — Employer, both at body size + 0.5pt, and the dates at body size, right-aligned on the same line in gray `#555555` (black in minimal). Right-align them with a right-aligned tab stop set at the right margin (page width minus both margins); never with spaces. Then 2–5 bullets.
- Earlier Experience: one line per role at body size, **Title** (bold) — Employer, dates right-aligned the same way; no bullets.
- Projects: a bullet each: **Name** — one line on what it is and the tools used. When there's a link, the project name itself is the clickable link (bold, accent color, underlined); don't print the URL.
- Extra sections: one line per item at body size. Dated items (degrees, service) use **Bold part** — rest, with the date right-aligned the same way. Undated items (for example a list of certifications) are plain text, one line.
- Bullets: real Word bullet lists (a numbering definition with a "•" bullet), never a typed "•" character. Indent 0.21 in, hanging 0.14 in.
- Spacing (all scaled by the style's spacing factor): 0.6pt after each bullet, 1.5pt after summary and extra-section lines, 0.75pt after skills lines and Earlier Experience lines, 2.5pt before each role line.

**Font size**
- Body text 10pt by default. If the resume runs past one page, first tighten wording and trim (see the build-resume skill), then drop body text to 9.5pt. Never go below 9.5pt.

## The four styles

| | classic (default) | minimal | modern | compact |
| - | - | - | - | - |
| Font | Calibri | Arial | Calibri | Calibri |
| Accent color | `#2E75B6` teal | `#000000` black only, no other color anywhere (links, headline and dates black too) | `#1F6F5C` deep green | `#2E75B6` teal |
| Name | 18pt, centered | 16pt, left-aligned | 20pt, left-aligned | 15pt, centered |
| Headline and contact line | centered | left-aligned | left-aligned, with a 1.5pt accent-colored rule under the contact line | centered |
| Section headers | UPPERCASE, thin 0.75pt accent rule under each | UPPERCASE, thin 0.5pt black rule under each | Title Case (capitalize the first letter of each word; keep acronyms like ICU or RN as written), on a light `#E8F1EE` shaded band, no rule | UPPERCASE, thin 0.75pt accent rule under each |
| Spacing factor | 1.0 | 1.0 | 1.1 | 0.6 |
| Body text | 10pt | 10pt | 10pt | 9.5pt (already at the floor; trim content instead of shrinking) |
| Best for | Most roles | Conservative employers, government, strict application portals | Design-minded companies, startups | Long histories that need more room on one page |

Options any style accepts, from the profile's resume preferences:
- An accent color override (hex, like `#8B2E5F`). Ignored by minimal.
- A font override. Stick to common fonts: Calibri, Arial, Georgia, Garamond, Helvetica.
- A one-line headline under the name.
- Letter or A4 paper.
- Section titles and order.

## Previewing the styles

To show a user the styles, build one of the sample resumes in this folder (`sample-resume-software.md` or `sample-resume-nursing.md`, whichever is closer to their field) once per style, convert each to PDF, and send the PDFs or a side-by-side preview image. The samples are fictional people.
