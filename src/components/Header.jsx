import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programme", label: "Programme" },
  { to: "/stories", label: "Stories" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e8e2d9]"
      data-testid="site-navbar"
    >
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="container-x h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-[#1c2b2d]">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#d95a40] text-white">
            <Heart size={20} fill="white" strokeWidth={2.5} />
          </span>
          SAM <span className="text-[#d95a40]">for Life</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-medium text-[15px] transition-colors hover:text-[#d95a40] ${
                  isActive ? "text-[#d95a40]" : "text-[#1c2b2d]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/get-involved/donate" className="btn-primary">
            <Heart size={16} strokeWidth={2.5} /> Donate
          </Link>
        </div>

        <button
          className="lg:hidden text-[#1c2b2d] p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e8e2d9] bg-[#faf8f5]">
          <div className="container-x py-5 flex flex-col gap-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-medium text-base ${isActive ? "text-[#d95a40]" : "text-[#1c2b2d]"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/get-involved/donate" className="btn-primary justify-center mt-2">
              <Heart size={16} strokeWidth={2.5} /> Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
