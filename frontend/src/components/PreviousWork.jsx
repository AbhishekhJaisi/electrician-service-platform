import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import job1 from "../assets/gallery/job1.jpeg";
import job2 from "../assets/gallery/job2.jpeg";
import job3 from "../assets/gallery/job3.jpeg";

const GALLERY = [
  { src: job1, caption: "" },
  { src: job2, caption: "" },
  { src: job3, caption: "" },
];

export default function PreviousWork() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" className="bg-[#0F1420]">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <span
          className="text-xs font-semibold tracking-wide text-[#FFC93C] uppercase"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Previous work
        </span>
        <h2
          className="text-3xl font-bold mt-2 text-white mb-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Recent jobs around the tricity
        </h2>

        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {GALLERY.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-full mb-4 rounded-xl overflow-hidden border border-white/10 break-inside-avoid hover:border-[#1E56E3]/50 transition-colors block"
            >
              <img
                src={img.src}
                alt={img.caption || `Job photo ${i + 1}`}
                className="w-full object-cover"
              />
              {img.caption && (
                <div
                  className="bg-[#0F1420]/90 text-gray-400 text-xs px-3 py-1.5 text-left truncate"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {img.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + GALLERY.length) % GALLERY.length); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="max-w-2xl w-full max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].caption || `Job photo ${active + 1}`}
              className="rounded-xl object-contain max-h-[80vh] w-full"
            />
            {GALLERY[active].caption && (
              <p className="text-gray-300 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {GALLERY[active].caption}
              </p>
            )}
          </div>

          <button
            className="absolute right-4 md:right-10 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % GALLERY.length); }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
