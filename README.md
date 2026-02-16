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
Team photos live in `./public` and are mapped in `src/pages/Home.tsx`.

You can either:
1. Replace an existing file (for example `./public/dmitry.jpeg`), or
2. Add a new file in `./public` and update that person's `image` value in `src/pages/Home.tsx`.

Use `.jpeg` where possible to keep file sizes smaller.

### Adding gallery images
1. Find the correct folder under `./public/gallery-images/{chapter-name}/{event-name}_{event-date}`
2. If it doesn't exist, create it in that user flow. 
3. Run `npm run build` to populate the image data file. (alternatively, it's part of the deployment anyway, so you can just commit)
4. Check your event and images appear on the gallery page (you may need to click into the gallery event page to see them)
