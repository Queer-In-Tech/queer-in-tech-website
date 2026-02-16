import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_ROOT = path.join(__dirname, '../public/gallery-images');
const OUTPUT_FILE = path.join(__dirname, '../src/constants/gallery.ts');

function getEvents(chapterDir, chapterName) {
    return fs.readdirSync(chapterDir)
        .filter(eventFolder => fs.statSync(path.join(chapterDir, eventFolder)).isDirectory())
        .map(eventFolder => {
            const eventPath = path.join(chapterDir, eventFolder);
            const photos = fs.readdirSync(eventPath)
                .filter(file => /\.(jpe?g|png|gif)$/i.test(file))
                .map(file => `/gallery-images/${chapterName}/${eventFolder}/${file}`);
            // Extract event name and date from folder name
            const [title, date] = eventFolder.split('_');
            return {
                key: `${chapterName}-${eventFolder}`,
                chapter:chapterName,
                title: title || eventFolder,
                date: date || '',
                photos,
            };
        });
}

function buildGalleryData() {
    const chapters = fs.readdirSync(GALLERY_ROOT)
        .filter(chapter => fs.statSync(path.join(GALLERY_ROOT, chapter)).isDirectory());

    const allEvents = chapters.flatMap(chapterName => {
        const chapterDir = path.join(GALLERY_ROOT, chapterName);
        return getEvents(chapterDir, chapterName);
    });

    return allEvents;
}

const galleryData = buildGalleryData();

const fileContent = `export const GALLERY_DATA = ${JSON.stringify(galleryData, null, 4)};`;

fs.writeFileSync(OUTPUT_FILE, fileContent);

console.log('Gallery data generated!');