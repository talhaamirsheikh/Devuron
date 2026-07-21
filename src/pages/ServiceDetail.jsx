import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, Home, Sparkles } from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import { motion } from "framer-motion";
import { services } from "../constants/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const service = services.find(s => s.slug === slug);
  const relatedServices = services.filter(s => s.slug !== slug).slice(0, 3);
  
  const [activeSubServiceIndex, setActiveSubServiceIndex] = useState(0);

  useEffect(() => {
    if (!service?.subServices || service.subServices.length === 0) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('.sticky-subservice-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveSubServiceIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 mb-6">Service not found</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold"
          >
            <ArrowLeft size={18} />
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title={service?.hero_heading || service?.name || service?.title}
        subtitle="Service Details"
        description={service?.hero_paragraph || service?.description || ""}
        breadcrumbs={[
          { label: "Home", icon: Home, href: "/" },
          { label: "Services", href: "/services", current: false },
          { label: service?.name || service?.title, href: `/services/${slug}`, current: true },
        ]}
        backgroundImage={service?.hero_image ? service.hero_image : service?.image ? service.image : "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34",
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {/* <div className="mb-6 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900 transition-colors duration-200 mx-auto"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div> */}

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div>
            <h1 className="section-heading text-center mb-4">
              {service.title}
            </h1>
            <p className="section-subtitle text-center mb-7">{service.description}</p>
            <div className="flex justify-center">
              <Link to="/contact" className="btn-primary">
                Discuss this service
              </Link>
            </div>
          </div>
          
        </div>

        {/* Sub-Services Section with Vertical Stack Slider */}
        {service.subServices && service.subServices.length > 0 && (
          <section className="mb-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16 text-center"
            >
              {/* <div className="mb-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.25)] bg-[rgba(241,58,52,0.07)] px-4 py-2">
                  <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
                  <span className="section-eyebrow text-[var(--color-primary)]">
                    What's Included
                  </span>
                </div>
              </div> */}

              {/* <h2 className=" text-gray-900 mb-3">
                What's Included in {service.title} 
              </h2> */}
              {/* <p className="section-subtitle max-w-2xl text-gray-600 mx-auto">
                Explore our detailed breakdown of services designed to meet your specific needs and requirements.
              </p> */}
            </motion.div>

            {/* Vertical Stack Slider for Sub-Services */}
            <div className="relative">
              {service.subServices.map((subService, index) => (
                <div
                  key={subService.id}
                  className="sticky-subservice-section sticky top-0 h-screen flex items-center justify-center"
                >
                  <div className="relative w-[85vw] h-full rounded-full">
                    {/* Parallax Background */}
                    <div 
                      className="absolute inset-0 transition-transform duration-1000 ease-out mb-10 mt-20 rounded-3xl overflow-hidden shadow-2xl"
                      style={{
                        transform: `scale(${activeSubServiceIndex === index ? 1.05 : 1})`,
                      }}
                    >
                      <img
                        src={subService.image || service.image}
                        alt={subService.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                      
                      {/* Grid Pattern */}
                      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-20 mt-10 mx-15">
                      <div className="max-w-4xl">
                       

                        {/* Animated Heading */}
                        <div className="overflow-hidden">
                          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white opacity-0 animate-fadeInUp"
                              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                            {subService.title.split(' ').map((word, i) => (
                              <span key={i} className="inline-block mr-2">
                                {word}
                              </span>
                            ))}
                          </h2>
                        </div>

                        {/* Animated Description */}
                        <div className="overflow-hidden">
                          <p className="mt-8 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed opacity-0 animate-fadeInUp"
                             style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                            {subService.description}
                          </p>
                        </div>

                        {/* Animated Button */}
                        <div className="overflow-hidden mt-10">
                          <div className="opacity-0 animate-fadeInUp"
                               style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                            <Link
                              to={`/services/${service.slug}/${subService.slug}`}
                              className="group relative inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl overflow-hidden"
                            >
                              <span className="relative z-10">Learn More</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </Link>
                            
                            {/* Features List */}
                            {subService.features && (
                              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                {subService.features.map((feature, featureIndex) => (
                                  <div 
                                    key={featureIndex}
                                    className="opacity-0 animate-fadeInUp flex items-start gap-3"
                                    style={{ animationDelay: `${index * 0.1 + 0.6 + featureIndex * 0.1}s` }}
                                  >
                                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-white/80">{feature}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                 
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
   

        {/* CTA Section */}
        <div className="bg-black rounded-3xl p-10 md:p-14 text-white text-center mt-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to bring this to life?
          </h2>
          <p className="text-sm md:text-base mb-7 max-w-2xl mx-auto text-white/80">
            Share a bit about your timelines, budget range, and goals—we'll
            come back with a recommended engagement and next steps.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Talk to the team
          </Link>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .sticky-subservice-section {
          scroll-snap-align: start;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;