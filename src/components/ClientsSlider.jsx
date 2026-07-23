import React, { useState, memo } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Target, Bot, Workflow, BarChart3, Sparkles, ArrowRight } from "lucide-react";

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

function ClientsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-[#F6F4EF] section-padding overflow-hidden">
         <div
                className=" mb-14 md:mb-20 mx-20 md:mx-40 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
                  <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
                  <span className="font-mono text-xs tracking-[0.22em] uppercase text-neutral-700">
Trusted by brands
                  </span>
                </div>
      
                <h2 className="section-heading text-neutral-900">
                   We partner with 
          ambitiou teams
                </h2>
                <p className="section-subtitle mt-4">
                            From ambitious startups to established businesses, brands trust us to strengthen their identity, accelerate growth, and protect their digital presence through innovative solutions.
                </p>
                
                {/* View Complete Process Button - Red background, white text on hover */}
                
              </div>
      
      {/* Grid Layout */}
      <div className="section-container">
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
              className={`relative flex-shrink-0 h-28 md:h-32 bg-white rounded-3xl flex items-center justify-center transition-all duration-300 ease-out
                ${
                  hoveredIndex === index
                    ? "scale-[1.03] shadow-[0_18px_45px_rgba(0,0,0,0.08)] border border-[rgba(241,58,52,0.25)]"
                    : "border border-neutral-200 hover:border-[rgba(241,58,52,0.35)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                }`}
            >
              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.09),_transparent_55%)] transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Logo container */}
              <div className="relative z-10 p-4 w-full h-full flex items-center justify-center">
                <img
                  src={logo}
                  alt="Client logo"
                  className="max-h-10 md:max-h-14 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Subtle corner accent */}
              <div
                className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--color-primary)] transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ClientsGrid;