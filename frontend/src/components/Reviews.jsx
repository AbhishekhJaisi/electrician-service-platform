import { useState, useEffect } from "react";
import { Star, Plus, X, User } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const FORM_INIT = { name: "", area: "", title: "", rating: 5, text: "" };

export default function Reviews() {
  const { reviews, refreshReviews } = useSiteData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(FORM_INIT);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

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
      const reviewWithDate = { ...form, date: new Date().toLocaleDateString(), avatar: avatarPreview };
      await api.submitReview(reviewWithDate);
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

  const close = () => {
    setOpen(false);
    setSent(false);
    setError("");
    setForm(FORM_INIT);
    setAvatarPreview("");
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
          {currentReviews.map((r) => (
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
                <div className="flex items-center gap-3">
                  {r.avatar ? (
                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#0F1420]">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.area}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
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
                  <div className="flex items-center gap-2">
                    <div onClick={() => document.getElementById("avatar-upload").click()} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#1E56E3] transition-colors flex-shrink-0">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] flex-1" />
                  </div>
                  <input required name="area" placeholder="Area (e.g. Sector 34, Chandigarh)" value={form.area} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <input name="title" placeholder="Title (e.g. Great Service!)" value={form.title} onChange={handleChange} className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className="w-5 h-5"
                          fill={star <= form.rating ? "#FFC93C" : "none"}
                          stroke={star <= form.rating ? "#FFC93C" : "#D1D5DB"}
                        />
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="rating" value={form.rating} />
                  <input type="hidden" name="date" value={new Date().toLocaleDateString()} />
                </div>
                <textarea required name="text" placeholder="Share your experience" value={form.text} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] resize-none" />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button type="submit" disabled={sending} className="bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors disabled:opacity-60">
                    {sending ? "Submitting…" : "Submit review"}
                  </button>
                  <button type="button" onClick={close} className="border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
