import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

/* =========================
   Same "Studio Monitor" design system as the homepage Hero —
   console-style vertical nav, tally-red accents, mono labels,
   viewfinder corner brackets. No grid/scanline texture here.
========================= */

/* Isolated so its 1s tick never re-renders the rest of the hero */
const LiveTimecode = () => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const format = (total) => {
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/50">
      <span className="relative flex h-1.5 w-1.5">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F13A34] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F13A34]" />
      </span>
      LIVE&nbsp;&middot;&nbsp;{format(elapsed)}
    </div>
  );
};

/* Corner brackets — viewfinder framing, purely decorative */
const ViewfinderFrame = () => (
  <div className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-8 z-20">
    {[
      "top-0 left-0 border-t border-l",
      "top-0 right-0 border-t border-r",
      "bottom-0 left-0 border-b border-l",
      "bottom-0 right-0 border-b border-r",
    ].map((pos, i) => (
      <span
        key={i}
        className={`absolute h-5 w-5 sm:h-7 sm:w-7 border-white/25 ${pos}`}
      />
    ))}
  </div>
);

/* =========================
   Global Reusable Hero Component with Integrated Navbar
========================= */
export default function GlobalHero({
  title = "Our Services",
  subtitle = "Digital Excellence, Tailored Solutions",
  description = "We deliver comprehensive digital solutions that drive growth, enhance engagement, and transform your brand's online presence through innovative strategies and creative execution.",
  breadcrumbs = [
    { label: "Home", icon: Home, href: "#" },
    { label: "Services", href: "#" },
    { label: "Digital Marketing", href: "#", current: true },
  ],
  backgroundImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  centered = false,
  titleColors = { first: "white", second: "#f13a34" },
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
    ],
    []
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <section className="relative min-h-[92vh] md:min-h-[88vh] overflow-hidden bg-[#08090A]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Gradient Overlays — same grade as the homepage Hero, no grid/scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,180,120,0.14),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.45),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-[#08090A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/70" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_200px_90px_rgba(0,0,0,0.7)]" />

      <ViewfinderFrame />

      {/* Navbar - Inside Hero Section */}
      <nav className="relative z-50 bg-transparent">
        <div className="section-container flex items-start justify-between pt-10 pb-4 md:pt-14 md:pb-5">
          {/* Desktop Navigation - Vertical on right */}
          <div className="hidden md:flex w-full items-start justify-between">
            <div className="flex flex-col gap-2">
              <Link to="/" className="flex shrink-0 items-center gap-2">
                <img
                  src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
                  alt="Logo"
                  className="h-14 md:h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
              <LiveTimecode />
            </div>

            {/* Vertical nav — console styling, matches homepage Hero */}
            <div className="flex items-center mt-3 md:mt-4">
              <div className="relative flex flex-col items-end gap-2.5 border-r-2 border-[#F13A34]/70 pr-5">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="group relative flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300"
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          active
                            ? "text-white"
                            : "text-white/45 group-hover:text-white/85"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`h-[3px] w-[3px] transition-all duration-300 ${
                          active
                            ? "scale-100 bg-[#F13A34] shadow-[0_0_8px_2px_rgba(241,58,52,0.8)]"
                            : "scale-0 bg-white/50"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex w-full items-center justify-between">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
                alt="Logo"
                className="h-10 object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="border border-white/15 bg-black/40 p-2.5 text-white backdrop-blur-md transition-colors hover:border-[#F13A34]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <nav className="section-container flex flex-col space-y-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 font-mono text-[13px] font-medium tracking-[0.18em] uppercase transition-colors ${
                      isActive(link.href)
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="h-[3px] w-[3px] bg-[#F13A34] shadow-[0_0_8px_2px_rgba(241,58,52,0.8)]" />
                    )}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content - Inside Hero Section */}
      <div
        className={`relative z-10 h-full flex items-center ${
          centered ? "justify-center" : "justify-start"
        } section-container pb-20 text-white`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`max-w-6xl w-full ${centered ? "text-center" : "text-left"}`}
        >
          <div className={`max-w-4xl ${centered ? "mx-auto" : ""}`}>
            <h1 className="section-heading text-white">
              <span className="relative block text-[50px] font-black uppercase leading-[0.98] tracking-tight text-white">
                {title}
              </span>
              <span className="relative mt-4 inline-block font-mono text-[clamp(0.95rem,1.6vw,1.15rem)] font-medium uppercase tracking-[0.28em]">
                {subtitle.split(" ").map((word, index, array) => (
                  <span
                    key={index}
                    style={{
                      color: index === 1 ? titleColors.second : titleColors.first,
                      opacity: index === 1 ? 1 : 0.55,
                    }}
                  >
                    {word}
                    {index < array.length - 1 ? " " : ""}
                  </span>
                ))}
                <span
                  className={`absolute -bottom-2 h-px w-full bg-gradient-to-r from-[#F13A34] via-[#F13A34]/60 to-transparent ${
                    centered ? "left-0 right-0 mx-auto" : "left-0"
                  }`}
                />
              </span>
            </h1>

            <p
              className={`max-w-3xl mt-7 text-[16px] text-white/65 leading-relaxed ${
                centered ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>

            {/* Breadcrumbs — console-style, matches homepage Hero's mono labels */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className={`mt-9 md:mt-10 ${centered ? "flex justify-center" : ""}`}>
                <nav
                  className="inline-flex items-center gap-2 md:gap-2.5 flex-wrap border-l-2 border-[#F13A34] bg-black/30 py-2 pl-4 pr-5 backdrop-blur-sm"
                  aria-label="Breadcrumb"
                >
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-white/30" />
                      )}
                      <Link
                        to={item.href}
                        className={`group inline-flex items-center gap-1.5 font-mono text-[11px] md:text-[12px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                          item.current
                            ? "text-white"
                            : "text-white/50 hover:text-white/85"
                        }`}
                      >
                        {item.icon && <item.icon className="w-3.5 h-3.5" />}
                        <span>{item.label}</span>
                        {item.current && (
                          <span className="h-[3px] w-[3px] bg-[#F13A34] shadow-[0_0_8px_2px_rgba(241,58,52,0.8)]" />
                        )}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}