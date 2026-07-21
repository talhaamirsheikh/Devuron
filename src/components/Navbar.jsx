import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isHome = location.pathname === "/";
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

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

  // Determine navbar style based on page and theme
  const isLightBackground = !isHome && theme !== "dark";
  const textColor = isLightBackground ? "text-neutral-900" : "text-white";
  const textColorMuted = isLightBackground ? "text-neutral-600" : "text-white/80";
  const hoverColor = isLightBackground ? "hover:text-[#f13a34]" : "hover:text-white";
  const activeColor = isLightBackground ? "text-[#f13a34]" : "text-white";
  const mobileMenuBg = isLightBackground ? "bg-white border-neutral-200" : "bg-black/95 border-white/10";

  return (
    <header className={`${isHome ? "absolute" : "fixed"} top-0 left-0 w-full z-50 ${isLightBackground ? "bg-white border-neutral-200" : (isHome ? "" : "bg-[#0a0a0a] border-white/10")}`}>
      <div className="section-container py-5 flex items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex w-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
              alt="Logo"
              className={`object-contain ${isHome ? "h-14 md:h-16" : "h-10 md:h-12"}`}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Horizontal nav for non-home pages */}
          {!isHome ? (
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-[13px] md:text-[14px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                    isActive(link.href) ? activeColor : `${textColor} ${hoverColor}`
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button onClick={toggleTheme} className={`p-2 transition-colors ${textColor} hover:text-primary`} aria-label="Toggle Theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          ) : (
            /* Vertical nav for home page */
            <div className="flex items-center gap-6">
              <div className="flex flex-col text-right space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-[13px] md:text-[14px] font-medium tracking-[0.15em] uppercase transition-all duration-200 ${
                      isActive(link.href) ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center ml-4 border-l border-white/20 pl-6 h-full">
                <button onClick={toggleTheme} className="p-2 text-white/80 hover:text-white transition-colors" aria-label="Toggle Theme">
                  {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex w-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://vantage.itnextro.com/wp-content/uploads/2025/11/VP-png-1-1.png"
              alt="Logo"
              className={`object-contain ${isHome ? "h-10" : "h-8"}`}
              loading="eager"
              fetchPriority="high"
            />
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 transition-colors ${textColor}`} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`p-2 transition-colors ${textColor}`}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden ${mobileMenuBg} backdrop-blur-md border-t`}>
          <nav className="section-container flex flex-col space-y-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2.5 px-3 text-sm font-medium tracking-[0.15em] uppercase rounded-md transition-colors ${
                  isActive(link.href)
                    ? `${activeColor} ${isLightBackground ? "bg-red-50" : "bg-white/10"}`
                    : `${textColorMuted} ${hoverColor}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;