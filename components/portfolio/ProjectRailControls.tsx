"use client";
import { useEffect, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Adapted from the reference project's Rail.tsx: native touch scrolling, accessible desktop controls. */
export function ProjectRailControls({ rail }: { rail: RefObject<HTMLDivElement | null> }) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      setCanLeft(element.scrollLeft > 8);
      setCanRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 8);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [rail]);

  const scroll = (direction: -1 | 1) => {
    const element = rail.current;
    if (element) {
      const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior });
    }
  };

  return <div className="project-rail-controls" aria-label="Project gallery controls">
    <button type="button" onClick={() => scroll(-1)} disabled={!canLeft} aria-label="Scroll projects left" className="project-rail-control project-rail-control-left"><ChevronLeft size={20} aria-hidden="true" /></button>
    <button type="button" onClick={() => scroll(1)} disabled={!canRight} aria-label="Scroll projects right" className="project-rail-control project-rail-control-right"><ChevronRight size={20} aria-hidden="true" /></button>
  </div>;
}
