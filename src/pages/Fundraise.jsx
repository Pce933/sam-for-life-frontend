import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footprints, Cake, Bike, Sparkles, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "../contexts/ContentContext";
import { submitFundraiseIdea } from "../api/client";
import Loading from "../components/Loading";

const iconMap = { footprints: Footprints, cake: Cake, bike: Bike, sparkles: Sparkles };

const Fundraise = () => {
  const { content, loading } = useContent();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [busy, setBusy] = useState(false);

  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const ideas = content.fundraise_ideas || [];

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submitFundraiseIdea({
        name: form.name || null,
        email: form.email || null,
        idea: form.idea,
      });
      toast.success("Idea received!", { description: "We'll be in touch to cheer you on." });
      setForm({ name: "", email: "", idea: "" });
      setOpen(false);
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
          <span className="text-[#d95a40] eyebrow">Fundraise</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.fundraise_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.fundraise_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {ideas.map((idea) => {
            const Icon = iconMap[idea.icon] || Sparkles;
            return (
              <div key={idea.id} className="sam-card p-6 md:p-8 flex gap-5 items-start">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f4ede0] text-[#d95a40] flex-shrink-0">
                  <Icon size={24} strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{idea.title}</h3>
                  <p className="mt-2 text-[#5c6b6d] leading-relaxed">{idea.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto mt-10 flex flex-wrap gap-4">
          <button onClick={() => setOpen(true)} className="btn-primary">Tell us your idea <ArrowRight size={18} /></button>
          <Link to="/get-involved/donate" className="btn-outline">Or donate directly</Link>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl font-bold">Share your fundraising idea</h3>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 hover:bg-[#f4ede0] rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div><label className="form-label">Name (optional)</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" /></div>
              <div><label className="form-label">Email (optional)</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" /></div>
              <div><label className="form-label">Your idea *</label><textarea required rows={4} value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })} className="form-input resize-none" placeholder="Tell us what you're planning..." /></div>
              <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? "Sending..." : "Send idea"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fundraise;
