import type { ImgHTMLAttributes } from "react";
import {
  buildGalleryImagePaths,
  type GalleryImageData,
} from "../../constants/gallery";

interface GalleryPictureProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  image: GalleryImageData;
  assetBasePath: string;
}

function buildSrcSet(candidates: Array<{ src: string; width: number }>): string {
  const uniqueByWidth = new Map<number, string>();

  for (const candidate of candidates) {
    uniqueByWidth.set(candidate.width, candidate.src);
  }

  return [...uniqueByWidth.entries()]
    .sort(([a], [b]) => a - b)
    .map(([width, src]) => `${src} ${width}w`)
    .join(", ");
}

export function GalleryPicture({
  image,
  assetBasePath,
  alt,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  ...imgProps
}: GalleryPictureProps) {
  const imagePaths = buildGalleryImagePaths(assetBasePath, image.id);
  const thumbWidth = Math.min(640, image.width);
  const fallbackWidth = Math.min(1920, image.width);
  const includeThumb = image.width > 640;

  const avifCandidates = includeThumb
    ? [
        { src: imagePaths.avif.thumb, width: thumbWidth },
        { src: imagePaths.avif.full, width: image.width },
      ]
    : [{ src: imagePaths.avif.full, width: image.width }];

  const jpegCandidates = includeThumb
    ? [
        { src: imagePaths.jpeg.thumb, width: thumbWidth },
        { src: imagePaths.jpeg.fallback, width: fallbackWidth },
      ]
    : [{ src: imagePaths.jpeg.fallback, width: fallbackWidth }];

  const resolvedAlt = alt ?? image.alt;

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={buildSrcSet(avifCandidates)}
        sizes={sizes}
      />
      <source
        type="image/jpeg"
        srcSet={buildSrcSet(jpegCandidates)}
        sizes={sizes}
      />
      <img
        {...imgProps}
        src={imagePaths.jpeg.fallback}
        width={image.width}
        height={image.height}
        alt={resolvedAlt}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}
