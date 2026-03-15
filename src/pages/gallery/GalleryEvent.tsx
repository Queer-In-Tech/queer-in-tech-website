import { type Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useMemo, useState, type CSSProperties } from "react";
import Lightbox from "yet-another-react-lightbox";
import type { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  buildGalleryImagePathsForEvent,
  GALLERY_DATA,
  type GalleryImageData,
} from "../../constants/gallery";
import { ROUTES } from "../../constants/routes";
import { GalleryPicture } from "./GalleryPicture";
import "./GalleryEvent.scss";

interface GalleryAlbumPhoto extends Photo {
  image: GalleryImageData;
}

interface GalleryEventLocationState {
  fromChapter?: string;
  fromScrollY?: number;
  fromRoute?: string;
}

interface GalleryOverviewLocationState {
  restoreChapter?: string;
  restoreScrollY?: number;
}

function formatEventDate(date: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const GalleryEvent = () => {
  const { event: eventKey = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(-1);

  const locationState = location.state as GalleryEventLocationState | null;

  const eventData = useMemo(
    () => GALLERY_DATA.find((event) => event.key === eventKey),
    [eventKey],
  );

  const photos = useMemo<GalleryAlbumPhoto[]>(() => {
    if (!eventData) {
      return [];
    }

    return eventData.images.map((image) => ({
      src: buildGalleryImagePathsForEvent(eventData, image).jpeg.fallback,
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
      src: buildGalleryImagePathsForEvent(eventData, image).jpeg.fallback,
      width: image.width,
      height: image.height,
      alt: image.alt,
    }));
  }, [eventData]);

  const imageByFallback = useMemo(() => {
    if (!eventData) {
      return new Map<string, GalleryImageData>();
    }

    return new Map(
      eventData.images.map((image) => [
        buildGalleryImagePathsForEvent(eventData, image).jpeg.fallback,
        image,
      ]),
    );
  }, [eventData]);

  const navigateBackToOverview = () => {
    const targetRoute = locationState?.fromRoute || ROUTES.gallery;

    const restoreState: GalleryOverviewLocationState | undefined =
      typeof locationState?.fromScrollY === "number" || locationState?.fromChapter
        ? {
          restoreChapter: locationState?.fromChapter,
          restoreScrollY: locationState?.fromScrollY,
        }
        : undefined;

    if (restoreState) {
      navigate(targetRoute, { state: restoreState });
      return;
    }

    navigate(targetRoute);
  };

  if (!eventData) {
    return (
      <div className="gallery-page">
        <div className="gallery-event-header">
          <button
            type="button"
            className="gallery-back-button"
            onClick={navigateBackToOverview}
          >
            Back to events
          </button>
          <h1 className="gallery-event-title">Event not found</h1>
        </div>
      </div>
    );
  }
  const rowHeight =
    photos.length <= 3 ? 220 :
      photos.length <= 10 ? 320 :
        150;

  return (
    <div className="gallery-page">
      <div className="gallery-event-header">
        <button
          type="button"
          className="gallery-back-button"
          onClick={navigateBackToOverview}
        >
          Back to events
        </button>
        <h1 className="gallery-event-title">{eventData.title}</h1>
        <p className="gallery-event-meta">
          {eventData.chapter} · {formatEventDate(eventData.date)}
        </p>
      </div>

      <RowsPhotoAlbum<GalleryAlbumPhoto>
        photos={photos}
        targetRowHeight={rowHeight}
        onClick={({ index: clickedIndex }) => setIndex(clickedIndex)}
        render={{
          image: (props, { photo }) => (
            <GalleryPicture
              image={photo.image}
              assetBasePath={eventData.assetBasePath}
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
          slide: ({ slide, rect }) => {
            const image = imageByFallback.get(slide.src);

            if (!image) {
              return null;
            }

            const isPortrait = image.height > image.width;
            const imageStyle: CSSProperties = isPortrait
              ? {
                height: `${rect.height}px`,
                width: "auto",
                maxHeight: `${rect.height}px`,
                maxWidth: `${rect.width}px`,
              }
              : {
                width: `${rect.width}px`,
                height: "auto",
                maxWidth: `${rect.width}px`,
                maxHeight: `${rect.height}px`,
              };

            return (
              <div className="gallery-lightbox-slide">
                <GalleryPicture
                  image={image}
                  assetBasePath={eventData.assetBasePath}
                  alt={image.alt}
                  className="gallery-lightbox-image"
                  style={imageStyle}
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
