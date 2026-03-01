import { useNavigate } from "react-router-dom";
import type { GalleryImageData } from "../../constants/gallery";
import { GalleryPicture } from "./GalleryPicture";
import "./GallerySection.scss";

interface GallerySectionProps {
  imageKey: string;
  eventTitle: string;
  eventDate: string;
  assetBasePath: string;
  allImages: GalleryImageData[];
  index: number;
  selectedChapter: string;
  backRoute: string;
}

interface GalleryEventLocationState {
  fromChapter?: string;
  fromScrollY?: number;
  fromRoute?: string;
}

export const GallerySection = (props: GallerySectionProps) => {
  const displayDirection = props.index % 2 === 0 ? "row" : "row-reverse";
  const navigate = useNavigate();

  const navigateToGallery = () => {
    const state: GalleryEventLocationState = {
      fromChapter: props.selectedChapter,
      fromScrollY: window.scrollY,
      fromRoute: props.backRoute,
    };

    navigate(`/gallery/${props.imageKey}`, { state });
  };

  const parsedDate = new Date(props.eventDate);
  const displayDate = Number.isNaN(parsedDate.getTime())
    ? props.eventDate
    : parsedDate.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <button
      type="button"
      className="gallery-section-container"
      onClick={navigateToGallery}
    >
      <div
        className="gallery-section-images-container"
        style={{ flexDirection: displayDirection }}
      >
        {props.allImages.length > 1 ? (
          <div className="gallery-section-small-images-container">
            {props.allImages[1] ? (
              <GalleryPicture
                className="gallery-section-small-image"
                image={props.allImages[1]}
                assetBasePath={props.assetBasePath}
                sizes="100px"
              />
            ) : null}
            {props.allImages[2] ? (
              <GalleryPicture
                className="gallery-section-small-image"
                image={props.allImages[2]}
                assetBasePath={props.assetBasePath}
                sizes="100px"
              />
            ) : null}
          </div>
        ) : null}
        {props.allImages[0] ? (
          <GalleryPicture
            className="gallery-section-large-image"
            image={props.allImages[0]}
            assetBasePath={props.assetBasePath}
            sizes="200px"
            loading="eager"
          />
        ) : null}
      </div>
      <div className="gallery-section-title">
        {props.eventTitle} - {displayDate}
      </div>
    </button>
  );
};
