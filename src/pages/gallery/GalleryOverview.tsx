import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GallerySection } from "./GallerySection";
import { GALLERY_DATA, type GalleryEventData } from "../../constants/gallery";
import { ROUTES } from "../../constants/routes";
import "./GalleryOverview.scss";

const ALL_CHAPTERS = "All Chapters";
const PREFERRED_CHAPTER_ORDER = ["Manchester", "Leeds", "Other"];

interface GalleryOverviewLocationState {
  restoreChapter?: string;
  restoreScrollY?: number;
}

function compareEventsByDateTitleChapter(
  left: GalleryEventData,
  right: GalleryEventData,
) {
  const dateCompare = right.date.localeCompare(left.date);
  if (dateCompare !== 0) {
    return dateCompare;
  }

  const titleCompare = left.title.localeCompare(right.title);
  if (titleCompare !== 0) {
    return titleCompare;
  }

  return left.chapter.localeCompare(right.chapter);
}

export default function GalleryOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedChapter, setChapter] = useState<string>(ALL_CHAPTERS);

  const events = useMemo<GalleryEventData[]>(() => {
    return [...GALLERY_DATA].sort(compareEventsByDateTitleChapter);
  }, []);

  const chapterTabs = useMemo<string[]>(() => {
    const eventChapters = new Set(events.map((event) => event.chapter));
    const preferredChapters = PREFERRED_CHAPTER_ORDER.filter((chapter) =>
      eventChapters.has(chapter),
    );
    const additionalChapters = [...eventChapters]
      .filter((chapter) => !preferredChapters.includes(chapter))
      .sort((left, right) => left.localeCompare(right));

    return [ALL_CHAPTERS, ...preferredChapters, ...additionalChapters];
  }, [events]);

  useEffect(() => {
    if (!chapterTabs.includes(selectedChapter)) {
      setChapter(ALL_CHAPTERS);
    }
  }, [chapterTabs, selectedChapter]);

  useEffect(() => {
    const state = location.state as GalleryOverviewLocationState | null;
    if (!state) {
      return;
    }

    if (state.restoreChapter && chapterTabs.includes(state.restoreChapter)) {
      setChapter(state.restoreChapter);
    }

    if (typeof state.restoreScrollY === "number") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: state.restoreScrollY, behavior: "auto" });
        });
      });
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [chapterTabs, location.pathname, location.state, navigate]);

  const filteredEvents = useMemo(() => {
    if (selectedChapter === ALL_CHAPTERS) {
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
        {chapterTabs.map((chapter) => {
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
              assetBasePath={event.assetBasePath}
              allImages={event.images.slice(0, 3)}
              index={index}
              eventDate={event.date}
              selectedChapter={selectedChapter}
              backRoute={ROUTES.gallery}
            />
          );
        })}
      </div>
    </section>
  );
}
