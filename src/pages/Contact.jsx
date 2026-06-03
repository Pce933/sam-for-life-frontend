import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "../contexts/ContentContext";
import { submitContact } from "../api/client";

const Contact = () => {
  const s = useSettings();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submitContact(form);
      toast.success("Message sent!", { description: "A real person will reply soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Could not send message", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="fade-up">
            <span className="text-[#d95a40] eyebrow">Contact us</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.contact_intro_title}</h1>
            <p className="mt-8 text-lg text-[#1c2b2d]/80 leading-relaxed">{s.contact_intro_body}</p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d95a40]/10 text-[#d95a40]"><Mail size={20} /></span>
                <a href={`mailto:${s.footer_email || "hello@samforlife.org"}`} className="text-lg hover:text-[#d95a40]">{s.footer_email || "hello@samforlife.org"}</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d95a40]/10 text-[#d95a40]"><Phone size={20} /></span>
                <a href="tel:+442000000000" className="text-lg hover:text-[#d95a40]">{s.footer_phone || "+44 20 0000 0000"}</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d95a40]/10 text-[#d95a40]"><MapPin size={20} /></span>
                <span className="text-lg">{s.footer_location || "United Kingdom"} (remote first)</span>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="sam-card p-6 md:p-10 space-y-5">
            <div><label className="form-label">Your name *</label><input required value={form.name} onChange={handle("name")} className="form-input" placeholder="Jane Smith" /></div>
            <div><label className="form-label">Email *</label><input required type="email" value={form.email} onChange={handle("email")} className="form-input" placeholder="you@example.com" /></div>
            <div><label className="form-label">Subject *</label><input required value={form.subject} onChange={handle("subject")} className="form-input" placeholder="How can we help?" /></div>
            <div><label className="form-label">Message *</label><textarea required value={form.message} onChange={handle("message")} rows={5} className="form-input resize-none" placeholder="Tell us a bit more..." /></div>
            <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? "Sending..." : "Send message"}</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
