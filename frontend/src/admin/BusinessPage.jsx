import { useState, useEffect } from "react";
import { api } from "../lib/api";

const FIELDS = [
  { key: "name",     label: "Business Name",  type: "text" },
  { key: "owner",    label: "Owner Name",      type: "text" },
  { key: "tagline",  label: "Tagline",         type: "text" },
  { key: "phone",    label: "Phone",           type: "text" },
  { key: "whatsapp", label: "WhatsApp Number", type: "text", hint: "Include country code, no + (e.g. 919876543210)" },
  { key: "email",    label: "Email",           type: "email" },
  { key: "address",  label: "Address",         type: "text" },
  { key: "hours",    label: "Working Hours",   type: "text" },
  { key: "years",    label: "Years Experience",type: "number" },
];

export default function BusinessPage() {
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    api.getBusiness().then((res) => {
      setForm(res.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.updateBusiness(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#0F1420] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Business Info
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 space-y-5">
        {FIELDS.map(({ key, label, type, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-[#0F1420] mb-1">{label}</label>
            <input
              type={type}
              value={form[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-[#1E56E3]"
            />
            {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
          </div>
        ))}
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1E56E3] hover:bg-[#1846c2] disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-md text-sm transition-colors"
        >
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
