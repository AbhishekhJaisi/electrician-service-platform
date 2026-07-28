import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function WorkGallery() {
  const { gallery } = useSiteData();
  const [active, setActive] = useState(null);

  return (
    <section className="bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-10 md:py-16">
        <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
          কাজ গ্যালেৰী
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-4xl text-heading">
          Work Gallery
        </h2>

        {gallery.length === 0 ? (
          <div className="text-center py-16 px-6 card">
            <p className="text-soft-black text-lg mb-2">No gallery images yet</p>
            <p className="text-warm-muted text-base">Gallery images will appear here once uploaded from the admin panel.</p>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 md:mt-10">
          {gallery.map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => setActive(i)}
              className="w-full rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm
                       hover:shadow-lg hover:-translate-y-1 hover:border-orange-300
                       active:scale-[0.98] active:translate-y-0
                       transition-all duration-200 ease-out block aspect-[4/3] group"
            >
              <div className="w-full h-full bg-panel-2 flex items-center justify-center">
                <img
                  src={img.url || img.filename}
                  alt={img.caption || `Job photo ${i + 1}`}
                className="w-full h-full object-cover transition-all duration-300 scale-100 group-hover:scale-105"
                  style={{ opacity: 0 }}
                  onLoad={(e) => { e.target.style.opacity = "1"; }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="font-mono text-steel-dim text-xs">Image unavailable</span></div>'; }}
                />
              </div>
              {img.caption && (
                <div
                  className="bg-white text-soft-black text-xs px-2.5 py-1.5 text-left truncate font-mono"
                >
                  {img.caption}
                </div>
              )}
            </button>
          ))}
        </div>

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
              onClick={(e) => { e.stopPropagation(); setActive((active - 1 + gallery.length) % gallery.length); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div
              className="max-w-2xl w-full max-h-[85vh] flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[active].url || gallery[active].filename}
                alt={gallery[active].caption || `Job photo ${active + 1}`}
                className="rounded-xl object-contain max-h-[80vh] w-full"
              />
              {gallery[active].caption && (
                <p className="text-warm-muted text-sm font-mono">
                  {gallery[active].caption}
                </p>
              )}
            </div>

            <button
              className="absolute right-4 md:right-10 text-steel hover:text-paper"
              onClick={(e) => { e.stopPropagation(); setActive((active + 1) % gallery.length); }}
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
}