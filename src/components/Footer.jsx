import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "../contexts/ContentContext";
import { submitNewsletter } from "../api/client";

const Footer = () => {
  const s = useSettings();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    try {
      const res = await submitNewsletter(email);
      if (res.already) {
        toast.message("You're already subscribed.", { description: "Thanks for being part of our community." });
      } else {
        toast.success("Thank you! You're subscribed.", { description: "We'll send monthly stories and updates." });
      }
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed", { description: "Please try again in a moment." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="bg-[#1c2b2d] text-[#faf8f5] mt-24">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-white">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#d95a40] text-white">
                <Heart size={20} fill="white" strokeWidth={2.5} />
              </span>
              SAM for Life
            </Link>
            <p className="mt-4 text-[#a8b5b7] leading-relaxed">{s.footer_tagline || "Empowering children with special needs to discover their abilities and step into employment with confidence."}</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-[#a8b5b7]">
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/about">About Us</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/programme">Our Programme</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/stories">Stories</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/news">News &amp; Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-[#a8b5b7]">
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/get-involved/donate">Donate</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/get-involved/volunteer">Volunteer</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/get-involved/partnership">Partner with us</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/get-involved/fundraise">Fundraise</Link></li>
              <li><Link className="hover:text-[#e4a834] transition-colors" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">Stay in touch</h4>
            <p className="text-[#a8b5b7] mb-3 text-sm">Monthly stories, programme updates and ways to help.</p>
            <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="px-4 py-3 rounded-full bg-[#2a3a3c] border border-[#3b4d4f] text-white placeholder-[#7a8a8c] focus:outline-none focus:border-[#e4a834]"
              />
              <button type="submit" className="btn-secondary justify-center disabled:opacity-60" disabled={busy}>
                {busy ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <div className="flex gap-3 mt-5">
              <a href={s.social_facebook || "#"} aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#2a3a3c] flex items-center justify-center hover:bg-[#d95a40] transition-colors">
                <Facebook size={18} />
              </a>
              <a href={s.social_instagram || "#"} aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#2a3a3c] flex items-center justify-center hover:bg-[#d95a40] transition-colors">
                <Instagram size={18} />
              </a>
              <a href={s.social_linkedin || "#"} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#2a3a3c] flex items-center justify-center hover:bg-[#d95a40] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#2f4143] flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-[#a8b5b7]">
          <div className="flex flex-wrap gap-6">
            <span className="inline-flex items-center gap-2"><Mail size={14} /> {s.footer_email || "hello@samforlife.org"}</span>
            <span className="inline-flex items-center gap-2"><Phone size={14} /> {s.footer_phone || "+44 20 0000 0000"}</span>
            <span className="inline-flex items-center gap-2"><MapPin size={14} /> {s.footer_location || "United Kingdom"}</span>
          </div>
          <div>{s.footer_copyright || "\u00a9 2026 SAM for Life. Registered charity (pending)."}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
