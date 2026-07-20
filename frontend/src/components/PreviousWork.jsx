import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "../data/constants";

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

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ height: g.h }}
              className="w-full mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-xs hover:border-[#1E56E3]/50 transition-colors break-inside-avoid"
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                [ {g.tag} photo ]
              </span>
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
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white/70 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active - 1 + GALLERY.length) % GALLERY.length);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="w-full max-w-md aspect-[4/5] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              [ {GALLERY[active].tag} — full image ]
            </span>
          </div>

          <button
            className="absolute right-4 md:right-10 text-white/70 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active + 1) % GALLERY.length);
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
