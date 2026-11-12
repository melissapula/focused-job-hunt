# Changelog

## 0.3.1
- Reworded a job-search pay-filter line that the directory's security scan misread as a password reference.

## 0.3.0
- Works for any field and career stage: general skill depth labels (work, projects, coursework, familiar), pay with currency and period, country-aware searches, custom resume section titles and order, optional experience, an Earlier Experience section for long careers, and a nursing sample resume.
- Email reading limited to job-related searches (spam included); personal mail is never reported. Never clicks email links or attachments.
- Ignores instructions hidden in job postings and pages.
- Repo facts used on resumes only after the user confirms them; resume summaries restate profile facts only.
- First tracker run asks how far back to look; missing or deleted tracker is detected and can be recreated.
- New tracker statuses Closed and Withdrawn, with forward-only status changes.
- Setup checks access before the interview; profile lookup pages through all artifacts and handles duplicates.
- Fallbacks when Gmail, Chrome, projects or LibreOffice are missing.
- Skill descriptions contain no angle brackets (the Claude app rejects them as XML tags).
- Letter or A4 paper; modern style keeps acronyms in custom section titles (ICU, RN); stricter spec checks.
- Job search reads pages one at a time instead of calling sites' private APIs.
- Gmail searches cover the user's language as well as English; spam searched explicitly.
- Tracker records its last run, and upgrades older status dropdowns with the new options.

## 0.2.0
- Resume builder checks the spec and gives clear error messages; setup saves the tracker link into the profile.
- Renamed from job-hunt-kit to focused-job-hunt.
- Resume styles: classic, minimal, modern and compact, chosen during setup or per resume.
- Optional headline under the name.
- Sample spec (fictional person) for previewing styles.
- MIT license, data-handling disclosure in the README.

## 0.1.0
- First version: setup, job-search, build-resume and job-tracker skills.
