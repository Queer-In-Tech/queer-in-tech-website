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
import "./Gallery.scss"
import { useLocation } from "react-router-dom";
import { GALLERY_DATA } from "../../constants/gallery";

export const GalleryEvent = () => {
    const location = useLocation();
    const eventKey = location.pathname.split("/gallery/")[1];
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(-1);

    const eventData = GALLERY_DATA.find(event => event.key === eventKey)

    useEffect(() => {
        const loadImages = async () => {
            if (!eventData) {
                console.error(`Event with key ${eventKey} not found in GALLERY_DATA`);
                setLoading(false);
                return;
            }

            // http://localhost:5173/gallery/Leeds-EventName2_2024-01-01

            const imagePromises: Promise<Photo>[] = [];

            for (const imgPath of eventData.photos) {
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
        <div className="gallery-title">{eventData?.title}</div>
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
