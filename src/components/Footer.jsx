import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants/services";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-20 pt-16 pb-8 rounded-t-[48px] mt-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li><Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-primary)] transition-colors">About us</Link></li>
            <li><Link to="/services" className="hover:text-[var(--color-primary)] transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-[var(--color-primary)] transition-colors">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center md:justify-center w-full md:w-auto">
          <Link to="/" className="block">
            <img
              src={logo}
              alt="Footer Logo"
              className="h-32 md:h-40 object-contain opacity-100 transition"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Services
          </h4>
          <ul className="space-y-3 text-white text-sm max-w-xs">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/services/${service.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto border-t border-white/10 my-10" />

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-white text-sm">
        <div className="flex items-center gap-3">
          <Mail size={18} />
          <span>info@hashtaginterior.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} />
          <span>+971 48358044</span>
        </div>

        <div className="flex items-start gap-3 max-w-md">
          <MapPin size={18} className="mt-0.5 flex-shrink-0" />
          <span>
            Suite 506, The Binary by Omniyat, Business Bay, Dubai, UAE
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs text-white gap-4">
        <span>© 2025 All rights reserved</span>

        <div className="flex flex-wrap gap-3">
          <span>Terms &amp; Conditions</span>
          <span>|</span>
          <span>Privacy Policy</span>
          <span>|</span>
          <Link to="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
