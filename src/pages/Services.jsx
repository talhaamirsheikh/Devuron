import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import DOMPurify from 'dompurify';
import { services } from "../constants/services";

// Corner Brackets Component
const CornerBrackets = ({ size = "h-4 w-4", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label, accent = "#F13A34" }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-white/10 bg-black/60 px-4 py-1.5 z-20">
    <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">{label}</span>
  </div>
);

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

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

  const servicesBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Services", href: "/services", current: true },
  ];

  const handleImageError = (serviceSlug) => {
    setImageErrors(prev => ({
      ...prev,
      [serviceSlug]: true
    }));
  };

  const getFallbackGradient = (index) => {
    const gradients = [
      'bg-gradient-to-br from-[#4db9e0] to-[#10475c]',
      'bg-gradient-to-br from-[#4db9e0] to-[#185e78]',
      'bg-gradient-to-br from-[#4db9e0] to-[#207694]',
      'bg-gradient-to-br from-[#4db9e0] to-[#2b8eb3]',
      'bg-gradient-to-br from-[#4db9e0] to-[#38a6d1]',
    ];
    return gradients[index % gradients.length];
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath;
  };

  return (
    <div className="bg-white">
      {/* Global Hero Section */}
      <GlobalHero 
        title="Our Services"
        subtitle="Digital Excellence Tailored Solutions"
        description="We deliver comprehensive digital solutions that drive growth, enhance engagement, and transform your brand's online presence through innovative strategies and creative execution."
        breadcrumbs={servicesBreadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        centered={true}
        titleColors={{
          first: "white",
          second: "#F13A34"
        }}
      />
       
      {/* Vertical Stack Services */}
      <section className="relative py-10 bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          {services?.map((service, index) => {
            const serviceKey = service.slug || service.id || `service-${index}`;
            const serviceImage = getImageUrl(service?.image);
            
            return (
              <div
                key={serviceKey}
                className="service-section sticky top-10 h-screen flex items-center justify-center"
              >
                <div className="relative w-full max-w-[90vw] h-[80vh]">
                  {/* Card */}
                  <div 
                    className="absolute inset-0 transition-all duration-700 ease-out border bg-white/5 backdrop-blur-sm overflow-hidden"
                    style={{
                      transform: `scale(${activeIndex === index ? 1.02 : 1})`,
                      borderColor: activeIndex === index ? 'rgba(241, 58, 52, 0.4)' : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <CornerBrackets borderColor="border-white/10" />
                    <Tab label={`SERVICE ${String(index + 1).padStart(2, "0")}`} />

                    {/* Background - Image or Fallback */}
                    {serviceImage && !imageErrors[serviceKey] ? (
                      <img
                        src={service.image}
                        alt={service.title || service.name || 'Service'}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImageError(serviceKey)}
                      />
                    ) : (
                      <div className={`absolute inset-0 w-full h-full ${getFallbackGradient(index)}`} />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                    
                    {/* Accent Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        background: `radial-gradient(ellipse 50% 40% at 80% 20%, #F13A3420, transparent 70%)`,
                      }}
                    />

                    {/* Service Number - Large Background */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/5"
                      style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16">
                      <div className="max-w-3xl">
                        {/* Service Number - Small */}
                        <div className="mb-3">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                            Service {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tight text-white leading-[1.05]">
                          {service?.name || service?.title || 'Service'}
                        </h2>

                        {/* Accent Line */}
                        <div className="mt-5 h-[3px] w-16 bg-[#F13A34]" />

                        {/* Description */}
                        {service?.description && (
                          <div 
                            className="mt-6 text-[15px] text-white/60 max-w-2xl leading-relaxed prose prose-invert prose-p:text-white/60"
                            dangerouslySetInnerHTML={{ 
                              __html: DOMPurify.sanitize(service.description) 
                            }}
                          />
                        )}

                        {/* CTA Button */}
                        {service?.slug && (
                          <div className="mt-8">
                            <Link
                              to={`/services/${service.slug}`}
                              className="group inline-flex items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
                            >
                              <span className="relative flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                                {service?.button_text || service?.buttonText || "View Service Details"}
                                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                      {services.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 w-6 transition-all duration-500 ${
                            i === index ? 'bg-[#F13A34]' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom CTA Section - Studio Monitor Style */}
          <div className="sticky top-10 h-screen flex items-center justify-center">
            <div className="relative w-full max-w-[90vw] h-[80vh] border border-white/10 bg-gradient-to-br from-[#0c0c0c] via-black to-[#050505] overflow-hidden">
              <CornerBrackets borderColor="border-white/10" />
              
              <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-white/10 bg-black/60 px-4 py-1.5 z-20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">GET STARTED</span>
              </div>

              {/* Accent Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(241,58,52,0.15),_transparent_55%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

              {/* Ghost Number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/5"
                style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}
              >
                00
              </div>

              <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-center h-full">
                <div>
                  <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/30 py-2 pl-4 pr-5 backdrop-blur-sm mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                      Let's Connect
                    </span>
                  </div>

                  <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tight text-white leading-[1.05] mb-4">
                    Ready to <span className="text-[#F13A34]">Transform</span><br />
                    Your Business?
                  </h2>

                  <p className="text-[15px] text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
                    Whether you're launching a new brand, scaling an existing one, or
                    optimizing your digital presence, we'll help you achieve
                    exceptional results.
                  </p>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
                  >
                    <span className="relative flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                      Schedule a consultation
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .service-section {
            scroll-snap-align: start;
          }
          
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
        `}</style>
      </section>
    </div>
  );
};

export default Services;