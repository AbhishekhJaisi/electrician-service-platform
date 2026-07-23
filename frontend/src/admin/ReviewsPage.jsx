import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Pencil, Trash2, Plus, X, Check, Star, Eye, EyeOff, User } from "lucide-react";

const EMPTY = { name: "", area: "", rating: 5, text: "", date: "", active: true, avatar: "" };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    api.getReviewsAll().then((res) => { setReviews(res.data); setLoading(false); });
  }, []);

  const startEdit = (r) => { setEditing(r.id); setForm(r); setAvatarPreview(r.avatar || ""); };
  const startNew  = ()  => { setEditing("new"); setForm(EMPTY); setAvatarPreview(""); };
  const cancel    = ()  => { setEditing(null); setForm(EMPTY); setAvatarPreview(""); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editing === "new") {
        const res = await api.createReview({ ...form, rating: Number(form.rating), avatar: avatarPreview });
        setReviews((p) => [res.data, ...p]);
      } else {
        const res = await api.updateReview(editing, { ...form, rating: Number(form.rating), avatar: avatarPreview });
        setReviews((p) => p.map((r) => r.id === editing ? res.data : r));
      }
      cancel();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this review?")) return;
    await api.deleteReview(id);
    setReviews((p) => p.filter((r) => r.id !== id));
  };

  const toggleActive = async (r) => {
    const res = await api.toggleReviewActive(r.id);
    setReviews((p) => p.map((x) => x.id === r.id ? res.data : x));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0F1420]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Reviews
        </h1>
        <button onClick={startNew} className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors">
          <Plus className="w-4 h-4" /> Add review
        </button>
      </div>

      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="space-y-3">
          {editing && (
            <div className="bg-white rounded-xl p-5 border-2 border-[#1E56E3] space-y-3">
              <p className="font-semibold text-sm">{editing === "new" ? "New review" : "Edit review"}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div onClick={() => document.getElementById("admin-avatar-upload").click()} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#1E56E3] transition-colors flex-shrink-0">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <input id="admin-avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <input placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] flex-1" />
                </div>
                <input placeholder="Area (e.g. Sector 34, Chandigarh)" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]">
                  {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} star{r > 1 ? "s" : ""}</option>)}
                </select>
                <input placeholder="Date label (e.g. 1 month ago)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <label className="flex items-center gap-2 text-sm col-span-2">
                  <input type="checkbox" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="accent-[#1E56E3]" />
                  Active (visible on public site)
                </label>
              </div>
              <textarea placeholder="Review text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] resize-none" />
              <div className="flex gap-2">
                <button onClick={save} disabled={saving} className="flex items-center gap-1.5 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md disabled:opacity-60">
                  <Check className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
                </button>
                <button onClick={cancel} className="flex items-center gap-1.5 border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          )}

          {reviews.map((r) => (
            <div key={r.id} className={`bg-white rounded-xl px-5 py-4 border ${r.active ? "border-gray-200" : "border-orange-300 bg-orange-50/30"} flex items-start justify-between gap-4`}>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" fill={i < r.rating ? "#FFC93C" : "none"} stroke={i < r.rating ? "#FFC93C" : "#D1D5DB"} />
                  ))}
                  {!r.active && <span className="ml-2 text-xs text-orange-600 font-medium">Pending approval</span>}
                </div>
                <div className="flex items-center gap-3">
                  {r.avatar ? (
                    <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#0F1420]">{r.name} · <span className="font-normal text-gray-500">{r.area}</span></p>
                    <p className="text-xs text-gray-500 mt-0.5">"{r.text}"</p>
                    <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleActive(r)} title={r.active ? "Hide from public" : "Show on public"}
                  className={`p-1.5 ${r.active ? "text-gray-400 hover:text-orange-600" : "text-green-500 hover:text-green-700"}`}>
                  {r.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => startEdit(r)} className="p-1.5 text-gray-400 hover:text-[#1E56E3]"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
