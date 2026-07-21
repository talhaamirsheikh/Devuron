import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

/* =========================
   Global Reusable Hero Component with Integrated Navbar
========================= */
export default function GlobalHero({ 
  title = "Our Services",
  subtitle = "Digital Excellence, Tailored Solutions",
  description = "We deliver comprehensive digital solutions that drive growth, enhance engagement, and transform your brand's online presence through innovative strategies and creative execution.",
  breadcrumbs = [
    { label: "Home", icon: Home, href: "#" },
    { label: "Services", href: "#" },
    { label: "Digital Marketing", href: "#", current: true },
  ],
  backgroundImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  centered = false,
  titleColors = { first: "white", second: "#f13a34" }
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
    ],
    []
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,58,52,0.55),_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black" />

      {/* Navbar - Inside Hero Section */}
      <nav className="relative z-50 bg-transparent">
        <div className="section-container py-5 flex items-center justify-between">
          {/* Desktop Navigation - Vertical on right */}
          <div className="hidden md:flex w-full items-center justify-between">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
                alt="Logo"
                className="h-14 md:h-16 object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            {/* Vertical nav for all pages */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col text-right space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-[13px] md:text-[14px] font-medium tracking-[0.15em] uppercase transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex w-full items-center justify-between">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
                alt="Logo"
                className="h-10 object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-white p-2 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <nav className="section-container flex flex-col space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-3 text-sm font-medium tracking-[0.15em] uppercase rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Content - Inside Hero Section */}
      <div className={`relative z-10 h-full flex items-center ${centered ? 'justify-center' : 'justify-start'} section-container pb-20 text-white`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`max-w-6xl w-full ${centered ? 'text-center' : 'text-left'}`}
          >
            {/* Main Heading with Custom Colors */}
            <div className={`max-w-4xl ${centered ? 'mx-auto' : ''}`}>
              <h1 className="section-heading text-white">
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {title}
                </span>
                <span className="block font-medium mt-3 text-3xl md:text-5xl">
                  {subtitle.split(' ').map((word, index, array) => (
                    <span
                      key={index}
                      style={{
                        color: index === 1 ? titleColors.second : titleColors.first,
                      }}
                    >
                      {word}
                      {index < array.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              </h1>

              <p className={`max-w-3xl mt-6 text-lg md:text-xl text-white/80 leading-relaxed ${centered ? 'mx-auto' : ''}`}>
                {description}
              </p>
              
              {/* Breadcrumbs - Only show if breadcrumbs provided */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div className={`mt-8 md:mt-10 ${centered ? 'flex justify-center' : ''}`}>
                  <nav className="flex items-center gap-2 md:gap-3 flex-wrap" aria-label="Breadcrumb">
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
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }