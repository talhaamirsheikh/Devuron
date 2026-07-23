import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Globe,
  Smartphone,
  Bot,
  Palette,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logo from "../../public/logo.png"

/* =========================
   Design direction: "Studio Monitor"
   Vantage runs content, video and live-event campaigns —
   so the hero borrows the vernacular of a broadcast/production
   monitor: viewfinder brackets, a rule-of-thirds grid, a running
   timecode, tally-light reds and mono chapter labels — instead
   of a generic dark-glass SaaS treatment.
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
    <>
    
    </>
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

/* Faint rule-of-thirds grid + scanlines — studio-monitor texture */
const MonitorTexture = () => (
  <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
    <div className="absolute inset-y-0 left-[33.333%] w-px bg-white/[0.05]" />
    <div className="absolute inset-y-0 left-[66.666%] w-px bg-white/[0.05]" />
    <div className="absolute inset-x-0 top-[33.333%] h-px bg-white/[0.05]" />
    <div className="absolute inset-x-0 top-[66.666%] h-px bg-white/[0.05]" />
    <div
      className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
      }}
    />
  </div>
);

/* =========================
   Services data — shared by the desktop mega menu and the
   mobile off-canvas accordion
========================= */
const SERVICES = [
  {
    icon: Globe,
    title: "Website & Web Development",
    description: "Business sites, custom web apps & SaaS platforms.",
    href: "/services#web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native Android, iOS & cross-platform apps.",
    href: "/services#mobile-apps",
  },
  {
    icon: Bot,
    title: "AI Solutions & Automation",
    description: "AI agents, chatbots & workflow automation.",
    href: "/services#ai-automation",
  },
  {
    icon: Palette,
    title: "Graphic Design & Video Editing",
    description: "Bold visuals and video that tell your story.",
    href: "/services#design-video",
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    description: "Data-driven SEO & campaigns that grow reach.",
    href: "/services#seo-marketing",
  },
];

