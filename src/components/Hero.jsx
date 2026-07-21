import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Instagram,
  Video,
  Calendar,
  Play,
  ArrowRight,
  Users,
  TrendingUp,
  Target,
  Menu,
  X,
} from "lucide-react";


/* =========================
   Simplified Info Box Component
========================= */
const InfoBox = ({ slide }) => {
  const stats = [
    { icon: Users, label: "Audience Reach", value: "1.2M+" },
    { icon: TrendingUp, label: "Engagement Rate", value: "24.7%" },
    { icon: Target, label: "Campaigns", value: "48+" },
  ];

  return (
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
  className="absolute bottom-24 right-8 z-30 w-[325px]"
>
  <div className="
    bg-white/8
    backdrop-blur-xl
    rounded-2xl
    p-5
    border
    border-white/15
    shadow-[0_16px_40px_rgba(0,0,0,0.3)]
  ">
    <div className="flex items-center gap-4">
      
      {/* Image */}
      <div className="relative shrink-0">
        <div className="
          w-20 h-20
          rounded-xl
          overflow-hidden
          border
          border-white/25
        ">
        <img
            src={
              slide?.infoImage
                ? slide.infoImage
                : slide?.info_image
                ? slide.info_image
                : "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80"
            }
            alt="Project preview"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="flex-1 flex justify-end">
        <Link to="/contact" className="
          inline-flex
          items-center
          gap-2
          px-5
          py-2.5
          bg-white
          text-black
          font-semibold
          rounded-full
          text-sm
          transition-all
          duration-300
          ease-out
          hover:bg-white/90
          hover:shadow-lg
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-white/40
          group
        ">
          Let’s Talk
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  </div>
</motion.div>

  );
};

/* =========================
   Main Hero Component
========================= */
export default function Hero({ heroData, loading }) {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const defaultSlides = [
    {
      title: "SOCIAL MEDIA",
      subtitle: "STRATEGY & MANAGEMENT",
      description:
        "Transform your digital presence with data-driven social media strategies that engage audiences and drive growth.",
      category: "Social Media",
      icon: Instagram,
      bgImage:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "Global brand campaign achieving 2.4M impressions",
    },
    {
      title: "CONTENT CREATION",
      subtitle: "STORYTELLING & PRODUCTION",
      description:
        "Craft compelling narratives and high-quality content that resonates with your audience.",
      category: "Content Creation",
      icon: Video,
      bgImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "Video series with 500K+ views in first month",
    },
    {
      title: "EVENT MANAGEMENT",
      subtitle: "PLANNING & EXECUTION",
      description:
        "Create unforgettable experiences with seamless event planning and execution.",
      category: "Event Management",
      icon: Calendar,
      bgImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      infoImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      projectDescription: "500+ attendees virtual conference with 98% satisfaction",
    },
  ];

  const slides = heroData?.slides || heroData?.data || defaultSlides;

  // Auto slide change
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
  const Icon = slide?.icon || Instagram;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${
            slide?.bgImage
              ? slide.bgImage
              : slide?.background_image
              ? slide.background_image
              : slide?.image
              ? slide.image
              : "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          })` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.55),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />

      {/* Navbar - Inside Hero Section */}
      <nav className="relative z-50 bg-transparent">
        <div className="section-container py-5 flex items-center justify-between">
          {/* Desktop Navigation - Vertical */}
          <div className="hidden md:flex w-full items-center justify-between">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
                alt="Logo"
                className="h-14 md:h-16 object-contain"
                loading="eager"
                fetchpriority="high"
              />
            </Link>

            {/* Vertical nav for home page */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col text-right space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-[13px] md:text-[14px] font-medium tracking-[0.15em] uppercase transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
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
                fetchpriority="high"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-white p-2 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <nav className="section-container flex flex-col space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2.5 px-3 text-sm font-medium tracking-[0.15em] uppercase rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="relative z-10 section-container pt-10 md:pt-16 pb-56 text-white">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <Icon className="w-5 h-5" />
            <span className="section-eyebrow tracking-[0.18em] text-white/80">
              {slide?.category || slide?.tag || "Featured"}
            </span>
          </div>

          <h1 className="section-heading text-white">
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {slide?.title || "Welcome"}
            </span>
            <span className="block font-medium mt-3 text-3xl md:text-5xl">
              {slide?.subtitle || slide?.sub_title || ""}
            </span>
          </h1>

          <p className="max-w-2xl mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
            {slide?.description || slide?.content || ""}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/portfolio" className="btn-primary gap-2">
              View Projects
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary border-white/40 text-white bg-white/5 hover:bg-white/10">
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators - Moved Higher */}
      <div className="absolute bottom-10 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2 transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-white w-8 md:w-12' 
                : 'bg-white/40 hover:bg-white/60 w-4 md:w-6'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Info Box */}
      <InfoBox slide={slide} />

      {/* हटाए गए HeroBottomCurves component को यहाँ से हटाया गया है */}
    </section>
  );
}