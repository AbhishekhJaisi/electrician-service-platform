import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Phone, Mail, Clock } from "lucide-react";

const STATUS_COLORS = {
  new:       "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  resolved:  "bg-green-100 text-green-800",
};

export default function DashboardPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading]     = useState(true);

  const load = async () => {
    try {
      const res = await api.getEnquiries();
      setEnquiries(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.updateEnquiryStatus(id, status);
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
  };

  const counts = {
    new:       enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    resolved:  enquiries.filter((e) => e.status === "resolved").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0F1420] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Enquiries
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide">New</p>
          <p className="text-3xl font-bold mt-1 text-yellow-600">{counts.new}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Contacted</p>
          <p className="text-3xl font-bold mt-1 text-blue-600">{counts.contacted}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Resolved</p>
          <p className="text-3xl font-bold mt-1 text-green-600">{counts.resolved}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : enquiries.length === 0 ? (
        <p className="text-gray-400 text-sm">No enquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div key={e.id} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-[#0F1420]">{e.name}</p>
                  <p className="text-sm text-[#1E56E3] font-medium mt-0.5">{e.service}</p>
                  {e.message && <p className="text-sm text-gray-500 mt-1">{e.message}</p>}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {e.phone}</span>
                    {e.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</span>}
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(e.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[e.status]}`}>
                    {e.status}
                  </span>
                  <select
                    value={e.status}
                    onChange={(ev) => setStatus(e.id, ev.target.value)}
                    className="text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#1E56E3]"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
