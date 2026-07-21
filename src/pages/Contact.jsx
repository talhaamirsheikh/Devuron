import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
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
      // Mock submit
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

  // Custom breadcrumbs for contact page
  const contactBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Contact", href: "/contact", current: true },
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
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-1 space-y-6"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              How to Reach Us
            </h2>
            
            {[
              {
                icon: Phone,
                label: "Phone",
                value: infoData?.phone || "+1 (234) 567-890",
                href: infoData?.phone ? `tel:${infoData.phone.replace(/\s/g, '')}` : "tel:+1234567890",
                helper: infoData?.phone_helper || "Mon–Fri, 9:00–18:00",
                bgColor: "bg-gradient-to-br from-[#f13a34]/5 to-transparent",
                borderColor: "border-[#f13a34]/20",
                hoverEffect: "hover:border-[#f13a34]/40 hover:shadow-lg hover:shadow-[#f13a34]/10"
              },
              {
                icon: Mail,
                label: "Email",
                value: infoData?.email || "hello@yourstudio.com",
                href: infoData?.email ? `mailto:${infoData.email}` : "mailto:hello@yourstudio.com",
                helper: infoData?.email_helper || "We reply within one business day",
                bgColor: "bg-gradient-to-br from-[#f13a34]/5 to-transparent",
                borderColor: "border-[#f13a34]/20",
                hoverEffect: "hover:border-[#f13a34]/40 hover:shadow-lg hover:shadow-[#f13a34]/10"
              },
              {
                icon: MapPin,
                label: "Office Location",
                value: infoData?.address || "123 Business Street, City, Country",
                helper: infoData?.address_helper || "Available for in-person sessions by appointment",
                bgColor: "bg-gradient-to-br from-[#f13a34]/5 to-transparent",
                borderColor: "border-[#f13a34]/20",
                hoverEffect: "hover:border-[#f13a34]/40 hover:shadow-lg hover:shadow-[#f13a34]/10"
              },
              {
                icon: Clock,
                label: "Working Hours",
                value: infoData?.working_hours || "Mon–Fri: 9:00–18:00",
                helper: infoData?.working_hours_helper || "Weekends by appointment",
                bgColor: "bg-gradient-to-br from-[#f13a34]/5 to-transparent",
                borderColor: "border-[#f13a34]/20",
                hoverEffect: "hover:border-[#f13a34]/40 hover:shadow-lg hover:shadow-[#f13a34]/10"
              },
            ].map(({ icon: Icon, label, value, href, helper, bgColor, borderColor, hoverEffect }) => (
              <div
                key={label}
                className={`group relative ${bgColor} rounded-2xl p-6 border ${borderColor} transition-all duration-500 ${hoverEffect}`}
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f13a34]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#f13a34]/10 to-[#f13a34]/5 border border-[#f13a34]/20 group-hover:from-[#f13a34]/20 group-hover:to-[#f13a34]/10 transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#f13a34]" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-[0.18em]">
                      {label}
                    </h3>
                  </div>
                  
                  {href ? (
                    <a
                      href={href}
                      className="block text-sm font-medium text-neutral-900 hover:text-[#f13a34] transition-colors duration-300 group-hover:scale-[1.02] transform"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-neutral-900 group-hover:text-[#f13a34] transition-colors duration-300">
                      {value}
                    </p>
                  )}
                  
                  {helper && (
                    <p className="mt-2 text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors duration-300">
                      {helper}
                    </p>
                  )}
                </div>
                
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#f13a34]/10 transition-all duration-500"></div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-xl">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Send us a message
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 mb-2 group-hover:text-[#f13a34] transition-colors duration-300">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all duration-300 hover:border-neutral-400"
                      placeholder="Alex"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 mb-2 group-hover:text-[#f13a34] transition-colors duration-300">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all duration-300 hover:border-neutral-400"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 mb-2 group-hover:text-[#f13a34] transition-colors duration-300">
                      Work email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all duration-300 hover:border-neutral-400"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 mb-2 group-hover:text-[#f13a34] transition-colors duration-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all duration-300 hover:border-neutral-400"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 mb-2 group-hover:text-[#f13a34] transition-colors duration-300">
                    Project details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#f13a34]/30 focus:border-[#f13a34] transition-all duration-300 hover:border-neutral-400 resize-none"
                    placeholder="Share a brief overview of your project, timeline, and expectations..."
                  ></textarea>
                </div>

                {/* Submit Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center gap-3"
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
                    className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 flex items-center gap-3"
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
                  className="group relative w-full bg-gradient-to-r from-[#f13a34] via-[#d32f2f] to-[#f13a34] text-white px-8 py-4 rounded-xl text-sm font-medium hover:shadow-xl hover:shadow-[#f13a34]/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#f13a34]/20 via-transparent to-[#f13a34]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </button>

                <p className="text-xs text-neutral-500 text-center pt-4 border-t border-neutral-100">
                  By submitting this form, you agree to our privacy policy and consent to being contacted.
                  We respect your privacy and never share your information.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 border border-neutral-200 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Visit Our Office
                </h2>
                <p className="text-neutral-600">
                  Come see us in person or explore our location virtually
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#f13a34] hover:text-white bg-white border border-[#f13a34]/30 hover:bg-[#f13a34] rounded-full transition-all duration-300 hover:scale-105 group"
                >
                  <MapPin className="w-4 h-4" />
                  Get directions
                </a>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-neutral-200 h-80 md:h-96">
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
                ></iframe>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;