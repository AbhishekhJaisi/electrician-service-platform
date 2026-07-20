import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

const EMPTY = { name: "", desc: "", price: "", unit: "starting", time: "", icon: "Zap" };
const ICONS  = ["Zap", "Fan", "Lightbulb", "Plug", "Power", "AlertTriangle", "Wind", "Flame", "Wrench"];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [editing, setEditing]   = useState(null); // id or "new"
  const [form, setForm]         = useState(EMPTY);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const load = async () => {
    const res = await api.getServices();
    setServices(res.data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (svc) => { setEditing(svc.id); setForm(svc); };
  const startNew  = ()    => { setEditing("new"); setForm(EMPTY); };
  const cancel    = ()    => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing === "new") {
        const res = await api.createService({ ...form, price: Number(form.price) });
        setServices((p) => [...p, res.data]);
      } else {
        const res = await api.updateService(editing, { ...form, price: Number(form.price) });
        setServices((p) => p.map((s) => s.id === editing ? res.data : s));
      }
      cancel();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;
    await api.deleteService(id);
    setServices((p) => p.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0F1420]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Services
        </h1>
        <button onClick={startNew} className="flex items-center gap-2 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1846c2] transition-colors">
          <Plus className="w-4 h-4" /> Add service
        </button>
      </div>

      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="space-y-3">
          {/* Add/edit form */}
          {editing && (
            <div className="bg-white rounded-xl p-5 border-2 border-[#1E56E3] space-y-3">
              <p className="font-semibold text-[#0F1420] text-sm mb-2">{editing === "new" ? "New service" : "Edit service"}</p>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <input placeholder="Time (e.g. 1 hour)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <input placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <input placeholder="Unit (e.g. starting, per fan)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]" />
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1E56E3]">
                  {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <textarea placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={2}
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

          {services.map((svc) => (
            <div key={svc.id} className="bg-white rounded-xl px-5 py-4 border border-gray-200 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[#0F1420] text-sm">{svc.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                <p className="text-xs text-gray-400 mt-1">₹{svc.price} · {svc.unit} · {svc.time}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(svc)} className="p-1.5 text-gray-400 hover:text-[#1E56E3] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(svc.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
