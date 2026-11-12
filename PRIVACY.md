# Privacy Policy

Last updated: November 12, 2026

Focused Job Hunt is a Claude plugin made of written instructions (skills) and one local resume-building script. It has no server, no database and no analytics, and its author never receives your data.

## What the plugin reads

When you ask it to, Claude reads:
- **Your Job Hunt Profile and Job Application Tracker:** Claude Docs in your own Claude account.
- **Your Gmail, job-related messages only:** searches for applications, rejections, interviews, offers, recruiter messages, employers already in your tracker and job-board notifications (including spam), through the Gmail connector you connected. Personal mail that happens to match a search is skipped and never reported.
- **Job sites in your signed-in Chrome:** search results, listings, your applied-jobs pages and job-site messages, through Claude in Chrome.
- **Public job postings** on the web.
- **Optional, only if you turn them on:** a second web inbox in Chrome, and files in code repositories on your linked computer.

## What the plugin stores

- Your profile, tracker and job shortlists are stored as Claude Docs in your own account. You can view, edit or delete them at any time.
- Resume files are created in Claude's private workspace for your session and sent to you in the conversation.
- Nothing is stored anywhere else.

## What the plugin sends

- The plugin sends your data to no service outside your own Claude account and the apps you connected (Gmail, Chrome, Claude Docs).
- It never sends, replies to, archives, deletes or labels email, never applies, messages or withdraws on job sites, and never signs in for you. Those actions happen only if you ask Claude in chat.
- Before building the first resume, Claude installs the open-source `docx` package from the public npm registry into its own workspace. Your data is not sent with that download.

## Sensitive details

During setup, Claude asks before saving sensitive personal details (such as veteran status or disability) and saves them only if you want them used. The plugin never saves government ID numbers, bank details or passwords.

## Children

Focused Job Hunt is not designed for anyone under 18.

## Your data in Claude

How Anthropic handles your conversations and connected apps is covered by Anthropic's own privacy policy at https://www.anthropic.com/legal/privacy.

## Changes and contact

Changes to this policy are recorded in this file's history on GitHub. For questions, open an issue at https://github.com/melissapula/focused-job-hunt/issues.
