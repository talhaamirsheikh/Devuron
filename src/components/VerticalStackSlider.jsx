import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants/services";

/* Curated on-brand accent palette — cycled per card instead of a
   full-photo background, so each service still feels distinct */
const ACCENTS = ["#F13A34", "#FF7A45", "#FFB020"];

/* Signature top edge: one smooth, hand-drawn curve instead of a hard
   rounded corner — the panel reads as poured rather than boxed. */
const CURVE_PATH =
  "M0,120 C220,50 460,10 720,60 C980,110 1220,150 1440,80 L1440,220 L0,220 Z";
const CURVE_GLOW_PATH =
  "M0,120 C220,50 460,10 720,60 C980,110 1220,150 1440,80";

/* Fine grain texture (SVG feTurbulence) tiled behind the whole panel so the
   white never reads as a flat, empty fill. */
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const VerticalStackSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.sticky-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative  bg-[#FAFAF7] overflow-x-clip">
      {/* Ambient gradient mesh — soft pastel washes of the brand accents
          drifting behind the panel, so the white has warmth and depth
          instead of being one flat, empty fill. */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute -top-24 -left-24 w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full opacity-[0.16] blur-[110px]"
          style={{ background: "radial-gradient(circle, #F13A34, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[38vw] h-[38vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(circle, #FFB020, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] rounded-full opacity-[0.12] blur-[100px]"
          style={{ background: "radial-gradient(circle, #FF7A45, transparent 70%)" }}
        />
        {/* fine grain so the light field has tooth instead of feeling flat */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: `url("${GRAIN_DATA_URI}")`, backgroundSize: "160px 160px" }}
        />
      </div>

      {/* Signature top edge — a single poured curve instead of a hard rounded corner */}
      <div
        className="absolute top-0 left-0 right-0 h-[90px] sm:h-[130px] md:h-[160px] pointer-events-none z-[1]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="curveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F13A34" />
              <stop offset="50%" stopColor="#FF7A45" />
              <stop offset="100%" stopColor="#FFB020" />
            </linearGradient>
            <filter id="curveBlur" x="-20%" y="-40%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          {/* soft glowing seam tracing the curve, sitting just above it */}
          <path
            d={CURVE_GLOW_PATH}
            fill="none"
            stroke="url(#curveGlow)"
            strokeWidth="3"
            opacity="0.65"
            filter="url(#curveBlur)"
          />
          {/* crisp fill the header and cards sit on */}
          <path d={CURVE_PATH} fill="#FAFAF7" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl section-container">
        {/* Header - Center aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center mt-16">
            <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 backdrop-blur-sm mt-16">
              <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
              <span className="section-eyebrow font-mono tracking-[0.22em] text-black/70">
                Our Services
              </span>
            </div>
          </div>

          <h2 className="section-heading text-black mb-3 text-center">
            Comprehensive Digital & Creative Services
          </h2>
          <p className="section-subtitle max-w-2xl text-black/70 mx-auto text-center">
            From digital marketing and web development to creative production and media planning - we provide end-to-end solutions for modern brands.
          </p>
        </motion.div>
      </div>

      {services.map((item, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        const glowSide = index % 2 === 0 ? "right" : "left";

        return (
          <div
            key={index}
            className="sticky-section sticky top-0 h-screen flex items-center justify-center"
          >
            <div className="relative w-[85vw] h-full">
              {/* Card surface — no photography, just an on-brand gradient field */}
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out mb-10 mt-20 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0b0c0e] shadow-2xl"
                style={{
                  transform: `scale(${activeIndex === index ? 1.03 : 1})`,
                }}
              >
                {/* Directional accent glow, alternating sides per card for rhythm */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 60% 55% at ${
                      glowSide === "right" ? "85% 15%" : "15% 15%"
                    }, ${accent}33, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 50% 45% at ${
                      glowSide === "right" ? "10% 90%" : "90% 90%"
                    }, ${accent}1a, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

                {/* Faint scanline texture for depth */}
                <div
                  className="absolute inset-0 opacity-[0.035] mix-blend-overlay hidden md:block"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
                  }}
                />

                {/* Oversized ghost numeral — the card's visual anchor instead of a photo */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/[0.05]"
                  style={{ fontSize: "clamp(10rem, 32vw, 26rem)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Chapter index — small, top right */}
                <div className="absolute top-8 right-8 sm:top-10 sm:right-10 z-20 hidden sm:flex items-center gap-1 font-mono text-[11px] tracking-[0.2em] text-white/40">
                  {String(index + 1).padStart(2, "0")}/
                  {String(services.length).padStart(2, "0")}
                </div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-20 mt-10 mx-15">
                <div className="max-w-4xl">
                  {/* Eyebrow — lower-third bar, accent color cycles per card */}
                  <div className="overflow-hidden mb-6">
                    <div
                      className="inline-flex items-center gap-3 border-l-2 bg-black/30 py-2 pl-4 pr-5 backdrop-blur-sm opacity-0 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1 + 0.15}s`, borderColor: accent }}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                          style={{ backgroundColor: accent }}
                        />
                        <span
                          className="relative inline-flex h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                      </span>
                      <span className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-white/80">
                        Service {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Animated Heading */}
                  <div className="overflow-hidden">
                    <h2 className="text-[50px] font-black uppercase leading-[0.98] tracking-tight text-white opacity-0 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                      {item.title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block mr-3">
                          {word}
                        </span>
                      ))}
                    </h2>
                  </div>

                  {/* Accent rule under the heading */}
                  <div className="overflow-hidden">
                    <div
                      className="mt-6 h-[3px] w-16 opacity-0 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1 + 0.35}s`, backgroundColor: accent }}
                    />
                  </div>

                  {/* Animated Description */}
                  <div className="overflow-hidden">
                    <p className="mt-8 text-white/65 text-[16px] max-w-2xl leading-relaxed opacity-0 animate-fadeInUp"
                       style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Animated Button */}
                  <div className="overflow-hidden mt-10">
                    <div className="opacity-0 animate-fadeInUp"
                         style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                      <Link
                        to="/portfolio"
                        className="group relative inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-md text-sm font-mono font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
                        style={{ "--accent": accent }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = accent;
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                          e.currentTarget.style.color = "";
                        }}
                      >
                        <span className="relative z-10">Explore {item.title}</span>
                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Custom Animations */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .sticky-section {
          scroll-snap-align: start;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default VerticalStackSlider;