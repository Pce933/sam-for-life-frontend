import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, X } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";
import { optimizeUnsplashUrl } from "../lib/utils";

const Stories = () => {
  const { content, loading } = useContent();
  const [selectedStory, setSelectedStory] = useState(null);

  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const stories = content.stories || [];

  return (
    <div>
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden section-pad pt-16 md:pt-24 bg-gradient-to-b from-[#f5ede0] to-[#faf8f5]">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e4a834]/20 via-transparent to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center fade-up">
          <span className="text-[#d95a40] eyebrow">Who we help</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05] text-[#1c2b2d]">
            {s.stories_intro_title || "Stories of Real Impact"}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl mx-auto">
            {s.stories_intro_body || "Discover how young people have launched meaningful careers through our preparation courses and work placements."}
          </p>
        </div>
      </section>

      {/* Grid List Section */}
      <section className="section-pad pt-0 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((st) => (
              <div 
                key={st.id} 
                className="bg-white rounded-[2rem] border border-[#ece4d6] overflow-hidden shadow-[0_10px_35px_-20px_rgba(28,43,45,0.08)] hover:shadow-[0_20px_45px_-15px_rgba(28,43,45,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Top Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    alt={st.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                    src={optimizeUnsplashUrl(st.image, 600)} 
                    loading="lazy" 
                  />
                  {/* Floating Role Badge */}
                  <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#1c2b2d] text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
                    {st.role}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <Quote size={28} className="text-[#d95a40] mb-4 shrink-0" />
                  
                  <h3 className="font-display text-lg md:text-xl font-bold text-[#1c2b2d] leading-snug mb-4 flex-grow line-clamp-3">
                    “{st.quote}”
                  </h3>

                  <p className="text-sm text-[#1c2b2d]/75 line-clamp-4 mb-6 leading-relaxed">
                    {st.body}
                  </p>

                  {/* Footer details */}
                  <div className="mt-auto pt-5 border-t border-[#ece4d6]/60 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-[#1c2b2d]">
                        {st.name}, {st.age}
                      </h4>
                      <p className="text-[11px] text-[#5c6b6d]">
                        As told by {st.teller}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedStory(st)}
                      className="text-xs font-bold text-[#d95a40] hover:text-[#c14a33] inline-flex items-center gap-1 group/btn"
                    >
                      Read full story 
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="section-pad bg-[#1c2b2d] text-[#faf8f5] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#e4a834]/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto text-center py-6 md:py-10 fade-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
            Support the Next Success Story
          </h2>
          <p className="text-lg text-[#a8b5b7] max-w-2xl mx-auto mb-8 leading-relaxed">
            Your donations directly fund our preparation courses, secure placement positions, and launch young careers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-involved/donate" className="btn-primary">
              Donate Now <ArrowRight size={18} />
            </Link>
            <Link to="/programme" className="btn-outline !text-[#faf8f5] !border-[#faf8f5] hover:!bg-[#faf8f5] hover:!text-[#1c2b2d]">
              Explore Our Programme
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Modal for Full Story */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2b2d]/60 backdrop-blur-md fade-in"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="bg-[#faf8f5] w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#ece4d6] relative max-h-[90vh] flex flex-col md:flex-row"
            style={{ animation: 'fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left/Top Image Column */}
            <div className="md:w-5/12 h-56 md:h-auto relative shrink-0">
              <img 
                alt={selectedStory.name} 
                className="w-full h-full object-cover absolute inset-0"
                src={optimizeUnsplashUrl(selectedStory.image, 800)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-black/10"></div>
            </div>

            {/* Right/Bottom Content Column */}
            <div className="md:w-7/12 p-8 md:p-10 overflow-y-auto flex flex-col justify-between max-h-[60vh] md:max-h-none">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1c2b2d] flex items-center justify-center shadow-md transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="pt-2">
                <Quote size={28} className="text-[#d95a40] mb-4" />
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#1c2b2d] leading-snug mb-5">
                  “{selectedStory.quote}”
                </h3>
                <p className="text-sm text-[#1c2b2d]/85 leading-relaxed mb-6 whitespace-pre-line">
                  {selectedStory.body}
                </p>
              </div>

              <div className="pt-5 border-t border-[#ece4d6] flex justify-between items-end">
                <div>
                  <h4 className="font-display font-bold text-base text-[#1c2b2d]">
                    {selectedStory.name}, {selectedStory.age}
                  </h4>
                  <p className="text-xs text-[#5c6b6d]">{selectedStory.role}</p>
                </div>
                <p className="text-[11px] text-[#5c6b6d] italic">
                  As told by {selectedStory.teller}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
