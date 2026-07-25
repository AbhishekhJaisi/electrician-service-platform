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
    <section id="work" className="bg-ink text-paper font-body">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 md:py-[72px]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
          কাজ গ্যালেৰী
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-paper">
          Work Gallery
        </h2>

        <div className="columns-2 md:columns-3 gap-2.5 mt-8 [column-fill:_balance]">
          {GALLERY.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-full mb-2.5 rounded-[3px] overflow-hidden border border-white/10 break-inside-avoid hover:border-copper transition-colors block"
            >
              <img
                src={img.src}
                alt={img.caption || `Job photo ${i + 1}`}
                className="w-full object-cover"
              />
              {img.caption && (
                <div
                  className="bg-panel text-steel text-xs px-3 py-1.5 text-left truncate font-mono"
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
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-paper"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            className="absolute left-4 md:left-10 text-steel hover:text-paper"
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
              className="rounded-[3px] object-contain max-h-[80vh] w-full"
            />
            {GALLERY[active].caption && (
              <p className="text-steel text-sm font-mono">
                {GALLERY[active].caption}
              </p>
            )}
          </div>

          <button
            className="absolute right-4 md:right-10 text-steel hover:text-paper"
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
