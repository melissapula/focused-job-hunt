// Builds a one-page resume .docx from a JSON spec.
// Usage: node build.js spec.json output.docx [fontSizeHalfPoints]
// Requires the "docx" npm package (npm install docx@9).
// Styles: classic (default), minimal, modern, compact. See ../references/styles.md.
// This script only reads the spec file and writes the .docx; it makes no network calls.
const fs = require('fs');
const fail = (msg) => { console.error('build.js: ' + msg); process.exit(1); };
let docx;
try { docx = require(require.resolve('docx', { paths: [process.cwd(), __dirname] })); } // docx is installed in the working folder
catch (e) { fail('the "docx" package is not installed. Run `npm install docx@9` in the working folder, then rerun.'); }
const { Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, LevelFormat, TabStopType, BorderStyle, ShadingType } = docx;

const [specPath, outPath, sizeArg] = process.argv.slice(2);
if (!specPath || !outPath) fail('usage: node build.js spec.json output.docx [size]');
let s;
try { s = JSON.parse(fs.readFileSync(specPath, 'utf8')); } catch (e) { fail('could not read the spec as JSON: ' + e.message); }
const problems = [];
if (!s.contact || !s.contact.name) problems.push('contact.name is required');
if (!s.summary) problems.push('summary is required');
if (s.skills !== undefined && (!Array.isArray(s.skills) || s.skills.some((x) => !Array.isArray(x) || x.length !== 2))) problems.push('skills must be a list of [category, text] pairs');
if (s.experience !== undefined && !Array.isArray(s.experience)) problems.push('experience must be a list');
(Array.isArray(s.experience) ? s.experience : []).forEach((j, i) => { if (!j || !j.title || !j.org || !j.dates) problems.push(`experience[${i}] needs title, org and dates`); });
if (s.earlierExperience !== undefined && !Array.isArray(s.earlierExperience)) problems.push('earlierExperience must be a list');
(Array.isArray(s.earlierExperience) ? s.earlierExperience : []).forEach((j, i) => { if (!j || !j.title || !j.org || !j.dates) problems.push(`earlierExperience[${i}] needs title, org and dates`); });
(Array.isArray(s.projects) ? s.projects : []).forEach((p, i) => { if (!p || !p.name) problems.push(`projects[${i}] needs a name`); });
(Array.isArray(s.extraSections) ? s.extraSections : []).forEach((x, i) => { if (!x || !x.title) problems.push(`extraSections[${i}] needs a title`); });
if (s.contact && s.contact.links !== undefined && !Array.isArray(s.contact.links)) problems.push('contact.links must be a list of { label, url }');
(s.contact && Array.isArray(s.contact.links) ? s.contact.links : []).forEach((l, i) => { if (!l || !l.label || !l.url) problems.push(`contact.links[${i}] needs label and url`); });
if (s.projects !== undefined && !Array.isArray(s.projects)) problems.push('projects must be a list');
if (s.extraSections !== undefined && !Array.isArray(s.extraSections)) problems.push('extraSections must be a list');
(Array.isArray(s.extraSections) ? s.extraSections : []).forEach((x, i) => { if (x && x.lines !== undefined && !Array.isArray(x.lines)) problems.push(`extraSections[${i}].lines must be a list`); (x && Array.isArray(x.lines) ? x.lines : []).forEach((l, k) => { if (!l || typeof l !== 'object') problems.push(`extraSections[${i}].lines[${k}] must be an object like { "text": "..." }`); }); });
(Array.isArray(s.experience) ? s.experience : []).forEach((j, i) => { if (j && j.bullets !== undefined && !Array.isArray(j.bullets)) problems.push(`experience[${i}].bullets must be a list`); });
if (s.order !== undefined && !Array.isArray(s.order)) problems.push('order must be a list');
if (s.sectionTitles !== undefined && (typeof s.sectionTitles !== 'object' || Array.isArray(s.sectionTitles))) problems.push('sectionTitles must be an object');
if (s.paper !== undefined && !['letter', 'a4'].includes(String(s.paper).toLowerCase())) problems.push('paper must be "letter" or "a4"');
const sizeIn = sizeArg !== undefined ? sizeArg : s.size;
if (sizeIn !== undefined && !(Number.isInteger(Number(sizeIn)) && Number(sizeIn) >= 19 && Number(sizeIn) <= 24)) problems.push('size must be a whole number from 19 to 24 (half-points; 20 = 10pt)');
if (s.style && !['classic', 'minimal', 'modern', 'compact'].includes(s.style)) console.warn(`build.js: unknown style "${s.style}", using classic`);
if (s.accent && !/^#?[0-9a-fA-F]{6}$/.test(s.accent)) problems.push('accent must be a hex color like #2E75B6');
if (problems.length) fail('spec problems:\n  - ' + problems.join('\n  - '));

const STYLES = {
  classic: { font: 'Calibri', accent: '2E75B6', nameAlign: 'center', nameSize: 36, headerCase: 'upper', headerRule: true, headerFill: false, gap: 1 },
  minimal: { font: 'Arial', accent: '000000', nameAlign: 'left', nameSize: 32, headerCase: 'upper', headerRule: true, headerFill: false, gap: 1, mono: true },
  modern: { font: 'Calibri', accent: '1F6F5C', nameAlign: 'left', nameSize: 40, headerCase: 'title', headerRule: false, headerFill: true, gap: 1.1 },
  compact: { font: 'Calibri', accent: '2E75B6', nameAlign: 'center', nameSize: 30, headerCase: 'upper', headerRule: true, headerFill: false, gap: 0.6, baseSize: 19 },
};
const st = STYLES[s.style] || STYLES.classic;
const FONT = s.font || st.font;
const ACCENT = st.mono ? '000000' : (s.accent || '#' + st.accent).replace('#', '');
const GRAY = st.mono ? '333333' : '555555';
const SIZE = Number(sizeArg || s.size || st.baseSize || 20), MARGIN = 720;
const sp = (n) => Math.round(n * st.gap);
const A4 = String(s.paper || 'letter').toLowerCase() === 'a4';
const PAPER = A4 ? { width: 11906, height: 16838 } : { width: 12240, height: 15840 }; // Letter (US/Canada) or A4 (most other countries)
const RIGHT = PAPER.width - 2 * MARGIN;

const r = (text, o = {}) => new TextRun({ text: text == null ? '' : String(text), font: FONT, size: o.size || SIZE, bold: o.bold, italics: o.italics, color: o.color });
const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: SIZE, color: ACCENT, underline: {} })] });
const titleCase = (t) => t.replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase()); // keeps acronyms like ICU and RN
const sectionHeader = (t) => new Paragraph({
  spacing: { before: sp(110), after: sp(40) },
  border: st.headerRule ? { bottom: { style: BorderStyle.SINGLE, size: st.mono ? 4 : 6, color: ACCENT, space: 1 } } : undefined,
  shading: st.headerFill ? { type: ShadingType.CLEAR, color: 'auto', fill: 'E8F1EE' } : undefined,
  children: [new TextRun({ text: st.headerCase === 'upper' ? t.toUpperCase() : titleCase(t), font: FONT, size: 22, bold: true, color: ACCENT })],
});
const body = (children) => new Paragraph({ spacing: { after: sp(30) }, children });
const skillLine = (a, b) => new Paragraph({ spacing: { after: sp(15) }, children: [r(a + ': ', { bold: true }), r(b)] });
const roleHeader = (title, org, dates) => new Paragraph({ spacing: { before: sp(50), after: sp(15) }, tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }], children: [r(title, { bold: true, size: SIZE + 1 }), r(' — ' + org, { size: SIZE + 1 }), r('\t' + dates, { color: GRAY })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: sp(12) }, children: [r(t)] });
const dateLine = (bold, rest, dates) => new Paragraph({ spacing: { after: sp(10) }, tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }], children: [r(bold, { bold: true }), r(rest ? ' — ' + rest : ''), r('\t' + (dates || ''), { color: GRAY })] });

