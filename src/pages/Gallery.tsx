import { type Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useEffect, useState } from "react";

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            // Use eager: true to get the actual image URLs
            const allImages = import.meta.glob('/src/gallery-images/*.jpeg', { eager: true });
            const imagePromises: Promise<Photo>[] = [];

            for (const imgPath in allImages) {
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
                        resolve({
                            src: imgPath,
                            width: 1000,
                            height: 750,
                        });
                    };
                    // Set the source to load the image
                    // @ts-expect-error - Vite's import.meta.glob with eager:true returns module with default export
                    img.src = allImages[imgPath].default;
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
        <RowsPhotoAlbum photos={photos} />
    </div>;
}
