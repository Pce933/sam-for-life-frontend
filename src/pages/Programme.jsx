import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Briefcase, Building2, Check } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";
import { optimizeUnsplashUrl } from "../lib/utils";

const iconMap = { graduation: GraduationCap, briefcase: Briefcase, building: Building2 };

const Programme = () => {
  const { content, loading } = useContent();
  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const programmeSteps = content.programme || [];

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">Our programme</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.programme_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.programme_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto space-y-6">
          {programmeSteps.map((p, idx) => {
            const Icon = iconMap[p.icon] || GraduationCap;
            const isReverse = idx % 2 === 1;
            return (
              <div key={p.id} className="sam-card p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={`${isReverse ? "md:order-2" : ""} rounded-2xl overflow-hidden aspect-[4/3]`}>
                  <img alt={p.title} className="w-full h-full object-cover" src={optimizeUnsplashUrl(p.image, 800)} loading="lazy" />
                </div>
                <div className={isReverse ? "md:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#d95a40]/10 text-[#d95a40]">
                      <Icon size={20} strokeWidth={2.5} />
                    </span>
                    <span className="text-xs uppercase font-semibold tracking-[0.1em] text-[#5c6b6d]">Step {idx + 1} — {p.eyebrow}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold">{p.title}</h2>
                  <p className="mt-4 text-[#1c2b2d]/80 leading-relaxed">{p.desc}</p>
                  {p.bullets && p.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {p.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[#1c2b2d]/85">
                          <Check size={18} className="text-[#d95a40] mt-1 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.key === "work-pathways" && (
                    <Link to="/stories" className="btn-outline mt-6">Read placement stories <ArrowRight size={18} /></Link>
                  )}
                  {p.key === "employer-partners" && (
                    <Link to="/get-involved/partnership" className="btn-primary mt-6">Become a partner employer <ArrowRight size={18} /></Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Programme;
