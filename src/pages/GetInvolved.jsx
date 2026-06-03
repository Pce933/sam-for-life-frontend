import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Handshake, Trophy, ArrowRight } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import Loading from "../components/Loading";

const iconMap = { heart: Heart, users: Users, handshake: Handshake, trophy: Trophy };

const GetInvolved = () => {
  const { content, loading } = useContent();
  if (loading || !content) return <Loading />;
  const s = content.settings || {};
  const cards = content.involvement || [];

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">Get involved</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.get_involved_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.get_involved_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {cards.map((c) => {
            const Icon = iconMap[c.icon] || Heart;
            return (
              <Link key={c.id} to={c.to} className="sam-card p-8 group flex flex-col">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#d95a40]/10 text-[#d95a40]">
                  <Icon size={24} strokeWidth={2.4} />
                </span>
                <h3 className="font-display text-2xl font-bold mt-5">{c.title}</h3>
                <p className="mt-3 text-[#5c6b6d] leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[#d95a40] font-semibold group-hover:gap-3 transition-all">Continue <ArrowRight size={18} /></div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
