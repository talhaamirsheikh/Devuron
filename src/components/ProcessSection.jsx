import React, { memo } from "react";
import { motion } from "framer-motion";
import { Target, Bot, Workflow, BarChart3, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENTS = ["#F13A34", "#FF7A45", "#FFB020", "#F13A34"];

/* Phase Graphics */
const PhaseGraphic = ({ index, accent }) => {
  switch (index) {
    case 0:
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
    case 1:
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
    case 2:
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
    default:
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

/* Reusable Components */
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const ProcessSection = () => {
  const services = {
    "Discovery & Strategy": {
      icon: <Target className="w-5 h-5 text-[#F13A34]" />,
      steps: [
        "Map manual workflows worth automating",
        "Audit existing tools, APIs, and data",
        "Define success metrics and ROI targets",
      ],
    },
    "Agent Architecture": {
      icon: <Bot className="w-5 h-5 text-[#F13A34]" />,
      steps: [
        "Design reasoning, memory, and tool access",
        "Select and fine-tune the underlying models",
        "Engineer prompts and decision logic",
      ],
    },
    "Integration & Deployment": {
      icon: <Workflow className="w-5 h-5 text-[#F13A34]" />,
      steps: [
        "Connect agents to internal APIs and databases",
        "Integrate with Slack, CRM, and support tools",
        "Ship to staging, then production",
      ],
    },
    "Monitoring & Optimization": {
      icon: <BarChart3 className="w-5 h-5 text-[#F13A34]" />,
      steps: [
        "Track task completion and accuracy",
        "Monitor latency, cost, and token usage",
        "A/B test prompts and workflows",
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Our Delivery Process
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900">
            End-to-End AI Agent Development
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            A four-phase framework that takes you from workflow audit to a
            production agent — architected, integrated, and continuously
            tuned against real usage data.
          </p>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 mt-8 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
          >
            <span className="relative flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
              View Complete Process
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {Object.entries(services).map(([title, service], index) => {
            const isEven = index % 2 === 0;
            const accent = ACCENTS[index % ACCENTS.length];

            // Service Card - White Theme
            const ServiceCard = (
              <div className="group relative border border-neutral-200 bg-white p-6 transition-all duration-500 hover:border-[#F13A34]/40">
                <CornerBrackets />

                <div className="absolute top-4 right-4 font-mono text-[10px] font-semibold tracking-[0.2em] text-neutral-400">
                  {String(index + 1).padStart(2, "0")}/04
                </div>

                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${accent}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10 mb-4">
                    {service.icon}
                  </div>
                  <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900">
                    {title}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {service.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-neutral-600 leading-relaxed">
                        <span className="text-[#F13A34] mt-1">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );

            // Graphic Panel - Dark Theme (pehle jaisa)
            const GraphicPanel = (
              <div className="group relative border border-white/10 bg-gradient-to-br from-[#0c0c0c] via-black to-[#050505] overflow-hidden transition-all duration-500 hover:border-[#F13A34]/40">
                <CornerBrackets borderColor="border-white/10" />

                <div
                  className="absolute inset-0 pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 50% 40% at 30% 20%, ${accent}22, transparent 65%)`,
                  }}
                />

                <div className="relative h-[200px] p-4 transition-transform duration-700 group-hover:scale-105">
                  <PhaseGraphic index={index} accent={accent} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    <span className="h-1 w-1 rounded-full bg-[#F13A34]" />
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

export default memo(ProcessSection);