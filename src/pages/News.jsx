import React, { useState, useEffect, useCallback } from "react";
import { useContent } from "../contexts/ContentContext";
import { Calendar, ArrowRight, X, Tag, Clock, Share2, BookOpen } from "lucide-react";
import Loading from "../components/Loading";

const tagColor = {
  ANNOUNCEMENT: "bg-[#d95a40] text-white",
  PARTNERSHIP:  "bg-[#e4a834] text-[#1c2b2d]",
  RESEARCH:     "bg-[#8aa694] text-white",
};

const tagAccent = {
  ANNOUNCEMENT: "#d95a40",
  PARTNERSHIP:  "#e4a834",
  RESEARCH:     "#8aa694",
};

/* ── Article Modal ─────────────────────────────────────────────── */
const ArticleModal = ({ article, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!article) return null;

  const accent = tagAccent[article.tag] || "#d95a40";

  // Build a fuller article body from the description
  const fullBody = article.body || article.desc;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "modalSlideUp 0.3s cubic-bezier(0.34,1.2,0.64,1) both",
        }}
      >
        {/* Coloured accent bar */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: accent }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#f4ede0] flex items-center justify-center text-[#1c2b2d] hover:bg-[#d95a40] hover:text-white transition-all"
          aria-label="Close article"
        >
          <X size={18} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-8 py-7">

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wider px-3 py-1.5 rounded-full ${tagColor[article.tag] || "bg-[#d95a40] text-white"}`}
            >
              <Tag size={10} />
              {article.tag}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#5c6b6d]">
              <Calendar size={13} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#5c6b6d]">
              <Clock size={13} />
              {Math.max(1, Math.ceil(fullBody.split(" ").length / 200))} min read
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ color: "#1c2b2d" }}
          >
            {article.title}
          </h2>

          {/* Divider */}
          <div className="w-12 h-1 rounded-full mb-6" style={{ background: accent }} />

          {/* Article body */}
          <div className="prose prose-lg max-w-none text-[#1c2b2d]/80 leading-relaxed space-y-4">
            {/* Lead paragraph – the original description */}
            <p className="text-lg font-medium text-[#1c2b2d] leading-relaxed">
              {article.desc}
            </p>

            {/* Extended body if available, else generate contextual paragraphs */}
            {fullBody !== article.desc ? (
              fullBody.split("\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <>
                <p>
                  This is a significant milestone for SAM for Life and the communities we serve.
                  Our team has been working tirelessly to bring this update to fruition, and we
                  are proud to share it with our supporters, families, and partner organisations.
                </p>
                <p>
                  At SAM for Life, everything we do is guided by our belief that every young
                  person — regardless of their learning difference, physical challenge, or
                  neurodiversity — carries unique strengths the world needs. This latest
                  development is a direct reflection of that commitment.
                </p>
                <p>
                  We would like to extend our deepest gratitude to everyone who has supported
                  us along the way: our donors, volunteers, employer partners, and most
                  importantly, the young people and families who trust us with their journeys.
                </p>
                <p>
                  If you would like to learn more, get involved, or share this news with your
                  network, please reach out to us at{" "}
                  <a
                    href="mailto:hello@samforlife.org"
                    className="font-semibold underline"
                    style={{ color: accent }}
                  >
                    hello@samforlife.org
                  </a>
                  . Together, we can open more doors.
                </p>
              </>
            )}
          </div>

          {/* Tags / share footer */}
          <div className="mt-8 pt-6 border-t border-[#f0ebe3] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-[#5c6b6d]" />
              <span className="text-sm text-[#5c6b6d]">SAM for Life News</span>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, text: article.desc, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border-2 transition-all hover:text-white"
              style={{ borderColor: accent, color: accent }}
              onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accent; }}
            >
              <Share2 size={14} />
              Share article
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
};

/* ── News Card ─────────────────────────────────────────────────── */
const NewsCard = ({ item, onClick }) => (
  <article
    key={item.id}
    className="sam-card p-6 group cursor-pointer flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    onClick={() => onClick(item)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(item); }}
    aria-label={`Read full article: ${item.title}`}
  >
    {/* Date */}
    <div className="flex items-center gap-2 text-[#5c6b6d] text-sm">
      <Calendar size={14} />
      <span>{item.date}</span>
    </div>

    {/* Tag */}
    <span
      className={`inline-block mt-4 text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full w-fit ${tagColor[item.tag] || "bg-[#d95a40] text-white"}`}
    >
      {item.tag}
    </span>

    {/* Title */}
    <h3 className="font-display text-2xl font-bold mt-4 leading-snug group-hover:text-[#d95a40] transition-colors flex-1">
      {item.title}
    </h3>

    {/* Description */}
    <p className="mt-3 text-[#5c6b6d] leading-relaxed line-clamp-3">
      {item.desc}
    </p>

    {/* Read more */}
    <div
      className="mt-5 inline-flex items-center gap-2 font-semibold text-sm transition-all group-hover:gap-3"
      style={{ color: tagAccent[item.tag] || "#d95a40" }}
    >
      Read more <ArrowRight size={16} />
    </div>
  </article>
);

/* ── Page ──────────────────────────────────────────────────────── */
const News = () => {
  const { content, loading } = useContent();
  const [selected, setSelected] = useState(null);

  const handleClose = useCallback(() => setSelected(null), []);

  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const items = content.news || [];

  return (
    <div>
      {/* Modal */}
      {selected && <ArticleModal article={selected} onClose={handleClose} />}

      {/* Hero */}
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">News &amp; Events</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">
            {s.news_intro_title}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">
            {s.news_intro_body}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {items.map((n) => (
            <NewsCard key={n.id} item={n} onClick={setSelected} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
