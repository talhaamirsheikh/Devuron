// About.jsx
import React from "react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { Home, Target, Eye, Users, Sparkles, Zap, Heart, TrendingUp, Brain, Palette, Rocket, Globe, Cpu, Users as UsersIcon, Lightbulb } from "lucide-react";
import Testimonials from "../components/Testimonials";
import DOMPurify from 'dompurify'; 
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

// Helper function to create full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return imagePath;
};

// Helper function to extract text from HTML for fallback descriptions
const extractTextFromHTML = (html) => {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const About = () => {
  // Custom breadcrumbs for about page
  const aboutBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "About", href: "/about", current: true },
  ];

  // Static Data
  const heroData = null;
  const whoWeAreData = null;
  const missionData = null;
  const visionData = null;
  const valuesData = null;
  const readyToBuildData = null;
  const cardsData = null;

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero 
        title={heroData?.title || "About Us"}
        subtitle={heroData?.sub_title || "Who We Are Our Mission"}
        description={heroData?.content ? extractTextFromHTML(heroData.content) : "Innovating the future with cutting-edge digital solutions and creative excellence."}
        breadcrumbs={aboutBreadcrumbs}
        backgroundImage={getImageUrl(heroData?.image) || "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34"
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Who We Are Section */}
        <section className="mb-20">
          <motion.div
            {...fadeUp(0.1)}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f13a34]/10 border border-[#f13a34]/20 mb-6">
              <span className="text-sm font-semibold text-[#f13a34] uppercase tracking-widest">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {whoWeAreData?.title || "We Build Brands That Stand Out"}
            </h2>
            <div 
              className="text-xl text-neutral-600 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(whoWeAreData?.content || 
                  "<p>At our creative agency, we believe in the power of ideas. We combine strategy, design, and technology to create digital experiences that transform businesses and connect with people.</p>") 
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeUp(0.15)}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getImageUrl(whoWeAreData?.image) || "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                  alt="Team collaborating in a modern workspace"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="space-y-8"
            >
              {/* Creative Strategy */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-[#f13a34]/40 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#f13a34]/10 to-[#f13a34]/5 border border-[#f13a34]/20 group-hover:from-[#f13a34]/20 group-hover:to-[#f13a34]/10 transition-all duration-300">
                    <Brain className="w-6 h-6 text-[#f13a34]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Creative Strategy</h3>
                    <p className="text-neutral-600">
                      Unique approaches to solve complex problems. We craft tailored strategies that deliver exceptional results.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pixel Perfection */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-[#f13a34]/40 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#f13a34]/10 to-[#f13a34]/5 border border-[#f13a34]/20 group-hover:from-[#f13a34]/20 group-hover:to-[#f13a34]/10 transition-all duration-300">
                    <Palette className="w-6 h-6 text-[#f13a34]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Pixel Perfection</h3>
                    <p className="text-neutral-600">
                      Attention to detail in every design we craft. We believe excellence lies in the details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              {/* <div className="bg-gradient-to-r from-[#f13a34]/5 to-white rounded-xl p-6 border border-[#f13a34]/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#f13a34] text-white">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Ready to Start Your Journey?</h3>
                    <p className="text-neutral-600 mb-4">
                      Let's create something amazing together. Our team is ready to help you stand out.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-[#f13a34] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#d32f2f] transition-colors duration-300"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Mission */}
            <motion.div
              {...fadeUp(0.1)}
              className="bg-gradient-to-br from-[#f13a34]/5 to-white rounded-2xl p-8 border border-[#f13a34]/20 relative overflow-hidden"
            >
              {/* Abstract Art Background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#f13a34]/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#f13a34]/5 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[#f13a34] text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f13a34]/10 border border-[#f13a34]/20">
                      <span className="text-xs font-semibold text-[#f13a34] uppercase tracking-widest">
                        Our Mission
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {cardsData?.[0]?.title || "Empowering Growth Through Innovation"}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  {missionData?.title || "Empowering Growth Through Value"}
                </h3>
                <div 
                  className="text-neutral-600 leading-relaxed mb-6 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(missionData?.content || cardsData?.[0]?.content || 
                      "<p>We exist to bridge the gap between imagination and reality. Our mission is to provide businesses with cutting-edge digital solutions that not only solve complex problems but also unlock new opportunities for growth and connection in an ever-evolving digital landscape.</p>") 
                  }}
                />

                {/* Mission Card Image */}
                {cardsData?.[0]?.image && (
                  <div className="mb-6">
                    <img
                      src={getImageUrl(cardsData[0].image)}
                      alt={cardsData[0].title}
                      className="w-full h-48 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <UsersIcon className="w-4 h-4 text-[#f13a34]" />
                      <span className="text-sm font-medium text-neutral-900">Client-Centric Approach</span>
                    </div>
                    <p className="text-xs text-neutral-600">Your success is our priority</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#f13a34]" />
                      <span className="text-sm font-medium text-neutral-900">Data-Driven Strategies</span>
                    </div>
                    <p className="text-xs text-neutral-600">Informed decisions, better results</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#f13a34]" />
                      <span className="text-sm font-medium text-neutral-900">Creative Excellence</span>
                    </div>
                    <p className="text-xs text-neutral-600">Uncompromising quality in every project</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#f13a34]" />
                      <span className="text-sm font-medium text-neutral-900">Sustainable Growth</span>
                    </div>
                    <p className="text-xs text-neutral-600">Long-term success strategies</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              {...fadeUp(0.15)}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700 relative overflow-hidden"
            >
              {/* Abstract Art Background */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-x-24 -translate-y-24"></div>
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-white/3 to-transparent rounded-full translate-x-20 translate-y-20"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white text-neutral-900">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">
                        Our Vision
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">Shaping the Future of Digital Experiences</p>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {visionData?.title || "Shaping the Future of Digital Experiences"}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  {visionData?.description || visionData?.content || "We envision a world where technology seamlessly enhances human potential. Our goal is to be the global standard-bearer for digital creativity and engineering, setting benchmarks that inspire the industry and redefine what is possible for brands worldwide."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Global Impact</span>
                    </div>
                    <p className="text-xs text-white/70">Reaching audiences worldwide</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Technological Leadership</span>
                    </div>
                    <p className="text-xs text-white/70">Pioneering digital innovation</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Inclusive Design</span>
                    </div>
                    <p className="text-xs text-white/70">Accessibility for everyone</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Future-Ready Solutions</span>
                    </div>
                    <p className="text-xs text-white/70">Prepared for tomorrow's challenges</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <motion.div
            {...fadeUp(0.05)}
            className="bg-gradient-to-r from-white to-neutral-50 rounded-2xl p-8 md:p-12 border border-neutral-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  Building brands with clarity & purpose
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We partner with ambitious brands to create digital experiences that
                  are not only visually compelling, but strategically sound. Every
                  decision we make is grounded in insight, intention, and long-term
                  growth.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  From positioning and messaging to execution across platforms, we help
                  brands show up consistently and confidently wherever their audience
                  is paying attention.
                </p>
              </div>

              {/* Right Content */}
              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-3">
                  What sets us apart
                </h4>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#f13a34]" />
                    Strategy-first approach, not trend-chasing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#f13a34]" />
                    Senior-level thinking with hands-on execution
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#f13a34]" />
                    Clear communication and measurable outcomes
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#f13a34]" />
                    Long-term partnerships over one-off projects
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <Testimonials />
        </section>

        {/* CTA Section */}
        <section>
          <motion.div
            {...fadeUp(0.1)}
            className="bg-gradient-to-r from-[#f13a34]/10 to-transparent rounded-2xl p-8 md:p-12 text-center border border-[#f13a34]/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {readyToBuildData?.title || "Ready to build something extraordinary?"}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              {readyToBuildData?.description || readyToBuildData?.content || "Let's combine strategy, creativity, and technology to transform your brand and create digital experiences that truly connect with people."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#f13a34] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#d32f2f] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;