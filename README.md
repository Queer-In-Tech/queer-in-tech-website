# Queer in tech website

The website is written in typescript with React. 

## Branching and deployment strategy (required)
`main` is a protected branch. **Do not push directly to `main`.**

Standard workflow (always required):
1. Start from latest `main`: `git checkout main && git pull origin main`
2. Create a feature branch: `git checkout -b feature/short-description`
3. Commit your changes on that branch
4. Push branch: `git push -u origin feature/short-description`
5. Open a PR: `feature/short-description` -> `main`

Optional pre-merge test on dev (`test.queerintech.org`):
1. From your feature branch, force-push to remote `dev`: `git push --force-with-lease origin HEAD:dev`
2. Wait for the GitHub Action deploy job on `dev` to complete
3. Verify your changes on `https://test.queerintech.org`
4. Update local `main`: `git checkout main && git pull origin main`
5. Reset `dev` back to `main`: `git push --force-with-lease origin main:dev`

## Running the app
To run the app, open it up and run:
`npm i`
`npm run dev`

`npm run dev` now runs `npm run gallery:build` first so `src/constants/gallery.generated.ts` and gallery derivatives are up to date before Vite starts.

## Shared constants (links and routes)
To avoid duplication, static links and routes are stored in constants and imported where needed.

- External links (Discord, Meetup, LinkedIn, forms, event links, etc.): `src/constants/links.ts`
- Internal app routes (`/`, `/gallery`, `/contact`, etc.): `src/constants/routes.ts`

When adding or updating a URL:
1. Update/add the value in `src/constants/links.ts`
2. Import and use the constant in the page/component instead of hardcoding
3. Run a quick build check: `npm run build`

## Adding your content
### Changing team photos
Team photos live in `./public/people` and are mapped in `src/constants/team.ts`.

You can either:
1. Replace an existing file (for example `./public/people/dmitry.jpeg`), or
2. Add a new file in `./public/people` and update that person's `image` value in `src/constants/team.ts`.

Use `.jpeg` where possible to keep file sizes smaller.

### Adding gallery images
The gallery now uses a source pipeline:

- Source uploads live in `./gallery-source` (full-resolution originals).
- Generated, optimized assets are written to `./public/gallery-images`.
- `./public/gallery-images` is generated build output and is gitignored.

#### Folder naming rules (required)
1. Chapter folder: lowercase kebab-case and currently only `manchester`, `leeds`, or `other`
2. Event folder: `YYYY-MM-DD--event-name` (for example `2026-02-10--flutter`)
3. Inside each event folder, add your original images (`.jpg`, `.jpeg`, `.png`, `.heic`)

Example:
`./gallery-source/manchester/2025-06-12--kraken`

#### Gallery build workflow
Use the path that matches what you need:

1. Gallery-only generation (fast local check)
   Run `npm run gallery:build`
   This incrementally regenerates only changed images and keeps a build-state manifest at `public/gallery-images/.build-manifest.json`.
   Generated derivatives include:
   - AVIF full: `img-001-full.avif`
   - JPEG fallback (max 1920px wide): `img-001-fallback.jpg`
   - AVIF thumbnail (max 640px wide): `img-001-thumb.avif`
   - JPEG thumbnail (max 640px wide): `img-001-thumb.jpg`
   It also regenerates `src/constants/gallery.generated.ts`.

2. Full local end-to-end build
   Run `npm run build`
   This already includes `npm run gallery:build`, then `npm run build:app` (TypeScript + Vite production build).

3. Deployment builds (no local build required)
   If you deploy via `dev` or `main`, GitHub Actions runs:
   - `npm ci` with npm cache enabled
   - restore of cached `public/gallery-images`
   - `npm run gallery:build` on every run (incremental; reuses cached derivatives when unchanged)
   - `npm run build:app` on every run
   Gallery cache keys are derived from `gallery-source/**`, `scripts/generateGalleryData.js`, and `package-lock.json`.
   Use the commands in the "Branching and deployment strategy" section above for the exact `dev` and `main` flow.
