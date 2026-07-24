// About.jsx
import React from "react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { Home, Target, Eye, Users, Sparkles, Zap, Heart, TrendingUp, Brain, Palette, Rocket, Globe, Cpu, Users as UsersIcon, Lightbulb, ChevronRight, Code, Monitor, Smartphone, BarChart3, Video, Bot } from "lucide-react";
import Testimonials from "../components/Testimonials";
import DOMPurify from 'dompurify'; 
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return imagePath;
};

const extractTextFromHTML = (html) => {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const About = () => {
  const aboutBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "About", href: "/about", current: true },
  ];

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
        subtitle={heroData?.sub_title || "Innovating Tomorrow's Technology Today"}
        description={heroData?.content ? extractTextFromHTML(heroData.content) : "We are a full-service technology agency delivering cutting-edge digital solutions across web development, AI, mobile apps, and digital marketing."}
        breadcrumbs={aboutBreadcrumbs}
        backgroundImage={getImageUrl(heroData?.image) || "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34"
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Who We Are Section */}
        <section className="mb-20">
          <motion.div
            {...fadeUp(0.1)}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
              <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Who We Are
              </span>
            </div>
            
            <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-6">
              Your Trusted Technology Partner
            </h2>
            <div 
              className="text-[15px] text-neutral-600 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(whoWeAreData?.content || 
                  "<p>We are a forward-thinking technology company dedicated to transforming businesses through innovative digital solutions. With expertise spanning web development, AI automation, mobile applications, and digital marketing, we help organizations harness the power of technology to achieve their goals and stay ahead in a rapidly evolving digital landscape.</p>") 
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
  {...fadeUp(0.15)}
  className="relative"
>
  <div className="relative overflow-hidden  border border-neutral-200 dark:border-white/10  group">
    <img
      src={
        getImageUrl(whoWeAreData?.image) ||
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
      }
      alt="Professional software development team collaborating on AI and digital solutions"
      className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      decoding="async"
    />

    {/* Dark Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

    {/* Floating Experience Card */}
    <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-4 text-white shadow-2xl">
      <p className="text-3xl font-bold">7+</p>
      <p className="text-sm text-white/80">
        Years of Delivering Technology Excellence
      </p>
    </div>

    {/* Top Badge */}
    <div className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white">
        Web • AI • Mobile • Marketing
      </span>
    </div>
  </div>
</motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="space-y-5"
            >
              {/* Web Development */}
              <div className="group relative border border-neutral-200 bg-white p-6 transition-colors duration-500 hover:border-[#F13A34]/40">
                <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-neutral-400" />
                <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-neutral-400" />
                <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-neutral-400" />
                <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-neutral-400" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                    <Code className="h-5 w-10 text-[#F13A34]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                      Web Development
                    </h3>
                    <p className="mt-2 text-[15px] text-neutral-600">
                      Custom websites and web applications built with modern frameworks, ensuring speed and scalability.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI & Automation */}
              <div className="group relative border border-neutral-200 bg-white p-6 transition-colors duration-500 hover:border-[#F13A34]/40">
                <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-neutral-400" />
                <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-neutral-400" />
                <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-neutral-400" />
                <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-neutral-400" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                    <Bot className="h-5 w-10 text-[#F13A34]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                      AI Solutions & Automation
                    </h3>
                    <p className="mt-2 text-[15px] text-neutral-600">
                      Intelligent automation and AI-powered solutions that drive business efficiency.
                    </p>
                  </div>
                </div>
              </div>
               <div className="group relative border border-neutral-200 bg-white p-6 transition-colors duration-500 hover:border-[#F13A34]/40">
                <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-neutral-400" />
                <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-neutral-400" />
                <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-neutral-400" />
                <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-neutral-400" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                    <Smartphone className="h-5 w-10 text-[#F13A34]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                      Mobile App Development
                    </h3>
                    <p className="mt-2 text-[15px] text-neutral-600">
                      Native and cross-platform mobile applications designed to deliver exceptional performance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Mission */}
            <motion.div
              {...fadeUp(0.1)}
              className="relative border border-neutral-200 bg-white p-8  transition-colors duration-500 hover:border-[#F13A34]/40"
            >
              <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-400" />
              <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-400" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-400" />
              <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-400" />

              <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                  MISSION
                </span>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10">
                    <Target className="h-5 w-5 text-[#F13A34]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F13A34]">
                      Our Mission
                    </h4>
                    <p className="text-[12px] text-neutral-500 mt-0.5">
                      {cardsData?.[0]?.title || "Empowering Businesses Through Technology"}
                    </p>
                  </div>
                </div>
                
                <h3 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
                  {missionData?.title || "Driving Digital Transformation Through Innovative Technology Solutions"}
                </h3>
                <div 
                  className="text-[15px] text-neutral-600 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(missionData?.content || cardsData?.[0]?.content || 
                      "<p>Our mission is to democratize advanced technology by making it accessible and actionable for businesses of all sizes. We bridge the gap between complex technical capabilities and practical business applications, delivering solutions that drive measurable growth, operational efficiency, and competitive advantage in the digital economy.</p>") 
                  }}
                />

                {cardsData?.[0]?.image && (
                  <div className="mb-6">
                    <img
                      src={getImageUrl(cardsData[0].image)}
                      alt={cardsData[0].title}
                      className="w-full h-48 object-cover border border-neutral-200"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative border border-neutral-200 bg-neutral-50 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-neutral-400" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-neutral-400" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-neutral-400" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-neutral-400" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <UsersIcon className="h-4 w-4 text-[#F13A34]" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">Client-First</span>
                    </div>
                    <p className="text-[12px] text-neutral-600">Your success is our priority</p>
                  </div>
                  <div className="relative border border-neutral-200 bg-neutral-50 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-neutral-400" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-neutral-400" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-neutral-400" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-neutral-400" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp className="h-4 w-4 text-[#F13A34]" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">Innovation-Driven</span>
                    </div>
                    <p className="text-[12px] text-neutral-600">Cutting-edge solutions</p>
                  </div>
                  <div className="relative border border-neutral-200 bg-neutral-50 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-neutral-400" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-neutral-400" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-neutral-400" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-neutral-400" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <Rocket className="h-4 w-4 text-[#F13A34]" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">Results-Focused</span>
                    </div>
                    <p className="text-[12px] text-neutral-600">Measurable outcomes</p>
                  </div>
                  <div className="relative border border-neutral-200 bg-neutral-50 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-neutral-400" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-neutral-400" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-neutral-400" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-neutral-400" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <Globe className="h-4 w-4 text-[#F13A34]" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">Global Reach</span>
                    </div>
                    <p className="text-[12px] text-neutral-600">Serving worldwide clients</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative border border-neutral-800 bg-neutral-900 p-8 transition-colors duration-500 hover:border-[#F13A34]/40"
            >
              <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-700" />
              <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-700" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-700" />
              <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-700" />

              <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-700 bg-neutral-800 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">
                  VISION
                </span>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Our Vision
                    </h4>
                    <p className="text-[12px] text-white/40 mt-0.5">Leading the Digital Revolution</p>
                  </div>
                </div>
                
                <h3 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-white mb-4">
                  {visionData?.title || "Redefining What's Possible with Technology"}
                </h3>
                <p className="text-[15px] text-white/60 leading-relaxed mb-6">
                  {visionData?.description || visionData?.content || "We envision a future where technology seamlessly integrates into every aspect of business and life, creating unprecedented opportunities for innovation and growth. Our goal is to be at the forefront of this transformation, pioneering solutions that set new standards for digital excellence and make advanced technology accessible to all."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative border border-white/15 bg-white/5 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-white/15" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-white/15" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-white/15" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-white/15" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <Cpu className="h-4 w-4 text-white/80" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">AI Leadership</span>
                    </div>
                    <p className="text-[12px] text-white/40">Pioneering intelligence</p>
                  </div>
                  <div className="relative border border-white/15 bg-white/5 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-white/15" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-white/15" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-white/15" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-white/15" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <Monitor className="h-4 w-4 text-white/80" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">Digital Innovation</span>
                    </div>
                    <p className="text-[12px] text-white/40">Transforming industries</p>
                  </div>
                  <div className="relative border border-white/15 bg-white/5 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-white/15" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-white/15" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-white/15" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-white/15" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <Users className="h-4 w-4 text-white/80" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">User-Centric</span>
                    </div>
                    <p className="text-[12px] text-white/40">Human-centered design</p>
                  </div>
                  <div className="relative border border-white/15 bg-white/5 p-4">
                    <div className="absolute -top-px -left-px h-2 w-2 border-l border-t border-white/15" />
                    <div className="absolute -top-px -right-px h-2 w-2 border-r border-t border-white/15" />
                    <div className="absolute -bottom-px -left-px h-2 w-2 border-l border-b border-white/15" />
                    <div className="absolute -bottom-px -right-px h-2 w-2 border-r border-b border-white/15" />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <BarChart3 className="h-4 w-4 text-white/80" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">Data-Driven</span>
                    </div>
                    <p className="text-[12px] text-white/40">Insight-led decisions</p>
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
            className="relative border border-neutral-200 bg-white p-8 md:p-12 transition-colors duration-500 hover:border-[#F13A34]/40"
          >
            <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-neutral-400" />
            <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-neutral-400" />
            <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-neutral-400" />
            <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-neutral-400" />

            <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                STATS
              </span>
            </div>

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
                  Building Technology That Drives Results
                </h3>
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-4">
                  We partner with ambitious organizations to create technology solutions that are not only cutting-edge but also strategically aligned with business objectives. Our approach combines technical excellence with deep industry understanding to deliver measurable outcomes.
                </p>
                <p className="text-[15px] text-neutral-600 leading-relaxed">
                  From initial concept to deployment and beyond, we ensure every solution we build is secure, scalable, and designed to grow with your business. Our team brings together expertise in AI, web development, mobile applications, and digital marketing to create comprehensive digital ecosystems.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F13A34] mb-4">
                  Why Choose Us
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#F13A34] flex-shrink-0" />
                    Full-cycle development from strategy to deployment
                  </li>
                  <li className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#F13A34] flex-shrink-0" />
                    AI-powered solutions for business automation
                  </li>
                  <li className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#F13A34] flex-shrink-0" />
                    Multi-platform expertise across web and mobile
                  </li>
                  <li className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#F13A34] flex-shrink-0" />
                    Integrated marketing and SEO strategies
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        {/* <section className="mb-20">
          <Testimonials />
        </section> */}

        {/* CTA Section */}
        <section>
          <motion.div
            {...fadeUp(0.1)}
            className="relative border border-[#F13A34]/30 bg-white p-8 md:p-12 text-center transition-colors duration-500 hover:border-[#F13A34]/60"
          >
            <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-[#F13A34]/30" />
            <div className="absolute -top-px -right-px h-4 w-4 border-r border-t border-[#F13A34]/30" />
            <div className="absolute -bottom-px -left-px h-4 w-4 border-l border-b border-[#F13A34]/30" />
            <div className="absolute -bottom-px -right-px h-4 w-4 border-r border-b border-[#F13A34]/30" />

            <div className="absolute -top-px left-1/2 -translate-x-1/2 flex items-center gap-2 border-b border-x border-[#F13A34]/30 bg-white px-6 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#F13A34]">
                GET STARTED
              </span>
            </div>

            <div className="pt-6">
              <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
                {readyToBuildData?.title || "Ready to Transform Your Digital Future?"}
              </h2>
              <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mb-8">
                {readyToBuildData?.description || readyToBuildData?.content || "Let's discuss how our technology solutions can help you achieve your business goals. From custom web applications and AI automation to mobile apps and digital marketing, we have the expertise to bring your vision to life."}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  Start Your Project
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;