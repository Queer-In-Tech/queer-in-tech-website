# Queer in tech website

The website is written in typescript with React. 

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

I've renamed mine to be gallery-image-{index} to make things easier. Feel free to do the same. 

<details>
<summary>To do this quickly on mac</summary>
  Open your folder in finder with the images in and highlight them all, then right click and press rename. 
  Select Format, then set custom format to 'gallery-image-' and start numbers at, continuing from where they left off in that folder.
  
  <img width="513" height="168" alt="Screenshot 2025-09-01 at 21 50 43" src="https://github.com/user-attachments/assets/222460e2-9bd9-4191-9df7-5c0e62f8178c" />

</details>
