import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Zap, Printer, ArrowLeft, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";

export default function Receipt() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    api.customerGetReceipt(id)
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.message.includes("401")) navigate("/portal");
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-ink flex items-center justify-center"><p className="text-steel text-sm">Loading…</p></div>;
  if (error)   return <div className="min-h-screen bg-ink flex items-center justify-center"><p className="text-red-400 text-sm">{error}</p></div>;

  const { booking, business } = data;

  return (
    <div className="min-h-screen bg-ink">
      {/* Toolbar — hidden on print */}
      <div className="print:hidden border-b border-white/[0.06] bg-ink/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/portal/bookings" className="flex items-center gap-1.5 text-steel hover:text-paper text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> My Bookings
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-copper hover:bg-copper-dark text-ink text-sm font-semibold px-4 py-2 rounded-[3px] transition-all active:scale-[0.97]"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>

      {/* Receipt — this is what prints */}
      <div className="max-w-2xl mx-auto px-4 py-8 print:py-0 print:px-0">
        <div className="bg-panel print:bg-white border border-white/10 print:border-gray-200 rounded-xl p-8 print:rounded-none">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-copper print:text-orange-600" strokeWidth={2.5} />
                <span className="font-display font-semibold text-paper print:text-gray-900 text-sm uppercase tracking-tight">
                  {business?.name || "Sagar Electricals"}
                </span>
              </div>
              <p className="text-steel print:text-gray-500 text-xs">{business?.address}</p>
              <p className="text-steel print:text-gray-500 text-xs">{business?.phone}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-copper-light print:text-orange-600 mb-1">Receipt</p>
              <p className="text-paper print:text-gray-900 font-bold text-lg">#{booking.id}</p>
              <p className="text-steel print:text-gray-500 text-xs font-mono">
                {new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 bg-green-400/10 print:bg-green-50 border border-green-400/20 print:border-green-200 rounded-lg px-4 py-3 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-400 print:text-green-600 shrink-0" />
            <span className="text-green-400 print:text-green-700 text-sm font-semibold">Service Completed</span>
          </div>

          {/* Details table */}
          <table className="w-full text-sm mb-8">
            <tbody>
              {[
                ["Customer",     booking.name],
                ["Phone",        booking.phone],
                booking.email ? ["Email", booking.email] : null,
                ["Address",      booking.address],
                ["Service",      booking.issueType],
                booking.notes ? ["Notes", booking.notes] : null,
                booking.preferredTime ? ["Preferred time", booking.preferredTime] : null,
              ].filter(Boolean).map(([label, value]) => (
                <tr key={label} className="border-b border-white/[0.06] print:border-gray-100">
                  <td className="py-2.5 text-steel print:text-gray-500 font-mono text-[11px] uppercase tracking-wider w-36">{label}</td>
                  <td className="py-2.5 text-paper print:text-gray-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="border-t border-white/10 print:border-gray-200 pt-6 text-center">
            <p className="text-steel print:text-gray-500 text-xs">Thank you for choosing {business?.name || "Sagar Electricals"}.</p>
            <p className="text-steel-dim print:text-gray-400 text-xs mt-1 font-mono">{business?.hours}</p>
          </div>
        </div>
      </div>

      {/* Print-only styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
