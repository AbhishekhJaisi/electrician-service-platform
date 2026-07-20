import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Trash2, Plus } from "lucide-react";

export default function AreasPage() {
  const [areas, setAreas]     = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);

  useEffect(() => {
    api.getAreas().then((res) => { setAreas(res.data); setLoading(false); });
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await api.createArea({ name: newName.trim(), order: areas.length + 1 });
      setAreas((p) => [...p, res.data]);
      setNewName("");
    } finally {
      setAdding(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this area?")) return;
    await api.deleteArea(id);
    setAreas((p) => p.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-[#0F1420] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Service Areas
      </h1>

      {/* Add form */}
      <form onSubmit={add} className="flex gap-2 mb-6">
        <input
          placeholder="New area (e.g. Mohali)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 border border-gray-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-[#1E56E3]"
        />
        <button type="submit" disabled={adding} className="flex items-center gap-1.5 bg-[#1E56E3] text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-[#1846c2] disabled:opacity-60 transition-colors">
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {areas.length === 0 && (
            <p className="text-gray-400 text-sm px-5 py-4">No areas yet.</p>
          )}
          {areas.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-[#0F1420] font-medium">{a.name}</span>
              <button onClick={() => remove(a.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
