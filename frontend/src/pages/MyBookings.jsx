import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, LogOut, FileText, Clock, CheckCircle2, XCircle, Phone } from "lucide-react";
import { api } from "../lib/api";

const STATUS = {
  NEW:       { label: "New",       color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  CONTACTED: { label: "Contacted", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  COMPLETED: { label: "Completed", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  CANCELLED: { label: "Cancelled", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

const STATUS_ICON = {
  NEW:       Clock,
  CONTACTED: Phone,
  COMPLETED: CheckCircle2,
  CANCELLED: XCircle,
};

export default function MyBookings() {
  const navigate  = useNavigate();
  const customer  = JSON.parse(localStorage.getItem("customer") || "{}");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    api.customerGetBookings()
      .then((res) => setBookings(res.data))
      .catch((err) => {
        if (err.message.includes("401")) {
          localStorage.removeItem("customer_token");
          navigate("/portal");
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-ink">
      {/* Nav */}
      <header className="border-b border-white/[0.06] bg-ink/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-copper" strokeWidth={2.5} />
            <span className="font-display font-semibold text-paper text-sm uppercase tracking-tight">Sagar Electricals</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-steel text-xs font-mono hidden sm:block">{customer.email}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-steel hover:text-paper text-xs transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-copper-light mb-1">My Bookings</p>
          <h1 className="text-2xl font-display font-semibold text-paper">Your service requests</h1>
        </div>

        {loading && <p className="text-steel text-sm">Loading…</p>}
        {error   && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && bookings.length === 0 && (
          <div className="bg-panel border border-white/10 rounded-xl p-12 text-center">
            <p className="text-steel text-sm">No bookings yet.</p>
            <Link to="/booking" className="mt-4 inline-block text-copper-light text-sm font-mono hover:text-copper transition-colors">
              Make a booking →
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {bookings.map((b) => {
            const s    = STATUS[b.status] || STATUS.NEW;
            const Icon = STATUS_ICON[b.status] || Clock;
            return (
              <div key={b.id} className="bg-panel border border-white/10 rounded-xl p-5 hover:border-copper/30 transition-colors">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-steel-dim">#{b.id}</span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s.color}`}>
                        <Icon className="w-3 h-3" /> {s.label}
                      </span>
                    </div>
                    <p className="font-semibold text-paper text-sm">{b.issueType}</p>
                    <p className="text-steel text-xs mt-0.5">{b.address}</p>
                    <p className="text-steel-dim text-xs mt-1 font-mono">
                      {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  {b.status === "COMPLETED" && (
                    <Link
                      to={`/portal/bookings/${b.id}/receipt`}
                      className="flex items-center gap-1.5 text-copper-light hover:text-copper text-xs font-mono transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> Receipt
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
