import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#4db9e0";

const CornerBrackets = ({ size = "h-5 w-5", borderColor = "border-white/10" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const CTASection = () => {
  return (
    <section className="relative bg-white overflow-x-clip py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl section-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative border border-white/10 bg-[#0a0a0a] overflow-hidden"
        >
          <CornerBrackets size="h-5 w-5" borderColor="border-white/10" />

          {/* Tab */}
          <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-white/10 bg-black/60 px-4 py-1.5 z-10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/50">
              GET STARTED
            </span>
          </div>

          <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24">
            {/* Status row */}
            <div className="flex items-center gap-2.5 mb-8">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT, animation: "pulse 1.6s ease-in-out infinite" }}
              />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4db9e0]">
                Status — Ready To Build
              </span>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-mono text-[clamp(2rem,4.5vw,3.75rem)] font-black uppercase tracking-tight text-white leading-[1.05] mb-6">
                Let's Turn Your Idea Into A Live Product
              </h2>
              <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-xl">
                Tell us where you're stuck or what you're building next. We'll respond with a
                clear plan — no filler, no obligation.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 bg-[#4db9e0] text-[#0a0a0a] hover:bg-white"
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]/80 motion-safe:group-hover:animate-pulse" />
                  Start A Project
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2.5 border px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 border-white/20 hover:border-[#4db9e0] hover:text-[#4db9e0]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                See Our Work
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Footer meta line */}
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Avg. response time — under 24hrs
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                No cost, no commitment
              </span>
            </div>
          </div>
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
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
};

export default CTASection;