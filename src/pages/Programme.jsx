import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Briefcase, Building2, Check, Sparkles, ArrowDown } from "lucide-react";
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
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden section-pad pt-16 md:pt-24 bg-gradient-to-b from-[#f5ede0] to-[#faf8f5]">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e4a834]/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center fade-up">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d95a40]/10 text-[#d95a40] text-xs uppercase font-bold tracking-wider mb-6">
              <Sparkles size={12} /> The SAM Pathway
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#1c2b2d]">
              {s.programme_intro_title || "How We Guide Young People to Success"}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">
              {s.programme_intro_body || "Our evidence-based programme provides a clear, structured pathway from education into stable employment."}
            </p>
            <div className="mt-8">
              <a 
                href="#pathway-steps" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pathway-steps")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore the Pathway <ArrowDown size={18} className="animate-bounce" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            {/* Visual Roadmap Summary Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#ece4d6] shadow-[0_20px_50px_-20px_rgba(28,43,45,0.1)] relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-[#e4a834] flex items-center justify-center text-[#1c2b2d] font-bold text-xl shadow-lg">
                SAM
              </div>
              <h3 className="font-display font-bold text-xl text-[#1c2b2d] mb-6 pt-2">Our Three-Step Framework</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#d95a40]/10 text-[#d95a40] flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1c2b2d]">Professional Preparation</h4>
                    <p className="text-xs text-[#5c6b6d] mt-0.5">Mock interviews, CV workshops, and soft skills training.</p>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-[#ece4d6]/40 pt-4">
                  <div className="w-8 h-8 rounded-full bg-[#e4a834]/20 text-[#d09524] flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1c2b2d]">Supported Work Placement</h4>
                    <p className="text-xs text-[#5c6b6d] mt-0.5">Real-world internships matched with direct mentors.</p>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-[#ece4d6]/40 pt-4">
                  <div className="w-8 h-8 rounded-full bg-[#3b8262]/10 text-[#3b8262] flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1c2b2d]">Sustainable Career Launch</h4>
                    <p className="text-xs text-[#5c6b6d] mt-0.5">Long-term transition into full-time roles and partnerships.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps List Section */}
      <section id="pathway-steps" className="section-pad relative bg-[#faf8f5] overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Vertical central connection line (desktop only) */}
          <div className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-[#d95a40]/30 via-[#e4a834]/30 to-[#3b8262]/30 -translate-x-1/2 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-28 relative">
            {programmeSteps.map((p, idx) => {
              const Icon = iconMap[p.icon] || GraduationCap;
              const isReverse = idx % 2 === 1;
              return (
                <div 
                  key={p.id} 
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative`}
                >
                  {/* Step Image */}
                  <div className={`lg:col-span-6 ${isReverse ? "lg:order-2" : ""} relative group`}>
                    {/* Visual Card Frame */}
                    <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_15px_40px_-15px_rgba(28,43,45,0.15)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_50px_-20px_rgba(28,43,45,0.25)]">
                      <img 
                        alt={p.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                        src={optimizeUnsplashUrl(p.image, 900)} 
                        loading="lazy" 
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`lg:col-span-6 ${isReverse ? "lg:order-1" : ""} relative`}>
                    
                    {/* Large display number background */}
                    <div className="absolute -top-14 left-0 font-display text-8xl font-black text-[#1c2b2d]/5 select-none pointer-events-none">
                      0{idx + 1}
                    </div>

                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#d95a40]/10 text-[#d95a40]">
                        <Icon size={22} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs uppercase font-bold tracking-[0.15em] text-[#5c6b6d]">
                        Step {idx + 1} — {p.eyebrow}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1c2b2d] tracking-tight mb-4">
                      {p.title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-[#1c2b2d]/80 leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    {p.bullets && p.bullets.length > 0 && (
                      <div className="mb-8">
                        <ul className="grid md:grid-cols-2 gap-3">
                          {p.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5 bg-white/70 hover:bg-white border border-[#ece4d6]/60 rounded-2xl p-3 shadow-sm transition-all duration-200">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3b8262]/10 text-[#3b8262] flex items-center justify-center mt-0.5">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span className="text-xs font-semibold text-[#1c2b2d]/80 leading-tight">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {p.key === "work-pathways" && (
                        <Link to="/stories" className="btn-outline inline-flex items-center gap-2 group/btn">
                          Read placement stories 
                          <ArrowRight size={18} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </Link>
                      )}
                      {p.key === "employer-partners" && (
                        <Link to="/get-involved/partnership" className="btn-primary inline-flex items-center gap-2 group/btn">
                          Become a partner employer 
                          <ArrowRight size={18} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="section-pad bg-[#1c2b2d] text-[#faf8f5] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#d95a40]/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto text-center py-8 md:py-12 fade-up">
          <span className="text-[#e4a834] eyebrow">Join Our Network</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
            Ready to Help Us Make a Difference?
          </h2>
          <p className="text-lg text-[#a8b5b7] max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you are a local business offering internships, a professional volunteer, or a generous donor, your support powers our 3-step programme.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-involved" className="btn-primary">
              Get Involved <ArrowRight size={18} />
            </Link>
            <Link to="/get-involved/donate" className="btn-outline !text-[#faf8f5] !border-[#faf8f5] hover:!bg-[#faf8f5] hover:!text-[#1c2b2d]">
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programme;
