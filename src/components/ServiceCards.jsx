import { motion, AnimatePresence } from "framer-motion";
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
  ChevronLeft,
} from "lucide-react";
import React, { useState, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

// Memoized card component for better performance
const ServiceCard = memo(({ service, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{
        boxShadow: "0 20px 40px rgba(241, 58, 52, 0.15)",
        borderColor: "rgba(241, 58, 52, 0.3)",
        transition: { duration: 0.15 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-blur backdrop-blur-sm hover:border-gray-700 transition-all duration-200"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex flex-col">
        {/* Image Section */}
        <div className="relative overflow-hidden h-48 w-full">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${
                service?.image || service?.featured_image || service?.thumbnail ||
                "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              })`,
              willChange: 'transform'
            }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Rating overlay */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-white font-medium">{service.rating || '4.9'}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="rounded-lg bg-gray-800/50 p-2 border border-gray-800 backdrop-blur-sm flex-shrink-0"
            >
              <div className="text-[var(--color-primary)]">{service.icon || <Palette className="h-5 w-5" />}</div>
            </motion.div>
            <h3 className="text-xl font-bold text-white hover:text-[var(--color-primary)] transition-colors truncate">
              <Link to={`/services/${service.slug || ''}`}>{service.title}</Link>
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[var(--color-primary)] flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">From</div>
                <div className="text-sm font-semibold text-white truncate">{service.price || "Contact"}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[var(--color-primary)] flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Timeline</div>
                <div className="text-sm font-semibold text-white truncate">{service.timeline || "Varies"}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[var(--color-primary)] flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Projects</div>
                <div className="text-sm font-semibold text-white truncate">{service.projects || "50+"}</div>
              </div>
            </div>
          </div>

          {/* Features - compact */}
          <div className="mb-4">
            {/* <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-1 mb-2"
            >
              {isExpanded ? 'Hide features' : 'Show features'}
              <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button> */}
            
            <div className={`grid grid-cols-1 gap-1.5 overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-48' : 'max-h-0'}`}>
              {(service.features || []).slice(0, 4).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-800/30 transition-colors"
                >
                  <CheckCircle className="h-3 w-3 text-[var(--color-primary)] flex-shrink-0" />
                  <span className="text-xs text-gray-300 truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#d32f2f] hover:from-[#d32f2f] hover:to-[var(--color-primary)] text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:shadow-[var(--color-primary)]/20 text-sm"
          >
            <span>Get Quote</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] via-[#d32f2f] to-transparent"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "30%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Main Component
const ServicesList = ({ servicesData, loading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const CARDS_PER_PAGE = 4;

  const defaultServices = useMemo(() => [
    {
      title: "UI / UX Design",
      description: "Product experiences crafted from research, insight, and clean, conversion-focused design.",
      features: ["User research & journeys", "Wireframes & prototypes", "Design systems", "Usability testing"],
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
      description: "Fast, responsive sites and apps built on modern stacks, ready to scale with your brand.",
      features: ["Frontend & SPA builds", "API integrations", "Performance optimization", "Security hardening"],
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
      description: "Always-on campaigns that turn attention into measurable growth across channels.",
      features: ["Social media strategy", "Content & campaigns", "SEO & analytics", "Paid media management"],
      icon: <TrendingUp className="h-6 w-6" />,
      price: "$1,800+",
      timeline: "Ongoing",
      projects: "80+",
      delay: 0.26,
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Brand Strategy",
      description: "Build a distinctive brand identity that resonates with your audience and drives loyalty.",
      features: ["Brand positioning", "Visual identity", "Messaging framework", "Brand guidelines"],
      icon: <Sparkles className="h-6 w-6" />,
      price: "$4,000+",
      timeline: "6-10 weeks",
      projects: "35+",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store optimization"],
      icon: <Code className="h-6 w-6" />,
      price: "$5,000+",
      timeline: "8-16 weeks",
      projects: "45+",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ], []);

  const services = useMemo(() => {
    const data = servicesData?.data || servicesData;
    return data && data.length > 0 ? data : defaultServices;
  }, [servicesData, defaultServices]);

  const totalPages = useMemo(() => Math.ceil(services.length / CARDS_PER_PAGE), [services.length]);

  const currentServices = useMemo(() => {
    const start = currentPage * CARDS_PER_PAGE;
    const end = Math.min(start + CARDS_PER_PAGE, services.length);
    return services.slice(start, end);
  }, [services, currentPage]);

  const handleNext = useCallback(() => {
    if (isTransitioning || currentPage >= totalPages - 1) return;
    setIsTransitioning(true);
    setCurrentPage(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentPage, totalPages, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || currentPage <= 0) return;
    setIsTransitioning(true);
    setCurrentPage(prev => prev - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentPage, isTransitioning]);

  // Memoized pagination dots
  const paginationDots = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => {
          if (isTransitioning || i === currentPage) return;
          setIsTransitioning(true);
          setCurrentPage(i);
          setTimeout(() => setIsTransitioning(false), 300);
        }}
        className={`h-2 rounded-full transition-all duration-200 ${
          i === currentPage 
            ? 'w-6 bg-[var(--color-primary)]' 
            : 'w-2 bg-gray-600 hover:bg-gray-400'
        }`}
        aria-label={`Go to page ${i + 1}`}
      />
    ));
  }, [totalPages, currentPage, isTransitioning]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-black section-padding">
        <div className="relative mx-auto max-w-7xl section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-800 rounded-t-2xl" />
                <div className="p-5 bg-gray-900/50 rounded-b-2xl">
                  <div className="h-6 bg-gray-800 rounded mb-3" />
                  <div className="h-4 bg-gray-800 rounded mb-2" />
                  <div className="h-4 bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black section-padding">
      <div className="relative mx-auto max-w-7xl section-container">
        {/* Background decorative elements - optimized with will-change */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" style={{ willChange: 'transform' }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 relative z-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.4)] bg-[rgba(241,58,52,0.15)] px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
            <span className="section-eyebrow text-[var(--color-primary)] font-medium text-sm">
              Our Services
            </span>
          </div>

          <h2 className="section-heading text-white mb-2 text-start text-4xl md:text-5xl font-bold">
            Our Works
          </h2>
          <p className="section-subtitle max-w-2xl text-gray-400 text-start text-base">
            From strategy and design to development and growth, we plug into
            your team as an end-to-end partner.
          </p>
        </motion.div>

        {/* Carousel Grid */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {currentServices.map((service, index) => (
                <ServiceCard 
                  key={service.id || service.slug || service.title || index}
                  service={service}
                  index={index}
                  isVisible={true}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0 || isTransitioning}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  currentPage === 0 || isTransitioning
                    ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                    : 'border-gray-700 hover:border-[var(--color-primary)] text-gray-400 hover:text-white hover:bg-[var(--color-primary)]/10'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {paginationDots}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1 || isTransitioning}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  currentPage >= totalPages - 1 || isTransitioning
                    ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                    : 'border-gray-700 hover:border-[var(--color-primary)] text-gray-400 hover:text-white hover:bg-[var(--color-primary)]/10'
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(ServicesList);