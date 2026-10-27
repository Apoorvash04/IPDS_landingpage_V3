# IP & Data Solutions website

Next.js 16 (App Router) · React 19 · TypeScript · GSAP + Lenis for animation.

## Commands

```bash
npm install        # first time only
npm run dev        # development server → http://localhost:3000
npm run build      # production build
npm start          # serve the production build on port 3000
npm run typecheck  # TypeScript check
```

The npm scripts call Node directly (`node node_modules/...`) because the `&` in the folder name breaks npm's Windows command shims. Keep that pattern when adding scripts.

## Where things live

```
src/
  lib/site.ts               ← ALL company details & page copy (services, FAQs, phones, address…)
  app/
    layout.tsx              ← <html>, fonts, global SEO metadata, nav/footer
    page.tsx                ← home page: lists the sections in order
    globals.css             ← design tokens (:root) + styles, grouped by section
    sitemap.ts / robots.ts / manifest.ts / opengraph-image.tsx   ← generated SEO files
    icon.png / apple-icon.png
  components/
    sections/               ← one file per home-page section (Hero, Services, Faq…)
    layout/                 ← Nav, Footer, Preloader, WhatsApp button
    ui/ArrowButton.tsx      ← shared pill button
    seo/JsonLd.tsx          ← schema.org structured data (LocalBusiness, FAQPage)
    motion/                 ← animation engine (client-only)
public/                     ← logos and static files
legacy/                     ← previous single-file HTML version, for reference only
```

## Common tasks

**Change text, phone numbers, services or FAQs**: edit `src/lib/site.ts`. Metadata, structured data and the sitemap update automatically.

**Add a section to the home page**: create `src/components/sections/MySection.tsx` (a server component), then add it to `src/app/page.tsx`. Use the built-in animation hooks, which need no JavaScript of your own:

| Attribute / class | Effect |
| --- | --- |
| `data-up` | fades up when scrolled into view |
| `data-split` (on a heading) | words rise from a mask |
| `data-card` | card pop-in, staggered |
| `className="magnetic"` | element follows the cursor |

**Add a new page** (e.g. `/services/backup`): create `src/app/services/backup/page.tsx`, export a `metadata` object with its own `title` and `description` (the title template appends the company name), and add the path to `routes` in `src/app/sitemap.ts`. Nav, footer and animations are shared automatically.

**Live domain**: set `NEXT_PUBLIC_SITE_URL` (defaults to `https://ipds.co.in`) so canonical URLs, the sitemap and social previews point to the right place.

## Notes

- All page text is server-rendered into the HTML, so search engines can read it. Animations only enhance it after load.
- Visitors with "reduce motion" switched on in their OS still get fades, but no smooth-scroll, pinned horizontal scroll or scroll-speed effects.
- The contact form currently opens the visitor's email app (see `ContactForm.tsx`). To receive submissions directly, swap in an API route or a server action.
