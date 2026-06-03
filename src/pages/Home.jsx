import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Sparkles, Quote, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  building: Building2,
};

const Home = () => {
  const { content, loading } = useContent();
  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const impactStats = content.impact_stats || [];
  const programmeSteps = content.programme || [];
  const stories = content.stories || [];
  const firstStory = stories[0];
  const lastImpact = impactStats[impactStats.length - 1];

  return (
    <div data-testid="home-page">
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e4a834]/20 text-[#1c2b2d] text-sm font-semibold mb-6">
              <Sparkles size={14} strokeWidth={2.5} /> {s.hero_badge}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {s.hero_headline_a} <span className="text-[#d95a40]">{s.hero_headline_b}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-xl">{s.hero_subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-involved/donate" className="btn-primary">
                <Heart size={18} strokeWidth={2.5} /> Support a young person
              </Link>
              <Link to="/programme" className="btn-outline">
                Learn about our programme <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(28,43,45,0.25)]">
                <img alt="Young person in a learning environment" className="w-full h-[460px] object-cover" src={s.hero_image} />
              </div>
              {firstStory && (
                <div className="absolute -bottom-8 -left-6 md:-left-10 bg-white rounded-3xl p-5 shadow-xl max-w-xs hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#8aa694]/30 flex items-center justify-center">
                      <Quote size={20} className="text-[#3b8262]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1c2b2d]">{firstStory.name}, {firstStory.age}</div>
                      <div className="text-xs text-[#5c6b6d]">"They saw what no-one else did."</div>
                    </div>
                  </div>
                </div>
              )}
              {lastImpact && (
                <div className="absolute -top-5 -right-3 bg-[#d95a40] text-white rounded-2xl px-4 py-3 shadow-xl hidden md:block">
                  <div className="font-display text-2xl font-bold">{lastImpact.value}</div>
                  <div className="text-xs leading-tight opacity-90">families report<br/>more confidence</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1c2b2d] text-[#faf8f5] py-14 md:py-16">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <span className="text-[#e4a834] eyebrow">{s.impact_eyebrow}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">{s.impact_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impactStats.map((st) => (
              <div key={st.id} className="border-t border-[#3b4d4f] pt-6">
                <div className="font-display text-6xl md:text-7xl font-bold text-[#e4a834]">{st.value}</div>
                <p className="mt-3 text-[#a8b5b7] leading-relaxed text-lg">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#d95a40] eyebrow">{s.mission_eyebrow}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">{s.mission_title}</h2>
          <p className="mt-6 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed">{s.mission_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="text-[#d95a40] eyebrow">Our programme</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Three steps. One whole life.</h2>
            </div>
            <Link to="/programme" className="btn-outline self-start">Full programme details <ArrowRight size={18} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programmeSteps.map((p) => {
              const Icon = iconMap[p.icon] || GraduationCap;
              return (
                <Link key={p.id} to="/programme" className="sam-card p-6 group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                    <img alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={p.image} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#d95a40]/10 text-[#d95a40]">
                      <Icon size={20} strokeWidth={2.5} />
                    </span>
                    <span className="text-xs uppercase font-semibold tracking-[0.1em] text-[#5c6b6d]">{p.eyebrow}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-[#5c6b6d] leading-relaxed">{p.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="text-[#d95a40] eyebrow">Lives changed</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Meet the young people we serve.</h2>
            </div>
            <Link to="/stories" className="btn-outline self-start">All stories <ArrowRight size={18} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((st) => (
              <article key={st.id} className="sam-card overflow-hidden p-0">
                <div className="aspect-[5/4] overflow-hidden">
                  <img alt={st.name} className="w-full h-full object-cover" src={st.image} />
                </div>
                <div className="p-6">
                  <div className="font-display text-2xl font-bold">{st.name}, {st.age}</div>
                  <div className="text-sm text-[#5c6b6d] mt-1">{st.role}</div>
                  <p className="mt-4 text-[#1c2b2d]/85 italic leading-relaxed">"{st.quote}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto bg-[#d95a40] text-white rounded-[2.5rem] p-10 md:p-16 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">{s.support_strip_title}</h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link to="/get-involved/donate" className="bg-white text-[#d95a40] rounded-full px-8 py-4 font-semibold text-center hover:bg-[#1c2b2d] hover:text-white transition-colors">Donate now</Link>
            <Link to="/get-involved/partnership" className="border-2 border-white text-white rounded-full px-8 py-4 font-semibold text-center hover:bg-white hover:text-[#d95a40] transition-colors">Become an employer partner</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
