import { useMemo, useState } from "react";
import { CHAPTERS } from "../../constants/constants";
import { GallerySection } from "./GallerySection";
import { GALLERY_DATA, type GalleryEventData } from "../../constants/gallery";
import "./GalleryOverview.scss";

export default function GalleryOverview() {
  const [selectedChapter, setChapter] = useState<string>("All Chapters");

  const events = useMemo<GalleryEventData[]>(() => {
    return [...GALLERY_DATA].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const filteredEvents = useMemo(() => {
    if (selectedChapter === "All Chapters") {
      return events;
    }

    return events.filter((event) => event.chapter === selectedChapter);
  }, [events, selectedChapter]);

  return (
    <section id="gallery-page">
      <h2 className="page-title">Past Events</h2>
      <p className="page-subtitle">
        You can find all the pictures from our previous events here
      </p>
      <div id="tabs-container">
        <button
          type="button"
          className={`tab ${selectedChapter === "All Chapters" ? "active" : ""}`}
          onClick={() => setChapter("All Chapters")}
          aria-pressed={selectedChapter === "All Chapters"}
        >
          All Chapters
        </button>
        {CHAPTERS.map((chapter) => {
          return (
            <button
              type="button"
              className={`tab ${selectedChapter === chapter ? "active" : ""}`}
              key={chapter}
              onClick={() => setChapter(chapter)}
              aria-pressed={selectedChapter === chapter}
            >
              {chapter}
            </button>
          );
        })}
      </div>
      <div id="events-container">
        {filteredEvents.map((event, index) => {
          return (
            <GallerySection
              key={event.key}
              imageKey={event.key}
              eventTitle={event.title}
              allImages={event.images.slice(0, 3)}
              index={index}
              eventDate={event.date}
            />
          );
        })}
      </div>
    </section>
  );
}
