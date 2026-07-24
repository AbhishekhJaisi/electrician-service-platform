import { useState, useEffect, useRef } from "react";
import { api } from "../lib/api";
import { Upload, UserCircle2 } from "lucide-react";

const FIELDS = [
  { key: "name",     label: "Business Name",   type: "text" },
  { key: "owner",    label: "Owner Name",       type: "text" },
  { key: "tagline",  label: "Tagline",          type: "text" },
  { key: "phone",    label: "Phone",            type: "text" },
  { key: "whatsapp", label: "WhatsApp Number",  type: "text", hint: "Include country code, no + (e.g. 917086173493)" },
  { key: "email",    label: "Email",            type: "email" },
  { key: "address",  label: "Address",          type: "text" },
  { key: "hours",    label: "Working Hours",    type: "text" },
  { key: "years",    label: "Years Experience", type: "number" },
];

const IMG_BASE = "/uploads/business/";

export default function BusinessPage() {
  const [form, setForm]           = useState({});
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");

  // Photo upload state
  const [photoPreview, setPhotoPreview]   = useState(null); // object URL
  const [photoFile, setPhotoFile]         = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoSaved, setPhotoSaved]       = useState(false);
  const [photoError, setPhotoError]       = useState("");
  const fileRef = useRef();

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

  // Photo handlers
  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setPhotoUploading(true);
    setPhotoError("");
    try {
      const fd = new FormData();
      fd.append("photo", photoFile);
      const res = await api.uploadOwnerPhoto(fd);
      // Update form so current photo reflects new file
      setForm((p) => ({ ...p, ownerPhoto: res.ownerPhoto }));
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      setPhotoFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setPhotoSaved(true);
      setTimeout(() => setPhotoSaved(false), 2500);
    } catch (err) {
      setPhotoError(err.message || "Upload failed");
    } finally {
      setPhotoUploading(false);
    }
  };

  const cancelPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setPhotoFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

  // What to show in the photo box: preview > saved photo > placeholder
  const currentPhotoSrc = photoPreview
    ? photoPreview
    : form.ownerPhoto
    ? `${IMG_BASE}${form.ownerPhoto}`
    : null;

  return (
    <div className="max-w-2xl">
      <h1
        className="text-2xl font-bold text-[#0F1420] mb-6"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Business Info
      </h1>

      {/* ── Owner Photo ── */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-5">
        <p className="text-sm font-medium text-[#0F1420] mb-4">Owner Photo</p>

        <div className="flex items-center gap-5">
          {/* Photo preview */}
          <div className="w-24 h-24 rounded-xl bg-[#F5F6F8] border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
            {currentPhotoSrc ? (
              <img
                src={currentPhotoSrc}
                alt="Owner"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle2 className="w-10 h-10 text-gray-300" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onPhotoChange}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" /> Choose photo
            </button>
            <p className="text-xs text-gray-400">JPEG, PNG or WEBP · max 5 MB</p>

            {photoFile && (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={photoUploading}
                  className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-[#1846c2] disabled:opacity-60 transition-colors"
                >
                  {photoUploading ? "Uploading…" : "Save photo"}
                </button>
                <button
                  type="button"
                  onClick={cancelPhoto}
                  className="border border-gray-200 text-sm px-4 py-1.5 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}

            {photoSaved  && <p className="text-green-600 text-xs">✓ Photo saved</p>}
            {photoError  && <p className="text-red-500 text-xs">{photoError}</p>}
          </div>
        </div>
      </div>

      {/* ── Business fields ── */}
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
