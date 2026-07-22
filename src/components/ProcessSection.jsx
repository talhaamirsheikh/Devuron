import React, { memo } from "react";
import { motion } from "framer-motion";
import { Target, Bot, Workflow, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* Brand accent palette — cycled per phase so the four columns read as
   one continuous sequence rather than four unrelated cards. */
const ACCENTS = ["#F13A34", "#FF7A45", "#FFB020", "#F13A34"];

/* Each phase gets a small abstract diagram instead of a stock photo —
   a literal sketch of what that phase actually does to the agent's
   data/logic, so the visual explains rather than decorates. */
const PhaseGraphic = ({ index, accent }) => {
  switch (index) {
    case 0: // Discovery — scanning outward from a single source node
      return (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <circle cx="150" cy="100" r="70" fill="none" stroke={accent} strokeOpacity="0.15" />
          <circle cx="150" cy="100" r="45" fill="none" stroke={accent} strokeOpacity="0.28" />
          <circle cx="150" cy="100" r="6" fill={accent} />
          <line x1="150" y1="100" x2="212" y2="52" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="212" cy="52" r="4" fill={accent} opacity="0.85" />
          <line x1="150" y1="100" x2="88" y2="152" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="88" cy="152" r="3.5" fill={accent} opacity="0.6" />
          <line x1="150" y1="100" x2="222" y2="142" stroke={accent} strokeWidth="1.5" strokeOpacity="0.3" />
          <circle cx="222" cy="142" r="3" fill={accent} opacity="0.5" />
        </svg>
      );
    case 1: // Architecture — one root branching into the agent's reasoning paths
      return (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <circle cx="55" cy="100" r="7" fill={accent} />
          <line x1="62" y1="100" x2="150" y2="52" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="62" y1="100" x2="150" y2="100" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="62" y1="100" x2="150" y2="150" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" />
          <circle cx="150" cy="52" r="5" fill={accent} opacity="0.85" />
          <circle cx="150" cy="100" r="5" fill={accent} opacity="0.85" />
          <circle cx="150" cy="150" r="5" fill={accent} opacity="0.85" />
          <line x1="155" y1="52" x2="235" y2="38" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <line x1="155" y1="52" x2="235" y2="66" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="235" cy="38" r="3" fill={accent} opacity="0.5" />
          <circle cx="235" cy="66" r="3" fill={accent} opacity="0.5" />
        </svg>
      );
    case 2: // Integration — external systems converging into one agent hub
      return (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <circle cx="232" cy="100" r="8" fill={accent} />
          <line x1="225" y1="100" x2="150" y2="42" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="225" y1="100" x2="150" y2="100" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="225" y1="100" x2="150" y2="158" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="225" y1="102" x2="150" y2="128" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="150" cy="42" r="4" fill={accent} opacity="0.65" />
          <circle cx="150" cy="100" r="4" fill={accent} opacity="0.65" />
          <circle cx="150" cy="158" r="4" fill={accent} opacity="0.65" />
          <circle cx="150" cy="128" r="3" fill={accent} opacity="0.45" />
        </svg>
      );
    default: // Monitoring — a live trace of agent performance
      return (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <polyline
            points="30,140 85,140 105,78 128,162 152,58 172,120 194,98 222,98 268,98"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="152" cy="58" r="4" fill={accent} />
          <circle cx="128" cy="162" r="3" fill={accent} opacity="0.6" />
          <circle cx="105" cy="78" r="3" fill={accent} opacity="0.6" />
        </svg>
      );
  }
};

const ProcessSection = () => {
  const services = {
    "Discovery & Strategy": {
      icon: <Target className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />,
      steps: [
        "Map manual workflows worth automating",
        "Audit existing tools, APIs, and data",
        "Define success metrics and ROI targets",
        // "Design the agent roadmap",
      ],
    },
    "Agent Architecture": {
      icon: <Bot className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />,
      steps: [
        "Design reasoning, memory, and tool access",
        "Select and fine-tune the underlying models",
        "Engineer prompts and decision logic",
        // "Build guardrails and evaluation sets",
      ],
    },
    "Integration & Deployment": {
      icon: <Workflow className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />,
      steps: [
        "Connect agents to internal APIs and databases",
        "Integrate with Slack, CRM, and support tools",
        "Ship to staging, then production",
        // "Set up auth, roles, and access controls",
      ],
    },
    "Monitoring & Optimization": {
      icon: <BarChart3 className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />,
      steps: [
        "Track task completion and accuracy",
        "Monitor latency, cost, and token usage",
        "A/B test prompts and workflows",
        // "Retrain and refine continuously",
      ],
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="section-container w-full">
        {/* TOP CONTENT */}
        <motion.div
          className=" mb-14 md:mb-20 mx-20 md:mx-40 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-neutral-700">
              Our Delivery Process
            </span>
          </div>

          <h2 className="section-heading text-neutral-900">
            End-to-End AI Agent <br /> Development
          </h2>
          <p className="section-subtitle mt-4">
            A four-phase framework that takes you from workflow audit to a
            production agent — architected, integrated, and continuously
            tuned against real usage data.
          </p>
          
          {/* View Complete Process Button - Red background, white text on hover */}
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#F13A34] hover:border-1 hover:border-[#F13A34] mt-8"
          >
            View Complete Process
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* PROCESS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {Object.entries(services).map(([title, service], index) => {
            const isEven = index % 2 === 0;
            const accent = ACCENTS[index % ACCENTS.length];

            const ServiceCard = (
              <div className="group relative bg-gradient-to-br from-[#050505] via-black to-[#101010] text-white rounded-3xl p-6 h-[250px] flex flex-col justify-between transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top, ${accent}59, transparent 60%)`,
                  }}
                />
                <div className="absolute top-6 right-6 z-10 font-mono text-[11px] tracking-[0.2em] text-white/30">
                  {String(index + 1).padStart(2, "0")}/04
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 mb-4 transform transition-all duration-400 group-hover:scale-105 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-semibold transform transition-all duration-300 group-hover:translate-x-1">
                    {title}
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {service.steps.map((step, i) => (
                      <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className="text-[10px] mt-1" style={{ color: "var(--color-primary)" }}>
                          •
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );

            const GraphicPanel = (
              <div className="group relative h-[200px] rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#0c0c0c] via-black to-[#050505] border border-white/5">
                <div
                  className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${accent}22, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 p-4 transition-transform duration-700 group-hover:scale-105">
                  <PhaseGraphic index={index} accent={accent} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-20">
                  <div className="inline-flex items-center rounded-full bg-black/65 px-4 py-1 text-xs font-medium text-white">
                    {title}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={title}
                className={`space-y-4 lg:space-y-6 ${!isEven ? "pt-10 lg:pt-20" : ""}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {isEven ? (
                  <>
                    {ServiceCard}
                    {GraphicPanel}
                  </>
                ) : (
                  <>
                    {GraphicPanel}
                    {ServiceCard}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(ProcessSection);