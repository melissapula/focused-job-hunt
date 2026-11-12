# Job Application Tracker layout

Create a Claude Doc titled **Job Application Tracker** with:

1. Byline: as-of date chip (the last update date; every tracker run after the first uses it as the search cutoff) and the user mention.
2. **Summary** paragraph: total applications, rejected or closed (with company names), withdrawn, viewed, interviewing, offers. Always recount from the tables, never increment.
3. A one-line sources note: which sources the tracker covers (inboxes, job sites), any that couldn't be checked last run, and "Last tracker run: none" (the tracker skill replaces it with a date after each run).
4. **Heard back** table: Date | Company | Role | What they said | Next step. Newest first.
5. **All applications** table: Date | Company | Role (with pay and remote details) | Applied via | Status. Status is a dropdown with options, in this order: Applied, Received, Viewed, Interviewing, Offer, Rejected, Closed, Withdrawn. Create the dropdown enum in the same batch as the doc.
   - **Applied:** only the job site confirmed it. **Received:** the employer emailed a confirmation.
   - **Viewed:** the employer opened it. **Interviewing:** any screen, assessment or interview.
   - **Offer**, **Rejected**, **Closed** (posting closed or filled without a decision on the user), **Withdrawn** (the user withdrew).
   - Status only moves forward (Applied → Received → Viewed → Interviewing → Offer), except that Rejected, Closed or Withdrawn can follow any status.
6. **Recruiter outreach and leads** table: Date | From | Opportunity | Status (including "Not a fit: …" for scams and roles outside the profile's target roles or filters).
7. **Follow-ups** checklist: anything with a deadline or a reply owed. Tick items when done.
