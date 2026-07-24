import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
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

  const ACCENTS = ["#F13A34", "#FF7A45", "#FFB020"];

  const serviceIcons = [
    Globe,
    Smartphone,
    Bot,
    TrendingUp,
    Palette
  ];

  const serviceImages = [
    "https://images.pexels.com/photos/8117416/pexels-photo-8117416.jpeg",
    "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?_gl=1*1ybnu1h*_ga*MzgzMTkxODU3LjE3ODQ4OTk4MTA.*_ga_8JE65Q40S6*czE3ODQ5MjE0ODckbzQkZzEkdDE3ODQ5MjE3OTIkajU5JGwwJGgw",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  ];

  const tabDescriptions = [
    "Custom websites & powerful web apps built for speed and growth",
    "High-performance Android & iOS apps for seamless user experiences",
    "Intelligent AI solutions that streamline operations & boost productivity",
    "Data-driven SEO & marketing strategies that increase visibility",
    "Creative branding & professional video editing that make you stand out"
  ];

  return (
    <section className="relative bg-white overflow-x-clip">
      {/* Header Section */}
      <div className="relative z-10 mx-auto max-w-7xl section-container pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Our Services
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
            Comprehensive Digital & Creative Services
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From digital marketing and web development to creative production and media planning - we provide end-to-end solutions for modern brands.
          </p>
        </motion.div>
      </div>

      {/* Service Cards - Vertical Stack */}
      {services.map((item, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        const isActive = activeIndex === index;
        const Icon = serviceIcons[index % serviceIcons.length];
        const imageUrl = serviceImages[index % serviceImages.length];

        return (
          <div
            key={index}
            className="sticky-section sticky top-0 h-screen flex items-center justify-center"
          >
            <div className="relative w-[90vw] max-w-7xl h-[80vh]">
              {/* Card */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-out border bg-white ${
                  isActive ? 'border-[#F13A34]/40 scale-[1.02]' : 'border-neutral-200 scale-100'
                }`}
              >
                {/* Corner Brackets */}
                <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-300" />
                <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-300" />
                <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-300" />
                <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-300" />

                {/* Tab - with description */}
                <div className="absolute -top-px left-8 flex items-center gap-3 border-b border-r border-neutral-200 bg-white px-4 py-1.5 max-w-[70%] z-20">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-neutral-500 truncate">
                    {tabDescriptions[index]}
                  </span>
                </div>

                {/* Accent Glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background: `radial-gradient(ellipse 50% 40% at 80% 20%, ${accent}20, transparent 70%)`,
                  }}
                />

                {/* Image Box - Right Side */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[280px] h-[320px] lg:w-[340px] lg:h-[380px] rounded-xl overflow-hidden border border-neutral-200 shadow-lg">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Dark overlay at bottom for text readability if needed */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16">
                  <div className="max-w-[55%]">
                    {/* Small Icon */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                        <Icon className="h-5 w-5 text-[#F13A34]" />
                      </div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                        Service {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tight text-neutral-900 leading-[1.05]">
                      {item.title}
                    </h2>

                    <div
                      className="mt-5 h-[3px] w-16"
                      style={{ backgroundColor: accent }}
                    />

                    <p className="mt-6 text-[15px] text-neutral-600 max-w-xl leading-relaxed">
                      {item.description}
                    </p>

                    <Link
                      to="/portfolio"
                      className="group inline-flex items-center gap-2 mt-8 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
                    >
                      <span className="relative flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                        Explore
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                  {services.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-6 transition-all duration-500 ${
                        i === index ? 'bg-[#F13A34]' : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
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
      `}</style>
    </section>
  );
};

export default VerticalStackSlider;