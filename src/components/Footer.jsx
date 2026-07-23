import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants/services";
import logo from "../assets/logo.png";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
];

const COMPANY_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact Us", to: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#08080a] text-white px-6 md:px-20 pt-20 pb-8 rounded-t-[48px] mt-20 overflow-hidden">
      {/* Ambient accent glow + grain, matching the rest of the site's dark surfaces */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-1 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #F13A34, #FF7A45, #FFB020, transparent)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute -top-24 left-1/4 w-[36vw] h-[36vw] max-w-[480px] max-h-[480px] rounded-full opacity-[0.10] blur-[110px]"
          style={{ background: "radial-gradient(circle, #F13A34, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-24 w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: "radial-gradient(circle, #FFB020, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CTA Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-14 border-b border-white/10">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-white/50">
              Let&apos;s work together
            </span>
            <h3 className="mt-3 text-xl md:text-[30px]  font-black  leading-[1.05] tracking-tight">
              Have a project or an agent
              <br className="hidden md:block" /> worth building?
            </h3>
          </div>

          {/* Button - Updated to match Hero.jsx style */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 bg-[#F13A34] px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#F13A34] hover-border-1 border-[1px] border-[#F13A34] "
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12 py-14">
          {/* Logo + blurb + socials */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img
                src={logo}
                alt="Footer Logo"
                className="h-14 object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-white leading-relaxed max-w-xs">
              An IT partner building automation, AI agents, and digital
              products that hold up in production — not just in demos.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-[#F13A34] transition-all duration-300 hover:scale-105"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/80">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {COMPANY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link 
                    to={to} 
                    className="hover:text-[#F13A34] transition-all duration-300 text-white hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/80">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-[#F13A34] transition-all duration-300 text-white hover:translate-x-1 inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/80">
              Stay in the loop
            </h4>
            <p className="text-sm text-white mb-4 max-w-xs">
              Occasional notes on what we&apos;re shipping. No noise.
            </p>
            {subscribed ? (
              <p className="text-sm text-[#F13A34] font-medium">
                You&apos;re on the list — thank you.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full min-w-0 bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#F13A34] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-[#F13A34] text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact strip */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-6 py-8 border-t border-white/10 text-sm text-white/70">
          <a href="mailto:info@hashtaginterior.com" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-1 group">
            <Mail size={18} className="text-[#F13A34] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-white">info@hashtaginterior.com</span>
          </a>

          <a href="tel:+971483580444" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-1 group">
            <Phone size={18} className="text-[#F13A34] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-white">+971 48358044</span>
          </a>

          <div className="flex items-start gap-3 max-w-md hover:text-white transition-all duration-300 group">
            <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#F13A34] transition-transform duration-300 group-hover:scale-110" />
            <span>Suite 506, The Binary by Omniyat, Business Bay, Dubai, UAE</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-4">
          <span>© {new Date().getFullYear()} All rights reserved</span>

          <div className="flex flex-wrap items-center gap-3">
            <span className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-0.5">Terms &amp; Conditions</span>
            <span>|</span>
            <span className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-0.5">Privacy Policy</span>
            <span>|</span>
            <Link 
              to="/contact" 
              className="hover:text-[#F13A34] transition-all duration-300 hover:translate-x-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}