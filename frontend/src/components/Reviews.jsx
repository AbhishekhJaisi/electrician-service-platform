import { Star } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function Reviews() {
  const { reviews } = useSiteData();

  return (
    <section id="reviews" className="bg-[#F5F6F8]">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-[#0F1420] mb-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What customers say</h2>
          

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.id ?? r.name} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4"
                    fill={i < r.rating ? "#FFC93C" : "none"}
                    stroke={i < r.rating ? "#FFC93C" : "#D1D5DB"} />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#0F1420]">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.area}</p>
                </div>
                <span className="text-xs text-gray-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
