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
1. Add images to `./public/gallery-images`.
2. Name files as `gallery-image-N.jpeg` (for example `gallery-image-63.jpeg`).
3. Keep numbering continuous from `1` (no gaps).
4. Update `imageCount` in `src/pages/Gallery.tsx` to match the total number of gallery images.

#### Compress your images!
Please compress images so they load quickly and the page stays fast.

<details>
<summary>To do this quickly on mac</summary>
  
  Open your folder in finder with the images in and highlight them all, then right click, go to quick actions and press convert image. 
  In here, select jpeg and then image size medium.

<img width="448" height="223" alt="Screenshot 2025-09-01 at 22 07 35" src="https://github.com/user-attachments/assets/b209af97-3e94-4f2c-b951-9d8097085d11" />

</details>

#### Rename your images
Use `gallery-image-` as the base name and continue from the current highest number.

<details>
<summary>To do this quickly on mac</summary>
  
  Open your folder in finder with the images in and highlight them all, then right click and press rename. 
  Select Format, then set custom format to 'gallery-image-' and start numbers at, continuing from where they left off in that folder.
  
  <img width="513" height="168" alt="Screenshot 2025-09-01 at 21 50 43" src="https://github.com/user-attachments/assets/222460e2-9bd9-4191-9df7-5c0e62f8178c" />

</details>
