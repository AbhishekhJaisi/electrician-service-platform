import { useState } from "react";
import { Star, Plus, X, User, ShieldCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { useToast } from "../context/ToastContext";
import { api } from "../lib/api";

const FORM_INIT = { name: "", area: "", rating: 5, text: "" };
const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// 5 distinct colors: 1=red, 2=orange, 3=amber, 4=teal, 5=green
const RATING_COLORS = [
  "",
  { bg: "bg-red-100",   text: "text-red-600",   dot: "bg-red-400"   }, // 1
  { bg: "bg-orange-100",text: "text-orange-600", dot: "bg-orange-400"}, // 2
  { bg: "bg-amber-100", text: "text-amber-600",  dot: "bg-amber-400" }, // 3
  { bg: "bg-teal-100",  text: "text-teal-600",   dot: "bg-teal-500"  }, // 4
  { bg: "bg-green-100", text: "text-green-700",  dot: "bg-green-500" }, // 5
];

function RatingSummary({ reviews }) {
  if (reviews.length === 0) return null;

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-8 flex flex-col sm:flex-row items-center gap-6">
      {/* Big average */}
      <div className="text-center shrink-0">
        <p className="text-5xl font-bold text-heading leading-none">{avg.toFixed(1)}</p>
        <div className="flex gap-0.5 mt-2 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              className={
                i <= Math.round(avg)
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-200 fill-gray-200"
              }
            />
          ))}
        </div>
        <p className="text-xs text-warm-muted mt-1.5">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Bar breakdown */}
      <div className="flex-1 w-full space-y-1.5">
        {counts.map(({ star, count }) => {
          const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-right text-warm-muted font-mono">{star}</span>
              <Star size={11} className="text-orange-400 fill-orange-400 shrink-0" />
              <div className="flex-1 h-1.5 bg-orange-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-6 text-warm-muted font-mono">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Trust badge */}
      <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 shrink-0">
        <ShieldCheck size={14} className="text-green-600 shrink-0" />
        <span className="font-medium">Reviews verified by admin</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { reviews, refreshReviews, business: BUSINESS } = useSiteData();
  const addToast = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(FORM_INIT);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(reviews.length / PER_PAGE));
  const visibleReviews = reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.submitReview({ ...form, date: new Date().toLocaleDateString() });
      await refreshReviews();
      setSent(true);
      setForm(FORM_INIT);
      addToast("Review submitted for approval!", "success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      addToast("Failed to submit review. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  const close = () => { setOpen(false); setSent(false); setError(""); setForm(FORM_INIT); };

  return (
    <section className="bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-10 md:py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 flex-wrap gap-4">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
              গ্ৰাহকৰ মতামত
            </span>
            <h2 className="font-display font-semibold leading-tight mt-2 text-4xl text-heading">
              Customer reviews
            </h2>
          </div>
        <button
            onClick={() => setOpen(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" /> Add review
          </button>
        </div>

        {/* Aggregate rating */}
        <RatingSummary reviews={reviews} />

        {reviews.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <p className="text-soft-black text-lg mb-2">No reviews yet</p>
            <p className="text-warm-muted text-base">Be the first to share your experience with Sagar's service</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {visibleReviews.map((r, idx) => (
                <div
                  key={r.id ?? `${r.name}-${idx}`}
                  className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out flex flex-col"
                >
                  {/* Stars top-left, rating badge top-right */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={i < r.rating ? "fill-orange-400 text-orange-400" : "text-gray-200 fill-gray-200"}
                        />
                      ))}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full ${RATING_COLORS[r.rating]?.bg} ${RATING_COLORS[r.rating]?.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${RATING_COLORS[r.rating]?.dot}`} />
                      {RATING_LABELS[r.rating]}
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-[15px] text-heading mb-3 leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>

                  <div className="h-px bg-gray-100 mb-3" />

                  {/* Reviewer */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 overflow-hidden">
                      {r.avatar ? (
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <User size={14} className="text-copper" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-heading truncate">{r.name}</p>
                      {r.area && <p className="text-xs text-warm-muted truncate">{r.area}</p>}
                    </div>
                    <span className="text-[11px] text-warm-muted shrink-0">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-soft-black disabled:opacity-30 hover:bg-orange-50 hover:border-orange-300 active:scale-[0.96] transition-all min-w-[44px]"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-150 ${
                      page === p
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                        : "border border-gray-200 text-soft-black hover:bg-orange-50 hover:border-orange-300 active:scale-[0.96]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-soft-black disabled:opacity-30 hover:bg-orange-50 hover:border-orange-300 active:scale-[0.96] transition-all min-w-[44px]"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add review modal */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="bg-white border border-orange-100 rounded-t-2xl sm:rounded-xl shadow-xl p-5 w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-lg text-heading">Add your review</h3>
              <button onClick={close} className="text-warm-muted hover:text-heading p-1 active:scale-90 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-heading font-display font-semibold text-lg">Thank you!</p>
                <p className="text-soft-black text-sm">
                  Your review has been submitted and will appear once approved. We typically review within 24 hours.
                </p>
                <button
                  onClick={close}
                  className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg active:scale-[0.97] transition-all min-h-[44px]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-warm-muted mb-1.5">
                    Your name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-white rounded-lg px-3.5 py-2.5 text-sm text-soft-black outline-none focus:border-orange-300 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-warm-muted mb-1.5">
                    Your area
                  </label>
                  <input
                    name="area"
                    placeholder={`e.g. ${BUSINESS.shortLocation}`}
                    value={form.area}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-white rounded-lg px-3.5 py-2.5 text-sm text-soft-black outline-none focus:border-orange-300 min-h-[44px]"
                  />
                  <p className="text-[11px] text-warm-muted mt-1">Optional</p>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-warm-muted mb-1.5">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none active:scale-90 transition-transform p-1"
                      >
                        <Star
                          size={28}
                          className={
                            star <= (hoveredStar || form.rating)
                              ? "fill-orange-400 text-orange-400"
                              : "text-gray-200 fill-gray-200"
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-medium text-warm-muted min-w-[70px]">
                      {RATING_LABELS[hoveredStar || form.rating]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-warm-muted mb-1.5">
                    Your review <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    required
                    name="text"
                    placeholder="Share your experience…"
                    value={form.text}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-200 bg-white rounded-lg px-3.5 py-2.5 text-sm text-soft-black outline-none focus:border-orange-300 resize-none min-h-[100px]"
                  />
                </div>

                <p className="text-[11px] text-warm-muted flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-green-500 shrink-0" />
                  Reviews are verified before publishing — usually within 24 hours.
                </p>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded-lg active:scale-[0.98] transition-all disabled:opacity-60 min-h-[48px] text-base"
                >
                  {sending ? "Submitting…" : "Submit review"}
                </button>

                {/* extra bottom padding so button clears mobile nav bar */}
                <div className="h-4 sm:hidden" />
              </form>
            )}
          </div>
          </div>
        </div>
      )}
    </section>
  );
}
