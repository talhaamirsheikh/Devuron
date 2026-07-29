import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Store,
  Plane,
  Landmark,
  Signal,
  ShoppingCart,
  Flame,
  Rocket,
  Banknote,
  HeartPulse,
  Gamepad2
} from "lucide-react";

const ACCENT = "#4db9e0";
const INK = "#0a0a0a";

const CornerBrackets = ({ size = "h-4 w-4", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const industries = [
  { 
    title: "Shopify", 
    href: "#", 
    icon: Store,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Travel & Hospitality", 
    href: "#", 
    icon: Plane,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Public Sector", 
    href: "#", 
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Telecommunication", 
    href: "#", 
    icon: Signal,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Retail & CPG", 
    href: "#", 
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Oil, Gas & Energy", 
    href: "#", 
    icon: Flame,
    image: "https://images.pexels.com/photos/13247379/pexels-photo-13247379.jpeg?_gl=1*1kx8i89*_ga*MzgzMTkxODU3LjE3ODQ4OTk4MTA.*_ga_8JE65Q40S6*czE3ODUyODg4ODIkbzYkZzEkdDE3ODUyODg5MDckajM1JGwwJGgw"
  },
  { 
    title: "Startups", 
    href: "#", 
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "E-commerce", 
    href: "#", 
    icon: Store,
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Banking & Fintech", 
    href: "#", 
    icon: Banknote,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Healthcare & Pharmaceuticals", 
    href: "#", 
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  { 
    title: "Gaming", 
    href: "#", 
    icon: Gamepad2,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const IndustriesWeServe = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative bg-white overflow-x-clip py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl section-container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Industries We Serve
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
            Built For Your Sector
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl leading-relaxed">
            Eleven sectors, one team fluent in each one's compliance, workflows, and users.
          </p>
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-16">
          {/* Index list */}
          <div className="lg:col-span-8 border-t border-neutral-200">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = activeIndex === index;

              return (
                <motion.a
                  key={index}
                  href={industry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group relative flex items-center gap-4 sm:gap-6 border-b border-neutral-200 py-5 sm:py-6 px-1 sm:px-2 transition-colors duration-300 cursor-pointer"
                >
                  {/* Index number */}
                  <span
                    className="font-mono text-[11px] sm:text-xs tracking-[0.1em] w-7 shrink-0 transition-colors duration-300"
                    style={{ color: isActive ? ACCENT : "#a3a3a3" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <span
                    className="flex-1 font-mono text-[20px] font-bold uppercase tracking-tight leading-none transition-all duration-300"
                    style={{
                      color: isActive ? INK : "#a3a3a3",
                      transform: isActive ? "translateX(6px)" : "translateX(0)"
                    }}
                  >
                    {industry.title}
                  </span>

                  {/* Icon */}
                  <Icon
                    className="hidden sm:block h-4 w-4 shrink-0 transition-all duration-300"
                    style={{
                      color: ACCENT,
                      opacity: isActive ? 1 : 0
                    }}
                  />

                  {/* Arrow */}
                  <ArrowUpRight
                    className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-all duration-300"
                    style={{
                      color: isActive ? ACCENT : "#d4d4d4",
                      transform: isActive ? "translate(2px,-2px)" : "translate(0,0)"
                    }}
                  />

                  {/* Underline sweep */}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
                    style={{
                      width: isActive ? "100%" : "0%",
                      backgroundColor: ACCENT
                    }}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Preview panel with image */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 relative border border-neutral-200 bg-white h-[420px] flex flex-col justify-between p-8 overflow-hidden">
              <CornerBrackets size="h-4 w-4" />

              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Tab */}
              {/* <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5 z-10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                  INDUSTRY
                </span>
              </div> */}

              <div className="relative z-10 flex items-center justify-between">
                {/* <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT, animation: "pulse 1.6s ease-in-out infinite" }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  Tracking
                </span> */}
              </div>

              <div className="relative z-10">
                <div
                  className="flex h-12 w-12 items-center justify-center border mb-6 bg-white/80 backdrop-blur-sm"
                  style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}0d` }}
                >
                  <ActiveIcon className="h-5 w-5" style={{ color: ACCENT }} />
                </div>
              <h3
  className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-bold uppercase tracking-tight leading-[1.05] mb-2"
  style={{ color: "white" }}
>
  {active.title}
</h3>
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:gap-3"
                  style={{ color: ACCENT }}
                >
                  View Industry
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
};

export default IndustriesWeServe;