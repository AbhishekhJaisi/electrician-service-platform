import { useState, useEffect, useRef } from "react";
import { api } from "../lib/api";
import { Upload, FileText, UserCircle2, X, Trash2, Image } from "lucide-react";

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
  { key: "radius",   label: "Coverage Radius (km)", type: "number" },
  { key: "shortLocation", label: "Short Location", type: "text" },
  { key: "map",      label: "Google Maps URL",  type: "text" },
];

// Owner photo is now a full Cloudinary URL stored in form.ownerPhoto

export default function BusinessPage() {
  const [form, setForm]           = useState({});
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");

  // Photo upload state
  const [photoPreview, setPhotoPreview]   = useState(null);
  const [photoFile, setPhotoFile]         = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoSaved, setPhotoSaved]       = useState(false);
  const [photoError, setPhotoError]       = useState("");
  const fileRef = useRef();

  // Hero image upload state
  const [heroPreview, setHeroPreview]   = useState(null);
  const [heroFile, setHeroFile]         = useState(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroSaved, setHeroSaved]       = useState(false);
  const [heroError, setHeroError]       = useState("");
  const heroFileRef = useRef();

  // License state
  const [licenses, setLicenses]       = useState([]);
  const [licensePreview, setLicensePreview] = useState(null);
  const [licenseFile, setLicenseFile]       = useState(null);
  const [licenseLabel, setLicenseLabel]     = useState("");
  const [licenseUploading, setLicenseUploading] = useState(false);
  const [licenseError, setLicenseError]     = useState("");
  const [licenseSaved, setLicenseSaved]     = useState(false);
  const licenseFileRef = useRef();

  useEffect(() => {
    Promise.all([
      api.getBusiness().then((res) => { setForm(res.data || {}); }).catch(() => setForm({})),
      api.getLicenses().then((res) => { setLicenses(res.data || []); }).catch(() => setLicenses([])),
    ]).finally(() => setLoading(false));
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

  // Hero image handlers
  const onHeroChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroError("");
    if (heroPreview) URL.revokeObjectURL(heroPreview);
    setHeroPreview(URL.createObjectURL(file));
    setHeroFile(file);
  };

  const handleHeroUpload = async () => {
    if (!heroFile) return;
    setHeroUploading(true);
    setHeroError("");
    try {
      const fd = new FormData();
      fd.append("hero", heroFile);
      const res = await api.uploadHeroImage(fd);
      setForm((p) => ({ ...p, heroImage: res.heroImage }));
      URL.revokeObjectURL(heroPreview);
      setHeroPreview(null);
      setHeroFile(null);
      if (heroFileRef.current) heroFileRef.current.value = "";
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 2500);
    } catch (err) {
      setHeroError(err.message || "Upload failed");
    } finally {
      setHeroUploading(false);
    }
  };

  const cancelHero = () => {
    if (heroPreview) URL.revokeObjectURL(heroPreview);
    setHeroPreview(null);
    setHeroFile(null);
    if (heroFileRef.current) heroFileRef.current.value = "";
  };

  // License handlers
  const onLicenseChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLicenseError("");
    if (licensePreview) URL.revokeObjectURL(licensePreview);
    setLicensePreview(URL.createObjectURL(file));
    setLicenseFile(file);
  };

  const handleLicenseUpload = async () => {
    if (!licenseFile || !licenseLabel.trim()) {
      setLicenseError("Please enter a label for the license");
      return;
    }
    setLicenseUploading(true);
    setLicenseError("");
    try {
      const fd = new FormData();
      fd.append("file", licenseFile);
      fd.append("label", licenseLabel.trim());
      const res = await api.uploadLicense(fd);
      setLicenses((prev) => [...prev, res.data]);
      URL.revokeObjectURL(licensePreview);
      setLicensePreview(null);
      setLicenseFile(null);
      setLicenseLabel("");
      if (licenseFileRef.current) licenseFileRef.current.value = "";
      setLicenseSaved(true);
      setTimeout(() => setLicenseSaved(false), 2500);
    } catch (err) {
      setLicenseError(err.message || "Upload failed");
    } finally {
      setLicenseUploading(false);
    }
  };

  const handleLicenseDelete = async (id) => {
    try {
      await api.deleteLicense(id);
      setLicenses((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setLicenseError(err.message || "Delete failed");
    }
  };

  const cancelLicense = () => {
    if (licensePreview) URL.revokeObjectURL(licensePreview);
    setLicensePreview(null);
    setLicenseFile(null);
    setLicenseLabel("");
    if (licenseFileRef.current) licenseFileRef.current.value = "";
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

  const currentPhotoSrc = photoPreview
    ? photoPreview
    : form.ownerPhoto || null;

  return (
    <div className="max-w-2xl">
      <h1
        className="text-2xl font-bold text-[#0F1420] mb-6"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Business Info
      </h1>

      {/* ── Hero Image ── */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-5">
        <p className="text-sm font-medium text-[#0F1420] mb-4">Hero Image</p>

        <div className="flex items-center gap-5">
          <div className="w-32 h-20 rounded-xl bg-[#F5F6F8] border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
            {heroPreview ? (
              <img
                src={heroPreview}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            ) : form.heroImage ? (
              <img
                src={form.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image className="w-8 h-8 text-gray-300" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <input
              ref={heroFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onHeroChange}
            />
            <button
              type="button"
              onClick={() => heroFileRef.current?.click()}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" /> Choose hero image
            </button>
            <p className="text-xs text-gray-400">JPEG, PNG or WEBP â max 5 MB</p>

            {heroFile && (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleHeroUpload}
                  disabled={heroUploading}
                  className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-[#1846c2] disabled:opacity-60 transition-colors"
                >
                  {heroUploading ? "Uploading…" : "Save hero"}
                </button>
                <button
                  type="button"
                  onClick={cancelHero}
                  className="border border-gray-200 text-sm px-4 py-1.5 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}

            {heroSaved  && <p className="text-green-600 text-xs">✓ Hero saved</p>}
            {heroError  && <p className="text-red-500 text-xs">{heroError}</p>}
          </div>
        </div>
      </div>

      {/* ── Owner Photo ── */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-5">
        <p className="text-sm font-medium text-[#0F1420] mb-4">Owner Photo</p>

        <div className="flex items-center gap-5">
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

      {/* ── Licenses / Certifications ── */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-5">
        <p className="text-sm font-medium text-[#0F1420] mb-4">Licenses &amp; Certifications</p>

        {/* Existing licenses list */}
        {licenses.length > 0 && (
          <div className="space-y-2 mb-4">
            {licenses.map((lic) => (
              <div key={lic.id} className="flex items-center justify-between bg-[#F8F9FC] rounded-lg px-4 py-2.5 border border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-[#1E56E3] shrink-0" />
                  <span className="text-sm font-medium text-[#0F1420] truncate">{lic.label}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">{lic.filename}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lic.url && (
                    <a
                      href={lic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1E56E3] font-semibold hover:underline"
                    >
                      View
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleLicenseDelete(lic.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new license */}
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Label (e.g. License to Work, Certificate of Accomplishment)"
              value={licenseLabel}
              onChange={(e) => setLicenseLabel(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3] mb-2"
            />
            <input
              ref={licenseFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              onChange={onLicenseChange}
            />
            <button
              type="button"
              onClick={() => licenseFileRef.current?.click()}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" /> Choose file
            </button>
            <p className="text-xs text-gray-400 mt-1">PDF, JPEG, PNG or WEBP · max 10 MB</p>
          </div>
          <button
            type="button"
            onClick={handleLicenseUpload}
            disabled={licenseUploading || !licenseFile || !licenseLabel.trim()}
            className="self-end bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] disabled:opacity-40 transition-colors whitespace-nowrap"
          >
            {licenseUploading ? "Uploading…" : "Add"}
          </button>
        </div>

        {licenseFile && (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleLicenseUpload}
              disabled={licenseUploading}
              className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-[#1846c2] disabled:opacity-60 transition-colors"
            >
              {licenseUploading ? "Uploading…" : "Save license"}
            </button>
            <button
              type="button"
              onClick={cancelLicense}
              className="border border-gray-200 text-sm px-4 py-1.5 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}

        {licenseSaved  && <p className="text-green-600 text-xs mt-2">✓ License added</p>}
        {licenseError  && <p className="text-red-500 text-xs mt-2">{licenseError}</p>}
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