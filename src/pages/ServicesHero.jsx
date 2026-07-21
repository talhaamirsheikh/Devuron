import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================
   Main Services Hero Component
========================= */
export default function ServicesHero() {
  const services = [
    {
      title: "Social Media Management",
      description:
        "End-to-end social media strategy, content creation, and community management to build your brand's online presence.",
    },
    {
      title: "Content Production",
      description:
        "High-quality video, photography, and graphic design services that tell your brand's story effectively.",
    },
    {
      title: "Digital Strategy",
      description:
        "Data-driven digital marketing strategies tailored to your business goals and target audience.",
    },
    {
      title: "Event Management",
      description:
        "Comprehensive event planning and execution for both virtual and physical experiences.",
    },
  ];

  // Breadcrumbs data
  const breadcrumbs = [
    { label: "Home", icon: Home, href: "#" },
    { label: "Services", href: "#" },
    { label: "Digital Marketing", href: "#", current: true },
  ];

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.55),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black" />

      {/* Content */}
      <div className="relative z-10 section-container pt-32 md:pt-40 pb-32 text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Breadcrumbs */}
       
          {/* Main Heading */}
          <div className="max-w-4xl">
            <h1 className="section-heading text-white">
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Services
              </span>
              <span className="block font-medium mt-3 text-3xl md:text-5xl">
                Digital Excellence, Tailored Solutions
              </span>
            </h1>

            <p className="max-w-3xl mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              We deliver comprehensive digital solutions that drive growth, 
              enhance engagement, and transform your brand's online presence 
              through innovative strategies and creative execution.
            </p>
               <div className="mb-8 md:mb-10">
            <nav className="flex items-center gap-2 md:gap-3" aria-label="Breadcrumb">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
                  )}
                  <Link
                    to={item.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      item.current
                        ? "bg-white/15 backdrop-blur border border-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5" />}
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          </div>

          {/* Services Grid */}
   

          {/* CTA Section */}
  
        </motion.div>
      </div>
    </section>
  );
}