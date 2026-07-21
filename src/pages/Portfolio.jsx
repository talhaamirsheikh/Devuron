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
  Calendar
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";

import { portfolioProjects } from "../constants/portfolio";
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

  // Portfolio breadcrumbs
  const portfolioBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Portfolio", href: "/portfolio", current: true },
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.25)] bg-[rgba(241,58,52,0.07)] px-4 py-2">
            <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
            <span className="section-eyebrow text-[var(--color-primary)]">
              Featured Projects
            </span>
          </div>
          
          <h2 className="section-heading text-neutral-900 mb-3">
            Case Studies & Client Success
          </h2>
          <p className="section-subtitle max-w-2xl text-neutral-600 mx-auto">
            Real results from real clients. See how we've helped businesses grow and achieve their goals through strategic work and creative excellence.
          </p>
        </motion.div>

        {/* Filter Tabs */}
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
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
                className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-[var(--color-primary)]"
              >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {project.category}
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
                    <div className="bg-[var(--color-primary)] text-white p-2.5 rounded-full shadow-lg">
                      <ChevronRight size={16} />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{project.duration}</span>
                    <span>•</span>
                    <span>{project.client}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 mb-16 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Track Record</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "200+", label: "Projects Completed", icon: Target },
              { number: "150+", label: "Happy Clients", icon: Users },
              { number: "50+", label: "Brands Yearly", icon: TrendingUp },
              { number: "10+", label: "Years Experience", icon: Calendar }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-primary)]/15 rounded-full mb-3">
                  <stat.icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">{stat.number}</div>
                <p className="text-neutral-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create something amazing together.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-[rgba(241,58,52,0.9)] hover:scale-105 transition-all duration-300"
          >
            Get in Touch
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      