import { useState, useEffect } from "react";
import { api } from "../lib/api";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "COMPLETED", "CANCELLED"];

const STATUS_BADGE = {
  NEW:       "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState("");

  const load = async () => {
    try {
      const data = await api.getBookings();
      setBookings(Array.isArray(data) ? data : data.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0F1420]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Bookings
        </h1>
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {error   && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-gray-400 text-sm">No bookings yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl px-5 py-4 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-[#0F1420] text-sm">{b.name}</p>
                <p className="text-xs text-gray-500">{b.phone} · {b.address}</p>
                <p className="text-xs text-gray-400">Issue: {b.issueType}</p>
                {b.preferredTime && (
                  <p className="text-xs text-gray-400">Preferred: {b.preferredTime}</p>
                )}
                {b.notes && (
                  <p className="text-xs text-gray-400 italic">"{b.notes}"</p>
                )}
                <p className="text-xs text-gray-300">
                  {new Date(b.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[b.status] ?? "bg-gray-100 text-gray-600"}`}>
                  {b.status}
                </span>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className="border border-gray-200 rounded-md px-2 py-1.5 text-xs outline-none focus:border-[#1E56E3] bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
