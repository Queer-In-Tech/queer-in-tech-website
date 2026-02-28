import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEGACY_ROOT = path.join(__dirname, "../public/gallery-images");
const SOURCE_ROOT = path.join(__dirname, "../gallery-source");
const REPORT_FILE = path.join(__dirname, "gallery-migration-report.json");

const ALLOWED_CHAPTERS = new Set(["leeds", "manchester"]);
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".heic"]);
const EVENT_SLUG_REGEX = /^(\d{4}-\d{2}-\d{2})--([a-z0-9]+(?:-[a-z0-9]+)*)$/;

function isHidden(entryName) {
  return entryName.startsWith(".");
}

function sortNaturally(entries) {
  return [...entries].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
}

function getDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

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

function slugify(value) {
  const withWordBoundaries = value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return withWordBoundaries.toLowerCase();
}

function normalizeChapterSlug(chapterName) {
  const chapterSlug = slugify(chapterName);

  if (!ALLOWED_CHAPTERS.has(chapterSlug)) {
    throw new Error(
      `Unknown chapter "${chapterName}" -> "${chapterSlug}". Allowed: leeds, manchester`,
    );
  }

  return chapterSlug;
}

function normalizeEventFolder(eventFolder) {
  if (EVENT_SLUG_REGEX.test(eventFolder)) {
    return eventFolder;
  }

  const dashDateMatch = eventFolder.match(/^(.*)_(\d{4})-(\d{2})-(\d{2})$/);
  if (dashDateMatch) {
    const [, titleRaw, year, month, day] = dashDateMatch;
    const eventSlug = slugify(titleRaw);
    return `${year}-${month}-${day}--${eventSlug}`;
  }

  const underscoreDateMatch = eventFolder.match(/^(.*)_(\d{4})_(\d{2})_(\d{2})$/);
  if (underscoreDateMatch) {
    const [, titleRaw, year, month, day] = underscoreDateMatch;
    const eventSlug = slugify(titleRaw);
    return `${year}-${month}-${day}--${eventSlug}`;
  }

  throw new Error(
    `Cannot normalize event folder "${eventFolder}". Expected legacy format Title_YYYY-MM-DD or Title_YYYY_MM_DD.`,
  );
}

function assertSupportedFiles(eventDir, files) {
  const unsupportedFiles = files.filter(
    (file) => !SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );

  if (unsupportedFiles.length > 0) {
    throw new Error(
      `Unsupported file(s) in ${eventDir}: ${unsupportedFiles.join(
        ", ",
      )}. Supported: .jpg, .jpeg, .png, .heic`,
    );
  }
}

function migrateLegacyGallery() {
  if (!fs.existsSync(LEGACY_ROOT)) {
    throw new Error(`Legacy gallery folder not found: ${LEGACY_ROOT}`);
  }

  fs.mkdirSync(SOURCE_ROOT, { recursive: true });

  const report = {
    generatedAt: new Date().toISOString(),
    sourceRoot: "public/gallery-images",
    targetRoot: "gallery-source",
    mappings: [],
  };

  const chapters = getDirectories(LEGACY_ROOT);

  for (const chapterDirName of chapters) {
    const chapterSlug = normalizeChapterSlug(chapterDirName);
    const sourceChapterDir = path.join(LEGACY_ROOT, chapterDirName);
    const targetChapterDir = path.join(SOURCE_ROOT, chapterSlug);
    fs.mkdirSync(targetChapterDir, { recursive: true });

    const eventFolders = getDirectories(sourceChapterDir);

    for (const legacyEventFolder of eventFolders) {
      if (EVENT_SLUG_REGEX.test(legacyEventFolder)) {
        // Already in normalized format (or generated output structure), skip.
        continue;
      }

      const normalizedEventSlug = normalizeEventFolder(legacyEventFolder);
      const sourceEventDir = path.join(sourceChapterDir, legacyEventFolder);
      const targetEventDir = path.join(targetChapterDir, normalizedEventSlug);
      fs.mkdirSync(targetEventDir, { recursive: true });

      const files = getFiles(sourceEventDir);
      assertSupportedFiles(sourceEventDir, files);

      const fileMappings = [];

      for (const file of files) {
        const sourceFilePath = path.join(sourceEventDir, file);
        const targetFilePath = path.join(targetEventDir, file);

        if (!fs.existsSync(targetFilePath)) {
          fs.copyFileSync(sourceFilePath, targetFilePath);
        }

        fileMappings.push({
          from: path.relative(path.join(__dirname, ".."), sourceFilePath),
          to: path.relative(path.join(__dirname, ".."), targetFilePath),
        });
      }

      report.mappings.push({
        fromEventPath: path.relative(
          path.join(__dirname, ".."),
          path.join(sourceChapterDir, legacyEventFolder),
        ),
        toEventPath: path.relative(path.join(__dirname, ".."), targetEventDir),
        filesCopied: files.length,
        files: fileMappings,
      });
    }
  }

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  if (report.mappings.length === 0) {
    console.log("No legacy gallery event folders found. Nothing migrated.");
  } else {
    console.log(
      `Legacy gallery migration complete. ${report.mappings.length} events processed.`,
    );
    console.log(`Report written to ${REPORT_FILE}`);
  }
}

try {
  migrateLegacyGallery();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