/* =========================
   Info Box — "clip preview" monitor card
========================= */
const InfoBox = ({ slide, variant = "floating" }) => {
  const image =
    slide?.infoImage ||
    slide?.info_image ||
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80";

  const wrapperClass =
    variant === "floating"
      ? "hidden lg:block absolute bottom-12 xl:bottom-14 right-8 xl:right-12 z-30 w-[300px] xl:w-[336px]"
      : "block lg:hidden w-full max-w-md";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, x: variant === "floating" ? 24 : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={wrapperClass}
    >
      <div className="group relative border border-white/15 bg-black/40 p-3.5 sm:p-4 backdrop-blur-xl transition-colors duration-500 hover:border-[#F13A34]/40">
        {/* corner tab */}
        <div className="absolute -top-px -left-px flex items-center gap-1 border-b border-r border-white/15 bg-black px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">
            CLIP
          </span>
        </div>

        <div className="flex items-center gap-4 pt-3">
          <div className="relative shrink-0 overflow-hidden border border-white/20">
            <img
              src={image}
              alt={slide?.projectDescription || "Recent project preview"}
              className="h-16 w-16 sm:h-[4.25rem] sm:w-[4.25rem] object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="min-w-0 flex-1">
            {slide?.projectDescription && (
              <p className="mb-2.5 line-clamp-2 text-[12px] sm:text-[12.5px] font-medium leading-snug text-white/60">
                {slide.projectDescription}
              </p>
            )}
            <Link
              to="/contact"
              className="group/btn inline-flex items-center gap-2 bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-black transition-all duration-300 ease-out hover:bg-[#F13A34] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================
   Services Mega Menu — desktop, glassmorphism panel
========================= */
const ServicesMegaMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-full z-40 hidden md:block w-[94vw] max-w-6xl xl:max-w-7xl -translate-x-1/2 pt-3"
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06]">
            {SERVICES.map((service) => {
              const SIcon = service.icon;
              return (
                <Link
                  key={service.title}
                  to={service.href}
                  onClick={onClose}
                  className="group flex flex-col gap-4 bg-black/70 p-6 xl:p-7 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#F13A34] transition-colors duration-300 group-hover:border-[#F13A34]/60">
                    <SIcon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white">
                    {service.title}
                  </span>
                  <span className="text-[13px] leading-relaxed text-white/55">
                    {service.description}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* =========================
   Mobile off-canvas menu — slides in from the right
========================= */
const MobileOffCanvas = ({ open, onClose, navLinks, isActive }) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm overflow-y-auto border-l border-white/10 bg-[#08090A]/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
                MENU
              </span>
              <button
                onClick={onClose}
                className="border border-white/15 bg-black/40 p-2 text-white transition-colors hover:border-[#F13A34]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-3 py-3">
              {navLinks.map((link) => {
                if (link.isServices) {
                  return (
                    <div key={link.href} className="border-b border-white/[0.06]">
                      <button
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className={`flex w-full items-center justify-between px-3 py-3.5 font-mono text-[13px] font-medium tracking-[0.18em] uppercase transition-colors ${
                          isActive(link.href)
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                        aria-expanded={servicesOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden pb-2"
                          >
                            {SERVICES.map((service) => {
                              const SIcon = service.icon;
                              return (
                                <Link
                                  key={service.title}
                                  to={service.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-3 py-2.5 text-white/60 transition-colors hover:text-white"
                                >
                                  <SIcon className="h-4 w-4 shrink-0 text-[#F13A34]" />
                                  <span className="text-[12.5px] font-medium tracking-wide">
                                    {service.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between border-b border-white/[0.06] px-3 py-3.5 font-mono text-[13px] font-medium tracking-[0.18em] uppercase transition-colors ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="h-[3px] w-[3px] bg-[#F13A34] shadow-[0_0_8px_2px_rgba(241,58,52,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="px-6 py-5">
              <Link
                to="/join-us"
                onClick={onClose}
                className="group flex w-full items-center  justify-center gap-2 bg-[#F13A34] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300  hover:bg-white hover:text-[#F13A34] hover:border-1 hover:border-[#F13A34]"
              >
                Join Us
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* =========================
   Main Hero Component
========================= */
export default function Hero({ heroData, loading }) {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const sectionRef = useRef(null);
  const closeTimer = useRef(null);

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services", isServices: true },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
    ],
    []
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // Close the mega menu on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 120);
  };

  const defaultSlides = [
    {
      title: "WEB DEVELOPMENT",
      subtitle: "CUSTOM SITES & SAAS PLATFORMS",
      description:
        "We design and build fast, scalable business websites, custom web applications and SaaS platforms engineered to grow with you.",
      category: "Website & Web Development",
      icon: Globe,
      bgImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "SaaS platform shipped and running at 99.9% uptime",
    },
    {
      title: "MOBILE APPS",
      subtitle: "ANDROID · iOS · CROSS-PLATFORM",
      description:
        "From native Android and iOS builds to cross-platform apps, we design and ship mobile experiences your users will love.",
      category: "Mobile App Development",
      icon: Smartphone,
      bgImage:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "Cross-platform app that passed 100K+ downloads",
    },
    {
      title: "AI & AUTOMATION",
      subtitle: "AGENTS · CHATBOTS · WORKFLOWS",
      description:
        "We build AI agents, intelligent chatbots and workflow automations that cut manual work and scale your operations.",
      category: "AI Solutions & Automation",
      icon: Bot,
      bgImage:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "Automation workflow saving 30+ hours every week",
    },
  ];

  const slides = heroData?.slides || heroData?.data || defaultSlides;

  // Auto slide change (unchanged logic)
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide] || slides[0];
  const Icon = slide?.icon || Globe;

  const chapterLabel = (s, i) =>
    (s?.category || s?.tag || `Slide ${i + 1}`).toString().toUpperCase();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] md:min-h-[88vh] overflow-hidden bg-[#08090A]"
    >
      {/* Background with crossfade + slow zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              slide?.bgImage ||
              slide?.background_image ||
              slide?.image ||
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            })`,
          }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      {/* Desaturating grade + top spotlight instead of a generic glow-blob look */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,180,120,0.14),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/78 to-[#08090A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/70" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_200px_90px_rgba(0,0,0,0.7)]" />

      <MonitorTexture />
      <ViewfinderFrame />

      {/* Navbar — now horizontal: logo left, links centered, Join Us on the right */}
      <nav className="relative z-50 bg-transparent" onMouseLeave={scheduleCloseServices}>
        <div className="section-container flex items-center justify-between pt-8 pb-4 md:pt-10 md:pb-5">
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full items-center gap-6">
            <div className="flex flex-shrink-0 flex-col gap-2">
              <Link to="/" className="flex shrink-0 items-center gap-2 ml-5">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-14 md:h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
              <LiveTimecode />
            </div>

            {/* Horizontal nav — centered in the remaining space */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative flex items-center gap-8">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  if (link.isServices) {
                    return (
                      <button
                        key={link.href}
                        onMouseEnter={openServices}
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                        className="group relative flex items-center gap-1.5 font-mono text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300"
                        aria-expanded={isServicesOpen}
                      >
                        <span
                          className={`transition-colors duration-300 ${
                            active || isServicesOpen
                              ? "text-white"
                              : "text-white/45 group-hover:text-white/85"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 text-white/50 transition-transform duration-300 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                        <span
                          className={`absolute -bottom-2 left-0 h-[3px] w-[3px] transition-all duration-300 ${
                            active || isServicesOpen
                              ? "scale-100 bg-[#F13A34] shadow-[0_0_8px_2px_rgba(241,58,52,0.8)]"
                              : "scale-0 bg-white/50"
                          }`}
                        />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="group relative flex items-center font-mono text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300"
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          active ? "text-white" : "text-white/45 group-hover:text-white/85"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`absolute -bottom-2 left-0 h-[3px] w-[3px] transition-all duration-300 ${
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

            {/* Join Us — end of the navbar */}
            <div className="flex flex-shrink-0 items-center">
              <Link
                to="/join-us"
                className="group inline-flex items-center border-1 border-[#F13A34] gap-2 mr-5 bg-[#F13A34] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border-1 hover:border-[#F13A34] "
              >
                Join Us
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
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
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="border border-white/15 bg-black/40 p-2.5 text-white backdrop-blur-md transition-colors hover:border-[#F13A34]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Toggle navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile off-canvas menu */}
        <MobileOffCanvas
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navLinks={navLinks}
          isActive={isActive}
        />

        {/* Mega menu — mounted at nav level so its width isn't limited by the nav-links row */}
        <ServicesMegaMenu
          open={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
        />
      </nav>

      {/* Content */}
      <div className="relative z-10 section-container pt-0 md:pt-0 pb-20 sm:pb-10 lg:pb-20 text-white ml-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -14 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            {/* Lower-third style eyebrow, not a pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -14 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="mb-7 inline-flex items-center gap-3 border-l-2 border-[#F13A34] bg-black/30 py-2 pl-4 pr-5 backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-[#F13A34]" />
              <span className="section-eyebrow font-mono tracking-[0.22em] text-white/80 text-xs sm:text-sm">
                {chapterLabel(slide, currentSlide)}
              </span>
              <span className="font-mono text-[10px] text-white/35">
                {String(currentSlide + 1).padStart(2, "0")}/
                {String(slides.length).padStart(2, "0")}
              </span>
            </motion.div>

            <h1 className="section-heading text-white">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="relative block text-[50px] font-black uppercase leading-[0.98] tracking-tight text-white"
              >
                {slide?.title || "Welcome"}
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="relative mt-4 inline-block font-mono text-[clamp(0.95rem,1.6vw,1.15rem)] font-medium uppercase tracking-[0.28em] text-white/55"
              >
                {slide?.subtitle || slide?.sub_title || ""}
                <motion.span
                  key={currentSlide}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-[#F13A34] via-[#F13A34]/60 to-transparent"
                />
              </motion.span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="mt-7 max-w-xl md:max-w-2xl text-base sm:text-md md:text-md leading-relaxed text-white/65"
            >
              {slide?.description || slide?.content || ""}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="mt-10 sm:mt-12 flex flex-wrap gap-4"
            >
              {/* View Projects Button - Red background, white text on hover */}
              <Link
                to="/portfolio"
                className="group relative inline-flex border-1 border-[#F13A34] items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300  hover:bg-white hover:text-[#F13A34] hover:border-1 hover:border-[#F13A34]
                
                "
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  View Projects
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              {/* Get Started Button - White background, red text on hover */}
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 bg-white px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300  hover:bg-transparent hover:text-white hover:border-1 hover:border-white
                
                "
              >
                Get Started
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Info card — inline flow on small/medium screens so it never overlaps content */}
        <div className="mt-14 lg:hidden ">
          <InfoBox slide={slide} variant="inline" />
        </div>
      </div>

      {/* Slide Indicators — timecode chapter strip */}
      <div className="absolute bottom-10 md:bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2 md:gap-2 cursor-pointer ">
        {slides.map((s, index) => {
          const active = index === currentSlide;
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={active}
            >
              <span
                className={`hidden sm:block font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                  active ? "text-white/85" : "text-white/35 group-hover:text-white/60"
                }`}
              >
                {/* {chapterLabel(s, index)} */}
              </span>
              <span className="relative h-[3px] w-9 md:w-12 overflow-hidden bg-white/15">
                {active && (
                  <motion.span
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-[#F13A34] shadow-[0_0_8px_1px_rgba(241,58,52,0.8)]"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Box — floating on large screens, same position as before */}
      <InfoBox slide={slide} variant="floating" />
    </section>
  );
}