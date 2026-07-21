import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import DOMPurify from 'dompurify';
import { services } from "../constants/services";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Update scroll handler when services change
  useEffect(() => {
    if (services.length === 0) return;
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.service-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services.length]);

  // Custom breadcrumbs for services page
  const servicesBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Services", href: "/services", current: true },
  ];

  // Handle image load errors
  const handleImageError = (serviceSlug) => {
    setImageErrors(prev => ({
      ...prev,
      [serviceSlug]: true
    }));
  };

  // Get fallback gradient based on service index
  const getFallbackGradient = (index) => {
    const gradients = [
      'bg-gradient-to-br from-[#f13a34] to-[#6A070E]',
      'bg-gradient-to-br from-[#f13a34] to-[#8a1c1a]',
      'bg-gradient-to-br from-[#f13a34] to-[#a52d2a]',
      'bg-gradient-to-br from-[#f13a34] to-[#c03e3a]',
      'bg-gradient-to-br from-[#f13a34] to-[#db4f4a]',
    ];
    return gradients[index % gradients.length];
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath; // Local or absolute URL
  };

  return (
    <div className="bg-white">
      {/* Global Hero Section with custom props */}
      <GlobalHero 
        title="Our Services"
        subtitle="Digital Excellence Tailored Solutions"
        description="We deliver comprehensive digital solutions that drive growth, enhance engagement, and transform your brand's online presence through innovative strategies and creative execution."
        breadcrumbs={servicesBreadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34" // Red color for the word "Tailored"
        }}
      />
       
      {/* Vertical Stack Services */}
      <section className="relative rounded-t-[100px] md:rounded-t-[150px] pt-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {services?.map((service, index) => {
            const serviceKey = service.slug || service.id || `service-${index}`;
            const serviceImage = getImageUrl(service?.image);
            
            return (
            <div
              key={serviceKey}
              className="service-section sticky top-10 h-screen flex items-center justify-center"
            >
              <div className="relative w-full max-w-[85vw] h-[80vh]">
                {/* Parallax Background Container */}
                <div 
                  className="absolute inset-0 transition-all duration-1000 ease-out mb-10 mt-10 rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    transform: `scale(${activeIndex === index ? 1.03 : 1})`,
                  }}
                >
                  {/* Background - Image or Fallback Gradient */}
                  {serviceImage && !imageErrors[serviceKey] ? (
                    <img
                      src={service.image}
                      alt={service.title || service.name || 'Service'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(serviceKey)}
                    />
                  ) : (
                    <div className={`absolute inset-0 w-full h-full ${getFallbackGradient(index)}`} />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                  
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-20">
                  <div className="max-w-4xl">
                    {/* Animated Category */}
                    <div className="overflow-hidden mb-6">
                      {/* <p 
                        className="text-sm font-medium tracking-widest text-white/80 opacity-0 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                      >
                        {service.category || "Premium Service"}
                      </p> */}
                    </div>

                    {/* Animated Heading */}
                    <div className="overflow-hidden mb-6">
                      <h2 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white opacity-0 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                      >
                        {service?.name || service?.title || 'Service'}
                      </h2>
                    </div>

                    {/* Animated Description */}
                    {service?.description && (
                      <div className="overflow-hidden mb-8">
                        <div 
                          className="text-gray-300 text-base sm:text-sm md:text-md max-w-2xl leading-relaxed opacity-0 animate-fadeInUp prose prose-invert prose-p:text-gray-300"
                          style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(service.description) 
                          }}
                        />
                      </div>
                    )}

                    {/* CTA Buttons */}
                    {service?.slug && (
                      <div className="overflow-hidden">
                        <div className="opacity-0 animate-fadeInUp"
                             style={{ animationDelay: `${index * 0.1 + 0.6}s` }}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="group relative bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl inline-flex items-center gap-2 overflow-hidden"
                          >
                            <span className="relative z-10">
                              {service?.button_text || service?.buttonText || "View service details"}
                            </span>
                            <ChevronRight 
                              size={16} 
                              className="group-hover:translate-x-1 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="sticky top-0 h-screen flex items-center justify-center bg-black mx-10 rounded-xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-xl"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#f13a34]/10 to-[#f13a34]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-[#f13a34]/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]"></div>
          </div>

          <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 lg:px-8 " >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-[#f13a34]/10 to-transparent border border-[#f13a34]/20 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f13a34] animate-pulse"></div>
              <span className="text-xs font-semibold tracking-widest text-[#f13a34] uppercase">
                Let's Connect
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="text-[#f13a34]">Transform</span><br />
              Your Business?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're launching a new brand, scaling an existing one, or
              optimizing your digital presence, we'll help you achieve
              exceptional results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative"
              >
                <div className="absolute inset-0 "></div>
                <span className="relative flex items-center gap-2 btn-primary">
                  Schedule a consultation
                  <ChevronRight 
                    size={16} 
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#f13a34]/20 via-transparent to-[#f13a34]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            </div>
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
          
          .service-section {
            scroll-snap-align: start;
          }
          
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
      </section>
    </div>
  );
};

export default Services;