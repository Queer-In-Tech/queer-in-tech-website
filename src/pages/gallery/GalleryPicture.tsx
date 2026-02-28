import type { ImgHTMLAttributes } from "react";
import type { GalleryImageData } from "../../constants/gallery";

interface GalleryPictureProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  image: GalleryImageData;
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
  alt,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  ...imgProps
}: GalleryPictureProps) {
  const thumbWidth = Math.min(640, image.width);
  const fallbackWidth = Math.min(1920, image.width);
  const includeThumb = image.width > 640;

  const avifCandidates = includeThumb
    ? [
        { src: image.avif.thumb, width: thumbWidth },
        { src: image.avif.full, width: image.width },
      ]
    : [{ src: image.avif.full, width: image.width }];

  const jpegCandidates = includeThumb
    ? [
        { src: image.jpeg.thumb, width: thumbWidth },
        { src: image.jpeg.fallback, width: fallbackWidth },
      ]
    : [{ src: image.jpeg.fallback, width: fallbackWidth }];

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
        src={image.jpeg.fallback}
        width={image.width}
        height={image.height}
        alt={resolvedAlt}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}
