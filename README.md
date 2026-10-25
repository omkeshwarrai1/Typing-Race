# Typing Race — SEO-ready starter

A responsive Next.js typing race game with a typing test landing page, a practice guide, metadata, canonical URLs, JSON-LD WebApplication structured data, sitemap and robots.txt.

## Requirements
- Node.js 20.19+ (or a current supported LTS)
- A GitHub account (recommended for deployments)
- A free Vercel account

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

Build check:
```bash
npm run build
```

## Deploy to Vercel for a free subdomain
1. Create a GitHub repository and upload this project (do not upload `node_modules` or `.next`).
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import your GitHub repository. Vercel should detect Next.js automatically.
4. Before the first production deployment, you can leave `NEXT_PUBLIC_SITE_URL` unset temporarily. Deploy and note the assigned `https://your-project.vercel.app` domain.
5. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_SITE_URL` with the exact public origin, e.g. `https://typing-race-game.vercel.app` (no trailing slash). Apply it to Production and redeploy.
6. Verify `https://YOUR-DOMAIN.vercel.app/`, `/typing-test`, `/typing-practice`, `/sitemap.xml`, and `/robots.txt` load publicly.

## Google Search Console
1. Open https://search.google.com/search-console/ and choose **URL prefix**.
2. Enter the exact deployed HTTPS URL, e.g. `https://your-project.vercel.app/`.
3. Use the HTML tag verification method if offered: add the provided verification meta tag in `app/layout.tsx` inside `metadata` (`verification: { google: 'YOUR_TOKEN' }`), redeploy, then click Verify. Alternatively use another offered verification method.
4. In Search Console → Sitemaps, submit `https://your-project.vercel.app/sitemap.xml`.
5. Use URL Inspection for the homepage, `/typing-test`, and `/typing-practice`, and request indexing.
6. Check Page indexing and Search performance reports over the following weeks.

## Before launch checklist
- [ ] Replace the example site URL by setting `NEXT_PUBLIC_SITE_URL` to the real Vercel production URL.
- [ ] Test typing, difficulty controls, restart, next passage, accuracy and WPM on desktop and mobile.
- [ ] Verify all routes and generated sitemap/robots URLs.
- [ ] Add Search Console verification and submit sitemap.
- [ ] Share the game and create useful original content as the site grows.

## SEO notes
- Each page has its own title, description and canonical URL.
- `app/sitemap.ts` generates `/sitemap.xml`; `app/robots.ts` generates `/robots.txt`.
- The homepage includes WebApplication structured data.
- Keep useful page content visible and unique. Avoid keyword stuffing or doorway pages. Google does not guarantee indexing or rankings, and a new site may take time to appear.
- Personal best is stored in the visitor's browser only. This starter has no accounts, cloud leaderboard or multiplayer backend.
