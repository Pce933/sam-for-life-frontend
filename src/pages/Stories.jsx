import React from "react";
import { Quote } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";
import { optimizeUnsplashUrl } from "../lib/utils";

const Stories = () => {
  const { content, loading } = useContent();
  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const stories = content.stories || [];

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">Who we help</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.stories_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.stories_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto space-y-10">
          {stories.map((st, idx) => {
            const isReverse = idx % 2 === 1;
            return (
              <article key={st.id} className="sam-card overflow-hidden p-0 grid md:grid-cols-2 gap-0">
                <div className={`${isReverse ? "md:order-2" : ""} relative h-72 md:h-auto md:min-h-[480px] overflow-hidden`}>
                  <img alt={st.name} className="absolute inset-0 w-full h-full object-cover" src={optimizeUnsplashUrl(st.image, 800)} loading="lazy" />
                </div>
                <div className={`${isReverse ? "md:order-1" : ""} p-8 md:p-12 flex flex-col justify-center`}>
                  <Quote size={32} className="text-[#d95a40] mb-4" />
                  <p className="text-2xl md:text-3xl font-display font-semibold leading-snug text-[#1c2b2d]">“{st.quote}”</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-1 bg-[#d95a40] rounded-full" />
                    <div>
                      <div className="font-display text-xl font-bold">{st.name}, {st.age}</div>
                      <div className="text-sm text-[#5c6b6d]">{st.role}</div>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] text-[#5c6b6d] italic">As told by {st.teller}.</p>
                  <p className="mt-3 text-[#1c2b2d]/85 leading-relaxed">{st.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Stories;
