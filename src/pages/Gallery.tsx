import { type Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const loadImages = async () => {
            // Get a list of all image files in the public/gallery-images directory
            // In Vite, public folder files are served at the root path
            const imagePaths = [

                //Sorry I know I've left it a bit untidy I was rushing it before MTFest I'll tidy it up after the festival!


                //"/gallery-images/gallery-image-1.jpeg",
                //"/gallery-images/gallery-image-3.jpeg",
                // "/gallery-images/gallery-image-4.jpeg",
                // "/gallery-images/gallery-image-5.jpeg",
                // "/gallery-images/gallery-image-7.jpeg",
                // "/gallery-images/gallery-image-8.jpeg",
                // "/gallery-images/gallery-image-9.jpeg",
                // "/gallery-images/gallery-image-10.jpeg",
                // "/gallery-images/gallery-image-11.jpeg",
                // "/gallery-images/gallery-image-12.jpeg",
                // "/gallery-images/gallery-image-13.jpeg",
                // "/gallery-images/gallery-image-14.jpeg",
                // "/gallery-images/gallery-image-15.jpeg",
                // "/gallery-images/gallery-image-16.jpeg",
                // "/gallery-images/gallery-image-17.jpeg",
                // "/gallery-images/gallery-image-18.jpeg",
                // "/gallery-images/gallery-image-19.jpeg",
                // "/gallery-images/gallery-image-20.jpeg",
                // "/gallery-images/gallery-image-21.jpeg",
                // "/gallery-images/gallery-image-22.jpeg",
                // "/gallery-images/gallery-image-23.jpeg",
                // "/gallery-images/gallery-image-24.jpeg",
                // "/gallery-images/gallery-image-25.jpeg",
                // "/gallery-images/gallery-image-26.jpeg",
                // "/gallery-images/gallery-image-27.jpeg",
                // "/gallery-images/gallery-image-28.jpeg",
                // "/gallery-images/gallery-image-29.jpeg",
                "/gallery-images/dmitri-gallery-image-1.jpeg",
                "/gallery-images/dmitri-gallery-image-2.jpeg",
                "/gallery-images/gallery-image-2.jpeg",
                "/gallery-images/gallery-image-6.jpeg",
                "/gallery-images/dmitri-gallery-image-3.jpeg",
                "/gallery-images/dmitri-gallery-image-4.jpeg",
                "/gallery-images/dmitri-gallery-image-5.jpeg",
                "/gallery-images/dmitri-gallery-image-6.jpeg",
                "/gallery-images/dmitri-gallery-image-7.jpeg",
                "/gallery-images/dmitri-gallery-image-8.jpeg",
                "/gallery-images/dmitri-gallery-image-9.jpeg",
                "/gallery-images/dmitri-gallery-image-10.jpeg",
                "/gallery-images/dmitri-gallery-image-11.jpeg",
                "/gallery-images/dmitri-gallery-image-12.jpeg",
                "/gallery-images/dmitri-gallery-image-13.jpeg",
                "/gallery-images/dmitri-gallery-image-14.jpeg",
                "/gallery-images/dmitri-gallery-image-15.jpeg",
                "/gallery-images/dmitri-gallery-image-16.jpeg",
                "/gallery-images/dmitri-gallery-image-17.jpeg",
                "/gallery-images/dmitri-gallery-image-18.jpeg",
                "/gallery-images/dmitri-gallery-image-19.jpeg",
                "/gallery-images/dmitri-gallery-image-20.jpeg",
                "/gallery-images/dmitri-gallery-image-21.jpeg",
                "/gallery-images/dmitri-gallery-image-22.jpeg",
                "/gallery-images/dmitri-gallery-image-23.jpeg",
                "/gallery-images/dmitri-gallery-image-24.jpeg",
                "/gallery-images/dmitri-gallery-image-25.jpeg",
                "/gallery-images/dmitri-gallery-image-26.jpeg"
                // Add more image paths as needed
            ];

            const imagePromises: Promise<Photo>[] = [];

            for (const imgPath of imagePaths) {
                // Create a promise to load each image and get its dimensions
                const promise = new Promise<Photo>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve({
                            src: imgPath,
                            width: img.naturalWidth,
                            height: img.naturalHeight,
                        });
                    };
                    // Handle error case by providing default dimensions
                    img.onerror = () => {
                        console.error(`Failed to load image: ${imgPath}`);
                        resolve({
                            src: imgPath,
                            width: 1000,
                            height: 750,
                        });
                    };
                    // Set the source to load the image
                    img.src = imgPath;
                });
                imagePromises.push(promise);
            }

            // Wait for all images to load and get their dimensions
            const loadedPhotos = await Promise.all(imagePromises);
            setPhotos(loadedPhotos);
            setLoading(false);
        };

        loadImages();
    }, []);

    if (loading) {
        return <div className="gallery-page">Loading gallery...</div>;
    }

    return <div className="gallery-page">
        <RowsPhotoAlbum photos={photos} targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

        <Lightbox
            slides={photos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
    </div>;
}
