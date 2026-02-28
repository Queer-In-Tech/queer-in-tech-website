import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_ROOT = path.join(__dirname, "../gallery-source");
const GENERATED_ROOT = path.join(__dirname, "../public/gallery-images");
const OUTPUT_FILE = path.join(__dirname, "../src/constants/gallery.generated.ts");

const CHAPTER_LABELS = {
  leeds: "Leeds",
  manchester: "Manchester",
  other: "Other",
};

const ALLOWED_CHAPTERS = new Set(Object.keys(CHAPTER_LABELS));
const CHAPTER_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EVENT_SLUG_REGEX = /^(\d{4}-\d{2}-\d{2})--([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".heic"]);

function isHidden(entryName) {
  return entryName.startsWith(".");
}

function sortNaturally(entries) {
  return [...entries].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
}

function getDirectories(dirPath) {
  return sortNaturally(
    fs
      .readdirSync(dirPath)
      .filter(
        (entry) =>
          !isHidden(entry) &&
          fs.statSync(path.join(dirPath, entry)).isDirectory(),
      ),
  );
}

function getFiles(dirPath) {
  return sortNaturally(
    fs
      .readdirSync(dirPath)
      .filter(
        (entry) =>
          !isHidden(entry) && fs.statSync(path.join(dirPath, entry)).isFile(),
      ),
  );
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getOrientedDimensions(metadata, imagePath) {
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read image dimensions: ${imagePath}`);
  }

  const swapsDimensions = [5, 6, 7, 8].includes(metadata.orientation ?? 1);
  if (swapsDimensions) {
    return { width: metadata.height, height: metadata.width };
  }

  return { width: metadata.width, height: metadata.height };
}

function ensureSupportedFiles(eventDir, files) {
  const unsupported = files.filter(
    (file) => !SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );
  if (unsupported.length > 0) {
    const unsupportedList = unsupported.join(", ");
    throw new Error(
      `Unsupported files in ${eventDir}: ${unsupportedList}. Supported formats: .jpg, .jpeg, .png, .heic`,
    );
  }
}

function validateChapter(chapterSlug) {
  if (!CHAPTER_SLUG_REGEX.test(chapterSlug)) {
    throw new Error(
      `Invalid chapter folder "${chapterSlug}". Use lowercase kebab-case.`,
    );
  }

  if (!ALLOWED_CHAPTERS.has(chapterSlug)) {
    throw new Error(
      `Unknown chapter "${chapterSlug}". Allowed chapters: ${[
        ...ALLOWED_CHAPTERS,
      ].join(", ")}`,
    );
  }
}

function parseEventSlug(eventSlug) {
  const match = eventSlug.match(EVENT_SLUG_REGEX);
  if (!match) {
    throw new Error(
      `Invalid event folder "${eventSlug}". Expected format: YYYY-MM-DD--event-name`,
    );
  }

  return {
    date: match[1],
    eventTitleSlug: match[2],
  };
}

function outputImagePaths(chapterSlug, eventSlug, imageId) {
  const base = `/gallery-images/${chapterSlug}/${eventSlug}/${imageId}`;
  return {
    avif: {
      full: `${base}-full.avif`,
      thumb: `${base}-thumb.avif`,
    },
    jpeg: {
      fallback: `${base}-fallback.jpg`,
      thumb: `${base}-thumb.jpg`,
    },
  };
}

async function generateDerivatives({
  sourceFilePath,
  outputDir,
  imageId,
  chapterSlug,
  eventSlug,
  title,
  index,
}) {
  const metadata = await sharp(sourceFilePath).metadata();
  const dimensions = getOrientedDimensions(metadata, sourceFilePath);
  const imageOutputPaths = outputImagePaths(chapterSlug, eventSlug, imageId);

  const fullAvifPath = path.join(outputDir, `${imageId}-full.avif`);
  const fallbackJpegPath = path.join(outputDir, `${imageId}-fallback.jpg`);
  const thumbAvifPath = path.join(outputDir, `${imageId}-thumb.avif`);
  const thumbJpegPath = path.join(outputDir, `${imageId}-thumb.jpg`);

  const base = sharp(sourceFilePath).rotate();

  await base.clone().avif({ quality: 62, effort: 4 }).toFile(fullAvifPath);
  await base
    .clone()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(fallbackJpegPath);
  await base
    .clone()
    .resize({ width: 640, withoutEnlargement: true })
    .avif({ quality: 60, effort: 4 })
    .toFile(thumbAvifPath);
  await base
    .clone()
    .resize({ width: 640, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(thumbJpegPath);

  return {
    id: imageId,
    alt: `${title} photo ${index + 1}`,
    width: dimensions.width,
    height: dimensions.height,
    ...imageOutputPaths,
  };
}

function createManifestFile(events) {
  const content = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run \`npm run gallery:build\` to regenerate.

export interface GalleryImageData {
  id: string;
  alt: string;
  width: number;
  height: number;
  avif: {
    full: string;
    thumb: string;
  };
  jpeg: {
    fallback: string;
    thumb: string;
  };
}

export interface GalleryEventData {
  key: string;
  chapter: string;
  chapterSlug: string;
  title: string;
  date: string;
  images: GalleryImageData[];
}

export const GALLERY_DATA: GalleryEventData[] = ${JSON.stringify(events, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, content);
}

async function buildGalleryData() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    throw new Error(
      `Missing gallery source folder: ${SOURCE_ROOT}. Add source images under gallery-source/.`,
    );
  }

  const chapterSlugs = getDirectories(SOURCE_ROOT);
  if (chapterSlugs.length === 0) {
    throw new Error(`No chapters found in ${SOURCE_ROOT}.`);
  }

  fs.rmSync(GENERATED_ROOT, { recursive: true, force: true });
  fs.mkdirSync(GENERATED_ROOT, { recursive: true });

  const events = [];

  for (const chapterSlug of chapterSlugs) {
    validateChapter(chapterSlug);
    const chapterLabel = CHAPTER_LABELS[chapterSlug];
    const chapterDir = path.join(SOURCE_ROOT, chapterSlug);
    const eventSlugs = getDirectories(chapterDir);

    for (const eventSlug of eventSlugs) {
      const { date, eventTitleSlug } = parseEventSlug(eventSlug);
      const title = titleFromSlug(eventTitleSlug);
      const eventDir = path.join(chapterDir, eventSlug);
      const sourceFiles = getFiles(eventDir);

      ensureSupportedFiles(eventDir, sourceFiles);

      if (sourceFiles.length === 0) {
        continue;
      }

      const outputDir = path.join(GENERATED_ROOT, chapterSlug, eventSlug);
      fs.mkdirSync(outputDir, { recursive: true });

      const images = [];

      for (let index = 0; index < sourceFiles.length; index += 1) {
        const sourceFile = sourceFiles[index];
        const sourceFilePath = path.join(eventDir, sourceFile);
        const imageId = `img-${String(index + 1).padStart(3, "0")}`;

        const imageData = await generateDerivatives({
          sourceFilePath,
          outputDir,
          imageId,
          chapterSlug,
          eventSlug,
          title,
          index,
        });

        images.push(imageData);
      }

      events.push({
        key: `${chapterSlug}-${eventSlug}`,
        chapter: chapterLabel,
        chapterSlug,
        title,
        date,
        images,
      });
    }
  }

  const sortedEvents = [...events].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }

    if (a.chapterSlug !== b.chapterSlug) {
      return a.chapterSlug.localeCompare(b.chapterSlug);
    }

    return a.title.localeCompare(b.title);
  });

  createManifestFile(sortedEvents);
  console.log(
    `Gallery build complete: ${sortedEvents.length} events generated from ${SOURCE_ROOT}`,
  );
}

buildGalleryData().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
