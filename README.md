# LAD Car Rentals

Next.js (App Router) + TypeScript + Tailwind v4, statically exported to `out/`.

- `npm run dev`: local dev server
- `npm run build`: optimises images, then exports the static site to `out/` (deploy to Vercel or Netlify)

Edit content (fleet, locations, contact details, messages) in `src/content.ts`.
Source images live in `assets-src/`. The build turns them into responsive WebP files in `public/img/`.
Set `NEXT_PUBLIC_SITE_URL` (or `site.url` in content.ts) to the production domain before launch.
