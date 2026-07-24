import React, { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";

const defaultTestimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Marketing, Horizon Group",
    message:
      "Partnering with this team has completely transformed the way we approach digital marketing. They took the time to understand our brand, audience, and long-term business goals before creating a strategy tailored specifically to our needs. From content creation and campaign management to performance reporting and optimization, every step has been handled with professionalism and attention to detail. Their proactive communication, creative ideas, and commitment to delivering measurable results have made them a trusted extension of our internal team. We've seen stronger engagement, higher-quality leads, and consistent business growth since working together.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Michael Lee",
    role: "Founder, Northside Studio",
    message:
      "The level of expertise and dedication this team brings to every project is exceptional. They didn't just improve our online visibility—they completely redefined our digital strategy with a data-driven approach that delivered real business impact. Every campaign was carefully planned, monitored, and optimized for maximum performance. Their reports are detailed yet easy to understand, and they consistently provide actionable recommendations that help us make smarter business decisions. Working with them has resulted in increased traffic, stronger customer engagement, and a significant boost in qualified leads.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=400&fit=crop",
  },
  {
    name: "Aisha Khan",
    role: "Brand Director, Emerald Living",
    message:
      "From the very beginning, their team demonstrated a deep understanding of branding, design, and digital communication. They completely revamped our content strategy, improved our social media presence, and created campaigns that genuinely resonated with our audience. Their ability to combine creativity with analytics helped us strengthen our brand identity while achieving measurable growth across multiple platforms. Every project was delivered on time, communication was seamless, and the results consistently exceeded our expectations. We couldn't be happier with the partnership.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  },
  {
    name: "David Martinez",
    role: "CEO, Nova Commerce",
    message:
      "Launching our new product line was a major milestone, and choosing this team to manage our digital strategy was one of the best business decisions we've made. They handled everything from planning and creative development to paid advertising and performance optimization with exceptional professionalism. The launch not only exceeded our initial sales and engagement targets within the first month but also established a strong foundation for long-term growth. Their strategic thinking, technical expertise, and commitment to continuous improvement have made them a valuable long-term partner for our company.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
];

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-400" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Testimonials = ({ testimonialsData, loading }) => {
  let testimonials = defaultTestimonials;
  
  if (testimonialsData) {
    if (Array.isArray(testimonialsData)) {
      testimonials = testimonialsData;
    } else if (Array.isArray(testimonialsData?.data)) {
      testimonials = testimonialsData.data;
    } else if (testimonialsData?.testimonials && Array.isArray(testimonialsData.testimonials)) {
      testimonials = testimonialsData.testimonials;
    }
  }

  const cardWidth = 320;
  const gap = 24;
  const totalWidth = (cardWidth + gap) * testimonials.length;
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-white">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
              Testimonials
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
            Brands that trust our team
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            We build long-term partnerships with teams who care about craft,
            consistency, and measurable growth.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Static Highlight Card - Dark Theme */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-[320px] flex-shrink-0"
          >
            <div className="relative bg-gradient-to-b from-[#0c0c0c] via-black to-[#050505] p-8 h-full min-h-[380px] flex flex-col justify-between overflow-hidden ">
              {/* Corner Brackets - White */}
              <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-white/10" />
              <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-white/10" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-white/10" />
              <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-white/10" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.4),_transparent_55%)] opacity-70" />

              {/* Tab */}
              <div className="absolute -top-px left-8 flex items-center gap-2 border-b  border-r border-white/10 bg-white px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-black">
                  SOCIAL PROOF
                </span>
              </div>

              <div className="relative z-10 pt-4 space-y-4">
                <h3 className="font-mono text-[18px] font-black uppercase leading-snug tracking-tight text-white">
                  90% of our clients extend beyond their first engagement.
                </h3>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  We focus on clarity, responsiveness, and execution quality—so
                  every campaign feels managed, not micro-managed.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                <span>Average NPS: 9.4 / 10</span>
                <span className="h-3 w-px bg-white/10" />
                <span>Retention: 18+ months</span>
              </div>
            </div>
          </motion.div>

          {/* Sliding Cards */}
          <div className="flex-1">
            <div className="relative overflow-hidden h-[380px]">
              <motion.div
                className="flex gap-6 absolute top-0"
                animate={{ x: [0, -totalWidth] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {marqueeItems.map((t, idx) => (
                  <div
                    key={`${t.id || t.name}-${idx}`}
                    className="relative border border-neutral-200 bg-white p-6 w-[320px] h-[360px] flex flex-col justify-between"
                  >
                    <CornerBrackets size="h-3 w-3" />

                    {/* Quotation Mark */}
                    <div className="text-[#F13A34]/20 mb-3">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H5.24A3.001 3.001 0 017.17 6zm9 0A5.001 5.001 0 0011 11v7h7v-7h-3.76A3.001 3.001 0 0116.17 6z" />
                      </svg>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-[14px] text-neutral-700 leading-relaxed mb-4 line-clamp-5 flex-1">
                      {defaultTestimonials.message || t.testimonial || t.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200">
                        <img
                          src={
                            t?.image
                              ? t.image
                              : t?.avatar
                              ? t.avatar
                              : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                          }
                          alt={t.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div>
                        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                          {t.name || t.author}
                        </h3>
                        <p className="text-[11px] text-neutral-500">{t.role || t.position || t.company}</p>
                        <div className="flex mt-1 gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <svg
                              key={i}
                              className="w-3 h-3 text-[#F13A34]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Fade edges - White */}
              <div className="pointer-events-none absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
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

export default memo(Testimonials);