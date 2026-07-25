import { useState } from "react";
import { Star, Plus, X, User } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const FORM_INIT = { name: "", area: "", rating: 5, text: "" };

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function Reviews() {
  const { reviews, refreshReviews } = useSiteData();
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState(FORM_INIT);
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [page, setPage]         = useState(1);

  const PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(reviews.length / PER_PAGE));
  const visibleReviews = reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const payload = {
        ...form,
        date: new Date().toLocaleDateString(),
      };
      await api.submitReview(payload);
      await refreshReviews();
      setSent(true);
      setForm(FORM_INIT);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const close = () => { setOpen(false); setSent(false); setError(""); setForm(FORM_INIT); };

  return (
    <section id="reviews" className="bg-paper text-ink font-body">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 md:py-[72px]">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">Testimonials</span>
            <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-ink">
              What customers say
            </h2>
            <p className="text-steel-dim text-sm mt-1">Real feedback from real customers</p>
          </div>
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-copper text-ink text-sm font-semibold px-4 py-2 rounded-[3px] hover:bg-copper-light transition-colors">
            <Plus className="w-4 h-4" /> Add review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16 px-6 bg-panel-2 border border-white/10 rounded-[3px]">
            <p className="text-steel text-lg mb-2">No reviews yet</p>
            <p className="text-steel-dim text-sm">Be the first to share your experience with Sagar's service</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleReviews.map((r) => (
                <div key={r.id ?? r.name}
                  className="border border-white/10 bg-panel-2 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16}
                          className={i < r.rating ? "fill-copper text-copper" : "text-steel-dim"} />
                      ))}
                    </div>
                    <span className={`text-[11px] font-bold tracking-wide ${r.rating >= 4 ? "text-copper-light" : r.rating >= 3 ? "text-hazard" : "text-red-400"}`}>
                      {RATING_LABELS[r.rating]}
                    </span>
                  </div>

                  <p className="text-base font-semibold text-paper mb-3 leading-snug">&ldquo;{r.text}&rdquo;</p>

                  <div className="h-px bg-white/10 mb-3" />

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-panel flex items-center justify-center">
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.name} className="w-full h-full rounded-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <User size={14} className="text-steel-dim" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-paper truncate">{r.name}</p>
                      <p className="text-xs text-steel-dim truncate">{r.area}</p>
                    </div>
                    <span className="text-[11px] text-steel-dim">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 border border-white/10 rounded-[3px] text-xs font-medium text-steel disabled:opacity-30 hover:bg-panel-2 transition-colors">
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-[3px] text-xs font-bold transition-colors ${page === p ? "bg-copper text-ink" : "border border-white/10 text-steel hover:bg-panel-2"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 border border-white/10 rounded-[3px] text-xs font-medium text-steel disabled:opacity-30 hover:bg-panel-2 transition-colors">
                  ›
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review modal */}
      {open && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-panel-2 border border-white/10 rounded-[3px] p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-lg text-paper">Add your review</h3>
              <button onClick={close} className="text-steel-dim hover:text-paper transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <p className="text-paper font-semibold text-lg mb-1">Thank you!</p>
                <p className="text-steel-dim text-sm">Your review has been submitted.</p>
                <button onClick={close}
                  className="mt-5 bg-copper text-ink text-sm font-semibold px-6 py-2 rounded-[3px] hover:bg-copper-light transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-steel mb-1.5">Your name</label>
                  <input required name="name" placeholder="Enter your name" value={form.name} onChange={handleChange}
                    className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-steel mb-1.5">Your area / address</label>
                  <input name="area" placeholder="e.g. Margherita, Tinsukia" value={form.area} onChange={handleChange}
                    className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
                  <p className="text-[11px] text-steel-dim mt-1">Optional</p>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-steel mb-1.5">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} type="button"
                        onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none">
                        <Star size={24}
                          className={star <= (hoveredStar || form.rating) ? "fill-copper text-copper" : "text-steel-dim"} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-medium text-steel min-w-[60px]">
                      {RATING_LABELS[hoveredStar || form.rating]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-steel mb-1.5">Your review</label>
                  <textarea required name="text" placeholder="Share your experience" value={form.text}
                    onChange={handleChange} rows={3}
                    className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper resize-none" />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={sending}
                    className="flex-1 bg-copper text-ink text-sm font-semibold py-2.5 rounded-[3px] hover:bg-copper-light transition-colors disabled:opacity-60">
                    {sending ? "Submitting…" : "Submit review"}
                  </button>
                  <button type="button" onClick={close}
                    className="px-4 py-2.5 border border-white/10 text-steel text-sm rounded-[3px] hover:bg-panel transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
