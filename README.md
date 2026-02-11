# Queer in tech website

The website is written in typescript with React. 

## Branching strategy (required)
`main` is a protected branch. **Do not push directly to `main`.**

All code changes must go through a pull request into `main`:
1. Start from latest `main`: `git checkout main && git pull origin main`
2. Create a branch: `git checkout -b feature/short-description`
3. Commit your changes on that branch
4. Push branch: `git push -u origin feature/short-description`
5. Open a PR: `feature/short-description` -> `main`

## Running the app
To run the app, open it up and run:
`npm i`
`npm run dev`

## Adding your content
### Changing your about us picture
Open up `./public/{yourname.jpg}` and replace that image.

### Adding gallery images
You can add your images to the folder `./public/gallery-images`.
To get them appearing on the gallery page you need to go to `Gallery.tsx`, and add your image names to the `imagePaths` array.

#### Compress your images!
Please compress the images so they load in quickly. 

<details>
<summary>To do this quickly on mac</summary>
  
  Open your folder in finder with the images in and highlight them all, then right click, go to quick actions and press convert image. 
  In here, select jpeg and then image size medium.

<img width="448" height="223" alt="Screenshot 2025-09-01 at 22 07 35" src="https://github.com/user-attachments/assets/b209af97-3e94-4f2c-b951-9d8097085d11" />

</details>

#### Rename your images
I've renamed mine to be gallery-image-{index} to make things easier. Feel free to do the same. 

<details>
<summary>To do this quickly on mac</summary>
  
  Open your folder in finder with the images in and highlight them all, then right click and press rename. 
  Select Format, then set custom format to 'gallery-image-' and start numbers at, continuing from where they left off in that folder.
  
  <img width="513" height="168" alt="Screenshot 2025-09-01 at 21 50 43" src="https://github.com/user-attachments/assets/222460e2-9bd9-4191-9df7-5c0e62f8178c" />

</details>
