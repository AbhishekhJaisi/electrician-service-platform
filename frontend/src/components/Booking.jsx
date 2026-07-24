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

  if (submitted) return <p id="booking">We've received your request — Sagar will contact you shortly.</p>;

  return (
    <form id="booking" onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
      <select name="issueType" value={form.issueType} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]">
        <option value="">Select issue</option>
        <option value="wiring">Wiring issue</option>
        <option value="fan_install">Fan installation</option>
        <option value="switchboard">Switchboard repair</option>
        <option value="other">Other</option>
      </select>
      <textarea name="notes" placeholder="Describe the issue" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3] resize-none" />
      <input name="preferredTime" placeholder="Preferred time (optional)" value={form.preferredTime} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
      <select name="availability" value={form.availability} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]">
        <option value="">Availability</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="any">Any time</option>
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#1E56E3] hover:bg-[#1846c2] transition-colors text-white font-semibold py-3 rounded-md text-sm disabled:opacity-50">
        {loading ? "Submitting..." : "Book Now"}
      </button>
    </form>
  );
}