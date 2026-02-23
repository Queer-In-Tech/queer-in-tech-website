import { useState, useEffect } from "react";
import type { Photo } from "react-photo-album";
import { CHAPTERS } from "../../constants/constants";
import { GallerySection } from "./GallerySection";
import { GALLERY_DATA } from "../../constants/gallery";
import './GalleryOverview.scss'
import { loadImageWithDimensions } from "../../utils";

interface EventGallery {
    key: string;
    title: string;
    date: Date;
    photos: Photo[];
    chapter: string;
}


export default function GalleryOverview() {
    const [selectedChapter, setChapter] = useState<string>('All Chapters')
    const [events, setEvents] = useState<EventGallery[]>([])
    const [filteredEvents, setFilteredEvents] = useState<EventGallery[]>([])
    const selectChapter = (newChapter: string) => {
        setChapter(newChapter);
        if (newChapter === 'All Chapters') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter((event) => event.chapter === newChapter));
        }
    };

    useEffect(() => {
        const loadEvents = async () => {
            const allEvents: EventGallery[] = [];
            for (const event of GALLERY_DATA) {
                // Only take the first 3 photos
                const photoPaths = event.photos.slice(0, 3);
                const photos: Photo[] = await Promise.all(
                    photoPaths.map(src => loadImageWithDimensions(src))
                );
                allEvents.push({
                    key: event.key,
                    title: event.title,
                    date: new Date(event.date),
                    photos,
                    chapter: event.chapter,
                });
            }
            setEvents(allEvents);
            setFilteredEvents(allEvents);
        };
        loadEvents();
    }, []);

    return (
        <section id='gallery-page'>
            <h2 className="page-title">Past Events</h2>
            <p className="page-subtitle">You can find all the pictures from our previous events here</p>
            <div id="tabs-container">
                <button
                    type="button"
                    className={`tab ${selectedChapter === 'All Chapters' ? 'active' : ''}`}
                    onClick={() => selectChapter('All Chapters')}
                    aria-pressed={selectedChapter === 'All Chapters'}
                >
                    All Chapters
                </button>
                {
                    CHAPTERS.map((chapter, index) => {
                        return (
                            <button
                                type="button"
                                className={`tab ${selectedChapter === chapter ? 'active' : ''}`}
                                key={index}
                                onClick={() => selectChapter(chapter)}
                                aria-pressed={selectedChapter === chapter}
                            >
                                {chapter}
                            </button>
                        )
                    })
                }
            </div>
            <div id="events-container">
                {
                    filteredEvents.sort((a: EventGallery, b: EventGallery) => {
                        return b.date.getTime() - a.date.getTime();
                    }).map((event, index) => {
                        return <GallerySection key={event.key} imageKey={event.key} eventTitle={event.title} allImages={event.photos} index={index} eventDate={event.date} />
                    })
                }
            </div>

        </section>
    )
}