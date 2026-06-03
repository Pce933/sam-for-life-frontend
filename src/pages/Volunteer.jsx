import React, { useState } from "react";
import { toast } from "sonner";
import { useSettings } from "../contexts/ContentContext";
import { submitVolunteer } from "../api/client";

const Volunteer = () => {
  const s = useSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", skills: "", availability: "", why: "" });
  const [busy, setBusy] = useState(false);
  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submitVolunteer(form);
      toast.success("Application sent!", { description: "We'll be in touch within a few days." });
      setForm({ name: "", email: "", phone: "", skills: "", availability: "", why: "" });
    } catch (err) {
      toast.error("Could not send", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">Volunteer</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.volunteer_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.volunteer_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <form onSubmit={submit} className="max-w-3xl mx-auto sam-card p-6 md:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="form-label">Full name *</label><input required value={form.name} onChange={handle("name")} className="form-input" /></div>
            <div><label className="form-label">Email *</label><input required type="email" value={form.email} onChange={handle("email")} className="form-input" /></div>
          </div>
          <div><label className="form-label">Phone (optional)</label><input value={form.phone} onChange={handle("phone")} className="form-input" /></div>
          <div><label className="form-label">Your skills or background *</label><input required value={form.skills} onChange={handle("skills")} className="form-input" placeholder="e.g. teaching, mentoring, hospitality, IT" /></div>
          <div><label className="form-label">Availability (days/hours per week) *</label><input required value={form.availability} onChange={handle("availability")} className="form-input" placeholder="e.g. Tuesday afternoons, 4 hours/week" /></div>
          <div><label className="form-label">Why do you want to volunteer with SAM?</label><textarea value={form.why} onChange={handle("why")} rows={4} className="form-input resize-none" /></div>
          <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? "Sending..." : "Send application"}</button>
        </form>
      </section>
    </div>
  );
};

export default Volunteer;
