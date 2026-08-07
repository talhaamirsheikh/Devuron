import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Store,
  ShoppingBag,
  Plane,
  Landmark,
  Signal,
  Package,
  Flame,
  Rocket,
  Banknote,
  HeartPulse,
  Gamepad2
} from "lucide-react";

const ACCENT = "#4db9e0";
const INK = "#0a0a0a";

// A single quiet waveform, used once as a graphic signature — not data, not per-item
const generateWave = (points = 120) => {
  return Array.from({ length: points }, (_, i) => {
    const t = (i / (points - 1)) * Math.PI * 2;
    return Math.sin(t * 1.6) * 0.5 + Math.sin(t * 3.1 + 1.2) * 0.25 + Math.sin(t * 0.7) * 0.2;
  });
};

const buildLinePath = (wave, width, height, amplitude = 0.42) => {
  const step = width / (wave.length - 1);
  return wave
    .map((v, i) => {
      const x = i * step;
      const y = height / 2 - v * height * amplitude;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

const SIGNATURE_WIDTH = 1000;
const SIGNATURE_HEIGHT = 48;
const signatureWave = generateWave();
const signaturePath = buildLinePath(signatureWave, SIGNATURE_WIDTH, SIGNATURE_HEIGHT);

const industries = [
  { title: "Shopify", href: "#", icon: Store },
  { title: "Travel & Hospitality", href: "#", icon: Plane },
  { title: "Public Sector", href: "#", icon: Landmark },
  { title: "Telecommunication", href: "#", icon: Signal },
  { title: "Retail & CPG", href: "#", icon: Package },
  { title: "Oil, Gas & Energy", href: "#", icon: Flame },
  { title: "Startups", href: "#", icon: Rocket },
  { title: "E-commerce", href: "#", icon: ShoppingBag },
  { title: "Banking & Fintech", href: "#", icon: Banknote },
  { title: "Healthcare & Pharmaceuticals", href: "#", icon: HeartPulse },
  { title: "Gaming", href: "#", icon: Gamepad2 }
];

const IndustriesWeServe = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-white overflow-x-clip py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl section-container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Industries We Serve
          </span>

          <h2 className="font-mono text-[clamp(2rem,4.2vw,3.6rem)] font-black uppercase tracking-tight text-neutral-900 mt-4 mb-4 max-w-3xl leading-[1.02]">
            Built for your sector
          </h2>
          <p className="text-[16px] text-neutral-600 max-w-xl leading-relaxed">
            Eleven sectors, one team fluent in each one's compliance, workflows, and users.
          </p>
        </motion.div>

        {/* Signature waveform — one quiet graphic mark, not a data visualization */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-10 sm:h-12 my-8 sm:my-10"
          aria-hidden="true"
        >
          <svg
            viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d={signaturePath}
              fill="none"
              stroke={ACCENT}
              strokeOpacity={0.4}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Industry index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-neutral-200">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.a
                key={industry.title}
                href={industry.href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.04, ease: "easeOut" }}
                className="group relative flex items-center gap-4 border-b border-neutral-200 py-6 px-1 sm:px-2 transition-colors duration-300 focus:outline-none sm:odd:pr-8 sm:even:pl-8"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-neutral-300 transition-colors duration-300 group-hover:text-[#4db9e0] group-focus-visible:text-[#4db9e0]"
                  aria-hidden="true"
                />

                <span className="flex-1 font-mono text-[17px] sm:text-[19px] font-bold tracking-tight text-neutral-700 transition-colors duration-300 group-hover:text-neutral-900 group-focus-visible:text-neutral-900">
                  {industry.title}
                </span>

                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-neutral-300 transition-all duration-300 group-hover:text-[#4db9e0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:text-[#4db9e0]"
                  aria-hidden="true"
                />

                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
                  style={{ backgroundColor: ACCENT }}
                />

                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-focus-visible:opacity-100 transition-opacity duration-150"
                  style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}` }}
                />
              </motion.a>
            );
          })}
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
      `}</style>
    </section>
  );
};

export default IndustriesWeServe;