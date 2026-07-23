import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import GlobalHero from "../utils/GlobalHero";

const Contact = () => {
  const heroData = null;
  const infoData = null;
  const contactMutation = { isPending: false };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const contactBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Contact", href: "/contact", current: true },
  ];

  // Contact info cards data
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: infoData?.phone || "+1 (234) 567-890",
      href: infoData?.phone ? `tel:${infoData.phone.replace(/\s/g, "")}` : "tel:+1234567890",
      helper: infoData?.phone_helper || "Mon–Fri, 9:00–18:00",
    },
    {
      icon: Mail,
      label: "Email",
      value: infoData?.email || "hello@yourstudio.com",
      href: infoData?.email ? `mailto:${infoData.email}` : "mailto:hello@yourstudio.com",
      helper: infoData?.email_helper || "We reply within one business day",
    },
    {
      icon: MapPin,
      label: "Office Location",
      value: infoData?.address || "123 Business Street, City, Country",
      helper: infoData?.address_helper || "Available for in-person sessions by appointment",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: infoData?.working_hours || "Mon–Fri: 9:00–18:00",
      helper: infoData?.working_hours_helper || "Weekends by appointment",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero 
        title={heroData?.title || "Get In Touch"}
        subtitle={heroData?.subtitle || "Let's Talk Transform Together"}
        description={heroData?.content || "Have a project in mind? Let's discuss how we can bring your vision to life with innovative digital solutions."}
        breadcrumbs={contactBreadcrumbs}
        backgroundImage={heroData?.image ? heroData.image : "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34"
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {/* Contact Form - White Theme with Studio Monitor Elements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="relative border border-neutral-200 bg-white p-8 md:p-10  transition-colors duration-500 hover:border-[#F13A34]/40">
              {/* Corner brackets */}
              <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-400" />
              <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-400" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-400" />
              <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-400" />

              {/* Top tab */}
              <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                  FORM
                </span>
              </div>

              <div className="pt-4">
                <h2 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900">
                  Send us a message
                </h2>
                <p className="text-[15px] text-neutral-600 mt-2 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                        placeholder="Alex"
                      />
                    </div>

                    <div className="group">
                      <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                        Work email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div className="group">
                      <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                      Project details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400 resize-none"
                      placeholder="Share a brief overview of your project, timeline, and expectations..."
                    />
                  </div>

                  {/* Submit Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-emerald-300 bg-emerald-50 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-800">
                          Message sent successfully!
                        </p>
                        <p className="text-xs text-emerald-600 mt-1">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-red-300 bg-red-50 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Something went wrong
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          Please try again or contact us directly.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="group relative w-full bg-[#F13A34] text-white px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {contactMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-xs text-neutral-400 text-center pt-4 border-t border-neutral-200">
                    By submitting this form, you agree to our privacy policy and consent to being contacted.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards - White Theme with Studio Monitor Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group relative border border-neutral-200 bg-white p-6 transition-colors duration-500 hover:border-[#F13A34]/40"
              >
                <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-neutral-400" />
                <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-neutral-400" />
                <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-neutral-400" />
                <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-neutral-400" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                    <item.icon className="h-5 w-5 text-[#F13A34]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                      {item.label}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block font-mono text-[15px] font-medium text-neutral-900 transition-colors duration-300 hover:text-[#F13A34] truncate"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] font-medium text-neutral-900">
                        {item.value}
                      </p>
                    )}
                    <p className="mt-1.5 text-[12px] text-neutral-500">
                      {item.helper}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div className="group relative border border-neutral-200 bg-white p-6 shadow-sm transition-colors duration-500 hover:border-[#F13A34]/40">
              <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-neutral-400" />
              <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-neutral-400" />
              <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-neutral-400" />
              <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-neutral-400" />

              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                Start a Project
              </h4>
              <p className="mt-2 text-[14px] text-neutral-600">
                Let's build something amazing together.
              </p>
              <Link
                to="/contact"
                className="group/btn mt-4 inline-flex items-center gap-2 bg-[#F13A34] px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
              >
                Get Started
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Map Section - White Theme with Studio Monitor Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative border border-neutral-200 bg-white p-8 shadow-sm transition-colors duration-500 hover:border-[#F13A34]/40">
            {/* Corner brackets */}
            <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-300" />
            <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-300" />
            <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-300" />
            <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-300" />

            {/* Top tab */}
            <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                LOCATION
              </span>
            </div>

            <div className="pt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900">
                    Visit Our Office
                  </h2>
                  <p className="text-[15px] text-neutral-600 mt-1">
                    Come see us in person or explore our location virtually
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white bg-[#F13A34] transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
                  >
                    <MapPin className="w-4 h-4" />
                    Get directions
                  </a>
                </div>
              </div>
              
              <div className="overflow-hidden border border-neutral-200 h-80 md:h-96">
                {infoData?.map_url ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: infoData.map_url }}
                    className="w-full h-full"
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6307385842567!2d-74.00597!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a31008ccd97%3A0x8e9a2a2f8f8a8c8d!2s123%20Business%20St!5e0!3m2!1sen!2sus!4v1234567890"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;