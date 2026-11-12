# Focused Job Hunt

An honest, end-to-end job search for Claude, in four skills, for any field: software, healthcare, teaching, trades, new grads and career changers. You answer a setup interview once; after that Claude searches your job boards, builds tailored one-page resumes from facts you've confirmed, and keeps an application tracker current from your email and job sites. It never invents experience, never signs in for you, and never applies or sends anything without asking.

## Install

Focused Job Hunt is designed for the Claude app, where Claude Docs, Gmail and Claude in Chrome are available. Add it from the plugin directory once it's listed, then say "set up my job search".

In Claude Code (2.1.275 or later):

```
/plugin install focused-job-hunt --marketplace melissapula/focused-job-hunt
```

On older Claude Code versions:

```
/plugin marketplace add melissapula/focused-job-hunt
/plugin install focused-job-hunt@focused-job-hunt
```

## The skills

1. **Setup** (say "set up my job search"): an interview that collects your skills (with honest depth labels: used at work, in projects, in coursework, or familiar), experience, verified metrics, projects, certifications, education, service, job filters, resume style and the job boards you use. It saves everything to a **Job Hunt Profile** doc you can review and edit, and creates your **Job Application Tracker** doc.
2. **Job search** ("find me jobs"): searches your boards for roles that fit your profile and filters, removes ones you've already applied to, and makes a checklist doc of the shortlist grouped by fit.
3. **Build resume** ("build a resume for this job"): a one-page Word + PDF resume tailored to one posting, using only facts from your profile. Requirements you don't meet are reported as gaps, never invented.
4. **Job tracker** ("update my job tracker"): reads your email and job-site accounts and updates the tracker with new applications, rejections, interviews, recruiter leads and follow-ups.

## Resume styles

Pick one during setup, or ask for a different one on any single resume ("use the minimal style for this one"). All are one page, single column and plain text underneath, so applicant tracking systems read them cleanly.

| Style | Look |
| - | - |
| classic (default) | Centered name, Calibri, teal section headers with a thin rule |
| minimal | Left-aligned, Arial, black and white only |
| modern | Large left-aligned name, optional headline, green title-case headers on a light band |
| compact | Classic look with tighter spacing for longer histories |

You can also choose Letter or A4 paper, override the accent color and font, add a one-line headline under your name, and rename or reorder sections (for example "Clinical Experience" first, or projects before experience for new grads). Older roles can go in a one-line "Earlier Experience" section so long careers still fit on one page.

## What it needs

- **Claude Docs** (required) for the profile, tracker and shortlist docs.
- **Gmail** connector (optional, recommended) for confirmations and replies.
- **Claude in Chrome** (optional) for job boards and any second inbox, using your own sign-ins.
- **A linked computer** (optional) lets the resume skill verify project tech stacks from your code repos.
- **Node.js** in Claude's workspace to build resumes (already present in Claude's cloud workspace).

## Data handling and what the plugin runs

This plugin has no server and sends your data nowhere outside your own Claude account. Specifically:

- **Stores:** your profile, tracker and job shortlists as Claude Docs in your own account. You can read, edit or delete them at any time. Resume files are created in Claude's private workspace and sent to you in the conversation.
- **Reads:** your Gmail, using searches for job-related mail only (applications, rejections, interviews, offers, recruiters, employers already in your tracker, and job-board notifications), including your spam folder, since the tracker's last update (on the first run, as far back as you choose). Personal mail that happens to match a search is skipped and never reported. It also reads job-board pages and messages in your signed-in Chrome, public job postings on the web, and, only if you turn it on, a second web inbox and files in code repositories on your linked computer (repo facts are used only after you confirm them).
- **Never does:** send, reply, archive, delete or label email; click links or open attachments in email; apply, message or withdraw on job sites; sign in, enter passwords or complete CAPTCHAs. Sending, applying and the like happen only if you ask in chat, and sign-ins always stay with you. Opening a message in a second web inbox can mark it as read there.
- **In your browser:** job search opens search pages and listings one at a time in your signed-in Chrome and reads them the way you would, pausing between pages. It may read the job data already on the page it has open (for example a listing's structured description), but it doesn't call sites' private APIs or run background scripts.
- **Runs in Claude's workspace:** one bundled script, `skills/build-resume/scripts/build.js`, which reads a resume spec and writes a .docx locally with no network calls. Before the first resume it installs the open-source `docx` npm package (version 9) into Claude's workspace. It also uses LibreOffice and poppler, if present, to convert the resume to PDF and check that it fits on one page.
- **Treats content as data:** text in emails and web pages is never followed as instructions.

## Privacy

See the [Privacy Policy](PRIVACY.md). In short: no server, nothing sent outside your own Claude account and connected apps, and everything stored in your own Claude Docs.

## Honesty rules

The resume skill only uses facts stored in your profile, labels skill depth accurately (for example "in side projects" or "familiar"), uses only metrics you've confirmed, keeps your real titles and dates, and lists anything in your "never claim" list as a gap.

## License

MIT. See `LICENSE`.
