# LyricMarket — mobile-first prototype

## Included files
- `index.html` — website structure
- `styles.css` — responsive styling
- `script.js` — search, genre/mood filters, demo listing details, and local submission-file generation

## Important limitations
This is a static front-end prototype. It does not have a database, user accounts, a moderation dashboard, server-side storage, checkout, escrow, automated payouts, or email delivery. The sample listings are fictional demonstrations and must not be presented as real offers. The submission form creates a `.txt` file on the visitor's device; it does not send or store submissions.

## Before public launch
1. In `script.js`, replace `REPLACE-WITH-YOUR-EMAIL@example.com` with a real contact email you control.
2. In `index.html`, replace the `mailto:REPLACE-WITH-YOUR-EMAIL@example.com` links with the same email.
3. Replace fictional demo listings with original lyrics whose writers have given permission for publication.
4. Add real terms, privacy information, copyright/reporting procedures, and clear licence terms.
5. Test on an Android phone and ask a few people to test search, filters, listing details, and the submission download.
6. Deploy the folder using a free static host such as Cloudflare Pages or GitHub Pages. Host-provider instructions and free-plan limits may change.

## Quick test on a phone
Open `index.html` in a browser if your file manager supports local HTML. For best testing and a shareable URL, deploy the files to a static host.

## Suggested next version
Add a backend such as Supabase only after the first version gets genuine interest. Use proper access rules, moderation, backups, and server-side validation. Do not put secret API keys in front-end JavaScript.
