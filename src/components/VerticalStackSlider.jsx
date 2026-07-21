import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants/services";

const slideColors = [
  "from-blue-600/40",
  "from-purple-600/40",
  "from-red-600/40",
  "from-green-600/40",
  "from-pink-600/40",
  "from-amber-600/40",
  "from-indigo-600/40",
  "from-cyan-600/40",
  "from-orange-600/40",
  "from-teal-600/40",
];

const VerticalStackSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.sticky-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative rounded-t-[150px] mt-30 bg-black">
      <div className="relative mx-auto max-w-7xl section-container">
        {/* Header - Center aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center mt-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.25)] bg-[rgba(241,58,52,0.07)] px-4 py-2 mt-16">
              <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
              <span className="section-eyebrow text-[var(--color-primary)]">
                Our Services
              </span>
            </div>
          </div>

          <h2 className="section-heading text-white mb-3 text-center">
            Comprehensive Digital & Creative Services
          </h2>
          <p className="section-subtitle max-w-2xl text-white mx-auto text-center">
            From digital marketing and web development to creative production and media planning - we provide end-to-end solutions for modern brands.
          </p>
        </motion.div>
      </div>

      {services.map((item, index) => (
        <div
          key={index}
          className="sticky-section sticky top-0 h-screen flex items-center justify-center"
        >
          <div className="relative w-[85vw] h-full rounded-full">
            {/* Parallax Background */}
            <div 
              className="absolute inset-0 transition-transform duration-1000 ease-out mb-10 mt-20 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                transform: `scale(${activeIndex === index ? 1.05 : 1})`,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                decoding="async"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${slideColors[index % slideColors.length]} via-black/60 to-black/80`} />
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-20 mt-10 mx-15">
              <div className="max-w-4xl">
                {/* Animated Title */}
                {/* <div className="overflow-hidden mb-2">
                  <p className="text-sm font-medium tracking-widest text-white/80 opacity-0 animate-fadeInUp"
                     style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                    {item.title}
                  </p>
                </div> */}

                {/* Animated Heading */}
                <div className="overflow-hidden">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white opacity-0 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                    {item.title.split(' ').map((word, i) => (
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
                    {item.description}
                  </p>
                </div>

                {/* Animated Button */}
                <div className="overflow-hidden mt-10">
                  <div className="opacity-0 animate-fadeInUp"
                       style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                    <Link to="/portfolio" className="group relative inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl overflow-hidden">
                      <span className="relative z-10">Explore {item.title}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                  </div>
                </div>

                {/* Progress Indicator */}
                {/* <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                  <div className="flex items-center space-x-2">
                    {services.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === index 
                            ? 'w-8 bg-white' 
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Scroll Indicator */}
      {/* <div className="fixed bottom-8 right-8 z-50">
        <div className="text-white/60 text-xs tracking-widest animate-bounce bg-black/50 p-3 rounded-full">
          <div className="flex flex-col items-center">
            <span>SCROLL</span>
            <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div> */}

      {/* Custom Animations */}
      <style jsx="true">{`
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
        
        .sticky-section {
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
    </section>
  );
};

export default VerticalStackSlider;