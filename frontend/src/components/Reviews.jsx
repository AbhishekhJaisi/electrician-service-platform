import { useState } from "react";
import { Star, Plus, X, User } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const FORM_INIT = { name: "", area: "", title: "", rating: 5, text: "" };

export default function Reviews() {
  const { reviews, refreshReviews } = useSiteData();
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState(FORM_INIT);
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentPage, setCurrentPage]     = useState(1);

  const PER_PAGE = 6;
  const totalPages    = Math.ceil(reviews.length / PER_PAGE);
  const currentReviews = reviews.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.submitReview({ ...form, date: new Date().toLocaleDateString(), avatar: avatarPreview });
      await refreshReviews();
      setSent(true);
      setForm(FORM_INIT);
      setAvatarPreview("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const close = () => { setOpen(false); setSent(false); setError(""); setForm(FORM_INIT); setAvatarPreview(""); };

  return (
    <section id="reviews" className="bg-[#F8F9FC]">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#1E56E3] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Testimonials</span>
            <h2 className="text-3xl font-bold text-[#0D1117] mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What customers say</h2>
          </div>
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-[#0D1117] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1a2235] transition-colors">
            <Plus className="w-4 h-4" /> Add review
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {currentReviews.map((r) => (
            <div key={r.id ?? r.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5"
                    fill={i < r.rating ? "#FFC93C" : "none"}
                    stroke={i < r.rating ? "#FFC93C" : "#E5E7EB"} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {r.avatar ? (
                    <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#F8F9FC] border border-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#0D1117]">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.area}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-500">
              {currentPage} / {totalPages}
            </span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50">
              Next
            </button>
          </div>
        )}
      </div>

      {/* Review modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-[#0D1117]">Add your review</h3>
              <button onClick={close} className="text-gray-300 hover:text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <p className="text-[#0D1117] font-semibold text-lg mb-1">Thank you!</p>
                <p className="text-gray-400 text-sm">Your review has been submitted.</p>
                <button onClick={close}
                  className="mt-5 bg-[#1E56E3] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#2563eb] transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div onClick={() => document.getElementById("avatar-upload").click()}
                      className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#1E56E3] transition-colors shrink-0">
                      {avatarPreview
                        ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                        : <User className="w-5 h-5 text-gray-300" />}
                    </div>
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E56E3] flex-1" />
                  </div>
                  <input required name="area" placeholder="Area (e.g. Sector 34)" value={form.area} onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <input name="title" placeholder="Title (optional)" value={form.title} onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} type="button" onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        className="focus:outline-none">
                        <Star className="w-5 h-5"
                          fill={star <= form.rating ? "#FFC93C" : "none"}
                          stroke={star <= form.rating ? "#FFC93C" : "#D1D5DB"} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea required name="text" placeholder="Share your experience" value={form.text}
                  onChange={handleChange} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E56E3] resize-none" />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={sending}
                    className="bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-60">
                    {sending ? "Submitting…" : "Submit review"}
                  </button>
                  <button type="button" onClick={close}
                    className="border border-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
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
