import { Link } from "react-router-dom";
import type { GalleryImageData, GalleryEventLocationState } from "../../constants/gallery";
import { GalleryPicture } from "./GalleryPicture";
import { formatEventDate } from "../../utils/formatEventDate";
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

export const GallerySection = (props: GallerySectionProps) => {
  const displayDirection = props.index % 2 === 0 ? "row" : "row-reverse";

  const state: GalleryEventLocationState = {
    fromChapter: props.selectedChapter,
    fromScrollY: window.scrollY,
    fromRoute: props.backRoute,
  };

  return (
    <Link
      to={`/gallery/${props.imageKey}`}
      state={state}
      className="gallery-section-container"
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
        {props.eventTitle} - {formatEventDate(props.eventDate)}
      </div>
    </Link>
  );
};
