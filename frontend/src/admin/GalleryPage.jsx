import { useState, useEffect, useRef } from "react";
import { api } from "../lib/api";
import { Trash2, Upload, ImagePlus, X } from "lucide-react";

const IMG_BASE = "/uploads/gallery/";

export default function GalleryPage() {
  const [images, setImages]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption]   = useState("");
  const [preview, setPreview]   = useState(null); // { file, url }
  const [error, setError]       = useState("");
  const fileRef = useRef();

  const load = async () => {
    try {
      const res = await api.getGallery();
      setImages(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setPreview({ file, url: URL.createObjectURL(file) });
  };

  const cancelPreview = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!preview) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("image", preview.file);
      fd.append("caption", caption);
      const res = await api.uploadGalleryImage(fd);
      setImages((prev) => [...prev, res.data]);
      cancelPreview();
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await api.deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[#0F1420]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Gallery — Recent Jobs
        </h1>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors"
        >
          <ImagePlus className="w-4 h-4" /> Add image
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {/* Upload preview card */}
      {preview && (
        <div className="bg-white rounded-xl p-5 border-2 border-[#1E56E3] mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[#0F1420] text-sm">Preview</p>
            <button onClick={cancelPreview} className="text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <img
            src={preview.url}
            alt="preview"
            className="w-full max-h-64 object-cover rounded-lg"
          />

          <input
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] disabled:opacity-60 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading…" : "Upload"}
            </button>
            <button
              onClick={cancelPreview}
              className="border border-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image grid */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-gray-400 text-sm gap-3">
          <ImagePlus className="w-10 h-10 text-gray-300" />
          <p>No images yet. Click "Add image" to upload your first job photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-square"
            >
              <img
                src={`${IMG_BASE}${img.filename}`}
                alt={img.caption || "gallery image"}
                className="w-full h-full object-cover"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                  {img.caption}
                </div>
              )}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Delete image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
