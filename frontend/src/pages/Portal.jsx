import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Mail, ArrowRight, RotateCcw } from "lucide-react";
import { api } from "../lib/api";

export default function Portal() {
  const navigate  = useNavigate();
  const [step, setStep]     = useState("email"); // email | otp
  const [email, setEmail]   = useState("");
  const [otp, setOtp]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await api.customerSendOtp(email);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await api.customerVerifyOtp(email, otp);
      localStorage.setItem("customer_token", res.token);
      localStorage.setItem("customer", JSON.stringify(res.customer));
      navigate("/portal/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-5 h-5 text-copper" strokeWidth={2.5} />
          <span className="font-display font-semibold text-paper text-sm uppercase tracking-tight">
            Sagar Electricals
          </span>
        </div>

        <div className="bg-panel rounded-xl border border-white/10 p-6">
          {step === "email" ? (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-copper-light mb-1">Customer Portal</p>
              <h1 className="text-xl font-display font-semibold text-paper mb-1">Track your bookings</h1>
              <p className="text-steel text-sm mb-6">Enter your email to receive a login code.</p>

              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-steel-dim block mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-dim" />
                    <input
                      type="email" required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-ink border border-white/10 rounded-[3px] pl-9 pr-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper min-h-[44px]"
                    />
                  </div>
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-copper hover:bg-copper-dark text-ink font-semibold py-2.5 rounded-[3px] text-sm transition-all active:scale-[0.97] disabled:opacity-60 min-h-[44px]">
                  {loading ? "Sending…" : <><span>Send code</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-copper-light mb-1">Check your inbox</p>
              <h1 className="text-xl font-display font-semibold text-paper mb-1">Enter the code</h1>
              <p className="text-steel text-sm mb-6">Sent to <span className="text-paper">{email}</span>. Valid for 10 minutes.</p>

              <form onSubmit={verifyOtp} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-steel-dim block mb-1.5">6-digit code</label>
                  <input
                    type="text" required maxLength={6} inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full bg-ink border border-white/10 rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper min-h-[44px] tracking-[0.3em] text-center text-lg font-mono"
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-copper hover:bg-copper-dark text-ink font-semibold py-2.5 rounded-[3px] text-sm transition-all active:scale-[0.97] disabled:opacity-60 min-h-[44px]">
                  {loading ? "Verifying…" : "Access my bookings"}
                </button>
                <button type="button" onClick={() => { setStep("email"); setOtp(""); setError(""); }}
                  className="w-full flex items-center justify-center gap-1.5 text-steel hover:text-paper text-xs transition-colors">
                  <RotateCcw className="w-3 h-3" /> Use different email
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
