import { useState } from "react";
import { Star, Plus, X } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const FORM_INIT = { name: "", area: "", rating: 5, text: "", date: "Just now" };

export default function Reviews() {
  const { reviews } = useSiteData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(FORM_INIT);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.submitReview(form);
      const { refreshReviews } = useSiteData();
      await refreshReviews();
      setSent(true);
      setForm(FORM_INIT);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setOpen(false);
    setSent(false);
    setError("");
    setForm(FORM_INIT);
  };

  return (
    <section id="reviews" className="bg-[#F5F6F8]">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#0F1420]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What customers say</h2>
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors">
            <Plus className="w-4 h-4" /> Add review
          </button>
        </div>

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

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg border-2 border-[#1E56E3]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#0F1420]">Add your review</h3>
              <button onClick={close} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <p className="text-[#0F1420] font-semibold text-lg mb-2">Thank you!</p>
                <p className="text-gray-500 text-sm">Your review has been submitted.</p>
                <button onClick={close} className="mt-4 bg-[#1E56E3] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#1846c2] transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <input required name="area" placeholder="Area (e.g. Sector 34, Chandigarh)" value={form.area} onChange={handleChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <select name="rating" value={form.rating} onChange={handleChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]">
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} star{r > 1 ? "s" : ""}</option>)}
                  </select>
                  <input name="date" placeholder="Date label (e.g. 1 month ago)" value={form.date} onChange={handleChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                </div>
                <textarea required name="text" placeholder="Share your experience" value={form.text} onChange={handleChange} rows={3}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] resize-none" />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button type="submit" disabled={sending}
                    className="bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors disabled:opacity-60">
                    {sending ? "Submitting…" : "Submit review"}
                  </button>
                  <button type="button" onClick={close}
                    className="border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
