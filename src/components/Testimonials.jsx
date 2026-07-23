import React, { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
const defaultTestimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Marketing, Horizon Group",
    message:
      "The team feels like an extension of our own. They own the strategy, execution, and reporting—our channels have never been this consistent or high-performing.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Michael Lee",
    role: "Founder, Northside Studio",
    message:
      "From our first campaign, we saw a clear lift in engagement and qualified leads. The reporting is clean, actionable, and always tied back to business outcomes.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=400&fit=crop",
  },
  {
    name: "Aisha Khan",
    role: "Brand Director, Emerald Living",
    message:
      "They rebuilt our content and posting cadence from the ground up. Everything now feels on-brand, intentional, and measurable across every platform.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  },
  {
    name: "David Martinez",
    role: "CEO, Nova Commerce",
    message:
      "We launched a new product line and relied on them for full-funnel social. The launch exceeded targets in the first 30 days—and they already had iteration plans ready.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
];

const Testimonials = ({ testimonialsData, loading }) => {
  // Ensure testimonials is always an array
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
    <section className="section-padding bg-[#F6F4EF]">
      <div className="section-container max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* <p className="section-eyebrow mb-3 text-neutral-500">
            Client results
          </p> */}

            <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
                     <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
                     <span className="font-mono text-xs tracking-[0.22em] uppercase text-neutral-700">
                       Start a project
                     </span>
                   </div>
          <h2 className="section-heading text-neutral-900 mb-4">
            Brands that trust our team
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We build long-term partnerships with teams who care about craft,
            consistency, and measurable growth.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Static Highlight Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-[320px] flex-shrink-0"
          >
            <div className="h-full min-h-[360px] rounded-3xl bg-gradient-to-b from-black via-[#111111] to-black text-white p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.4),_transparent_55%)] opacity-70" />
              <div className="relative z-10 space-y-4 text-left">
                <p className="section-eyebrow text-white/70">
                  Social proof
                </p>
                <h3 className="font-mono text-[20px] font-bold uppercase leading-snug tracking-tight">
                  90% of our clients extend beyond their first engagement.
                </h3>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  We focus on clarity, responsiveness, and execution quality—so
                  every campaign feels managed, not micro-managed.
                </p>
              </div>
              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-300">
                <span>Average NPS: 9.4 / 10</span>
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
                    className="w-[320px] h-[360px] bg-white px-7 py-8 shadow-sm border border-neutral-200/70 flex flex-col justify-between rounded-3xl"
                  >
                    {/* Quotation Mark */}
                    <div className="text-neutral-200 mb-4">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H5.24A3.001 3.001 0 017.17 6zm9 0A5.001 5.001 0 0011 11v7h7v-7h-3.76A3.001 3.001 0 0116.17 6z" />
                      </svg>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-neutral-800 leading-relaxed text-sm mb-6 line-clamp-5">
                      {t.message || t.testimonial || t.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
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
                        <h3 className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-neutral-900">
                          {t.name || t.author}
                        </h3>
                        <p className="text-[12px] text-neutral-500">{t.role || t.position || t.company}</p>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <svg
                              key={i}
                              className="w-3.5 h-3.5 text-[var(--color-primary)]"
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

              {/* Fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#F6F4EF] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#F6F4EF] to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
