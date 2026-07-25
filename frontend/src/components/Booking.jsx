import { useState } from "react";
import { api } from "../lib/api";

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", phone: "", address: "", issueType: "", preferredTime: "", availability: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.submitBooking(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <p id="booking" className="text-copper-light font-mono text-sm">We've received your request — Sagar will contact you shortly.</p>;

  return (
    <form id="booking" onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
      <select name="issueType" value={form.issueType} onChange={handleChange} required className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper">
        <option value="">Select issue</option>
        <option value="wiring">Wiring issue</option>
        <option value="fan_install">Fan installation</option>
        <option value="switchboard">Switchboard repair</option>
        <option value="other">Other</option>
      </select>
      <textarea name="notes" placeholder="Describe the issue" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper resize-none" />
      <input name="preferredTime" placeholder="Preferred time (optional)" value={form.preferredTime} onChange={handleChange} className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
      <select name="availability" value={form.availability} onChange={handleChange} className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper">
        <option value="">Availability</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="any">Any time</option>
      </select>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-copper hover:bg-copper-light text-ink font-semibold py-3 rounded-[3px] text-sm transition-colors disabled:opacity-50">
        {loading ? "Submitting..." : "Book Now"}
      </button>
    </form>
  );
}
