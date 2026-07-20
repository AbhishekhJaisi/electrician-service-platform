import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const [form, setForm]     = useState({ username: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1420] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-6 h-6 text-[#FFC93C]" fill="#FFC93C" />
          <span className="font-bold text-[#0F1420]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            VoltFix Admin
          </span>
        </div>
        <h1 className="text-xl font-bold text-[#0F1420] mb-6">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-[#1E56E3]"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-[#1E56E3]"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E56E3] hover:bg-[#1846c2] disabled:opacity-60 text-white font-semibold py-2.5 rounded-md text-sm transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
