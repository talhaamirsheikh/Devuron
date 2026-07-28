import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  Globe,
  Smartphone,
  Bot,
  Palette,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants/services";

const VerticalStackSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".sticky-section");

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ACCENTS = ["#4db9e0", "#FF7A45", "#FFB020"];

  const serviceIcons = [Globe, Smartphone, Bot, TrendingUp, Palette];

  const serviceImages = [
    "https://images.pexels.com/photos/8117416/pexels-photo-8117416.jpeg",
    "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?_gl=1*1ybnu1h*_ga*MzgzMTkxODU3LjE3ODQ4OTk4MTA.*_ga_8JE65Q40S6*czE3ODQ5MjE0ODckbzQkZzEkdDE3ODQ5MjE3OTIkajU5JGwwJGgw",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542641728-6ca359b085f4?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const channelLabels = [
    "Websites & web apps",
    "iOS & Android apps",
    "AI-driven automation",
    "SEO & marketing",
    "Brand & video"
  ];

  return (
    <section className="relative bg-white overflow-x-clip">
      {/* Header Section */}
      <div className="relative z-10 mx-auto max-w-7xl section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Our Services
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
            Comprehensive Digital & Creative Services
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From digital marketing and web development to creative production and media planning - we
            provide end-to-end solutions for modern brands.
          </p>
        </motion.div>
      </div>

      {/* Service Cards - Channel Rail Stack */}
      {services.map((item, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        const isActive = activeIndex === index;
        const Icon = serviceIcons[index % serviceIcons.length];
        const imageUrl = serviceImages[index % serviceImages.length];

        return (
          <div
            key={index}
            className="sticky-section sticky top-0 h-screen w-full flex bg-white"
          >
            {/* Channel Rail */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 lg:w-[76px] shrink-0 border-r border-neutral-200 relative z-20 bg-white">
              {services.map((_, i) => {
                const on = i === index;
                const railAccent = ACCENTS[i % ACCENTS.length];
                return (
                  <div key={i} className="flex flex-col items-center gap-2 py-3">
                    <span
                      className="font-mono text-[9px] tracking-[0.15em] transition-colors duration-500"
                      style={{ color: on ? railAccent : "#c7c7c7" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="block transition-all duration-500 ease-out"
                      style={{
                        width: on ? "3px" : "2px",
                        height: on ? "28px" : "10px",
                        backgroundColor: on ? railAccent : "#e5e5e5"
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Card body */}
            <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Ghost index number */}
              <span
                aria-hidden="true"
                className="hidden lg:block pointer-events-none select-none absolute -left-6 top-1/2 -translate-y-1/2 font-mono font-black leading-none text-transparent"
                style={{
                  fontSize: "26vw",
                  WebkitTextStroke: `1px ${accent}26`
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="relative z-10 order-2 lg:order-1 w-full lg:w-[54%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-0">
                {/* Kicker */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: accent,
                      animation: isActive ? "pulse 1.6s ease-in-out infinite" : "none",
                      opacity: isActive ? 1 : 0.4
                    }}
                  />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Service {String(index + 1).padStart(2, "0")} — {channelLabels[index % channelLabels.length]}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>

                <h2 className="font-mono text-[clamp(2rem,4vw,3.4rem)] font-black uppercase tracking-tight text-neutral-900 leading-[1.05]">
                  {item.title}
                </h2>

                <div className="mt-5 h-[3px] w-16" style={{ backgroundColor: accent }} />

                <p className="mt-6 text-[15px] text-neutral-600 max-w-xl leading-relaxed">
                  {item.description}
                </p>

                <Link
                  to="/portfolio"
                  className="group inline-flex items-center gap-2 mt-9 w-fit border px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{
                    borderColor: accent,
                    color: accent
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = accent;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = accent;
                  }}
                >
                  Explore
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Image, diagonal on desktop */}
              <div className="relative order-1 lg:order-2 w-full h-[38vh] lg:h-auto lg:w-[46%] diagonal-clip overflow-hidden">
                <img
                  src={imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-all duration-[1200ms] ease-out"
                  style={{
                    filter: isActive ? "grayscale(0)" : "grayscale(1)",
                    transform: isActive ? "scale(1.04)" : "scale(1)"
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    backgroundColor: accent,
                    mixBlendMode: "multiply",
                    opacity: isActive ? 0.08 : 0.35
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .sticky-section {
          scroll-snap-align: start;
        }

        .section-container {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        @media (min-width: 640px) {
          .section-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .section-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .diagonal-clip {
            clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }

        @media (prefers-reduced-motion: reduce) {
          .diagonal-clip img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default VerticalStackSlider;