import React, { useState } from "react";
import { toast } from "sonner";
import { useSettings } from "../contexts/ContentContext";
import { submitPartnership } from "../api/client";

const Partnership = () => {
  const s = useSettings();
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", interest: "Hosting work placements", message: "" });
  const [busy, setBusy] = useState(false);
  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submitPartnership(form);
      toast.success("Thank you!", { description: "Our partnerships team will reach out shortly." });
      setForm({ company: "", name: "", email: "", phone: "", interest: "Hosting work placements", message: "" });
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
          <span className="text-[#d95a40] eyebrow">Corporate Partnership</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.partnership_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.partnership_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <form onSubmit={submit} className="max-w-3xl mx-auto sam-card p-6 md:p-10 space-y-5">
          <div><label className="form-label">Company *</label><input required value={form.company} onChange={handle("company")} className="form-input" /></div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="form-label">Your name *</label><input required value={form.name} onChange={handle("name")} className="form-input" /></div>
            <div><label className="form-label">Email *</label><input required type="email" value={form.email} onChange={handle("email")} className="form-input" /></div>
          </div>
          <div><label className="form-label">Phone (optional)</label><input value={form.phone} onChange={handle("phone")} className="form-input" /></div>
          <div>
            <label className="form-label">What are you most interested in?</label>
            <select value={form.interest} onChange={handle("interest")} className="form-input">
              <option>Hosting work placements</option>
              <option>Co-branded fundraising</option>
              <option>Team volunteering / CSR</option>
              <option>Something else</option>
            </select>
          </div>
          <div><label className="form-label">Tell us a bit more *</label><textarea required value={form.message} onChange={handle("message")} rows={4} className="form-input resize-none" /></div>
          <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? "Sending..." : "Start the conversation"}</button>
        </form>
      </section>
    </div>
  );
};

export default Partnership;
