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
            // Gallery assets live in public/gallery-images and follow gallery-image-N.jpeg naming.
            const imageCount = 62; // Keep in sync with files in public/gallery-images
            const imagePaths = Array.from({ length: imageCount }, (_, idx) =>
                `/gallery-images/gallery-image-${idx + 1}.jpeg`
            );

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
