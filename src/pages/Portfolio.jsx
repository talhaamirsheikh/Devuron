import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight,
  Sparkles,
  Home,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  ArrowRight
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import { portfolioProjects } from "../constants/portfolio";

// Reusable components
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">{label}</span>
  </div>
);

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    'All', 
    'Graphic Design & Video Editing', 
    'Website & Web Development', 
    'AI Solutions & Automation', 
    'Mobile App Development', 
    'SEO & Digital Marketing'
  ];

  const filteredProjects = activeFilter === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  const portfolioBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Portfolio", href: "/portfolio", current: true },
  ];

  const stats = [
    { number: "200+", label: "Projects Completed", icon: Target },
    { number: "150+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Brands Yearly", icon: TrendingUp },
    { number: "10+", label: "Years Experience", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title="Our Work"
        subtitle="Portfolio Creative Excellence"
        description="Explore our collection of successful projects and client case studies. Each project represents our commitment to delivering measurable results and exceptional creative quality."
        breadcrumbs={portfolioBreadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1460925895917-adf4e6f3b8c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34"
        }}
      />

      {/* Portfolio Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Featured Projects
            </span>
          </div>
          
          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
            Case Studies & Client Success
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Real results from real clients. See how we've helped businesses grow and achieve their goals through strategic work and creative excellence.
          </p>
        </motion.div>

        {/* Filter Tabs - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`group relative px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#F13A34] text-white'
                  : 'bg-transparent text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-[#F13A34]/40'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-white" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <Link
                to={`/portfolio/${project.id}`}
                className="block relative border border-neutral-200 bg-white transition-all duration-500 hover:border-[#F13A34]/40"
              >
                <CornerBrackets />
                
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === project.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge - Studio Monitor Style */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-3 py-1.5 border border-white/20">
                      <span className="h-1 w-1 rounded-full bg-[#F13A34]" />
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                        {project.category}
                      </span>
                    </span>
                  </div>
                  
                  {/* View Icon */}
                  <motion.div
                    className="absolute bottom-4 right-4"
                    animate={{
                      y: hoveredId === project.id ? 0 : 20,
                      opacity: hoveredId === project.id ? 1 : 0
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center bg-[#F13A34] text-white shadow-lg transition-all duration-300 group-hover:bg-white group-hover:text-[#F13A34]">
                      <Eye size={16} />
                    </div>
                  </motion.div>

                  {/* Hover Overlay Content */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0
                    }}
                  >
                    <div className="text-center text-white px-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                        View Project
                      </p>
                      <p className="text-sm font-medium">
                        Click to explore
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-mono text-[15px] font-semibold text-neutral-900 mb-2 group-hover:text-[#F13A34] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                    <span>{project.duration}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span>{project.client}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative border border-neutral-200 bg-white p-8 md:p-12 transition-colors duration-500 hover:border-[#F13A34]/40 mb-16"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label="STATS" />

          <div className="pt-4">
            <h2 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900 text-center mb-8">
              Our Track Record
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[#F13A34]/30 bg-[#F13A34]/10 mx-auto mb-3">
                    <stat.icon className="h-5 w-5 text-[#F13A34]" />
                  </div>
                  <div className="font-mono text-[clamp(1.8rem,2.5vw,3rem)] font-black text-neutral-900 mb-1">
                    {stat.number}
                  </div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative border border-[#F13A34]/30 bg-white p-8 md:p-12 text-center transition-colors duration-500 hover:border-[#F13A34]/60"
        >
          <CornerBrackets size="h-4 w-4" borderColor="border-[#F13A34]/30" />
          
          <div className="absolute -top-px left-1/2 -translate-x-1/2 flex items-center gap-2 border-b border-x border-[#F13A34]/30 bg-white px-6 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#F13A34]">GET STARTED</span>
          </div>

          <div className="pt-6">
            <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's discuss your goals and create something amazing together.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34]"
            >
              <span className="relative flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;