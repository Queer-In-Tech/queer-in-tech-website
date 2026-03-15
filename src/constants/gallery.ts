import type { GalleryEventData, GalleryImageData } from "./gallery.generated";

export {
  GALLERY_DATA,
  type GalleryEventData,
  type GalleryImageData,
} from "./gallery.generated";

export interface GalleryImagePaths {
  avif: {
    full: string;
    thumb: string;
  };
  jpeg: {
    fallback: string;
    thumb: string;
  };
}

function normalizeAssetBasePath(assetBasePath: string) {
  return assetBasePath.endsWith("/") ? assetBasePath : `${assetBasePath}/`;
}

export function buildGalleryImagePaths(
  assetBasePath: string,
  imageId: string,
): GalleryImagePaths {
  const normalizedBasePath = normalizeAssetBasePath(assetBasePath);
  const basePath = `${normalizedBasePath}${imageId}`;

  return {
    avif: {
      full: `${basePath}-full.avif`,
      thumb: `${basePath}-thumb.avif`,
    },
    jpeg: {
      fallback: `${basePath}-fallback.jpg`,
      thumb: `${basePath}-thumb.jpg`,
    },
  };
}

export interface GalleryEventLocationState {
  fromChapter?: string;
  fromScrollY?: number;
  fromRoute?: string;
}

export function buildGalleryImagePathsForEvent(
  event: Pick<GalleryEventData, "assetBasePath">,
  image: Pick<GalleryImageData, "id">,
): GalleryImagePaths {
  return buildGalleryImagePaths(event.assetBasePath, image.id);
}
