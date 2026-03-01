import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_ROOT = path.join(__dirname, "../gallery-source");
const GENERATED_ROOT = path.join(__dirname, "../public/gallery-images");
const BUILD_MANIFEST_FILE = path.join(
  GENERATED_ROOT,
  ".build-manifest.json",
);
const OUTPUT_FILE = path.join(__dirname, "../src/constants/gallery.generated.ts");
const BUILD_MANIFEST_VERSION = 2;
const DEFAULT_IMAGE_CONCURRENCY = Math.max(
  2,
  Math.min(
    4,
    typeof os.availableParallelism === "function"
      ? os.availableParallelism()
      : os.cpus().length,
  ),
);

const CHAPTER_LABEL_OVERRIDES = {
  leeds: "Leeds",
  manchester: "Manchester",
  other: "Other",
};

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

function toPosixPath(inputPath) {
  return inputPath.split(path.sep).join("/");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function resolveImageConcurrency() {
  const configured = process.env.GALLERY_IMAGE_CONCURRENCY;
  if (!configured) {
    return DEFAULT_IMAGE_CONCURRENCY;
  }

  const parsed = Number.parseInt(configured, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    console.warn(
      `Invalid GALLERY_IMAGE_CONCURRENCY="${configured}". Falling back to ${DEFAULT_IMAGE_CONCURRENCY}.`,
    );
    return DEFAULT_IMAGE_CONCURRENCY;
  }

  return parsed;
}

function imageFingerprint(sourceFilePath) {
  const stats = fs.statSync(sourceFilePath);
  return {
    size: stats.size,
    hash: crypto
      .createHash("sha1")
      .update(fs.readFileSync(sourceFilePath))
      .digest("hex"),
  };
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

function outputFileNames(imageId) {
  return {
    fullAvif: `${imageId}-full.avif`,
    fallbackJpeg: `${imageId}-fallback.jpg`,
    thumbAvif: `${imageId}-thumb.avif`,
    thumbJpeg: `${imageId}-thumb.jpg`,
  };
}

function outputRelativePaths(chapterSlug, eventSlug, imageId) {
  const names = outputFileNames(imageId);
  const base = path.posix.join(chapterSlug, eventSlug);
  return {
    fullAvif: `${base}/${names.fullAvif}`,
    fallbackJpeg: `${base}/${names.fallbackJpeg}`,
    thumbAvif: `${base}/${names.thumbAvif}`,
    thumbJpeg: `${base}/${names.thumbJpeg}`,
  };
}

function outputAbsolutePaths(outputDir, imageId) {
  const names = outputFileNames(imageId);
  return {
    fullAvif: path.join(outputDir, names.fullAvif),
    fallbackJpeg: path.join(outputDir, names.fallbackJpeg),
    thumbAvif: path.join(outputDir, names.thumbAvif),
    thumbJpeg: path.join(outputDir, names.thumbJpeg),
  };
}

function outputList(outputPaths) {
  return [
    outputPaths.fullAvif,
    outputPaths.fallbackJpeg,
    outputPaths.thumbAvif,
    outputPaths.thumbJpeg,
  ];
}

function hasExistingOutputs(relativeOutputs) {
  return relativeOutputs.every((relativePath) =>
    fs.existsSync(path.join(GENERATED_ROOT, relativePath)),
  );
}

function sameOutputList(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return false;
  }

  return left.every((entry, index) => entry === right[index]);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function createEmptyBuildManifest() {
  return {
    version: BUILD_MANIFEST_VERSION,
    entries: {},
  };
}

function normalizeBuildManifestEntry(entry) {
  if (!isObject(entry)) {
    return null;
  }

  const { fingerprint, outputs, width, height } = entry;
  if (!isObject(fingerprint)) {
    return null;
  }

  if (
    typeof fingerprint.size !== "number" ||
    typeof fingerprint.hash !== "string" ||
    fingerprint.hash.length === 0
  ) {
    return null;
  }

  if (
    !Array.isArray(outputs) ||
    outputs.length === 0 ||
    outputs.some((outputPath) => typeof outputPath !== "string")
  ) {
    return null;
  }

  if (typeof width !== "number" || typeof height !== "number") {
    return null;
  }

  return {
    fingerprint: {
      size: fingerprint.size,
      hash: fingerprint.hash,
    },
    outputs: [...outputs],
    width,
    height,
  };
}

function loadBuildManifest() {
  if (!fs.existsSync(BUILD_MANIFEST_FILE)) {
    return createEmptyBuildManifest();
  }

  try {
    const raw = fs.readFileSync(BUILD_MANIFEST_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!isObject(parsed) || parsed.version !== BUILD_MANIFEST_VERSION) {
      return createEmptyBuildManifest();
    }

    if (!isObject(parsed.entries)) {
      return createEmptyBuildManifest();
    }

    const entries = {};
    for (const [sourcePath, entry] of Object.entries(parsed.entries)) {
      const normalized = normalizeBuildManifestEntry(entry);
      if (normalized) {
        entries[sourcePath] = normalized;
      }
    }

    return {
      version: BUILD_MANIFEST_VERSION,
      entries,
    };
  } catch (error) {
    console.warn(
      `Ignoring invalid gallery build manifest at ${BUILD_MANIFEST_FILE}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return createEmptyBuildManifest();
  }
}

function writeBuildManifest(entries) {
  const content = {
    version: BUILD_MANIFEST_VERSION,
    generatedAt: new Date().toISOString(),
    entries,
  };
  fs.writeFileSync(BUILD_MANIFEST_FILE, `${JSON.stringify(content, null, 2)}\n`);
}

function listFilesRecursively(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  const result = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }

      if (entry.isFile()) {
        result.push(toPosixPath(path.relative(rootDir, absolutePath)));
      }
    }
  }

  return result;
}

function removeFiles(relativePaths) {
  let removed = 0;

  for (const relativePath of relativePaths) {
    const absolutePath = path.join(GENERATED_ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    const stats = fs.statSync(absolutePath);
    if (!stats.isFile()) {
      continue;
    }

    fs.rmSync(absolutePath, { force: true });
    removed += 1;
  }

  return removed;
}

function pruneEmptyDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    pruneEmptyDirectories(path.join(dirPath, entry.name));
  }

  if (dirPath === GENERATED_ROOT) {
    return;
  }

  if (fs.readdirSync(dirPath).length === 0) {
    fs.rmdirSync(dirPath);
  }
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
}

function chapterLabelFromSlug(chapterSlug) {
  return CHAPTER_LABEL_OVERRIDES[chapterSlug] ?? titleFromSlug(chapterSlug);
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

function outputEventAssetBasePath(chapterSlug, eventSlug) {
  return `/gallery-images/${chapterSlug}/${eventSlug}/`;
}

async function generateDerivatives({
  sourceFilePath,
  absoluteOutputs,
}) {
  const metadata = await sharp(sourceFilePath).metadata();
  const dimensions = getOrientedDimensions(metadata, sourceFilePath);

  const base = sharp(sourceFilePath).rotate();

  await Promise.all([
    base.clone().avif({ quality: 62, effort: 4 }).toFile(absoluteOutputs.fullAvif),
    base
      .clone()
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(absoluteOutputs.fallbackJpeg),
    base
      .clone()
      .resize({ width: 640, withoutEnlargement: true })
      .avif({ quality: 60, effort: 4 })
      .toFile(absoluteOutputs.thumbAvif),
    base
      .clone()
      .resize({ width: 640, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(absoluteOutputs.thumbJpeg),
  ]);

  return dimensions;
}

async function mapWithConcurrency(items, concurrency, mapper) {
  if (items.length === 0) {
    return [];
  }

  const workerCount = Math.min(concurrency, items.length);
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;

      if (index >= items.length) {
        return;
      }

      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

function createGalleryDataFile(events) {
  const content = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run \`npm run gallery:build\` to regenerate.

export interface GalleryImageData {
  id: string;
  alt: string;
  width: number;
  height: number;
}

export interface GalleryEventData {
  key: string;
  chapter: string;
  chapterSlug: string;
  title: string;
  date: string;
  assetBasePath: string;
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

  fs.mkdirSync(GENERATED_ROOT, { recursive: true });
  const previousManifest = loadBuildManifest();
  const previousEntries = previousManifest.entries;
  const nextEntries = {};
  const expectedOutputFiles = new Set();
  const imageConcurrency = resolveImageConcurrency();

  const events = [];
  const stats = {
    generated: 0,
    reused: 0,
    removed: 0,
    images: 0,
  };

  for (const chapterSlug of chapterSlugs) {
    validateChapter(chapterSlug);
    const chapterLabel = chapterLabelFromSlug(chapterSlug);
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

      const images = await mapWithConcurrency(
        sourceFiles,
        imageConcurrency,
        async (sourceFile, index) => {
          const sourceFilePath = path.join(eventDir, sourceFile);
          const sourceRelativePath = toPosixPath(
            path.relative(SOURCE_ROOT, sourceFilePath),
          );
          const fingerprint = imageFingerprint(sourceFilePath);
          const imageId = `img-${String(index + 1).padStart(3, "0")}`;
          const relativeOutputs = outputRelativePaths(
            chapterSlug,
            eventSlug,
            imageId,
          );
          const relativeOutputList = outputList(relativeOutputs);
          const absoluteOutputs = outputAbsolutePaths(outputDir, imageId);
          const previousEntry = previousEntries[sourceRelativePath];

          for (const outputPath of relativeOutputList) {
            expectedOutputFiles.add(outputPath);
          }

          const canReuse =
            previousEntry &&
            previousEntry.fingerprint.size === fingerprint.size &&
            previousEntry.fingerprint.hash === fingerprint.hash &&
            sameOutputList(previousEntry.outputs, relativeOutputList) &&
            hasExistingOutputs(relativeOutputList);

          let dimensions;
          if (canReuse) {
            dimensions = {
              width: previousEntry.width,
              height: previousEntry.height,
            };
            stats.reused += 1;
          } else {
            dimensions = await generateDerivatives({
              sourceFilePath,
              absoluteOutputs,
            });
            stats.generated += 1;
          }

          nextEntries[sourceRelativePath] = {
            fingerprint,
            outputs: relativeOutputList,
            width: dimensions.width,
            height: dimensions.height,
          };
          stats.images += 1;

          return {
            id: imageId,
            alt: `${title} photo ${index + 1}`,
            width: dimensions.width,
            height: dimensions.height,
          };
        },
      );

      events.push({
        key: `${chapterSlug}-${eventSlug}`,
        chapter: chapterLabel,
        chapterSlug,
        title,
        date,
        assetBasePath: outputEventAssetBasePath(chapterSlug, eventSlug),
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

  const staleOutputs = new Set();
  for (const [sourcePath, previousEntry] of Object.entries(previousEntries)) {
    const nextEntry = nextEntries[sourcePath];
    if (!nextEntry) {
      for (const outputPath of previousEntry.outputs) {
        staleOutputs.add(outputPath);
      }
      continue;
    }

    for (const outputPath of previousEntry.outputs) {
      if (!nextEntry.outputs.includes(outputPath)) {
        staleOutputs.add(outputPath);
      }
    }
  }

  const existingGeneratedFiles = listFilesRecursively(GENERATED_ROOT);
  for (const generatedFile of existingGeneratedFiles) {
    if (generatedFile === path.basename(BUILD_MANIFEST_FILE)) {
      continue;
    }

    if (!expectedOutputFiles.has(generatedFile)) {
      staleOutputs.add(generatedFile);
    }
  }

  stats.removed = removeFiles(staleOutputs);
  pruneEmptyDirectories(GENERATED_ROOT);

  writeBuildManifest(nextEntries);
  createGalleryDataFile(sortedEvents);
  console.log(
    `Gallery build complete: ${sortedEvents.length} events, ${stats.images} images (${stats.generated} generated, ${stats.reused} reused), ${stats.removed} stale files removed. Concurrency: ${imageConcurrency}.`,
  );
}

buildGalleryData().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
