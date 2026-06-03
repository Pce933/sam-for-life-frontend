import React from "react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";

const About = () => {
  const { content, loading } = useContent();
  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const values = content.values || [];
  const team = content.team || [];
  const storyParagraphs = (s.about_story_body || "").split(/\n\n+/).filter(Boolean);

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">{s.about_intro_eyebrow}</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.about_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.about_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="sam-card p-8 md:p-10">
            <span className="text-[#d95a40] eyebrow">Mission</span>
            <h2 className="font-display text-3xl font-bold mt-3">{s.mission_card_title}</h2>
            <p className="mt-4 text-[#1c2b2d]/80 leading-relaxed">{s.mission_card_body}</p>
          </div>
          <div className="sam-card p-8 md:p-10 bg-[#1c2b2d] text-[#faf8f5]">
            <span className="text-[#e4a834] eyebrow">Vision</span>
            <h2 className="font-display text-3xl font-bold mt-3 text-white">{s.vision_card_title}</h2>
            <p className="mt-4 text-[#a8b5b7] leading-relaxed">{s.vision_card_body}</p>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#d95a40] eyebrow">Our values</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">What we stand for.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.id || i} className="sam-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#d95a40]/10 text-[#d95a40] font-display font-bold flex items-center justify-center text-lg">{i + 1}</div>
                <h3 className="font-display text-xl font-semibold mt-4">{v.title}</h3>
                <p className="mt-3 text-[#5c6b6d] leading-relaxed text-[15px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#d95a40] eyebrow">Our story</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">How SAM began.</h2>
          <div className="mt-8 space-y-5 text-lg text-[#1c2b2d]/85 leading-relaxed">
            {storyParagraphs.map((p, i) => (<p key={i}>{p}</p>))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#d95a40] eyebrow">Team & Trustees</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">The people behind SAM.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m) => (
              <div key={m.id} className="sam-card p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d95a40] to-[#c14a33] text-white font-display font-bold text-xl flex items-center justify-center">{m.initials}</div>
                <h3 className="font-display text-xl font-semibold mt-4">{m.name}</h3>
                <div className="text-sm text-[#d95a40] font-semibold mt-1">{m.role}</div>
                <p className="mt-3 text-[#5c6b6d] leading-relaxed text-[15px]">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