const c = s.contact;
const contactRuns = [];
const push = (node) => { if (contactRuns.length) contactRuns.push(r(' · ')); contactRuns.push(node); };
if (c.location) push(r(c.location));
if (c.phone) push(r(c.phone));
if (c.email) push(link(String(c.email), 'mailto:' + c.email));
for (const l of c.links || []) push(link(String(l.label), String(l.url)));
const align = st.nameAlign === 'left' ? AlignmentType.LEFT : AlignmentType.CENTER;

const children = [
  new Paragraph({ alignment: align, spacing: { after: 20 }, children: [new TextRun({ text: String(c.name), font: FONT, size: st.nameSize, bold: true, color: ACCENT })] }),
];
if (s.headline) children.push(new Paragraph({ alignment: align, spacing: { after: 20 }, children: [r(s.headline, { color: GRAY, size: SIZE + 2 })] }));
children.push(new Paragraph({ alignment: align, spacing: { after: 60 }, border: st.headerFill ? { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 4 } } : undefined, children: contactRuns }));

// Section titles and order are configurable so the same builder works for any field.
const T = Object.assign({ summary: 'Professional Summary', skills: 'Skills', experience: 'Professional Experience', earlier: 'Earlier Experience', projects: 'Selected Projects' }, s.sectionTitles || {});
const blocks = {
  summary: () => { children.push(sectionHeader(T.summary), body([r(s.summary)])); },
  skills: () => { if (!(s.skills || []).length) return; children.push(sectionHeader(T.skills), ...s.skills.map(([a, b]) => skillLine(a, b))); },
  experience: () => {
    if (!(s.experience || []).length) return;
    children.push(sectionHeader(T.experience));
    for (const job of s.experience) { children.push(roleHeader(job.title, job.org, job.dates)); for (const b of job.bullets || []) children.push(bullet(b)); }
  },
  earlier: () => {
    if (!(s.earlierExperience || []).length) return;
    children.push(sectionHeader(T.earlier));
    for (const j of s.earlierExperience) children.push(dateLine(j.title, j.org, j.dates));
  },
  projects: () => {
    if (!(s.projects || []).length) return;
    children.push(sectionHeader(T.projects));
    for (const p of s.projects) {
      const runs = [r(p.name, { bold: true })];
      if (p.url) runs.push(r(' ('), link(p.linkText || p.url.replace(/^https?:\/\//, '').replace(/\/$/, ''), p.url), r(')'));
      if (p.text) runs.push(r(' — ' + p.text));
      children.push(new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: sp(20) }, children: runs }));
    }
  },
};
const extraBlock = (sec) => () => {
  children.push(sectionHeader(sec.title));
  for (const line of sec.lines || []) children.push(line.dates || line.bold ? dateLine(line.bold || '', line.rest || '', line.dates) : body([r(line.text || '')]));
};
const extras = s.extraSections || [];
const defaultOrder = ['summary', 'skills', 'experience', 'earlier', 'projects'];
const order = Array.isArray(s.order) && s.order.length ? s.order : defaultOrder;
const done = new Set();
for (const section of order) {
  if (blocks[section] && !done.has(section)) { blocks[section](); done.add(section); continue; }
  const sec = extras.find((x) => x.title === section);
  if (sec && !done.has('x:' + section)) { extraBlock(sec)(); done.add('x:' + section); continue; }
  if (!blocks[section] && !sec) console.warn(`build.js: order entry "${section}" matches no section; skipped`);
}
// Anything the order left out still appears, so no section is lost by accident.
for (const section of defaultOrder) if (!done.has(section)) blocks[section]();
for (const sec of extras) if (!done.has('x:' + sec.title)) extraBlock(sec)();

const doc = new Document({
  numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } } } }] }] },
  sections: [{ properties: { page: { size: PAPER, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, children }],
});
Packer.toBuffer(doc)
  .then((b) => { fs.writeFileSync(outPath, b); console.log(`Wrote ${outPath} (style: ${STYLES[s.style] ? s.style : 'classic'}, size: ${SIZE}, paper: ${A4 ? 'A4' : 'Letter'}). Convert to PDF and check it is one page.`); })
  .catch((e) => fail('could not write the .docx: ' + e.message));
