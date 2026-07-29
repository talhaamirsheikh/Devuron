import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Zap,
  Headphones,
  BarChart3
} from "lucide-react";

const ACCENT = "#4db9e0";
const INK = "#0a0a0a";

const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "5+", label: "Years in business" },
  { value: "24/7", label: "Support coverage" }
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Proven Expertise",
    description:
      "A senior team that has shipped web, mobile, and AI products across a wide range of industries."
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description:
      "Clear timelines, open communication, and no surprises — you always know where a project stands."
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Lean workflows and tight feedback loops mean ideas move to production without unnecessary delay."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Direct access to the people who built your product, not a ticket queue. We stay on after launch."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Results",
    description:
      "Every engagement is measured against real metrics, so decisions are backed by evidence, not guesses."
  }
];

const CornerBrackets = ({ size = "h-2 w-2", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-white overflow-x-clip py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl section-container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
            Built On Substance, Not Slides
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Every engagement runs on the same principles — clarity, speed, and results you can
            measure. Here's what that looks like in practice.
          </p>
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16">
          {/* Left — stats readout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-24">
              <p className="text-[15px] text-neutral-600 leading-relaxed mb-10 max-w-sm">
                We're not the biggest agency in the room — that's the point. Small, senior team,
                direct lines of communication, and outcomes tied to your actual business goals.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="relative border border-neutral-200 px-5 py-6"
                  >
                    <CornerBrackets size="h-2 w-2" />
                    <div className="font-mono text-[clamp(1.6rem,2.5vw,2.2rem)] font-black tracking-tight text-neutral-900">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — reason list */}
          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-8">
              {/* Vertical line */}
              <span
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{ backgroundColor: "#e5e5e5" }}
              />

              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="relative py-6 sm:py-7 cursor-default group"
                  >
                    {/* Pin dot */}
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
                      style={{ marginLeft: "-4.5px" }}
                    >
                      <span
                        className="block transition-all duration-400 rounded-full"
                        style={{
                          width: isActive ? "9px" : "5px",
                          height: isActive ? "9px" : "5px",
                          backgroundColor: isActive ? ACCENT : "#d4d4d4",
                          boxShadow: isActive ? `0 0 0 4px ${ACCENT}22` : "none"
                        }}
                      />
                      <span
                        className="block h-px transition-all duration-400"
                        style={{
                          width: isActive ? "18px" : "0px",
                          backgroundColor: ACCENT
                        }}
                      />
                    </span>

                    <div className="flex items-start gap-5 pl-6 sm:pl-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <Icon
                            className="h-4 w-4 transition-colors duration-400"
                            style={{ color: isActive ? ACCENT : INK }}
                          />
                          <h3
                            className="font-mono text-[20px]  font-bold uppercase tracking-[0.15em]"
                            style={{ color: isActive ? ACCENT : INK }}
                          >
                            {reason.title}
                          </h3>
                        </div>
                        <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed max-w-lg transition-colors duration-400">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
      `}</style>
    </section>
  );
};

export default WhyChooseUs;