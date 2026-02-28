import { type Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import type { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useParams } from "react-router-dom";
import { GALLERY_DATA, type GalleryImageData } from "../../constants/gallery";
import { GalleryPicture } from "./GalleryPicture";
import "./GalleryEvent.scss";

interface GalleryAlbumPhoto extends Photo {
  image: GalleryImageData;
}

export const GalleryEvent = () => {
  const { event: eventKey = "" } = useParams();
  const [index, setIndex] = useState(-1);

  const eventData = useMemo(
    () => GALLERY_DATA.find((event) => event.key === eventKey),
    [eventKey],
  );

  const photos = useMemo<GalleryAlbumPhoto[]>(() => {
    if (!eventData) {
      return [];
    }

    return eventData.images.map((image) => ({
      src: image.jpeg.fallback,
      width: image.width,
      height: image.height,
      image,
    }));
  }, [eventData]);

  const slides = useMemo<SlideImage[]>(() => {
    if (!eventData) {
      return [];
    }

    return eventData.images.map((image) => ({
      src: image.jpeg.fallback,
      width: image.width,
      height: image.height,
      alt: image.alt,
    }));
  }, [eventData]);

  const imageByFallback = useMemo(() => {
    if (!eventData) {
      return new Map<string, GalleryImageData>();
    }

    return new Map(eventData.images.map((image) => [image.jpeg.fallback, image]));
  }, [eventData]);

  if (!eventData) {
    return <div className="gallery-page">Event not found.</div>;
  }

  return (
    <div className="gallery-page">
      <div className="gallery-title">{eventData.title}</div>

      <RowsPhotoAlbum<GalleryAlbumPhoto>
        photos={photos}
        targetRowHeight={150}
        onClick={({ index: clickedIndex }) => setIndex(clickedIndex)}
        render={{
          image: (props, { photo }) => (
            <GalleryPicture
              image={photo.image}
              alt={photo.image.alt}
              className={props.className}
              style={props.style}
              sizes={props.sizes}
              onClick={props.onClick}
              loading={props.loading}
              decoding={props.decoding}
              draggable={props.draggable}
              referrerPolicy={props.referrerPolicy}
            />
          ),
        }}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails]}
        render={{
          slide: ({ slide }) => {
            const image = imageByFallback.get(slide.src);

            if (!image) {
              return null;
            }

            return (
              <div className="gallery-lightbox-slide">
                <GalleryPicture
                  image={image}
                  alt={image.alt}
                  className="gallery-lightbox-image"
                  sizes="100vw"
                  loading="eager"
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
};
