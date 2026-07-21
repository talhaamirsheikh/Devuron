import React, { memo } from "react";
import { motion } from "framer-motion";
import { Target, FileText, Image, BarChart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ProcessSection = () => {
  const services = {
    "Strategy Development": {
      icon: (
        <Target className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />
      ),
      steps: [
        "Identify the target audience",
        "Study the target audience",
        "Conduct customer niche analysis",
        "Develop a general strategy"
      ]
    },
    "Content Management": {
      icon: (
        <FileText className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />
      ),
      steps: [
        "Create content plan",
        "Adapt content for various formats",
        "Write texts for social networks",
        "Write text in blog format"
      ]
    },
    "Visualisation & Integration": {
      icon: (
        <Image className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />
      ),
      steps: [
        "Community branding",
        "Integrate site with social networks",
        "Integrate online shop with social networks",
        "Create landing pages"
      ]
    },
    "Advertising & Analytics": {
      icon: (
        <BarChart className="w-6 h-6 opacity-90 group-hover:opacity-100 text-[var(--color-primary)]" />
      ),
      steps: [
        "Social media advertising analysis",
        "Set up campaigns",
        "Create ad content",
        "Monitor and support"
      ]
    }
  };

  const images = [
    "https://images.unsplash.com/photo-1611605698335-8b1569810432",
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
    "https://images.unsplash.com/photo-1552664730-d307ca884978",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className=" section-padding overflow-hidden">
      <div className="section-container w-full">
        {/* TOP CONTENT */}
        <motion.div
          className="max-w-2xl mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* <span className="section-eyebrow mb-4 block">
            Our Social Media Process
          </span> */}
      

          <h2 className="section-heading text-neutral-900">
            End-to-End Social Media <br /> Management
          </h2>
          <p className="section-subtitle mt-4">
            A comprehensive four-phase framework that takes you from audience
            insight to content, execution, and real-time analytics—with
            measurable impact at every step.
          </p>
          <Link to="/services" className="btn-primary mt-8 inline-block">
            View Complete Process
          </Link>
        </motion.div>

        {/* PROCESS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {Object.entries(services).map(([title, service], index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={title}
                className={`space-y-4 lg:space-y-6 ${
                  !isEven ? "pt-10 lg:pt-20" : ""
                }`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {isEven ? (
                  <>
                    {/* Service Card */}
                    <div className="group relative bg-gradient-to-br from-[#050505] via-black to-[#101010] text-white rounded-3xl p-6 h-[250px] flex flex-col justify-between transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.35),_transparent_60%)]" />
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 mb-4 transform transition-all duration-400 group-hover:scale-105 group-hover:rotate-3">
                          {service.icon}
                        </div>
                        <h4 className="text-lg font-semibold transform transition-all duration-300 group-hover:translate-x-1">
                          {title}
                        </h4>
                        <ul className="mt-3 space-y-1.5">
                          {service.steps.map((step, i) => (
                            <li
                              key={i}
                              className="text-xs text-neutral-300 flex items-start gap-2"
                            >
                              <span className="text-[10px] mt-1 text-[var(--color-primary)]">
                                •
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="h-[200px] rounded-3xl overflow-hidden group cursor-pointer relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-all duration-700 z-10" />
                      <img
                        src={images[index]}
                        className="w-full h-full object-cover transform transition-transform duration-800 group-hover:scale-110 group-hover:rotate-[0.5deg]"
                        alt={title}
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-20">
                        <div className="inline-flex items-center rounded-full bg-black/65 px-4 py-1 text-xs font-medium text-white">
                        {title}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image First for alternate columns */}
                    <div className="h-[200px] rounded-3xl overflow-hidden group cursor-pointer relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-all duration-700 z-10" />
                      <img
                        src={images[index]}
                        className="w-full h-full object-cover transform transition-transform duration-800 group-hover:scale-110 group-hover:rotate-[0.5deg]"
                        alt={title}
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-20">
                        <div className="inline-flex items-center rounded-full bg-black/65 px-4 py-1 text-xs font-medium text-white">
                         {title}
                        </div>
                      </div>
                    </div>

                    {/* Service Card */}
                    <div className="group relative bg-gradient-to-br from-[#050505] via-black to-[#101010] text-white rounded-3xl p-6 h-[250px] flex flex-col justify-between transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.35),_transparent_60%)]" />
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 mb-4 transform transition-all duration-400 group-hover:scale-105 group-hover:rotate-3">
                          {service.icon}
                        </div>
                        <h4 className="text-lg font-semibold transform transition-all duration-300 group-hover:translate-x-1">
                          {title}
                        </h4>
                        <ul className="mt-3 space-y-1.5">
                          {service.steps.map((step, i) => (
                            <li
                              key={i}
                              className="text-xs text-neutral-300 flex items-start gap-2"
                            >
                              <span className="text-[10px] mt-1 text-[var(--color-primary)]">
                                •
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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