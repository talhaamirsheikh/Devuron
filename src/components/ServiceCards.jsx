import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Palette,
  Code,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
} from "lucide-react";
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";


const ServicesList = ({ servicesData, loading }) => {
  const defaultServices = [
    {
      title: "UI / UX Design",
      description:
        "Product experiences crafted from research, insight, and clean, conversion-focused design.",
      features: [
        "User research & journeys",
        "Wireframes & prototypes",
        "Design systems",
        "Usability testing",
      ],
      icon: <Palette className="h-6 w-6" />,
      price: "$2,500+",
      timeline: "4-8 weeks",
      projects: "50+",
      delay: 0.1,
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Web Development",
      description:
        "Fast, responsive sites and apps built on modern stacks, ready to scale with your brand.",
      features: [
        "Frontend & SPA builds",
        "API integrations",
        "Performance optimization",
        "Security hardening",
      ],
      icon: <Code className="h-6 w-6" />,
      price: "$3,500+",
      timeline: "6-12 weeks",
      projects: "120+",
      delay: 0.18,
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Digital Marketing",
      description:
        "Always-on campaigns that turn attention into measurable growth across channels.",
      features: [
        "Social media strategy",
        "Content & campaigns",
        "SEO & analytics",
        "Paid media management",
      ],
      icon: <TrendingUp className="h-6 w-6" />,
      price: "$1,800+",
      timeline: "Ongoing",
      projects: "80+",
      delay: 0.26,
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const services = servicesData?.data || servicesData || defaultServices;

  return (
    <section className="relative overflow-hidden bg-black section-padding">
      <div className="relative mx-auto max-w-7xl section-container">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Header - Start aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 relative z-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.4)] bg-[rgba(241,58,52,0.15)] px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
            <span className="section-eyebrow text-[var(--color-primary)] font-medium">
              Our Services
            </span>
          </div>

          <h2 className="section-heading text-white mb-3 text-start">
            Our Works
          </h2>
          <p className="section-subtitle max-w-2xl text-gray-400 text-start">
            From strategy and design to development and growth, we plug into
            your team as an end-to-end partner.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-6 relative z-10">
          {services.length > 0 ? services.map((service, index) => (
            <ServiceListItem key={service.id || service.slug || service.title || index} service={service} index={index} />
          )) : (
            <p className="text-gray-400 text-center py-12">No services available</p>
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceListItem = memo(({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
        delay: service.delay,
      }}
      whileHover={{
        // y: -4,
        boxShadow: "0 20px 40px rgba(241, 58, 52, 0.15)",
        borderColor: "rgba(241, 58, 52, 0.3)",
        transition: { duration: 0.1},
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-blur backdrop-blur-sm hover:border-gray-700 transition-all"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Left */}
        <div className="lg:w-1/4 relative overflow-hidden min-h-[200px] lg:min-h-auto">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${
              service?.image
                ? service.image
                : service?.featured_image
                ? service.featured_image
                : service?.thumbnail
                ? service.thumbnail
                : "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            })` }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
          
          {/* Rating overlay on image */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-white font-medium">{service.rating}</span>
            </div>
          </div>
        </div>

        {/* Content Section - Right */}
        <div className="lg:w-3/4 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Content */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (service.delay || 0) + 0.2 }}
            className="rounded-lg bg-gray-800/50 p-2 border border-gray-800 backdrop-blur-sm"
          >
            <div className="text-[var(--color-primary)]">{service.icon || <Palette className="h-6 w-6" />}</div>
          </motion.div>
                    <motion.h3
                      initial={{ y: 18, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (service.delay || 0) + 0.25 }}
                      className="text-2xl font-bold text-white hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Link to={`/services/${service.slug || ''}`}>{service.title}</Link>
                    </motion.h3>
                  </div>

                  <motion.p
                    initial={{ y: 14, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (service.delay || 0) + 0.3 }}
                    className="text-gray-400 mb-6"
                  >
                    {service.description}
                  </motion.p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800 backdrop-blur-sm">
                        <DollarSign className="h-4 w-4 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Starting from</div>
                        <div className="text-lg font-semibold text-white">{service.price || service.starting_price || "Contact us"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800 backdrop-blur-sm">
                        <Clock className="h-4 w-4 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Timeline</div>
                        <div className="text-lg font-semibold text-white">{service.timeline || service.duration || "Varies"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800 backdrop-blur-sm">
                        <Users className="h-4 w-4 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Projects</div>
                        <div className="text-lg font-semibold text-white">{service.projects || service.project_count || "50+"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-300">Key Features</div>
                      {(service.features || []).length > 4 && (
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="text-sm text-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-1"
                        >
                          {isExpanded ? 'Show less' : 'Show all features'}
                          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-24'}`}>
                      {(service.features || []).map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.2,
                            delay: (service.delay || 0) + 0.35 + idx * 0.04,
                          }}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-800 backdrop-blur-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-[var(--color-primary)] flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="lg:w-1/3 flex lg:justify-end lg:items-start">
              <Link
                to="/contact"
                className="w-full lg:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#d32f2f] hover:from-[#d32f2f] hover:to-[var(--color-primary)] text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:shadow-[var(--color-primary)]/30 cursor-pointer"
              >
                <span>Get Quote</span>
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[#d32f2f] to-transparent"
        initial={{ width: "0%" }}
        whileInView={{ width: "30%" }}
        viewport={{ once: true }}
        animate={{ width: isHovered ? "100%" : "30%" }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
});

export default ServicesList;