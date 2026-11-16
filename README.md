# Ekalai — Website (v1.0)
Built by WebMint Solutions · HTML5 · CSS3 · Bootstrap 5.3.3 · Anime.js 3.2.2 · Bootstrap Icons 1.11.3

## Folder structure
```
index.html              Single-page website (all 17 sections)
assets/css/style.css    Design system + responsive styles (brand colours & fonts locked)
assets/js/main.js       Animations (Anime.js), tabs, gallery filter, lightbox, carousel, form
assets/img/             All website images (.webp primary + .jpg fallback), logos, favicons, OG image
site.webmanifest        App/icon manifest
robots.txt, sitemap.xml SEO files (domain set to https://ekalaiart.in/)
```

## Before going live
1. **Domain:** if the final domain is not `ekalaiart.in`, find & replace it in `index.html`, `robots.txt` and `sitemap.xml`.
2. **Google Analytics 4:** in `index.html`, uncomment the GA4 block and replace `G-XXXXXXXXXX` with Ekalai's Measurement ID. Events already wired: `whatsapp_click`, `call_click`, `email_click`, `instagram_click`, `form_submit`, `program_view`.
3. **Search Console:** verify the domain and submit `sitemap.xml`.

## Replacing images (e.g. ChatGPT-graded versions)
Keep the same file names. Each image exists as `.webp` (used by browsers) and `.jpg` (fallback) — replace both, or convert your new JPG to WebP with the same name.

## Enquiry form
Static: on submit it validates fields and opens WhatsApp (73584 23062) with all details pre-filled, then shows a thank-you message. No server needed.

## Static placeholders to confirm with the client (after demo)
- Age bands used: 6–8 · 9–12 · 13+ (studio batch times kept as given: 6–8, 8–11, 12–16)
- WorldScape ₹2,500 and Art of Doodling ₹4,800 shown as one-time program fees
- "Beyond the Classroom" cards use available artwork (caricatures, whiteboard art, storyboard) — swap in cinema / book samples when received
- Children's faces in studio photo are softly blurred; student names removed from artworks
