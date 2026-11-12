# Platform notes

Examples that have worked for fetching listings. Build every parameter from the user's profile (country, field, pay floor); the values below are illustrations for one US software search, not defaults. Sites change; if a method stops working, read the visible page instead.

Read pages one at a time as a person would. Don't call sites' private or undocumented APIs, and don't run background request loops.

- **LinkedIn Jobs:** use the normal search page with its filters (Remote, Date posted: past week, location, and salary where offered) and open each listing to read the full description. The location and filters appear in the URL after a search, so you can adjust them there.
- **Built In** (US tech): search `/jobs/remote/<category>?search=<q>&daysSinceUpdated=7&page=<n>` (for example `dev-engineering`, `data-analytics`, `product`); cards are `[data-id="job-card"]`. Job pages carry a JSON-LD `JobPosting` with the full description. The applied-jobs view is the Application Tracker at `/?application-tracker#application-tracker`.
- **Indeed:** results load, but full listings often hit a Cloudflare check. Don't complete it; list the role and let the user open it. Signed-in applied list: `https://myjobs.indeed.com/applied`; messages: `https://messages.indeed.com/conversations`.
- **Glassdoor:** the applied-jobs page often fails to load; fall back to Glassdoor emails.
- **Wellfound** (startups): `/jobs` respects the user's saved search; applications at `/jobs/applications`, messages at `/jobs/messages`. Note each startup's stage and size.
- **Many company and board pages** carry a JSON-LD `JobPosting` script with the full description, pay and location; reading it is more reliable than the visible layout.
- **State and government job banks:** mostly public-sector or on-site roles; filter hard on the user's work arrangement.
- **Veteran boards** (for example Hire Heroes USA, Hiring Our Heroes, RecruitMilitary) often need an account; when not signed in, list upcoming virtual hiring events instead.
- **Title noise:** broad titles pull in other fields (for example "design engineer" returns mechanical roles, "nurse educator" returns sales roles). Drop roles outside the user's field.
