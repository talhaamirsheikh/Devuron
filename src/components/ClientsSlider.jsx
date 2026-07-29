import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";

const logos = [
  "https://dummyimage.com/180x80/ffffff/000000&text=Arabian+Ranches",
  "https://dummyimage.com/180x80/ffffff/000000&text=Brilliance",
  "https://dummyimage.com/180x80/ffffff/000000&text=Concordia",
  "https://dummyimage.com/180x80/ffffff/000000&text=CPT",
  "https://dummyimage.com/180x80/ffffff/000000&text=Dubai+Hills",
  "https://dummyimage.com/180x80/ffffff/000000&text=Emaar",
  "https://dummyimage.com/180x80/ffffff/000000&text=Fairmont",
  "https://dummyimage.com/180x80/ffffff/000000&text=Global+Builders",
  "https://dummyimage.com/180x80/ffffff/000000&text=Horizon+Group",
  "https://dummyimage.com/180x80/ffffff/000000&text=Infinity+Developers",
  "https://dummyimage.com/180x80/ffffff/000000&text=Jumeirah+Estates",
  "https://dummyimage.com/180x80/ffffff/000000&text=Kingsbury+Group",
];

// Corner Brackets Component
const CornerBrackets = ({ size = "h-2 w-2", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

function ClientsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-white py-10 overflow-hidden">
      {/* Header */}
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Trusted by brands
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900">
            We partner with ambitious teams
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mt-4 mb-0 leading-relaxed">
            From ambitious startups to established businesses, brands trust us to strengthen their identity, accelerate growth, and protect their digital presence through innovative solutions.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative border bg-white h-28 md:h-32 flex items-center justify-center transition-all duration-300 ease-out
                ${
                  hoveredIndex === index
                    ? "border-[rgba(77,185,224,0.25)]"
                    : "border-neutral-200 hover:border-[rgba(77,185,224,0.35)]"
                }`}
            >
              <CornerBrackets />

              {/* Hover effect overlay - Radial gradient glow */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(circle at top, rgba(77,185,224,0.09), transparent 55%)`,
                }}
              />

              {/* Logo container */}
              <div className="group relative z-10 flex h-full w-full items-center justify-center p-4 transition-all duration-500">
                <div className="absolute inset-0 transition-all duration-500 bg-[#4db9e0]/0" />
                <div className="absolute inset-0 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-70 bg-[#4db9e0]/15" />
                <img
                  src={logo}
                  alt="Client logo"
                  className="relative z-10 max-h-10 object-contain grayscale transition-all duration-150 group-hover:grayscale-0 group-hover:scale-110 md:max-h-14"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Corner accent dot - Top Right */}
              <div
                className={`absolute top-3 right-3 h-2 w-2 rounded-full bg-[#4db9e0] transition-all duration-300 ${
                  hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          {/* <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0]"
          >
            <span className="relative flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
              View Our Work
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link> */}
        </motion.div>
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
      `}</style>
    </section>
  );
}

export default memo(ClientsGrid);