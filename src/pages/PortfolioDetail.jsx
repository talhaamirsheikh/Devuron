import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";

import { portfolioProjects } from "../constants/portfolio";

const PortfolioDetail = () => {
  const { id } = useParams();
  const project = portfolioProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-[var(--color-primary)] mb-4 text-2xl font-semibold">Project Not Found</div>
          <p className="text-neutral-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[rgba(241,58,52,0.8)] font-medium transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = portfolioProjects.findIndex(p => p.id === parseInt(id));
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const prevProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero with Navbar */}
      <GlobalHero 
        title={project.title}
        subtitle={project.category}
        description={project.fullDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title, href: "#", current: true },
        ]}
        backgroundImage={project.image}
        centered={true}
        titleColors={{ first: "white", second: "#f13a34" }}
      />

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 section-container">
        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-full border border-neutral-200">
            <Clock size={16} className="text-[var(--color-primary)]" />
            <div>
              <div className="text-xs text-neutral-500">Duration</div>
              <div className="font-medium text-neutral-900">{project.duration}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-full border border-neutral-200">
            <Users size={16} className="text-[var(--color-primary)]" />
            <div>
              <div className="text-xs text-neutral-500">Client</div>
              <div className="font-medium text-neutral-900">{project.client}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-full border border-neutral-200">
            <TrendingUp size={16} className="text-[var(--color-primary)]" />
            <div>
              <div className="text-xs text-neutral-500">Impact</div>
              <div className="font-medium text-neutral-900">{project.impact}</div>
            </div>
          </div>
        </motion.div>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200"
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">The Challenge</h3>
            <p className="text-neutral-600 leading-relaxed">{project.challenge}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[rgba(241,58,52,0.07)] p-8 rounded-2xl border border-[rgba(241,58,52,0.25)]"
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Our Solution</h3>
            <p className="text-neutral-600 leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>

        {/* Results Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-primary)]">
              <Sparkles className="text-white" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Key Results</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {project.results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 bg-neutral-50 p-6 rounded-xl border border-neutral-200 hover:border-[rgba(241,58,52,0.25)] transition-colors"
              >
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">{idx + 1}</span>
                </div>
                <p className="text-neutral-700 leading-relaxed">{result}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-8">What We Delivered</h3>
          <div className="flex flex-wrap gap-3">
            {project.highlights.map((item, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="inline-flex items-center gap-2 bg-[rgba(241,58,52,0.10)] text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium border border-[rgba(241,58,52,0.25)]"
              >
                <Sparkles size={14} />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-8">Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.gallery.map((image, idx) => (
                <div key={idx} className="relative h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={image}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Navigation & CTA */}
        <div className="space-y-8 border-t border-neutral-200 pt-8">
          {/* Project Navigation */}
          <div className="grid md:grid-cols-2 gap-4">
            {prevProject && (
              <Link
                to={`/portfolio/${prevProject.id}`}
                className="group flex items-center gap-3 bg-neutral-50 hover:bg-[rgba(241,58,52,0.07)] border border-neutral-200 hover:border-[rgba(241,58,52,0.25)] p-6 rounded-2xl transition-all"
              >
                <ChevronLeft size={20} className="text-neutral-400 group-hover:text-[var(--color-primary)] transition-colors" />
                <div className="text-left">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Previous Project</div>
                  <div className="font-semibold text-neutral-900 group-hover:text-[var(--color-primary)] transition-colors">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            )}
            
            {nextProject && (
              <Link
                to={`/portfolio/${nextProject.id}`}
                className="group flex items-center justify-between bg-neutral-50 hover:bg-[rgba(241,58,52,0.07)] border border-neutral-200 hover:border-[rgba(241,58,52,0.25)] p-6 rounded-2xl transition-all"
              >
                <div className="text-right">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Next Project</div>
                  <div className="font-semibold text-neutral-900 group-hover:text-[var(--color-primary)] transition-colors">
                    {nextProject.title}
                  </div>
                </div>
                <ChevronRight size={20} className="text-neutral-400 group-hover:text-[var(--color-primary)] transition-colors" />
              </Link>
            )}
          </div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[rgba(241,58,52,0.8)] rounded-2xl p-8 md:p-12 text-white text-center shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-[rgba(255,255,255,0.9)] mb-8 text-lg max-w-2xl mx-auto">
              Let's discuss how we can help your brand achieve similar results and drive measurable growth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-3.5 rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-md hover:shadow-lg"
            >
              Start a Conversation
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;