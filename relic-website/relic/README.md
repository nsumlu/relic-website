# RELIC — A New Form of the Flame

Launch website for **RELIC No. 001**, a collectible lighting object in sculptural aged brass and handcrafted
amber glass. Built with React, Vite, TypeScript and Tailwind CSS.

> The photography and film are conceptual visualisations. The site makes no claims about specifications,
> pricing, availability, certifications or manufacturing — keep it that way unless verified information is supplied.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to ./dist
npm run preview    # serve the production build locally
```

Requires Node.js 18.18+ (20 recommended).

## Project structure

```
brand/                 Logo SVGs (wordmark, lockup, monogram, favicon) + brand guide (RELIC_brand_guide.html)
public/
  favicon.svg
  media/img/           Optimised WebP images, <key>-<width>.webp (never upscaled)
  media/video/         relic-hero.mp4 (muted), relic-film.mp4 (with audio), posters
  media/og-image.jpg   1200×630 social preview
src/
  components/          Header, Hero, ObjectSection, Story, Craft, Film, VideoPlayer, Gallery, Lightbox, Closing, Footer
  components/Logo.tsx  Wordmark + Monogram as inline SVG (same path data as /brand)
  data/media.ts        Single source for image metadata, alt text, captions, video paths, contact + nav
  hooks/               useReducedMotion, useRevealOnScroll
  styles/index.css     Tailwind layers, reveal/hero motion, lightbox, scrubber
.github/workflows/deploy.yml   GitHub Pages deployment
```

## Editing content

* **Images, alt text, captions:** `src/data/media.ts`. Each key points at `public/media/img/<key>-<width>.webp`.
* **Adding an image:** export WebP widths (e.g. 480 / 800 / native) into `public/media/img`, then add an entry to `IMAGES`.
* **Contact:** `CONTACT` in `src/data/media.ts`. Only a verified email is published; no social accounts, store or
  portfolio links exist yet. Add them to `CONTACT`/`Footer.tsx` once confirmed.
* **Concept disclaimer:** the footer sentence in `src/components/Footer.tsx`.
* **Palette & type:** `tailwind.config.js` (colours, fonts). Fonts (Cormorant Garamond, Inter — both SIL Open Font
  License) are self-hosted through `@fontsource`, so no third-party font requests are made.

## Deploying to GitHub Pages

1. Create a GitHub repository (e.g. `relic`) and push this project to `main` (steps below).
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds with
   `VITE_BASE=/<repo-name>/` and `VITE_SITE_URL=https://<owner>.github.io/<repo-name>` and publishes `dist`.

Using a custom domain or a `<owner>.github.io` repository (served from `/`)? Set `VITE_BASE=/` and
`VITE_SITE_URL=https://your-domain` in the workflow's `env`.

### Create and push the repository manually

```bash
cd relic
git init -b main
git add .
git commit -m "RELIC website"
# Create an empty repo on github.com first (private or public), then:
git remote add origin https://github.com/<your-username>/relic.git
git push -u origin main
```

Or with the GitHub CLI: `gh repo create relic --public --source=. --remote=origin --push`
(use `--private` for a private repo; note that GitHub Pages on private repos needs a paid plan).

Tip: after the first `npm install`, commit the generated `package-lock.json` so CI installs are reproducible.

### Hosting limits worth knowing

* GitHub Pages: published site ≤ 1 GB, soft bandwidth ≈ 100 GB/month, individual files ≤ 100 MB. This site is
  about 5 MB in total, so it is comfortably inside every limit.
* The two videos are 1.3 MB (hero) and 1.8 MB (film). Pages does not transcode or adaptively stream video; if you add
  longer or higher-resolution films, host them on a video CDN (Cloudflare Stream, Mux, Bunny) and point the `src`
  values in `src/data/media.ts` at them. Pages serves video with HTTP range requests, so seeking works.

## Accessibility & performance

* Semantic landmarks, skip link, keyboard-operable menu, gallery viewer (native `<dialog>`, ←/→/Esc) and video player.
* `prefers-reduced-motion`: reveals, hero text animation and slow image drift are disabled; the hero film does not
  autoplay (a Play control is offered). The hero film can always be paused.
* Images carry intrinsic width/height (no layout shift), responsive `srcset`, and lazy-load below the fold.
  The film video loads metadata only until played.
* The film player shows a caption toggle only when a captions track exists. **The film has an audio track; if it contains
  speech, add a WebVTT file and a `<track kind="captions">` in `VideoPlayer.tsx`.** A written scene description is
  provided as a text alternative.

## Asset notes

* Source images are portrait, ~1.1 k px wide, and are shown at native proportions without upscaling or cropping
  (except three deliberate macro details in *Material & Craft*, cropped at native resolution).
* The hero and film use `relic_video_amber_glow.mp4`, the clip whose product design best matches the stills. The other two
  supplied clips show a visibly different glass body and were not used.
* Verify you hold the rights to all media before commercial publication.
